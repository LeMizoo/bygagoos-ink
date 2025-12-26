import React, { useState } from 'react';
import './LogisticsPage.css';

const LogisticsPage = () => {
  const [activeTab, setActiveTab] = useState('deliveries');
  
  return (
    <div className="logistics-page">
      <div className="page-header">
        <h1>🚚 Logistique & Livraisons</h1>
        <p className="page-subtitle">Gestion des transports et livraisons</p>
      </div>
      
      {/* Contenu simplifié pour le moment */}
      <div className="coming-soon">
        <div className="coming-soon-icon">🚚</div>
        <h2>Gestion Logistique</h2>
        <p>Section en cours de développement</p>
      </div>
    </div>
  );
};

export default LogisticsPage;