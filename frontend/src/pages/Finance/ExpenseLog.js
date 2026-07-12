import React, { useState } from 'react';

export default function ExpenseLog() {
  const [fuelLogs, setFuelLogs] = useState([
    { id: 1, vehicle: 'KA-01-EQ-1234', liters: 40, cost: 4000, date: '2026-07-11', type: 'Fuel' },
    { id: 2, vehicle: 'KA-01-EQ-1234', liters: 0, cost: 1200, date: '2026-07-11', type: 'Maintenance/Toll' }
  ]);

  // Automatically compute total operational cost per vehicle
  const totalCost = fuelLogs.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <div className="finance-page">
      <h1>Fuel & Expense Ledger</h1>
      <div style={{ padding: '15px', background: '#f4f4f4', marginBottom: '15px' }}>
        <h3>Total Operational Cost (KA-01-EQ-1234): ₹{totalCost}</h3>
      </div>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr><th>Vehicle</th><th>Expense Type</th><th>Liters</th><th>Cost (₹)</th><th>Date</th></tr>
        </thead>
        <tbody>
          {fuelLogs.map(log => (
            <tr key={log.id}>
              <td>{log.vehicle}</td>
              <td>{log.type}</td>
              <td>{log.liters || '-'}</td>
              <td>₹{log.cost}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}