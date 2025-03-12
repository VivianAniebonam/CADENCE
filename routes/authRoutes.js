const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile"); // ✅ Ensure Profile model is imported
const authMiddleware = require("../middleware/authMiddleware");

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

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, userType: user.userType });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Server Error - Login Failed!" });
    }
});

/**
 * ✅ DELETE USER ACCOUNT
 * API: DELETE /api/auth/delete-account
 */
router.delete("/delete-account", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // ✅ Extract user ID from decoded token
        console.log("Deleting User ID:", userId);

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ msg: "User not found" });

        // ✅ Delete associated profile
        await Profile.findOneAndDelete({ userId });

        res.json({ msg: "Account deleted successfully" });
    } catch (error) {
        console.error("Delete Account Error:", error);
        res.status(500).json({ msg: "Server error. Could not delete account." });
    }
});

module.exports = router;
