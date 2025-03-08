import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminHome.css";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <h2 className="admin-title">Hello, Admin! 👋</h2>
      <p className="admin-subtitle">Manage users and gig postings</p>
      
      <div className="admin-buttons">
        <button className="admin-btn" onClick={() => navigate("/manage-users")}>
          Manage Users 👤
        </button>
        <button className="admin-btn" onClick={() => navigate("/manage-gig-postings")}>
          Manage Gig Postings 🎸
        </button>
      </div>
    </div>
  );
}

export default AdminHome;
