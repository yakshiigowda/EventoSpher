// E:\react\wedding\eventosphere\EventoSpher\frontend\src\App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import Home from "./components/Home"; // optional upcoming component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
         {/* <Route path="/home" element={<Home />} /> optional upcoming route */}
    </Routes>
    </Router>
  );
}

export default App;
