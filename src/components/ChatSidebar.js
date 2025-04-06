import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ChatSidebar.css";

const ChatSidebar = ({ onSelectConversation, selectedConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  // Load current user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Fetch existing conversations for the user
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (!user?.userId) return;
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/conversations/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConversations(res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    fetchConversations();
  }, [user]);

  // Search for user profiles by partial username
  const handleSearch = async () => {
    // If there's no input, show a warning or do nothing
    if (!searchUsername.trim()) {
      alert("Please enter a search term before searching.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/profile/search?username=${searchUsername}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Error searching users:", err);
    }
  };
  

  // Create a conversation when a user is selected
  const handleUserClick = async (selectedUser) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        senderId: user.userId,
        receiverId: selectedUser._id,
        participantUsernames: [user.username, selectedUser.username],
      };

      const res = await axios.post("/api/conversations", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSelectConversation(res.data);
      setConversations((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error creating/fetching conversation:", err);
    }
    setSearchUsername("");
    setSearchResults([]);
  };

  // Delete a conversation
  const handleDeleteConversation = async (e, conversation) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this conversation?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/conversations/${conversation._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConversations((prev) =>
        prev.filter((c) => c._id !== conversation._id)
      );
      if (selectedConversation?._id === conversation._id) {
        onSelectConversation(null);
      }
    } catch (err) {
      console.error("Error deleting conversation:", err);
    }
  };

  return (
    <div className="chat-sidebar">
      <h4>Messages</h4>
      <input
        type="text"
        placeholder="Search user..."
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((u) => (
            <div
              key={u._id}
              className="search-result-item"
              onClick={() =>
                handleUserClick({
                  _id: u.userId._id,
                  username: u.userId.username,
                })
              }
            >
              {u.userId.username || "Unknown User"}
            </div>
          ))}
        </div>
      )}

      <div className="conversations">
        {conversations.length === 0 ? (
          <em>No conversations found.</em>
        ) : (
          conversations.map((c) => (
            <div
              key={c._id}
              className={`conversation-item ${
                selectedConversation?._id === c._id ? "selected" : ""
              }`}
              onClick={() => onSelectConversation(c)}
            >
              <div className="conversation-header">
                <span className="conversation-username">
                  {c.participantUsernames
                    ?.filter((name) => name !== user?.username)
                    .join(", ") || "Chat"}
                </span>
                <button
                  className="delete-button"
                  onClick={(e) => handleDeleteConversation(e, c)}
                >
                  X
                </button>
              </div>
              <div className="conversation-last-message">
                {c.lastMessage?.text
                  ? c.lastMessage.text.length > 30
                    ? c.lastMessage.text.slice(0, 30) + "..."
                    : c.lastMessage.text
                  : ""}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
