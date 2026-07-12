import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <button 
      onClick={() => setIsDarkMode(!isDarkMode)}
      style={{
        padding: '8px 16px',
        borderRadius: '20px',
        cursor: 'pointer',
        background: isDarkMode ? '#f1c40f' : '#2c3e50',
        color: isDarkMode ? '#2c3e50' : '#fff',
        border: 'none',
        fontWeight: 'bold'
      }}
    >
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}