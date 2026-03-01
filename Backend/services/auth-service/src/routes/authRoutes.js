const express = require("express");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { auth } = require("../middleware/auth.js");
const passport = require("../config/passport.js");
const { createLogger } = require("shared/logger");

const logger = createLogger("auth-service");

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
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        activeRole: user.activeRole,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    logger.error("Registration failed", error);
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
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        activeRole: user.activeRole,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    logger.error("Login failed", error);
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
    logger.error("Logout failed", error);
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
        sizeProfile: req.user.sizeProfile,
        isProfileComplete: req.user.isProfileComplete,
        isRestricted: req.user.isRestricted,
        badges: req.user.badges,
        averageRating: req.user.averageRating,
        totalRatings: req.user.totalRatings,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    logger.error("Get user failed", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/auth/me
// Update profile fields. Sets isProfileComplete: true.
router.patch("/me", auth, async (req, res) => {
  try {
    const { activeRole, sizeProfile, bio, profilePhoto } = req.body;
    const updates = { isProfileComplete: true };

    if (activeRole && ["borrower", "lender"].includes(activeRole)) {
      updates.activeRole = activeRole;
    }

    // Validate and apply sizeProfile with dot-notation for partial updates
    if (sizeProfile !== undefined) {
      if (typeof sizeProfile !== "object" || sizeProfile === null || Array.isArray(sizeProfile)) {
        return res.status(400).json({ message: "sizeProfile must be an object" });
      }
      const allowedKeys = ["height", "fitPreference", "topSize", "bottomSize"];
      for (const key of allowedKeys) {
        if (key in sizeProfile) {
          if (typeof sizeProfile[key] !== "string") {
            return res.status(400).json({ message: `sizeProfile.${key} must be a string` });
          }
          updates[`sizeProfile.${key}`] = sizeProfile[key];
        }
      }
    }

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
        sizeProfile: user.sizeProfile,
        isProfileComplete: user.isProfileComplete,
        isRestricted: user.isRestricted,
        badges: user.badges,
        averageRating: user.averageRating,
        totalRatings: user.totalRatings,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error("Update profile failed", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ===========================================================================

// GET /api/auth/linkedin - Initiate LinkedIn OAuth flow
router.get("/linkedin", (req, res, next) => {
  // Detect whether the user came from /register or /login using the Referer header
  const referer = req.get("Referer") || "";
  const mode = referer.includes("/register") ? "signup" : "login";
  res.cookie("linkedin_auth_mode", mode, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000, // 10 minutes
    sameSite: "lax",
  });
  passport.authenticate("linkedin")(req, res, next);
});

// ===========================================================================

// GET /api/auth/linkedin/callback
router.get(
  "/linkedin/callback",
  (req, res, next) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const mode = req.cookies?.linkedin_auth_mode || "login";
    const fallbackPath = mode === "signup" ? "/register" : "/login";

    // Clear the mode cookie
    res.clearCookie("linkedin_auth_mode");

    passport.authenticate("linkedin", { session: false }, (err, user) => {
      // Handle user cancellation or any OAuth error
      if (err || !user) {
        const errorType = err?.code === "user_cancelled_login" || err?.code === "user_cancelled_authorize"
          ? "linkedin_cancelled"
          : "linkedin_failed";
        logger.warn("LinkedIn OAuth callback error", { error: err?.message, code: err?.code, mode });
        return res.redirect(`${clientUrl}${fallbackPath}?error=${errorType}`);
      }

      // Success — issue token and redirect home
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const token = generateToken(req.user._id);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.redirect(`${clientUrl}/`);
  },
);

module.exports = router;
