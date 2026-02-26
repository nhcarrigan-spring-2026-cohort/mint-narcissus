const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { auth } = require("../middleware/auth");

// GET /api/messages/conversations
// Returns all conversations for the current user, sorted by most recent activity.
// Each conversation includes the unread count for the current user.
router.get("/conversations", auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "name profilePhoto")
      .sort({ updatedAt: -1 })
      .lean();

    const result = conversations.map((conv) => ({
      ...conv,
      unreadCount: conv.unreadCounts?.[req.user._id.toString()] || 0,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// GET /api/messages/conversations/:conversationId
// Returns paginated message history and the current borrow request status
// (used by the frontend to render in-chat action buttons like Mark Borrowed / Mark Returned).
// Only accessible by participants.
router.get("/conversations/:conversationId", auth, async (req, res) => {
  try {
    const conversation = await Conversation.findById(
      req.params.conversationId,
    )
      .populate("participants", "name profilePhoto")
      .populate("borrowRequest", "status")
      .lean();

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    const isParticipant = conversation.participants.some(
      (p) => p._id.toString() === req.user._id.toString(),
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Access denied." });
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 30);
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find({ conversation: req.params.conversationId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Message.countDocuments({ conversation: req.params.conversationId }),
    ]);

    res.json({
      conversation,
      messages: messages.reverse(), // Return oldest-first for display
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// POST /api/messages/conversations/:conversationId
// Sends a message. Saves to DB, updates lastMessage + unread counts,
// then broadcasts to the conversation room via Socket.io.
// Blocked if conversation.isActive is false (request has been returned).
router.post("/conversations/:conversationId", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Message text is required." });
    }

    const conversation = await Conversation.findById(
      req.params.conversationId,
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === req.user._id.toString(),
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (!conversation.isActive) {
      return res
        .status(403)
        .json({ message: "This conversation is closed." });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      text: text.trim(),
    });

    // Increment unread count for every participant except the sender
    conversation.participants.forEach((participantId) => {
      const key = participantId.toString();
      if (key !== req.user._id.toString()) {
        conversation.unreadCounts.set(
          key,
          (conversation.unreadCounts.get(key) || 0) + 1,
        );
      }
    });

    conversation.lastMessage = {
      text: text.trim(),
      sender: req.user._id,
      createdAt: message.createdAt,
    };

    await conversation.save();

    // Broadcast to everyone in the Socket.io room for this conversation
    req.io.to(req.params.conversationId).emit("new_message", message);

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/messages/conversations/:conversationId/read
// Resets the unread count to 0 for the current user.
// Called by the frontend when the user opens a conversation.
router.patch(
  "/conversations/:conversationId/read",
  auth,
  async (req, res) => {
    try {
      const conversation = await Conversation.findById(
        req.params.conversationId,
      );

      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found." });
      }

      const isParticipant = conversation.participants.some(
        (p) => p.toString() === req.user._id.toString(),
      );

      if (!isParticipant) {
        return res.status(403).json({ message: "Access denied." });
      }

      conversation.unreadCounts.set(req.user._id.toString(), 0);
      await conversation.save();

      res.json({ message: "Marked as read." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

module.exports = router;
