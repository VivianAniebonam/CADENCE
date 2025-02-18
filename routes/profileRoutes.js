const express = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get Profile (return user & profile separately)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user details
        const user = await User.findById(userId).select("username email");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Get profile details
        const profile = await Profile.findOne({ userId });

        return res.json({
            user,
            profile: profile || {
                instruments: [],
                genres: [],
                yearsOfExperience: 0,
                influences: [],
                city: "",
                bio: "",
                socialLinks: {}
            } // Return empty profile structure if it doesn't exist
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

// ✅ Update Profile (modify only updated fields)
router.put("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        let profile = await Profile.findOne({ userId });

        if (!profile) {
            // ✅ Create new profile if missing
            profile = new Profile({ userId, ...req.body });
            await profile.save();
        } else {
            // ✅ Update only provided fields, retain existing data
            Object.keys(req.body).forEach(key => {
                if (req.body[key] !== undefined && req.body[key] !== null) {
                    profile[key] = req.body[key];
                }
            });
            await profile.save();
        }

        return res.json({ profile });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
