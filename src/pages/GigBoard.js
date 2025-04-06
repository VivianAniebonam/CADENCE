import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/GigBoard.css";

const GigBoard = () => {
  const [selectedFilter, setFilter] = useState("keyword");
  const [keywords, setKeywords] = useState("");
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  const getGigs = async () => {
    try {
      const params = {};
      if (selectedFilter === "keyword") params.keyword = keywords;
      if (selectedFilter === "username") params.username = keywords;
      if (selectedFilter === "genre") params.genre = keywords;
      if (selectedFilter === "city") params.city = keywords;

      const response = await axios.get("http://localhost:5000/api/gigs/search", { params });
      setGigs(response.data);
    } catch (error) {
      console.error("Error fetching gigs:", error);
      setGigs([]);
    }
  };

  useEffect(() => {
    getGigs(); // fetch gigs on initial render
  }, []);

  return (
    <div className="search-container">
      <h2 className="profile-title">GIG BOARD</h2>
      <p className="filter-label">Please select a search filter.</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="keywords here..."
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <button className="search-btn" onClick={getGigs}>
          Search
        </button>
      </div>

      <div className="filter-buttons">
        <button className="filter-btn" onClick={() => setFilter("keyword")}>
          Keyword
        </button>
        <button className="filter-btn" onClick={() => setFilter("username")}>
          Username
        </button>
        <button className="filter-btn" onClick={() => setFilter("genre")}>
          Genre
        </button>
        <button className="filter-btn" onClick={() => setFilter("city")}>
          City
        </button>
      </div>

      <p style={{ textAlign: "center", fontSize: "14px" }}>
        Searching by <b>{selectedFilter}</b>
      </p>

      <div className="grid-container">
        {gigs.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No gigs found. Try adjusting your search.
          </p>
        ) : (
          gigs.map((gig) => (
            <div key={gig._id} className="user-card">
              <div className="card-content">
                <h3 className="gig-title">{gig.title}</h3>
                <p>
                  <strong>Username:</strong> {gig.username}
                </p>
                <p>
                  <strong>Gig Type:</strong> {gig.gigType}
                </p>
                <p>
                  <strong>Genre:</strong>{" "}
                  {Array.isArray(gig.genre) ? gig.genre.join(", ") : gig.genre}
                </p>
                <p>
                  <strong>City:</strong> {gig.city}
                </p>
                <p>
                  <strong>Description:</strong> {gig.description}
                </p>
                <p className="expiry">
                  <strong>Expires:</strong> {gig.expiryDate?.split("T")[0]}
                </p>
              </div>
              <div className="card-buttons">
                <button
                  className="view-profile-button"
                  onClick={() => navigate(`/user-view-profile/${gig.userId}`)}
                >
                  View User Profile
                </button>
                <button
                  className="view-profile-button"
                  onClick={() => navigate(`/gig/${gig._id}`)}
                >
                  View Posting
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GigBoard;
