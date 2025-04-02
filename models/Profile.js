const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    instruments: {
        type: [String],
        default: []
    },
    genres: {
        type: [String],
        default: []
    },
    yearsOfExperience: {
        type: Number,
        default: 0
    },
    influences: {
        type: [String],
        default: []
    },
    city: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    youtube: { // ✅ Ensure YouTube is stored
        type: String,
        default: ""
    },
    instagram: { // ✅ Ensure Instagram is stored
        type: String,
        default: ""
    },
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
