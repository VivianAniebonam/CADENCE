import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileEdit.css";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        instruments: "",
        genres: "",
        influences: "",
        city: "",
        youtubeLink: "",
        instaLink: "",
        bio: "",
        yearsOfExperience: "",
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
                        influences: response.data.profile.influences?.join(", ") || "",
                        city: response.data.profile.city || "",
                        youtubeLink: response.data.profile.socialLinks?.youtube || "",
                        instaLink: response.data.profile.socialLinks?.instagram || "",
                        bio: response.data.profile.bio || "",
                        yearsOfExperience: response.data.profile.yearsOfExperience || "", 
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
                instruments: profile.instruments.trim() ? profile.instruments.split(",").map(i => i.trim()) : undefined,
                genres: profile.genres.trim() ? profile.genres.split(",").map(i => i.trim()) : undefined,
                influences: profile.influences.trim() ? profile.influences.split(",").map(i => i.trim()) : undefined,
                city: profile.city.trim() ? profile.city : undefined,
                bio: profile.bio.trim() ? profile.bio : undefined,
                yearsOfExperience: profile.yearsOfExperience ? Number(profile.yearsOfExperience) : undefined,
                socialLinks: {
                    youtube: profile.youtubeLink.trim() ? profile.youtubeLink : undefined,
                    instagram: profile.instaLink.trim() ? profile.instaLink : undefined,
                }
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
                <input type="text" placeholder="Enter instruments" value={profile.instruments} onChange={(e) => setProfile({ ...profile, instruments: e.target.value })} />
            </div>

            <div className="input-group">
                <label>Genres</label>
                <input type="text" placeholder="Enter genres" value={profile.genres} onChange={(e) => setProfile({ ...profile, genres: e.target.value })} />
            </div>

            <div className="input-group">
                <label>Years of Experience</label>
                <input type="number" placeholder="Years of Experience" value={profile.yearsOfExperience} onChange={(e) => setProfile({ ...profile, yearsOfExperience: e.target.value })} />
            </div>

            <div className="input-group">
                <label>Influences</label>
                <input type="text" placeholder="Enter influences" value={profile.influences} onChange={(e) => setProfile({ ...profile, influences: e.target.value })} />
            </div>

            <div className="input-group">
                <label>City</label>
                <input type="text" placeholder="Enter city" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
            </div>

            <div className="input-group">
                <label>Bio</label>
                <textarea placeholder="Tell us about yourself" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
            </div>

            <div className="button-container">
                <button className="back-btn" onClick={() => navigate("/profile")}>Back</button>
                <button className="update-btn" onClick={handleUpdate}>Update My Profile</button>
            </div>
        </div>
    );
};

export default ProfileEdit;
