import React, { useState } from "react";
import "./Auth.css";
import userLogo from "../assets/images/loginlogo.png";
import logo from "../assets/images/logo.png";
import wedImg from "../assets/images/wed_img.png"; // Wedding image (only for wedding tab)

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("wedding");
  const [savedEvents, setSavedEvents] = useState([
    { name: "Arjuna Wedding" },
    { name: "Sitha Birthday" },
  ]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSavedEvents([...savedEvents, { name: `${formData.details || "Unnamed"} ${activeTab}` }]);
    alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} details saved successfully!`);
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
              onMouseEnter={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
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

        {/* RIGHT SIDE PANEL */}
        <div className="side-panel">
          <div className="user-box">
            <img src={userLogo} alt="User" className="user-avatar" />
            <h3>RAMA</h3>
            <button className="logout-btn">Logout</button>
          </div>

          <div className="saved-section">
            <h3> Saved Details</h3>
            <ul>
              {savedEvents.map((event, index) => (
                <li key={index}>{event.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
