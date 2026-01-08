@echo off
echo ========================================
echo CRÉATION DE TOUTES LES PAGES MANQUANTES
echo ========================================
echo.

echo [1/15] Création des dossiers nécessaires...
mkdir src\pages\admin\profile 2>nul
mkdir src\pages\admin\stock 2>nul
mkdir src\pages\admin\accounting 2>nul
mkdir src\pages\admin\settings 2>nul

echo [2/15] Création des pages publiques...
REM GalleryPage.jsx
echo import React from 'react'; > src\pages\public\GalleryPage.jsx
echo. >> src\pages\public\GalleryPage.jsx
echo const GalleryPage = () => { >> src\pages\public\GalleryPage.jsx
echo   return ( >> src\pages\public\GalleryPage.jsx
echo     ^<div style={{ padding: '40px 20px', textAlign: 'center' }}^> >> src\pages\public\GalleryPage.jsx
echo       ^<h1^>Galerie ByGagoos Ink^</h1^> >> src\pages\public\GalleryPage.jsx
echo       ^<p^>Nos réalisations en impression et sérigraphie^</p^> >> src\pages\public\GalleryPage.jsx
echo       ^<div style={{ marginTop: '40px' }}^> >> src\pages\public\GalleryPage.jsx
echo         ^<p^>Galerie en cours de chargement...^</p^> >> src\pages\public\GalleryPage.jsx
echo       ^</div^> >> src\pages\public\GalleryPage.jsx
echo     ^</div^> >> src\pages\public\GalleryPage.jsx
echo   ); >> src\pages\public\GalleryPage.jsx
echo }; >> src\pages\public\GalleryPage.jsx
echo. >> src\pages\public\GalleryPage.jsx
echo export default GalleryPage; >> src\pages\public\GalleryPage.jsx

echo [3/15] FamilyPage.jsx...
echo import React from 'react'; > src\pages\public\FamilyPage.jsx
echo. >> src\pages\public\FamilyPage.jsx
echo const FamilyPage = () => { >> src\pages\public\FamilyPage.jsx
echo   return ( >> src\pages\public\FamilyPage.jsx
echo     ^<div style={{ padding: '40px 20px', textAlign: 'center' }}^> >> src\pages\public\FamilyPage.jsx
echo       ^<h1^>La Famille ByGagoos^</h1^> >> src\pages\public\FamilyPage.jsx
echo       ^<p^>Rencontrez notre équipe passionnée^</p^> >> src\pages\public\FamilyPage.jsx
echo       ^<div style={{ marginTop: '40px' }}^> >> src\pages\public\FamilyPage.jsx
echo         ^<p^>Page en cours de chargement...^</p^> >> src\pages\public\FamilyPage.jsx
echo       ^</div^> >> src\pages\public\FamilyPage.jsx
echo     ^</div^> >> src\pages\public\FamilyPage.jsx
echo   ); >> src\pages\public\FamilyPage.jsx
echo }; >> src\pages\public\FamilyPage.jsx
echo. >> src\pages\public\FamilyPage.jsx
echo export default FamilyPage; >> src\pages\public\FamilyPage.jsx

echo [4/15] LoginPage.jsx...
echo import React, { useState } from 'react'; > src\pages\public\LoginPage.jsx
echo import { useAuth } from '../../context/AuthContext'; >> src\pages\public\LoginPage.jsx
echo import { useNavigate } from 'react-router-dom'; >> src\pages\public\LoginPage.jsx
echo. >> src\pages\public\LoginPage.jsx
echo const LoginPage = () => { >> src\pages\public\LoginPage.jsx
echo   const { login } = useAuth(); >> src\pages\public\LoginPage.jsx
echo   const navigate = useNavigate(); >> src\pages\public\LoginPage.jsx
echo   const [credentials, setCredentials] = useState({ >> src\pages\public\LoginPage.jsx
echo     username: '', >> src\pages\public\LoginPage.jsx
echo     password: '' >> src\pages\public\LoginPage.jsx
echo   }); >> src\pages\public\LoginPage.jsx
echo   const [error, setError] = useState(''); >> src\pages\public\LoginPage.jsx
echo. >> src\pages\public\LoginPage.jsx
echo   const handleSubmit = (e) => { >> src\pages\public\LoginPage.jsx
echo     e.preventDefault(); >> src\pages\public\LoginPage.jsx
echo     const result = login(credentials.username, credentials.password); >> src\pages\public\LoginPage.jsx
echo     if (result.success) { >> src\pages\public\LoginPage.jsx
echo       navigate('/admin'); >> src\pages\public\LoginPage.jsx
echo     } else { >> src\pages\public\LoginPage.jsx
echo       setError(result.error); >> src\pages\public\LoginPage.jsx
echo     } >> src\pages\public\LoginPage.jsx
echo   }; >> src\pages\public\LoginPage.jsx
echo. >> src\pages\public\LoginPage.jsx
echo   return ( >> src\pages\public\LoginPage.jsx
echo     ^<div style={{ padding: '40px 20px', maxWidth: '400px', margin: '0 auto' }}^> >> src\pages\public\LoginPage.jsx
echo       ^<h1^>Connexion Équipe^</h1^> >> src\pages\public\LoginPage.jsx
echo       {error && ^<div style={{ color: 'red', margin: '10px 0' }}^>{error}^</div^>} >> src\pages\public\LoginPage.jsx
echo       ^<form onSubmit={handleSubmit}^> >> src\pages\public\LoginPage.jsx
echo         ^<input type="text" placeholder="Nom d'utilisateur" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '10px' }} /^> >> src\pages\public\LoginPage.jsx
echo         ^<input type="password" placeholder="Mot de passe" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} style={{ width: '100%', marginBottom: '10px', padding: '10px' }} /^> >> src\pages\public\LoginPage.jsx
echo         ^<button type="submit" style={{ width: '100%', padding: '10px', background: '#3498db', color: 'white', border: 'none' }}^>Se connecter^</button^> >> src\pages\public\LoginPage.jsx
echo       ^</form^> >> src\pages\public\LoginPage.jsx
echo     ^</div^> >> src\pages\public\LoginPage.jsx
echo   ); >> src\pages\public\LoginPage.jsx
echo }; >> src\pages\public\LoginPage.jsx
echo. >> src\pages\public\LoginPage.jsx
echo export default LoginPage; >> src\pages\public\LoginPage.jsx

echo [5/15] ComingSoonPage.jsx...
echo import React from 'react'; > src\pages\public\ComingSoonPage.jsx
echo. >> src\pages\public\ComingSoonPage.jsx
echo const ComingSoonPage = () => { >> src\pages\public\ComingSoonPage.jsx
echo   return ( >> src\pages\public\ComingSoonPage.jsx
echo     ^<div style={{ padding: '80px 20px', textAlign: 'center' }}^> >> src\pages\public\ComingSoonPage.jsx
echo       ^<h1^>Page en construction^</h1^> >> src\pages\public\ComingSoonPage.jsx
echo       ^<p^>Bientôt disponible !^</p^> >> src\pages\public\ComingSoonPage.jsx
echo     ^</div^> >> src\pages\public\ComingSoonPage.jsx
echo   ); >> src\pages\public\ComingSoonPage.jsx
echo }; >> src\pages\public\ComingSoonPage.jsx
echo. >> src\pages\public\ComingSoonPage.jsx
echo export default ComingSoonPage; >> src\pages\public\ComingSoonPage.jsx

echo [6/15] Création des pages admin...
echo [7/15] AdminDashboard.jsx...
echo import React from 'react'; > src\pages\admin\dashboard\AdminDashboard.jsx
echo import { useAuth } from '../../../context/AuthContext'; >> src\pages\admin\dashboard\AdminDashboard.jsx
echo. >> src\pages\admin\dashboard\AdminDashboard.jsx
echo const AdminDashboard = () => { >> src\pages\admin\dashboard\AdminDashboard.jsx
echo   const { user } = useAuth(); >> src\pages\admin\dashboard\AdminDashboard.jsx
echo. >> src\pages\admin\dashboard\AdminDashboard.jsx
echo   return ( >> src\pages\admin\dashboard\AdminDashboard.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\dashboard\AdminDashboard.jsx
echo       ^<h1^>Tableau de Bord^</h1^> >> src\pages\admin\dashboard\AdminDashboard.jsx
echo       ^<p^>Bienvenue {user?.name} !^</p^> >> src\pages\admin\dashboard\AdminDashboard.jsx
echo       ^<div style={{ marginTop: '20px' }}^> >> src\pages\admin\dashboard\AdminDashboard.jsx
echo         ^<p^>Dashboard en cours de chargement...^</p^> >> src\pages\admin\dashboard\AdminDashboard.jsx
echo       ^</div^> >> src\pages\admin\dashboard\AdminDashboard.jsx
echo     ^</div^> >> src\pages\admin\dashboard\AdminDashboard.jsx
echo   ); >> src\pages\admin\dashboard\AdminDashboard.jsx
echo }; >> src\pages\admin\dashboard\AdminDashboard.jsx
echo. >> src\pages\admin\dashboard\AdminDashboard.jsx
echo export default AdminDashboard; >> src\pages\admin\dashboard\AdminDashboard.jsx

echo [8/15] OrdersPage.jsx...
echo import React from 'react'; > src\pages\admin\orders\OrdersPage.jsx
echo. >> src\pages\admin\orders\OrdersPage.jsx
echo const OrdersPage = () => { >> src\pages\admin\orders\OrdersPage.jsx
echo   return ( >> src\pages\admin\orders\OrdersPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\orders\OrdersPage.jsx
echo       ^<h1^>Gestion des Commandes^</h1^> >> src\pages\admin\orders\OrdersPage.jsx
echo       ^<div style={{ marginTop: '20px' }}^> >> src\pages\admin\orders\OrdersPage.jsx
echo         ^<p^>Liste des commandes en cours de chargement...^</p^> >> src\pages\admin\orders\OrdersPage.jsx
echo       ^</div^> >> src\pages\admin\orders\OrdersPage.jsx
echo     ^</div^> >> src\pages\admin\orders\OrdersPage.jsx
echo   ); >> src\pages\admin\orders\OrdersPage.jsx
echo }; >> src\pages\admin\orders\OrdersPage.jsx
echo. >> src\pages\admin\orders\OrdersPage.jsx
echo export default OrdersPage; >> src\pages\admin\orders\OrdersPage.jsx

echo [9/15] ClientsPage.jsx...
echo import React from 'react'; > src\pages\admin\clients\ClientsPage.jsx
echo. >> src\pages\admin\clients\ClientsPage.jsx
echo const ClientsPage = () => { >> src\pages\admin\clients\ClientsPage.jsx
echo   return ( >> src\pages\admin\clients\ClientsPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\clients\ClientsPage.jsx
echo       ^<h1^>Gestion des Clients^</h1^> >> src\pages\admin\clients\ClientsPage.jsx
echo       ^<div style={{ marginTop: '20px' }}^> >> src\pages\admin\clients\ClientsPage.jsx
echo         ^<p^>Liste des clients en cours de chargement...^</p^> >> src\pages\admin\clients\ClientsPage.jsx
echo       ^</div^> >> src\pages\admin\clients\ClientsPage.jsx
echo     ^</div^> >> src\pages\admin\clients\ClientsPage.jsx
echo   ); >> src\pages\admin\clients\ClientsPage.jsx
echo }; >> src\pages\admin\clients\ClientsPage.jsx
echo. >> src\pages\admin\clients\ClientsPage.jsx
echo export default ClientsPage; >> src\pages\admin\clients\ClientsPage.jsx

echo [10/15] ProductionPage.jsx...
echo import React from 'react'; > src\pages\admin\production\ProductionPage.jsx
echo. >> src\pages\admin\production\ProductionPage.jsx
echo const ProductionPage = () => { >> src\pages\admin\production\ProductionPage.jsx
echo   return ( >> src\pages\admin\production\ProductionPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\production\ProductionPage.jsx
echo       ^<h1^>Suivi de Production^</h1^> >> src\pages\admin\production\ProductionPage.jsx
echo       ^<div style={{ marginTop: '20px' }}^> >> src\pages\admin\production\ProductionPage.jsx
echo         ^<p^>Tableau de production en cours de chargement...^</p^> >> src\pages\admin\production\ProductionPage.jsx
echo       ^</div^> >> src\pages\admin\production\ProductionPage.jsx
echo     ^</div^> >> src\pages\admin\production\ProductionPage.jsx
echo   ); >> src\pages\admin\production\ProductionPage.jsx
echo }; >> src\pages\admin\production\ProductionPage.jsx
echo. >> src\pages\admin\production\ProductionPage.jsx
echo export default ProductionPage; >> src\pages\admin\production\ProductionPage.jsx

echo [11/15] ProfilePage.jsx...
echo import React from 'react'; > src\pages\admin\profile\ProfilePage.jsx
echo import { useAuth } from '../../../context/AuthContext'; >> src\pages\admin\profile\ProfilePage.jsx
echo. >> src\pages\admin\profile\ProfilePage.jsx
echo const ProfilePage = () => { >> src\pages\admin\profile\ProfilePage.jsx
echo   const { user } = useAuth(); >> src\pages\admin\profile\ProfilePage.jsx
echo. >> src\pages\admin\profile\ProfilePage.jsx
echo   return ( >> src\pages\admin\profile\ProfilePage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\profile\ProfilePage.jsx
echo       ^<h1^>Mon Profil^</h1^> >> src\pages\admin\profile\ProfilePage.jsx
echo       ^<div style={{ marginTop: '20px', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}^> >> src\pages\admin\profile\ProfilePage.jsx
echo         ^<p^>^<strong^>Nom :^</strong^> {user?.name}^</p^> >> src\pages\admin\profile\ProfilePage.jsx
echo         ^<p^>^<strong^>Rôle :^</strong^> {user?.role}^</p^> >> src\pages\admin\profile\ProfilePage.jsx
echo         ^<p^>^<strong^>Nom d'utilisateur :^</strong^> {user?.username}^</p^> >> src\pages\admin\profile\ProfilePage.jsx
echo       ^</div^> >> src\pages\admin\profile\ProfilePage.jsx
echo     ^</div^> >> src\pages\admin\profile\ProfilePage.jsx
echo   ); >> src\pages\admin\profile\ProfilePage.jsx
echo }; >> src\pages\admin\profile\ProfilePage.jsx
echo. >> src\pages\admin\profile\ProfilePage.jsx
echo export default ProfilePage; >> src\pages\admin\profile\ProfilePage.jsx

echo [12/15] StockPage.jsx...
echo import React from 'react'; > src\pages\admin\stock\StockPage.jsx
echo. >> src\pages\admin\stock\StockPage.jsx
echo const StockPage = () => { >> src\pages\admin\stock\StockPage.jsx
echo   return ( >> src\pages\admin\stock\StockPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\stock\StockPage.jsx
echo       ^<h1^>Gestion du Stock^</h1^> >> src\pages\admin\stock\StockPage.jsx
echo       ^<div style={{ marginTop: '20px' }}^> >> src\pages\admin\stock\StockPage.jsx
echo         ^<p^>Inventaire en cours de chargement...^</p^> >> src\pages\admin\stock\StockPage.jsx
echo       ^</div^> >> src\pages\admin\stock\StockPage.jsx
echo     ^</div^> >> src\pages\admin\stock\StockPage.jsx
echo   ); >> src\pages\admin\stock\StockPage.jsx
echo }; >> src\pages\admin\stock\StockPage.jsx
echo. >> src\pages\admin\stock\StockPage.jsx
echo export default StockPage; >> src\pages\admin\stock\StockPage.jsx

echo [13/15] AccountingPage.jsx...
echo import React from 'react'; > src\pages\admin\accounting\AccountingPage.jsx
echo. >> src\pages\admin\accounting\AccountingPage.jsx
echo const AccountingPage = () => { >> src\pages\admin\accounting\AccountingPage.jsx
echo   return ( >> src\pages\admin\accounting\AccountingPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\accounting\AccountingPage.jsx
echo       ^<h1^>Comptabilité^</h1^> >> src\pages\admin\accounting\AccountingPage.jsx
echo       ^<div style={{ marginTop: '20px' }}^> >> src\pages\admin\accounting\AccountingPage.jsx
echo         ^<p^>Rapports financiers en cours de chargement...^</p^> >> src\pages\admin\accounting\AccountingPage.jsx
echo       ^</div^> >> src\pages\admin\accounting\AccountingPage.jsx
echo     ^</div^> >> src\pages\admin\accounting\AccountingPage.jsx
echo   ); >> src\pages\admin\accounting\AccountingPage.jsx
echo }; >> src\pages\admin\accounting\AccountingPage.jsx
echo. >> src\pages\admin\accounting\AccountingPage.jsx
echo export default AccountingPage; >> src\pages\admin\accounting\AccountingPage.jsx

echo [14/15] SettingsPage.jsx...
echo import React from 'react'; > src\pages\admin\settings\SettingsPage.jsx
echo. >> src\pages\admin\settings\SettingsPage.jsx
echo const SettingsPage = () => { >> src\pages\admin\settings\SettingsPage.jsx
echo   return ( >> src\pages\admin\settings\SettingsPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\settings\SettingsPage.jsx
echo       ^<h1^>Paramètres^</h1^> >> src\pages\admin\settings\SettingsPage.jsx
echo       ^<div style={{ marginTop: '20px' }}^> >> src\pages\admin\settings\SettingsPage.jsx
echo         ^<p^>Configuration en cours de chargement...^</p^> >> src\pages\admin\settings\SettingsPage.jsx
echo       ^</div^> >> src\pages\admin\settings\SettingsPage.jsx
echo     ^</div^> >> src\pages\admin\settings\SettingsPage.jsx
echo   ); >> src\pages\admin\settings\SettingsPage.jsx
echo }; >> src\pages\admin\settings\SettingsPage.jsx
echo. >> src\pages\admin\settings\SettingsPage.jsx
echo export default SettingsPage; >> src\pages\admin\settings\SettingsPage.jsx

echo [15/15] Création de pages additionnelles...
REM OrderEditPage.jsx
echo import React from 'react'; > src\pages\admin\orders\OrderEditPage.jsx
echo. >> src\pages\admin\orders\OrderEditPage.jsx
echo const OrderEditPage = () => { >> src\pages\admin\orders\OrderEditPage.jsx
echo   return ( >> src\pages\admin\orders\OrderEditPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\orders\OrderEditPage.jsx
echo       ^<h1^>Édition de Commande^</h1^> >> src\pages\admin\orders\OrderEditPage.jsx
echo       ^<p^>Page d'édition en cours de chargement...^</p^> >> src\pages\admin\orders\OrderEditPage.jsx
echo     ^</div^> >> src\pages\admin\orders\OrderEditPage.jsx
echo   ); >> src\pages\admin\orders\OrderEditPage.jsx
echo }; >> src\pages\admin\orders\OrderEditPage.jsx
echo. >> src\pages\admin\orders\OrderEditPage.jsx
echo export default OrderEditPage; >> src\pages\admin\orders\OrderEditPage.jsx

REM OrdersNewPage.jsx
echo import React from 'react'; > src\pages\admin\orders\OrdersNewPage.jsx
echo. >> src\pages\admin\orders\OrdersNewPage.jsx
echo const OrdersNewPage = () => { >> src\pages\admin\orders\OrdersNewPage.jsx
echo   return ( >> src\pages\admin\orders\OrdersNewPage.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src\pages\admin\orders\OrdersNewPage.jsx
echo       ^<h1^>Nouvelle Commande^</h1^> >> src\pages\admin\orders\OrdersNewPage.jsx
echo       ^<p^>Formulaire nouvelle commande en cours de chargement...^</p^> >> src\pages\admin\orders\OrdersNewPage.jsx
echo     ^</div^> >> src\pages\admin\orders\OrdersNewPage.jsx
echo   ); >> src\pages\admin\orders\OrdersNewPage.jsx
echo }; >> src\pages\admin\orders\OrdersNewPage.jsx
echo. >> src\pages\admin\orders\OrdersNewPage.jsx
echo export default OrdersNewPage; >> src\pages\admin\orders\OrdersNewPage.jsx

REM Vérifier que context/AuthContext.jsx existe
if not exist "src\context\AuthContext.jsx" (
  echo [ATTENTION] AuthContext.jsx n'existe pas, création...
  echo import React, { createContext, useState, useContext } from 'react'; > src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo const AuthContext = createContext(null); >> src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo export const AuthProvider = ({ children }) => { >> src\context\AuthContext.jsx
  echo   const [user, setUser] = useState(null); >> src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo   const login = (username, password) => { >> src\context\AuthContext.jsx
  echo     const accounts = [ >> src\context\AuthContext.jsx
  echo       { username: 'Tovo', password: 'gagoos2024', role: 'super-admin', name: 'Tovo Randria' }, >> src\context\AuthContext.jsx
  echo       { username: 'Vola', password: 'gagoos2024', role: 'admin', name: 'Vola Rakoto' }, >> src\context\AuthContext.jsx
  echo       { username: 'Miantsa', password: 'gagoos2024', role: 'admin', name: 'Miantsa Rabe' }, >> src\context\AuthContext.jsx
  echo       { username: 'Faniry', password: 'gagoos2024', role: 'admin', name: 'Faniry Rasoa' }, >> src\context\AuthContext.jsx
  echo     ]; >> src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo     const account = accounts.find(acc => acc.username === username && acc.password === password); >> src\context\AuthContext.jsx
  echo     if (account) { >> src\context\AuthContext.jsx
  echo       setUser({ username: account.username, name: account.name, role: account.role }); >> src\context\AuthContext.jsx
  echo       return { success: true }; >> src\context\AuthContext.jsx
  echo     } >> src\context\AuthContext.jsx
  echo     return { success: false, error: 'Identifiants incorrects' }; >> src\context\AuthContext.jsx
  echo   }; >> src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo   const logout = () => { >> src\context\AuthContext.jsx
  echo     setUser(null); >> src\context\AuthContext.jsx
  echo   }; >> src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo   const value = { >> src\context\AuthContext.jsx
  echo     user, >> src\context\AuthContext.jsx
  echo     login, >> src\context\AuthContext.jsx
  echo     logout, >> src\context\AuthContext.jsx
  echo     isAuthenticated: !!user, >> src\context\AuthContext.jsx
  echo     isAdmin: user && (user.role === 'admin' || user.role === 'super-admin') >> src\context\AuthContext.jsx
  echo   }; >> src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo   return ( >> src\context\AuthContext.jsx
  echo     ^<AuthContext.Provider value={value}^> >> src\context\AuthContext.jsx
  echo       {children} >> src\context\AuthContext.jsx
  echo     ^</AuthContext.Provider^> >> src\context\AuthContext.jsx
  echo   ); >> src\context\AuthContext.jsx
  echo }; >> src\context\AuthContext.jsx
  echo. >> src\context\AuthContext.jsx
  echo export const useAuth = () => { >> src\context\AuthContext.jsx
  echo   const context = useContext(AuthContext); >> src\context\AuthContext.jsx
  echo   if (!context) { >> src\context\AuthContext.jsx
  echo     throw new Error('useAuth must be used within an AuthProvider'); >> src\context\AuthContext.jsx
  echo   } >> src\context\AuthContext.jsx
  echo   return context; >> src\context\AuthContext.jsx
  echo }; >> src\context\AuthContext.jsx
)

echo.
echo ========================================
echo CRÉATION TERMINÉE !
echo ========================================
echo.
echo Fichiers créés :
echo - src\pages\public\GalleryPage.jsx
echo - src\pages\public\FamilyPage.jsx
echo - src\pages\public\LoginPage.jsx
echo - src\pages\public\ComingSoonPage.jsx
echo - src\pages\admin\dashboard\AdminDashboard.jsx
echo - src\pages\admin\orders\OrdersPage.jsx
echo - src\pages\admin\orders\OrderEditPage.jsx
echo - src\pages\admin\orders\OrdersNewPage.jsx
echo - src\pages\admin\clients\ClientsPage.jsx
echo - src\pages\admin\production\ProductionPage.jsx
echo - src\pages\admin\profile\ProfilePage.jsx
echo - src\pages\admin\stock\StockPage.jsx
echo - src\pages\admin\accounting\AccountingPage.jsx
echo - src\pages\admin\settings\SettingsPage.jsx
echo - src\context\AuthContext.jsx (si manquant)
echo.
echo Redémarrez maintenant le serveur :
echo 1. Ctrl+C dans le terminal actuel
echo 2. npm run dev
echo.
pause