import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Chargement...' }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-logo">
            <span className="logo-text">BG</span>
          </div>
        </div>
        <p className="loading-text">{message}</p>
        <p className="loading-subtext">ByGagoos Ink</p>
      </div>
    </div>
  );
};

export default Loading;