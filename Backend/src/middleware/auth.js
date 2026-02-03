import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
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
export const adminAuth = async (req, res, next) => {
  try {
    // First check if user is authenticated
    await auth(req, res, () => {});

    // Check if user has admin role
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    return res.status(403).json({ message: "Access denied." });
  }
};
