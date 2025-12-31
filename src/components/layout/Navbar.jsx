import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onMenuClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, checkTokenExists } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // Vérifier si on est dans l'espace privé
  const isPrivateArea = location.pathname.startsWith('/app');
  
  // Vérifier l'authentification
  const isLoggedIn = isAuthenticated || checkTokenExists();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuClick) onMenuClick();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fermer le menu mobile quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuBtnRef.current && 
        !mobileMenuBtnRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  // Fermer le menu lors du changement de page
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo et marque */}
        <div className="navbar-brand">
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <div className="logo-container">
              <span className="logo-icon">👕</span>
              <div className="logo-text-container">
                <h1 className="logo-text">ByGagoos Ink</h1>
                <span className="company-tagline">Sérigraphie Textile Familiale</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Desktop */}
        <div className="navbar-menu-desktop">
          <div className="nav-links">
            {/* Liens publics */}
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-icon">🏠</span>
              Accueil
            </Link>
            
            <Link 
              to="/gallery" 
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-icon">📸</span>
              Galerie
            </Link>
            
            <Link 
              to="/family" 
              className={`nav-link ${location.pathname === '/family' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-icon">👨‍👩‍👧‍👦</span>
              Famille
            </Link>

            {/* Séparateur si connecté */}
            {isLoggedIn && (
              <>
                <div className="nav-separator"></div>
                
                {/* Liens privés */}
                <Link 
                  to="/app/dashboard" 
                  className={`nav-link ${location.pathname === '/app/dashboard' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">📊</span>
                  Dashboard
                </Link>
                
                <Link 
                  to="/app/orders" 
                  className={`nav-link ${location.pathname.startsWith('/app/orders') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">🖨️</span>
                  Commandes
                </Link>
                
                <Link 
                  to="/app/clients" 
                  className={`nav-link ${location.pathname === '/app/clients' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">👥</span>
                  Clients
                </Link>
                
                <Link 
                  to="/app/production" 
                  className={`nav-link ${location.pathname === '/app/production' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">🏭</span>
                  Production
                </Link>
              </>
            )}
          </div>

          {/* Actions utilisateur */}
          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                  </div>
                  <div className="user-details">
                    <span className="user-name">{user?.name || 'Utilisateur'}</span>
                    <span className="user-role">{user?.role || 'Membre'}</span>
                  </div>
                </div>
                
                <button 
                  className="logout-btn" 
                  onClick={handleLogout}
                  title="Déconnexion"
                >
                  <span className="logout-icon">🚪</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="login-btn"
                onClick={closeMobileMenu}
              >
                <span className="login-icon">🔐</span>
                Connexion
              </Link>
            )}
          </div>
        </div>

        {/* Bouton menu mobile */}
        <button 
          ref={mobileMenuBtnRef}
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Menu de navigation"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          style={{ zIndex: 1001 }}
        >
          <div className="mobile-menu-header">
            <h3>Navigation</h3>
            <button 
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Fermer le menu"
            >
              ✕
            </button>
          </div>

          <div className="mobile-menu-content">
            {/* Section publique */}
            <div className="mobile-menu-section">
              <h4 className="section-title">Pages Publiques</h4>
              <Link 
                to="/" 
                className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🏠</span>
                Accueil
              </Link>
              
              <Link 
                to="/gallery" 
                className={`mobile-nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📸</span>
                Galerie
              </Link>
              
              <Link 
                to="/family" 
                className={`mobile-nav-link ${location.pathname === '/family' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">👨‍👩‍👧‍👦</span>
                Famille
              </Link>
            </div>

            {/* Section privée si connecté */}
            {isLoggedIn && (
              <div className="mobile-menu-section">
                <h4 className="section-title">Espace Privé</h4>
                <Link 
                  to="/app/dashboard" 
                  className={`mobile-nav-link ${location.pathname === '/app/dashboard' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">📊</span>
                  Dashboard
                </Link>
                
                <Link 
                  to="/app/orders" 
                  className={`mobile-nav-link ${location.pathname.startsWith('/app/orders') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">🖨️</span>
                  Commandes
                </Link>
                
                <Link 
                  to="/app/clients" 
                  className={`mobile-nav-link ${location.pathname === '/app/clients' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">👥</span>
                  Clients
                </Link>
                
                <Link 
                  to="/app/production" 
                  className={`mobile-nav-link ${location.pathname === '/app/production' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">🏭</span>
                  Production
                </Link>
              </div>
            )}

            {/* Actions */}
            <div className="mobile-menu-actions">
              {isLoggedIn ? (
                <>
                  <div className="mobile-user-info">
                    <div className="user-avatar">
                      {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                    </div>
                    <div>
                      <div className="user-name">{user?.name || 'Utilisateur'}</div>
                      <div className="user-role">{user?.role || 'Membre'}</div>
                    </div>
                  </div>
                  
                  <button 
                    className="mobile-logout-btn"
                    onClick={handleLogout}
                  >
                    <span className="logout-icon">🚪</span>
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="mobile-login-btn"
                  onClick={closeMobileMenu}
                >
                  <span className="login-icon">🔐</span>
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;