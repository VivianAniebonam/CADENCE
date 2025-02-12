const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../models/Profile");

const router = express.Router();

// Create/Update Profile
router.post("/", authMiddleware, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            profile = new Profile({ user: req.user.id, ...req.body });
        } else {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, req.body, { new: true });
        }

        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Get Profile
router.get("/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id }).populate("user", ["username", "email"]);
        if (!profile) return res.status(404).json({ msg: "Profile not found" });

        res.json(profile);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Delete Profile
router.delete("/", authMiddleware, async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id });
        res.json({ msg: "Profile deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
