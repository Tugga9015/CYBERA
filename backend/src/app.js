const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

// Allow requests from the React development server
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Middleware for reading JSON
app.use(express.json());

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/analyze", analyzeRoutes);

module.exports = app;
