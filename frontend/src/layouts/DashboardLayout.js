import React from 'react';
import ThemeToggle from '../components/ThemeToggle';

export default function DashboardLayout({ user, activeTab, setActiveTab, onLogout, children }) {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', roles: ['FLEET_MANAGER', 'FINANCIAL_ANALYST', 'DRIVER', 'SAFETY_OFFICER'] },
    { id: 'vehicles', icon: '🚛', label: 'Vehicles', roles: ['FLEET_MANAGER', 'DRIVER'] },
    { id: 'drivers', icon: '👨‍✈️', label: 'Drivers', roles: ['FLEET_MANAGER', 'SAFETY_OFFICER'] },
    { id: 'trips', icon: '🗺️', label: 'Trips', roles: ['FLEET_MANAGER', 'DRIVER'] },
    { id: 'maintenance', icon: '🔧', label: 'Maintenance', roles: ['FLEET_MANAGER'] },
    { id: 'finance', icon: '💰', label: 'Finance & Fuel', roles: ['FINANCIAL_ANALYST', 'FLEET_MANAGER'] },
    { id: 'reports', icon: '📈', label: 'Reports', roles: ['FINANCIAL_ANALYST', 'FLEET_MANAGER'] },
  ];

  // RBAC Menu Filtering
  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--sidebar-bg, #2c3e50)', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2>TransitOps</h2>
        <p style={{ fontSize: '12px', color: '#bdc3c7', marginBottom: '20px' }}>Role: {user.role.replace('_', ' ')}</p>
        
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredMenu.map(item => (
              <li 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  padding: '12px 15px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  background: activeTab === item.id ? '#34495e' : 'transparent',
                  fontWeight: activeTab === item.id ? 'bold' : 'normal'
                }}
              >
                <span style={{ marginRight: '10px' }}>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        
        <div style={{ marginTop: 'auto', borderTop: '1px solid #34495e', paddingTop: '20px' }}>
          <ThemeToggle />
          <button 
            onClick={onLogout} 
            style={{ width: '100%', padding: '10px', marginTop: '15px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', background: 'var(--main-bg, #f4f7f6)', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}