const express = require("express");
const Profile = require("../models/Profile");
const { getRecommendedProfiles, searchProfiles } = require("../controllers/profileController");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get recommended profiles (for logged-in users)
router.get("/recommended", authMiddleware, getRecommendedProfiles);

// ✅ Search profiles with filters
router.get("/search", authMiddleware, searchProfiles);

// ✅ Get current user's profile (user + profile data)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("username email");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const profile = await Profile.findOne({ userId });

    return res.json({
      user,
      profile: profile || null,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Update current user's profile or create if missing
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
      instagram: req.body.instagram || ""
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

    return res.json({ profile });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Public: Get profile by user ID (used in /user-view-profile/:id)
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("username email");
    const profile = await Profile.findOne({ userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user, profile: profile || null });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/profile/:id
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      const profile = await Profile.findOne({ userId: req.params.id });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ user, profile });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
