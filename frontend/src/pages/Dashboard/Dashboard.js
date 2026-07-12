import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/AuthContext';

export default function Dashboard() {
  const { user, token } = useAuth(); 
  console.log("Dashboard token =", token);
console.log("Dashboard token type =", typeof token);
  const [filterType, setFilterType] = useState('ALL');
  
  const [kpis, setKpis] = useState({
    activeVehicles: 0,
    availableVehicles: 0,
    inMaintenance: 0,
    activeTrips: 0,
    pendingTrips: 0,
    driversOnDuty: 0,
    fleetUtilization: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [vehiclesRes, tripsRes, driversRes] = await Promise.all([
          fetch('http://localhost:5000/api/vehicles', { 
            headers: { 'Authorization': `Bearer ${token}` } 
          }),
          fetch('http://localhost:5000/api/trips', { 
            headers: { 'Authorization': `Bearer ${token}` } 
          }),
          fetch('http://localhost:5000/api/drivers', { 
            headers: { 'Authorization': `Bearer ${token}` } 
          })
        ]);

        if (!vehiclesRes.ok || !tripsRes.ok || !driversRes.ok) {
          throw new Error('Failed to fetch command center telemetry from MySQL.');
        }

        const vehicles = await vehiclesRes.json();
        const trips = await tripsRes.json();
        const drivers = await driversRes.json();

        const filteredVehicles = filterType === 'ALL' 
          ? vehicles 
          : vehicles.filter(v => v.type === filterType);

        const activeV = filteredVehicles.filter(v => v.status === 'On Trip').length;
        const availableV = filteredVehicles.filter(v => v.status === 'Available').length;
        const inShopV = filteredVehicles.filter(v => v.status === 'In Shop').length;
        const totalV = filteredVehicles.length;
        
        const utilization = totalV === 0 ? 0 : ((activeV / totalV) * 100).toFixed(1);

        const activeT = trips.filter(t => t.status === 'Dispatched').length;
        const pendingT = trips.filter(t => t.status === 'Draft').length;
        const onDutyD = drivers.filter(d => d.status === 'On Trip').length;

        setKpis({
          activeVehicles: activeV,
          availableVehicles: availableV,
          inMaintenance: inShopV,
          activeTrips: activeT,
          pendingTrips: pendingT,
          driversOnDuty: onDutyD,
          fleetUtilization: utilization
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [filterType, token]);

  if (loading) return <div style={{ padding: '20px', fontFamily: 'Inter' }}>Loading Live Telemetry...</div>;
  if (error) return <div style={{ padding: '20px', color: '#ef4444', fontFamily: 'Inter' }}>Error: {error}</div>;

  return (
    <div className="dashboard-page">
      
      <div className="dashboard-header">
        <h1>Operational Command Center</h1>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="ALL">🌐 All Vehicles</option>
            <option value="TRUCK">🚛 Heavy Trucks</option>
            <option value="VAN">🚐 Delivery Vans</option>
          </select>
        </div>
      </div>
      
      {/* --- Dynamic Role-Based Actions --- */}
      <div className="rbac-actions" style={{ marginBottom: '1.5rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        
        {user?.role === 'FLEET_MANAGER' && (
          <button className="auth-btn" style={{ padding: '0.6rem 1rem', width: 'auto' }}>
            🚛 Manage Fleet Assets & Lifecycle
          </button>
        )}

        {user?.role === 'DRIVER' && (
          <button className="auth-btn" style={{ padding: '0.6rem 1rem', width: 'auto', background: '#3b82f6' }}>
            🗺️ Create & Dispatch Trip
          </button>
        )}

        {user?.role === 'SAFETY_OFFICER' && (
          <button className="auth-btn" style={{ padding: '0.6rem 1rem', width: 'auto', background: '#f59e0b' }}>
            🛡️ Audit Driver Compliance Scores
          </button>
        )}

        {user?.role === 'FINANCIAL_ANALYST' && (
          <button className="auth-btn" style={{ padding: '0.6rem 1rem', width: 'auto', background: '#10b981' }}>
            📊 Export Profitability & ROI Report
          </button>
        )}
      </div>

      <div className="kpi-grid">
        <div className="kpi-card success">
          <h3>Active Vehicles</h3>
          <p>{kpis.activeVehicles}</p>
        </div>
        
        <div className="kpi-card">
          <h3>Available Vehicles</h3>
          <p>{kpis.availableVehicles}</p>
        </div>
        
        <div className="kpi-card warning">
          <h3>In Shop (Maintenance)</h3>
          <p>{kpis.inMaintenance}</p>
        </div>
        
        <div className="kpi-card success">
          <h3>Active Trips</h3>
          <p>{kpis.activeTrips}</p>
        </div>
        
        <div className="kpi-card danger">
          <h3>Pending Trips</h3>
          <p>{kpis.pendingTrips}</p>
        </div>
        
        <div className="kpi-card">
          <h3>Drivers On Duty</h3>
          <p>{kpis.driversOnDuty}</p>
        </div>
        
        <div className="kpi-card">
          <h3>Fleet Utilization</h3>
          <p>{kpis.fleetUtilization}%</p>
          <span className={`status-pill ${kpis.fleetUtilization > 75 ? 'good' : kpis.fleetUtilization < 40 ? 'bad' : 'okay'}`}>
            {kpis.fleetUtilization > 75 ? '↑ High Efficiency' : kpis.fleetUtilization < 40 ? '↓ Underutilized' : '→ Stable'}
          </span>
        </div>
      </div>

    </div>
  );
}