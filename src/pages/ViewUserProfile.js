import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ViewUserProfile.css";

const ViewUserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/admin/user-profile/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data.user);
                setProfile(response.data.profile);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchProfile();
    }, [id]);

    return (
        <div className="profile-container">
            <h2 className="profile-title">USER PROFILE</h2>
            {user ? <h3 className="username">{user.username}</h3> : <p>Loading...</p>}
            {profile ? (
                <>
                    <p className="email">Email: {user?.email || "N/A"}</p>
                    <hr className="divider" />

                    <div className="bio-section">
                        <h4>Bio:</h4>
                        <p>{profile.bio || "No bio available"}</p>
                    </div>

                    <div className="grid-container">
                        <div className="grid-item"><b>Instruments:</b> {profile.instruments?.join(", ") || "None"}</div>
                        <div className="grid-item"><b>Genres:</b> {profile.genres?.join(", ") || "None"}</div>
                        <div className="grid-item"><b>Years of Experience:</b> {profile.yearsOfExperience || "N/A"}</div>
                        <div className="grid-item"><b>Influences:</b> {profile.influences?.join(", ") || "None"}</div>
                        <div className="grid-item"><b>City:</b> {profile.city || "N/A"}</div>
                        <div className="grid-item"><b>YouTube:</b> 
                            {profile.youtube ? <a href={profile.youtube} target="_blank" rel="noopener noreferrer">{profile.youtube}</a> : "None"}
                        </div>
                        <div className="grid-item"><b>Instagram:</b> 
                            {profile.instagram ? <a href={profile.instagram} target="_blank" rel="noopener noreferrer">{profile.instagram}</a> : "None"}
                        </div>
                    </div>
                </>
            ) : (
                <p>No profile found.</p>
            )}
        </div>
    );
};

export default ViewUserProfile;
