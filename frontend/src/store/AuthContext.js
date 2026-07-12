import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CRITICAL FIX: Changed keys to exactly "user" and "token" 
    // to match what the Dashboard API calls are expecting.
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    // Save to local storage using the standardized keys
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);

    // Clear the standardized keys
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        Loading Command Center...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};