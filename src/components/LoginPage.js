import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/login.jpg"
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <h1>Welcome Back!</h1>
        <p className="description">
          Stay organized and focused with our Agent Management . Access your team
          anywhere, anytime.
        </p>
        <img
          src={image}
          alt="Stay Organized"
          className="login-image"
        />
      </div>

      <div className="right-section">
        <div className="login-box">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
