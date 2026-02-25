const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated. Please login." });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login again." });
    }

    if (user.isRestricted) {
      return res
        .status(403)
        .json({ message: "Your account has been restricted. Please contact support." });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please login again." });
  }
};

// =======================================================

// Admin authentication middleware
const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    // Only reached if auth succeeded and req.user is set
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    next();
  });
};

module.exports = { auth, adminAuth };
