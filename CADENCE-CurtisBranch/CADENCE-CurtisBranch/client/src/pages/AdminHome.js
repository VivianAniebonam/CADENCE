import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminHome.css'; // Optional: Add styling file if needed

const AdminHome = () => {
  const navigate = useNavigate();

  const handleManageUsers = () => {
    navigate("/manage-users");
  };

  const handleManageGigPostings = () => {
    navigate("/manage-gig-postings");
  };

  return (
    <div className="admin-home-container">
      <h1>Hello, Admin!</h1>

      <div className="button-container">
        <button className="admin-button" onClick={handleManageUsers}>
          Manage Users
        </button>
        <button className="admin-button" onClick={handleManageGigPostings}>
          Manage Gig Postings
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
