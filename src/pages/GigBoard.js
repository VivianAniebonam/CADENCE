import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Search.css";

const GigBoard = () => {

  //Filters
  const [selectedFilter, setFilter] = useState("keyword");
  const [keywords, setKeywords] = useState("");

  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  const getGigs = async () => {
    try {
      console.log("Searching by", selectedFilter, "with keywords:", keywords);

      // Set the params and keywords based on the selected filter
      let params = {};
      switch (selectedFilter) {
        case "keyword":
          params.keyword = keywords;
          break;
        case "username":
          params.username = keywords;
          break;
        case "genre":
          params.genre = keywords;
          break;
        case "city":
          params.city = keywords;
          break;
        default:
          break;
      }

      const token = localStorage.getItem("token");

      /* Change the url to the correct route */
      const response = await axios.get("http://localhost:5000/api/gigs", {
        headers: { Authorization: `Bearer ${token}` },
        params: params,
      });
      console.log("# of gigs found:", response.data.length);
      setGigs(response.data);
      //setGigs(sampleGigs);
    } catch (error) {
      console.error("Error fetching gigs:", error);
      setGigs([]);
    }
  };

  const viewPosting = async (gig) => {
    try {
      navigate(`/gig/${gig._id}`);
    } catch (error) {
      console.error("Error opening gig:", error);
    }
  }

  useEffect(() => {
    getGigs();
  }, []);

  return (
    <div className="search-container">
      <h2 className="profile-title">GIG BOARD</h2>
      <div className="filter-container">
        <div className="input-group">
          <div className="search-bar">
            <input
              type="text"
              placeholder="keywords here..."
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button className="search-btn" onClick={getGigs}>Search</button>
          </div>
        </div>
        <button className="filter-btn" onClick={() => setFilter("keyword")}>keyword</button>
        <button className="filter-btn" onClick={() => setFilter("username")}>username</button>
        <button className="filter-btn" onClick={() => setFilter("genre")}>genre</button>
        <button className="filter-btn" onClick={() => setFilter("city")}>city</button>
        <p>Searching by <b>{selectedFilter}</b></p>
      </div>

      <div className="grid-container">
        {gigs.map((gig) => (
          <div key={gig._id} className="user-card">
            <h2 className="username">{gig.title}</h2>
            <h2>{gig.createdBy?.username || "N/A"}</h2>
            
            <p>Gig type here</p>
            {/*Fix:   <p>{gig.gigType}</p> */}

            <p>{gig.description}</p>
            <br/>

            <p style={{fontSize: '.85em'}}>Expires: Date here</p> 
            {/*Fix:   <p style={{fontSize: '.85em'}}>Expires: {gig.expiryDate}</p> */}
            
            <button className="view-profile-button" onClick={() => viewPosting(gig)}>View Posting</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GigBoard;
