import React from 'react';
import { useAuth } from '../store/AuthContext'; // 1. Import the hook

export default function Sidebar() {
  // 2. Call it right here at the top
  const { user, logout } = useAuth(); 

  return (
    <div className="sidebar">
      <h2>TransitOps</h2>
      
      {/* 3. Use the data! */}
      <div className="user-profile">
        <p>Logged in as: {user?.email}</p>
        <span className="badge">{user?.role}</span>
      </div>

      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Vehicles</li>
          <li>Dispatch</li>
        </ul>
      </nav>

      {/* 4. Wire up the logout function */}
      <button onClick={() => logout()} className="btn-logout">
        Sign Out
      </button>
    </div>
  );
}