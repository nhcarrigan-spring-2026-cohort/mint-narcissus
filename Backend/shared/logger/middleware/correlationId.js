const { randomUUID } = require("node:crypto");

/**
 * Gateway-only middleware.
 * Ensures every request has an x-request-id header:
 *   - Keeps the client-supplied value if present.
 *   - Generates a UUID v4 otherwise.
 * Echoes x-request-id back in the response so clients can reference it.
 * http-proxy-middleware forwards the header to downstream services automatically.
 */
const correlationId = (req, res, next) => {
  const id = req.headers["x-request-id"] || randomUUID();
  req.headers["x-request-id"] = id;
  res.setHeader("x-request-id", id);
  next();
};

module.exports = { correlationId };
