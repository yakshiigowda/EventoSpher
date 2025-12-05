import React, { useState, useEffect } from "react";
import "./Auth.css"; 
import userLogo from "../assets/images/loginlogo.png";
import logo from "../assets/images/logo.png";
import wedImg from "../assets/images/wed_img.png";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("wedding");
  const [savedEvents, setSavedEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Popups
  const [viewEventData, setViewEventData] = useState(null);
  const [editEventData, setEditEventData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const initialFormState = {
    groom: "",
    bride: "",
    date: "",
    venue: "",
    foodType: "",
    details: "",
    person: "",
    theme: "",
    couple: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- HELPER: Format camelCase to Title Case ---
  const formatLabel = (str) => {
    if (!str) return "";
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  // --- FETCH EVENTS ---
  const loadEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/saved-events");
      const data = await res.json();
      setSavedEvents(data.events || []); 
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // --- HANDLE TAB SWITCH ---
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setFormData(initialFormState); 
    setSavedEvents((prev) => prev.filter((e) => e.id !== 999));
  };

  const handleChange = (e) => {
    const newForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(newForm);
  };

  // --- SAVE EVENT ---
  const handleSave = async (e) => {
    if(e) e.preventDefault(); 

    let title = "";
    if (activeTab === "wedding") title = `${formData.groom} & ${formData.bride}`;
    else if (activeTab === "birthday") title = formData.person;
    else if (activeTab === "engagement") title = formData.couple;

    if (!title || title.trim() === "&" || title.trim() === "") {
        alert("Please enter names before saving.");
        return;
    }

    const cleanDetails = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== "")
    );

    const eventData = {
      type: activeTab,
      name: title,
      details: cleanDetails,
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
        setFormData(initialFormState); 
        loadEvents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error.");
    }
  };

  // --- DELETE EVENT ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/delete-event/${id}`, { method: "DELETE" });
      const data = await res.json();
      alert(data.message);
      loadEvents(); 
    } catch (err) {
      alert("Error deleting event.");
    }
  };

  // --- OPEN EDIT MODAL (From Table) ---
  const openEditModal = (event) => {
    setShowAllEvents(false);
    setEditEventData(event);
  };

  // --- UPDATE EVENT (SUBMIT EDIT) ---
  const handleUpdateEvent = async (e) => {
    if(e) e.preventDefault(); 

    if (!editEventData || !editEventData._id) {
        alert("Critical Error: Missing Event ID. Cannot update.");
        return;
    }

    const updatedEvent = {
      type: editEventData.type,
      name: editEventData.name,
      details: editEventData.details,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/update-event/${editEventData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setEditEventData(null); 
        setShowAllEvents(true); 
        loadEvents(); 
      } else {
        alert("Update Failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network Error: Could not connect to server.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="brand">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="nav-tabs">
          {["wedding", "birthday", "engagement"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabSwitch(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <button type="button" className="view-all-btn" onClick={() => setShowAllEvents(true)}>
          📋 View All Events
        </button>
      </header>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="event-section">
          <h2 className="event-heading">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>

          {/* Wedding Form */}
          {activeTab === "wedding" && (
            <div className="wedding-box">
              <div className="wedding-form">
                <div className="image-area">
                  <img src={wedImg} alt="Wedding" className="wed-img" />
                </div>
                <div className="form-area">
                  <div className="row">
                    <input name="groom" placeholder="Groom Name" value={formData.groom} onChange={handleChange} />
                    <input name="bride" placeholder="Bride Name" value={formData.bride} onChange={handleChange} />
                  </div>
                  <div className="row">
                    <input name="date" placeholder="Date" value={formData.date} onChange={handleChange} />
                    <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} />
                  </div>
                  <input name="foodType" placeholder="Food Type" value={formData.foodType} onChange={handleChange} />
                  <textarea name="details" placeholder="Details..." value={formData.details} onChange={handleChange} />
                  <button type="button" className="save-btn" onClick={handleSave}>💍 Save Wedding</button>
                </div>
              </div>
            </div>
          )}

          {/* Birthday Form */}
          {activeTab === "birthday" && (
            <div className="form-box">
              <input name="person" placeholder="Person Name" value={formData.person} onChange={handleChange} />
              <input name="theme" placeholder="Theme" value={formData.theme} onChange={handleChange} />
              <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} />
              <textarea name="details" placeholder="Details..." value={formData.details} onChange={handleChange} />
              <button type="button" className="save-btn" onClick={handleSave}>🎂 Save Birthday</button>
            </div>
          )}

          {/* Engagement Form */}
          {activeTab === "engagement" && (
            <div className="form-box">
              <input name="couple" placeholder="Couple Names" value={formData.couple} onChange={handleChange} />
              <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} />
              <textarea name="details" placeholder="Details..." value={formData.details} onChange={handleChange} />
              <button type="button" className="save-btn" onClick={handleSave}>💖 Save Engagement</button>
            </div>
          )}
        </div>

        {/* SIDE PANEL */}
        <div className="side-panel">
          <div className="user-box">
            <img src={userLogo} alt="User" className="user-avatar" />
            <h3>RAMA</h3>
            <button type="button" className="logout-btn">Logout</button>
          </div>
          <div className="saved-section">
            <h3>Recent Saves</h3>
            <ul>
              {savedEvents.slice(0, 5).map((event) => (
                  <li key={event._id}>
                    <span>{event.name}</span>
                    <button type="button" className="delete-btn-small" onClick={() => handleDelete(event._id)}>❌</button>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- MODAL: VIEW ALL EVENTS (PROFESSIONAL TABLE) --- */}
      {showAllEvents && (
        <div className="modal">
          <div className="modal-content large">
            <div className="modal-header">
                <h2>All Saved Events</h2>
                <input
                    type="text"
                    placeholder="Search events..."
                    className="search-box"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="table-container">
                <table className="events-table">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedEvents.length === 0 && (
                            <tr><td colSpan="3" style={{textAlign:"center"}}>No events found.</td></tr>
                        )}
                        {savedEvents
                            .filter((ev) => (ev.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((event) => (
                            <tr key={event._id}>
                                <td className="name-cell">{event.name}</td>
                                <td>
                                    <span className={`badge ${event.type}`}>{event.type}</span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button type="button" className="btn-icon view" title="View" onClick={() => {setShowAllEvents(false); setViewEventData(event);}}>
                                            👁 View
                                        </button>
                                        <button type="button" className="btn-icon edit" title="Edit" onClick={() => openEditModal(event)}>
                                            ✏ Edit
                                        </button>
                                        <button type="button" className="btn-icon delete" title="Delete" onClick={() => handleDelete(event._id)}>
                                            🗑 Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="close-btn" onClick={() => setShowAllEvents(false)}>Close List</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: VIEW SINGLE EVENT DETAIL --- */}
      {viewEventData && (
        <div className="modal">
          <div className="modal-content">
            <h2>{viewEventData.name}</h2>
            <p className="subtitle">Type: {viewEventData.type}</p>
            <hr />
            <div className="details-grid">
              {Object.entries(viewEventData.details || {}).map(([key, value]) => (
                <div className="detail-row" key={key}>
                  <span className="detail-label">{formatLabel(key)}:</span>
                  <span className="detail-value">{value}</span>
                </div>
              ))}
            </div>
            <button type="button" className="close-btn" onClick={() => setViewEventData(null)}>Close</button>
          </div>
        </div>
      )}

      {/* --- MODAL: EDIT EVENT (NOW IN TABLE FORMAT) --- */}
      {editEventData && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Event</h2>
            <p className="subtitle">Update details below</p>
            
            <div className="table-container" style={{maxHeight: 'none', border:'none', boxShadow:'none'}}>
                <table className="edit-table">
                    <tbody>
                        {Object.entries(editEventData.details || {}).map(([key, value]) => (
                        <tr key={key}>
                            <td className="edit-label">
                                {formatLabel(key)}
                            </td>
                            <td className="edit-input-cell">
                                {key === "details" ? (
                                    <textarea
                                        className="table-input"
                                        rows="3"
                                        value={value}
                                        onChange={(e) =>
                                            setEditEventData({
                                                ...editEventData,
                                                details: { ...editEventData.details, [key]: e.target.value },
                                            })
                                        }
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="table-input"
                                        value={value}
                                        onChange={(e) =>
                                            setEditEventData({
                                                ...editEventData,
                                                details: { ...editEventData.details, [key]: e.target.value },
                                            })
                                        }
                                    />
                                )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="modal-footer">
                <button type="button" className="save-btn" onClick={handleUpdateEvent}>💾 Save Changes</button>
                <button type="button" className="close-btn" onClick={() => setEditEventData(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;