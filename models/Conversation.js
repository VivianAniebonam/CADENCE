const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    participantUsernames: {
      type: [String], // Store usernames for quick display
      default: [],
    },
    lastMessage: {
      text: {
        type: String,
        default: "",
      },
      // Optionally, add other properties like sender, timestamp, etc.
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

module.exports = mongoose.model("Conversation", ConversationSchema);
