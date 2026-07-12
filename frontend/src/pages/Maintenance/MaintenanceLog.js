import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer';
export default function MaintenanceLog() {
  const [logs, setLogs] = useState([
    { id: 1, vehicle: 'DL-04-AB-4321', issue: 'Brake Pad Replacement', date: '2026-07-10', status: 'In Shop' }
  ]);
  const [vehicleReg, setVehicleReg] = useState('');
  const [issue, setIssue] = useState('');

  const handleAddLog = (e) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      vehicle: vehicleReg,
      issue: issue,
      date: new Date().toISOString().split('T')[0],
      status: 'In Shop'
    };
    setLogs([...logs, newLog]);
    alert(`Vehicle ${vehicleReg} automatically switched to "In Shop" status and hidden from Driver dispatch pool!`);
    setVehicleReg('');
    setIssue('');
  };

  return (
    <div className="maintenance-page">
      <h1>Maintenance & Service Logs</h1>
      <form onSubmit={handleAddLog} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Vehicle Reg No (e.g. KA-01-EQ-1234)" 
          required 
          value={vehicleReg} 
          onChange={(e) => setVehicleReg(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Service Required (e.g. Oil Change)" 
          required 
          value={issue} 
          onChange={(e) => setIssue(e.target.value)} 
        />
        <button type="submit">Create Maintenance Record</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr><th>Vehicle</th><th>Issue Description</th><th>Date Logged</th><th>System Status</th></tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.vehicle}</td>
              <td>{log.issue}</td>
              <td>{log.date}</td>
              <td><strong style={{ color: 'orange' }}>{log.status}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}