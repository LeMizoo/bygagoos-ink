import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { dashboardService, ordersService } from '../../../services/api';
import './OrdersPage.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState(null);
  const ordersPerPage = 10;

  useEffect(() => {
    loadOrders();
    loadStats();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersService.getAll();
      setOrders(response.data || []);
    } catch (error) {
      console.log('Mode démo pour les commandes');
      // Données de démo
      setOrders([
        { id: 1, orderNumber: 'CMD-2024-001', client: { name: 'Marie RAKOTO' }, totalAmount: 1200000, status: 'IN_PROGRESS', deliveryDate: '2024-01-25', items: [{ product: 'T-shirt Blanc Premium', quantity: 100 }] },
        { id: 2, orderNumber: 'CMD-2024-002', client: { name: 'Jean RAZAFY' }, totalAmount: 750000, status: 'PENDING', deliveryDate: '2024-01-30', items: [{ product: 'Sweat Noir', quantity: 50 }] },
        { id: 3, orderNumber: 'CMD-2024-003', client: { name: 'Sarah ANDRIANAIVO' }, totalAmount: 980000, status: 'COMPLETED', deliveryDate: '2024-01-10', items: [{ product: 'Polo Bleu', quantity: 70 }] },
        { id: 4, orderNumber: 'CMD-2024-004', client: { name: 'Robert ANDRIAM' }, totalAmount: 450000, status: 'IN_PROGRESS', deliveryDate: '2024-01-28', items: [{ product: 'Tote Bags', quantity: 100 }] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await dashboardService.getStats();
      setStats(response.data);
    } catch (error) {
      console.log('Stats en mode démo');
      setStats({
        pendingOrders: 2,
        completedOrders: 1,
        totalRevenue: 24850000
      });
    }
  };

  const handleViewOrder = (id) => {
    navigate(`/admin/orders/${id}/edit`);
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'in_progress': return '🔄';
      case 'pending': return '⏳';
      case 'completed': return '✅';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'in_progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      default: return 'status-default';
    }
  };

  const getStatusText = (status) => {
    switch(status?.toLowerCase()) {
      case 'in_progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <h1><span className="header-icon">📦</span> Commandes</h1>
          <p className="page-subtitle">Gestion des commandes clients</p>
        </div>
        <div className="header-actions">
          <Link to="/admin/orders/new" className="btn btn-primary">
            <span className="btn-icon">➕</span>
            Nouvelle Commande
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <span className="filter-icon">⚡</span>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">⏳ En attente</option>
              <option value="in_progress">🔄 En cours</option>
              <option value="completed">✅ Terminé</option>
            </select>
          </div>
          
          <div className="stats-badge">
            <span className="stats-icon">📊</span>
            <span className="stats-count">{filteredOrders.length} commandes</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>Aucune commande trouvée</h3>
            <p>Créez votre première commande pour commencer</p>
            <Link to="/admin/orders/new" className="btn btn-primary">
              ➕ Créer une commande
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>N° Commande</th>
                    <th>Client</th>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Statut</th>
                    <th>Livraison</th>
                    <th>Montant</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="order-row">
                      <td className="order-id">
                        <Link to={`/admin/orders/${order.id}/edit`} className="order-link">
                          <span className="id-badge">{order.orderNumber}</span>
                        </Link>
                      </td>
                      <td className="client-cell">
                        <div className="client-info">
                          <span className="client-icon">👤</span>
                          <span className="client-name">{order.client?.name || 'Client'}</span>
                        </div>
                      </td>
                      <td className="product-cell">
                        <div className="product-info">
                          <span className="product-icon">👕</span>
                          <span>{order.items?.[0]?.product || 'Produit'}</span>
                        </div>
                      </td>
                      <td className="quantity-cell">
                        <span className="quantity-badge">
                          📦 {order.items?.[0]?.quantity || 0}
                        </span>
                      </td>
                      <td className="status-cell">
                        <span className={`status-tag ${getStatusColor(order.status)}`}>
                          <span className="status-icon">{getStatusIcon(order.status)}</span>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="deadline-cell">
                        <span className="deadline">
                          📅 {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('fr-FR') : '-'}
                        </span>
                      </td>
                      <td className="amount-cell">
                        <span className="amount">{order.totalAmount?.toLocaleString()} MGA</span>
                      </td>
                      <td className="actions-cell">
                        <div className="actions-buttons">
                          <Link 
                            to={`/admin/orders/${order.id}/edit`}
                            className="action-btn view-btn"
                            title="Voir détails"
                          >
                            👁️
                          </Link>
                          <Link 
                            to={`/admin/orders/${order.id}/edit`}
                            className="action-btn edit-btn"
                            title="Modifier"
                          >
                            ✏️
                          </Link>
                          <button 
                            className="action-btn print-btn"
                            onClick={() => window.print()}
                            title="Imprimer"
                          >
                            🖨️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn prev-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ← Précédent
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`page-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="pagination-btn next-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Suivant →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{stats?.pendingOrders || '0'}</div>
            <div className="stat-label">En attente</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-value">
              {orders.filter(o => o.status === 'IN_PROGRESS').length}
            </div>
            <div className="stat-label">En production</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats?.completedOrders || '0'}</div>
            <div className="stat-label">Terminées</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">
              {(stats?.totalRevenue || 0).toLocaleString()} MGA
            </div>
            <div className="stat-label">Chiffre total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;