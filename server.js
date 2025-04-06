const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const gigRoutes = require("./routes/gigRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes"); // ✅ MESSAGES

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/conversations", conversationRoutes); // ✅ CHAT
app.use("/api/messages", messageRoutes);           // ✅ MESSAGES

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("🎵 Welcome to the Cadence API 🎶");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
