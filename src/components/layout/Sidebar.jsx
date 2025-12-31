import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icons } from '../../utils/icons'; // Nouveau fichier d'icônes
import './Sidebar.css';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();

  // Navigation avec icônes professionnelles
  const menuItems = [
    { 
      path: '/app/dashboard', 
      icon: Icons.dashboard,
      label: 'Tableau de bord',
      description: 'Vue d\'ensemble',
      badge: null
    },
    { 
      path: '/app/orders', 
      icon: Icons.orders,
      label: 'Commandes',
      description: 'Gestion des commandes',
      badge: 12
    },
    { 
      path: '/app/orders/new', 
      icon: Icons.newOrder,
      label: 'Nouvelle Commande',
      description: 'Créer une commande',
      badge: null,
      isAction: true
    },
    { 
      path: '/app/clients', 
      icon: Icons.clients,
      label: 'Clients',
      description: 'Gestion clientèle',
      badge: 24
    },
    { 
      path: '/app/production', 
      icon: Icons.production,
      label: 'Production',
      description: 'Équipe et planning',
      badge: null
    },
    { 
      path: '/app/stock', 
      icon: Icons.stock,
      label: 'Stock',
      description: 'Inventaire et fournitures',
      badge: '3'
    },
    { 
      path: '/app/calendar', 
      icon: Icons.calendar,
      label: 'Calendrier',
      description: 'Planning et rendez-vous',
      badge: '8'
    },
    { 
      path: '/app/documents', 
      icon: Icons.documents,
      label: 'Documents',
      description: 'Contrats et factures',
      badge: null
    },
    { 
      path: '/app/logistics', 
      icon: Icons.logistics,
      label: 'Logistique',
      description: 'Livraisons et transport',
      badge: '2'
    },
    { 
      path: '/app/accounting', 
      icon: Icons.accounting,
      label: 'Comptabilité',
      description: 'Finances et paiements',
      badge: '4'
    },
  ];

  const settingsItems = [
    { 
      path: '/app/profile', 
      icon: Icons.profile,
      label: 'Mon Profil',
      description: 'Informations personnelles',
      badge: null
    },
    { 
      path: '/app/settings', 
      icon: Icons.settings,
      label: 'Paramètres',
      description: 'Configuration',
      badge: null
    },
    { 
      path: '/family', 
      icon: Icons.family,
      label: 'Page Familiale',
      description: 'Site public',
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
        'production': 'Production',
        'family': 'Membre Familial'
      };
      return roles[user.role] || user.role;
    }
    return 'Membre Familial';
  };

  const handleItemClick = () => {
    // Fermer la sidebar sur mobile
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  return (
    <aside className="sidebar">
      {/* En-tête */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span className="logo-icon">{Icons.workshop}</span>
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
              <span className="status-text">En ligne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">
            <span className="section-icon">{Icons.navigation}</span>
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
                  title={item.description}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <div className="nav-text">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
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

        {/* Paramètres */}
        <div className="nav-section">
          <h3 className="nav-section-title">
            <span className="section-icon">{Icons.settings}</span>
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
                  title={item.description}
                  target={item.isPublic ? '_blank' : '_self'}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <div className="nav-text">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                  {item.isPublic && (
                    <span className="external-indicator">
                      {Icons.external}
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
            <span className="status-icon">{Icons.workshop}</span>
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
              <span className="item-value value-active">12 en cours</span>
            </div>
          </div>
          <div className="status-indicator">
            <span className="indicator-dot online"></span>
            <span className="indicator-text">Atelier ouvert</span>
          </div>
        </div>

        {/* Déconnexion */}
        <div className="footer-bottom">
          <div className="version-info">
            <span className="version-icon">{Icons.refresh}</span>
            <span className="version-text">v1.0.0</span>
          </div>
          
          <button 
            className="logout-btn"
            onClick={handleLogout}
            title="Se déconnecter"
          >
            <span className="logout-icon">{Icons.logout}</span>
            <span className="logout-text">Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;