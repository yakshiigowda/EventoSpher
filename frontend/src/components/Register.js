// // E:\react\wedding\eventosphere\EventoSpher\frontend\src\components\Register.js

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/images/logo.png"; // EventoSphere logo


function Register() {

  // ----------- State variables for input fields ------------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ----------- Register Function (API CALL) ------------------
  const handleregister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      alert("Server is not reachable. Try again later.");
    }
  };

  // redirect to login page
  const goToLogin = () => {
    navigate("/");
  };

//   return (

//     //-------------static code ---------------------------
//     // <div className="auth-container">
//     //   {/* Top Bar */}
//     //   <header className="auth-header">
//     //     <div className="auth-brand">
//     //       <img src={logo} alt="EventoSphere Logo" className="auth-logo" />
//     //     </div>
//     //     <button className="auth-btn" onClick={goToLogin}>
//     //       Login
//     //     </button>
//     //   </header>

//     //   {/* Registration Form */}
//     //   <div className="auth-box">
//     //     <h2 className="form-heading">Sign Up</h2>

//     //     <div className="form-group">
//     //       <label>Username</label>
//     //       <input type="text" placeholder="Enter your username" />
//     //     </div>

//     //     <div className="form-group">
//     //       <label>Email</label>
//     //       <input type="email" placeholder="Enter your email" />
//     //     </div>

//     //     <div className="form-group">
//     //       <label>Password</label>
//     //       <input type="password" placeholder="Enter password" />
//     //     </div>

//     //     {/* <button className="form-btn" onClick={goToLogin}>Sign Up</button>    // on click will go the login page ,it is static */}
//     //   </div>
//     // </div>

//     //--------------dynamic code for api call ---------------------------

return (
    <div className="auth-container">

      {/* ------------------ Top Bar ------------------ */}
      <header className="auth-header">
        <div className="auth-brand">
          <img src={logo} alt="EventoSphere Logo" className="auth-logo" />
        </div>
        <button className="auth-btn" onClick={goToLogin}>
          Login
        </button>
      </header>

      {/* ------------------ Registration Form ------------------ */}
      <div className="auth-box">
        <h2 className="form-heading">Sign Up</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="form-btn" onClick={handleregister}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Register;
