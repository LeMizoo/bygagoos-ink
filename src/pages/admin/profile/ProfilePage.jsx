import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    notifications: true,
    language: 'fr'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    // En production, ici on ferait un appel API
    console.log('Profil mis à jour:', formData);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">👤 Mon Profil</h1>
        <p className="profile-subtitle">Gérez vos informations personnelles et paramètres</p>
      </div>

      <div className="profile-content">
        {/* Section Informations Personnelles */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Informations Personnelles</h2>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Annuler' : '✏️ Modifier'}
            </button>
          </div>

          <div className="profile-info-grid">
            <div className="info-card avatar-card">
              <div className="avatar-container">
                <div className="user-avatar-large">
                  {user?.avatar || '👤'}
                </div>
                <div className="avatar-info">
                  <h3 className="user-name-large">{user?.name || 'Utilisateur'}</h3>
                  <p className="user-role-large">{user?.role || 'Membre'}</p>
                  <p className="member-since">Membre depuis Janvier 2024</p>
                </div>
              </div>
              <button className="avatar-change-btn">
                📷 Changer la photo
              </button>
            </div>

            <div className="info-card details-card">
              <div className="form-group">
                <label className="form-label">Nom complet</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Votre nom"
                  />
                ) : (
                  <p className="info-value">{user?.name}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Adresse email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="votre@email.com"
                  />
                ) : (
                  <p className="info-value">{user?.email}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Téléphone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+261 XX XX XXX XX"
                  />
                ) : (
                  <p className="info-value">{formData.phone || 'Non renseigné'}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Adresse</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Votre adresse complète"
                    rows="3"
                  />
                ) : (
                  <p className="info-value">{formData.address || 'Non renseignée'}</p>
                )}
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button className="save-button" onClick={handleSave}>
                    💾 Enregistrer les modifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Paramètres */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">⚙️ Paramètres du compte</h2>
          </div>

          <div className="settings-grid">
            <div className="settings-card">
              <h3 className="settings-title">Notifications</h3>
              <div className="settings-options">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-label">Activer les notifications par email</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-label">Notifications sur les nouvelles commandes</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-label">Alertes de stock bas</span>
                </label>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="settings-title">Préférences</h3>
              <div className="form-group">
                <label className="form-label">Langue</label>
                <select 
                  className="form-select"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                  <option value="fr">Français</option>
                  <option value="mg">Malagasy</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Fuseau horaire</label>
                <select className="form-select" defaultValue="antananarivo">
                  <option value="antananarivo">Antananarivo (UTC+3)</option>
                  <option value="paris">Paris (UTC+1)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section Sécurité */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">🔒 Sécurité</h2>
          </div>

          <div className="security-card">
            <div className="security-item">
              <div className="security-info">
                <h4 className="security-title">Mot de passe</h4>
                <p className="security-description">Dernière modification il y a 30 jours</p>
              </div>
              <button className="security-action">
                🔑 Changer le mot de passe
              </button>
            </div>

            <div className="security-item">
              <div className="security-info">
                <h4 className="security-title">Sessions actives</h4>
                <p className="security-description">1 appareil connecté</p>
              </div>
              <button className="security-action">
                👁️ Voir les sessions
              </button>
            </div>

            <div className="security-item">
              <div className="security-info">
                <h4 className="security-title">Authentification à deux facteurs</h4>
                <p className="security-description">Non activée</p>
              </div>
              <button className="security-action">
                🔒 Activer 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;