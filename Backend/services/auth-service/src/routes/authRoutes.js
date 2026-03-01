const express = require("express");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { auth } = require("../middleware/auth.js");
const passport = require("../config/passport.js");

// ===========================================================================

const router = express.Router();

// ===========================================================================

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// ===========================================================================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        activeRole: user.activeRole,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ===========================================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let isMatch;
    try {
      isMatch = await user.comparePassword(password);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, COOKIE_OPTIONS);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        activeRole: user.activeRole,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ===========================================================================

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
});

// ===========================================================================

router.get("/me", auth, async (req, res) => {
  try {
    res.json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        activeRole: req.user.activeRole,
        profilePhoto: req.user.profilePhoto,
        bio: req.user.bio,
        isProfileComplete: req.user.isProfileComplete,
        isRestricted: req.user.isRestricted,
        badges: req.user.badges,
        averageRating: req.user.averageRating,
        totalRatings: req.user.totalRatings,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/auth/me
// Update profile fields. Sets isProfileComplete: true.
router.patch("/me", auth, async (req, res) => {
  try {
    const { activeRole, size, bio, profilePhoto } = req.body;
    const updates = { isProfileComplete: true };

    if (activeRole && ["borrower", "lender"].includes(activeRole)) {
      updates.activeRole = activeRole;
    }
    if (size !== undefined) updates.size = size;
    if (bio !== undefined) updates.bio = bio;
    if (profilePhoto !== undefined) updates.profilePhoto = profilePhoto;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        activeRole: user.activeRole,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        isProfileComplete: user.isProfileComplete,
        isRestricted: user.isRestricted,
        badges: user.badges,
        averageRating: user.averageRating,
        totalRatings: user.totalRatings,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ===========================================================================

// GET /api/auth/linkedin - Initiate LinkedIn OAuth flow
router.get("/linkedin", passport.authenticate("linkedin"));

// ===========================================================================

// GET /api/auth/linkedin/callback
router.get(
  "/linkedin/callback",
  (req, res, next) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    passport.authenticate("linkedin", {
      session: false,
      failureRedirect: `${clientUrl}/login?error=linkedin_failed`,
    })(req, res, next);
  },
  (req, res) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const token = generateToken(req.user._id);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.redirect(`${clientUrl}/dashboard`);
  },
);

module.exports = router;
