import React, { useState } from 'react';
import { useAuth } from './store/AuthContext';
import AuthPage from './pages/AuthPage';
import TopNav from './components/TopNav'; 
import Dashboard from './pages/Dashboard/Dashboard';
import './assets/global.css';

export default function App() {
  const { user, token, logout } = useAuth(); 
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!token || !user) {
    return <AuthPage />;
  }

  return (
    <div className="top-layout">
      
      {/* Premium Top Navigation Bar */}
      <TopNav 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        logout={logout} 
      />

      {/* Dynamic Content Area */}
      <main className="main-content-top">
        {/* 
          Instead of rendering 7 different broken files, 
          we pass the activeTab to the Dashboard Router. 
        */}
        <Dashboard activeTab={activeTab} />
      </main>
      
    </div>
  );
}