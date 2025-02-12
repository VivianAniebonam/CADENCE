const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../models/Profile");

const router = express.Router();

// **Create or Update Profile**
router.post("/", authMiddleware, async (req, res) => {
    const { instruments, genres, influences, city, socialLinks, bio } = req.body;
    
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update existing profile
            profile.instruments = instruments;
            profile.genres = genres;
            profile.influences = influences;
            profile.city = city;
            profile.socialLinks = socialLinks;
            profile.bio = bio;

            await profile.save();
            return res.json(profile);
        }

        // Create new profile
        profile = new Profile({
            user: req.user.id,
            instruments,
            genres,
            influences,
            city,
            socialLinks,
            bio
        });

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error("Error creating/updating profile:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// **Get Profile by User ID**
router.get("/:userId", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate("user", ["username", "email"]);
        if (!profile) return res.status(404).json({ msg: "Profile not found" });

        res.json(profile);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// **Delete Profile**
router.delete("/", authMiddleware, async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id });
        res.json({ msg: "Profile deleted" });
    } catch (err) {
        console.error("Error deleting profile:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
