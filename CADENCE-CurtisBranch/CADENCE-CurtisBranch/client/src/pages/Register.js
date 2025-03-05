import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // New state for user type (admin or user)
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        userType, // Include userType in the request to specify if the user is an admin
      });

      if (response.data.msg) {
        navigate("/login"); // Redirect to login after successful registration
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Registration failed! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">REGISTER</h2>
      <form onSubmit={handleRegister}>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>User Type</label>
          <label>
            <input
              type="radio"
              name="userType"
              value="user"
              checked={userType === "user"}
              onChange={(e) => setUserType(e.target.value)}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={userType === "admin"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </label>
        </div>

        <button type="submit" className="form-btn">
          Register
        </button>
      </form>

      <p className="auth-link">
        Already have an account? <a href="/login">Login Now</a>
      </p>
    </div>
  );
}

export default Register;
