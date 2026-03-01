/**
 * Pino redact configuration.
 * Strips sensitive values from any log object before it hits stdout.
 */
module.exports = {
  paths: [
    "meta.password",
    "meta.token",
    "meta.secret",
    "meta.accessToken",
    "meta.refreshToken",
    "meta.authorization",
    "meta.cookie",
  ],
  censor: "[REDACTED]",
};
