import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Tableau de Bord', badge: null },
    { path: '/orders', icon: '🖨️', label: 'Commandes', badge: '12' },
    { path: '/clients', icon: '👔', label: 'Clients', badge: null },
    { path: '/production', icon: '🏭', label: 'Production', badge: '3' },
    { path: '/stock', icon: '📦', label: 'Stock Textile', badge: '5' },
    { path: '/designs', icon: '🎨', label: 'Designs', badge: null },
    { path: '/team', icon: '👨‍👩‍👧‍👦', label: 'Équipe Familiale', badge: null },
    { path: '/calendar', icon: '📅', label: 'Calendrier', badge: null },
    { path: '/documents', icon: '📄', label: 'Documents', badge: null },
    { path: '/logistics', icon: '🚚', label: 'Logistique', badge: null },
    { path: '/accounting', icon: '💰', label: 'Comptabilité', badge: null },
    { path: '/quality', icon: '⭐', label: 'Qualité', badge: null },
    { path: '/maintenance', icon: '🛠️', label: 'Maintenance', badge: null },
    { path: '/settings', icon: '⚙️', label: 'Paramètres', badge: null },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h3>Navigation Atelier</h3>}
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Agrandir" : "Réduire"}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="menu-icon">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="menu-label">{item.label}</span>
                {item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="atelier-status">
            <div className="status-indicator active"></div>
            <span>Atelier Ouvert</span>
          </div>
          <div className="current-time">
            <span className="time-icon">🕐</span>
            {new Date().toLocaleTimeString('fr-MG', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
            <span className="time-location"> • Tana</span>
          </div>
          <div className="family-quote">
            <span className="quote-icon">💬</span>
            <small>"Qualité artisanale, esprit familial"</small>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;