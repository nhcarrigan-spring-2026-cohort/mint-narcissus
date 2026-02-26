const express = require("express");
const router = express.Router();

const BorrowRequest = require("../models/BorrowRequest");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Outfit = require("../models/Outfit");
const { auth } = require("../middleware/auth");

// ─── Helpers ────────────────────────────────────────────────────────────────

// Writes a system message into the conversation linked to a borrow request.
const postSystemMessage = async (conversationId, senderId, text) => {
  await Message.create({
    conversation: conversationId,
    sender: senderId,
    text,
    isSystemMessage: true,
  });
};

// ─── Routes ─────────────────────────────────────────────────────────────────

// POST /api/messages/request
// Borrower sends a borrow request for an outfit.
// Prevents duplicate pending requests from the same borrower for the same outfit.
router.post("/request", auth, async (req, res) => {
  try {
    const { outfitId } = req.body;

    if (!outfitId) {
      return res.status(400).json({ message: "outfitId is required." });
    }

    const outfit = await Outfit.findById(outfitId).lean();

    if (!outfit) {
      return res.status(404).json({ message: "Outfit not found." });
    }

    if (outfit.status !== "available") {
      return res
        .status(400)
        .json({ message: "This outfit is not available for borrowing." });
    }

    if (outfit.lender.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot request your own outfit." });
    }

    const existing = await BorrowRequest.findOne({
      outfit: outfitId,
      borrower: req.user._id,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have a pending request for this outfit.",
      });
    }

    const request = await BorrowRequest.create({
      outfit: outfitId,
      borrower: req.user._id,
      lender: outfit.lender,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// GET /api/messages/requests/incoming
// Lender sees all incoming borrow requests for their outfits.
// Supports ?status=pending|approved|borrowed|returned|rated|rejected|cancelled
router.get("/requests/incoming", auth, async (req, res) => {
  try {
    const filter = { lender: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      BorrowRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("outfit", "images category size status")
        .populate("borrower", "name profilePhoto averageRating")
        .lean(),
      BorrowRequest.countDocuments(filter),
    ]);

    res.json({
      requests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// GET /api/messages/requests/my-requests
// Borrower tracks all their outgoing borrow requests.
router.get("/requests/my-requests", auth, async (req, res) => {
  try {
    const filter = { borrower: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      BorrowRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("outfit", "images category size status")
        .populate("lender", "name profilePhoto averageRating")
        .lean(),
      BorrowRequest.countDocuments(filter),
    ]);

    res.json({
      requests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// GET /api/messages/requests/:id
// Single borrow request detail. Only participants can view.
router.get("/requests/:id", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id)
      .populate("outfit", "images category size fitDetails status")
      .populate("borrower", "name profilePhoto averageRating")
      .populate("lender", "name profilePhoto averageRating")
      .lean();

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    const isParticipant =
      request.borrower._id.toString() === req.user._id.toString() ||
      request.lender._id.toString() === req.user._id.toString();

    if (!isParticipant) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/messages/requests/:id/approve
// Lender approves the request.
// Creates Conversation + opening system message. Sets outfit status to 'borrowed'.
router.patch("/requests/:id/approve", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.lender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: `Cannot approve a request with status '${request.status}'.`,
      });
    }

    request.status = "approved";
    await request.save();

    await Outfit.findByIdAndUpdate(request.outfit, { status: "borrowed" });

    const conversation = await Conversation.create({
      borrowRequest: request._id,
      participants: [request.borrower, request.lender],
    });

    await postSystemMessage(
      conversation._id,
      req.user._id,
      "Request approved — chat is now open. Please discuss handover details here.",
    );

    res.json({ request, conversationId: conversation._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/messages/requests/:id/reject
// Lender rejects a pending request.
router.patch("/requests/:id/reject", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.lender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: `Cannot reject a request with status '${request.status}'.`,
      });
    }

    request.status = "rejected";
    await request.save();

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/messages/requests/:id/cancel
// Borrower cancels their own pending request.
router.patch("/requests/:id/cancel", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.borrower.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be cancelled." });
    }

    request.status = "cancelled";
    await request.save();

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
