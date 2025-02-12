const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    instruments: [String],
    genres: [String],
    influences: [String],
    city: { type: String },
    socialLinks: {
        instagram: { type: String },
        youtube: { type: String }
    },
    bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
