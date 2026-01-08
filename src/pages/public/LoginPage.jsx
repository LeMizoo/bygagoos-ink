// frontend/src/pages/public/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { authService } from '../../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoMode, setDemoMode] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDemoMode(false);

    try {
      // Appel à l'API via le service auth
      const result = await authService.login(email, password);

      console.log('Login result:', result); // Debug

      if (result && result.success) {
        // Mode démo activé ?
        if (result.message && result.message.includes('mode démo')) {
          setDemoMode(true);
        }
        
        // Utiliser le contexte Auth pour gérer la connexion
        login(result.token, result.user);
        
        // Redirection basée sur le rôle
        const role = result.user.role;
        console.log('User role:', role); // Debug
        
        // Temporairement : rediriger toujours vers admin/dashboard
        navigate('/admin/dashboard');
        
        // switch (role) {
        //   case 'admin':
        //   case 'super-admin':
        //   case 'manager':
        //   case 'ADMIN':
        //   case 'SUPER_ADMIN':
        //   case 'MANAGER':
        //     navigate('/admin/dashboard');
        //     break;
        //   case 'employee':
        //   case 'EMPLOYEE':
        //     navigate('/admin/production');
        //     break;
        //   case 'client':
        //   case 'CLIENT':
        //     navigate('/client/dashboard');
        //     break;
        //   default:
        //     navigate('/admin/dashboard');
        // }
      } else {
        setError(result?.message || 'Identifiants incorrects');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  // Comptes de démo pour le développement
  const demoAccounts = [
    { email: 'admin@bygagoos.com', password: 'admin123', role: 'admin', name: 'Admin Demo' },
    { email: 'manager@bygagoos.com', password: 'manager123', role: 'manager', name: 'Manager Demo' },
    { email: 'employee@bygagoos.com', password: 'employee123', role: 'employee', name: 'Employee Demo' },
    { email: 'client@test.com', password: 'client123', role: 'client', name: 'Client Demo' },
    { email: 'tovoniaina.rahendrison@gmail.com', password: 'tovo123', role: 'super-admin', name: 'Tovoniaina' },
    { email: 'dedettenadia@gmail.com', password: 'vola123', role: 'admin', name: 'Volatiana' },
    { email: 'miantsatianarahendrison@gmail.com', password: 'miantsa123', role: 'admin', name: 'Miantsatiana' },
    { email: 'fanirytia17@gmail.com', password: 'faniry123', role: 'admin', name: 'Faniry' }
  ];

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo.png" alt="ByGagoos Ink" className="login-logo" />
          <h1>Connexion</h1>
          <p>Accédez à votre espace ByGagoos Ink</p>
        </div>

        {demoMode && (
          <div className="demo-mode-alert">
            <span>🎯</span> Mode démo activé - Backend non disponible
          </div>
        )}

        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Vous n'avez pas de compte ?</p>
          <button 
            onClick={() => navigate('/register')}
            className="register-link"
            type="button"
          >
            Créer un compte client
          </button>
          
          <div className="demo-accounts">
            <p className="demo-title">Comptes de test :</p>
            <div className="demo-grid">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  type="button"
                  className="demo-account-btn"
                  onClick={() => handleDemoLogin(account.email, account.password)}
                >
                  <div className="demo-account-info">
                    <strong>{account.name}</strong>
                    <small>{account.email}</small>
                    <small>Mot de passe: {account.password}</small>
                  </div>
                </button>
              ))}
            </div>
            <p className="demo-hint">
              Le backend semble hors ligne. Utilisez ces comptes pour le mode démo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;