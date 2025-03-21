import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ManageUsers.css";

const MyGigs = () => {
  const [search, setSearch] = useState("");
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");

      /* Change the route to the right route */
      const response = await axios.get(
        `http://localhost:5000/api/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("🔎 Search response:", response.data);
      setGigs(response.data);
    } catch (err) {
      console.error("Error searching gigs:", err);
    }
  };

  const handleDelete = async (gigId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");

       /* Change the url to the correct route */
        await axios.delete(`http://localhost:5000/api/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Gig deleted successfully");
        setGigs(gigs.filter(gig => gig._id !== gigId));
      } catch (err) {
        alert("Could not delete gig");
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="manage-users-container">
      <h1>MY GIGS</h1>

      {/* Change the url to the correct page */}
      <button className="back-btn" onClick={() => navigate("/")}>Post a New Gig</button>

      <div className="user-list">
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <div key={gig._id} className="user-card">
              <span>{gig.title}</span>
              <button onClick={() => navigate(`/gig/${gig._id}`)}>View</button>
              <button onClick={() => navigate(`/edit-gig/${gig._id}`)}>Edit</button>
              <button onClick={() => handleDelete(gig._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>You have not posted any gigs yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
