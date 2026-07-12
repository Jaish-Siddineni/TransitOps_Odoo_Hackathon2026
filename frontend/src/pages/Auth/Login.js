import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('FLEET_MANAGER');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate JWT token & user object return from backend
    const mockUser = {
      email,
      role,
      token: 'mock-jwt-token-xyz123'
    };
    onLogin(mockUser);
  };

  return (
    <div className="login-container">
      <h2>TransitOps Platform Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            required 
            placeholder="admin@transitops.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div>
          <label>Select Role (Hackathon Demo):</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="FLEET_MANAGER">Fleet Manager</option>
            <option value="DRIVER">Driver</option>
            <option value="SAFETY_OFFICER">Safety Officer</option>
            <option value="FINANCIAL_ANALYST">Financial Analyst</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}