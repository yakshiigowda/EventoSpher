// // E:\react\wedding\eventosphere\EventoSpher\frontend\src\components\Login.js

import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";
import scurt from "../assets/images/scurt.png";
import logo from "../assets/images/logo.png"; 
// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate=useNavigate(); // for navigation
//   const handleLogin = async (e) => {  // if any error you get await add async 
//     e.preventDefault();
//     // dummy authentication logic
// //     if (username === "rama" && password === "1234") {
   
// //     navigate("/dashboard");   // login to dahboard redirect
// //   } else {
// //     alert("Invalid username or password ");
// //     // ❌ Don't navigate here — just show alert
// //   }
// // };

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  // ------------------ Login Function (API CALL) ------------------
  const handleLogin = async (e) => {
    e.preventDefault();
try {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert(data.message);
    navigate("/dashboard");
  } else {
    alert(data.message);
  }
} catch (error) {
  console.error("Error connecting to server:", error);
  alert("Server not reachable. Please try again later.");
}
};
  const gotoRegister=()=>{
    navigate("/register"); // naviagate route to register page
  }
  return (
    <div className="login-page" style={{ backgroundImage: `url(${scurt})` }}>
      
      {/* ------------------ Top Bar ------------------ */}
      <header className="top-bar">
        <div className="brand">
          {logo && <img src={logo} alt="EventoSphere Logo" className="logo" />}
        </div>
        <button className="signup-btn" onClick={gotoRegister}>
          SIGN UP
        </button>
      </header>

      {/* ------------------ Login Form ------------------ */}
      <div className="center-box">
        <form className="login-box" onSubmit={handleLogin}>
          
          <p className="login-motto">
            "Simplify Event Planning. Amplify Every Celebration."
          </p>

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

