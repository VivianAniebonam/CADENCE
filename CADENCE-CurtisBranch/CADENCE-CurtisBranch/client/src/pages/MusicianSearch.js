import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MusicianSearch.css";

const MusicianSearch = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("username");
    const [profiles, setProfiles] = useState([]);

    const getProfiles = async () => {
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

    // currently, search does nothing
    const searchProfiles = async () => {
        try {
            alert("Should search for profiles.");
        } catch (error) {
            console.error("Error searching profiles:", error);
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
        getProfiles();
    }, []);

    return (
        <div className="search-container">
            <h2 className="profile-title">MUSICIAN SEARCH</h2>
            <div className="filter-container">
                <div className="input-group">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="keywords here..."
                        />
                        <button className="search-btn" onClick={searchProfiles}>Search</button>
                    </div>
                </div>
                <button className="filter-btn" onClick={() => setFilter("username")}>username</button>
                <button className="filter-btn" onClick={() => setFilter("instrument")}>instrument</button>
                <button className="filter-btn" onClick={() => setFilter("genre")}>genre</button>
                <button className="filter-btn" onClick={() => setFilter("influence")}>influence</button>
                <button className="filter-btn" onClick={() => setFilter("city")}>city</button>
                <p>Searching by <b>{filter}</b></p>
            </div>

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
        </div>
    );
};

export default MusicianSearch;
