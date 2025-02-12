const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ User Registration
router.post("/register", async (req, res) => {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ msg: "Username already exists" });

        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ msg: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword, userType });
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ✅ User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email, userType: user.userType } });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ✅ Get User Info (Protected Route)
router.get("/user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ✅ Delete User Account
router.delete("/delete", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ msg: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
