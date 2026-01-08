import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section supérieure */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-section">
              <img 
                src="/logo.svg" 
                alt="ByGagoos Ink" 
                className="footer-logo"
              />
              <div className="footer-brand-text">
                <h3>ByGagoos Ink</h3>
                <p className="footer-subtitle">Sérigraphie textile d'excellence</p>
                <p className="footer-since">Depuis 2025</p>
              </div>
            </div>
            <div className="footer-tagline">
              "Une famille, une passion, un métier"
            </div>
          </div>

          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Experts famille</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Made in Madagascar</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support client</span>
            </div>
          </div>
        </div>

        {/* Section liens */}
        <div className="footer-middle">
          <div className="footer-links-grid">
            <div className="links-column">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/gallery">Galerie</Link></li>
                <li><Link to="/family">Notre famille</Link></li>
                <li><Link to="/login">Espace Pro</Link></li>
              </ul>
            </div>
            
            <div className="links-column">
              <h4>Services</h4>
              <ul>
                <li><Link to="/gallery">Sérigraphie textile</Link></li>
                <li><Link to="/gallery">Impression numérique</Link></li>
                <li><Link to="/gallery">Broderie</Link></li>
                <li><Link to="/gallery">Design personnalisé</Link></li>
              </ul>
            </div>
            
            <div className="links-column contact-column">
              <h4>Contact</h4>
              <ul className="contact-list">
                <li className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Lot IPA 165 Anosimasina<br />Antananarivo, Madagascar</span>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>+261 34 43 359 30</span>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>positifaid@live.fr</span>
                </li>
              </ul>
            </div>
            
            <div className="links-column">
              <h4>Suivez-nous</h4>
              <div className="social-section">
                <div className="social-icons">
                  <a href="#" className="social-icon" aria-label="Facebook" title="Facebook">📘</a>
                  <a href="#" className="social-icon" aria-label="Instagram" title="Instagram">📸</a>
                  <a href="#" className="social-icon" aria-label="WhatsApp" title="WhatsApp">💬</a>
                </div>
                <p className="business-hours">
                  <span className="hours-icon">🕒</span>
                  Lun-Ven: 8h-18h<br />
                  Sam: 9h-13h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section inférieure */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} ByGagoos Ink. Tous droits réservés.
            <span className="copyright-separator">•</span>
            Fierté malgache
            <span className="copyright-separator">•</span>
            Fabriqué avec ❤️ à Madagascar
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;