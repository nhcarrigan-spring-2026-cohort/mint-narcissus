const baseLogger = require("./baseLogger");
const { getContext } = require("./context");
const { normalizeError } = require("./helpers/logError");

/**
 * Creates a service-scoped logger.
 *
 * Every log line automatically includes:
 *   - service name + env (set once here)
 *   - correlationId + userId (read from AsyncLocalStorage per-call)
 *
 * Usage:
 *   logger.info('User registered')
 *   logger.info('User registered', { meta: { provider: 'local' } })
 *   logger.error('Registration failed', err)
 *   logger.error('Proxy error', err, { meta: { target } })
 */
function createLogger(serviceName) {
  const child = baseLogger.child({
    service: serviceName,
    env: process.env.NODE_ENV || "development",
  });

  const log = (level, msg, second, third) => {
    const { correlationId, userId } = getContext();
    const data = {};

    if (correlationId) data.correlationId = correlationId;
    if (userId) data.userId = userId;

    if (second instanceof Error) {
      data.error = normalizeError(second);
      // Optional third arg for extra meta alongside an error
      if (third && typeof third === "object") {
        if (third.meta) data.meta = third.meta;
        if (third.request) data.request = third.request;
      }
    } else if (second && typeof second === "object") {
      if (second.meta) data.meta = second.meta;
      if (second.request) data.request = second.request;
    }

    child[level](data, msg);
  };

  return {
    debug: (msg, second, third) => log("debug", msg, second, third),
    info: (msg, second, third) => log("info", msg, second, third),
    warn: (msg, second, third) => log("warn", msg, second, third),
    error: (msg, second, third) => log("error", msg, second, third),
  };
}

module.exports = { createLogger };
