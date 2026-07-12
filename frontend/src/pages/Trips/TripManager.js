import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer';
export default function TripManager() {
  const [cargoWeight, setCargoWeight] = useState('');
  const [selectedVehicleCap, setSelectedVehicleCap] = useState(500); // e.g., Van-05 capacity
  const [tripStatus, setTripStatus] = useState('Draft');
  const [error, setError] = useState('');

  const handleDispatch = (e) => {
    e.preventDefault();
    if (Number(cargoWeight) > selectedVehicleCap) {
      setError(`Validation Error: Cargo weight (${cargoWeight}kg) exceeds vehicle max load capacity (${selectedVehicleCap}kg)!`);
      return;
    }
    setError('');
    setTripStatus('Dispatched');
    alert('Trip Dispatched! Vehicle and Driver status automatically changed to On Trip.');
  };

  return (
    <div className="trips-page">
      <h1>Trip Dispatch & Lifecycle Management</h1>
      <p>Current Status: <strong>{tripStatus}</strong></p>
      
      {error && <div style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{error}</div>}

      <form onSubmit={handleDispatch} style={{ maxWidth: '400px' }}>
        <div>
          <label>Source:</label>
          <input type="text" required defaultValue="Warehouse A (Bengaluru)" />
        </div>
        <div>
          <label>Destination:</label>
          <input type="text" required defaultValue="Hub B (Mysuru)" />
        </div>
        <div>
          <label>Select Vehicle:</label>
          <select onChange={(e) => setSelectedVehicleCap(Number(e.target.value))}>
            <option value="500">Van-05 (Max: 500 kg) - Available</option>
            <option value="5000">Truck-02 (Max: 5000 kg) - Available</option>
          </select>
        </div>
        <div>
          <label>Cargo Weight (kg):</label>
          <input 
            type="number" 
            required 
            value={cargoWeight} 
            onChange={(e) => setCargoWeight(e.target.value)} 
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Dispatch Trip</button>
      </form>
    </div>
  );
}