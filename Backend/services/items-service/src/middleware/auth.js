const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Fetches the fields needed by this service and the shared role/profile middlewares.
// strict: false lets this coexist with auth-service's full User model on the same DB.
const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema(
      { isRestricted: Boolean, activeRole: String, isProfileComplete: Boolean },
      { strict: false },
    ),
  );

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

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
      .select("isRestricted activeRole isProfileComplete")
      .lean();

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login again." });
    }

    if (user.isRestricted) {
      return res.status(403).json({
        message: "Your account has been restricted. Please contact support.",
      });
    }

    req.user = {
      _id: user._id,
      activeRole: user.activeRole,
      isProfileComplete: user.isProfileComplete,
    };

    next();
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please login again." });
  }
};

module.exports = { auth };
