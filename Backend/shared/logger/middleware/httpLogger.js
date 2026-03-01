/**
 * Express middleware that logs every completed HTTP request.
 *
 * Emits the `request` object from the logging contract:
 *   { method, path, status, latencyMs }
 *
 * Log level is chosen by response status:
 *   - 5xx → error
 *   - 4xx → warn
 *   - 2xx/3xx → info
 *
 * Health-check paths (/health) are skipped to reduce noise.
 */
const createHttpLogger = (logger) => {
  return (req, res, next) => {
    if (req.path === "/health") return next();

    const start = Date.now();

    res.on("finish", () => {
      const latencyMs = Date.now() - start;
      const level =
        res.statusCode >= 500
          ? "error"
          : res.statusCode >= 400
            ? "warn"
            : "info";

      logger[level]("HTTP request completed", {
        request: {
          method: req.method,
          path: req.originalUrl || req.url,
          status: res.statusCode,
          latencyMs,
        },
      });
    });

    next();
  };
};

module.exports = { createHttpLogger };
