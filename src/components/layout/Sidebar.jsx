import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    { 
      path: '/app/dashboard', 
      icon: '📊', 
      label: 'Tableau de bord',
    },
    { 
      path: '/app/orders', 
      icon: '📋', 
      label: 'Commandes',
    },
    { 
      path: '/app/orders/new', 
      icon: '➕', 
      label: 'Nouvelle Commande',
      isAction: true
    },
    { 
      path: '/app/clients', 
      icon: '👥', 
      label: 'Clients',
    },
    { 
      path: '/app/production', 
      icon: '🏭', 
      label: 'Équipe Production',
    },
    { 
      path: '/app/stock', 
      icon: '📦', 
      label: 'Gestion du Stock',
    },
    { 
      path: '/app/calendar', 
      icon: '📅', 
      label: 'Calendrier',
    },
    { 
      path: '/app/documents', 
      icon: '📄', 
      label: 'Documents',
    },
    { 
      path: '/app/logistics', 
      icon: '🚚', 
      label: 'Logistique',
    },
    { 
      path: '/app/accounting', 
      icon: '💰', 
      label: 'Comptabilité',
    },
  ];

  const settingsItems = [
    { 
      path: '/app/profile', 
      icon: '👤', 
      label: 'Mon Profil',
    },
    { 
      path: '/app/settings', 
      icon: '⚙️', 
      label: 'Paramètres',
    },
    { 
      path: '/family', 
      icon: '🏡', 
      label: 'Page Familiale Publique',
      isPublic: true
    },
  ];

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
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
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
        {/* Version */}
        <div className="footer-bottom">
          <div className="version-info">
            <span className="version-icon">🔄</span>
            <span className="version-text">Version 1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;