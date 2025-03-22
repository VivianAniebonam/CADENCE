import React from "react";
import { useNavigate } from "react-router-dom";

const ManageGigPostings = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Manage Gig Postings 🎸</h1>
      <p>This page will be implemented in Release 2.0.</p>
      <button onClick={() => navigate("/admin-home")} style={{ padding: "10px 20px", background: "#ff9900", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}>
        Back to Admin Home
      </button>
    </div>
  );
};

export default ManageGigPostings;
