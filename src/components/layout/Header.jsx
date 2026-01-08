// frontend/src/components/layout/Header.jsx - Version simplifiée
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ type = 'public', isMobile, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Initiales utilisateur
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

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  // Header Public
  if (type === 'public') {
    return (
      <header className="header public-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="ByGagoos Ink" className="logo-image" />
              <div className="logo-text">
                <span className="logo-name">ByGagoos</span>
                <span className="logo-subtitle">Sérigraphie Textile</span>
              </div>
            </Link>
          </div>

          <nav className="nav">
            <Link to="/">Accueil</Link>
            <Link to="/gallery">Galerie</Link>
            <Link to="/family">Famille</Link>
            
            {user ? (
              <Link to="/admin/dashboard" className="btn-primary">
                Espace Pro
              </Link>
            ) : (
              <>
                <Link to="/login">Connexion</Link>
                <Link to="/register" className="btn-primary">
                  S'inscrire
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    );
  }

  // Header Admin
  if (type === 'admin') {
    return (
      <header className="header admin-header">
        <div className="header-container">
          {/* Partie gauche */}
          <div className="header-left">
            {isMobile && (
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                <span className="burger-icon">☰</span>
              </button>
            )}
            
            <Link to="/admin/dashboard" className="admin-logo">
              <img src="/images/logo.svg" alt="ByGagoos Admin" className="logo-image" />
              <div className="logo-text">
                <span className="logo-name">ByGagoos</span>
                <span className="logo-subtitle">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Partie droite */}
          <div className="header-right">
            {/* Lien vers accueil */}
            <Link to="/" className="home-link" title="Page d'accueil">
              🏠 {!isMobile && 'Accueil'}
            </Link>

            {/* Menu utilisateur */}
            {user && (
              <div className="user-menu-container">
                <button 
                  className="user-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="user-avatar">
                    <div className="avatar-initials">
                      {getUserInitials()}
                    </div>
                  </div>
                  {!isMobile && (
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-role">Administrateur</span>
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-avatar">
                        <div className="avatar-initials-large">
                          {getUserInitials()}
                        </div>
                      </div>
                      <div className="dropdown-user-info">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="dropdown-menu">
                      <Link 
                        to="/admin/profile" 
                        className="dropdown-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <span className="item-icon">👤</span>
                        Mon profil
                      </Link>
                      <Link 
                        to="/family" 
                        className="dropdown-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <span className="item-icon">🏠</span>
                        Page familiale
                      </Link>
                      <button 
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        <span className="item-icon">🚪</span>
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Header Client
  return (
    <header className="header client-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/client/dashboard">
            <img src="/images/logo.svg" alt="ByGagoos Client" className="logo-image" />
            <div className="logo-text">
              <span className="logo-name">ByGagoos</span>
              <span className="logo-subtitle">Espace Client</span>
            </div>
          </Link>
        </div>

        <nav className="nav">
          <Link to="/client/dashboard">Tableau de bord</Link>
          <Link to="/family">Page familiale</Link>
          <button onClick={handleLogout} className="logout-btn">
            Déconnexion
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;