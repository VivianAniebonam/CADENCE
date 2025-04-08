const express = require("express");
const router = express.Router();
const Applicant = require("../models/Applicant");

// POST: Apply to a gig – prevents duplicate applications
router.post("/", async (req, res) => {
  try {
    const {
      gigId,
      posterUserId,
      posterUsername,
      title,
      applicantUserId,
      applicantUsername,
      dateApplied,
    } = req.body;

    // Check for missing required fields
    if (
      !gigId ||
      !posterUserId ||
      !posterUsername ||
      !title ||
      !applicantUserId ||
      !applicantUsername
    ) {
      return res.status(400).json({ msg: "You're missing user or gig info." });
    }

    // Check if an application already exists for this gig by this applicant
    const existingApplication = await Applicant.findOne({
      gigId,
      applicantUserId,
    });

    if (existingApplication) {
      // Return a 409 Conflict if the user has already applied
      return res.status(409).json({ msg: "You have already applied to this gig." });
    }

    // Create and save a new applicant document
    const newApplicant = new Applicant({
      gigId,
      posterUserId,
      posterUsername,
      title,
      applicantUserId,
      applicantUsername,
      dateApplied: dateApplied || new Date(),
    });

    await newApplicant.save();
    res.status(201).json({ msg: "Application submitted!" });
  } catch (err) {
    console.error("Error saving applicant:", err);
    res.status(500).json({ msg: "Server error while submitting application." });
  }
});

// GET: Retrieve notifications (applications) for a gig poster
router.get("/notifications", async (req, res) => {
  try {
    const { posterUserId } = req.query;
    if (!posterUserId) {
      return res.status(400).json({ msg: "Missing posterUserId." });
    }

    const notifications = await Applicant.find({ posterUserId }).sort({ dateApplied: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ msg: "Server error while fetching notifications." });
  }
});

module.exports = router;
