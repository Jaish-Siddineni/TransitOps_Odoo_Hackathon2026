import React from 'react';

export default function Analytics() {
  // Sample calculation data for vehicle KA-01-EQ-1234
  const revenue = 150000;
  const operationalCost = 5200; // Maintenance + Fuel
  const acquisitionCost = 500000;
  
  // ROI Formula
  const roi = (((revenue - operationalCost) / acquisitionCost) * 100).toFixed(2);
  const fuelEfficiency = (1500 / 120).toFixed(1); // 1500 km / 120 Liters

  const handleCSVExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Vehicle,Revenue,OperationalCost,ROI,FuelEfficiency\nKA-01-EQ-1234,150000,5200," + roi + "%," + fuelEfficiency + "km/l";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transitops_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="reports-page">
      <h1>Financial & Operational Analytics</h1>
      <button onClick={handleCSVExport} style={{ background: '#28a745', color: 'white', padding: '10px 15px', border: 'none', cursor: 'pointer' }}>
        📥 Export Reports to CSV
      </button>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div border="1" style={{ border: '1px solid #ccc', padding: '15px', flex: 1 }}>
          <h3>Fuel Efficiency</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{fuelEfficiency} km/L</p>
          <small>Total Distance / Total Fuel Consumed</small>
        </div>
        
        <div style={{ border: '1px solid #ccc', padding: '15px', flex: 1 }}>
          <h3>Vehicle ROI (KA-01-EQ-1234)</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>{roi}%</p>
          <small>Formula: (Revenue - Operational Cost) / Acquisition Cost</small>
        </div>
      </div>
    </div>
  );
}