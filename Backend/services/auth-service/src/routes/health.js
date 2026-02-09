import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth-service" });
});

export default router;
