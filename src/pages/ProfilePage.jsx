import React, { useState } from 'react';
import { MobileLayout, MobileSection, MobileCard } from '../components/layout/MobileLayout';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  // Données utilisateur
  const userProfile = {
    id: 1,
    name: 'Tovoniaina RAHENDRISON',
    shortName: 'Tovo (Dada)',
    email: 'tovoniaina.rahendrison@gmail.com',
    phone: '+261 34 43 593 30',
    role: 'Fondateur & Maître Imprimeur',
    avatar: '/profiles/tovoniaina.jpg',
    joinDate: '2025-01-01',
    address: 'Lot IPA 165 Anosimasina, Antananarivo',
    bio: 'Fondateur de ByGagoos Ink, passionné par l\'art de la sérigraphie et le développement de l\'artisanat malgache.',
    skills: ['Sérigraphie', 'Design', 'Gestion d\'entreprise', 'Formation'],
    stats: {
      completedOrders: 156,
      activeProjects: 8,
      clientRating: 4.9,
      teamContribution: 95
    }
  };

  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
    bio: userProfile.bio
  });

  const tabs = [
    { id: 'personal', label: 'Personnel', icon: '👤' },
    { id: 'professional', label: 'Professionnel', icon: '💼' },
    { id: 'security', label: 'Sécurité', icon: '🔒' },
    { id: 'preferences', label: 'Préférences', icon: '⚙️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Sauvegarde des données:', formData);
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const actionButton = (
    <button
      onClick={() => setIsEditing(!isEditing)}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      aria-label={isEditing ? "Annuler" : "Modifier le profil"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="hidden sm:inline">{isEditing ? 'Annuler' : 'Modifier'}</span>
    </button>
  );

  return (
    <MobileLayout 
      title="Mon Profil" 
      actionButton={actionButton}
    >
      {/* Photo de profil et informations basiques */}
      <MobileSection>
        <div className="profile-header">
          <div className="avatar-container">
            <img 
              src={userProfile.avatar} 
              alt={userProfile.shortName}
              className="profile-avatar"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = userProfile.name.charAt(0);
              }}
            />
            <button className="avatar-edit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{userProfile.name}</h1>
            <p className="profile-role">{userProfile.role}</p>
            <p className="profile-join">Membre depuis {new Date(userProfile.joinDate).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </MobileSection>

      {/* Tabs */}
      <MobileSection>
        <div className="profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </MobileSection>

      {/* Informations personnelles */}
      {activeTab === 'personal' && (
        <>
          <MobileSection title="👤 Informations personnelles">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Adresse</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="4"
                  />
                </div>
                <div className="form-actions">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Nom</span>
                  <span className="info-value">{userProfile.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{userProfile.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Téléphone</span>
                  <span className="info-value">{userProfile.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Adresse</span>
                  <span className="info-value">{userProfile.address}</span>
                </div>
                <div className="info-item full-width">
                  <span className="info-label">Bio</span>
                  <p className="info-bio">{userProfile.bio}</p>
                </div>
              </div>
            )}
          </MobileSection>

          <MobileSection title="🎯 Compétences">
            <div className="skills-list">
              {userProfile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </MobileSection>
        </>
      )}

      {/* Informations professionnelles */}
      {activeTab === 'professional' && (
        <>
          <MobileSection title="💼 Statistiques professionnelles">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <div className="stat-value">{userProfile.stats.completedOrders}</div>
                  <div className="stat-label">Commandes terminées</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-content">
                  <div className="stat-value">{userProfile.stats.activeProjects}</div>
                  <div className="stat-label">Projets actifs</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <div className="stat-value">{userProfile.stats.clientRating}/5</div>
                  <div className="stat-label">Note clients</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <div className="stat-value">{userProfile.stats.teamContribution}%</div>
                  <div className="stat-label">Contribution équipe</div>
                </div>
              </div>
            </div>
          </MobileSection>

          <MobileSection title="📅 Dernières activités">
            <div className="activities-list">
              <div className="activity-item">
                <div className="activity-icon">🎨</div>
                <div className="activity-content">
                  <div className="activity-title">Design commande #BG-1245</div>
                  <div className="activity-details">
                    <span className="detail">Aujourd'hui, 10:30</span>
                    <span className="detail">• 2h de travail</span>
                  </div>
                </div>
                <div className="activity-status completed">Terminé</div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">👥</div>
                <div className="activity-content">
                  <div className="activity-title">Réunion équipe production</div>
                  <div className="activity-details">
                    <span className="detail">Hier, 15:00</span>
                    <span className="detail">• 1h30</span>
                  </div>
                </div>
                <div className="activity-status completed">Terminé</div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📦</div>
                <div className="activity-content">
                  <div className="activity-title">Commande de matières premières</div>
                  <div className="activity-details">
                    <span className="detail">15/12/2024</span>
                    <span className="detail">• 45min</span>
                  </div>
                </div>
                <div className="activity-status pending">En cours</div>
              </div>
            </div>
          </MobileSection>
        </>
      )}

      {/* Sécurité */}
      {activeTab === 'security' && (
        <MobileSection title="🔒 Sécurité du compte">
          <div className="security-items">
            <div className="security-item">
              <div className="security-icon">🔑</div>
              <div className="security-content">
                <div className="security-title">Mot de passe</div>
                <div className="security-description">
                  Dernière modification: il y a 30 jours
                </div>
              </div>
              <button className="security-action">Modifier</button>
            </div>
            <div className="security-item">
              <div className="security-icon">📱</div>
              <div className="security-content">
                <div className="security-title">Authentification à deux facteurs</div>
                <div className="security-description">
                  Non activée. Ajoutez une couche de sécurité supplémentaire.
                </div>
              </div>
              <button className="security-action">Activer</button>
            </div>
            <div className="security-item">
              <div className="security-icon">📊</div>
              <div className="security-content">
                <div className="security-title">Sessions actives</div>
                <div className="security-description">
                  1 appareil connecté
                </div>
              </div>
              <button className="security-action">Voir</button>
            </div>
          </div>
        </MobileSection>
      )}

      {/* Préférences */}
      {activeTab === 'preferences' && (
        <MobileSection title="⚙️ Préférences">
          <div className="preferences-list">
            <div className="preference-item">
              <div className="preference-content">
                <div className="preference-title">Notifications par email</div>
                <div className="preference-description">
                  Recevoir les notifications par email
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <div className="preference-content">
                <div className="preference-title">Notifications push</div>
                <div className="preference-description">
                  Recevoir les notifications sur l'appareil
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <div className="preference-content">
                <div className="preference-title">Mode sombre</div>
                <div className="preference-description">
                  Activer le mode sombre pour l'interface
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <div className="preference-content">
                <div className="preference-title">Langue</div>
                <div className="preference-description">
                  Français
                </div>
              </div>
              <button className="preference-action">Modifier</button>
            </div>
          </div>
        </MobileSection>
      )}
    </MobileLayout>
  );
};

export default ProfilePage;