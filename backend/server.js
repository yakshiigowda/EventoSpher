
const express = require("express");
const cors = require("cors"); 
const app = express();
const PORT = 5000;

// ------------------------------------
//  Middleware Setup
// ------------------------------------
app.use(cors());            
app.use(express.json());    

// ------------------------------------
//  Login API
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
//  Register API
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

//----------------------------------------
// dashboard logics
//----------------------------------------

//-------------------------------
// SAVE EVENT (Wedding/Birthday/Engagement)
// -------------------------------
app.post("/api/save-event", (req, res) => {
  const eventData = req.body;

  if (!eventData.type || !eventData.details) {
    return res
      .status(400)
      .json({ message: "Event type and details are required" });
  }

  savedEvents.push(eventData);

  res.status(200).json({
    message: `${eventData.type} details saved successfully!`,
  });
});

// -------------------------------
// GET ALL SAVED EVENTS
// -------------------------------
app.get("/api/saved-events", (req, res) => {
  res.json({ events: savedEvents });
});



// ------------------------------------
//  Server Start
// ------------------------------------
app.listen(PORT, () => {
  console.log(` Server running at port ${PORT}`);
});
