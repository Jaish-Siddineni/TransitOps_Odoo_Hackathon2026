import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';

export default function AuthPage() {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'FLEET_MANAGER'
  });

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isRegistering
            ? formData
            : { email: formData.email, password: formData.password }
        )
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Backend returns: { token: "...", user: {...} }
      // Pass it to AuthContext exactly in this order
      login(data.user, data.token);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-auth-container">
      <div className="auth-hero">
        <div className="hero-content">
          <h1>TransitOps</h1>
          <p>
            The next-generation command center for modern fleet operations
            and logistics management.
          </p>
          <div className="hero-glass-card">
            <h3>✓ Optimize Routes.</h3>
            <h3>✓ Reduce Costs.</h3>
            <h3>✓ Scale Operations.</h3>
          </div>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <h2>{isRegistering ? "Create your account" : "Log in to your account"}</h2>
          <p className="subtitle">
            {isRegistering
              ? "Join the platform to manage your fleet."
              : "Welcome back! Please enter your details."}
          </p>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="premium-form">
            {isRegistering && (
              <>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Omkar Raut"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="FLEET_MANAGER">Fleet Manager</option>
                    <option value="DRIVER">Driver</option>
                    <option value="SAFETY_OFFICER">Safety Officer</option>
                    <option value="FINANCIAL_ANALYST">Financial Analyst</option>
                  </select>
                </div>
              </>
            )}

            <div className="input-group">
              <label>Work Email</label>
              <input
                type="email"
                name="email"
                placeholder="name@transitops.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primary-submit-btn" disabled={loading}>
              {loading ? "Authenticating..." : isRegistering ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="toggle-text">
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <span onClick={() => { setIsRegistering(!isRegistering); setError(''); }}>
              {isRegistering ? "Log in here" : "Sign up for free"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}