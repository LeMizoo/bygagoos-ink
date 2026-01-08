// frontend/src/components/layout/Navbar.jsx (pour mobile)
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const MobileNavbar = ({ currentPath, isSidebarOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/orders', icon: '📦', label: 'Commandes' },
    { path: '/admin/clients', icon: '👥', label: 'Clients' },
    { path: '/admin/production', icon: '⚙️', label: 'Production' },
    { path: '/admin/stock', icon: '📦', label: 'Stock' },
  ];

  return (
    <nav className="mobile-navbar">
      <div className="mobile-nav-items">
        <button 
          className={`mobile-nav-item ${isSidebarOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <span className="nav-icon">≡</span>
          <span className="nav-label">Menu</span>
        </button>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `mobile-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavbar;