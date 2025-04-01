import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

const UserViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${id}`);
        console.log("🎤 USER PROFILE RESPONSE:", res.data);
        setUser(res.data.user);
        setProfile(res.data.profile);
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      }
    };

    if (id) {
      console.log("🔍 Fetching profile for user ID:", id);
      fetchUserProfile();
    }
  }, [id]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      {!user && <p>No user data.</p>}
      {!profile && <p>No profile data.</p>}

      {user && (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      )}

      {profile && (
        <>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><strong>Genres:</strong> {profile.genres.join(", ")}</p>
          <p><strong>Instruments:</strong> {profile.instruments.join(", ")}</p>
          <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
          <p><strong>Influences:</strong> {profile.influences?.join(", ")}</p>
          <p><strong>City:</strong> {profile.city || "N/A"}</p>
          {profile.youtube && (
            <p><strong>🎥 YouTube:</strong> <a href={profile.youtube} target="_blank" rel="noreferrer">View Channel</a></p>
          )}
          {profile.instagram && (
            <p><strong>📸 Instagram:</strong> <a href={profile.instagram} target="_blank" rel="noreferrer">View Profile</a></p>
          )}
        </>
      )}

      <button className="view-profile-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default UserViewProfile;
