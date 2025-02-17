const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Import middleware for protected routes

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
    try {
        console.log("📥 Received Registration Data:", req.body);

        const { username, email, password, userType = "registered" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword, userType });
        await user.save();

        // Generate token
        const token = jwt.sign(
            { id: user._id, username: user.username, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ msg: "User registered successfully", token, user });
    } catch (err) {
        console.error("❌ Registration Error:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ✅ Login User
router.post("/login", async (req, res) => {
    try {
        console.log("📥 Login Attempt:", req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate token
        const token = jwt.sign(
            { id: user._id, username: user.username, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ msg: "Login successful", token, user });
    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ✅ Get Logged-in User Data
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("❌ Fetch User Error:", error.message);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

// ✅ Get All Users (Protected Route)
router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords from response
        res.json(users);
    } catch (err) {
        console.error("❌ Fetch Users Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
