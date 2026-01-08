import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Utilisateurs ByGagoos Ink
  const bygagoosUsers = [
    { username: 'Tovo', password: 'gagoos2024', role: 'super-admin', name: 'Tovoniaina RAHENDRISON' },
    { username: 'Vola', password: 'gagoos2024', role: 'admin', name: 'Volatiana RANDRIANARISOA' },
    { username: 'Miantsa', password: 'gagoos2024', role: 'admin', name: 'Miantsatiana RAHENDRISON' },
    { username: 'Faniry', password: 'gagoos2024', role: 'admin', name: 'Tia Faniry RAHENDRISON' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de connexion
    setTimeout(() => {
      const user = bygagoosUsers.find(u => 
        u.username.toLowerCase() === formData.username.toLowerCase() && 
        u.password === formData.password
      );
      
      if (user) {
        // Stocker les informations de l'utilisateur
        localStorage.setItem('bygagoos_user', JSON.stringify(user));
        localStorage.setItem('bygagoos_token', 'authenticated_' + Date.now());
        localStorage.setItem('bygagoos_role', user.role);
        
        // Redirection selon le rôle
        navigate('/admin/dashboard');
      } else {
        setError('Identifiants incorrects. Veuillez vérifier votre nom d\'utilisateur et mot de passe.');
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (username, password) => {
    setFormData({ username, password });
    const user = bygagoosUsers.find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      localStorage.setItem('bygagoos_user', JSON.stringify(user));
      localStorage.setItem('bygagoos_token', 'authenticated_' + Date.now());
      localStorage.setItem('bygagoos_role', user.role);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <img src="/logo.svg" alt="ByGagoos Ink" />
            <h1>Connexion Espace Pro</h1>
          </div>
          <p className="login-subtitle">
            Accédez au tableau de bord administratif de ByGagoos Ink
          </p>
        </div>
        
        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Entrez votre nom d'utilisateur"
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Connexion en cours...
                </>
              ) : 'Se connecter'}
            </button>
          </form>
          
          <div className="demo-section">
            <h3>Accès rapide pour l'équipe :</h3>
            <div className="demo-buttons">
              <button 
                className="demo-btn super-admin"
                onClick={() => handleDemoLogin('Tovo', 'gagoos2024')}
              >
                <span className="demo-role">Super-Admin</span>
                <span className="demo-name">Tovoniaina</span>
              </button>
              
              <button 
                className="demo-btn admin"
                onClick={() => handleDemoLogin('Vola', 'gagoos2024')}
              >
                <span className="demo-role">Admin</span>
                <span className="demo-name">Volatiana</span>
              </button>
              
              <button 
                className="demo-btn admin"
                onClick={() => handleDemoLogin('Miantsa', 'gagoos2024')}
              >
                <span className="demo-role">Admin</span>
                <span className="demo-name">Miantsatiana</span>
              </button>
              
              <button 
                className="demo-btn admin"
                onClick={() => handleDemoLogin('Faniry', 'gagoos2024')}
              >
                <span className="demo-role">Admin</span>
                <span className="demo-name">Faniry</span>
              </button>
            </div>
            
            <div className="login-info">
              <p>
                <strong>Note :</strong> Cet espace est réservé à l'équipe administrative 
                de ByGagoos Ink. Pour les clients, veuillez utiliser le formulaire 
                d'inscription publique.
              </p>
            </div>
          </div>
          
          <div className="login-footer">
            <p>
              Vous êtes client ? <Link to="/register">Créez un compte client</Link>
            </p>
            <p>
              Retour au <Link to="/">site public</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
