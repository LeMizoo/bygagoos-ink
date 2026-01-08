import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Erreur dashboard:', error);
      // Données de secours
      setStats({
        totalRevenue: 24850000,
        totalOrders: 48,
        newClients: 12,
        stockLevel: 85,
        pendingOrders: 8,
        completedOrders: 25,
        activeClients: 42,
        lowStockItems: 3,
        monthlyGrowth: 12.5,
        weeklySales: [
          { day: 'Lun', sales: 4200000, orders: 12 },
          { day: 'Mar', sales: 5200000, orders: 15 },
          { day: 'Mer', sales: 3800000, orders: 10 },
          { day: 'Jeu', sales: 6100000, orders: 18 },
          { day: 'Ven', sales: 7200000, orders: 22 },
          { day: 'Sam', sales: 4800000, orders: 14 },
          { day: 'Dim', sales: 3500000, orders: 9 }
        ],
        recentOrders: [
          {
            id: 1,
            orderNumber: 'CMD-2024-001',
            clientName: 'Marie RAKOTO',
            totalAmount: 1200000,
            status: 'IN_PROGRESS',
            deliveryDate: '2024-01-25'
          },
          {
            id: 2,
            orderNumber: 'CMD-2024-002',
            clientName: 'Jean RAZAFY',
            totalAmount: 750000,
            status: 'PENDING',
            deliveryDate: '2024-01-30'
          }
        ],
        topProducts: [
          { product: 'T-shirt Blanc Premium', sales: 1250, revenue: 15625000 },
          { product: 'Sweat à capuche Noir', sales: 680, revenue: 17000000 },
          { product: 'Polo Bleu marine', sales: 420, revenue: 7560000 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <div className="dashboard-actions">
          <button className="btn-refresh" onClick={loadDashboardData}>
            <span className="refresh-icon">🔄</span> Actualiser
          </button>
          <Link to="/admin/orders/new" className="btn-new-order">
            + Nouvelle commande
          </Link>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="stats-grid">
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Chiffre d'affaires</h3>
            <p className="stat-value">{stats?.totalRevenue?.toLocaleString() || '0'} MGA</p>
            <p className="stat-trend">↑ {stats?.monthlyGrowth || '0'}% ce mois</p>
          </div>
        </div>

        <div className="stat-card orders">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Commandes</h3>
            <p className="stat-value">{stats?.totalOrders || '0'}</p>
            <div className="stat-breakdown">
              <span className="status-pending">{stats?.pendingOrders || '0'} en attente</span>
              <span className="status-in-progress">{stats?.completedOrders || '0'} terminées</span>
            </div>
          </div>
        </div>

        <div className="stat-card clients">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Clients actifs</h3>
            <p className="stat-value">{stats?.activeClients || '0'}</p>
            <p className="stat-trend">+{stats?.newClients || '0'} nouveaux</p>
          </div>
        </div>

        <div className="stat-card stock">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Niveau de stock</h3>
            <p className="stat-value">{stats?.stockLevel || '0'}%</p>
            <p className="stock-warning">
              {stats?.lowStockItems || '0'} alertes stock
            </p>
          </div>
        </div>
      </div>

      {/* Graphique des ventes */}
      <div className="chart-section">
        <h2>Ventes hebdomadaires</h2>
        <div className="sales-chart">
          {stats?.weeklySales?.map((day, index) => (
            <div key={index} className="sales-bar">
              <div className="bar-label">{day.day}</div>
              <div 
                className="bar-value" 
                style={{ height: `${(day.sales / 1000000) * 2}px` }}
              >
                <span className="bar-tooltip">
                  {day.sales.toLocaleString()} MGA<br />
                  {day.orders} commandes
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commandes récentes */}
      <div className="recent-orders">
        <div className="section-header">
          <h2>Commandes récentes</h2>
          <Link to="/admin/orders" className="view-all">Voir toutes →</Link>
        </div>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>N° Commande</th>
                <th>Client</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Livraison</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/admin/orders/${order.id}/edit`} className="order-link">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td>{order.clientName}</td>
                  <td>{order.totalAmount?.toLocaleString()} MGA</td>
                  <td>
                    <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                      {order.status === 'IN_PROGRESS' ? 'En cours' : 
                       order.status === 'PENDING' ? 'En attente' : 'Terminée'}
                    </span>
                  </td>
                  <td>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('fr-FR') : '-'}</td>
                  <td>
                    <div className="order-actions">
                      <Link to={`/admin/orders/${order.id}/edit`} className="btn-action" title="Voir">
                        👁️
                      </Link>
                      <Link to={`/admin/orders/${order.id}/edit`} className="btn-action" title="Modifier">
                        ✏️
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Produits populaires */}
      <div className="top-products">
        <div className="section-header">
          <h2>Produits populaires</h2>
          <Link to="/admin/stock" className="view-all">Gérer stock →</Link>
        </div>
        <div className="products-grid">
          {stats?.topProducts?.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-rank">#{index + 1}</div>
              <div className="product-info">
                <h4>{product.product}</h4>
                <p className="product-sales">{product.sales} unités vendues</p>
                <p className="product-revenue">{product.revenue.toLocaleString()} MGA</p>
              </div>
              <div className="product-trend">
                <span className="trend-up">📈</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;