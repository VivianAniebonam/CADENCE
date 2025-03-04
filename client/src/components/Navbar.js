import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="navbar-title" onClick={() => navigate("/")}>
        CADENCE 🎵
      </h1>
      <div className="navbar-links">
        <button onClick={() => navigate("/user-home")}>Home</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/gigs")}>Gig Board</button>
        <button onClick={() => navigate("/chat")}>Chat</button>
      </div>
    </nav>
  );
};

export default Navbar;
