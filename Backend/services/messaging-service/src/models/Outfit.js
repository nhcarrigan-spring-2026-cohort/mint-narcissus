const mongoose = require("mongoose");

// Minimal Outfit schema for messaging-service.
// Used only to read the lender field when creating borrow requests
// and to update outfit status on approval / mark-returned.
// strict: false ensures it coexists with the full Outfit model in items-service
// against the same shared MongoDB collection.
const Outfit =
  mongoose.models.Outfit ||
  mongoose.model(
    "Outfit",
    new mongoose.Schema(
      {
        lender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: String,
      },
      { strict: false },
    ),
  );

module.exports = Outfit;
