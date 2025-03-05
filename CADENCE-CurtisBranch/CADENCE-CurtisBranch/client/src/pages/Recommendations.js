import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MusicianSearch.css";

const Recommendations = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);

    //right now, it just gets all the current profiles (same as musician search)
    const getRecommendations = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/profile/all", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProfiles(response.data);

            console.log(response.data);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    const viewProfile = async (profile) => {
        try{
         navigate(`/profile/${profile.userId._id}`);
        } catch (error) {
         console.error("Error opening profile:", error);
         }
     }

    useEffect(() => {
        getRecommendations();
    }, []);

    return (
        <div className="search-container">
            <h2 className="profile-title">RECOMMENDED PROFILES</h2>
            <div className="grid-container">
                {profiles.map((profile) => (
                    <div key={profile._id} className="user-card" onClick={() => viewProfile(profile)}>
                        <h3 className="username">{profile.userId?.username || "N/A"}</h3>
                        <p><b>Instruments:</b> {profile.instruments.join(", ")}</p>
                        <p><b>Genres:</b> {profile.genres.join(", ")}</p>
                        <p><b>Influences:</b> {profile.influences.join(", ")}</p>
                        <p><b>City:</b> {profile.city}</p>
                        <p><b>Years of Experience:</b> {profile.yearsOfExperience}</p>
                    </div>
                ))}
            </div>
            <button className="shuffle-btn" onClick={getRecommendations}>Shuffle</button>
        </div>
    );
};

export default Recommendations;
