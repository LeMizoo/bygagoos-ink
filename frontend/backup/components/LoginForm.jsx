import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginForm.css';

const LoginForm = ({ onSuccess, backendUrl }) => {
  const { login, error, loading, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Clear errors when component mounts
  useEffect(() => {
    clearError?.();
    setFormError('');
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError?.();
    setFormError('');

    // Validation
    if (!username.trim() || !password.trim()) {
      setFormError('Veuillez remplir tous les champs');
      return;
    }

    if (username.length < 3) {
      setFormError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
      return;
    }

    if (password.length < 6) {
      setFormError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      console.log('🔐 Tentative de connexion pour:', username);
      console.log('🌐 URL backend:', backendUrl);
      
      const result = await login(username, password, backendUrl);
      
      if (result?.success) {
        console.log('✅ Connexion réussie pour:', username);
        onSuccess?.();
      } else {
        const errorMsg = result?.message || 'Échec de la connexion. Veuillez réessayer.';
        setFormError(errorMsg);
        console.error('❌ Échec connexion:', errorMsg);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      setFormError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleDemoLogin = (demoUsername, demoPassword, role) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
    console.log(`👤 Connexion démo: ${demoUsername} (${role})`);
    
    // Auto-submit after a short delay
    setTimeout(() => {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      document.querySelector('.login-form')?.dispatchEvent(submitEvent);
    }, 100);
  };

  const handleInputFocus = (fieldName) => {
    console.log(`⌨️ Focus sur le champ: ${fieldName}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo Animation */}
        <div className="login-logo-animation">
          <div className="logo-circle">
            <div className="logo-inner">
              <span className="logo-emoji">🎨</span>
            </div>
          </div>
          <div className="logo-pulse"></div>
        </div>

        <div className="login-header">
          <h1>ByGagoos-Ink</h1>
          <p className="subtitle">Atelier Familial de Sérigraphie</p>
          <div className="welcome-message">
            <span className="welcome-icon">👋</span>
            <span>Bienvenue dans l'espace famille</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-header">
            <h2>Connexion</h2>
            <p>Accédez à votre tableau de bord</p>
          </div>

          {/* Error Messages */}
          {(formError || error) && (
            <div className="error-message">
              <div className="error-icon">⚠️</div>
              <div className="error-content">
                <strong>Erreur de connexion</strong>
                <p>{formError || error}</p>
              </div>
            </div>
          )}

          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">
              <span className="label-icon">👤</span>
              Nom d'utilisateur
            </label>
            <div className="input-with-icon">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => handleInputFocus('username')}
                placeholder="Entrez votre nom d'utilisateur"
                disabled={loading}
                className={username ? 'has-value' : ''}
                autoComplete="username"
                aria-describedby="username-help"
              />
              <span className="input-icon">👤</span>
            </div>
            <small id="username-help" className="input-hint">
              Utilisez votre prénom en minuscules
            </small>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span>
              Mot de passe
            </label>
            <div className="input-with-icon">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleInputFocus('password')}
                placeholder="Entrez votre mot de passe"
                disabled={loading}
                className={password ? 'has-value' : ''}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="login-button"
            disabled={loading || !username || !password}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div>
                <span className="button-text">Connexion en cours...</span>
              </>
            ) : (
              <>
                <span className="button-icon">🔑</span>
                <span className="button-text">Se connecter</span>
                <span className="button-arrow">→</span>
              </>
            )}
          </button>

          {/* Demo Accounts */}
          <div className="demo-section">
            <h3 className="demo-title">
              <span className="demo-icon">👥</span>
              Comptes de démonstration
            </h3>
            <p className="demo-subtitle">Cliquez pour vous connecter automatiquement</p>
            
            <div className="demo-grid">
              <button
                type="button"
                className={`demo-btn structure ${username === 'tovoniaina' ? 'active' : ''}`}
                onClick={() => handleDemoLogin('tovoniaina', 'bygagoos123', 'Structure')}
                disabled={loading}
              >
                <div className="demo-btn-content">
                  <div className="demo-emoji">👑</div>
                  <div className="demo-info">
                    <strong>Tovoniaina</strong>
                    <small>Structure & Vision</small>
                  </div>
                  <div className="demo-arrow">→</div>
                </div>
              </button>

              <button
                type="button"
                className={`demo-btn inspiration ${username === 'volatiana' ? 'active' : ''}`}
                onClick={() => handleDemoLogin('volatiana', 'bygagoos123', 'Inspiration')}
                disabled={loading}
              >
                <div className="demo-btn-content">
                  <div className="demo-emoji">✨</div>
                  <div className="demo-info">
                    <strong>Volatiana</strong>
                    <small>Inspiration & Design</small>
                  </div>
                  <div className="demo-arrow">→</div>
                </div>
              </button>

              <button
                type="button"
                className={`demo-btn creation ${username === 'miantsatiana' ? 'active' : ''}`}
                onClick={() => handleDemoLogin('miantsatiana', 'bygagoos123', 'Création')}
                disabled={loading}
              >
                <div className="demo-btn-content">
                  <div className="demo-emoji">🎨</div>
                  <div className="demo-info">
                    <strong>Miantsatiana</strong>
                    <small>Création & Production</small>
                  </div>
                  <div className="demo-arrow">→</div>
                </div>
              </button>

              <button
                type="button"
                className={`demo-btn communication ${username === 'tiafaniry' ? 'active' : ''}`}
                onClick={() => handleDemoLogin('tiafaniry', 'bygagoos123', 'Communication')}
                disabled={loading}
              >
                <div className="demo-btn-content">
                  <div className="demo-emoji">💬</div>
                  <div className="demo-info">
                    <strong>Tia Faniry</strong>
                    <small>Communication & Client</small>
                  </div>
                  <div className="demo-arrow">→</div>
                </div>
              </button>
            </div>

            <p className="demo-hint">
              <span className="hint-icon">ℹ️</span>
              Tous les mots de passe: <code>bygagoos123</code>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <button 
            type="button" 
            className="back-to-home"
            onClick={() => window.history.back()}
          >
            <span className="back-icon">←</span>
            Retour à l'accueil
          </button>
          
          <div className="footer-info">
            <p className="version">Version 1.1.0</p>
            <p className="copyright">© 2025 ByGagoos-Ink Family. Tous droits réservés.</p>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="login-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>
    </div>
  );
};

export default LoginForm;