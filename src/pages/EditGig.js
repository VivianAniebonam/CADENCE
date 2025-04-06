import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditGig.css";

function EditGig() {
  const { gigId } = useParams();
  const [title, setTitle] = useState("");
  const [gigType, setGigType] = useState("Live Performance");
  const [genre, setGenre] = useState("");
  const [city, setCity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gigs/${gigId}`);
        const gig = response.data;
        setTitle(gig.title);
        setGigType(gig.gigType);
        setGenre(gig.genre.join(", "));
        setCity(gig.city);
        setExpiryDate(gig.expiryDate.split("T")[0]);
        setDescription(gig.description);
      } catch (error) {
        console.error("Error fetching gig:", error);
        setError("Failed to fetch gig details.");
      }
    };
    fetchGig();
  }, [gigId]);

  const handleUpdateGig = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/gigs/${gigId}`,
        {
          title,
          gigType,
          genre: genre.split(",").map((item) => item.trim()),
          city,
          expiryDate,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.msg === "Gig updated successfully") {
        navigate("/view-my-gigs");
      }
    } catch (error) {
      console.error("Update Gig Error:", error.response?.data || error);
      setError(error.response?.data?.msg || "Server Error - Gig update failed!");
    }
  };

  return (
    <div className="edit-gig-page-wrapper">
      <div className="edit-gig-container">
        <h2 className="edit-gig-title">Edit Gig Posting</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleUpdateGig}>
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

          <button type="submit" className="edit-gig-btn">
            Update Gig Posting
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditGig;
