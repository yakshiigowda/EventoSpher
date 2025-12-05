const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/eventosphere")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// SCHEMAS
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const EventSchema = new mongoose.Schema({
  type: String,
  name: String,
  details: Object, 
  savedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", UserSchema);
const Event = mongoose.model("events", EventSchema);

// ROUTES

// LOGIN
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) res.json({ message: "Login successful" });
  else res.status(401).json({ message: "Invalid credentials" });
});

// REGISTER
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email exists!" });
  await User.create({ username, email, password });
  res.json({ message: "Registered successfully!" });
});

// SAVE EVENT
app.post("/api/save-event", async (req, res) => {
  try {
    await Event.create(req.body);
    res.json({ message: "Event saved!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving event" });
  }
});

// GET ALL EVENTS
app.get("/api/saved-events", async (req, res) => {
  const events = await Event.find().sort({ savedAt: -1 });
  res.json({ events });
});

// DELETE EVENT
app.delete("/api/delete-event/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
});

// UPDATE EVENT
app.put("/api/update-event/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Check if ID is valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully!" });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server error during update" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));