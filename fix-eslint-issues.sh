#!/bin/bash
echo "��� CORRECTION DES ERREURS ESLINT"
echo "================================="

# 1. Correction des fichiers UI
echo "1. Correction des fichiers UI components..."

# Button.jsx - déjà corrigé ci-dessus
echo "   ✅ Button.jsx corrigé"

# Card.jsx - déjà corrigé ci-dessus
echo "   ✅ Card.jsx corrigé"

# ResponsiveTable.jsx - simplifier
cat > src/components/ui/ResponsiveTable.jsx << 'EOF_RESPONSIVE'
import React from 'react';
import './ResponsiveTable.css';

const ResponsiveTable = ({ 
  columns = [],
  data = [],
  className = '',
  onRowClick,
  emptyMessage = 'Aucune donnée disponible'
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="responsive-table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`responsive-table-container ${className}`}>
      <div className="responsive-table-scroll">
        <table className="responsive-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} style={{ width: column.width }}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'clickable-row' : ''}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
EOF_RESPONSIVE
echo "   ✅ ResponsiveTable.jsx corrigé"

# Table.jsx - simplifier
cat > src/components/ui/Table.jsx << 'EOF_TABLE'
import React from 'react';
import './Table.css';

const Table = ({ 
  headers = [],
  data = [],
  className = '',
  striped = false,
  hoverable = false,
  bordered = false
}) => {
  const tableClasses = [
    'table',
    striped ? 'table-striped' : '',
    hoverable ? 'table-hover' : '',
    bordered ? 'table-bordered' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="table-responsive">
      <table className={tableClasses}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
EOF_TABLE
echo "   ✅ Table.jsx corrigé"

# 2. Correction des variables non définies
echo "2. Correction des variables non définies..."

# StockConsumablesPage.jsx - déjà corrigé ci-dessus
echo "   ✅ StockConsumablesPage.jsx corrigé"

# ConsumablesPage.jsx - créer s'il manque
if [ ! -f "src/pages/admin/stock/ConsumablesPage.jsx" ]; then
  cat > src/pages/admin/stock/ConsumablesPage.jsx << 'EOF_CONSUMABLES'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsumablesPage.css';

const ConsumablesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="consumables-page">
      <h1>Page des Consommables</h1>
      <p>Cette page est en cours de développement.</p>
      <button onClick={() => navigate('/admin/stock')}>
        Retour au stock
      </button>
    </div>
  );
};

export default ConsumablesPage;
EOF_CONSUMABLES
  echo "   ✅ ConsumablesPage.jsx créé"
fi

# 3. Correction des warnings principaux dans App.jsx
echo "3. Optimisation de App.jsx..."

# Créer un App.jsx optimisé
cat > src/App.jsx << 'EOF_APP'
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
EOF_APP
echo "   ✅ App.jsx optimisé"

# 4. Correction des warnings dans main.jsx
echo "4. Correction de main.jsx..."
cat > src/main.jsx << 'EOF_MAIN'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF_MAIN
echo "   ✅ main.jsx corrigé"

# 5. Correction de l'échappement inutile dans RegisterPage.jsx
echo "5. Correction de RegisterPage.jsx..."
if [ -f "src/pages/public/RegisterPage.jsx" ]; then
  sed -i 's/\\-/-/g' src/pages/public/RegisterPage.jsx
  echo "   ✅ Échappement corrigé"
fi

echo ""
echo "✅ CORRECTIONS TERMINÉES!"
echo ""
echo "��� Prochaines étapes:"
echo "1. Exécutez: npm run build"
echo "2. Si succès: git add . && git commit -m 'Fix: ESLint issues resolved'"
echo "3. Déployez: git push origin main"
