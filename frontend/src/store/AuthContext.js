import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Context
const AuthContext = createContext(null);

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('transitops_user');
    const storedToken = localStorage.getItem('transitops_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login function to update state and local storage
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('transitops_user', JSON.stringify(userData));
    localStorage.setItem('transitops_token', jwtToken);
  };

  // Logout function to clear session
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('transitops_user');
    localStorage.removeItem('transitops_token');
  };

  // Don't render children until we've checked local storage
  if (loading) return <div style={{ padding: '20px' }}>Loading Command Center...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to easily grab auth state in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};