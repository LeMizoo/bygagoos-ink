import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading/Loading';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Veuillez entrer votre nom d\'utilisateur et mot de passe');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Brand */}
        <div className="login-brand">
          <div className="brand-logo">
            <span className="logo-icon">👕</span>
            <h1>ByGagoos Ink</h1>
          </div>
          <div className="brand-tagline">
            Sérigraphie Textile Familiale • Antananarivo
          </div>
          <div className="brand-description">
            <p>Depuis notre atelier familial à Madagascar, nous transformons vos idées en créations textiles uniques avec passion et savoir-faire artisanal.</p>
          </div>
          <div className="brand-features">
            <div className="feature">
              <span className="feature-icon">🏭</span>
              <div>
                <span className="feature-title">Production Artisanale</span>
                <span className="feature-desc">Sérigraphie de qualité supérieure</span>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">👨‍👩‍👧‍👦</span>
              <div>
                <span className="feature-title">Esprit Familial</span>
                <span className="feature-desc">Gestion humaine et personnalisée</span>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">🌱</span>
              <div>
                <span className="feature-title">Made in Madagascar</span>
                <span className="feature-desc">Savoir-faire local et développement durable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="form-header">
              <h2>Bienvenue à l'atelier</h2>
              <p>Connectez-vous à la plateforme de gestion</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="username">
                  <span className="label-icon">👤</span>
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez votre nom d'utilisateur"
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <span className="label-icon">🔒</span>
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  Se souvenir de moi
                </label>
                <button type="button" className="forgot-link">
                  Mot de passe oublié ?
                </button>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loading type="dots" size="small" />
                ) : (
                  <>
                    <span className="btn-icon">→</span>
                    Se Connecter
                  </>
                )}
              </button>

              <div className="form-footer">
                <p className="welcome-message">
                  Bienvenue dans l'atelier digital ByGagoos Ink
                </p>
              </div>
            </form>

            <div className="demo-credentials">
              <p className="demo-title">Accès démo :</p>
              <p>Utilisateur: <code>famille</code> | Mot de passe: <code>gagoos2024</code></p>
              <p className="demo-note">
                <small>Plateforme réservée à la famille et aux collaborateurs</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements - Thème textile */}
      <div className="bg-elements">
        <div className="bg-pattern pattern-1"></div>
        <div className="bg-pattern pattern-2"></div>
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
      </div>
    </div>
  );
};

export default Login;