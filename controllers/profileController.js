const Profile = require("../models/Profile");
const User = require("../models/User");

// ✅ Get Recommended Profiles
const getRecommendedProfiles = async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ userId: req.user.id });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const recommendedProfiles = await Profile.find({
      userId: { $ne: req.user.id },
      $or: [
        { genres: { $in: userProfile.genres } },
        { influences: { $in: userProfile.influences } },
        { city: userProfile.city }
      ]
    }).limit(3);

    res.status(200).json(recommendedProfiles);
  } catch (error) {
    console.error("Get Recommended Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Search Profiles with Filters (Partial Username Support)
const searchProfiles = async (req, res) => {
  try {
    const { username, instrument, genre, influence, city } = req.query;
    const filter = {};

    // Search by username (partial match, case-insensitive)
    if (username) {
      const users = await User.find({
        username: { $regex: username, $options: "i" }
      });

      if (!users.length) {
        return res.status(404).json({ message: "No users found" });
      }

      filter.userId = { $in: users.map(u => u._id) };
    }

    if (instrument) {
      filter.instruments = { $in: [instrument] };
    }

    if (genre) {
      filter.genres = { $in: [genre] };
    }

    if (influence) {
      filter.influences = { $in: [influence] };
    }

    if (city) {
      filter.city = { $regex: new RegExp(city, "i") };
    }

    const profiles = await Profile.find(filter).populate("userId", "username email");

    if (!profiles.length) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Search Profiles Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getRecommendedProfiles,
  searchProfiles
};
