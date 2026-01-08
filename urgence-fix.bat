@echo off
echo ========================================
echo RÉPARATION D'URGENCE BYGAGOOS INK
echo ========================================
echo.

echo [1/5] Nettoyage et structure de base...
cd src

REM Supprimer App.jsx problématique
del App.jsx 2>nul

REM Créer App.jsx minimal
echo import React from 'react'; > App.jsx
echo import './App.css'; >> App.jsx
echo. >> App.jsx
echo function App() { >> App.jsx
echo   return ( >> App.jsx
echo     ^<div style={{ padding: '20px', textAlign: 'center' }}^> >> App.jsx
echo       ^<h1^>ByGagoos Ink - Migration en cours^</h1^> >> App.jsx
echo       ^<p^>L'application est en cours de reconstruction...^</p^> >> App.jsx
echo       ^<div style={{ marginTop: '30px' }}^> >> App.jsx
echo         ^<a href="/" style={{ marginRight: '15px' }}^>Accueil^</a^> >> App.jsx
echo         ^<a href="/gallery" style={{ marginRight: '15px' }}^>Galerie^</a^> >> App.jsx
echo         ^<a href="/login"^>Connexion^</a^> >> App.jsx
echo       ^</div^> >> App.jsx
echo     ^</div^> >> App.jsx
echo   ); >> App.jsx
echo } >> App.jsx
echo. >> App.jsx
echo export default App; >> App.jsx

echo [2/5] Création des dossiers essentiels...
mkdir components\layout 2>nul
mkdir components\auth 2>nul
mkdir components\Loading 2>nul
mkdir context 2>nul
mkdir pages\public 2>nul
mkdir pages\admin\dashboard 2>nul
mkdir pages\admin\orders 2>nul
mkdir pages\admin\clients 2>nul
mkdir pages\admin\production 2>nul

echo [3/5] Création du AuthContext.jsx...
echo import React, { createContext, useState, useContext, useEffect } from 'react'; > context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo const AuthContext = createContext(null); >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo const PRE_CONFIGURED_ACCOUNTS = [ >> context\AuthContext.jsx
echo   { username: 'Tovo', password: 'gagoos2024', role: 'super-admin', name: 'Tovo Randria' }, >> context\AuthContext.jsx
echo   { username: 'Vola', password: 'gagoos2024', role: 'admin', name: 'Vola Rakoto' }, >> context\AuthContext.jsx
echo   { username: 'Miantsa', password: 'gagoos2024', role: 'admin', name: 'Miantsa Rabe' }, >> context\AuthContext.jsx
echo   { username: 'Faniry', password: 'gagoos2024', role: 'admin', name: 'Faniry Rasoa' }, >> context\AuthContext.jsx
echo ]; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo export const AuthProvider = ({ children }) => { >> context\AuthContext.jsx
echo   const [user, setUser] = useState(null); >> context\AuthContext.jsx
echo   const [loading, setLoading] = useState(true); >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   useEffect(() => { >> context\AuthContext.jsx
echo     const storedUser = localStorage.getItem('bygagoos_user'); >> context\AuthContext.jsx
echo     if (storedUser) { >> context\AuthContext.jsx
echo       setUser(JSON.parse(storedUser)); >> context\AuthContext.jsx
echo     } >> context\AuthContext.jsx
echo     setLoading(false); >> context\AuthContext.jsx
echo   }, []); >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   const login = (username, password) => { >> context\AuthContext.jsx
echo     const account = PRE_CONFIGURED_ACCOUNTS.find( >> context\AuthContext.jsx
echo       acc => acc.username === username && acc.password === password >> context\AuthContext.jsx
echo     ); >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo     if (account) { >> context\AuthContext.jsx
echo       const userData = { >> context\AuthContext.jsx
echo         username: account.username, >> context\AuthContext.jsx
echo         name: account.name, >> context\AuthContext.jsx
echo         role: account.role, >> context\AuthContext.jsx
echo         token: btoa(^`${username}:${password}^`) >> context\AuthContext.jsx
echo       }; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo       setUser(userData); >> context\AuthContext.jsx
echo       localStorage.setItem('bygagoos_user', JSON.stringify(userData)); >> context\AuthContext.jsx
echo       return { success: true, user: userData }; >> context\AuthContext.jsx
echo     } >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo     return { success: false, error: 'Identifiants incorrects' }; >> context\AuthContext.jsx
echo   }; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   const logout = () => { >> context\AuthContext.jsx
echo     setUser(null); >> context\AuthContext.jsx
echo     localStorage.removeItem('bygagoos_user'); >> context\AuthContext.jsx
echo   }; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   const value = { >> context\AuthContext.jsx
echo     user, >> context\AuthContext.jsx
echo     loading, >> context\AuthContext.jsx
echo     login, >> context\AuthContext.jsx
echo     logout, >> context\AuthContext.jsx
echo     isAuthenticated: !!user, >> context\AuthContext.jsx
echo     isAdmin: user && (user.role === 'admin' || user.role === 'super-admin') >> context\AuthContext.jsx
echo   }; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   return ( >> context\AuthContext.jsx
echo     ^<AuthContext.Provider value={value}^> >> context\AuthContext.jsx
echo       {children} >> context\AuthContext.jsx
echo     ^</AuthContext.Provider^> >> context\AuthContext.jsx
echo   ); >> context\AuthContext.jsx
echo }; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo export const useAuth = () => { >> context\AuthContext.jsx
echo   const context = useContext(AuthContext); >> context\AuthContext.jsx
echo   if (!context) { >> context\AuthContext.jsx
echo     throw new Error('useAuth must be used within an AuthProvider'); >> context\AuthContext.jsx
echo   } >> context\AuthContext.jsx
echo   return context; >> context\AuthContext.jsx
echo }; >> context\AuthContext.jsx

echo [4/5] Copie des pages depuis backup-src...
REM Copier les pages publiques
if exist "..\backup-src\pages\publics\Gallery.jsx" copy "..\backup-src\pages\publics\Gallery.jsx" "pages\public\GalleryPage.jsx"
if exist "..\backup-src\pages\publics\FamilyPage.jsx" copy "..\backup-src\pages\publics\FamilyPage.jsx" "pages\public\FamilyPage.jsx"
if exist "..\backup-src\pages\publics\Login.jsx" copy "..\backup-src\pages\publics\Login.jsx" "pages\public\LoginPage.jsx"
if exist "..\backup-src\pages\publics\ComingSoonPage.jsx" copy "..\backup-src\pages\publics\ComingSoonPage.jsx" "pages\public\ComingSoonPage.jsx"

REM Copier les pages admin
if exist "..\backup-src\pages\privates\Dashboard.jsx" copy "..\backup-src\pages\privates\Dashboard.jsx" "pages\admin\dashboard\AdminDashboard.jsx"
if exist "..\backup-src\pages\privates\ClientsPage.jsx" copy "..\backup-src\pages\privates\ClientsPage.jsx" "pages\admin\clients\ClientsPage.jsx"
if exist "..\backup-src\pages\privates\OrdersPage.jsx" copy "..\backup-src\pages\privates\OrdersPage.jsx" "pages\admin\orders\OrdersPage.jsx"

echo [5/5] Création des pages manquantes essentielles...
REM Créer HomePage.jsx
echo import React from 'react'; > pages\public\HomePage.jsx
echo import { Link } from 'react-router-dom'; >> pages\public\HomePage.jsx
echo. >> pages\public\HomePage.jsx
echo const HomePage = () => { >> pages\public\HomePage.jsx
echo   return ( >> pages\public\HomePage.jsx
echo     ^<div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}^> >> pages\public\HomePage.jsx
echo       ^<h1 style={{ color: '#2c3e50', marginBottom: '20px' }}^>ByGagoos Ink^</h1^> >> pages\public\HomePage.jsx
echo       ^<p style={{ fontSize: '18px', marginBottom: '30px' }}^>Impression et sérigraphie de qualité^</p^> >> pages\public\HomePage.jsx
echo. >> pages\public\HomePage.jsx
echo       ^<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '40px' }}^> >> pages\public\HomePage.jsx
echo         ^<div style={{ flex: '1', minWidth: '250px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}^> >> pages\public\HomePage.jsx
echo           ^<h3^>🎨 Galerie^</h3^> >> pages\public\HomePage.jsx
echo           ^<p^>Voir nos réalisations^</p^> >> pages\public\HomePage.jsx
echo           ^<Link to="/gallery" style={{ display: 'inline-block', marginTop: '10px', color: '#3498db' }}^>Voir →^</Link^> >> pages\public\HomePage.jsx
echo         ^</div^> >> pages\public\HomePage.jsx
echo. >> pages\public\HomePage.jsx
echo         ^<div style={{ flex: '1', minWidth: '250px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}^> >> pages\public\HomePage.jsx
echo           ^<h3^>👥 Notre Équipe^</h3^> >> pages\public\HomePage.jsx
echo           ^<p^>Rencontrez la famille ByGagoos^</p^> >> pages\public\HomePage.jsx
echo           ^<Link to="/family" style={{ display: 'inline-block', marginTop: '10px', color: '#3498db' }}^>Découvrir →^</Link^> >> pages\public\HomePage.jsx
echo         ^</div^> >> pages\public\HomePage.jsx
echo. >> pages\public\HomePage.jsx
echo         ^<div style={{ flex: '1', minWidth: '250px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}^> >> pages\public\HomePage.jsx
echo           ^<h3^>🔑 Connexion Équipe^</h3^> >> pages\public\HomePage.jsx
echo           ^<p^>Accès à l'espace admin^</p^> >> pages\public\HomePage.jsx
echo           ^<Link to="/login" style={{ display: 'inline-block', marginTop: '10px', color: '#3498db' }}^>Se connecter →^</Link^> >> pages\public\HomePage.jsx
echo         ^</div^> >> pages\public\HomePage.jsx
echo       ^</div^> >> pages\public\HomePage.jsx
echo     ^</div^> >> pages\public\HomePage.jsx
echo   ); >> pages\public\HomePage.jsx
echo }; >> pages\public\HomePage.jsx
echo. >> pages\public\HomePage.jsx
echo export default HomePage; >> pages\public\HomePage.jsx

REM Créer RegisterPage.jsx
echo import React, { useState } from 'react'; > pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo const RegisterPage = () => { >> pages\public\RegisterPage.jsx
echo   const [formData, setFormData] = useState({ >> pages\public\RegisterPage.jsx
echo     name: '', >> pages\public\RegisterPage.jsx
echo     email: '', >> pages\public\RegisterPage.jsx
echo     phone: '' >> pages\public\RegisterPage.jsx
echo   }); >> pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo   const handleSubmit = (e) => { >> pages\public\RegisterPage.jsx
echo     e.preventDefault(); >> pages\public\RegisterPage.jsx
echo     alert('Inscription envoyée ! (Fonctionnalité en développement)'); >> pages\public\RegisterPage.jsx
echo   }; >> pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo   return ( >> pages\public\RegisterPage.jsx
echo     ^<div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}^> >> pages\public\RegisterPage.jsx
echo       ^<h1^>Inscription Client^</h1^> >> pages\public\RegisterPage.jsx
echo       ^<form onSubmit={handleSubmit} style={{ marginTop: '30px' }}^> >> pages\public\RegisterPage.jsx
echo         ^<div style={{ marginBottom: '15px' }}^> >> pages\public\RegisterPage.jsx
echo           ^<label style={{ display: 'block', marginBottom: '5px' }}^>Nom Complet^</label^> >> pages\public\RegisterPage.jsx
echo           ^<input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} /^> >> pages\public\RegisterPage.jsx
echo         ^</div^> >> pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo         ^<div style={{ marginBottom: '15px' }}^> >> pages\public\RegisterPage.jsx
echo           ^<label style={{ display: 'block', marginBottom: '5px' }}^>Email^</label^> >> pages\public\RegisterPage.jsx
echo           ^<input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} /^> >> pages\public\RegisterPage.jsx
echo         ^</div^> >> pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo         ^<div style={{ marginBottom: '20px' }}^> >> pages\public\RegisterPage.jsx
echo           ^<label style={{ display: 'block', marginBottom: '5px' }}^>Téléphone^</label^> >> pages\public\RegisterPage.jsx
echo           ^<input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} /^> >> pages\public\RegisterPage.jsx
echo         ^</div^> >> pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo         ^<button type="submit" style={{ background: '#3498db', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}^> >> pages\public\RegisterPage.jsx
echo           S'inscrire >> pages\public\RegisterPage.jsx
echo         ^</button^> >> pages\public\RegisterPage.jsx
echo       ^</form^> >> pages\public\RegisterPage.jsx
echo     ^</div^> >> pages\public\RegisterPage.jsx
echo   ); >> pages\public\RegisterPage.jsx
echo }; >> pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo export default RegisterPage; >> pages\public\RegisterPage.jsx

echo.
echo ========================================
echo RÉPARATION TERMINÉE !
echo ========================================
echo.
echo 1. Démarrer l'application: npm run dev
echo 2. Si ça marche, on ajoute les composants un par un
echo.
pause