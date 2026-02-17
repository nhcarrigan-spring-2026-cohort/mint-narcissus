const dotenv = require("dotenv");
const path = require("path");

// Load .env from Backend root BEFORE any other imports that read process.env
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectDB = require("./config/database");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware required for OAuth state verification
app.use(
  session({
    secret: process.env.JWT_SECRET || "session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60 * 1000, // 10 minutes (OAuth flow only)
    },
  }),
);

app.use(passport.initialize());

// Health check routes
app.use(healthRoutes);

// API routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Auth service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start auth service:", error);
    process.exit(1);
  }
};

startServer();
