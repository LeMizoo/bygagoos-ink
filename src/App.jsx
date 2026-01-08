// frontend/src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Loading from './components/Loading/Loading';
import './App.css';

// Pages Publiques (Lazy Loading)
const HomePage = lazy(() => import('./pages/public/HomePage.jsx'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage.jsx'));
const FamilyPage = lazy(() => import('./pages/public/FamilyPage.jsx'));
const LoginPage = lazy(() => import('./pages/public/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/public/RegisterPage.jsx'));
const ComingSoonPage = lazy(() => import('./pages/public/ComingSoonPage.jsx'));

// Pages Admin (Lazy Loading)
const DashboardPage = lazy(() => import('./pages/admin/dashboard/DashboardPage.jsx'));
const OrdersPage = lazy(() => import('./pages/admin/orders/OrdersPage.jsx'));
const ClientsPage = lazy(() => import('./pages/admin/clients/ClientsPage.jsx'));
const ProductionPage = lazy(() => import('./pages/admin/production/ProductionPage.jsx'));
const ProfilePage = lazy(() => import('./pages/admin/profile/ProfilePage.jsx'));
const StockPage = lazy(() => import('./pages/admin/stock/StockPage.jsx'));
const AccountingPage = lazy(() => import('./pages/admin/accounting/AccountingPage.jsx'));
const SettingsPage = lazy(() => import('./pages/admin/settings/SettingsPage.jsx'));
const CalendarPage = lazy(() => import('./pages/admin/team/CalendarPage.jsx'));
const OrderEditPage = lazy(() => import('./pages/admin/orders/OrderEditPage.jsx'));
const OrdersNewPage = lazy(() => import('./pages/admin/orders/OrdersNewPage.jsx'));
const StockConsumablesPage = lazy(() => import('./pages/admin/stock/StockConsumablesPage.jsx'));
const InventoryPage = lazy(() => import('./pages/admin/stock/InventoryPage.jsx'));
const DocumentsPage = lazy(() => import('./pages/admin/settings/DocumentsPage.jsx'));
const LogisticsPage = lazy(() => import('./pages/admin/production/LogisticsPage.jsx'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* LayoutWrapper gère automatiquement le layout selon la route */}
            <Route element={<LayoutWrapper />}>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/family" element={<FamilyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/coming-soon" element={<ComingSoonPage />} />

              {/* Routes admin (protégées) */}
              <Route path="/admin/dashboard" element={
                <PrivateRoute><DashboardPage /></PrivateRoute>
              } />
              <Route path="/admin/orders" element={
                <PrivateRoute><OrdersPage /></PrivateRoute>
              } />
              <Route path="/admin/orders/new" element={
                <PrivateRoute><OrdersNewPage /></PrivateRoute>
              } />
              <Route path="/admin/orders/:id/edit" element={
                <PrivateRoute><OrderEditPage /></PrivateRoute>
              } />
              <Route path="/admin/clients" element={
                <PrivateRoute><ClientsPage /></PrivateRoute>
              } />
              <Route path="/admin/production" element={
                <PrivateRoute><ProductionPage /></PrivateRoute>
              } />
              <Route path="/admin/production/logistics" element={
                <PrivateRoute><LogisticsPage /></PrivateRoute>
              } />
              <Route path="/admin/profile" element={
                <PrivateRoute><ProfilePage /></PrivateRoute>
              } />
              <Route path="/admin/stock" element={
                <PrivateRoute><StockPage /></PrivateRoute>
              } />
              <Route path="/admin/stock/consumables" element={
                <PrivateRoute><StockConsumablesPage /></PrivateRoute>
              } />
              <Route path="/admin/stock/inventory" element={
                <PrivateRoute><InventoryPage /></PrivateRoute>
              } />
              <Route path="/admin/accounting" element={
                <PrivateRoute><AccountingPage /></PrivateRoute>
              } />
              <Route path="/admin/settings" element={
                <PrivateRoute><SettingsPage /></PrivateRoute>
              } />
              <Route path="/admin/settings/documents" element={
                <PrivateRoute><DocumentsPage /></PrivateRoute>
              } />
              <Route path="/admin/calendar" element={
                <PrivateRoute><CalendarPage /></PrivateRoute>
              } />

              {/* Routes client (protégées) */}
              <Route path="/client/dashboard" element={
                <PrivateRoute><h1>Dashboard Client</h1></PrivateRoute>
              } />
            </Route>

            {/* Redirections */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/client" element={<Navigate to="/client/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;