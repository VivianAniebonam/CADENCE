const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  postingDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  gigType: { type: String, required: true },
  genre: { type: [String], required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Gig", gigSchema);
