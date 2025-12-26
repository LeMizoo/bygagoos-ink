import React, { useState } from 'react';
import './AccountingPage.css';

const AccountingPage = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  
  return (
    <div className="accounting-page">
      <div className="page-header">
        <h1>💰 Comptabilité</h1>
        <p className="page-subtitle">Gestion financière de l'atelier</p>
      </div>
      
      {/* Contenu simplifié pour le moment */}
      <div className="coming-soon">
        <div className="coming-soon-icon">💰</div>
        <h2>Gestion Comptable</h2>
        <p>Section en cours de développement</p>
      </div>
    </div>
  );
};

export default AccountingPage;