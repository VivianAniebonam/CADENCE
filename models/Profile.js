const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    instruments: { type: [String], required: true },  // Example: ["Guitar", "Drums"]
    genres: { type: [String], required: true },       // Example: ["Rock", "Jazz"]
    influences: { type: [String] },                   // Example: ["Jimi Hendrix", "The Beatles"]
    city: { type: String, required: true },           // Example: "Toronto"
    socialLinks: {
        instagram: { type: String },
        youtube: { type: String },
        soundcloud: { type: String },
    },
    bio: { type: String, maxlength: 500 },
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
