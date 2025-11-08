// E:\react\wedding\eventosphere\EventoSpher\frontend\src\components\Register.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/images/logo.png"; // EventoSphere logo

function Register() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/"); // redirect to Login page
  };

  return (
    <div className="auth-container">
      {/* Top Bar */}
      <header className="auth-header">
        <div className="auth-brand">
          <img src={logo} alt="EventoSphere Logo" className="auth-logo" />
        </div>
        <button className="auth-btn" onClick={goToLogin}>
          Login
        </button>
      </header>

      {/* Registration Form */}
      <div className="auth-box">
        <h2 className="form-heading">Sign Up</h2>

        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
        </div>

        <button className="form-btn">Sign Up</button>
      </div>
    </div>
  );
}

export default Register;
