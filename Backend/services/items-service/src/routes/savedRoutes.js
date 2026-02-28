const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const SavedItem = require("../models/SavedItem");
const Item = require("../models/Item");
const { auth } = require("../middleware/auth");
const { requireProfileComplete, requireRole } = require("../../../../shared/index");

// GET /api/items/saved
// Borrower's saved outfits with live item status on each.
router.get(
  "/saved",
  auth,
  requireProfileComplete,
  requireRole("borrower"),
  async (req, res) => {
    try {
      const saved = await SavedItem.find({ borrowerId: req.user._id })
        .populate("outfitId", "images category size interviewType status lenderId")
        .sort({ createdAt: -1 });

      res.json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

// POST /api/items/:id/save
// Save an outfit to the borrower's favourites.
router.post(
  "/:id/save",
  auth,
  requireProfileComplete,
  requireRole("borrower"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid item ID." });
      }

      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found." });

      const existing = await SavedItem.findOne({
        borrowerId: req.user._id,
        outfitId: req.params.id,
      });
      if (existing) {
        return res.status(400).json({ message: "Already saved." });
      }

      const saved = await SavedItem.create({
        borrowerId: req.user._id,
        outfitId: req.params.id,
      });

      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

// DELETE /api/items/:id/save
// Remove an outfit from favourites.
router.delete(
  "/:id/save",
  auth,
  requireProfileComplete,
  requireRole("borrower"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid item ID." });
      }

      const result = await SavedItem.deleteOne({
        borrowerId: req.user._id,
        outfitId: req.params.id,
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Saved item not found." });
      }

      res.json({ message: "Unsaved." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

module.exports = router;
