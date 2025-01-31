import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegistrationPage.css"; 
import video from "../assets/registration.mp4"; 

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // Save token from registration response
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="info-section">
        <h1>Join Us Today!</h1>
        <p className="info-text">
          Unlock the power of productivity. Sign up now to organize your team , and achieve your goals.
        </p>
        <div className="info-video">
          <video 
            src={video} 
            autoPlay 
            loop 
            muted 
            className="info-video-player"
          />
        </div>
      </div>

      <div className="form-section">
        <div className="register-box">
          <h1>Create an Account</h1>
          <p className="subheading">Manage your tasks efficiently.</p>
          
          {error && <p className="error-message">{error}</p>}
          
          <form className="register-form" onSubmit={handleRegister}>
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
            <button type="submit">Register</button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
