const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("[Gateway] JWT_SECRET environment variable is required");
}

/**
 * Verifies the JWT from the `token` cookie.
 * On success, injects `x-user-id` header so downstream services
 * can trust the caller's identity without re-verifying the token.
 * On failure, responds with 401 immediately.
 */
const verifyJWT = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Please login." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // auth-service signs { userId } — always extract that field
    req.headers["x-user-id"] = String(decoded.userId);

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }
    return res
      .status(401)
      .json({ message: "Invalid token. Please login again." });
  }
};

module.exports = { verifyJWT };
