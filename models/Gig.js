const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user
});

module.exports = mongoose.model("Gig", gigSchema);
