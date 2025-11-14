import React, { useState } from "react";
import "./Auth.css";
import userLogo from "../assets/images/loginlogo.png";
import logo from "../assets/images/logo.png";
import wedImg from "../assets/images/wed_img.png";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("wedding");

  // Saved details list
  const [savedEvents, setSavedEvents] = useState([
    { id: 1, type: "wedding", name: "Arjuna Wedding" },
    { id: 2, type: "birthday", name: "Sitha Birthday" },
  ]);

  // Form data (changes every tab)
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

  // LIVE UPDATE saved details for current tab
  const updateLivePreview = (updatedForm) => {
    let title = "";

    if (activeTab === "wedding") {
      title = `${updatedForm.groom || "Groom"} & ${updatedForm.bride || "Bride"}`;
    } else if (activeTab === "birthday") {
      title = updatedForm.person || "Birthday Person";
    } else if (activeTab === "engagement") {
      title = updatedForm.couple || "Engagement Couple";
    }

    // Update or create live preview item
    setSavedEvents((prev) => {
      const existing = prev.find((e) => e.type === activeTab && e.id === 999);

      if (existing) {
        return prev.map((item) =>
          item.id === 999 ? { ...item, name: title } : item
        );
      }

      return [
        ...prev,
        { id: 999, type: activeTab, name: title } // Live preview item
      ];
    });
  };

  // When typing
  const handleChange = (e) => {
    const newForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(newForm);
    updateLivePreview(newForm);
  };

  // Final Save button
  const handleSave = () => {
    const liveItem = savedEvents.find((e) => e.id === 999 && e.type === activeTab);
    if (liveItem) {
      // Convert preview into permanent saved item
      setSavedEvents((prev) => [
        ...prev.filter((e) => !(e.id === 999 && e.type === activeTab)),
        { id: Date.now(), type: activeTab, name: liveItem.name },
      ]);
    }

    alert(`${activeTab.toUpperCase()} details saved!`);
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
      </header>

      <div className="main-content">

        {/* LEFT CONTENT */}
        <div className="event-section">
          <h2 className="event-heading">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>
          <div className="divider"></div>

          {/* WEDDING SECTION */}
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

          {/* BIRTHDAY SECTION */}
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

          {/* ENGAGEMENT SECTION */}
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

          {/* Saved Details */}
          <div className="saved-section">
            <h3>Saved Details</h3>
            <ul>
              {savedEvents.map((event) => (
                <li key={event.id}>{event.name}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
