import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer';
export default function VehicleList() {
  const [vehicles, setVehicles] = useState([
    { id: 1, regNo: 'KA-01-EQ-1234', model: 'Tata Ace', type: 'VAN', capacity: 500, odometer: 15000, cost: 500000, status: 'Available' },
    { id: 2, regNo: 'MH-12-PQ-9876', model: 'Ashok Leyland', type: 'TRUCK', capacity: 5000, odometer: 82000, cost: 2500000, status: 'On Trip' },
    { id: 3, regNo: 'DL-04-AB-4321', model: 'Mahindra Bolero', type: 'VAN', capacity: 800, odometer: 45000, cost: 750000, status: 'In Shop' }
  ]);

  return (
    <div className="vehicles-page">
      <h1>Vehicle Registry</h1>
      <button>+ Add New Vehicle</button>
      <table border="1" cellPadding="8" style={{ marginTop: '10px', width: '100%' }}>
        <thead>
          <tr>
            <th>Registration No</th>
            <th>Model</th>
            <th>Type</th>
            <th>Max Capacity (kg)</th>
            <th>Odometer (km)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td><strong>{v.regNo}</strong></td>
              <td>{v.model}</td>
              <td>{v.type}</td>
              <td>{v.capacity}</td>
              <td>{v.odometer}</td>
              <td>
                <span className={`badge status-${v.status.toLowerCase().replace(' ', '-')}`}>
                  {v.status}
                </span>
              </td>
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}