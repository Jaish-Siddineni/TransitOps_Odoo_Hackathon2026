import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/global.css'; // Assuming you have a basic CSS file for styles and dark mode

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);