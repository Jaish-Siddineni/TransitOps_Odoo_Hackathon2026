import React, { useState } from 'react';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import VehicleList from './pages/Vehicles/VehicleList';
import DriverList from './pages/Drivers/DriverList';
import TripManager from './pages/Trips/TripManager';
import MaintenanceLog from './pages/Maintenance/MaintenanceLog';
import ExpenseLog from './pages/Finance/ExpenseLog';
import Analytics from './pages/Reports/Analytics';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <Login onLogin={(userData) => setUser(userData)} />;
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Navigation */}
      <nav style={{ width: '220px', background: '#2c3e50', color: 'white', minHeight: '100vh', padding: '15px' }}>
        <h3>TransitOps ({user.role})</h3>
        <ul style={{ listStyle: 'none', padding: 0, cursor: 'pointer' }}>
          <li onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
          <li onClick={() => setActiveTab('vehicles')}>🚛 Vehicles</li>
          <li onClick={() => setActiveTab('drivers')}>👨‍✈️ Drivers</li>
          <li onClick={() => setActiveTab('trips')}>🗺️ Trips</li>
          <li onClick={() => setActiveTab('maintenance')}>🔧 Maintenance</li>
          <li onClick={() => setActiveTab('finance')}>💰 Finance & Fuel</li>
          <li onClick={() => setActiveTab('reports')}>📈 Reports</li>
        </ul>
        <button onClick={() => setUser(null)} style={{ marginTop: '20px' }}>Logout</button>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '20px' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'vehicles' && <VehicleList />}
        {activeTab === 'drivers' && <DriverList />}
        {activeTab === 'trips' && <TripManager />}
        {activeTab === 'maintenance' && <MaintenanceLog />}
        {activeTab === 'finance' && <ExpenseLog />}
        {activeTab === 'reports' && <Analytics />}
      </main>
    </div>
  );
}