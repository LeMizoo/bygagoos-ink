import React from 'react';
import './Loading.css';

const Loading = ({ 
  type = 'spinner', 
  size = 'medium', 
  fullscreen = false, 
  message = 'Chargement...',
  inline = false,
  overlay = false
}) => {
  // Classes conditionnelles
  const containerClass = `
    loading-container 
    ${fullscreen ? 'fullscreen' : ''} 
    ${inline ? 'loading-inline' : ''}
    ${overlay ? 'loading-overlay' : ''}
  `.trim();

  // Render spinner
  if (type === 'spinner') {
    return (
      <div className={containerClass}>
        <div className={`spinner ${size}`}>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-center"></div>
        </div>
        {message && (
          <p className={`loading-text ${size === 'small' ? 'small' : ''} ${size === 'large' ? 'large' : ''}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Render dots
  if (type === 'dots') {
    return (
      <div className={containerClass}>
        <div className="dots-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        {message && <p className="loading-text">{message}</p>}
      </div>
    );
  }

  // Render skeleton
  if (type === 'skeleton') {
    return (
      <div className="skeleton-loading">
        <div className="skeleton-header"></div>
        <div className="skeleton-content">
          <div className="skeleton-row long"></div>
          <div className="skeleton-row medium"></div>
          <div className="skeleton-row short"></div>
          <div className="skeleton-row medium"></div>
          <div className="skeleton-row short"></div>
        </div>
      </div>
    );
  }

  // Render progress bar
  if (type === 'progress') {
    return (
      <div className={containerClass}>
        <div className="progress-loader">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          {message && <p className="loading-text">{message}</p>}
        </div>
      </div>
    );
  }

  // Render card loading
  if (type === 'card') {
    return (
      <div className="loading-card">
        <div className={`spinner ${size}`}>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-center"></div>
        </div>
        {message && <p className="loading-text">{message}</p>}
      </div>
    );
  }

  return null;
};

// Composant dédié pour les boutons en chargement
export const LoadingButton = ({ loading, children, ...props }) => {
  if (loading) {
    return (
      <button {...props} disabled>
        <div className="loading-inline">
          <div className="spinner small">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-center"></div>
          </div>
          <span className="loading-text small">Chargement...</span>
        </div>
      </button>
    );
  }
  
  return <button {...props}>{children}</button>;
};

// Composant pour les overlays de chargement
export const LoadingOverlay = ({ show, message = 'Chargement...' }) => {
  if (!show) return null;
  
  return (
    <div className="loading-overlay">
      <Loading type="spinner" size="medium" message={message} />
    </div>
  );
};

export default Loading;