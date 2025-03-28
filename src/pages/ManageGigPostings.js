import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/ManageGigs.css';

const ManageGigPostings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gigs, setGigs] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/gigs/search?username=${searchTerm}`);
      setGigs(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Error searching gigs:', error);
    }
  };

  const handleDelete = async (gigId) => {
    if (!window.confirm("Are you sure you want to delete this gig?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/gigs/${gigId}`);
      setGigs((prev) => prev.filter((gig) => gig._id !== gigId));
    } catch (error) {
      console.error("Error deleting gig:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="manage-gig-container">
        <h2 className="manage-title">Manage Gig Postings</h2>
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        <div className="gig-list">
          {searched && gigs.length === 0 ? (
            <p className="no-gigs-message">No gigs found.</p>
          ) : (
            gigs.map((gig) => (
              <div className="gig-item" key={gig._id}>
                <div className="gig-title">{gig.title}</div>
                <div className="gig-subtext">Expires: {gig.expiryDate?.split('T')[0]}</div>
                <div className="gig-actions">
                  <button className="view-button" onClick={() => window.location.href = `/gig/${gig._id}`}>
                    View Gig
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(gig._id)}>
                    Delete Gig
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ManageGigPostings;
