import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserGig.css";

function UserGig() {
  const { gigId } = useParams();
  const [gig, setGig] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gigs/${gigId}`);
        setGig(response.data);
      } catch (err) {
        console.error("❌ Error fetching gig:", err);
        setError("Gig not found or server error.");
      }
    };

    fetchGig();
  }, [gigId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!gig) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <div className="user-gig-container">
      <h2 className="gig-title">Gig Posting</h2>
      <div className="gig-info">
        <p><strong>Title:</strong> {gig.title}</p>
        <p><strong>Gig Type:</strong> {gig.gigType}</p>
        <p><strong>Genre:</strong> {gig.genre.join(", ")}</p>
        <p><strong>City:</strong> {gig.city}</p>
        <p><strong>Description:</strong> {gig.description}</p>
        <p><strong>Date Posted:</strong> {new Date(gig.postingDate).toISOString().split("T")[0]}</p>
        <p><strong>Expires:</strong> {new Date(gig.expiryDate).toISOString().split("T")[0]}</p>
        <p><strong>Posted By:</strong> {gig.username}</p>
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

export default UserGig;
