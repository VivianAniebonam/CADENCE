// components/UserSearch.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/UserSearch.css";

const UserSearch = ({ onStartChat }) => {
  const [searchUsername, setSearchUsername] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/user-by-username/${searchUsername}`);
      setResult(res.data);
      setError("");
    } catch (err) {
      setResult(null);
      setError("User not found.");
    }
  };

  const handleStartChat = () => {
    if (result && onStartChat) {
      onStartChat(result);
      setSearchUsername("");
      setResult(null);
    }
  };

  return (
    <div className="user-search">
      <input
        type="text"
        placeholder="Search by username..."
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="search-result">
          <p>{result.username}</p>
          <button onClick={handleStartChat}>Start Chat</button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
