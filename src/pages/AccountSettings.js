import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AccountSettings.css"; // Ensure this CSS file exists

function AccountSettings() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      try {
        const response = await axios.delete("http://localhost:5000/api/auth/delete-account");
        if (response.status === 200) {
          alert("Account deleted successfully");
          navigate("/"); // Redirect to Landing Page/Login
        } else {
          alert("Failed to delete account. Please try again later.");
        }
      } catch (error) {
        alert("An error occurred while deleting the account.");
      }
    } else {
      alert("Account deletion canceled.");
    }
  };

  return (
    <div className="account-settings-container">
      <h2 className="account-settings-title">ACCOUNT SETTINGS</h2>

      <div className="account-settings-card">
        <h3 className="manage-account-heading">Manage My Account</h3>

        <button className="delete-account-btn" onClick={handleDeleteAccount}>
          Delete My Account
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
