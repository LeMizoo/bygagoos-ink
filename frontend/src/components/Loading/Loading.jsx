import React from 'react';
import { getImageUrl, getPlaceholderImage } from '../../config/images';
import './Loading.css';

const Loading = ({ 
  message = "Chargement en cours...", 
  variant = "default",
  size = "normal"
}) => {
  const containerClass = `loading-container ${variant} ${size === 'mini' ? 'mini' : ''}`;
  
  return (
    <div className={containerClass}>
      <div className="loading-spinner"></div>
      <img 
        src={getImageUrl('/images/logo.png')}
        alt="ByGagoos-Ink Logo" 
        className="loading-logo"
        onError={(e) => {
          e.target.src = getPlaceholderImage('BG');
          e.target.style.display = 'block';
        }}
      />
      <p className="loading-text">{message}</p>
    </div>
  );
};

// Props par défaut
Loading.defaultProps = {
  message: "Chargement en cours...",
  variant: "default",
  size: "normal"
};

export default Loading;