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
            profile: profile || null // Send null if no profile exists
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

// ✅ Update Profile (or create if missing)
router.put("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Ensure fields are properly formatted
        const updatedProfileData = {
            instruments: req.body.instruments || [],
            genres: req.body.genres || [],
            yearsOfExperience: req.body.yearsOfExperience || 0,
            influences: req.body.influences || [],
            city: req.body.city || "",
            bio: req.body.bio || "",
            youtube: req.body.youtube || "", // ✅ Ensure YouTube is stored
            instagram: req.body.instagram || "" // ✅ Ensure Instagram is stored
        };

        let profile = await Profile.findOne({ userId });

        if (profile) {
            // ✅ Update existing profile
            profile = await Profile.findOneAndUpdate(
                { userId }, 
                { $set: updatedProfileData }, 
                { new: true, runValidators: true }
            );
        } else {
            // ✅ Create new profile
            profile = new Profile({ userId, ...updatedProfileData });
            await profile.save();
        }

        return res.json({ profile });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
