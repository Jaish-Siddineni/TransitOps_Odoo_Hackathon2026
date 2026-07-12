import React from 'react';

export default function TopNav({ user, activeTab, setActiveTab, logout }) {
  const role = user?.role || 'UNKNOWN';

  return (
    <header className="top-nav">
      {/* Left Side: Brand & Role */}
      <div className="nav-brand">
        <h2>TransitOps</h2>
        <span className="role-badge-top">{role.replace('_', ' ')}</span>
      </div>
      
      {/* Center: Strict Role-Specific Navigation Links */}
      <ul className="nav-links">
        <li 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </li>

        {/* FLEET MANAGER: Vehicles & Maintenance */}
        {role === 'FLEET_MANAGER' && (
          <>
            <li className={activeTab === 'vehicles' ? 'active' : ''} onClick={() => setActiveTab('vehicles')}>🚛 Vehicles</li>
            <li className={activeTab === 'maintenance' ? 'active' : ''} onClick={() => setActiveTab('maintenance')}>🔧 Maintenance</li>
          </>
        )}

        {/* DRIVER: Trips */}
        {role === 'DRIVER' && (
          <li className={activeTab === 'trips' ? 'active' : ''} onClick={() => setActiveTab('trips')}>🗺️ Trips</li>
        )}

        {/* SAFETY OFFICER: Driver Compliance */}
        {role === 'SAFETY_OFFICER' && (
          <li className={activeTab === 'drivers' ? 'active' : ''} onClick={() => setActiveTab('drivers')}>👨‍✈️ Driver Compliance</li>
        )}

        {/* FINANCIAL ANALYST: Expenses & Analytics */}
        {role === 'FINANCIAL_ANALYST' && (
          <>
            <li className={activeTab === 'finance' ? 'active' : ''} onClick={() => setActiveTab('finance')}>💰 Expenses</li>
            <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>📈 Reports</li>
          </>
        )}
      </ul>

      {/* Right Side: User Profile & Logout */}
      <div className="nav-user">
        <span className="nav-email">{user?.email?.split('@')[0] || 'User'}</span>
        <button className="nav-logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}