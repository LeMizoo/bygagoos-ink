import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>👤 Profil</h1>
        <p className="page-subtitle">Gérer votre profil et vos préférences</p>
      </div>
      
      {/* Contenu simplifié pour le moment */}
      <div className="coming-soon">
        <div className="coming-soon-icon">👤</div>
        <h2>Gestion du Profil</h2>
        <p>Section en cours de développement</p>
      </div>
    </div>
  );
};

export default ProfilePage;