import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import ClientsPage from './pages/ClientsPage';
import ProductionTeam from './pages/ProductionTeam';
import FamilyPage from './pages/FamilyPage';
import ProfilePage from './pages/ProfilePage';
import CalendarPage from './pages/CalendarPage';
import DocumentsPage from './pages/DocumentsPage';
import AccountingPage from './pages/AccountingPage';
import LogisticsPage from './pages/LogisticsPage';
import StockConsumablesPage from './pages/StockConsumablesPage';
import SettingsPage from './pages/SettingsPage';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

import './App.css';

// Composant Layout pour les routes protégées
const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Navbar />
    <div className="main-container">
      <Sidebar />
      <div className="content-area">
        {children}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <Routes>
          {/* Page d'accueil publique - accessible à tous */}
          <Route path="/" element={<Gallery />} />
          
          {/* Page de connexion */}
          <Route path="/login" element={<Login />} />
          
          {/* Route protégée pour /app */}
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Navigate to="/app/dashboard" replace />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Routes protégées avec layout */}
          <Route 
            path="/app/*" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="clients" element={<ClientsPage />} />
                    <Route path="production" element={<ProductionTeam />} />
                    <Route path="family" element={<FamilyPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route path="accounting" element={<AccountingPage />} />
                    <Route path="logistics" element={<LogisticsPage />} />
                    <Route path="stock" element={<StockConsumablesPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Redirection pour anciens liens */}
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          
          {/* Page 404 - Redirige vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;