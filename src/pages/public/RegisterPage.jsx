// frontend/src/pages/public/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    password: '',
    confirmPassword: '',
    businessType: 'restaurant'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const businessTypes = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'hotel', label: 'Hôtel' },
    { value: 'cafe', label: 'Café/Brasserie' },
    { value: 'event', label: 'Événementiel' },
    { value: 'corporate', label: 'Entreprise' },
    { value: 'other', label: 'Autre' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^\+?[0-9\s-]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro invalide (ex: +261 34 12 345 67)';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Simulation d'inscription pour le moment (remplacez par l'appel API plus tard)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Créer l'utilisateur localement pour la démo
      const newUser = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        address: formData.address || '',
        businessType: formData.businessType,
        role: 'CLIENT',
        createdAt: new Date().toISOString()
      };
      
      // Sauvegarder dans localStorage
      const existingUsers = JSON.parse(localStorage.getItem('bygagoos_clients') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('bygagoos_clients', JSON.stringify(existingUsers));
      
      // Connecter automatiquement l'utilisateur
      localStorage.setItem('bygagoos_user', JSON.stringify(newUser));
      localStorage.setItem('bygagoos_token', `demo_token_${Date.now()}`);
      
      setSuccessMessage('Inscription réussie ! Redirection vers l\'accueil...');
      
      // Redirection après 2 secondes
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setErrors({ submit: 'Une erreur est survenue lors de l\'inscription' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Format du téléphone
    let formatted = value.replace(/\D/g, '');
    
    if (formatted.length > 0) {
      if (!formatted.startsWith('261')) {
        formatted = '261' + formatted;
      }
      
      // Formater pour l'affichage
      const match = formatted.match(/^(\d{3})(\d{2})(\d{2})(\d{3})(\d{2})$/);
      if (match) {
        formatted = `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }));
    
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="BYGAGOO'S INK" className="register-logo" />
        </Link>
        <h1>Créer un compte client</h1>
        <p className="register-subtitle">
          Rejoignez notre communauté de professionnels
        </p>
      </div>

      <div className="register-card">
        {successMessage && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle"></i>
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                Prénom <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Votre prénom"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Nom <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Votre nom"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email professionnel <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="contact@votre-entreprise.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Téléphone (Madagascar) <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={errors.phone ? 'error' : ''}
              placeholder="+261 34 12 345 67"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="company">Entreprise (optionnel)</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nom de votre entreprise"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessType">Type d'activité</label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              {businessTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse (optionnel)</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse complète de votre établissement"
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">
                Mot de passe <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Minimum 6 caractères"
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirmer le mot de passe <span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Répétez le mot de passe"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="form-group terms">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                required 
                disabled={isSubmitting}
              />
              <span>
                J'accepte les{' '}
                <Link to="/terms" className="link">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/privacy" className="link">
                  politique de confidentialité
                </Link>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Inscription en cours...
              </>
            ) : (
              'Créer mon compte'
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Déjà inscrit ?{' '}
            <Link to="/login" className="link">
              Connectez-vous ici
            </Link>
          </p>
          <p className="login-info">
            <i className="fas fa-info-circle"></i>
            Réservé aux professionnels (restaurants, hôtels, entreprises)
          </p>
        </div>
      </div>

      <div className="register-benefits">
        <h3>Avantages de l'inscription</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="fas fa-tachometer-alt"></i>
            <h4>Suivi en temps réel</h4>
            <p>Suivez l'avancement de vos commandes</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-history"></i>
            <h4>Historique complet</h4>
            <p>Accédez à toutes vos commandes passées</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-percentage"></i>
            <h4>Tarifs préférentiels</h4>
            <p>Bénéficiez de prix avantageux</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-headset"></i>
            <h4>Support dédié</h4>
            <p>Assistance prioritaire</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;