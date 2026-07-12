import React from 'react';

export default function PageContainer({ title, children, actionButton }) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>{title}</h1>
        {actionButton && <div className="header-actions">{actionButton}</div>}
      </div>
      
      {/* The main content area for your lists, logs, and tables */}
      <div className="page-content-card">
        {children}
      </div>
    </div>
  );
}