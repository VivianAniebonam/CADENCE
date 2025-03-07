import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/UserHome.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
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
  }, []);

  return (
    <div className="userhome-container">
      <Navbar />
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

        <button className="userhome-btn acc-btn" onClick={() => navigate("/accountSettings")}>
          Account Settings
        </button>

        <button className="userhome-btn admin-btn" onClick={() => navigate("/adminhome")}>
          Admin Home
        </button>
        
      </div>
    </div>
  );
};

export default UserHome;
