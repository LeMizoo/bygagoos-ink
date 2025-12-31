import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ onClose }) => {
  const { user } = useAuth();

  // Toutes les pages fonctionnelles maintenant
  const menuItems = [
    { 
      path: '/app/dashboard', 
      icon: '📊', 
      label: 'Tableau de bord',
      badge: null
    },
    { 
      path: '/app/orders', 
      icon: '📋', 
      label: 'Commandes',
      badge: 5
    },
    { 
      path: '/app/orders/new', 
      icon: '➕', 
      label: 'Nouvelle Commande',
      badge: null,
      isAction: true
    },
    { 
      path: '/app/clients', 
      icon: '👥', 
      label: 'Clients',
      badge: 12
    },
    { 
      path: '/app/production', 
      icon: '🏭', 
      label: 'Équipe Production',
      badge: null
    },
    { 
      path: '/app/stock', 
      icon: '📦', 
      label: 'Gestion du Stock',
      badge: '3'
    },
    { 
      path: '/app/calendar', 
      icon: '📅', 
      label: 'Calendrier',
      badge: '8'
    },
    { 
      path: '/app/documents', 
      icon: '📄', 
      label: 'Documents',
      badge: null
    },
    { 
      path: '/app/logistics', 
      icon: '🚚', 
      label: 'Logistique',
      badge: '2'
    },
    { 
      path: '/app/accounting', 
      icon: '💰', 
      label: 'Comptabilité',
      badge: '4'
    },
  ];

  const settingsItems = [
    { 
      path: '/app/profile', 
      icon: '👤', 
      label: 'Mon Profil',
      badge: null
    },
    { 
      path: '/app/settings', 
      icon: '⚙️', 
      label: 'Paramètres',
      badge: null
    },
    { 
      path: '/family', 
      icon: '🏡', 
      label: 'Page Familiale Publique',
      badge: null,
      isPublic: true
    },
  ];

  // Fonction pour obtenir les initiales de l'utilisateur
  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return 'BY';
  };

  // Fonction pour obtenir le rôle formaté
  const getUserRole = () => {
    if (user?.role) {
      const roles = {
        'founder': 'Fondateur',
        'manager': 'Gérant',
        'designer': 'Designer',
        'admin': 'Administrateur',
        'production': 'Production'
      };
      return roles[user.role] || user.role;
    }
    return 'Membre Familial';
  };

  const handleItemClick = () => {
    // Fermer la sidebar sur mobile quand on clique sur un élément
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  return (
    <aside className="sidebar">
      {/* En-tête avec logo et utilisateur */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span className="logo-icon">👕</span>
            <div className="brand-text">
              <span className="brand-name">ByGagoos</span>
              <span className="brand-subtitle">Sérigraphie Textile</span>
            </div>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            {getUserInitials()}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Famille ByGagoos'}</div>
            <div className="user-role">{getUserRole()}</div>
            <div className="user-status">
              <span className="status-dot online"></span>
              <span className="status-text">Connecté</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">
            <span className="section-icon">📍</span>
            Navigation Principale
          </h3>
          <ul className="nav-menu">
            {menuItems.map((item) => (
              <li key={item.path} className={`nav-item ${item.isAction ? 'nav-action' : ''}`}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleItemClick}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">
                      {item.badge}
                    </span>
                  )}
                  {item.isAction && (
                    <span className="action-indicator"></span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Section paramètres et profil */}
        <div className="nav-section">
          <h3 className="nav-section-title">
            <span className="section-icon">⚙️</span>
            Compte & Paramètres
          </h3>
          <ul className="nav-menu">
            {settingsItems.map((item) => (
              <li key={item.path} className={`nav-item ${item.isPublic ? 'nav-public' : ''}`}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleItemClick}
                  target={item.isPublic ? '_blank' : '_self'}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.isPublic && (
                    <span className="external-indicator">
                      ↗️
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Pied de page */}
      <div className="sidebar-footer">
        {/* Statut atelier */}
        <div className="atelier-status-card">
          <div className="status-header">
            <span className="status-icon">🏭</span>
            <div className="status-info">
              <div className="status-title">Atelier ByGagoos</div>
              <div className="status-subtitle">Statut actuel</div>
            </div>
          </div>
          <div className="status-content">
            <div className="status-item">
              <span className="item-label">Ouverture:</span>
              <span className="item-value">07h00 - 17h00</span>
            </div>
            <div className="status-item">
              <span className="item-label">Équipe:</span>
              <span className="item-value">4/4 présents</span>
            </div>
            <div className="status-item">
              <span className="item-label">Commandes:</span>
              <span className="item-value value-active">5 en cours</span>
            </div>
          </div>
          <div className="status-indicator">
            <span className="indicator-dot online"></span>
            <span className="indicator-text">Atelier ouvert</span>
          </div>
        </div>

        {/* Version et déconnexion */}
        <div className="footer-bottom">
          <div className="version-info">
            <span className="version-icon">🔄</span>
            <span className="version-text">Version 1.0.0</span>
          </div>
          
          <button 
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('family_token');
              localStorage.removeItem('user');
              window.location.href = '/';
              if (onClose) onClose();
            }}
          >
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;