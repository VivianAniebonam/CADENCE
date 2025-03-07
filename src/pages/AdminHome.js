import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminHome.css';

function AdminHome() {
  const navigate = useNavigate();

  const handleManageUsersClick = () => {
    navigate('/manage-users'); 
  };

  const handleManageGigPostingsClick = () => {
    navigate('/manage-gig-postings'); 
  };

  return (
    <div className="admin-home-container">
      <h2 className="admin-welcome">Hello, Admin!</h2>
      <button className="manage-users-btn" onClick={handleManageUsersClick}>
        Manage Users
      </button>
      <button className="manage-gig-postings-btn" onClick={handleManageGigPostingsClick}>
        Manage Gig Postings
      </button>
    </div>
  );
}

export default AdminHome;