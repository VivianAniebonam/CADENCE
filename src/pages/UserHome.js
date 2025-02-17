import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css"; // Ensure CSS is correctly imported

function UserHome() {
  const [userName, setUserName] = useState(""); // Store username dynamically
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Fetch user details from localStorage or API
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token
        if (!token) {
          navigate("/login"); // Redirect to login if not authenticated
          return;
        }

        // Fetch user details from the backend
        const response = await axios.get("http://localhost:5001/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserName(response.data.username); // Set the username dynamically
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect if user is not authenticated
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="home-container">
      {/* Floating Music Notes Animation */}
      <div className="music-notes">
        <span>🎵</span> <span>🎶</span> <span>🎸</span> <span>🎼</span>
      </div>

      {/* Welcome Message */}
      <h1 className="home-title">🎧 Welcome to CADENCE 🎶</h1>
      <h2 className="home-subtitle">
        Hello, <span className="user-name">{userName || "User"} </span> 👋
      </h2>

      {/* Button Group */}
      <div className="button-group">
        <button className="home-btn profile-btn" onClick={() => navigate("/profile")}>
          🎤 View My Profile
        </button>
        <button className="home-btn gig-btn" onClick={() => navigate("/gig-board")}>
          🎸 Gig Board
        </button>
        <button className="home-btn chat-btn" onClick={() => navigate("/chat")}>
          💬 Chat
        </button>
      </div>
    </div>
  );
}

export default UserHome;
