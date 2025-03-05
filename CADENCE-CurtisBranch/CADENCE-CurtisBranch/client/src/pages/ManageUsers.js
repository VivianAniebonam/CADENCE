import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users
        const response = await axios.get("http://localhost:5000/api/auth/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/search-users?username=${search}`);
      setFilteredUsers(response.data); // Update users displayed with filtered data
    } catch (err) {
      console.error("Error searching users:", err);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/delete-user/${userId}`);
        alert("User deleted successfully");
        // Remove the deleted user from the list
        setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
      } catch (err) {
        alert("Error deleting user");
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
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="user-card">
              <span>{user.username}</span>
              <button onClick={() => navigate(`/profile/${user._id}`)}>View Profile</button>
              <button onClick={() => handleDelete(user._id)}>Delete User</button>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
