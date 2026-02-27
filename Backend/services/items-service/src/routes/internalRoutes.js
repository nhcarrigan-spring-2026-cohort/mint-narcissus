const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../models/Item");

// ─── Internal Auth ───────────────────────────────────────────────────────────
// Requests must carry the shared secret in the x-internal-secret header.
// Set INTERNAL_SECRET in each service's .env to the same value.
const internalAuth = (req, res, next) => {
  const secret = req.headers["x-internal-secret"];
  if (!secret || secret !== process.env.INTERNAL_SECRET) {
    return res.status(403).json({ message: "Forbidden." });
  }
  next();
};

// ─── Routes ──────────────────────────────────────────────────────────────────

// PATCH /api/internal/items/:id/status
// Called by messaging-service when:
//   - Lender confirms lend after chat  → { status: "Borrowed" }
//   - Item is returned                 → { status: "Available" }
router.patch("/items/:id/status", internalAuth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID." });
    }

    const { status } = req.body;
    if (!["Borrowed", "Available"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be Borrowed or Available." });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!item) return res.status(404).json({ message: "Item not found." });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
