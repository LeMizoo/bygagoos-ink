import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo et nom - Sérigraphie Textile */}
        <div className="navbar-brand">
          <div className="logo-container">
            <span className="logo-icon">👕</span>
            <h1 className="logo-text">ByGagoos Ink</h1>
          </div>
          <span className="company-tagline">Sérigraphie Textile Familiale • Antananarivo</span>
        </div>

        {/* Menu desktop */}
        <div className="navbar-menu">
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">
              <span className="nav-icon">📊</span>
              Tableau de Bord
            </Link>
            <Link to="/orders" className="nav-link">
              <span className="nav-icon">🖨️</span>
              Commandes
            </Link>
            <Link to="/clients" className="nav-link">
              <span className="nav-icon">👔</span>
              Clients
            </Link>
            <Link to="/production" className="nav-link">
              <span className="nav-icon">🏭</span>
              Production
            </Link>
          </div>

          {/* User info et actions - Style familial */}
          <div className="navbar-actions">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || '👨‍👩‍👧'}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'Membre Famille'}</span>
                <span className="user-role">{user?.role || 'Artisan'}</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              Déconnexion
            </button>
          </div>
        </div>

        {/* Menu mobile toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" className="mobile-nav-link">
            <span className="nav-icon">📊</span>
            Tableau de Bord
          </Link>
          <Link to="/orders" className="mobile-nav-link">
            <span className="nav-icon">🖨️</span>
            Commandes
          </Link>
          <Link to="/clients" className="mobile-nav-link">
            <span className="nav-icon">👔</span>
            Clients
          </Link>
          <Link to="/production" className="mobile-nav-link">
            <span className="nav-icon">🏭</span>
            Production
          </Link>
          <button className="mobile-logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;