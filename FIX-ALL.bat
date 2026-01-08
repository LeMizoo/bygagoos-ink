@echo off
echo ========================================
echo CRÉATION COMPLÈTE BYGAGOOS INK
echo ========================================
echo.

echo [1/25] Nettoyage et structure...
cd src
del App.jsx 2>nul
del main.jsx 2>nul
del index.css 2>nul
del App.css 2>nul

echo [2/25] Création des dossiers...
mkdir components\layout 2>nul
mkdir components\auth 2>nul
mkdir context 2>nul
mkdir pages\public 2>nul
mkdir pages\admin\dashboard 2>nul
mkdir pages\admin\orders 2>nul
mkdir pages\admin\clients 2>nul
mkdir pages\admin\production 2>nul
mkdir pages\admin\profile 2>nul
mkdir pages\admin\stock 2>nul
mkdir pages\admin\accounting 2>nul
mkdir pages\admin\settings 2>nul

echo [3/25] Création de main.jsx...
echo import React from 'react' > main.jsx
echo import ReactDOM from 'react-dom/client' >> main.jsx
echo import App from './App.jsx' >> main.jsx
echo import './index.css' >> main.jsx
echo. >> main.jsx
echo ReactDOM.createRoot(document.getElementById('root')).render( >> main.jsx
echo   ^<React.StrictMode^> >> main.jsx
echo     ^<App /^> >> main.jsx
echo   ^</React.StrictMode^>, >> main.jsx
echo ) >> main.jsx

echo [4/25] Création de index.css...
echo body { > index.css
echo   margin: 0; >> index.css
echo   font-family: Arial, sans-serif; >> index.css
echo } >> index.css

echo [5/25] Création de App.css...
echo * { > App.css
echo   margin: 0; >> App.css
echo   padding: 0; >> App.css
echo   box-sizing: border-box; >> App.css
echo } >> App.css
echo. >> App.css
echo .app-container { >> App.css
echo   min-height: 100vh; >> App.css
echo } >> App.css

echo [6/25] Création de App.jsx SIMPLIFIÉ...
echo import React from 'react'; > App.jsx
echo import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; >> App.jsx
echo import './App.css'; >> App.jsx
echo. >> App.jsx
echo function App() { >> App.jsx
echo   return ( >> App.jsx
echo     ^<Router^> >> App.jsx
echo       ^<Routes^> >> App.jsx
echo         ^<Route path="/" element={ >> App.jsx
echo           ^<div style={{ padding: '40px', textAlign: 'center' }}^> >> App.jsx
echo             ^<h1^>ByGagoos Ink - Site en construction^</h1^> >> App.jsx
echo             ^<p^>Migration en cours... Les pages seront disponibles bientôt^</p^> >> App.jsx
echo             ^<div style={{ marginTop: '30px' }}^> >> App.jsx
echo               ^<a href="/login" style={{ marginRight: '20px', color: 'blue' }}^>Connexion^</a^> >> App.jsx
echo               ^<a href="/admin" style={{ color: 'blue' }}^>Admin^</a^> >> App.jsx
echo             ^</div^> >> App.jsx
echo           ^</div^> >> App.jsx
echo         } /^> >> App.jsx
echo         ^<Route path="/login" element={ >> App.jsx
echo           ^<div style={{ padding: '40px', textAlign: 'center' }}^> >> App.jsx
echo             ^<h1^>Connexion^</h1^> >> App.jsx
echo             ^<p^>Page de connexion (en développement)^</p^> >> App.jsx
echo           ^</div^> >> App.jsx
echo         } /^> >> App.jsx
echo         ^<Route path="/admin" element={ >> App.jsx
echo           ^<div style={{ padding: '40px' }}^> >> App.jsx
echo             ^<h1^>Espace Administrateur^</h1^> >> App.jsx
echo             ^<p^>Bienvenue dans l'espace admin (en développement)^</p^> >> App.jsx
echo           ^</div^> >> App.jsx
echo         } /^> >> App.jsx
echo       ^</Routes^> >> App.jsx
echo     ^</Router^> >> App.jsx
echo   ); >> App.jsx
echo } >> App.jsx
echo. >> App.jsx
echo export default App; >> App.jsx

echo [7/25] Création de tous les fichiers manquants...

REM Créer AuthContext.jsx
echo import React, { createContext, useState, useContext } from 'react'; > context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo const AuthContext = createContext(null); >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo export const AuthProvider = ({ children }) => { >> context\AuthContext.jsx
echo   const [user, setUser] = useState(null); >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   const login = (username, password) => { >> context\AuthContext.jsx
echo     const accounts = [ >> context\AuthContext.jsx
echo       { username: 'Tovo', password: 'gagoos2024', role: 'super-admin', name: 'Tovo Randria' }, >> context\AuthContext.jsx
echo       { username: 'Vola', password: 'gagoos2024', role: 'admin', name: 'Vola Rakoto' }, >> context\AuthContext.jsx
echo       { username: 'Miantsa', password: 'gagoos2024', role: 'admin', name: 'Miantsa Rabe' }, >> context\AuthContext.jsx
echo       { username: 'Faniry', password: 'gagoos2024', role: 'admin', name: 'Faniry Rasoa' }, >> context\AuthContext.jsx
echo     ]; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo     const account = accounts.find(acc => acc.username === username && acc.password === password); >> context\AuthContext.jsx
echo     if (account) { >> context\AuthContext.jsx
echo       setUser({ username: account.username, name: account.name, role: account.role }); >> context\AuthContext.jsx
echo       return { success: true }; >> context\AuthContext.jsx
echo     } >> context\AuthContext.jsx
echo     return { success: false, error: 'Identifiants incorrects' }; >> context\AuthContext.jsx
echo   }; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   const logout = () => { >> context\AuthContext.jsx
echo     setUser(null); >> context\AuthContext.jsx
echo   }; >> context\AuthContext.jsx
echo. >> context\AuthContext.jsx
echo   const value = { >> context\AuthContext.jsx
echo     user, >> context\AuthContext.jsx
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

echo [8/25] Création des pages publiques...

REM HomePage.jsx
echo import React from 'react'; > pages\public\HomePage.jsx
echo. >> pages\public\HomePage.jsx
echo const HomePage = () => { >> pages\public\HomePage.jsx
echo   return ( >> pages\public\HomePage.jsx
echo     ^<div style={{ padding: '40px 20px', textAlign: 'center' }}^> >> pages\public\HomePage.jsx
echo       ^<h1^>Bienvenue chez ByGagoos Ink^</h1^> >> pages\public\HomePage.jsx
echo       ^<p^>Impression et sérigraphie de qualité^</p^> >> pages\public\HomePage.jsx
echo     ^</div^> >> pages\public\HomePage.jsx
echo   ); >> pages\public\HomePage.jsx
echo }; >> pages\public\HomePage.jsx
echo. >> pages\public\HomePage.jsx
echo export default HomePage; >> pages\public\HomePage.jsx

REM GalleryPage.jsx
echo import React from 'react'; > pages\public\GalleryPage.jsx
echo. >> pages\public\GalleryPage.jsx
echo const GalleryPage = () => { >> pages\public\GalleryPage.jsx
echo   return ( >> pages\public\GalleryPage.jsx
echo     ^<div style={{ padding: '40px 20px', textAlign: 'center' }}^> >> pages\public\GalleryPage.jsx
echo       ^<h1^>Galerie^</h1^> >> pages\public\GalleryPage.jsx
echo       ^<p^>Nos réalisations en impression^</p^> >> pages\public\GalleryPage.jsx
echo     ^</div^> >> pages\public\GalleryPage.jsx
echo   ); >> pages\public\GalleryPage.jsx
echo }; >> pages\public\GalleryPage.jsx
echo. >> pages\public\GalleryPage.jsx
echo export default GalleryPage; >> pages\public\GalleryPage.jsx

REM FamilyPage.jsx
echo import React from 'react'; > pages\public\FamilyPage.jsx
echo. >> pages\public\FamilyPage.jsx
echo const FamilyPage = () => { >> pages\public\FamilyPage.jsx
echo   return ( >> pages\public\FamilyPage.jsx
echo     ^<div style={{ padding: '40px 20px', textAlign: 'center' }}^> >> pages\public\FamilyPage.jsx
echo       ^<h1^>Notre Équipe^</h1^> >> pages\public\FamilyPage.jsx
echo       ^<p^>La famille ByGagoos^</p^> >> pages\public\FamilyPage.jsx
echo     ^</div^> >> pages\public\FamilyPage.jsx
echo   ); >> pages\public\FamilyPage.jsx
echo }; >> pages\public\FamilyPage.jsx
echo. >> pages\public\FamilyPage.jsx
echo export default FamilyPage; >> pages\public\FamilyPage.jsx

REM LoginPage.jsx
echo import React, { useState } from 'react'; > pages\public\LoginPage.jsx
echo import { useAuth } from '../../context/AuthContext'; >> pages\public\LoginPage.jsx
echo import { useNavigate } from 'react-router-dom'; >> pages\public\LoginPage.jsx
echo. >> pages\public\LoginPage.jsx
echo const LoginPage = () => { >> pages\public\LoginPage.jsx
echo   const { login } = useAuth(); >> pages\public\LoginPage.jsx
echo   const navigate = useNavigate(); >> pages\public\LoginPage.jsx
echo   const [credentials, setCredentials] = useState({ username: '', password: '' }); >> pages\public\LoginPage.jsx
echo   const [error, setError] = useState(''); >> pages\public\LoginPage.jsx
echo. >> pages\public\LoginPage.jsx
echo   const handleSubmit = (e) => { >> pages\public\LoginPage.jsx
echo     e.preventDefault(); >> pages\public\LoginPage.jsx
echo     const result = login(credentials.username, credentials.password); >> pages\public\LoginPage.jsx
echo     if (result.success) { >> pages\public\LoginPage.jsx
echo       navigate('/admin'); >> pages\public\LoginPage.jsx
echo     } else { >> pages\public\LoginPage.jsx
echo       setError(result.error); >> pages\public\LoginPage.jsx
echo     } >> pages\public\LoginPage.jsx
echo   }; >> pages\public\LoginPage.jsx
echo. >> pages\public\LoginPage.jsx
echo   return ( >> pages\public\LoginPage.jsx
echo     ^<div style={{ padding: '40px 20px', maxWidth: '400px', margin: '0 auto' }}^> >> pages\public\LoginPage.jsx
echo       ^<h1^>Connexion Équipe^</h1^> >> pages\public\LoginPage.jsx
echo       {error && ^<div style={{ color: 'red' }}^>{error}^</div^>} >> pages\public\LoginPage.jsx
echo       ^<form onSubmit={handleSubmit}^> >> pages\public\LoginPage.jsx
echo         ^<input type="text" placeholder="Nom d'utilisateur" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '10px' }} /^> >> pages\public\LoginPage.jsx
echo         ^<input type="password" placeholder="Mot de passe" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '10px' }} /^> >> pages\public\LoginPage.jsx
echo         ^<button type="submit" style={{ width: '100%', padding: '10px', background: '#3498db', color: 'white', border: 'none' }}^>Se connecter^</button^> >> pages\public\LoginPage.jsx
echo       ^</form^> >> pages\public\LoginPage.jsx
echo     ^</div^> >> pages\public\LoginPage.jsx
echo   ); >> pages\public\LoginPage.jsx
echo }; >> pages\public\LoginPage.jsx
echo. >> pages\public\LoginPage.jsx
echo export default LoginPage; >> pages\public\LoginPage.jsx

REM RegisterPage.jsx
echo import React from 'react'; > pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo const RegisterPage = () => { >> pages\public\RegisterPage.jsx
echo   return ( >> pages\public\RegisterPage.jsx
echo     ^<div style={{ padding: '40px 20px', textAlign: 'center' }}^> >> pages\public\RegisterPage.jsx
echo       ^<h1^>Inscription Client^</h1^> >> pages\public\RegisterPage.jsx
echo       ^<p^>Créez votre compte client^</p^> >> pages\public\RegisterPage.jsx
echo     ^</div^> >> pages\public\RegisterPage.jsx
echo   ); >> pages\public\RegisterPage.jsx
echo }; >> pages\public\RegisterPage.jsx
echo. >> pages\public\RegisterPage.jsx
echo export default RegisterPage; >> pages\public\RegisterPage.jsx

REM ComingSoonPage.jsx
echo import React from 'react'; > pages\public\ComingSoonPage.jsx
echo. >> pages\public\ComingSoonPage.jsx
echo const ComingSoonPage = () => { >> pages\public\ComingSoonPage.jsx
echo   return ( >> pages\public\ComingSoonPage.jsx
echo     ^<div style={{ padding: '40px 20px', textAlign: 'center' }}^> >> pages\public\ComingSoonPage.jsx
echo       ^<h1^>Bientôt disponible !^</h1^> >> pages\public\ComingSoonPage.jsx
echo       ^<p^>Page en construction^</p^> >> pages\public\ComingSoonPage.jsx
echo     ^</div^> >> pages\public\ComingSoonPage.jsx
echo   ); >> pages\public\ComingSoonPage.jsx
echo }; >> pages\public\ComingSoonPage.jsx
echo. >> pages\public\ComingSoonPage.jsx
echo export default ComingSoonPage; >> pages\public\ComingSoonPage.jsx

echo [9/25] Création des pages admin...

REM AdminDashboard.jsx
echo import React from 'react'; > pages\admin\dashboard\AdminDashboard.jsx
echo import { useAuth } from '../../../context/AuthContext'; >> pages\admin\dashboard\AdminDashboard.jsx
echo. >> pages\admin\dashboard\AdminDashboard.jsx
echo const AdminDashboard = () => { >> pages\admin\dashboard\AdminDashboard.jsx
echo   const { user } = useAuth(); >> pages\admin\dashboard\AdminDashboard.jsx
echo. >> pages\admin\dashboard\AdminDashboard.jsx
echo   return ( >> pages\admin\dashboard\AdminDashboard.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\dashboard\AdminDashboard.jsx
echo       ^<h1^>Tableau de Bord Admin^</h1^> >> pages\admin\dashboard\AdminDashboard.jsx
echo       ^<p^>Bienvenue {user?.name}^</p^> >> pages\admin\dashboard\AdminDashboard.jsx
echo     ^</div^> >> pages\admin\dashboard\AdminDashboard.jsx
echo   ); >> pages\admin\dashboard\AdminDashboard.jsx
echo }; >> pages\admin\dashboard\AdminDashboard.jsx
echo. >> pages\admin\dashboard\AdminDashboard.jsx
echo export default AdminDashboard; >> pages\admin\dashboard\AdminDashboard.jsx

REM OrdersPage.jsx
echo import React from 'react'; > pages\admin\orders\OrdersPage.jsx
echo. >> pages\admin\orders\OrdersPage.jsx
echo const OrdersPage = () => { >> pages\admin\orders\OrdersPage.jsx
echo   return ( >> pages\admin\orders\OrdersPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\orders\OrdersPage.jsx
echo       ^<h1^>Commandes^</h1^> >> pages\admin\orders\OrdersPage.jsx
echo       ^<p^>Gestion des commandes^</p^> >> pages\admin\orders\OrdersPage.jsx
echo     ^</div^> >> pages\admin\orders\OrdersPage.jsx
echo   ); >> pages\admin\orders\OrdersPage.jsx
echo }; >> pages\admin\orders\OrdersPage.jsx
echo. >> pages\admin\orders\OrdersPage.jsx
echo export default OrdersPage; >> pages\admin\orders\OrdersPage.jsx

REM OrderEditPage.jsx
echo import React from 'react'; > pages\admin\orders\OrderEditPage.jsx
echo. >> pages\admin\orders\OrderEditPage.jsx
echo const OrderEditPage = () => { >> pages\admin\orders\OrderEditPage.jsx
echo   return ( >> pages\admin\orders\OrderEditPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\orders\OrderEditPage.jsx
echo       ^<h1^>Éditer Commande^</h1^> >> pages\admin\orders\OrderEditPage.jsx
echo       ^<p^>Page d'édition^</p^> >> pages\admin\orders\OrderEditPage.jsx
echo     ^</div^> >> pages\admin\orders\OrderEditPage.jsx
echo   ); >> pages\admin\orders\OrderEditPage.jsx
echo }; >> pages\admin\orders\OrderEditPage.jsx
echo. >> pages\admin\orders\OrderEditPage.jsx
echo export default OrderEditPage; >> pages\admin\orders\OrderEditPage.jsx

REM OrdersNewPage.jsx
echo import React from 'react'; > pages\admin\orders\OrdersNewPage.jsx
echo. >> pages\admin\orders\OrdersNewPage.jsx
echo const OrdersNewPage = () => { >> pages\admin\orders\OrdersNewPage.jsx
echo   return ( >> pages\admin\orders\OrdersNewPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\orders\OrdersNewPage.jsx
echo       ^<h1^>Nouvelle Commande^</h1^> >> pages\admin\orders\OrdersNewPage.jsx
echo       ^<p^>Créer une commande^</p^> >> pages\admin\orders\OrdersNewPage.jsx
echo     ^</div^> >> pages\admin\orders\OrdersNewPage.jsx
echo   ); >> pages\admin\orders\OrdersNewPage.jsx
echo }; >> pages\admin\orders\OrdersNewPage.jsx
echo. >> pages\admin\orders\OrdersNewPage.jsx
echo export default OrdersNewPage; >> pages\admin\orders\OrdersNewPage.jsx

REM ClientsPage.jsx
echo import React from 'react'; > pages\admin\clients\ClientsPage.jsx
echo. >> pages\admin\clients\ClientsPage.jsx
echo const ClientsPage = () => { >> pages\admin\clients\ClientsPage.jsx
echo   return ( >> pages\admin\clients\ClientsPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\clients\ClientsPage.jsx
echo       ^<h1^>Clients^</h1^> >> pages\admin\clients\ClientsPage.jsx
echo       ^<p^>Gestion des clients^</p^> >> pages\admin\clients\ClientsPage.jsx
echo     ^</div^> >> pages\admin\clients\ClientsPage.jsx
echo   ); >> pages\admin\clients\ClientsPage.jsx
echo }; >> pages\admin\clients\ClientsPage.jsx
echo. >> pages\admin\clients\ClientsPage.jsx
echo export default ClientsPage; >> pages\admin\clients\ClientsPage.jsx

REM ProductionPage.jsx
echo import React from 'react'; > pages\admin\production\ProductionPage.jsx
echo. >> pages\admin\production\ProductionPage.jsx
echo const ProductionPage = () => { >> pages\admin\production\ProductionPage.jsx
echo   return ( >> pages\admin\production\ProductionPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\production\ProductionPage.jsx
echo       ^<h1^>Production^</h1^> >> pages\admin\production\ProductionPage.jsx
echo       ^<p^>Suivi de production^</p^> >> pages\admin\production\ProductionPage.jsx
echo     ^</div^> >> pages\admin\production\ProductionPage.jsx
echo   ); >> pages\admin\production\ProductionPage.jsx
echo }; >> pages\admin\production\ProductionPage.jsx
echo. >> pages\admin\production\ProductionPage.jsx
echo export default ProductionPage; >> pages\admin\production\ProductionPage.jsx

REM ProfilePage.jsx
echo import React from 'react'; > pages\admin\profile\ProfilePage.jsx
echo import { useAuth } from '../../../context/AuthContext'; >> pages\admin\profile\ProfilePage.jsx
echo. >> pages\admin\profile\ProfilePage.jsx
echo const ProfilePage = () => { >> pages\admin\profile\ProfilePage.jsx
echo   const { user } = useAuth(); >> pages\admin\profile\ProfilePage.jsx
echo. >> pages\admin\profile\ProfilePage.jsx
echo   return ( >> pages\admin\profile\ProfilePage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\profile\ProfilePage.jsx
echo       ^<h1^>Mon Profil^</h1^> >> pages\admin\profile\ProfilePage.jsx
echo       ^<p^>Nom: {user?.name}^</p^> >> pages\admin\profile\ProfilePage.jsx
echo       ^<p^>Rôle: {user?.role}^</p^> >> pages\admin\profile\ProfilePage.jsx
echo     ^</div^> >> pages\admin\profile\ProfilePage.jsx
echo   ); >> pages\admin\profile\ProfilePage.jsx
echo }; >> pages\admin\profile\ProfilePage.jsx
echo. >> pages\admin\profile\ProfilePage.jsx
echo export default ProfilePage; >> pages\admin\profile\ProfilePage.jsx

REM StockPage.jsx
echo import React from 'react'; > pages\admin\stock\StockPage.jsx
echo. >> pages\admin\stock\StockPage.jsx
echo const StockPage = () => { >> pages\admin\stock\StockPage.jsx
echo   return ( >> pages\admin\stock\StockPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\stock\StockPage.jsx
echo       ^<h1^>Stock^</h1^> >> pages\admin\stock\StockPage.jsx
echo       ^<p^>Gestion du stock^</p^> >> pages\admin\stock\StockPage.jsx
echo     ^</div^> >> pages\admin\stock\StockPage.jsx
echo   ); >> pages\admin\stock\StockPage.jsx
echo }; >> pages\admin\stock\StockPage.jsx
echo. >> pages\admin\stock\StockPage.jsx
echo export default StockPage; >> pages\admin\stock\StockPage.jsx

REM AccountingPage.jsx
echo import React from 'react'; > pages\admin\accounting\AccountingPage.jsx
echo. >> pages\admin\accounting\AccountingPage.jsx
echo const AccountingPage = () => { >> pages\admin\accounting\AccountingPage.jsx
echo   return ( >> pages\admin\accounting\AccountingPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\accounting\AccountingPage.jsx
echo       ^<h1^>Comptabilité^</h1^> >> pages\admin\accounting\AccountingPage.jsx
echo       ^<p^>Gestion financière^</p^> >> pages\admin\accounting\AccountingPage.jsx
echo     ^</div^> >> pages\admin\accounting\AccountingPage.jsx
echo   ); >> pages\admin\accounting\AccountingPage.jsx
echo }; >> pages\admin\accounting\AccountingPage.jsx
echo. >> pages\admin\accounting\AccountingPage.jsx
echo export default AccountingPage; >> pages\admin\accounting\AccountingPage.jsx

REM SettingsPage.jsx
echo import React from 'react'; > pages\admin\settings\SettingsPage.jsx
echo. >> pages\admin\settings\SettingsPage.jsx
echo const SettingsPage = () => { >> pages\admin\settings\SettingsPage.jsx
echo   return ( >> pages\admin\settings\SettingsPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> pages\admin\settings\SettingsPage.jsx
echo       ^<h1^>Paramètres^</h1^> >> pages\admin\settings\SettingsPage.jsx
echo       ^<p^>Configuration^</p^> >> pages\admin\settings\SettingsPage.jsx
echo     ^</div^> >> pages\admin\settings\SettingsPage.jsx
echo   ); >> pages\admin\settings\SettingsPage.jsx
echo }; >> pages\admin\settings\SettingsPage.jsx
echo. >> pages\admin\settings\SettingsPage.jsx
echo export default SettingsPage; >> pages\admin\settings\SettingsPage.jsx

echo [10/25] Création de LayoutWrapper.jsx...
echo import React from 'react'; > components\layout\LayoutWrapper.jsx
echo. >> components\layout\LayoutWrapper.jsx
echo const LayoutWrapper = ({ children, isAdmin = false }) => { >> components\layout\LayoutWrapper.jsx
echo   return ( >> components\layout\LayoutWrapper.jsx
echo     ^<div className="app-container"^> >> components\layout\LayoutWrapper.jsx
echo       {children} >> components\layout\LayoutWrapper.jsx
echo     ^</div^> >> components\layout\LayoutWrapper.jsx
echo   ); >> components\layout\LayoutWrapper.jsx
echo }; >> components\layout\LayoutWrapper.jsx
echo. >> components\layout\LayoutWrapper.jsx
echo export default LayoutWrapper; >> components\layout\LayoutWrapper.jsx

echo.
echo ========================================
echo CRÉATION TERMINÉE !
echo ========================================
echo.
echo Tous les fichiers ont été créés avec succès.
echo.
echo Maintenant, démarrez le serveur :
echo 1. Ouvrez un terminal
echo 2. cd D:\ByGagoos-Ink\frontend
echo 3. npm run dev
echo.
echo Testez ces URLs :
echo - http://localhost:5173/
echo - http://localhost:5173/login
echo - http://localhost:5173/admin
echo.
pause