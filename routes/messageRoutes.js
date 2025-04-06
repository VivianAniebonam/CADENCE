const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// ✅ Send a message
router.post("/", async (req, res) => {
  const { conversationId, senderId, senderUsername, text } = req.body;

  // 🔍 Debug log to help trace errors
  console.log("📥 Received message payload:", req.body);

  // Validate
  if (!conversationId || !senderId || !senderUsername || !text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newMessage = new Message({
    conversationId,
    senderId,
    senderUsername,
    text,
    timestamp: new Date(),
  });

  try {
    const savedMessage = await newMessage.save();

    // ✅ Update the conversation with last message
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      lastUpdated: new Date(),
    });

    res.status(200).json(savedMessage);
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// ✅ Get messages for a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

module.exports = router;
