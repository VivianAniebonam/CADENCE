const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  title: String,
  gigType: String,
  genre: [String],
  city: String,
  description: String,
  postingDate: Date,
  expiryDate: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
  ,
  username: String, // stored for convenience
});

module.exports = mongoose.model("Gig", gigSchema);
