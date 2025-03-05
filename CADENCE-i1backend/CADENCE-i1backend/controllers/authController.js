import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
const registerUser = async (req, res) => {
  const { username, email, password, userType } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "Username already exists" });

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ msg: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If no userType is provided, default to "user"
    const newUserType = userType || "user"; // Default to "user" if not provided

    // Create new user with the provided userType (either "admin" or "user")
    const user = new User({ username, email, password: hashedPassword, userType: newUserType });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Create JWT token with userType in the payload
    const token = jwt.sign(
      { id: user._id, userType: user.userType }, // Include userType (admin or user)
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send back token and user details
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get all users for admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);  // Send the list of users to the front-end
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();  // Remove the user from the database
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export { registerUser, loginUser, getUsers, deleteUser };
