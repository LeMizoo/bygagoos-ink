import React from 'react';
import './MobileLayout.css';

export const MobileLayout = ({ children, title, showBackButton = false, onBack, actionButton }) => {
  return (
    <div className="mobile-layout">
      {/* Header mobile */}
      <header className="mobile-header">
        {showBackButton && (
          <button className="mobile-back-button" onClick={onBack} aria-label="Retour">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <h1 className="mobile-title">{title}</h1>
        {actionButton && (
          <div className="mobile-action">
            {actionButton}
          </div>
        )}
      </header>

      {/* Contenu principal */}
      <main className="mobile-main-content">
        {children}
      </main>
    </div>
  );
};

// Pour les sections de contenu
export const MobileSection = ({ children, title, className = '' }) => {
  return (
    <section className={`mobile-section ${className}`}>
      {title && <h2 className="mobile-section-title">{title}</h2>}
      <div className="mobile-section-content">
        {children}
      </div>
    </section>
  );
};

// Pour les cartes mobiles
export const MobileCard = ({ children, onClick, className = '' }) => {
  const CardComponent = onClick ? 'button' : 'div';
  return (
    <CardComponent 
      className={`mobile-card ${className}`}
      onClick={onClick}
      {...(onClick ? { type: 'button' } : {})}
    >
      {children}
    </CardComponent>
  );
};