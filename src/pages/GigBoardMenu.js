import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GigBoardMenu.css";

console.log("✅ GigBoardMenu component loaded");


const GigBoardMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="gig-board-menu">
      <h2>Gig Board Menu</h2>
      <button className="gig-button" onClick={() => navigate("/gigs")}>
        Browse Gig Board
      </button>
      <button className="gig-button" onClick={() => navigate("/view-my-gigs")}>
        View My Gigs
      </button>
      <button className="gig-button" onClick={() => navigate("/post-gig")}>
        Post A New Gig
      </button>
      <button className="gig-button" onClick={() => navigate("/notifications")}>
        Notifications
      </button>

    </div>
  );
};

export default GigBoardMenu;
