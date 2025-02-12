const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// **User Registration**
router.post('/register', async (req, res) => {
    const { username, email, password, userType } = req.body;

    try {
        // Debug: Log incoming request data
        console.log("Incoming registration data:", req.body);

        // Ensure all required fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Debug: Check if password is valid before hashing
        console.log("Password before hashing:", password);

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ username, email, password: hashedPassword, userType });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// **User Login**
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Debug: Log incoming request data
        console.log("Incoming login data:", req.body);

        // Ensure both fields are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        // Debug: Check if password is valid before comparing
        console.log("Password before comparing:", password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            token, 
            user: { id: user._id, username: user.username, email: user.email, userType: user.userType } 
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// **Protected Route (Example)**
router.get('/protected', (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        res.json({ msg: "Access granted", user: decoded });
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
});

module.exports = router;
