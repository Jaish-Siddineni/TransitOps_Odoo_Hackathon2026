import React, { useState } from 'react';

export default function TripManager() {
  const [tripData, setTripData] = useState({
    source: '',
    destination: '',
    vehicle: '',
    weight: ''
  });

  const handleDispatch = (e) => {
    e.preventDefault();
    alert(`Trip Dispatched!\nFrom: ${tripData.source}\nTo: ${tripData.destination}`);
    // Clear form after dispatching
    setTripData({ source: '', destination: '', vehicle: '', weight: '' });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Trip Dispatch & Lifecycle Management</h1>
        <p>Create, assign, and monitor active fleet deliveries.</p>
      </div>

      <div className="page-content-card" style={{ maxWidth: '700px' }}>
        
        <div style={{ marginBottom: '2rem', padding: '1rem 1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '500' }}>Current Status:</span> 
          <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Draft Mode</span>
        </div>

        <form className="premium-form" onSubmit={handleDispatch}>
          <div className="input-group">
            <label>Source Location</label>
            <input 
              type="text" 
              required
              placeholder="Enter starting location..." 
              value={tripData.source}
              onChange={(e) => setTripData({...tripData, source: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Destination Location</label>
            <input 
              type="text" 
              required
              placeholder="Enter destination..." 
              value={tripData.destination}
              onChange={(e) => setTripData({...tripData, destination: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Assign Vehicle</label>
            <select 
              required
              value={tripData.vehicle}
              onChange={(e) => setTripData({...tripData, vehicle: e.target.value})}
            >
              <option value="" disabled>Select a vehicle...</option>
              <option value="VAN-05">Van-05 (Max: 500 kg) - Available</option>
              <option value="TRK-02">Truck-02 (Max: 2000 kg) - Available</option>
            </select>
          </div>

          <div className="input-group">
            <label>Cargo Weight (kg)</label>
            <input 
              type="number" 
              required
              placeholder="Enter total weight..." 
              value={tripData.weight}
              onChange={(e) => setTripData({...tripData, weight: e.target.value})}
            />
          </div>

          <button type="submit" className="primary-submit-btn" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem', background: '#3b82f6' }}>
            🚀 Dispatch Trip
          </button>
        </form>
      </div>
    </div>
  );
}