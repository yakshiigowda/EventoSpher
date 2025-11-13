// ------------------------------------
// ✅ Import Dependencies
// ------------------------------------
const express = require("express");
const cors = require("cors"); // Make sure to run: npm install cors
const app = express();
const PORT = 5000;

// ------------------------------------
// ✅ Middleware Setup
// ------------------------------------
app.use(cors());            // Enables CORS for frontend communication
app.use(express.json());    // Parses JSON request bodies

// ------------------------------------
// ✅ Login API
// ------------------------------------
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Dummy login validation
  if (username === "rama" && password === "1234") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// ------------------------------------
// ✅ Register API
// ------------------------------------
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  // Dummy registration logic
  if (username && email && password) {
    res.status(200).json({ message: "Registration successful!" });
  } else {
    res.status(400).json({ message: "Please provide all required fields." });
  }
});

// ------------------------------------
// ✅ Server Start
// ------------------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at port ${PORT}`);
});
