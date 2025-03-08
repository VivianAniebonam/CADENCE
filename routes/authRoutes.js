const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * ✅ USER REGISTRATION (Always Registered as "registered")
 */
router.post("/register", async (req, res) => {
    try {
        console.log("Incoming Registration Data:", req.body); // Debugging Log

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            userType: "registered", // ✅ Fixed to always register as "registered"
        });

        await newUser.save();

        res.json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ msg: "Server Error - Registration Failed!" });
    }
});

/**
 * ✅ USER LOGIN
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, userType: user.userType }, "your_secret_key", { expiresIn: "1h" });

        res.json({ token, userType: user.userType });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Server Error - Login Failed!" });
    }
});

module.exports = router;
