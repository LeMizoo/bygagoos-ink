import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './FamilyPage.css';

const FamilyPage = () => {
  const { user, logout, getFamilyDetails } = useAuth();
  const navigate = useNavigate();
  const [familyData, setFamilyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFamilyData();
  }, []);

  const loadFamilyData = async () => {
    setLoading(true);
    const data = await getFamilyDetails();
    setFamilyData(data);
    setLoading(false);
  };

  const getRoleColor = (role) => {
    const colors = {
      structure: '#7C3AED',
      inspiration: '#EC4899',
      creation: '#10B981',
      communication: '#3B82F6'
    };
    return colors[role] || '#667eea';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des informations familiales...</p>
      </div>
    );
  }

  if (!familyData || !familyData.success) {
    return (
      <div className="error-container">
        <h2>❌ Erreur de chargement</h2>
        <p>Impossible de charger les données familiales.</p>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Retour au dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="family-page">
      {/* Header */}
      <header className="family-header">
        <div className="family-header-content">
          <div className="header-left">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              ← Dashboard
            </button>
            <h1>👨‍👩‍👧‍👦 Notre Équipe Familiale</h1>
          </div>
          
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">Connecté en tant que {user?.name}</span>
              <button onClick={logout} className="logout-btn">
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <div className="stat-number">{familyData.familyStats?.totalMembers || 4}</div>
          <div className="stat-label">Membres</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{familyData.familyStats?.departments || 4}</div>
          <div className="stat-label">Départements</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{familyData.familyStats?.establishment || '2024'}</div>
          <div className="stat-label">Année de création</div>
        </div>
      </div>

      {/* Family Grid */}
      <main className="family-grid-detailed">
        {familyData.members.map(member => (
          <div 
            key={member.id} 
            className="family-card-detailed"
            style={{ 
              borderTop: `4px solid ${getRoleColor(member.role.toLowerCase())}`,
              background: `linear-gradient(135deg, ${getRoleColor(member.role.toLowerCase())}10, #ffffff)`
            }}
          >
            <div className="card-header-detailed">
              <div className="member-image-container-detailed">
                <img 
                  src={`http://localhost:5000${member.imageUrl}`}
                  alt={member.name}
                  className="member-image-detailed"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=${getRoleColor(member.role.toLowerCase()).replace('#', '')}&color=fff&size=400`
                  }}
                />
                <span className="member-emoji-detailed">{member.emoji}</span>
              </div>
              
              <div className="member-info-detailed">
                <h2>{member.name}</h2>
                <div className="member-role-detailed" style={{ color: getRoleColor(member.role.toLowerCase()) }}>
                  {member.role}
                </div>
                <div className="member-department">
                  {member.department}
                </div>
              </div>
            </div>

            <div className="card-body-detailed">
              <p className="member-description">{member.description}</p>
              
              <div className="contact-section">
                <h4>📞 Contact</h4>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span className="contact-text">{member.contact}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    <span className="contact-text">{member.phone}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📅</span>
                    <span className="contact-text">Membre depuis {new Date(member.joined).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>

              <div className="permissions-section">
                <h4>🔑 Permissions</h4>
                <div className="permissions-tags">
                  {member.permissions.map((permission, idx) => (
                    <span key={idx} className="permission-tag">
                      {formatPermission(permission)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-footer-detailed">
              <div className="member-id-detailed">
                #{member.id.toString().padStart(2, '0')}
              </div>
              <div className="action-buttons">
                <button className="action-btn message-btn">
                  ✉️ Envoyer message
                </button>
                <button className="action-btn call-btn">
                  📞 Appeler
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="family-footer">
        <p>© {new Date().getFullYear()} ByGagoos-Ink - Équipe Familiale</p>
        <p>Version 1.1 | Données protégées par authentification</p>
        <button onClick={() => navigate('/dashboard')} className="footer-back-btn">
          ← Retour au tableau de bord
        </button>
      </footer>
    </div>
  );
};

const formatPermission = (permission) => {
  const translations = {
    'view_dashboard': 'Tableau de bord',
    'manage_users': 'Gestion utilisateurs',
    'view_reports': 'Rapports',
    'admin_access': 'Admin',
    'all_access': 'Accès complet',
    'manage_designs': 'Gestion designs',
    'view_creations': 'Créations',
    'creative_access': 'Créatif',
    'manage_production': 'Production',
    'view_orders': 'Commandes',
    'production_access': 'Accès production',
    'manage_clients': 'Gestion clients',
    'view_communications': 'Communications',
    'client_access': 'Accès clients'
  };
  
  return translations[permission] || permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default FamilyPage;