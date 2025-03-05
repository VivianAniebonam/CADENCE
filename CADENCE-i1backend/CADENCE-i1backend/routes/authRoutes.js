const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
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
    console.error(err); // Log error to understand issues
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Get all users for admin
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err); // Log error if fetching users fails
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
});

// ✅ Search Users by Username
router.get("/search-users", async (req, res) => {
  const { username } = req.query; // Get the username from query parameters

  try {
    const users = await User.find({
      username: { $regex: username, $options: "i" }, // Case-insensitive search
    });
    res.json(users); // Return filtered users
  } catch (err) {
    console.error(err); // Log error if fetching users fails
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
});

// ✅ Get Profile by User ID
router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user data based on userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Assuming that your User model has a 'profile' field or related profile data
    res.json({ user });
  } catch (err) {
    console.error(err); // Log error if fetching profile fails
    res.status(500).json({ msg: "Error fetching profile", error: err.message });
  }
});

// ✅ Delete User
router.delete("/delete-user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`Deleting user with ID: ${userId}`); // Log userId being passed

    const user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found`); // Log if the user is not found
      return res.status(404).json({ msg: "User not found" });
    }

    // Use deleteOne instead of remove
    const deleteResult = await User.deleteOne({ _id: userId });

    // Check if the delete operation was successful
    if (deleteResult.deletedCount === 0) {
      return res.status(500).json({ msg: "Failed to delete user" });
    }

    console.log(`User with ID ${userId} deleted successfully`); // Log successful deletion
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(`Error deleting user: ${err.message}`); // Log the error message
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
