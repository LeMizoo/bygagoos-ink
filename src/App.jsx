import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Loading from './components/Loading/Loading';

// Lazy loading des pages publiques
const HomePage = lazy(() => import('./pages/public/HomePage'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const FamilyPage = lazy(() => import('./pages/public/FamilyPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = lazy(() => import('./pages/public/RegisterPage'));
const ComingSoonPage = lazy(() => import('./pages/public/ComingSoonPage'));

// Lazy loading des pages admin
const DashboardPage = lazy(() => import('./pages/admin/dashboard/DashboardPage'));
const OrdersPage = lazy(() => import('./pages/admin/orders/OrdersPage'));
const ClientsPage = lazy(() => import('./pages/admin/clients/ClientsPage'));
const ProductionPage = lazy(() => import('./pages/admin/production/ProductionPage'));
const ProfilePage = lazy(() => import('./pages/admin/profile/ProfilePage'));
const StockPage = lazy(() => import('./pages/admin/stock/StockPage'));
const AccountingPage = lazy(() => import('./pages/admin/accounting/AccountingPage'));
const SettingsPage = lazy(() => import('./pages/admin/settings/SettingsPage'));
const CalendarPage = lazy(() => import('./pages/admin/team/CalendarPage'));
const OrderEditPage = lazy(() => import('./pages/admin/orders/OrderEditPage'));
const OrdersNewPage = lazy(() => import('./pages/admin/orders/OrdersNewPage'));
const StockConsumablesPage = lazy(() => import('./pages/admin/stock/StockConsumablesPage'));
const InventoryPage = lazy(() => import('./pages/admin/stock/InventoryPage'));
const DocumentsPage = lazy(() => import('./pages/admin/settings/DocumentsPage'));
const LogisticsPage = lazy(() => import('./pages/admin/production/LogisticsPage'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<LayoutWrapper />}>
              <Route index element={<HomePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="family" element={<FamilyPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="coming-soon" element={<ComingSoonPage />} />
              
              {/* Routes admin protégées */}
              <Route path="admin" element={<PrivateRoute />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/new" element={<OrdersNewPage />} />
                <Route path="orders/edit/:id" element={<OrderEditPage />} />
                <Route path="clients" element={<ClientsPage />} />
                <Route path="production" element={<ProductionPage />} />
                <Route path="production/logistics" element={<LogisticsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="stock" element={<StockPage />} />
                <Route path="stock/consumables" element={<StockConsumablesPage />} />
                <Route path="stock/inventory" element={<InventoryPage />} />
                <Route path="accounting" element={<AccountingPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="settings/documents" element={<DocumentsPage />} />
                <Route path="team/calendar" element={<CalendarPage />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
              
              {/* Route 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
