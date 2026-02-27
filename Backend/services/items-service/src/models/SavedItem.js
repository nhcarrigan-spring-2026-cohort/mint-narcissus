const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    outfitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent a borrower from saving the same item twice
savedItemSchema.index({ borrowerId: 1, outfitId: 1 }, { unique: true });

module.exports = mongoose.model("SavedItem", savedItemSchema);
