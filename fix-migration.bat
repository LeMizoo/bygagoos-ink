@echo off
echo ========================================
echo CORRECTION MIGRATION BYGAGOOS INK
echo ========================================
echo.

echo [1/4] Création des fichiers manquants...
REM Créer le dossier Loading
mkdir src\components\Loading 2>nul

REM Créer LoadingSpinner.jsx
echo import React from 'react'; > src\components\Loading\LoadingSpinner.jsx
echo import './LoadingSpinner.css'; >> src\components\Loading\LoadingSpinner.jsx
echo. >> src\components\Loading\LoadingSpinner.jsx
echo const LoadingSpinner = () => { >> src\components\Loading\LoadingSpinner.jsx
echo   return ( >> src\components\Loading\LoadingSpinner.jsx
echo     ^<div className="loading-spinner-overlay"^> >> src\components\Loading\LoadingSpinner.jsx
echo       ^<div className="loading-spinner"^> >> src\components\Loading\LoadingSpinner.jsx
echo         ^<div className="spinner"^>^</div^> >> src\components\Loading\LoadingSpinner.jsx
echo         ^<p^>Chargement...^</p^> >> src\components\Loading\LoadingSpinner.jsx
echo       ^</div^> >> src\components\Loading\LoadingSpinner.jsx
echo     ^</div^> >> src\components\Loading\LoadingSpinner.jsx
echo   ); >> src\components\Loading\LoadingSpinner.jsx
echo }; >> src\components\Loading\LoadingSpinner.jsx
echo. >> src\components\Loading\LoadingSpinner.jsx
echo export default LoadingSpinner; >> src\components\Loading\LoadingSpinner.jsx

REM Créer LoadingSpinner.css
echo .loading-spinner-overlay { > src\components\Loading\LoadingSpinner.css
echo   position: fixed; >> src\components\Loading\LoadingSpinner.css
echo   top: 0; >> src\components\Loading\LoadingSpinner.css
echo   left: 0; >> src\components\Loading\LoadingSpinner.css
echo   right: 0; >> src\components\Loading\LoadingSpinner.css
echo   bottom: 0; >> src\components\Loading\LoadingSpinner.css
echo   background: rgba(255, 255, 255, 0.9); >> src\components\Loading\LoadingSpinner.css
echo   display: flex; >> src\components\Loading\LoadingSpinner.css
echo   justify-content: center; >> src\components\Loading\LoadingSpinner.css
echo   align-items: center; >> src\components\Loading\LoadingSpinner.css
echo   z-index: 9999; >> src\components\Loading\LoadingSpinner.css
echo } >> src\components\Loading\LoadingSpinner.css
echo. >> src\components\Loading\LoadingSpinner.css
echo .spinner { >> src\components\Loading\LoadingSpinner.css
echo   width: 50px; >> src\components\Loading\LoadingSpinner.css
echo   height: 50px; >> src\components\Loading\LoadingSpinner.css
echo   border: 5px solid #f3f3f3; >> src\components\Loading\LoadingSpinner.css
echo   border-top: 5px solid #3498db; >> src\components\Loading\LoadingSpinner.css
echo   border-radius: 50%; >> src\components\Loading\LoadingSpinner.css
echo   animation: spin 1s linear infinite; >> src\components\Loading\LoadingSpinner.css
echo   margin: 0 auto 20px; >> src\components\Loading\LoadingSpinner.css
echo } >> src\components\Loading\LoadingSpinner.css
echo. >> src\components\Loading\LoadingSpinner.css
echo @keyframes spin { >> src\components\Loading\LoadingSpinner.css
echo   0% { transform: rotate(0deg); } >> src\components\Loading\LoadingSpinner.css
echo   100% { transform: rotate(360deg); } >> src\components\Loading\LoadingSpinner.css
echo } >> src\components\Loading\LoadingSpinner.css

echo [2/4] Simplification de App.jsx...
REM Créer App.jsx simplifié
echo import React from 'react'; > src\App.jsx
echo import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; >> src\App.jsx
echo import { AuthProvider } from './context/AuthContext'; >> src\App.jsx
echo import LayoutWrapper from './components/layout/LayoutWrapper'; >> src\App.jsx
echo import './App.css'; >> src\App.jsx
echo. >> src\App.jsx
echo // Public pages >> src\App.jsx
echo import HomePage from './pages/public/HomePage'; >> src\App.jsx
echo import GalleryPage from './pages/public/GalleryPage'; >> src\App.jsx
echo import FamilyPage from './pages/public/FamilyPage'; >> src\App.jsx
echo import LoginPage from './pages/public/LoginPage'; >> src\App.jsx
echo import RegisterPage from './pages/public/RegisterPage'; >> src\App.jsx
echo import ComingSoonPage from './pages/public/ComingSoonPage'; >> src\App.jsx
echo. >> src\App.jsx
echo // Admin pages >> src\App.jsx
echo import AdminDashboard from './pages/admin/dashboard/AdminDashboard'; >> src\App.jsx
echo import OrdersPage from './pages/admin/orders/OrdersPage'; >> src\App.jsx
echo import OrderEditPage from './pages/admin/orders/OrderEditPage'; >> src\App.jsx
echo import OrdersNewPage from './pages/admin/orders/OrdersNewPage'; >> src\App.jsx
echo import ClientsPage from './pages/admin/clients/ClientsPage'; >> src\App.jsx
echo import ProductionPage from './pages/admin/production/ProductionPage'; >> src\App.jsx
echo import ProfilePage from './pages/admin/profile/ProfilePage'; >> src\App.jsx
echo import StockPage from './pages/admin/stock/StockPage'; >> src\App.jsx
echo import AccountingPage from './pages/admin/accounting/AccountingPage'; >> src\App.jsx
echo import SettingsPage from './pages/admin/settings/SettingsPage'; >> src\App.jsx
echo. >> src\App.jsx
echo function App() { >> src\App.jsx
echo   return ( >> src\App.jsx
echo     ^<AuthProvider^> >> src\App.jsx
echo       ^<Router^> >> src\App.jsx
echo         ^<Routes^> >> src\App.jsx
echo           ^<Route path="/" element={^<LayoutWrapper^>^<HomePage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/gallery" element={^<LayoutWrapper^>^<GalleryPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/family" element={^<LayoutWrapper^>^<FamilyPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/register" element={^<LayoutWrapper^>^<RegisterPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/login" element={^<LayoutWrapper^>^<LoginPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/coming-soon" element={^<LayoutWrapper^>^<ComingSoonPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo. >> src\App.jsx
echo           ^<Route path="/admin" element={^<LayoutWrapper isAdmin^>^<AdminDashboard /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/admin/orders" element={^<LayoutWrapper isAdmin^>^<OrdersPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/admin/clients" element={^<LayoutWrapper isAdmin^>^<ClientsPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/admin/production" element={^<LayoutWrapper isAdmin^>^<ProductionPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/admin/profile" element={^<LayoutWrapper isAdmin^>^<ProfilePage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/admin/stock" element={^<LayoutWrapper isAdmin^>^<StockPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/admin/accounting" element={^<LayoutWrapper isAdmin^>^<AccountingPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo           ^<Route path="/admin/settings" element={^<LayoutWrapper isAdmin^>^<SettingsPage /^>^</LayoutWrapper^>} /^> >> src\App.jsx
echo. >> src\App.jsx
echo           ^<Route path="/admin/dashboard" element={^<Navigate to="/admin" replace /^>} /^> >> src\App.jsx
echo           ^<Route path="*" element={^<Navigate to="/" replace /^>} /^> >> src\App.jsx
echo         ^</Routes^> >> src\App.jsx
echo       ^</Router^> >> src\App.jsx
echo     ^</AuthProvider^> >> src\App.jsx
echo   ); >> src\App.jsx
echo } >> src\App.jsx
echo. >> src\App.jsx
echo export default App; >> src\App.jsx

echo [3/4] Création des composants layout...
REM Créer LayoutWrapper
echo import React from 'react'; > src\components\layout\LayoutWrapper.jsx
echo import Header from './Header'; >> src\components\layout\LayoutWrapper.jsx
echo import Footer from './Footer'; >> src\components\layout\LayoutWrapper.jsx
echo import AdminSidebar from './AdminSidebar'; >> src\components\layout\LayoutWrapper.jsx
echo import { useAuth } from '../../context/AuthContext'; >> src\components\layout\LayoutWrapper.jsx
echo. >> src\components\layout\LayoutWrapper.jsx
echo const LayoutWrapper = ({ children, isAdmin = false }) => { >> src\components\layout\LayoutWrapper.jsx
echo   const { user } = useAuth(); >> src\components\layout\LayoutWrapper.jsx
echo   const showAdminSidebar = isAdmin && user && (user.role === 'admin' || user.role === 'super-admin'); >> src\components\layout\LayoutWrapper.jsx
echo. >> src\components\layout\LayoutWrapper.jsx
echo   return ( >> src\components\layout\LayoutWrapper.jsx
echo     ^<div className="app-container"^> >> src\components\layout\LayoutWrapper.jsx
echo       {!showAdminSidebar && ^<Header /^>} >> src\components\layout\LayoutWrapper.jsx
echo       ^<div className={`main-content ${showAdminSidebar ? 'with-sidebar' : ''}`}^> >> src\components\layout\LayoutWrapper.jsx
echo         {showAdminSidebar && ^<AdminSidebar /^>} >> src\components\layout\LayoutWrapper.jsx
echo         ^<div className={`content-area ${showAdminSidebar ? 'with-sidebar' : ''}`}^> >> src\components\layout\LayoutWrapper.jsx
echo           {children} >> src\components\layout\LayoutWrapper.jsx
echo         ^</div^> >> src\components\layout\LayoutWrapper.jsx
echo       ^</div^> >> src\components\layout\LayoutWrapper.jsx
echo       {!showAdminSidebar && ^<Footer /^>} >> src\components\layout\LayoutWrapper.jsx
echo     ^</div^> >> src\components\layout\LayoutWrapper.jsx
echo   ); >> src\components\layout\LayoutWrapper.jsx
echo }; >> src\components\layout\LayoutWrapper.jsx
echo. >> src\components\layout\LayoutWrapper.jsx
echo export default LayoutWrapper; >> src\components\layout\LayoutWrapper.jsx

echo [4/4] Création des styles de base...
REM Créer App.css simplifié
echo * { > src\App.css
echo   margin: 0; >> src\App.css
echo   padding: 0; >> src\App.css
echo   box-sizing: border-box; >> src\App.css
echo } >> src\App.css
echo. >> src\App.css
echo body { >> src\App.css
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', >> src\App.css
echo     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', >> src\App.css
echo     sans-serif; >> src\App.css
echo   -webkit-font-smoothing: antialiased; >> src\App.css
echo   -moz-osx-font-smoothing: grayscale; >> src\App.css
echo } >> src\App.css
echo. >> src\App.css
echo .app-container { >> src\App.css
echo   min-height: 100vh; >> src\App.css
echo   display: flex; >> src\App.css
echo   flex-direction: column; >> src\App.css
echo } >> src\App.css
echo. >> src\App.css
echo .main-content { >> src\App.css
echo   flex: 1; >> src\App.css
echo   display: flex; >> src\App.css
echo } >> src\App.css
echo. >> src\App.css
echo .content-area { >> src\App.css
echo   flex: 1; >> src\App.css
echo   padding: 20px; >> src\App.css
echo } >> src\App.css
echo. >> src\App.css
echo .content-area.with-sidebar { >> src\App.css
echo   margin-left: 280px; >> src\App.css
echo   width: calc(100% - 280px); >> src\App.css
echo } >> src\App.css
echo. >> src\App.css
echo @media (max-width: 768px) { >> src\App.css
echo   .content-area.with-sidebar { >> src\App.css
echo     margin-left: 0; >> src\App.css
echo     width: 100%; >> src\App.css
echo   } >> src\App.css
echo } >> src\App.css

echo.
echo ========================================
echo CORRECTION TERMINÉE !
echo ========================================
echo.
echo Exécute maintenant:
echo 1. cd D:\ByGagoos-Ink\frontend
echo 2. npm run dev
echo.
pause