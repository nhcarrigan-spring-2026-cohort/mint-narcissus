const { als } = require("../context");

/**
 * Binds per-request data into AsyncLocalStorage so every downstream
 * log line automatically includes correlationId and userId.
 *
 * Reads:
 *   - x-request-id  → set by gateway's correlationId middleware
 *   - x-user-id     → injected by gateway's verifyJWT after auth
 *   - req.user._id  → fallback if auth middleware ran before this
 */
const requestContext = (req, _res, next) => {
  const correlationId = req.headers["x-request-id"] || null;
  const userId =
    req.headers["x-user-id"] ||
    req.user?._id?.toString() ||
    null;

  als.run({ correlationId, userId }, next);
};

module.exports = { requestContext };
