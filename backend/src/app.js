const express = require("express");
const healthRoutes = require("./routes/healthRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use("/api/analyze", analyzeRoutes);
 
// Health routes
app.use("/api/health", healthRoutes);

module.exports = app;