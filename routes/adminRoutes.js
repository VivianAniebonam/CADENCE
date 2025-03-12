const express = require("express");
const User = require("../models/User");
const Profile = require("../models/Profile"); 
const Gig = require("../models/Gig");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/**
 * ✅ GET ALL USERS (Admins Only)
 * API: GET /api/admin/users
 */
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find({}, "username email userType");
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching users" });
    }
});

/**
 * ✅ SEARCH USERS BY USERNAME (Case-Insensitive)
 * API: GET /api/admin/search-users?username=<username>
 */
router.get("/search-users", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.status(400).json({ msg: "Username required" });

        const users = await User.find({
            username: { $regex: new RegExp(username, "i") } // Case-insensitive search
        });

        console.log("🔎 Search results:", users);
        res.json(users);
    } catch (err) {
        console.error("❌ Error searching users:", err);
        res.status(500).json({ msg: "Error searching users" });
    }
});

/**
 * ✅ GET USER PROFILE BY ID (Admins Only)
 * API: GET /api/admin/user-profile/:id
 */
router.get("/user-profile/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch user details
        const user = await User.findById(id).select("username email");
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Fetch profile details
        const profile = await Profile.findOne({ userId: id });

        res.json({
            user,
            profile: profile || null
        });
    } catch (err) {
        console.error("❌ Error fetching user profile:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});

/**
 * ✅ DELETE A USER (Admins Only)
 * API: DELETE /api/admin/delete-user/:userId
 */
router.delete("/delete-user/:userId", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ msg: "User not found" });

        // Delete associated profile
        await Profile.findOneAndDelete({ userId });

        res.json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error("❌ Delete User Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

/**
 * ✅ GET ALL GIGS (Admins Only)
 * API: GET /api/admin/gigs
 */
router.get("/gigs", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const gigs = await Gig.find({});
        res.json(gigs);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching gigs" });
    }
});

module.exports = router;
