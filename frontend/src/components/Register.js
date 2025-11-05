// src/components/Register.js
import React from "react";
import "./Auth.css";

function Register() {
  return (
    <div className="center-box">
      <div className="login-box">
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;
