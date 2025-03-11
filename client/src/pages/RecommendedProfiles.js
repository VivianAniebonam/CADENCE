import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Search.css";

const RecommendedProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  // ISSUE: userId is not being returned in the response data
  const getProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/profile/recommended", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]);
    }
  };

  const viewProfile = async (profile) => {
    try {
      navigate(`/profile/${profile.userId._id}`);
    } catch (error) {
      console.error("Error opening profile:", error);
    }
  }

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="search-container">
      <h2 className="profile-title">RECOMMENDATIONS</h2>
      <p>These are your Musical Recommendations! This selection is based on your genres, instruments, and city.</p>
      <div className="grid-container">
        {profiles.map((profile) => (
          <div key={profile._id} className="user-card" onClick={() => viewProfile(profile)}>
            <h2 className="username">{profile.userId?.username || "N/A"}</h2>
            <p><b>Instruments:</b> {profile.instruments.join(", ")}</p>
            <p><b>Genres:</b> {profile.genres.join(", ")}</p>
            <p><b>Influences:</b> {profile.influences.join(", ")}</p>
            <p><b>City:</b> {profile.city}</p>
            <p><b>Years of Experience:</b> {profile.yearsOfExperience}</p>
            <button className="view-profile-button" onClick={() => viewProfile(profile)}>View Full Profile</button>
          </div>
        ))}
      </div>
      <br/>
      <div className="search-bar">
        {/*Shuffle doesn't do anything right now*/}
      <button className="search-btn" onClick={getProfiles}>Shuffle</button>
      </div>
    </div>
  );
};

export default RecommendedProfiles;
