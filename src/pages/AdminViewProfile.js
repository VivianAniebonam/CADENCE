import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Profile.css"; // Use the same styling as user profile

const AdminViewProfile = () => {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/admin/user-profile/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data) {
                    setUser(response.data.user);
                    setProfile(response.data.profile);
                }
            } catch (error) {
                console.error("❌ Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [id]);

    return (
        <div className="profile-container">
            <h2 className="profile-title">User Profile</h2>
            
            {user ? (
                <>
                    <h3 className="username">{user.username}</h3>
                    <p className="email">Email: {user.email}</p>

                    <hr className="divider" />

                    {profile ? (
                        <>
                            <div className="bio-section">
                                <h4>Bio:</h4>
                                <p>{profile.bio || "No bio available"}</p>
                            </div>

                            <div className="info-container">
                                <p><b>Instruments:</b> {profile.instruments?.join(", ") || "None"}</p>
                                <p><b>Genres:</b> {profile.genres?.join(", ") || "None"}</p>
                                <p><b>Years of Experience:</b> {profile.yearsOfExperience || "N/A"}</p>
                                <p><b>Influences:</b> {profile.influences?.join(", ") || "None"}</p>
                                <p><b>City:</b> {profile.city || "N/A"}</p>
                                <p><b>YouTube:</b> {profile.youtube ? <a href={profile.youtube} target="_blank" rel="noopener noreferrer">{profile.youtube}</a> : "None"}</p>
                                <p><b>Instagram:</b> {profile.instagram ? <a href={profile.instagram} target="_blank" rel="noopener noreferrer">{profile.instagram}</a> : "None"}</p>
                            </div>
                        </>
                    ) : (
                        <p>No profile details available.</p>
                    )}
                </>
            ) : (
                <p>Loading user data...</p>
            )}

            <button className="back-btn" onClick={() => navigate("/manage-users")}>⬅️ Back</button>
        </div>
    );
};

export default AdminViewProfile;
