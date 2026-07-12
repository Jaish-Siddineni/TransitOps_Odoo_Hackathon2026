import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/AuthContext";

export default function SafetyDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({ driversOnDuty: 0 });
  const [safetyMetrics, setSafetyMetrics] = useState({ expiringLicenses: 4, safetyAlerts: 2, safetyScore: 95 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidentData, setIncidentData] = useState({ type: 'SPEEDING', notes: '' });

  useEffect(() => {
    // Simulated fetch
    setLoading(false);
  }, []);

  const handleLogIncident = (e) => {
    e.preventDefault();
    setSafetyMetrics(prev => ({ 
      ...prev, 
      safetyAlerts: incidentData.type !== 'PASSED_AUDIT' ? prev.safetyAlerts + 1 : prev.safetyAlerts,
      safetyScore: incidentData.type === 'PASSED_AUDIT' ? Math.min(100, prev.safetyScore + 2) : Math.max(0, prev.safetyScore - 3)
    }));
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Safety & Compliance</h1>
      </div>

      <div className="page-content-card">
        <button className="primary-submit-btn" style={{ background: '#8b5cf6' }} onClick={() => setIsModalOpen(true)}>🛡️ Log Safety Audit</button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card"><h3>⭐ Avg Safety Score</h3><p>{safetyMetrics.safetyScore}%</p></div>
        <div className="kpi-card"><h3>⚠️ Alerts</h3><p>{safetyMetrics.safetyAlerts}</p></div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Log Safety Audit</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleLogIncident} className="premium-form">
              <div className="input-group">
                <label>Audit Type</label>
                <select value={incidentData.type} onChange={(e) => setIncidentData({...incidentData, type: e.target.value})}>
                  <option value="SPEEDING">Overspeeding</option>
                  <option value="PASSED_AUDIT">Passed Audit</option>
                </select>
              </div>
              <button type="submit" className="primary-submit-btn" style={{ width: '100%', background: '#8b5cf6' }}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}