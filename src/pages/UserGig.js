import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserGig.css";

const UserGig = () => {
  const { gigId } = useParams();
  const [gig, setGig] = useState(null);
  const navigate = useNavigate();

  // Attempt to parse user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/gigs/${gigId}`);
        setGig(res.data);
      } catch (err) {
        console.error("❌ Error fetching gig:", err);
      }
    };

    fetchGig();
  }, [gigId]);

  const handleApply = async () => {
    if (!user?.userId || !gig) {
      return alert("You're missing user or gig info.");
    }

    const applicationData = {
      gigId,
      posterUserId: gig.userId,
      posterUsername: gig.username,
      title: gig.title,
      applicantUserId: user.userId,
      applicantUsername: user.username,
      dateApplied: new Date(),
    };

    try {
      console.log("Submitting applicant data:", applicationData);
      await axios.post("http://localhost:5000/api/applicants", applicationData);
      alert("🎉 Application submitted!");
    } catch (err) {
      console.error("❌ Error submitting application:", err.response?.data || err);
      alert(err.response?.data?.msg || "Error submitting application.");
    }
  };

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
        <input
          value={
            Array.isArray(gig.genre) ? gig.genre.join(", ") : gig.genre
          }
          readOnly
        />
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

      {/* Buttons at the bottom */}
      <div className="button-container">
        <button
          className="view-profile-button"
          onClick={() => navigate(`/user-view-profile/${gig.userId}`)}
        >
          View User Profile
        </button>
        <button className="apply-button" onClick={handleApply}>
          Apply To This Gig
        </button>
      </div>
    </div>
  );
};

export default UserGig;
