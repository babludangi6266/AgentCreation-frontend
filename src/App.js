
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default App;
