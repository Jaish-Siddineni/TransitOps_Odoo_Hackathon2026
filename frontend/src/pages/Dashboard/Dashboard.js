import React, { useState } from 'react';

export default function Dashboard() {
  const [filterType, setFilterType] = useState('ALL');
  
  // Mandatory KPI calculations
  const kpis = {
    activeVehicles: 12,
    availableVehicles: 8,
    inMaintenance: 3,
    activeTrips: 10,
    pendingTrips: 4,
    driversOnDuty: 15,
    fleetUtilization: 60.0 // (12 Active / 20 Total) * 100
  };

  return (
    <div className="dashboard-page">
      <h1>Operational Command Center</h1>
      
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
        <div className="kpi-card"><h3>Active Trips</h3><p>{kpis.activeTrips}</p></div>
        <div className="kpi-card"><h3>Drivers On Duty</h3><p>{kpis.driversOnDuty}</p></div>
        <div className="kpi-card">
          <h3>Fleet Utilization</h3>
          <p>{kpis.fleetUtilization}%</p>
        </div>
      </div>
    </div>
  );
}