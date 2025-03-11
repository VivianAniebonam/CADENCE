import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      });

      console.log("Registration Response:", response.data);

      if (response.data.msg === "User registered successfully") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error);
      setError(error.response?.data?.msg || "Server Error - Registration Failed!");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>

        <div className="input-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="register-btn">Register</button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
