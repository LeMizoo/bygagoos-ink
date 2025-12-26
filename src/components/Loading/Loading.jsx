import React from 'react';
import './Loading.css';

const Loading = ({ type = 'spinner', size = 'medium', fullscreen = false }) => {
  if (type === 'spinner') {
    return (
      <div className={`loading-container ${fullscreen ? 'fullscreen' : ''}`}>
        <div className={`spinner ${size}`}>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-center"></div>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`loading-container ${fullscreen ? 'fullscreen' : ''}`}>
        <div className="dots-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className="skeleton-loading">
        <div className="skeleton-header"></div>
        <div className="skeleton-content">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-row"></div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Loading;