import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MyGigs.css"; // You can keep or rename this if needed

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchGigs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gigs/my-gigs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🎸 My Gigs:", response.data);
      setGigs(response.data);
    } catch (err) {
      console.error("❌ Error fetching gigs:", err);
    }
  };

  const handleDelete = async (gigId) => {
    if (!window.confirm("Are you sure you want to delete this gig?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/gigs/${gigId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Gig deleted");
      setGigs((prev) => prev.filter((gig) => gig._id !== gigId));
    } catch (err) {
      console.error("❌ Could not delete gig:", err);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="manage-users-container">
      <h1 style={{ color: "#f47c00" }}>MY GIGS</h1>

      <button className="back-btn" onClick={() => navigate("/post-gig")}>
  Post A New Gig
</button>


      <div className="user-list">
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <div key={gig._id} className="user-card">
              <span className="gig-title">
                <strong>{gig.title}</strong> ({gig.city})
              </span>
              <div className="button-group">
              <button onClick={() => navigate(`/gig/${gig._id}`)}>View</button>
                <button onClick={() => navigate(`/edit-gig/${gig._id}`)}>Edit</button>
                <button onClick={() => handleDelete(gig._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>
            <em>You have not posted any gigs yet.</em>
          </p>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
