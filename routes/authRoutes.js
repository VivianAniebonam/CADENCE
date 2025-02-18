const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Register User
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

// ✅ Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
