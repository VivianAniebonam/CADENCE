const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const UserProfile = require("../models/Profile");

const router = express.Router();

// ✅ Get User Profile
router.get("/", authMiddleware, async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user.id });
        if (!profile) {
            return res.json({ msg: "No profile found. Please create one." });
        }
        res.json(profile);
    } catch (err) {
        console.error("❌ Profile Fetch Error:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ✅ Create or Update User Profile
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { instruments, genres, influences, city, socialLinks, bio } = req.body;

        const profile = await UserProfile.findOneAndUpdate(
            { user: req.user.id }, // Find by user ID
            { user: req.user.id, instruments, genres, influences, city, socialLinks, bio },
            { new: true, upsert: true } // Create if not found
        );

        res.json({ msg: "Profile updated successfully", profile });
    } catch (err) {
        console.error("❌ Profile Update Error:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
