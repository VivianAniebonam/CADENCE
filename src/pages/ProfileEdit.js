import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileEdit.css";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        instruments: "",
        genres: "",
        influences: "", // ✅ Added influences
        city: "",
        bio: "",
        yearsOfExperience: "",
        youtube: "",
        instagram: ""
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.profile) {
                    setProfile({
                        instruments: response.data.profile.instruments?.join(", ") || "",
                        genres: response.data.profile.genres?.join(", ") || "",
                        influences: response.data.profile.influences?.join(", ") || "", // ✅ Fixed influences
                        city: response.data.profile.city || "",
                        bio: response.data.profile.bio || "",
                        yearsOfExperience: response.data.profile.yearsOfExperience || "", 
                        youtube: response.data.profile.youtube || "",
                        instagram: response.data.profile.instagram || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        getProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const updatedProfile = {
                instruments: profile.instruments ? profile.instruments.split(",").map(i => i.trim()) : [],
                genres: profile.genres ? profile.genres.split(",").map(i => i.trim()) : [],
                influences: profile.influences ? profile.influences.split(",").map(i => i.trim()) : [], // ✅ Ensure influences are updated
                city: profile.city,
                bio: profile.bio,
                yearsOfExperience: Number(profile.yearsOfExperience),
                youtube: profile.youtube,
                instagram: profile.instagram
            };

            const response = await axios.put("http://localhost:5000/api/profile", updatedProfile, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data) {
                alert("Profile updated successfully!");
                navigate("/profile");
            }
        } catch (error) {
            alert("Something went wrong while updating your profile.");
            console.error("Update Error:", error.response);
        }
    };

    return (
        <div className="profile-edit-container">
            <h2 className="profile-edit-title">EDIT PROFILE</h2>

            <div className="input-group">
                <label>Instruments</label>
                <input 
                    type="text" 
                    placeholder="Enter instruments (comma-separated)" 
                    value={profile.instruments} 
                    onChange={(e) => setProfile({ ...profile, instruments: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>Genres</label>
                <input 
                    type="text" 
                    placeholder="Enter genres (comma-separated)" 
                    value={profile.genres} 
                    onChange={(e) => setProfile({ ...profile, genres: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>Influences</label> {/* ✅ Added influences */}
                <input 
                    type="text" 
                    placeholder="Enter influences (comma-separated)" 
                    value={profile.influences} 
                    onChange={(e) => setProfile({ ...profile, influences: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>Years of Experience</label>
                <input 
                    type="number" 
                    placeholder="Enter years of experience" 
                    value={profile.yearsOfExperience} 
                    onChange={(e) => setProfile({ ...profile, yearsOfExperience: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>City</label>
                <input 
                    type="text" 
                    placeholder="Enter your city" 
                    value={profile.city} 
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>Bio</label>
                <textarea 
                    placeholder="Tell us about yourself" 
                    value={profile.bio} 
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>YouTube</label>
                <input 
                    type="text" 
                    placeholder="Enter your YouTube link" 
                    value={profile.youtube} 
                    onChange={(e) => setProfile({ ...profile, youtube: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>Instagram</label>
                <input 
                    type="text" 
                    placeholder="Enter your Instagram link" 
                    value={profile.instagram} 
                    onChange={(e) => setProfile({ ...profile, instagram: e.target.value })} 
                />
            </div>

            <div className="button-container">
                <button className="back-btn" onClick={() => navigate("/profile")}>Back</button>
                <button className="update-btn" onClick={handleUpdate}>Update My Profile</button>
            </div>
        </div>
    );
};

export default ProfileEdit;
