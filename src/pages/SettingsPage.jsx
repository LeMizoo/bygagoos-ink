import React, { useState } from 'react';
import { MobileLayout, MobileSection, MobileCard } from '../components/layout/MobileLayout';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orders: true,
    stock: false,
    team: true
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: 'ByGagoos Ink',
    address: 'Lot IPA 165 Anosimasina, Antananarivo, Madagascar',
    phone: '+261 34 43 359 30',
    email: 'positifaid@live.fr',
    taxId: '1234567890',
    currency: 'MGA'
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: '⚙️' },
    { id: 'company', label: 'Entreprise', icon: '🏢' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'integrations', label: 'Intégrations', icon: '🔌' },
    { id: 'backup', label: 'Sauvegarde', icon: '💾' }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCompanyInfoChange = (key, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Sauvegarde des paramètres:', { notifications, companyInfo });
    alert('Paramètres enregistrés avec succès !');
  };

  const handleResetSettings = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setNotifications({
        email: true,
        push: true,
        orders: true,
        stock: false,
        team: true
      });
      alert('Paramètres réinitialisés');
    }
  };

  const actionButton = (
    <button
      onClick={handleSaveSettings}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      aria-label="Enregistrer les paramètres"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="hidden sm:inline">Enregistrer</span>
    </button>
  );

  return (
    <MobileLayout 
      title="Paramètres" 
      actionButton={actionButton}
    >
      {/* Tabs */}
      <MobileSection>
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
      </MobileSection>

      {/* Paramètres généraux */}
      {activeTab === 'general' && (
        <MobileSection title="⚙️ Paramètres généraux">
          <div className="settings-form">
            <div className="form-group">
              <label>Langue de l'interface</label>
              <select className="form-select">
                <option value="fr">Français</option>
                <option value="mg">Malagasy</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="form-group">
              <label>Devise par défaut</label>
              <select 
                className="form-select"
                value={companyInfo.currency}
                onChange={(e) => handleCompanyInfoChange('currency', e.target.value)}
              >
                <option value="MGA">Ariary Malgache (Ar)</option>
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dollar US ($)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Fuseau horaire</label>
              <select className="form-select">
                <option value="EAT">Afrique de l'Est (GMT+3)</option>
                <option value="CET">Europe Centrale (GMT+1)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Format de date</label>
              <select className="form-select">
                <option value="dd/mm/yyyy">JJ/MM/AAAA (15/12/2024)</option>
                <option value="mm/dd/yyyy">MM/JJ/AAAA (12/15/2024)</option>
                <option value="yyyy-mm-dd">AAAA-MM-JJ (2024-12-15)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mode d'affichage</label>
              <div className="theme-selector">
                <button className="theme-option active">
                  <div className="theme-preview light"></div>
                  <span>Clair</span>
                </button>
                <button className="theme-option">
                  <div className="theme-preview dark"></div>
                  <span>Sombre</span>
                </button>
                <button className="theme-option">
                  <div className="theme-preview auto"></div>
                  <span>Auto</span>
                </button>
              </div>
            </div>
          </div>
        </MobileSection>
      )}

      {/* Informations entreprise */}
      {activeTab === 'company' && (
        <MobileSection title="🏢 Informations de l'entreprise">
          <div className="settings-form">
            <div className="form-group">
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Adresse</label>
              <textarea
                value={companyInfo.address}
                onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                className="form-input"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={companyInfo.phone}
                  onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Numéro d'identification fiscale</label>
              <input
                type="text"
                value={companyInfo.taxId}
                onChange={(e) => handleCompanyInfoChange('taxId', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Logo de l'entreprise</label>
              <div className="logo-upload">
                <div className="logo-preview">
                  <img src="/logo.png" alt="Logo ByGagoos Ink" />
                </div>
                <button className="upload-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Changer le logo
                </button>
              </div>
            </div>
          </div>
        </MobileSection>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <MobileSection title="🔔 Préférences de notifications">
          <div className="notifications-list">
            <div className="notification-item">
              <div className="notification-content">
                <div className="notification-title">Notifications par email</div>
                <div className="notification-description">
                  Recevoir les notifications importantes par email
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-content">
                <div className="notification-title">Notifications push</div>
                <div className="notification-description">
                  Recevoir les notifications sur votre appareil
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-content">
                <div className="notification-title">Nouvelles commandes</div>
                <div className="notification-description">
                  Être alerté pour chaque nouvelle commande
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.orders}
                  onChange={() => handleNotificationChange('orders')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-content">
                <div className="notification-title">Alertes stock</div>
                <div className="notification-description">
                  Recevoir les alertes de stock faible
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.stock}
                  onChange={() => handleNotificationChange('stock')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-content">
                <div className="notification-title">Messages équipe</div>
                <div className="notification-description">
                  Recevoir les messages de l'équipe familiale
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.team}
                  onChange={() => handleNotificationChange('team')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </MobileSection>
      )}

      {/* Intégrations */}
      {activeTab === 'integrations' && (
        <MobileSection title="🔌 Intégrations">
          <div className="integrations-list">
            <div className="integration-item">
              <div className="integration-icon">📧</div>
              <div className="integration-content">
                <div className="integration-title">Email</div>
                <div className="integration-description">
                  Configurer l'envoi d'emails automatisés
                </div>
              </div>
              <div className={`integration-status ${true ? 'connected' : 'disconnected'}`}>
                {true ? 'Connecté' : 'Déconnecté'}
              </div>
            </div>

            <div className="integration-item">
              <div className="integration-icon">💳</div>
              <div className="integration-content">
                <div className="integration-title">Paiements</div>
                <div className="integration-description">
                  Configurer les méthodes de paiement
                </div>
              </div>
              <div className={`integration-status ${false ? 'connected' : 'disconnected'}`}>
                {false ? 'Connecté' : 'Déconnecté'}
              </div>
            </div>

            <div className="integration-item">
              <div className="integration-icon">📊</div>
              <div className="integration-content">
                <div className="integration-title">Analytics</div>
                <div className="integration-description">
                  Intégration avec les outils d'analyse
                </div>
              </div>
              <div className={`integration-status ${false ? 'connected' : 'disconnected'}`}>
                {false ? 'Connecté' : 'Déconnecté'}
              </div>
            </div>
          </div>
        </MobileSection>
      )}

      {/* Sauvegarde */}
      {activeTab === 'backup' && (
        <MobileSection title="💾 Sauvegarde et restauration">
          <div className="backup-section">
            <div className="backup-info">
              <div className="backup-stat">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <div className="stat-value">15/12/2024</div>
                  <div className="stat-label">Dernière sauvegarde</div>
                </div>
              </div>
              <div className="backup-stat">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-value">245 MB</div>
                  <div className="stat-label">Taille des données</div>
                </div>
              </div>
            </div>

            <div className="backup-actions">
              <button className="backup-btn primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sauvegarder maintenant
              </button>
              <button className="backup-btn secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7 15 12 20 17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Restaurer
              </button>
            </div>

            <div className="backup-settings">
              <div className="form-group">
                <label>Sauvegarde automatique</label>
                <select className="form-select">
                  <option value="daily">Quotidienne</option>
                  <option value="weekly" selected>Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                  <option value="never">Jamais</option>
                </select>
              </div>

              <div className="form-group">
                <label>Conserver les sauvegardes</label>
                <select className="form-select">
                  <option value="7">7 jours</option>
                  <option value="30" selected>30 jours</option>
                  <option value="90">90 jours</option>
                  <option value="365">1 an</option>
                </select>
              </div>
            </div>
          </div>
        </MobileSection>
      )}

      {/* Actions système */}
      <MobileSection title="⚠️ Actions système">
        <div className="system-actions">
          <button className="system-btn clear-cache">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Vider le cache
          </button>
          <button 
            className="system-btn reset"
            onClick={handleResetSettings}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Réinitialiser paramètres
          </button>
          <button className="system-btn export-data">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Exporter toutes les données
          </button>
        </div>
      </MobileSection>

      {/* Informations système */}
      <MobileSection title="📱 Informations système">
        <div className="system-info">
          <div className="info-item">
            <span className="info-label">Version</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Dernière mise à jour</span>
            <span className="info-value">15/12/2024</span>
          </div>
          <div className="info-item">
            <span className="info-label">Navigateur</span>
            <span className="info-value">Chrome 120</span>
          </div>
          <div className="info-item">
            <span className="info-label">Résolution</span>
            <span className="info-value">1920x1080</span>
          </div>
        </div>
      </MobileSection>
    </MobileLayout>
  );
};

export default SettingsPage;