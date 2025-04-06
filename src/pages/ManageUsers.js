import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/admin/search-users?username=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("🔎 Search response:", response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      console.error("❌ Error searching users:", err);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/delete-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("✅ User deleted successfully");
        setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
      } catch (err) {
        alert("❌ Error deleting user");
      }
    }
  };

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="user-card">
              <span>{user.username}</span>
              <button onClick={() => navigate(`/admin-view-profile/${user._id}`)}>View Profile</button>

              <button onClick={() => handleDelete(user._id)}>Delete User</button>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      <button className="back-btn" onClick={() => navigate("/admin-home")}>⬅️ Back</button>
    </div>
  );
};

export default ManageUsers;
