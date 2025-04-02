const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const gigController = require("../controllers/gigController");

// ✅ POST a new gig (requires authentication)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, gigType, genre, city, expiryDate, description } = req.body;

    if (!title || !gigType || !genre || !city || !expiryDate || !description) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const postingDate = new Date();

    const newGig = new (require("../models/Gig"))({
      userId: req.user.id,
      username: req.user.username,
      title,
      gigType,
      genre,
      city,
      postingDate,
      expiryDate,
      description,
    });

    await newGig.save();

    res.status(201).json({ msg: "Gig posted successfully", gig: newGig });
  } catch (error) {
    console.error("Error posting gig:", error);
    res.status(500).json({ msg: "Server Error - Could not post gig." });
  }
});

// ✅ GET logged-in user’s gigs
router.get("/my-gigs", authMiddleware, async (req, res) => {
  try {
    const gigs = await require("../models/Gig").find({ userId: req.user.id }).sort({ expiryDate: 1 });
    res.json(gigs);
  } catch (error) {
    console.error("Error fetching user's gigs:", error);
    res.status(500).json({ msg: "Server Error - Could not retrieve gigs." });
  }
});

// ✅ PUT update a specific gig
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, gigType, genre, city, expiryDate, description } = req.body;

    const updatedGig = await require("../models/Gig").findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, gigType, genre, city, expiryDate, description },
      { new: true }
    );

    if (!updatedGig) {
      return res.status(404).json({ msg: "Gig not found or unauthorized." });
    }

    res.json({ msg: "Gig updated successfully", gig: updatedGig });
  } catch (error) {
    console.error("Error updating gig:", error);
    res.status(500).json({ msg: "Server Error - Could not update gig." });
  }
});

// ✅ Public Routes
router.get("/", gigController.listGigs);                        // All gigs or by username
router.get("/search", gigController.searchGigs);               // Search with filters
router.get("/:id", gigController.viewGig);                     // View gig by ID
router.delete("/:id", gigController.deleteGig);                // Delete gig by ID

module.exports = router;
