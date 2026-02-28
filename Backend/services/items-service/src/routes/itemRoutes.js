const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../models/Item");
const { auth } = require("../middleware/auth");
const { requireProfileComplete, requireRole } = require("../../../../shared/index");
const cloudinary = require("../config/cloudinary");
const upload = require("../utils/upload");

// ─── Helper ──────────────────────────────────────────────────────────────────

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });

// ─── Routes ──────────────────────────────────────────────────────────────────

// GET /api/items/my
// Lender's own listings.
router.get(
  "/my",
  auth,
  requireProfileComplete,
  requireRole("lender"),
  async (req, res) => {
    try {
      const items = await Item.find({ lenderId: req.user._id }).sort({
        createdAt: -1,
      });
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

// GET /api/items
// Public feed — Available items only.
// Query: ?size=&category=&interviewType=&page=&limit=
router.get(
  "/",
  auth,
  requireProfileComplete,
  requireRole("borrower"),
  async (req, res) => {
    try {
      const { size, category, interviewType, page = 1, limit = 20 } = req.query;

      const query = { status: "Available" };
      if (size) query.size = size;
      if (category) query.category = category;
      if (interviewType) query.interviewType = interviewType;

      const safeLimit = Math.min(Number(limit), 100);
      const skip = (Math.max(1, Number(page)) - 1) * safeLimit;

      const [items, total] = await Promise.all([
        Item.find(query).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
        Item.countDocuments(query),
      ]);

      res.json({
        items,
        total,
        page: Number(page),
        pages: Math.ceil(total / safeLimit),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

// POST /api/items
// Create a new listing. Accepts up to 5 images via multipart/form-data field "images".
router.post(
  "/",
  auth,
  requireProfileComplete,
  requireRole("lender"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        category,
        size,
        measurements,
        fitDescription,
        fabricType,
        interviewType,
        confidenceNote,
      } = req.body;

      if (!category || !size || !interviewType) {
        return res
          .status(400)
          .json({ message: "category, size, and interviewType are required." });
      }

      let images = [];
      if (req.files?.length) {
        images = await Promise.all(
          req.files.map((f) =>
            uploadToCloudinary(f.buffer, "mint-narcissus/items"),
          ),
        );
      }

      const item = await Item.create({
        lenderId: req.user._id,
        images,
        category,
        size,
        measurements:
          typeof measurements === "string"
            ? JSON.parse(measurements)
            : measurements ?? {},
        fitDescription,
        fabricType,
        interviewType,
        confidenceNote,
      });

      res.status(201).json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

// GET /api/items/:id
// Single item detail. Any authenticated user can view.
router.get("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID." });
    }

    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/items/:id
// Update listing fields. Optionally replace images.
router.patch(
  "/:id",
  auth,
  requireProfileComplete,
  requireRole("lender"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid item ID." });
      }

      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found." });

      if (item.lenderId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized." });
      }

      const {
        category,
        size,
        measurements,
        fitDescription,
        fabricType,
        interviewType,
        confidenceNote,
      } = req.body;

      const updates = {};
      if (category) updates.category = category;
      if (size) updates.size = size;
      if (measurements !== undefined)
        updates.measurements =
          typeof measurements === "string"
            ? JSON.parse(measurements)
            : measurements;
      if (fitDescription !== undefined) updates.fitDescription = fitDescription;
      if (fabricType !== undefined) updates.fabricType = fabricType;
      if (interviewType) updates.interviewType = interviewType;
      if (confidenceNote !== undefined) updates.confidenceNote = confidenceNote;

      if (req.files?.length) {
        updates.images = await Promise.all(
          req.files.map((f) =>
            uploadToCloudinary(f.buffer, "mint-narcissus/items"),
          ),
        );
      }

      const updated = await Item.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

// PATCH /api/items/:id/status
// Lender can set Available or Unavailable only. Borrowed is system-only.
router.patch(
  "/:id/status",
  auth,
  requireProfileComplete,
  requireRole("lender"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid item ID." });
      }

      const { status } = req.body;
      if (!["Available", "Unavailable"].includes(status)) {
        return res
          .status(400)
          .json({ message: "Status must be Available or Unavailable." });
      }

      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found." });

      if (item.lenderId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized." });
      }

      if (item.status === "Borrowed") {
        return res
          .status(400)
          .json({ message: "Cannot change status of a currently borrowed item." });
      }

      item.status = status;
      await item.save();
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

// DELETE /api/items/:id
// Delete a listing. Not allowed if item is currently borrowed.
router.delete(
  "/:id",
  auth,
  requireProfileComplete,
  requireRole("lender"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid item ID." });
      }

      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found." });

      if (item.lenderId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized." });
      }

      if (item.status === "Borrowed") {
        return res
          .status(400)
          .json({ message: "Cannot delete a currently borrowed item." });
      }

      await item.deleteOne();
      res.json({ message: "Item deleted." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  },
);

module.exports = router;
