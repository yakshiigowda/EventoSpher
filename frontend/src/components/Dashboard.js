import React, { useState, useEffect } from "react";
import "./Auth.css";
import userLogo from "../assets/images/loginlogo.png";
import logo from "../assets/images/logo.png";
import wedImg from "../assets/images/wed_img.png";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("wedding");

  const [savedEvents, setSavedEvents] = useState([]);

  const [showAllEvents, setShowAllEvents] = useState(false);

  const [formData, setFormData] = useState({
    groom: "",
    bride: "",
    date: "",
    venue: "",
    foodType: "",
    details: "",
    person: "",
    theme: "",
    couple: "",
  });

  // Fetch all events from DB
  const loadEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/saved-events");
      const data = await res.json();
      setSavedEvents(data.events);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Update Title for Live Preview
  const updateLivePreview = (updatedForm) => {
    let title = "";

    if (activeTab === "wedding") {
      title = `${updatedForm.groom || "Groom"} & ${
        updatedForm.bride || "Bride"
      }`;
    } else if (activeTab === "birthday") {
      title = updatedForm.person || "Birthday Person";
    } else if (activeTab === "engagement") {
      title = updatedForm.couple || "Engagement Couple";
    }

    setSavedEvents((prev) => {
      const fake = prev.find((e) => e.id === 999 && e.type === activeTab);

      if (fake) {
        return prev.map((item) =>
          item.id === 999 ? { ...item, name: title } : item
        );
      }

      return [...prev, { id: 999, type: activeTab, name: title }];
    });
  };

  const handleChange = (e) => {
    const newForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(newForm);
    updateLivePreview(newForm);
  };

  // SAVE EVENT
  const handleSave = async () => {
    const livePreview = savedEvents.find(
      (e) => e.id === 999 && e.type === activeTab
    );

    if (!livePreview) return;

    const eventData = {
      type: activeTab,
      name: livePreview.name,
      formData,
    };

    try {
      const res = await fetch("http://localhost:5000/api/save-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        loadEvents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  // DELETE EVENT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/delete-event/${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      alert(data.message);
      loadEvents();
    } catch (err) {
      alert("Error deleting event.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="brand">
          <img src={logo} alt="EventoSphere Logo" className="logo" />
        </div>

        <div className="nav-tabs">
          {["wedding", "birthday", "engagement"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <button
          className="view-all-btn"
          onClick={() => setShowAllEvents(true)}
        >
          📋 View All Events
        </button>
      </header>

      <div className="main-content">
        {/* LEFT SIDE */}
        <div className="event-section">
          <h2 className="event-heading">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>
          <div className="divider"></div>

          {/* Wedding Form */}
          {activeTab === "wedding" && (
            <div className="wedding-box">
              <div className="wedding-form">
                <div className="image-area">
                  <img src={wedImg} alt="Wedding" className="wed-img" />
                </div>

                <div className="form-area">
                  <div className="row">
                    <input
                      name="groom"
                      placeholder="Groom Name"
                      value={formData.groom}
                      onChange={handleChange}
                    />
                    <input
                      name="bride"
                      placeholder="Bride Name"
                      value={formData.bride}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row">
                    <input
                      name="date"
                      placeholder="Date (DD/MM/YY)"
                      value={formData.date}
                      onChange={handleChange}
                    />
                    <input
                      name="venue"
                      placeholder="Venue"
                      value={formData.venue}
                      onChange={handleChange}
                    />
                  </div>

                  <input
                    name="foodType"
                    placeholder="Veg / Non-Veg"
                    value={formData.foodType}
                    onChange={handleChange}
                  />

                  <textarea
                    name="details"
                    placeholder="Event Details..."
                    value={formData.details}
                    onChange={handleChange}
                  />

                  <button className="save-btn" onClick={handleSave}>
                    💍 Save Wedding Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BIRTHDAY FORM */}
          {activeTab === "birthday" && (
            <div className="form-box">
              <input
                name="person"
                placeholder="Person Name"
                value={formData.person}
                onChange={handleChange}
              />

              <input
                name="theme"
                placeholder="Theme"
                value={formData.theme}
                onChange={handleChange}
              />

              <input
                name="venue"
                placeholder="Venue"
                value={formData.venue}
                onChange={handleChange}
              />

              <textarea
                name="details"
                placeholder="Birthday Details..."
                value={formData.details}
                onChange={handleChange}
              />

              <button className="save-btn" onClick={handleSave}>
                🎂 Save Birthday Details
              </button>
            </div>
          )}

          {/* ENGAGEMENT FORM */}
          {activeTab === "engagement" && (
            <div className="form-box">
              <input
                name="couple"
                placeholder="Couple Names"
                value={formData.couple}
                onChange={handleChange}
              />

              <input
                name="venue"
                placeholder="Venue"
                value={formData.venue}
                onChange={handleChange}
              />

              <textarea
                name="details"
                placeholder="Engagement Details..."
                value={formData.details}
                onChange={handleChange}
              />

              <button className="save-btn" onClick={handleSave}>
                💖 Save Engagement Details
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="side-panel">
          <div className="user-box">
            <img src={userLogo} alt="User" className="user-avatar" />
            <h3>RAMA</h3>
            <button className="logout-btn">Logout</button>
          </div>

          <div className="saved-section">
            <h3>Saved Details</h3>
            <ul>
              {savedEvents.map((event) =>
                event.id !== 999 ? (
                  <li key={event._id}>
                    {event.name}  
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event._id)}
                    >
                      ❌
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* VIEW ALL EVENTS POPUP */}
      {showAllEvents && (
        <div className="modal">
          <div className="modal-content">
            <h2>All Saved Events</h2>

            {savedEvents.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <ul>
                {savedEvents.map(
                  (event) =>
                    event.id !== 999 && (
                      <li key={event._id}>
                        <strong>{event.type.toUpperCase()}:</strong> {event.name}
                      </li>
                    )
                )}
              </ul>
            )}

            <button
              className="close-btn"
              onClick={() => setShowAllEvents(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
