const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new conversation or return an existing one
router.post("/", authMiddleware, async (req, res) => {
  const { senderId, receiverId, participantUsernames } = req.body;

  try {
    // Check if a conversation already exists with both participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        participantUsernames,
        lastMessage: { text: "" },
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error("Error creating/fetching conversation:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all conversations for a user
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a conversation by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Ensure the requesting user is a participant
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await conversation.deleteOne();
    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (err) {
    console.error("Error deleting conversation:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
