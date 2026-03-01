const mongoose = require("mongoose");
const { createLogger } = require("shared/logger");

const logger = createLogger("auth-service");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/mint-narcissus",
    );

    logger.info("MongoDB connected");

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (error) {
    logger.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
