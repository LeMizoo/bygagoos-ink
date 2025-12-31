import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Loading from './components/Loading/Loading';

import './styles/globals.css';
import './App.css';

// Pages
const Gallery = lazy(() => import('./pages/Gallery'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const OrdersNewPage = lazy(() => import('./pages/OrdersNewPage'));
const OrderEditPage = lazy(() => import('./pages/OrderEditPage'));
const ProductionTeam = lazy(() => import('./pages/ProductionTeam'));
const FamilyPage = lazy(() => import('./pages/FamilyPage'));

// Layout principal
const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-main">
        {/* Bouton pour ouvrir la sidebar sur mobile */}
        <button 
          className="sidebar-toggle-mobile"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>

        {/* Sidebar */}
        <div className="sidebar-container">
          <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
               onClick={() => setIsSidebarOpen(false)} />
          
          <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <button 
              className="sidebar-close-mobile"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Fermer le menu"
            >
              ✕
            </button>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </aside>
        </div>
        
        <main className="app-content">
          <div className="content-container">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="clients" element={<ClientsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/new" element={<OrdersNewPage />} />
                <Route path="orders/edit/:id" element={<OrderEditPage />} />
                <Route path="production" element={<ProductionTeam />} />
                <Route path="family" element={<FamilyPage />} />
                <Route path="profile" element={<div className="coming-soon">Profil (en développement)</div>} />
                <Route path="calendar" element={<div className="coming-soon">Calendrier (en développement)</div>} />
                <Route path="documents" element={<div className="coming-soon">Documents (en développement)</div>} />
                <Route path="accounting" element={<div className="coming-soon">Comptabilité (en développement)</div>} />
                <Route path="logistics" element={<div className="coming-soon">Logistique (en développement)</div>} />
                <Route path="stock" element={<div className="coming-soon">Stock (en développement)</div>} />
                <Route path="settings" element={<div className="coming-soon">Paramètres (en développement)</div>} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

// Layout public
const PublicLayout = () => {
  return (
    <div className="public-container">
      <Navbar />
      <main className="public-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<Gallery />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="login" element={<Login />} />
            <Route path="family" element={<FamilyPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/*" element={<PublicLayout />} />
          
          {/* Routes protégées */}
          <Route path="/app/*" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;