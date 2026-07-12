import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../store/AuthContext";

export default function DriverDashboard() {
  const { user } = useAuth();
  const [kpis, setKpis] = useState({ activeTrips: 0, pendingTrips: 0, availableVehicles: 0, driversOnDuty: 0 });
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tripData, setTripData] = useState({
    source: '',
    destination: '',
    cargoWeight: '',
    status: 'Draft'
  });

  const fetchDispatchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const [tripsRes, vehiclesRes, driversRes] = await Promise.all([
        fetch("http://localhost:5000/api/trips", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:5000/api/vehicles", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:5000/api/drivers", { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (tripsRes.ok && vehiclesRes.ok && driversRes.ok) {
        const trips = await tripsRes.json();
        const vehicles = await vehiclesRes.json();
        const drivers = await driversRes.json();

        setKpis({
          activeTrips: trips.filter(t => t.status === "Dispatched").length,
          pendingTrips: trips.filter(t => t.status === "Draft").length,
          availableVehicles: vehicles.filter(v => v.status === "Available").length,
          driversOnDuty: drivers.filter(d => d.status === "On Trip").length
        });
      }
    } catch (err) {
      console.error("Dispatch fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDispatchData();
  }, [fetchDispatchData]);

  // Handle User Creating a Trip
  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tripData)
      });

      if (res.ok) {
        alert("Trip dispatched to database successfully!");
        fetchDispatchData(); 
      } else {
        alert("Backend API Error: Check terminal. Modal closing for demo continuity.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error: Could not reach the server.");
    } finally {
      // ALWAYS close the modal so it never freezes
      setIsModalOpen(false);
      setTripData({ source: '', destination: '', cargoWeight: '', status: 'Draft' });
      setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading Dispatch Operations...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || user?.email?.split('@')[0]}</h1>
        <p>Driver / Dispatcher • Create and monitor active trips</p>
      </div>

      <div className="page-content-card">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="primary-submit-btn" style={{ background: '#3b82f6' }} onClick={() => setIsModalOpen(true)}>
            🗺️ Create Trip
          </button>
          <button className="primary-submit-btn" onClick={() => alert("Vehicle Assignment Panel opening...")}>
            👨‍✈️ Assign Vehicle
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card"><h3>🗺️ Active Trips</h3><p>{kpis.activeTrips}</p></div>
        <div className="kpi-card"><h3>📋 Pending Trips</h3><p style={{ color: '#f59e0b' }}>{kpis.pendingTrips}</p></div>
        <div className="kpi-card"><h3>🚛 Available Vehicles</h3><p>{kpis.availableVehicles}</p></div>
        <div className="kpi-card"><h3>👨‍✈️ Drivers On Duty</h3><p>{kpis.driversOnDuty}</p></div>
      </div>

      {/* --- CREATE TRIP MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Trip</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleCreateTrip} className="premium-form">
              <div className="input-group">
                <label>Source Location</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Warehouse A (Bengaluru)"
                  value={tripData.source}
                  onChange={(e) => setTripData({...tripData, source: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label>Destination Location</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Hub B (Mysuru)"
                  value={tripData.destination}
                  onChange={(e) => setTripData({...tripData, destination: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label>Cargo Weight (kg)</label>
                <input 
                  type="number" 
                  required 
                  placeholder="e.g., 1500"
                  value={tripData.cargoWeight}
                  onChange={(e) => setTripData({...tripData, cargoWeight: e.target.value})}
                />
              </div>

              <button type="submit" className="primary-submit-btn" style={{ width: '100%', background: '#3b82f6' }} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save to Drafts"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}