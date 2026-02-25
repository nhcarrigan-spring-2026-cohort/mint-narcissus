const dotenv = require("dotenv");
const path = require("path");

// Load .env from Backend root before any other imports
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const connectDB = require("./config/database");
const borrowRoutes = require("./routes/borrowRoutes");
const messageRoutes = require("./routes/messageRoutes");
const healthRoutes = require("./routes/health");
const initSocket = require("./socket/socketHandler");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3004;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Attach io instance to every request so route handlers can emit socket events
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(healthRoutes);
app.use("/api/messages", borrowRoutes);
app.use("/api/messages", messageRoutes);

initSocket(io);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Messaging service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start messaging service:", error);
    process.exit(1);
  }
};

startServer();
