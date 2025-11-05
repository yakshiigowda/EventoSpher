// E:\react\wedding\eventosphere\EventoSpher\frontend\src\components\Login.js

import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";
import scurt from "../assets/images/scurt.png";
import logo from "../assets/images/logo.png"; // optional
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate(); // for navigation
  const handleLogin = (e) => {
    e.preventDefault();
    // dummy authentication logic
    if (username === "admin" && password === "1234") {
      alert("Login Successful 🎉");  // here we need to replace for fetching backend 
    } else {
      alert("Invalid username or password");
    }
  };
  
  const gotoRegister=()=>{
    navigate("/register"); // naviagate route to register page
  }

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${scurt})` }}
    >
      <header className="top-bar">
        <div className="brand">
          {logo && <img src={logo} alt="EventoSphere Logo" className="logo" />}
        </div>
        <button className="signup-btn" onClick={gotoRegister}>SIGN UP</button>
      </header>

      <div className="center-box">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>User Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">SIGN IN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
