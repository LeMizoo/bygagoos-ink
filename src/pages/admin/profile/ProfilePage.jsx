// frontend/src/pages/admin/profile/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, updateUser, logout, loading: authLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    // Initialiser le formulaire avec les données utilisateur
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    // Valider le formulaire
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est requis';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        
        if (formData.phone && !/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Numéro de téléphone invalide';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Effacer l'erreur pour ce champ si modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setMessage({
                type: 'error',
                text: 'Veuillez corriger les erreurs dans le formulaire'
            });
            return;
        }
        
        setLoading(true);
        setMessage({ type: '', text: '' });
        
        try {
            // Utiliser updateUser si disponible, sinon simuler
            if (updateUser && typeof updateUser === 'function') {
                const result = await updateUser(formData);
                if (result.success) {
                    setMessage({
                        type: 'success',
                        text: '✅ Profil mis à jour avec succès!'
                    });
                } else {
                    setMessage({
                        type: 'error',
                        text: `❌ ${result.error || 'Erreur lors de la mise à jour'}`
                    });
                }
            } else {
                // Mode démo - simulation
                setTimeout(() => {
                    setMessage({
                        type: 'success',
                        text: '✅ Profil mis à jour avec succès! (mode démo)'
                    });
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            setMessage({
                type: 'error',
                text: '❌ Une erreur est survenue lors de la mise à jour'
            });
        } finally {
            setLoading(false);
        }
    };

    // Afficher le chargement si l'authentification est en cours
    if (authLoading) {
        return (
            <div className="profile-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Chargement de votre profil...</p>
                </div>
            </div>
        );
    }

    // Vérifier si l'utilisateur est connecté
    if (!user) {
        return (
            <div className="profile-container">
                <div className="not-logged-in">
                    <div className="not-logged-in-content">
                        <h2>🔐 Accès non autorisé</h2>
                        <p>Vous devez être connecté pour accéder à votre profil.</p>
                        <div className="action-buttons">
                            <a href="/login" className="btn-login">
                                <span>Se connecter</span>
                            </a>
                            <a href="/register" className="btn-register">
                                <span>S'inscrire</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="header-left">
                    <h1>Mon Profil</h1>
                    <p className="profile-subtitle">
                        Gérez vos informations personnelles et préférences
                    </p>
                </div>
                <div className="header-right">
                    <button onClick={logout} className="btn-logout">
                        <span className="logout-icon">🚪</span>
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>

            {/* Messages de feedback */}
            {message.text && (
                <div className={`message ${message.type}`}>
                    <div className="message-content">
                        <span className="message-icon">
                            {message.type === 'success' ? '✅' : '❌'}
                        </span>
                        <span>{message.text}</span>
                    </div>
                </div>
            )}

            <div className="profile-content">
                {/* Section informations personnelles */}
                <div className="profile-info-card">
                    <div className="card-header">
                        <h3>Informations personnelles</h3>
                        <span className="edit-badge">
                            {user.role === 'admin' ? '👑 Administrateur' : '👤 Client'}
                        </span>
                    </div>
                    
                    <div className="user-avatar-section">
                        <div className="avatar-container">
                            <div className="avatar-large">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="avatar-info">
                                <h2>{user.name || 'Utilisateur'}</h2>
                                <p className="user-email">{user.email}</p>
                                <p className="member-since">
                                    Membre depuis {user.memberSince || '2023'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques */}
                    <div className="stats-section">
                        <h4>Statistiques</h4>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-icon">📊</div>
                                <div className="stat-details">
                                    <div className="stat-value">0</div>
                                    <div className="stat-label">Commandes</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">⭐</div>
                                <div className="stat-details">
                                    <div className="stat-value">Nouveau</div>
                                    <div className="stat-label">Statut</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">📅</div>
                                <div className="stat-details">
                                    <div className="stat-value">{user.memberSince ? '2023' : '-'}</div>
                                    <div className="stat-label">Inscription</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulaire de modification */}
                <div className="profile-form-card">
                    <div className="card-header">
                        <h3>Modifier mes informations</h3>
                        <p className="form-subtitle">
                            Mettez à jour vos coordonnées et préférences
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-grid">
                            {/* Nom */}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Nom complet *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    placeholder="Votre nom et prénom"
                                    required
                                />
                                {errors.name && (
                                    <span className="error-message">{errors.name}</span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Adresse email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="votre@email.com"
                                    required
                                />
                                {errors.email && (
                                    <span className="error-message">{errors.email}</span>
                                )}
                            </div>

                            {/* Téléphone */}
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-input ${errors.phone ? 'error' : ''}`}
                                    placeholder="+261 34 00 000 00"
                                />
                                {errors.phone && (
                                    <span className="error-message">{errors.phone}</span>
                                )}
                                <small className="form-hint">
                                    Format: +261 XX XX XXX XX
                                </small>
                            </div>

                            {/* Adresse */}
                            <div className="form-group full-width">
                                <label htmlFor="address" className="form-label">
                                    Adresse
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Votre adresse complète"
                                    rows="4"
                                />
                                <small className="form-hint">
                                    Rue, Ville, Code postal
                                </small>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn-save"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        <span>Enregistrement...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="save-icon">💾</span>
                                        <span>Enregistrer les modifications</span>
                                    </>
                                )}
                            </button>
                            
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => {
                                    // Réinitialiser le formulaire
                                    if (user) {
                                        setFormData({
                                            name: user.name || '',
                                            email: user.email || '',
                                            phone: user.phone || '',
                                            address: user.address || ''
                                        });
                                    }
                                    setErrors({});
                                    setMessage({ type: '', text: '' });
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Section informations supplémentaires */}
            <div className="profile-additional-info">
                <div className="info-card">
                    <h4>🛡️ Sécurité du compte</h4>
                    <p>Modifiez votre mot de passe et paramètres de sécurité.</p>
                    <button className="btn-secondary">Gérer la sécurité</button>
                </div>
                
                <div className="info-card">
                    <h4>🔔 Notifications</h4>
                    <p>Configurez vos préférences de notification.</p>
                    <button className="btn-secondary">Paramètres notifications</button>
                </div>
                
                <div className="info-card">
                    <h4>📄 Données personnelles</h4>
                    <p>Téléchargez ou supprimez vos données.</p>
                    <button className="btn-secondary">Gérer mes données</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;