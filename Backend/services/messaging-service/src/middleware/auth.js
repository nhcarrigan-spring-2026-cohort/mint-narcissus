const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Minimal schema to check isRestricted against the shared User collection.
// Uses strict: false so it coexists safely with any other service's User model
// that may connect to the same MongoDB instance.
const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema({ isRestricted: Boolean }, { strict: false }),
  );

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated. Please login." });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "jwt_secret",
    );

    const user = await User.findById(decoded.userId)
      .select("isRestricted")
      .lean();

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login again." });
    }

    if (user.isRestricted) {
      return res.status(403).json({
        message:
          "Your account has been restricted. Please contact support.",
      });
    }

    req.user = { _id: user._id };
    next();
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please login again." });
  }
};

module.exports = { auth };
