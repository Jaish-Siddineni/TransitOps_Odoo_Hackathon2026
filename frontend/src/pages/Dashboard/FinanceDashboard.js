import React, { useState } from "react";
import { useAuth } from "../../store/AuthContext";

export default function FinanceDashboard() {
  const { user } = useAuth();
  
  const [financialData, setFinancialData] = useState({
    monthlyOpex: 1245000,
    fuelCost: 518000,
    maintenanceCost: 231000
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({ amount: '', category: 'FUEL' });

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = Number(expenseData.amount);
    
    // Validate amount
    if (!amount || amount <= 0) return;

    setFinancialData(prev => {
      const updated = { ...prev };
      updated.monthlyOpex += amount;
      if (expenseData.category === 'FUEL') updated.fuelCost += amount;
      if (expenseData.category === 'MAINTENANCE') updated.maintenanceCost += amount;
      return updated;
    });

    setIsModalOpen(false);
    setExpenseData({ amount: '', category: 'FUEL' });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || user?.email?.split('@')[0]}</h1>
        <p>Financial Analyst • Monitor operational expenses and profitability</p>
      </div>

      <div className="page-content-card">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="primary-submit-btn" style={{ background: '#10b981' }} onClick={() => setIsModalOpen(true)}>
            💰 Log New Expense
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card"><h3>💰 Monthly Expenses</h3><p>₹{financialData.monthlyOpex.toLocaleString('en-IN')}</p></div>
        <div className="kpi-card"><h3>⛽ Fuel Cost</h3><p>₹{financialData.fuelCost.toLocaleString('en-IN')}</p></div>
        <div className="kpi-card"><h3>🔧 Maintenance Cost</h3><p>₹{financialData.maintenanceCost.toLocaleString('en-IN')}</p></div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Log Operational Expense</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddExpense} className="premium-form">
              <div className="input-group">
                <label>Amount (₹)</label>
                <input 
                  type="number" 
                  required 
                  value={expenseData.amount}
                  onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Category</label>
                <select value={expenseData.category} onChange={(e) => setExpenseData({...expenseData, category: e.target.value})}>
                  <option value="FUEL">Fuel & Gas</option>
                  <option value="MAINTENANCE">Parts & Maintenance</option>
                  <option value="OTHER">Other Operations</option>
                </select>
              </div>
              <button type="submit" className="primary-submit-btn" style={{ width: '100%', background: '#10b981' }}>Save Expense</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}