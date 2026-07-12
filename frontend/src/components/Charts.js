import React from 'react';

export default function Charts({ active, total }) {
  const utilizationPercentage = total === 0 ? 0 : Math.round((active / total) * 100);
  
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3>Fleet Utilization</h3>
      <div style={{ background: '#e0e0e0', borderRadius: '10px', height: '24px', width: '100%', overflow: 'hidden', marginTop: '10px' }}>
        <div 
          style={{ 
            background: utilizationPercentage > 80 ? '#28a745' : utilizationPercentage > 50 ? '#ffc107' : '#dc3545', 
            height: '100%', 
            width: `${utilizationPercentage}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          {utilizationPercentage}%
        </div>
      </div>
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        {active} out of {total} vehicles are currently on trip.
      </p>
    </div>
  );
}