const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    lenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{ type: String }],
    category: {
      type: String,
      enum: ["Formal", "Semi-formal", "Business Casual"],
      required: true,
    },
    size: { type: String, required: true },
    measurements: {
      chest: String,
      waist: String,
      hips: String,
      length: String,
      shoulders: String,
    },
    fitDescription: { type: String },
    fabricType: { type: String },
    interviewType: {
      type: String,
      enum: ["Tech", "Corporate", "Finance", "General", "Other"],
      required: true,
    },
    confidenceNote: { type: String },
    status: {
      type: String,
      enum: ["Available", "Borrowed", "Unavailable"],
      default: "Available",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Item", itemSchema);
