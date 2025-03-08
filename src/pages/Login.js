import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType); // ✅ Store userType

        if (response.data.userType === "admin") {
          navigate("/admin-home");
        } else {
          navigate("/user-home");
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      setError(error.response?.data?.msg || "Login failed! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">LOGIN</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="form-btn">Login</button>
      </form>

      <p className="auth-link">
        Don't have an account? <a href="/register">Register Now</a>
      </p>
    </div>
  );
}

export default Login;
