import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer';
export default function DriverList() {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Alex Kumar', license: 'DL-1420110012345', category: 'HMV', expiry: '2028-05-10', safetyScore: 95, status: 'Available' },
    { id: 2, name: 'Rajesh Verma', license: 'DL-1420180098765', category: 'LMV', expiry: '2025-01-15', safetyScore: 68, status: 'Suspended' }
  ]);

  const isExpired = (dateString) => new Date(dateString) < new Date();

  return (
    <div className="drivers-page">
      <h1>Driver Management & Safety Compliance</h1>
      <table border="1" cellPadding="8" style={{ marginTop: '10px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>License Number</th>
            <th>Expiry Date</th>
            <th>Safety Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => {
            const expired = isExpired(d.expiry);
            return (
              <tr key={d.id} style={{ backgroundColor: expired ? '#ffe6e6' : 'white' }}>
                <td>{d.name}</td>
                <td>{d.license}</td>
                <td>
                  {d.expiry} {expired && <strong style={{ color: 'red' }}>(EXPIRED)</strong>}
                </td>
                <td>
                  <span style={{ color: d.safetyScore < 70 ? 'red' : 'green', fontWeight: 'bold' }}>
                    {d.safetyScore}/100
                  </span>
                </td>
                <td>{d.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}