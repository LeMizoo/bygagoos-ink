import React, { useState } from 'react';
import './FamilyPage.css';

const FamilyPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="family-page">
      <div className="page-header">
        <h1>👨‍👩‍👧‍👦 Espace Familial</h1>
        <p className="page-subtitle">Centre de communication et coordination familiale</p>
      </div>
      
      {/* Contenu simplifié pour le moment */}
      <div className="coming-soon">
        <div className="coming-soon-icon">🏡</div>
        <h2>Espace Familial</h2>
        <p>Section en cours de développement</p>
      </div>
    </div>
  );
};

export default FamilyPage;