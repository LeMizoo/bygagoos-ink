import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Paramètres</h1>
        <p className="page-subtitle">Configurer l'application et l'atelier</p>
      </div>
      
      {/* Contenu simplifié pour le moment */}
      <div className="coming-soon">
        <div className="coming-soon-icon">⚙️</div>
        <h2>Paramètres de l'Application</h2>
        <p>Section en cours de développement</p>
      </div>
    </div>
  );
};

export default SettingsPage;