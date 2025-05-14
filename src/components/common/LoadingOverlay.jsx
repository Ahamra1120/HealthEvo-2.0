import React from 'react';

const LoadingOverlay = ({ message }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">{message || 'Loading...'}</div>
    </div>
  );
};

export default LoadingOverlay;