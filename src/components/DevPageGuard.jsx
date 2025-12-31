// src/components/DevPageGuard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DevPageGuard.css';

const DevPageGuard = ({ 
  componentName = "Cette page",
  estimatedRelease = "2025",
  description = "Cette fonctionnalité est en cours de développement et sera bientôt disponible.",
  showBackButton = true
}) => {
  const navigate = useNavigate();

  return (
    <div className="dev-guard-container">
      <div className="dev-guard-content">
        {/* Icône animée */}
        <div className="dev-icon-container">
          <div className="dev-icon">🚧</div>
          <div className="dev-pulse"></div>
        </div>
        
        <h1 className="dev-title">{componentName}</h1>
        <p className="dev-description">{description}</p>
        
        {/* Progression */}
        <div className="dev-progress">
          <div className="progress-info">
            <span className="progress-label">En développement</span>
            <span className="progress-percentage">65%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
          <div className="progress-eta">Prévu pour {estimatedRelease}</div>
        </div>
        
        {/* Fonctionnalités à venir */}
        <div className="dev-features">
          <h3>Fonctionnalités prévues :</h3>
          <ul className="features-list">
            <li className="feature-item">✅ Interface utilisateur complète</li>
            <li className="feature-item">✅ Design responsive</li>
            <li className="feature-item">🔄 Connexion à l'API</li>
            <li className="feature-item">⏳ Fonctions avancées</li>
            <li className="feature-item">⏳ Export des données</li>
          </ul>
        </div>
        
        {/* Actions */}
        <div className="dev-actions">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)}
              className="dev-action-btn back-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour
            </button>
          )}
          
          <button 
            onClick={() => navigate('/app/dashboard')}
            className="dev-action-btn dashboard-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Tableau de bord
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="dev-action-btn refresh-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Recharger
          </button>
        </div>
        
        {/* Note pour les développeurs */}
        <div className="dev-note">
          <p className="note-title">Note pour l'équipe :</p>
          <p className="note-content">
            Pour accéder à cette page en développement, contactez l'administrateur système.
            <br />
            <code className="dev-code">#dev: {componentName.toLowerCase().replace(/\s+/g, '-')}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevPageGuard;