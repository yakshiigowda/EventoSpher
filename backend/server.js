const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// ------------------------------------
// Middleware Setup
// ------------------------------------
app.use(cors());
app.use(express.json());

// ------------------------------------
// MongoDB Connection (Updated - No Deprecated Options)
// ------------------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/eventosphere")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ------------------------------------
// SCHEMAS
// ------------------------------------
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const EventSchema = new mongoose.Schema({
  type: String,
  name: String,
  details: Object,
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);
const Event = mongoose.model("events", EventSchema);

// ------------------------------------
// LOGIN API
// ------------------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// ------------------------------------
// REGISTER API
// ------------------------------------
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(400).json({ message: "Email already exists!" });

  await User.create({ username, email, password });

  res.status(200).json({ message: "Registration successful!" });
});

// ------------------------------------
// SAVE EVENT
// ------------------------------------
app.post("/api/save-event", async (req, res) => {
  const eventData = req.body;

  if (!eventData.type || !eventData.name) {
    return res
      .status(400)
      .json({ message: "Event type and name are required" });
  }

  await Event.create(eventData);

  res.status(200).json({
    message: `${eventData.type} details saved successfully!`,
  });
});

// ------------------------------------
// GET ALL EVENTS
// ------------------------------------
app.get("/api/saved-events", async (req, res) => {
  const events = await Event.find();
  res.json({ events });
});


//---------------------------------
//delete
//--------------------------
app.delete("/api/delete-event/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event" });
  }
});


// ------------------------------------
// Start Server
// ------------------------------------
app.listen(PORT, () => console.log(`🚀 Server running at port ${PORT}`));
