const Profile = require("../models/Profile");
const User = require("../models/User");

// Get Recommended Profiles
const getRecommendedProfiles = async (req, res) => {
    try {
        const userProfile = await Profile.findOne({ userId: req.user.id });
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        // Search for profiles with matching genres, influences, or city
        const recommendedProfiles = await Profile.find({
            $or: [
                { genres: { $in: userProfile.genres } },
                { influences: { $in: userProfile.influences } },
                { city: userProfile.city }
            ],
            userId: { $ne: req.user.id } // Exclude the current user
        }).limit(3); // Show only 3 matched profiles

        res.status(200).json(recommendedProfiles);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Search profiles based on filters
const searchProfiles = async (req, res) => {
    try {
        const { username, instrument, genre, influence, city } = req.query;
        let filter = {};

        //  Search by username (must match a user)
        if (username) {
            const user = await User.findOne({ username: { $regex: username, $options: "i" } });
            if (user) filter.userId = user._id;
        }

        //  Search by instrument
        if (instrument) filter.instruments = { $in: [instrument] };

        //  Search by genre
        if (genre) filter.genres = { $in: [genre] };

        //  Search by influence 
        if (influence) filter.influences = { $in: [influence] };

        //  Search by city 
        if (city) filter.city = { $regex: new RegExp(city, "i") }; // Case-insensitive search

        //  Find profiles matching the search criteria
        const profiles = await Profile.find(filter).populate("userId", "username email");

        if (profiles.length === 0) {
            return res.status(404).json({ message: "No profiles found" });
        }

        res.status(200).json(profiles);
    } catch (error) {
        console.error("Search Profiles Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Export both functions
module.exports = { getRecommendedProfiles, searchProfiles };



