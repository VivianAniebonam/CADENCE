const express = require("express");
const router = express.Router();
const Applicant = require("../models/Applicant");

// ✅ Apply to a gig
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
    console.error("❌ Error saving applicant:", err);
    res.status(500).json({ msg: "Server error while submitting application." });
  }
});

module.exports = router;
