import React, { useState } from 'react';
import { useAuth } from './store/AuthContext';
import AuthPage from './pages/AuthPage';

// Page Imports
import Dashboard from './pages/Dashboard/Dashboard';
import VehicleList from './pages/Vehicles/VehicleList';
import DriverList from './pages/Drivers/DriverList';
import TripManager from './pages/Trips/TripManager';
import MaintenanceLog from './pages/Maintenance/MaintenanceLog';
import ExpenseLog from './pages/Finance/ExpenseLog';
import Analytics from './pages/Reports/Analytics';

export default function App() {
  const { user, token, logout } = useAuth(); 
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!token) {
    return <AuthPage />;
  }

  return (
    <div className="app-layout">
      
      {/* Premium Sidebar Navigation */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>TransitOps</h2>
          <div className="user-badge">
            <span className="user-email">{user?.email || 'User'}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>

        <ul className="nav-links">
          {/* Everyone sees the Dashboard */}
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
          
          {/* Fleet Managers and Drivers manage Vehicles */}
          {(user?.role === 'FLEET_MANAGER' || user?.role === 'DRIVER') && (
            <li className={activeTab === 'vehicles' ? 'active' : ''} onClick={() => setActiveTab('vehicles')}>🚛 Vehicles</li>
          )}

          {/* Safety Officers and Fleet Managers track Drivers & Compliance */}
          {(user?.role === 'SAFETY_OFFICER' || user?.role === 'FLEET_MANAGER') && (
            <li className={activeTab === 'drivers' ? 'active' : ''} onClick={() => setActiveTab('drivers')}>👨‍✈️ Driver Compliance</li>
          )}

          {/* Drivers and Fleet Managers handle Trips */}
          {(user?.role === 'DRIVER' || user?.role === 'FLEET_MANAGER') && (
            <li className={activeTab === 'trips' ? 'active' : ''} onClick={() => setActiveTab('trips')}>🗺️ Trips</li>
          )}

          {/* Only Fleet Managers handle deep Maintenance Logs */}
          {user?.role === 'FLEET_MANAGER' && (
            <li className={activeTab === 'maintenance' ? 'active' : ''} onClick={() => setActiveTab('maintenance')}>🔧 Maintenance</li>
          )}

          {/* Financial Analysts and Fleet Managers see Expenses & ROI */}
          {(user?.role === 'FINANCIAL_ANALYST' || user?.role === 'FLEET_MANAGER') && (
            <li className={activeTab === 'finance' ? 'active' : ''} onClick={() => setActiveTab('finance')}>💰 Expenses & ROI</li>
          )}

          {/* Financial Analysts have exclusive access to deep Analytics */}
          {user?.role === 'FINANCIAL_ANALYST' && (
            <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>📈 Financial Reports</li>
          )}
        </ul>

        <button onClick={logout} className="logout-btn">🚪 Secure Logout</button>
      </nav>

      {/* Dynamic Content Area */}
      <main className="main-content">
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