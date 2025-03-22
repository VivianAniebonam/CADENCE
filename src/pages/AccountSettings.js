import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AccountSettings.css";

function AccountSettings() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("http://localhost:5000/api/auth/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Account deleted successfully");
        localStorage.removeItem("token"); // Clear session
        navigate("/login"); // Redirect to Login page
      } else {
        alert("Failed to delete account. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while deleting the account.");
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

        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate("/user-home")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
