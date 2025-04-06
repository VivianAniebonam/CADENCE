import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title" onClick={() => navigate("/user-home")}>
          CADENCE 🎵
        </h1>
        <div className="navbar-links">
          <button onClick={() => navigate("/user-home")}>Home</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={() => navigate("/gig-board-menu")}>Gig Board</button>
          <button onClick={() => navigate("/chat")}>Chat</button>
          {user && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
