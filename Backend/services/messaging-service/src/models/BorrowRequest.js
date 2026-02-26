const mongoose = require("mongoose");

const borrowRequestSchema = new mongoose.Schema(
  {
    outfit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outfit",
      required: true,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Denormalized from outfit.lender for easy querying without joins
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "borrowed",
        "returned",
        "rated",
        "cancelled",
      ],
      default: "pending",
    },
    agreementAcceptedAt: Date,
    borrowedAt: Date,
    returnedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("BorrowRequest", borrowRequestSchema);
