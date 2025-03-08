const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register User
const registerUser = async (req, res) => {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ msg: "Username already exists" });

        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ msg: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword, userType });
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// ✅ Login User (Detects Admins)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const isAdmin = user.userType === "admin";

        const token = jwt.sign(
            { id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, user, isAdmin });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// ✅ Delete Account
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        // Delete profile and user
        await Profile.findOneAndDelete({ userId });
        await User.findByIdAndDelete(userId);

        res.status(200).json({ msg: "Account deleted successfully" });
    } catch (err) {
        console.error("Error deleting account:", err);
        res.status(500).json({ msg: "Failed to delete account", error: err.message });
    }
};

module.exports = { registerUser, loginUser, deleteAccount };
