import React, { useState } from 'react';
import './DocumentsPage.css';

const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('designs');
  
  return (
    <div className="documents-page">
      <div className="page-header">
        <h1>📄 Gestion des Documents</h1>
        <p className="page-subtitle">Designs, contrats et documents de l'atelier</p>
      </div>
      
      {/* Contenu simplifié pour le moment */}
      <div className="coming-soon">
        <div className="coming-soon-icon">🎨</div>
        <h2>Gestion des Designs</h2>
        <p>Section en cours de développement</p>
      </div>
    </div>
  );
};

export default DocumentsPage;