require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parses JSON requests
app.use(cors()); // Enables CORS for frontend communication

// Connect to MongoDB
connectDB();

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 CADENCE Backend is Running!");
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

// Handle 404 Errors
app.use((req, res) => {
    res.status(404).json({ msg: "API route not found" });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
