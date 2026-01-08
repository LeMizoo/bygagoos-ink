// frontend/src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icons } from '../../utils/icons';
import './Sidebar.css';

const Sidebar = ({ isMobile, onClose }) => {
  const { user, logout } = useAuth();

  // Navigation admin
  const adminMenuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard', description: 'Vue d\'ensemble' },
    { path: '/admin/orders', icon: '📦', label: 'Commandes', description: 'Gestion des commandes' },
    { path: '/admin/clients', icon: '👥', label: 'Clients', description: 'Gestion clientèle' },
    { path: '/admin/production', icon: '⚙️', label: 'Production', description: 'Équipe et planning' },
    { path: '/admin/stock', icon: '📦', label: 'Stock', description: 'Inventaire et fournitures' },
    { path: '/admin/accounting', icon: '💰', label: 'Comptabilité', description: 'Finances et paiements' },
  ];

  const adminSettingsItems = [
    { path: '/admin/profile', icon: '👤', label: 'Mon Profil', description: 'Informations personnelles' },
    { path: '/admin/settings', icon: '⚙️', label: 'Paramètres', description: 'Configuration' },
    { path: '/family', icon: '🏠', label: 'Page Familiale', description: 'Site public' },
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

  const handleItemClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isMobile ? 'mobile' : ''}`}>
      {/* En-tête utilisateur */}
      <div className="sidebar-user">
        <div className="user-avatar">{getUserInitials()}</div>
        <div className="user-info">
          <div className="user-name">{user?.name || 'Administrateur'}</div>
          <div className="user-role">Administrateur</div>
          <div className="user-status">
            <span className="status-dot online"></span>
            <span>En ligne</span>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">
            <span className="section-icon">📋</span>
            Navigation
          </h3>
          <ul className="nav-menu">
            {adminMenuItems.map(item => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleItemClick}
                  title={item.description}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <div className="nav-text">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Paramètres */}
        <div className="nav-section">
          <h3 className="nav-section-title">
            <span className="section-icon">⚙️</span>
            Compte
          </h3>
          <ul className="nav-menu">
            {adminSettingsItems.map(item => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleItemClick}
                  title={item.description}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <div className="nav-text">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Pied de page sidebar */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          <span className="logout-icon">🚪</span>
          <span className="logout-text">Déconnexion</span>
        </button>
        <div className="sidebar-version">
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;