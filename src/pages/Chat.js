import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatMain from "../components/ChatMain";
import axios from "axios";
import "../styles/Chat.css";

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    console.log("👤 Loaded user:", user);
    console.log("💬 Selected conversation:", selectedConversation);
  }, [user, selectedConversation]);

  // Fetch messages whenever a conversation is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation?._id || !user?.userId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `/api/messages/${selectedConversation._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const formatted = res.data.map((msg) => ({
          ...msg,
          fromSelf: msg.senderId === user.userId,
        }));
        setMessages(formatted);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [selectedConversation, user]);

  // Send a message
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConversation?._id || !user?.userId) {
      console.warn("Missing data", { newMessage, selectedConversation, user });
      return;
    }
    const payload = {
      conversationId: selectedConversation._id,
      senderId: user.userId,
      senderUsername: user.username,
      text: newMessage,
    };
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/messages", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => [...prev, { ...res.data, fromSelf: true }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <ChatSidebar
        onSelectConversation={setSelectedConversation}
        selectedConversation={selectedConversation}
      />
      <ChatMain
        selectedConversation={selectedConversation}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSend={handleSend}
        user={user}
      />
    </div>
  );
};

export default Chat;
