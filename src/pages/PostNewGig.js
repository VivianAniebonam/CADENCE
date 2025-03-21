import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PostGig.css";

function PostGig() {
  const [title, setTitle] = useState("");
  const [gigType, setGigType] = useState("Live Performance");
  const [genre, setGenre] = useState("");
  const [city, setCity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePostGig = async (e) => {
    e.preventDefault();
    setError("");

    try {
      
      const userId = "YOUR_USER_ID";
      const username = "YOUR_USERNAME";

      const response = await axios.post("http://localhost:5000/api/gigs", {
        userId,
        username,
        title,
        gigType,
        genre: genre.split(",").map((item) => item.trim()),
        city,
        expiryDate,
        description,
      });

      console.log("Post Gig Response:", response.data);

      if (response.data.msg === "Gig posted successfully") {
        navigate("/gigboard"); 
      }
    } catch (error) {
      console.error("Post Gig Error:", error.response?.data || error);
      setError(error.response?.data?.msg || "Server Error - Gig posting failed!");
    }
  };

  return (
    <div className="post-gig-container">
      <div className="post-gig-card">
        <h2 className="post-gig-title">Post a New Gig</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handlePostGig}>
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Gig Type</label>
            <select
              value={gigType}
              onChange={(e) => setGigType(e.target.value)}
              required
            >
              <option value="Live Performance">Live Performance</option>
              <option value="Recording Session">Recording Session</option>
              <option value="Bandmate Wanted">Bandmate Wanted</option>
              <option value="Jam Session">Jam Session</option>
              <option value="Online Collaboration">Online Collaboration</option>
            </select>
          </div>

          <div className="input-group">
            <label>Genre(s)</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g., Rock, Jazz"
              required
            />
          </div>

          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="post-gig-btn">
            Post to Gig Board
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostGig;