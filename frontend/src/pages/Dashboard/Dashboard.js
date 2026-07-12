import React from 'react';
import { useAuth } from '../../store/AuthContext';

// Import the 4 isolated role dashboards
import FleetDashboard from './FleetDashboard';
import DriverDashboard from './DriverDashboard';
import SafetyDashboard from './SafetyDashboard';
import FinanceDashboard from './FinanceDashboard';

export default function Dashboard() {
    const { user } = useAuth();

    // The Traffic Controller: Route users to their specific dashboard
    switch(user?.role) {
        case "FLEET_MANAGER":
            return <FleetDashboard />;
        case "DRIVER":
            return <DriverDashboard />;
        case "SAFETY_OFFICER":
            return <SafetyDashboard />;
        case "FINANCIAL_ANALYST":
            return <FinanceDashboard />;
        default:
            return (
              <div className="dashboard-page">
                <h2>Access Denied</h2>
                <p>Unknown Role: {user?.role}</p>
              </div>
            );
    }
}