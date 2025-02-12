const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    instruments: [String],
    genres: [String],
    influences: [String],
    city: String,
    socialLinks: {
        instagram: String,
        youtube: String
    },
    bio: String
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
