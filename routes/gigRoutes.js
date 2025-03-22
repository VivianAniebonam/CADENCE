const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * ✅ POST a New Gig
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, gigType, genre, city, expiryDate, description } = req.body;

    if (!title || !gigType || !genre || !city || !expiryDate || !description) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const postingDate = new Date();

    const newGig = new Gig({
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
    console.error("❌ Error posting gig:", error);
    res.status(500).json({ msg: "Server Error - Could not post gig." });
  }
});

/**
 * ✅ GET Logged-in User’s Gigs
 */
router.get("/my-gigs", authMiddleware, async (req, res) => {
  try {
    const gigs = await Gig.find({ userId: req.user.id }).sort({ expiryDate: 1 });
    res.json(gigs);
  } catch (error) {
    console.error("❌ Error fetching user's gigs:", error);
    res.status(500).json({ msg: "Server Error - Could not retrieve gigs." });
  }
});

/**
 * ✅ GET a Single Gig by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ msg: "Gig not found" });
    }
    res.json(gig);
  } catch (error) {
    console.error("❌ Error fetching gig:", error);
    res.status(500).json({ msg: "Server Error - Could not retrieve gig." });
  }
});

/**
 * ✅ UPDATE a Gig
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, gigType, genre, city, expiryDate, description } = req.body;

    const updatedGig = await Gig.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, gigType, genre, city, expiryDate, description },
      { new: true }
    );

    if (!updatedGig) {
      return res.status(404).json({ msg: "Gig not found or unauthorized." });
    }

    res.json({ msg: "Gig updated successfully", gig: updatedGig });
  } catch (error) {
    console.error("❌ Error updating gig:", error);
    res.status(500).json({ msg: "Server Error - Could not update gig." });
  }
});

/**
 * ✅ DELETE a Gig
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const gig = await Gig.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!gig) {
      return res.status(404).json({ msg: "Gig not found or unauthorized." });
    }

    res.json({ msg: "Gig deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting gig:", error);
    res.status(500).json({ msg: "Server Error - Could not delete gig." });
  }
});

module.exports = router;
