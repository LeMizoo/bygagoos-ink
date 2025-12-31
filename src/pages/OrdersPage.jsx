import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons, StatusIcons, ActionIcons } from '../utils/icons';
import './OrdersPage.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Données d'exemple avec icônes pro
  const sampleOrders = [
    { id: 1, client: 'Sarah Andria', product: 'T-shirts Logo', quantity: 150, status: 'impression', deadline: '20/02/2024', amount: '450,000 Ar' },
    { id: 2, client: 'Jean Rakoto', product: 'Sweat-shirts Entreprise', quantity: 80, status: 'sechage', deadline: '18/02/2024', amount: '320,000 Ar' },
    { id: 3, client: 'Marie Rasoa', product: 'Polos Personnalisés', quantity: 200, status: 'termine', deadline: '15/02/2024', amount: '680,000 Ar' },
    { id: 4, client: 'Tiana Rajaona', product: 'Casquettes Brodées', quantity: 50, status: 'design', deadline: '22/02/2024', amount: '240,000 Ar' },
    { id: 5, client: 'Robert Andriam', product: 'Tote Bags Sérigraphiés', quantity: 100, status: 'impression', deadline: '25/02/2024', amount: '180,000 Ar' },
    { id: 6, client: 'Nirina Rajo', product: 'Uniformes Restauration', quantity: 60, status: 'sechage', deadline: '19/02/2024', amount: '540,000 Ar' },
    { id: 7, client: 'Hanta Ralay', product: 'Écharpes Entreprise', quantity: 120, status: 'termine', deadline: '16/02/2024', amount: '360,000 Ar' },
    { id: 8, client: 'Fidy Andri', product: 'Masques Textiles', quantity: 300, status: 'design', deadline: '28/02/2024', amount: '150,000 Ar' },
  ];

  useEffect(() => {
    // Simulation de chargement
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 800);
  }, []);

  const handleNewOrder = () => {
    navigate('/app/orders/new');
  };

  const handleViewOrder = (id) => {
    navigate(`/app/orders/edit/${id}`);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'impression': return Icons.print;
      case 'sechage': return Icons.clock;
      case 'termine': return Icons.success;
      case 'design': return Icons.design;
      default: return Icons.pending;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'impression': return 'status-impression';
      case 'sechage': return 'status-sechage';
      case 'termine': return 'status-termine';
      case 'design': return 'status-design';
      default: return 'status-default';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
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
          <div className="loading-spinner">{Icons.refresh}</div>
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
          <h1><span className="header-icon">{Icons.orders}</span> Commandes</h1>
          <p className="page-subtitle">Gestion des commandes clients</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleNewOrder}>
            <span className="btn-icon">{Icons.newOrder}</span>
            Nouvelle Commande
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">{Icons.search}</span>
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
            <span className="filter-icon">{Icons.filter}</span>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les statuts</option>
              <option value="design">{Icons.design} Design</option>
              <option value="impression">{Icons.print} Impression</option>
              <option value="sechage">{Icons.clock} Séchage</option>
              <option value="termine">{Icons.success} Terminé</option>
            </select>
          </div>
          
          <div className="stats-badge">
            <span className="stats-icon">{Icons.orders}</span>
            <span className="stats-count">{filteredOrders.length} commandes</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{Icons.orders}</div>
            <h3>Aucune commande trouvée</h3>
            <p>Créez votre première commande pour commencer</p>
            <button className="btn btn-primary" onClick={handleNewOrder}>
              {Icons.add} Créer une commande
            </button>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID Commande</th>
                    <th>Client</th>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Statut</th>
                    <th>Date Livraison</th>
                    <th>Montant</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="order-row" onClick={() => handleViewOrder(order.id)}>
                      <td className="order-id">
                        <span className="id-badge">CMD-{order.id.toString().padStart(3, '0')}</span>
                      </td>
                      <td className="client-cell">
                        <div className="client-info">
                          <span className="client-icon">{Icons.customer}</span>
                          <span className="client-name">{order.client}</span>
                        </div>
                      </td>
                      <td className="product-cell">
                        <div className="product-info">
                          <span className="product-icon">{Icons.product}</span>
                          <span>{order.product}</span>
                        </div>
                      </td>
                      <td className="quantity-cell">
                        <span className="quantity-badge">
                          {Icons.product} {order.quantity}
                        </span>
                      </td>
                      <td className="status-cell">
                        <span className={`status-tag ${getStatusColor(order.status)}`}>
                          <span className="status-icon">{getStatusIcon(order.status)}</span>
                          {order.status}
                        </span>
                      </td>
                      <td className="deadline-cell">
                        <span className={`deadline ${order.status === 'termine' ? 'delivered' : 'pending'}`}>
                          {Icons.calendar} {order.deadline}
                        </span>
                      </td>
                      <td className="amount-cell">
                        <span className="amount">{order.amount}</span>
                      </td>
                      <td className="actions-cell">
                        <div className="actions-buttons" onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="action-btn view-btn"
                            onClick={() => handleViewOrder(order.id)}
                            title="Voir détails"
                          >
                            {ActionIcons.view}
                          </button>
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => handleViewOrder(order.id)}
                            title="Modifier"
                          >
                            {ActionIcons.edit}
                          </button>
                          <button 
                            className="action-btn print-btn"
                            onClick={() => window.print()}
                            title="Imprimer"
                          >
                            {ActionIcons.print}
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
                  {Icons.arrowLeft} Précédent
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
                  Suivant {Icons.arrowRight}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">{Icons.pending}</div>
          <div className="stat-content">
            <div className="stat-value">3</div>
            <div className="stat-label">En attente</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">{Icons.inProgress}</div>
          <div className="stat-content">
            <div className="stat-value">2</div>
            <div className="stat-label">En production</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">{Icons.success}</div>
          <div className="stat-content">
            <div className="stat-value">2</div>
            <div className="stat-label">Terminées</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">{Icons.revenue}</div>
          <div className="stat-content">
            <div className="stat-value">2.9M Ar</div>
            <div className="stat-label">Chiffre total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;