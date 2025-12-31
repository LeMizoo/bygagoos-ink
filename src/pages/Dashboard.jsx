import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Détecter la taille de l'écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Commandes de démo
  const allOrders = useMemo(() => [
    { id: 'BG-1245', client: 'Boutique MadaStyle', produit: 'T-shirts logo', quantité: '150', statut: 'Impression', délai: '2 jours' },
    { id: 'BG-1244', client: 'École Les Petits Génies', produit: 'Polos scolaire', quantité: '300', statut: 'Séchage', délai: '3 jours' },
    { id: 'BG-1243', client: 'Restaurant La Terrasse', produit: 'Tabliers staff', quantité: '25', statut: 'Terminé', délai: 'Livré' },
    { id: 'BG-1242', client: 'Startup TechMG', produit: 'Sweatshirts', quantité: '80', statut: 'Design', délai: '5 jours' },
    { id: 'BG-1241', client: 'Hôtel Tropical', produit: 'Uniforme staff', quantité: '45', statut: 'Séchage', délai: '1 jour' },
    { id: 'BG-1240', client: 'Club Sportif', produit: 'Maillots équipe', quantité: '120', statut: 'Terminé', délai: 'Livré' },
    { id: 'BG-1239', client: 'Université MG', produit: 'Sweatshirts promotion', quantité: '200', statut: 'Impression', délai: '4 jours' },
    { id: 'BG-1238', client: 'Café Artisanal', produit: 'Tabliers barista', quantité: '30', statut: 'Terminé', délai: 'Livré' },
    { id: 'BG-1237', client: 'Association Sportive', produit: 'T-shirts événement', quantité: '180', statut: 'Séchage', délai: '2 jours' },
    { id: 'BG-1236', client: 'Entreprise Tech', produit: 'Pulls corporate', quantité: '75', statut: 'Design', délai: '6 jours' },
  ], []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Données de démo
      const demoStats = {
        totalRevenue: 8500000,
        totalOrders: 24,
        newClients: 12,
        stockLevel: 85,
        pendingOrders: 8,
        completedOrders: 12,
        activeClients: 42,
        lowStockItems: 3,
        monthlyGrowth: 12.5,
      };
      
      setStats(demoStats);
    } catch (err) {
      console.error('Erreur chargement dashboard:', err);
      setError('Impossible de charger les données');
    } finally {
      setLoading(false);
    }
  };

  // Calculs pour la pagination
  const totalOrders = allOrders.length;
  const totalPages = Math.ceil(totalOrders / rowsPerPage);
  
  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Gestionnaires de pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Pour mobile: version réduite du tableau
  const MobileOrderCard = ({ order }) => (
    <div className="mobile-order-card">
      <div className="mobile-order-header">
        <span className="mobile-order-id">#{order.id}</span>
        <span className={`mobile-order-status status-${getStatusClass(order.statut)}`}>
          {order.statut}
        </span>
      </div>
      <div className="mobile-order-client">{order.client}</div>
      <div className="mobile-order-details">
        <div className="mobile-order-detail">
          <span className="detail-label">Produit:</span>
          <span className="detail-value">{order.produit}</span>
        </div>
        <div className="mobile-order-detail">
          <span className="detail-label">Quantité:</span>
          <span className="detail-value quantity">{order.quantité}</span>
        </div>
        <div className="mobile-order-detail">
          <span className="detail-label">Délai:</span>
          <span className={`detail-value deadline ${getDeadlineClass(order.délai)}`}>
            {order.délai}
          </span>
        </div>
      </div>
    </div>
  );

  // Fonction pour déterminer la classe CSS du statut
  const getStatusClass = (statut) => {
    const statutLower = statut.toLowerCase();
    if (statutLower.includes('impression')) return 'impression';
    if (statutLower.includes('séchage')) return 'sechage';
    if (statutLower.includes('terminé') || statutLower.includes('livré')) return 'termine';
    if (statutLower.includes('design')) return 'design';
    return 'default';
  };

  // Fonction pour déterminer la classe CSS du délai
  const getDeadlineClass = (delai) => {
    if (delai.toLowerCase() === 'livré') return 'delivered';
    return 'pending';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner-large"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h3>Erreur de chargement</h3>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="btn-retry">
          Réessayer
        </button>
      </div>
    );
  }

  const dashboardStats = [
    { 
      label: 'Commandes en cours', 
      value: stats?.pendingOrders || 8, 
      change: '+3 cette semaine', 
      icon: '🖨️', 
      color: '#4cc9f0',
      detail: '8 urgentes'
    },
    { 
      label: 'Clients Actifs', 
      value: stats?.activeClients || 42, 
      change: '+2 nouveaux', 
      icon: '👔', 
      color: '#4361ee',
      detail: '42 clients'
    },
    { 
      label: 'Chiffre d\'affaires', 
      value: stats?.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M Ar` : '8.5M Ar', 
      change: stats?.monthlyGrowth ? `+${stats.monthlyGrowth}%` : '+15%', 
      icon: '💰', 
      color: '#ffd166',
      detail: '≈ 1 700€'
    },
    { 
      label: 'Satisfaction', 
      value: '98%', 
      change: '+2%', 
      icon: '⭐', 
      color: '#06d6a0',
      detail: '32 avis'
    },
  ];

  const quickActions = [
    { icon: '👥', title: 'Clients', description: 'Gérer les clients', link: '/app/clients' },
    { icon: '🏭', title: 'Production', description: 'Suivi des commandes', link: '/app/production' },
    { icon: '👨‍👩‍👧‍👦', title: 'Équipe', description: 'Voir l\'équipe', link: '/app/family' },
    { icon: '📋', title: 'Commandes', description: 'Historique complet', link: '/app/orders' },
  ];

  const teamMembers = [
    { name: 'Papa', role: 'Préparation écrans', status: 'online', avatar: '👨' },
    { name: 'Maman', role: 'Impression', status: 'online', avatar: '👩' },
    { name: 'Junior', role: 'Séchage', status: 'online', avatar: '👦' },
    { name: 'Soeur', role: 'Emballage', status: 'offline', avatar: '👧' },
  ];

  const alerts = [
    { type: 'stock', message: 'Encre noir bas (2L restant)', priority: 'high' },
    { type: 'order', message: '#BG-1245 à expédier', priority: 'medium' },
    { type: 'maintenance', message: 'Machine 2 entretien', priority: 'low' },
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section - Optimisé mobile */}
      <div className="dashboard-header-section">
        <div className="header-content">
          <h1 className="dashboard-title">
            {isMobile ? 'Tableau de Bord' : 'Tableau de Bord Atelier'}
          </h1>
          <p className="dashboard-subtitle">
            {isMobile ? 'ByGagoos Ink' : 'ByGagoos Ink • Sérigraphie Textile Familiale'}
          </p>
          <div className="welcome-section">
            <span className="welcome-text">Bienvenue,</span>
            <span className="user-name">
              {isMobile ? (user?.name?.split(' ')[0] || 'Famille') : (user?.name || 'Membre de la famille')}
            </span>
            <span className="user-role">({user?.role || 'admin'})</span>
          </div>
        </div>
        
        <div className="header-actions-section">
          <div className="status-indicator">
            <span className="status-dot online"></span>
            <span className="status-text">
              {isMobile ? 'Ouvert' : 'Atelier ouvert'}
            </span>
          </div>
          <button 
            className="btn-primary-action"
            onClick={() => window.location.href = '/app/orders/new'}
          >
            {isMobile ? (
              <span className="btn-icon">➕</span>
            ) : (
              <>
                <span className="btn-icon">➕</span>
                Nouvelle Commande
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Section - Optimisé mobile */}
      <div className="stats-section">
        <h2 className="section-title">
          {isMobile ? '📊 Performances' : '📊 Aperçu des performances'}
        </h2>
        <div className="stats-grid">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ '--stat-color': stat.color }}>
              <div className="stat-card-inner">
                <div className="stat-icon-container">
                  <span className="stat-icon" style={{ color: stat.color }}>{stat.icon}</span>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">
                    {isMobile ? stat.label.split(' ')[0] : stat.label}
                  </div>
                  <div className="stat-change-container">
                    <span className={`stat-change ${stat.change.includes('+') ? 'positive' : 'negative'}`}>
                      {stat.change}
                    </span>
                    {!isMobile && stat.detail && (
                      <span className="stat-detail">{stat.detail}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Content Grid */}
      <div className="dashboard-content-grid">
        {/* Left Column - Main Content */}
        <div className="main-content-column">
          {/* Recent Orders Card - Version mobile/desktop */}
          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="card-icon">🖨️</span>
                {isMobile ? 'Commandes' : 'Commandes Récentes'}
                <span className="total-orders-badge">{totalOrders}</span>
              </h3>
              <a href="/app/orders" className="view-all-link">
                {isMobile ? 'Tout →' : 'Voir tout →'}
              </a>
            </div>
            
            {isMobile ? (
              // Version mobile: cartes au lieu de tableau
              <div className="mobile-orders-list">
                {currentOrders.map((order, index) => (
                  <MobileOrderCard key={index} order={order} />
                ))}
              </div>
            ) : (
              // Version desktop: tableau
              <>
                <div className="table-responsive-container">
                  <div className="table-wrapper">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th className="table-header">N° Commande</th>
                          <th className="table-header">Client</th>
                          <th className="table-header">Produit</th>
                          <th className="table-header">Quantité</th>
                          <th className="table-header">Statut</th>
                          <th className="table-header">Délai</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrders.map((order, index) => (
                          <tr key={index} className="table-row">
                            <td className="order-id-cell">
                              <span className="order-id">#{order.id}</span>
                            </td>
                            <td className="client-cell">
                              <div className="client-info">
                                <span className="client-name">{order.client}</span>
                              </div>
                            </td>
                            <td className="product-cell">
                              <span className="product-text">{order.produit}</span>
                            </td>
                            <td className="quantity-cell">
                              <span className="quantity-badge">{order.quantité}</span>
                            </td>
                            <td className="status-cell">
                              <span className={`status-tag status-${getStatusClass(order.statut)}`}>
                                {order.statut}
                              </span>
                            </td>
                            <td className="deadline-cell">
                              <span className={`deadline ${getDeadlineClass(order.délai)}`}>
                                {order.délai}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Pagination Controls - Optimisé mobile */}
            <div className="pagination-controls">
              {!isMobile && (
                <div className="pagination-info">
                  <span>Affichage {indexOfFirstOrder + 1} à {Math.min(indexOfLastOrder, totalOrders)} sur {totalOrders}</span>
                </div>
              )}
              
              <div className="pagination-buttons">
                <button 
                  className="pagination-btn prev-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Page précédente"
                >
                  {isMobile ? '←' : '← Précédent'}
                </button>
                
                <div className="page-indicator">
                  <span className="current-page">{currentPage}</span>
                  <span className="page-separator">/</span>
                  <span className="total-pages">{totalPages}</span>
                </div>
                
                <button 
                  className="pagination-btn next-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Page suivante"
                >
                  {isMobile ? '→' : 'Suivant →'}
                </button>
              </div>
              
              <div className="rows-per-page-selector">
                {!isMobile && <label htmlFor="rowsPerPage">Lignes:</label>}
                <select 
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="rows-select"
                  aria-label="Nombre de lignes par page"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  {!isMobile && <option value="20">20</option>}
                  {!isMobile && <option value="50">50</option>}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions - Optimisé mobile */}
          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="card-icon">⚡</span>
                {isMobile ? 'Actions' : 'Actions Rapides'}
              </h3>
            </div>
            
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <div 
                  key={index} 
                  className="quick-action-card"
                  onClick={() => window.location.href = action.link}
                >
                  <div className="action-icon">{action.icon}</div>
                  <div className="action-content">
                    <h4 className="action-title">
                      {isMobile ? action.title : action.title}
                    </h4>
                    {!isMobile && (
                      <p className="action-description">{action.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Content (caché sur mobile) */}
        {!isMobile && (
          <div className="sidebar-content-column">
            {/* Team Online */}
            <div className="content-card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="card-icon">👨‍👩‍👧‍👦</span>
                  Équipe en Ligne
                </h3>
              </div>
              
              <div className="team-list">
                {teamMembers.map((member, index) => (
                  <div key={index} className={`team-member ${member.status}`}>
                    <div className="member-avatar">{member.avatar}</div>
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                    </div>
                    <div className="member-status-indicator">
                      <div className={`status-dot ${member.status}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="content-card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="card-icon">⚠️</span>
                  Alertes
                </h3>
              </div>
              
              <div className="alerts-list">
                {alerts.map((alert, index) => (
                  <div key={index} className={`alert-item priority-${alert.priority}`}>
                    <div className="alert-icon">
                      {alert.type === 'stock' ? '📦' : 
                       alert.type === 'order' ? '📋' : '🔧'}
                    </div>
                    <div className="alert-content">{alert.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Simplifié sur mobile */}
      <div className="dashboard-footer">
        <div className="footer-content">
          <div className="company-info">
            <span className="company-icon">👕</span>
            <div className="company-text">
              <strong>ByGagoos Ink</strong>
              {!isMobile && (
                <span>Sérigraphie Textile Familiale depuis 2010</span>
              )}
            </div>
          </div>
          {!isMobile && (
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-value">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">24%</span>
                <span className="stat-label">Croissance</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">42</span>
                <span className="stat-label">Clients</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile pour sidebar (équipe et alertes) */}
      {isMobile && (
        <div className="mobile-bottom-nav">
          <div className="mobile-nav-item" onClick={() => window.location.href = '/app/family'}>
            <span className="nav-icon">👨‍👩‍👧‍👦</span>
            <span className="nav-label">Équipe</span>
          </div>
          <div className="mobile-nav-item" onClick={() => window.location.href = '/app/production'}>
            <span className="nav-icon">🏭</span>
            <span className="nav-label">Production</span>
          </div>
          <div className="mobile-nav-item" onClick={() => window.location.href = '/app/clients'}>
            <span className="nav-icon">👥</span>
            <span className="nav-label">Clients</span>
          </div>
          <div className="mobile-nav-item alerts-nav" onClick={() => {
            // Afficher les alertes
            alert(alerts.map(a => a.message).join('\n'));
          }}>
            <span className="nav-icon">⚠️</span>
            <span className="nav-label">Alertes</span>
            {alerts.length > 0 && (
              <span className="alert-count">{alerts.length}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;