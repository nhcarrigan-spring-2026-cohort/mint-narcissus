const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyJWT } = require("./middleware/auth");
const healthRoutes = require("./routes/health");
const { createLogger } = require("shared/logger");
const { correlationId } = require("shared/logger/middleware/correlationId");
const { requestContext } = require("shared/logger/middleware/requestContext");
const { createHttpLogger } = require("shared/logger/middleware/httpLogger");

const logger = createLogger("gateway");

const app = express();
const PORT = process.env.PORT || 8080;

// ── Env validation ────────────────────────────────────────────────────────────
const REQUIRED_VARS = [
  "JWT_SECRET",
  "AUTH_SERVICE_URL",
  "ITEMS_SERVICE_URL",
  "REQUESTS_SERVICE_URL",
  "MESSAGING_SERVICE_URL",
];
REQUIRED_VARS.forEach((key) => {
  if (!process.env[key]) {
    logger.error("Missing required env var", { meta: { key } });
    process.exit(1);
  }
});

// ── Service targets ───────────────────────────────────────────────────────────
const SERVICES = {
  auth:      process.env.AUTH_SERVICE_URL,      // e.g. http://auth-service:3001
  items:     process.env.ITEMS_SERVICE_URL,      // e.g. http://items-service:3002
  requests:  process.env.REQUESTS_SERVICE_URL,   // e.g. http://requests-service:3003
  messaging: process.env.MESSAGING_SERVICE_URL,  // e.g. http://messaging-service:3004
};

// ── Global middleware ─────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

// Strip any client-supplied x-user-id header to prevent spoofing
app.use((req, _res, next) => {
  delete req.headers["x-user-id"];
  next();
});

// ── Logger middleware ─────────────────────────────────────────────────────────
app.use(correlationId);
app.use(requestContext);
app.use(createHttpLogger(logger));

// ── Health ────────────────────────────────────────────────────────────────────
app.use(healthRoutes);

// ── Proxy factory ─────────────────────────────────────────────────────────────
const proxy = (target) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    on: {
      error: (err, _req, res) => {
        logger.error("Proxy error", err, { meta: { target } });
        res.status(502).json({ error: "Bad Gateway" });
      },
    },
  });

// ── Public auth routes (no JWT required) ─────────────────────────────────────
// Must be mounted BEFORE the protected /api/auth catch-all
[
  "/api/auth/register",
  "/api/auth/login",
  "/api/auth/logout",
].forEach((path) => {
  app.use(path, proxy(SERVICES.auth));
});

// LinkedIn OAuth — prefix match covers /linkedin and /linkedin/callback
app.use("/api/auth/linkedin", proxy(SERVICES.auth));

// ── Protected auth routes ─────────────────────────────────────────────────────
app.use("/api/auth", verifyJWT, proxy(SERVICES.auth));

// ── Protected service routes ──────────────────────────────────────────────────
app.use("/api/items",    verifyJWT, proxy(SERVICES.items));
app.use("/api/requests", verifyJWT, proxy(SERVICES.requests));
app.use("/api/messages", verifyJWT, proxy(SERVICES.messaging));

// ── 404 fallback ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info("Service started", { meta: { port: PORT } });
});

module.exports = app;
