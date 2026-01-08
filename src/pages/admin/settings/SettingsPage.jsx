import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Général
    companyName: 'ByGagoos Ink',
    email: 'contact@bygagoos-ink.mg',
    phone: '+261 34 XX XXX XX',
    address: 'Antananarivo, Madagascar',
    currency: 'MGA',
    timezone: 'Indian/Antananarivo',
    
    // Notifications
    emailNotifications: true,
    orderNotifications: true,
    stockNotifications: true,
    clientNotifications: false,
    
    // Sécurité
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAttempts: 3,
    
    // Apparence
    theme: 'dark',
    language: 'fr',
    compactMode: false
  });

  const tabs = [
    { id: 'general', label: '⚙️ Général', icon: '⚙️' },
    { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
    { id: 'security', label: '🔐 Sécurité', icon: '🔐' },
    { id: 'appearance', label: '🎨 Apparence', icon: '🎨' },
    { id: 'backup', label: '💾 Sauvegarde', icon: '💾' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log('Paramètres sauvegardés:', settings);
    alert('Paramètres sauvegardés avec succès!');
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setSettings({
        companyName: 'ByGagoos Ink',
        email: 'contact@bygagoos-ink.mg',
        phone: '+261 34 XX XXX XX',
        address: 'Antananarivo, Madagascar',
        currency: 'MGA',
        timezone: 'Indian/Antananarivo',
        emailNotifications: true,
        orderNotifications: true,
        stockNotifications: true,
        clientNotifications: false,
        twoFactorAuth: false,
        sessionTimeout: 30,
        loginAttempts: 3,
        theme: 'dark',
        language: 'fr',
        compactMode: false
      });
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">⚙️ Paramètres du Système</h1>
        <p className="settings-subtitle">Configurez votre espace de travail ByGagoos</p>
      </div>

      <div className="settings-content">
        {/* Navigation par onglets */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contenu des onglets */}
        <div className="settings-panel">
          {/* Onglet Général */}
          {activeTab === 'general' && (
            <div className="tab-content">
              <h2 className="tab-title">Paramètres Généraux</h2>
              
              <div className="settings-grid">
                <div className="setting-group">
                  <label className="setting-label">Nom de l'entreprise</label>
                  <input
                    type="text"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleInputChange}
                    className="setting-input"
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">Email principal</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    className="setting-input"
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={settings.phone}
                    onChange={handleInputChange}
                    className="setting-input"
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">Adresse</label>
                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    className="setting-textarea"
                    rows="3"
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">Devise</label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleInputChange}
                    className="setting-select"
                  >
                    <option value="MGA">Ariary Malgache (MGA)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">Dollar US (USD)</option>
                  </select>
                </div>

                <div className="setting-group">
                  <label className="setting-label">Fuseau horaire</label>
                  <select
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleInputChange}
                    className="setting-select"
                  >
                    <option value="Indian/Antananarivo">Antananarivo (UTC+3)</option>
                    <option value="Europe/Paris">Paris (UTC+1)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Notifications */}
          {activeTab === 'notifications' && (
            <div className="tab-content">
              <h2 className="tab-title">Paramètres de Notifications</h2>
              
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Notifications par email</h3>
                    <p className="notification-description">
                      Recevez des emails pour les mises à jour importantes
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Nouvelles commandes</h3>
                    <p className="notification-description">
                      Alertes lors de nouvelles commandes
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="orderNotifications"
                      checked={settings.orderNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Alertes stock</h3>
                    <p className="notification-description">
                      Notifications quand le stock est bas
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="stockNotifications"
                      checked={settings.stockNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Mises à jour clients</h3>
                    <p className="notification-description">
                      Informations sur les modifications clients
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="clientNotifications"
                      checked={settings.clientNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Sécurité */}
          {activeTab === 'security' && (
            <div className="tab-content">
              <h2 className="tab-title">Paramètres de Sécurité</h2>
              
              <div className="security-grid">
                <div className="security-item">
                  <h3 className="security-title">Authentification à deux facteurs</h3>
                  <p className="security-description">
                    Ajoutez une couche de sécurité supplémentaire
                  </p>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={settings.twoFactorAuth}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="security-item">
                  <h3 className="security-title">Délai de session (minutes)</h3>
                  <p className="security-description">
                    Temps avant déconnexion automatique
                  </p>
                  <input
                    type="range"
                    name="sessionTimeout"
                    min="5"
                    max="120"
                    value={settings.sessionTimeout}
                    onChange={handleInputChange}
                    className="security-range"
                  />
                  <span className="range-value">{settings.sessionTimeout} min</span>
                </div>

                <div className="security-item">
                  <h3 className="security-title">Tentatives de connexion</h3>
                  <p className="security-description">
                    Nombre d'essais avant blocage
                  </p>
                  <select
                    name="loginAttempts"
                    value={settings.loginAttempts}
                    onChange={handleInputChange}
                    className="security-select"
                  >
                    <option value="3">3 tentatives</option>
                    <option value="5">5 tentatives</option>
                    <option value="10">10 tentatives</option>
                  </select>
                </div>

                <div className="security-item">
                  <h3 className="security-title">Journal d'activité</h3>
                  <p className="security-description">
                    Consultez l'historique des connexions
                  </p>
                  <button className="security-button">
                    📋 Voir le journal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Apparence */}
          {activeTab === 'appearance' && (
            <div className="tab-content">
              <h2 className="tab-title">Apparence & Affichage</h2>
              
              <div className="appearance-options">
                <div className="appearance-item">
                  <h3 className="appearance-title">Thème</h3>
                  <div className="theme-selector">
                    <button
                      className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                      onClick={() => setSettings({...settings, theme: 'light'})}
                    >
                      ☀️ Clair
                    </button>
                    <button
                      className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                      onClick={() => setSettings({...settings, theme: 'dark'})}
                    >
                      🌙 Sombre
                    </button>
                    <button
                      className={`theme-option ${settings.theme === 'auto' ? 'active' : ''}`}
                      onClick={() => setSettings({...settings, theme: 'auto'})}
                    >
                      🔄 Auto
                    </button>
                  </div>
                </div>

                <div className="appearance-item">
                  <h3 className="appearance-title">Langue</h3>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleInputChange}
                    className="language-select"
                  >
                    <option value="fr">Français</option>
                    <option value="mg">Malagasy</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="appearance-item">
                  <h3 className="appearance-title">Mode compact</h3>
                  <p className="appearance-description">
                    Réduit l'espacement pour plus d'informations à l'écran
                  </p>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="compactMode"
                      checked={settings.compactMode}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="appearance-item">
                  <h3 className="appearance-title">Aperçu</h3>
                  <div className="preview-card">
                    <div className={`preview-content ${settings.compactMode ? 'compact' : ''}`}>
                      <div className="preview-header">
                        <div className="preview-avatar">👤</div>
                        <div className="preview-text">
                          <div className="preview-title">Exemple de titre</div>
                          <div className="preview-subtitle">Description d'exemple</div>
                        </div>
                      </div>
                      <div className="preview-body">
                        Contenu d'exemple avec différentes densités selon le mode choisi.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Sauvegarde */}
          {activeTab === 'backup' && (
            <div className="tab-content">
              <h2 className="tab-title">Sauvegarde & Données</h2>
              
              <div className="backup-options">
                <div className="backup-item">
                  <h3 className="backup-title">Sauvegarde automatique</h3>
                  <div className="backup-frequency">
                    <select className="frequency-select" defaultValue="daily">
                      <option value="hourly">Toutes les heures</option>
                      <option value="daily">Quotidienne</option>
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuelle</option>
                    </select>
                  </div>
                  <button className="backup-button">
                    💾 Sauvegarder maintenant
                  </button>
                </div>

                <div className="backup-item">
                  <h3 className="backup-title">Export des données</h3>
                  <p className="backup-description">
                    Téléchargez toutes vos données au format CSV
                  </p>
                  <div className="export-options">
                    <button className="export-button">
                      📥 Export commandes
                    </button>
                    <button className="export-button">
                      📥 Export clients
                    </button>
                    <button className="export-button">
                      📥 Export stock
                    </button>
                  </div>
                </div>

                <div className="backup-item">
                  <h3 className="backup-title">Réinitialisation</h3>
                  <p className="backup-warning">
                    ⚠️ Attention: Cette action est irréversible
                  </p>
                  <div className="reset-options">
                    <button className="reset-button" onClick={handleReset}>
                      🔄 Réinitialiser paramètres
                    </button>
                    <button 
                      className="reset-button danger"
                      onClick={() => alert('Cette fonctionnalité est en développement')}
                    >
                      🗑️ Supprimer toutes les données
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions globales */}
      <div className="settings-actions">
        <button className="action-button cancel-button" onClick={handleReset}>
          Annuler
        </button>
        <button className="action-button save-button" onClick={handleSave}>
          💾 Sauvegarder tous les paramètres
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;