import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState(null);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data.user);
            setProfile(response.data.profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-title">🎵 MY PROFILE</h2>
            <h3 className="username">{user?.username || "User"}</h3>
            <p className="email">📧 {user?.email || "N/A"}</p>

            <hr className="divider" />

            {profile ? (
                <>
                    <div className="bio-section">
                        <h4>📝 Bio:</h4>
                        <p>{profile.bio || "No bio available"}</p>
                    </div>

                    <div className="profile-details">
                        <p><b>🎸 Instruments:</b> {profile.instruments?.join(", ") || "None"}</p>
                        <p><b>🎼 Genres:</b> {profile.genres?.join(", ") || "None"}</p>
                        <p><b>⏳ Years of Experience:</b> {profile.yearsOfExperience || "N/A"}</p>
                        <p><b>🎤 Influences:</b> {profile.influences?.join(", ") || "None"}</p>
                        <p><b>📍 City:</b> {profile.city || "N/A"}</p>
                        <p><b>📹 YouTube:</b> 
                            {profile.youtube ? <a href={profile.youtube} target="_blank" rel="noopener noreferrer">View Profile</a> : "None"}
                        </p>
                        <p><b>📸 Instagram:</b> 
                            {profile.instagram ? <a href={profile.instagram} target="_blank" rel="noopener noreferrer">View Profile</a> : "None"}
                        </p>
                    </div>
                </>
            ) : (
                <p>No profile found. Please update your profile.</p>
            )}

            <button className="edit-btn" onClick={() => navigate("/edit-profile")}>Edit My Profile</button>
        </div>
    );
};

export default Profile;
