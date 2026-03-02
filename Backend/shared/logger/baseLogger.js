const pino = require("pino");
const redactConfig = require("./redact");

/**
 * Base pino instance shared across all services.
 *
 * - JSON output to stdout in production
 * - Human-readable output via pino-pretty in development:
 *     info 2026-02-28T19:26:48.849Z auth-service development 3001 Service started
 * - Level as string ("info") not number (30)
 * - ISO 8601 UTC timestamps
 * - "message" key instead of pino's default "msg"
 * - No pid/hostname in base (services add their own fields via child loggers)
 * - Redaction of sensitive fields
 */
const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level:
    process.env.LOG_LEVEL ||
    (isProduction ? "info" : "debug"),
  messageKey: "message",
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  base: null,
  redact: redactConfig,
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          messageKey: "message",
          timestampKey: "timestamp",
          translateTime: false,
          ignore: "pid,hostname,service,env,meta",
          messageFormat:
            "{service} {env} {meta.port} {message}",
        },
      },
});

module.exports = logger;
