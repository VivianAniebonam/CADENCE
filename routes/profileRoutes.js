const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const UserProfile = require("../models/Profile");

const router = express.Router();

// ✅ Get User Profile
router.get("/", authMiddleware, async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user.id });
        if (!profile) return res.status(404).json({ msg: "Profile not found" });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ✅ Create/Update User Profile
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { instruments, genres, influences, city, socialLinks, bio } = req.body;
        let profile = await UserProfile.findOne({ user: req.user.id });

        if (profile) {
            profile = await UserProfile.findOneAndUpdate({ user: req.user.id }, req.body, { new: true });
        } else {
            profile = new UserProfile({ user: req.user.id, instruments, genres, influences, city, socialLinks, bio });
            await profile.save();
        }

        res.json(profile);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
