import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserGig.css";

const UserGig = () => {
  const { gigId } = useParams();
  const [gig, setGig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/gigs/${gigId}`);
        console.log("🎸 GIG RESPONSE:", res.data);
        setGig(res.data);
      } catch (err) {
        console.error("❌ Error fetching gig:", err);
      }
    };

    fetchGig();
  }, [gigId]);

  if (!gig) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Gig Posting</h2>

      <div className="form-group">
        <label>Title</label>
        <input value={gig.title} readOnly />
      </div>
      <div className="form-group">
        <label>Gig Type</label>
        <input value={gig.gigType} readOnly />
      </div>
      <div className="form-group">
        <label>Genre</label>
        <input value={Array.isArray(gig.genre) ? gig.genre.join(", ") : gig.genre} readOnly />
      </div>
      <div className="form-group">
        <label>City</label>
        <input value={gig.city} readOnly />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={gig.description} readOnly />
      </div>
      <div className="form-group">
        <label>Date Posted</label>
        <input value={gig.postingDate?.split("T")[0]} readOnly />
      </div>
      <div className="form-group">
        <label>Expires</label>
        <input value={gig.expiryDate?.split("T")[0]} readOnly />
      </div>
      <div className="form-group">
        <label>Posted By</label>
        <input value={gig.username || "Unknown"} readOnly />
      </div>

      <button
        className="view-profile-button"
        onClick={() => {
          console.log("Navigating to user profile of ID:", gig.userId);
          navigate(`/user-view-profile/${gig.userId}`);
        }}
      >
        View User Profile
      </button>
    </div>
  );
};

export default UserGig;
