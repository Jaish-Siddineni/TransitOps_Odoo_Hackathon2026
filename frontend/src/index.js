import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/global.css'; 
import { AuthProvider } from './store/AuthContext'; // <-- Import the provider

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider> {/* <-- Wrap your App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);