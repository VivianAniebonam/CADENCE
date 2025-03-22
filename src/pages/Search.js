import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Search.css";

const Search = () => {

  //Filters
  const [selectedFilter, setFilter] = useState("username");
  const [keywords, setKeywords] = useState("");

  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  const getProfiles = async () => {
    try {
      console.log("Searching by", selectedFilter, "with keywords:", keywords);

      // Set the params and keywords based on the selected filter
      // NOTE: searching for instrument, genre, and influences only works if they are exact matches
      let params = {};
      switch (selectedFilter) {
        case "username":
          params.username = keywords;
          break;
        case "instrument":
          params.instrument = keywords;
          break;
        case "genre":
          params.genre = keywords;
          break;
        case "influence":
          params.influence = keywords;
          break;
        case "city":
          params.city = keywords;
          break;
        default:
          break;
      }

      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/profile/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: params,
      });
      console.log("# of users found:", response.data.length);
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
      <h2 className="profile-title">MUSICIAN SEARCH</h2>
      <div className="filter-container">
        <div className="input-group">
          <div className="search-bar">
            <input
              type="text"
              placeholder="keywords here..."
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button className="search-btn" onClick={getProfiles}>Search</button>
          </div>
        </div>
        <button className="filter-btn" onClick={() => setFilter("username")}>username</button>
        <button className="filter-btn" onClick={() => setFilter("instrument")}>instrument</button>
        <button className="filter-btn" onClick={() => setFilter("genre")}>genre</button>
        <button className="filter-btn" onClick={() => setFilter("influence")}>influence</button>
        <button className="filter-btn" onClick={() => setFilter("city")}>city</button>
        <p>Searching by <b>{selectedFilter}</b></p>
      </div>

      <div className="grid-container">
        {profiles.map((profile) => (
          <div key={profile._id} className="user-card">
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
    </div>
  );
};

export default Search;
