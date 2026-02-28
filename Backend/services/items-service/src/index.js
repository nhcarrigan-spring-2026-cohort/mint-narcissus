require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const connectDB = require("./config/database");
const healthRoutes = require("./routes/health");
const savedRoutes = require("./routes/savedRoutes");   // must be before itemRoutes (/saved before /:id)
const itemRoutes = require("./routes/itemRoutes");
const internalRoutes = require("./routes/internalRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(healthRoutes);
app.use("/api/items", savedRoutes);     // /saved, /:id/save — static paths first
app.use("/api/items", itemRoutes);      // /my, /, /:id — dynamic paths after
app.use("/api/internal", internalRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Items service listening on port ${PORT}`);
  });
});
