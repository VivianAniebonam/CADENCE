const express = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getRecommendedProfiles,
  searchProfiles,
} = require("../controllers/profileController");

const router = express.Router();

// ✅ Get recommended profiles
router.get("/recommended", authMiddleware, getRecommendedProfiles);

// ✅ Search profiles
router.get("/search", authMiddleware, searchProfiles);

// ✅ Get current user's profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("username email");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const profile = await Profile.findOne({ userId });

    res.json({ user, profile: profile || null });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Update or create current user's profile
router.put("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedProfileData = {
      instruments: req.body.instruments || [],
      genres: req.body.genres || [],
      yearsOfExperience: req.body.yearsOfExperience || 0,
      influences: req.body.influences || [],
      city: req.body.city || "",
      bio: req.body.bio || "",
      youtube: req.body.youtube || "",
      instagram: req.body.instagram || "",
    };

    let profile = await Profile.findOne({ userId });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: updatedProfileData },
        { new: true, runValidators: true }
      );
    } else {
      profile = new Profile({ userId, ...updatedProfileData });
      await profile.save();
    }

    res.json({ profile });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Public: Get any user's profile by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("username email");
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await Profile.findOne({ userId });

    res.status(200).json({ user, profile: profile || null });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
