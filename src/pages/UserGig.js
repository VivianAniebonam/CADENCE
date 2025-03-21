import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/UserGig.css"; 

function UserGig() {
  const { gigId } = useParams();
  const [title, setTitle] = useState("");
  const [gigType, setGigType] = useState("");
  const [genre, setGenre] = useState("");
  const [city, setCity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (gigId) {
      const fetchGigDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/gigs/${gigId}`);
          const gigData = response.data;
          setTitle(gigData.title);
          setGigType(gigData.gigType);
          setGenre(gigData.genre.join(", "));
          setCity(gigData.city);
          setExpiryDate(gigData.expiryDate.split("T")[0]);
          setDescription(gigData.description);

          const userResponse = await axios.get(`http://localhost:5000/api/users/${gigData.userId}`);
          setUsername(userResponse.data.username);
        } catch (error) {
          console.error("Error fetching gig details:", error);
          setError("Failed to fetch gig details.");
        }
      };
      fetchGigDetails();
    } else {
      console.log("gigId is undefined or null");
      setError("Gig ID is missing.");
    }
  }, [gigId]);

  const handleViewUserProfile = () => {
    navigate(`/user/${gigId}`); 
  };

  return (
    <div className="user-gig-page-wrapper">
      <div className="user-gig-container">
        <h2 className="user-gig-title">GIG POSTING</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="field-row">
          <div className="field-label">Title</div>
          <div className="field-value">{title}</div>
        </div>

        <div className="field-row">
          <div className="field-label">Gig Type</div>
          <div className="field-value">{gigType}</div>
        </div>

        <div className="field-row">
          <div className="field-label">Genre</div>
          <div className="field-value">{genre}</div>
        </div>

        <div className="field-row">
          <div className="field-label">City</div>
          <div className="field-value">{city}</div>
        </div>

        <div className="field-row description-row">
          <div className="field-label">Description</div>
          <div className="field-value">{description}</div>
        </div>

        <div className="field-row">
          <div className="field-label">Date Posted</div>
          <div className="field-value">{expiryDate}</div>
        </div>

        <div className="field-row">
          <div className="field-label">Expires</div>
          <div className="field-value">{expiryDate}</div>
        </div>

        <div className="field-row">
          <div className="field-label">Posted By</div>
          <div className="field-value">{username}</div>
        </div>

        <div className="button-container">
          <button className="view-profile-btn" onClick={handleViewUserProfile}>
            View User Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserGig;