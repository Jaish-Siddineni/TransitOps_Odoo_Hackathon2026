import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../store/AuthContext";

export default function FleetDashboard() {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState("ALL");
  const [kpis, setKpis] = useState({ activeVehicles: 0, availableVehicles: 0, inMaintenance: 0, fleetUtilization: 0 });
  const [loading, setLoading] = useState(true);

  // --- Modal & User Input State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    model: '',
    type: 'TRUCK',
    status: 'Available'
  });

  const fetchFleetData = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const filtered = filterType === "ALL" ? data : data.filter(v => v.type === filterType);
        
        const active = filtered.filter(v => v.status === "On Trip").length;
        const available = filtered.filter(v => v.status === "Available").length;
        const maintenance = filtered.filter(v => v.status === "In Shop").length;
        const total = filtered.length;
        
        setKpis({
          activeVehicles: active,
          availableVehicles: available,
          inMaintenance: maintenance,
          fleetUtilization: total === 0 ? 0 : ((active / total) * 100).toFixed(1)
        });
      }
    } catch (err) {
      console.error("Fleet fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchFleetData();
  }, [fetchFleetData]);

  // --- Handle User Input Submission ---
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(vehicleData)
      });

      if (res.ok) {
        alert(`Successfully added ${vehicleData.model} to the database!`);
        fetchFleetData(); // Refresh the dashboard data
      } else {
        alert("Backend API Error: Check console. Modal closing for demo continuity.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error: Could not reach the server.");
    } finally {
      // ALWAYS close the modal and reset, even if the backend fails, so the UI doesn't freeze
      setIsModalOpen(false);
      setVehicleData({ model: '', type: 'TRUCK', status: 'Available' });
      setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading Fleet Operations...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Welcome back, {user?.name || user?.email?.split('@')[0]}</h1>
          <p>Fleet Manager • Monitor fleet assets and operational efficiency</p>
        </div>
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
        >
          <option value="ALL">🌐 All Vehicles</option>
          <option value="TRUCK">🚛 Trucks</option>
          <option value="VAN">🚐 Vans</option>
        </select>
      </div>

      <div className="page-content-card">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="primary-submit-btn" onClick={() => setIsModalOpen(true)}>
            🚛 Add Vehicle
          </button>
          <button className="primary-submit-btn" style={{ background: '#f59e0b' }} onClick={() => alert("Maintenance Scheduler opening...")}>
            🔧 Schedule Maintenance
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card"><h3>🚛 Active Vehicles</h3><p>{kpis.activeVehicles}</p></div>
        <div className="kpi-card"><h3>✅ Available Vehicles</h3><p>{kpis.availableVehicles}</p></div>
        <div className="kpi-card"><h3>🔧 Maintenance</h3><p style={{ color: '#ef4444' }}>{kpis.inMaintenance}</p></div>
        <div className="kpi-card"><h3>📈 Fleet Utilization</h3><p style={{ color: kpis.fleetUtilization > 75 ? '#10b981' : '#111827' }}>{kpis.fleetUtilization}%</p></div>
      </div>

      {/* --- THE DATA ENTRY MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Vehicle</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleAddVehicle} className="premium-form">
              <div className="input-group">
                <label>Vehicle Model / Identifier</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Tata Signa 4825"
                  value={vehicleData.model}
                  onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label>Vehicle Type</label>
                <select 
                  value={vehicleData.type}
                  onChange={(e) => setVehicleData({...vehicleData, type: e.target.value})}
                >
                  <option value="TRUCK">Heavy Truck</option>
                  <option value="VAN">Delivery Van</option>
                </select>
              </div>

              <div className="input-group">
                <label>Initial Status</label>
                <select 
                  value={vehicleData.status}
                  onChange={(e) => setVehicleData({...vehicleData, status: e.target.value})}
                >
                  <option value="Available">Available</option>
                  <option value="In Shop">In Maintenance</option>
                </select>
              </div>

              <button type="submit" className="primary-submit-btn" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Save Vehicle"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}