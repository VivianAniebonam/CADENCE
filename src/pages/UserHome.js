import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserHome.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token
          return;
        }

        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="userhome-container">
      <h1 className="userhome-title">
        Welcome to <span className="brand-name">CADENCE</span> 🎵
      </h1>

      <div className="userhome-card">
        <h2 className="userhome-subtitle">
          Hello, {user?.username || "Musician"}! 👋
        </h2>

        <button className="userhome-btn" onClick={() => navigate("/profile")}>
          View My Profile
        </button>

        <button className="userhome-btn gig-btn" onClick={() => navigate("/gigs")}>
          Gig Board 🎸
        </button>

        <button className="userhome-btn chat-btn" onClick={() => navigate("/chat")}>
          Chat 💬
        </button>

        <button className="userhome-btn search-btn" onClick={() => navigate("/search")}>
          Search 🔍
        </button>

        <button className="userhome-btn recommended-btn" onClick={() => navigate("/recommended-profiles")}>
          Recommended Profiles ⭐
        </button>

        <button className="userhome-btn settings-btn" onClick={() => navigate("/account-settings")}>
          Account Settings ⚙️
        </button>

        <button className="userhome-btn logout-btn" onClick={() => {
          localStorage.removeItem("token"); 
          navigate("/login");
        }}>
          Sign Out 📴
        </button>
      </div>
    </div>
  );
};

export default UserHome;
