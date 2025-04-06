const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gig",
    required: true,
  },
  posterUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posterUsername: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  applicantUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicantUsername: {
    type: String,
    required: true,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Applicant", applicantSchema);
