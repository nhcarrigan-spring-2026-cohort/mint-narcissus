const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    borrowRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BorrowRequest",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: Date,
    },
    // Map of userId -> unread count. Incremented for all participants except sender on each message.
    // Reset to 0 when the user opens the conversation.
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
    // Set to false by requests-service when borrow request status reaches 'returned'.
    // Blocks new messages once the transaction is complete.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Conversation", conversationSchema);
