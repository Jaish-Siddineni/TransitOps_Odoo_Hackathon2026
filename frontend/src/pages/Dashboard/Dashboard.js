import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';

export default function Dashboard() {
  // Grab user for RBAC conditional rendering, token for secure fetching
  const { user, token } = useAuth(); 
  const [filterType, setFilterType] = useState('ALL');
  
  // Dynamic State
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
        // Use Promise.all to fetch all three endpoints concurrently for maximum speed
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

        // 1. Filter vehicles based on the dropdown selection
        const filteredVehicles = filterType === 'ALL' 
          ? vehicles 
          : vehicles.filter(v => v.type === filterType);

        // 2. Compute Vehicle KPIs
        const activeV = filteredVehicles.filter(v => v.status === 'On Trip').length;
        const availableV = filteredVehicles.filter(v => v.status === 'Available').length;
        const inShopV = filteredVehicles.filter(v => v.status === 'In Shop').length;
        const totalV = filteredVehicles.length;
        
        const utilization = totalV === 0 ? 0 : ((activeV / totalV) * 100).toFixed(1);

        // 3. Compute Trip & Driver KPIs
        // Assuming your Trip model uses 'Dispatched'/'Draft' and Driver uses 'On Trip'
        const activeT = trips.filter(t => t.status === 'Dispatched').length;
        const pendingT = trips.filter(t => t.status === 'Draft').length;
        const onDutyD = drivers.filter(d => d.status === 'On Trip').length;

        // 4. Update the state
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

  if (loading) return <div style={{ padding: '20px' }}>Loading Live Telemetry...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div className="dashboard-page">
      <h1>Operational Command Center</h1>
      
      {/* --- Odoo Requirement: Role-Based Access Control --- */}
      <div className="rbac-actions" style={{ marginBottom: '20px' }}>
        {user?.role === 'FLEET_MANAGER' && (
          <button style={{ marginRight: '10px' }}>➕ Register New Vehicle</button>
        )}
        {user?.role === 'FINANCIAL_ANALYST' && (
          <button className="finance-btn">📊 Export ROI Report (CSV)</button>
        )}
      </div>

      <div className="filters">
        <label>Filter by Vehicle Type: </label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="ALL">All Types</option>
          <option value="TRUCK">Heavy Trucks</option>
          <option value="VAN">Delivery Vans</option>
        </select>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card"><h3>Active Vehicles</h3><p>{kpis.activeVehicles}</p></div>
        <div className="kpi-card"><h3>Available Vehicles</h3><p>{kpis.availableVehicles}</p></div>
        <div className="kpi-card"><h3>In Shop (Maintenance)</h3><p>{kpis.inMaintenance}</p></div>
        
        {/* Fully operational dynamically fetched KPIs */}
        <div className="kpi-card"><h3>Active Trips</h3><p>{kpis.activeTrips}</p></div>
        <div className="kpi-card"><h3>Pending Trips</h3><p>{kpis.pendingTrips}</p></div>
        <div className="kpi-card"><h3>Drivers On Duty</h3><p>{kpis.driversOnDuty}</p></div>
        
        <div className="kpi-card">
          <h3>Fleet Utilization</h3>
          <p className={kpis.fleetUtilization > 80 ? 'text-success' : kpis.fleetUtilization < 40 ? 'text-danger' : 'text-warning'}>
            {kpis.fleetUtilization}%
          </p>
        </div>
      </div>
    </div>
  );
}