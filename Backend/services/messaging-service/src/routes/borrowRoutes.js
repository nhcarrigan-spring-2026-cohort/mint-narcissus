const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const BorrowRequest = require("../models/BorrowRequest");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Outfit = require("../models/Outfit");
const { auth } = require("../middleware/auth");
const { createLogger } = require("shared/logger");

const logger = createLogger("messaging-service");

// Minimal User model for updating ratings. strict:false lets it coexist with
// auth-service's full User schema on the shared DB.
const User =
  mongoose.models.User ||
  mongoose.model("User", new mongoose.Schema({}, { strict: false }));

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

    if (outfit.status !== "Available") {
      return res
        .status(400)
        .json({ message: "This outfit is not available for borrowing." });
    }

    const outfitLenderId = (outfit.lenderId || outfit.lender)?.toString();

    if (outfitLenderId === req.user._id.toString()) {
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
      lender: outfitLenderId,
    });

    res.status(201).json(request);
  } catch (err) {
    logger.error("Create borrow request failed", err);
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
    logger.error("Get incoming requests failed", err);
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
    logger.error("Get my requests failed", err);
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
    logger.error("Get request detail failed", err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/messages/requests/:id/approve
// Lender approves the request. Creates Conversation + opening system message.
// Item status is NOT changed here — that happens when the borrower accepts the agreement.
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
    logger.error("Approve request failed", err);
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
    logger.error("Reject request failed", err);
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
    logger.error("Cancel request failed", err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/messages/requests/:id/confirm-lend
// Lender triggers this after chatting to signal they want to lend.
// Moves status to "agreement_pending" and prompts the borrower to sign the agreement.
router.patch("/requests/:id/confirm-lend", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.lender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (request.status !== "approved") {
      return res.status(400).json({
        message: `Cannot confirm lend on a request with status '${request.status}'.`,
      });
    }

    request.status = "agreement_pending";
    await request.save();

    const conversation = await Conversation.findOne({
      borrowRequest: request._id,
    });

    if (conversation) {
      await postSystemMessage(
        conversation._id,
        req.user._id,
        "The lender has confirmed they'd like to proceed. Please review and accept the lending agreement to finalise the arrangement.",
      );
    }

    res.json(request);
  } catch (err) {
    logger.error("Confirm lend failed", err);
    res.status(500).json({ message: "Server error." });
  }
});

// POST /api/messages/requests/:id/agreement
// Borrower accepts the digital lending agreement.
// Sets status to "borrowed", timestamps the agreement, calls items-service to
// mark the outfit as Borrowed, and auto-rejects all other active requests on
// the same outfit.
router.post("/requests/:id/agreement", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.borrower.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (request.status !== "agreement_pending") {
      return res.status(400).json({
        message: `Agreement cannot be accepted on a request with status '${request.status}'.`,
      });
    }

    const now = new Date();
    request.status = "borrowed";
    request.agreementAcceptedAt = now;
    request.borrowedAt = now;
    await request.save();

    // Mark the outfit as Borrowed in items-service
    const itemsServiceUrl = process.env.ITEMS_SERVICE_URL || "http://localhost:3002";
    await fetch(`${itemsServiceUrl}/api/internal/items/${request.outfit}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": process.env.INTERNAL_SECRET,
      },
      body: JSON.stringify({ status: "Borrowed" }),
    });

    // Auto-reject all other pending or approved requests for the same outfit
    await BorrowRequest.updateMany(
      {
        outfit: request.outfit,
        _id: { $ne: request._id },
        status: { $in: ["pending", "approved"] },
      },
      { status: "rejected" },
    );

    const conversation = await Conversation.findOne({
      borrowRequest: request._id,
    });

    if (conversation) {
      await postSystemMessage(
        conversation._id,
        req.user._id,
        "Agreement accepted. The outfit is now officially on loan — please coordinate handover details here.",
      );
    }

    res.json(request);
  } catch (err) {
    logger.error("Accept agreement failed", err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/messages/requests/:id/returned
// Lender confirms the item has been handed back.
// Reopens the outfit in items-service, closes the conversation, and flags both
// parties for rating.
router.patch("/requests/:id/returned", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.lender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (request.status !== "borrowed") {
      return res.status(400).json({
        message: `Cannot mark as returned on a request with status '${request.status}'.`,
      });
    }

    request.status = "returned";
    request.returnedAt = new Date();
    request.ratingsPending = true;
    await request.save();

    // Mark outfit as Available again in items-service
    const itemsServiceUrl = process.env.ITEMS_SERVICE_URL || "http://localhost:3002";
    await fetch(`${itemsServiceUrl}/api/internal/items/${request.outfit}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": process.env.INTERNAL_SECRET,
      },
      body: JSON.stringify({ status: "Available" }),
    });

    // Close the conversation and post a final system message
    const conversation = await Conversation.findOneAndUpdate(
      { borrowRequest: request._id },
      { isActive: false },
      { new: true },
    );

    if (conversation) {
      await postSystemMessage(
        conversation._id,
        req.user._id,
        "Item returned — the chat is now closed. Please take a moment to rate your experience.",
      );
    }

    res.json(request);
  } catch (err) {
    logger.error("Mark returned failed", err);
    res.status(500).json({ message: "Server error." });
  }
});

// POST /api/messages/requests/:id/rate
// Either participant rates the other after the item is returned.
// Body: { rating: 1–5 }
// Once both parties have rated, status moves to "rated" and ratingsPending clears.
router.post("/requests/:id/rate", auth, async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.status !== "returned") {
      return res.status(400).json({
        message: "Ratings can only be submitted after the item is returned.",
      });
    }

    if (!request.ratingsPending) {
      return res.status(400).json({ message: "Ratings have already been submitted." });
    }

    const { rating } = req.body;
    if (!rating || !Number.isInteger(Number(rating)) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a whole number between 1 and 5." });
    }

    const isLender = request.lender.toString() === req.user._id.toString();
    const isBorrower = request.borrower.toString() === req.user._id.toString();

    if (!isLender && !isBorrower) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (isLender && request.lenderRated) {
      return res.status(400).json({ message: "You have already submitted your rating." });
    }

    if (isBorrower && request.borrowerRated) {
      return res.status(400).json({ message: "You have already submitted your rating." });
    }

    // Apply the rating to the other party's User document
    const ratedUserId = isLender ? request.borrower : request.lender;
    const ratedUser = await User.findById(ratedUserId).lean();

    const prevTotal = ratedUser?.totalRatings || 0;
    const prevAverage = ratedUser?.averageRating || 0;
    const newTotal = prevTotal + 1;
    const newAverage = Math.round(((prevAverage * prevTotal + Number(rating)) / newTotal) * 10) / 10;

    await User.findByIdAndUpdate(ratedUserId, {
      averageRating: newAverage,
      totalRatings: newTotal,
    });

    if (isLender) request.lenderRated = true;
    else request.borrowerRated = true;

    // Finalise once both sides have rated
    if (request.lenderRated && request.borrowerRated) {
      request.status = "rated";
      request.ratingsPending = false;
    }

    await request.save();
    res.json(request);
  } catch (err) {
    logger.error("Submit rating failed", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
