import React, { useState } from 'react';
import './OrdersPage.css';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const orders = [
    {
      id: '#BG-1245',
      client: 'Boutique MadaStyle',
      date: '15/12/2024',
      produit: 'T-shirts logo entreprise',
      quantité: 150,
      type: 'T-shirt Cotton',
      couleurs: 'Noir + Or',
      statut: 'impression',
      priorité: 'haute',
      prix: '2.4M Ar',
      responsable: 'Maman'
    },
    {
      id: '#BG-1244',
      client: 'École Les Petits Génies',
      date: '14/12/2024',
      produit: 'Polos scolaire',
      quantité: 300,
      type: 'Polo Piqué',
      couleurs: 'Bleu + Blanc',
      statut: 'séchage',
      priorité: 'moyenne',
      prix: '3.6M Ar',
      responsable: 'Junior'
    },
    {
      id: '#BG-1243',
      client: 'Restaurant La Terrasse',
      date: '13/12/2024',
      produit: 'Tabliers équipe',
      quantité: 25,
      type: 'Tablier Cuisinier',
      couleurs: 'Noir',
      statut: 'terminé',
      priorité: 'normale',
      prix: '450K Ar',
      responsable: 'Soeur'
    },
    {
      id: '#BG-1242',
      client: 'Startup TechMG',
      date: '12/12/2024',
      produit: 'Sweatshirts team',
      quantité: 80,
      type: 'Sweat Capuche',
      couleurs: 'Gris + Orange',
      statut: 'design',
      priorité: 'haute',
      prix: '2.0M Ar',
      responsable: 'Papa'
    },
    {
      id: '#BG-1241',
      client: 'Association Sportive',
      date: '11/12/2024',
      produit: 'Maillots football',
      quantité: 50,
      type: 'Maillot Sport',
      couleurs: 'Vert + Blanc',
      statut: 'attente',
      priorité: 'normale',
      prix: '1.2M Ar',
      responsable: 'Maman'
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.statut === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priorité === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'attente': { label: 'En Attente', color: '#8b5cf6', bg: '#f5f3ff', icon: '⏳' },
      'design': { label: 'Design', color: '#3b82f6', bg: '#eff6ff', icon: '🎨' },
      'impression': { label: 'Impression', color: '#f59e0b', bg: '#fffbeb', icon: '🖨️' },
      'séchage': { label: 'Séchage', color: '#10b981', bg: '#ecfdf5', icon: '🌞' },
      'emballage': { label: 'Emballage', color: '#06d6a0', bg: '#ecfdf5', icon: '📦' },
      'terminé': { label: 'Terminé', color: '#10b981', bg: '#ecfdf5', icon: '✅' },
      'livré': { label: 'Livré', color: '#8b5cf6', bg: '#f5f3ff', icon: '🚚' },
    };
    
    const config = statusConfig[statut] || { label: statut, color: '#6b7280', bg: '#f3f4f6', icon: '📋' };
    
    return (
      <span className="status-badge" style={{ 
        color: config.color, 
        backgroundColor: config.bg 
      }}>
        <span className="status-icon">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priorité) => {
    const priorityConfig = {
      'haute': { label: 'Haute', color: '#ef4444', icon: '🔥' },
      'moyenne': { label: 'Moyenne', color: '#f59e0b', icon: '⚠️' },
      'normale': { label: 'Normale', color: '#10b981', icon: '✅' },
    };
    
    const config = priorityConfig[priorité] || { label: priorité, color: '#6b7280', icon: '📋' };
    
    return (
      <span className="priority-badge" style={{ color: config.color }}>
        {config.icon} {config.label}
      </span>
    );
  };

  const getResponsibleAvatar = (responsable) => {
    const avatars = {
      'Papa': '👨',
      'Maman': '👩', 
      'Junior': '👦',
      'Soeur': '👧'
    };
    return avatars[responsable] || '👤';
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>Gestion des Commandes</h1>
          <p className="page-subtitle">Suivez et gérez toutes les commandes de l'atelier</p>
        </div>
        <button className="btn-primary">
          <span className="btn-icon">➕</span>
          Nouvelle Commande
        </button>
      </div>

      {/* Stats Summary */}
      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-icon">🖨️</div>
          <div className="stat-content">
            <div className="stat-value">{orders.length}</div>
            <div className="stat-label">Commandes Actives</div>
            <div className="stat-trend">+3 cette semaine</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">9.6M Ar</div>
            <div className="stat-label">CA en cours</div>
            <div className="stat-trend positive">+18%</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">2.3j</div>
            <div className="stat-label">Délai moyen</div>
            <div className="stat-trend negative">+0.5j</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍👩‍👧‍👦</div>
          <div className="stat-content">
            <div className="stat-value">4/4</div>
            <div className="stat-label">Équipe active</div>
            <div className="stat-trend">Toute la famille</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher commande, client ou produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="attente">En Attente</option>
            <option value="design">Design</option>
            <option value="impression">Impression</option>
            <option value="séchage">Séchage</option>
            <option value="emballage">Emballage</option>
            <option value="terminé">Terminé</option>
            <option value="livré">Livré</option>
          </select>
          
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes priorités</option>
            <option value="haute">Haute Priorité</option>
            <option value="moyenne">Moyenne</option>
            <option value="normale">Normale</option>
          </select>
          
          <button className="filter-btn">
            <span className="btn-icon">📅</span>
            Filtres Date
          </button>
          
          <button className="filter-btn export">
            <span className="btn-icon">📤</span>
            Exporter
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>N° Commande</th>
              <th>Client</th>
              <th>Date</th>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Type</th>
              <th>Couleurs</th>
              <th>Statut</th>
              <th>Priorité</th>
              <th>Prix</th>
              <th>Responsable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>
                  <div className="client-cell">
                    <div className="client-avatar">
                      {order.client.charAt(0)}
                    </div>
                    <span className="client-name">{order.client}</span>
                  </div>
                </td>
                <td className="order-date">{order.date}</td>
                <td className="order-product">{order.produit}</td>
                <td className="order-quantity">{order.quantité}</td>
                <td className="order-type">{order.type}</td>
                <td className="order-colors">{order.couleurs}</td>
                <td>{getStatusBadge(order.statut)}</td>
                <td>{getPriorityBadge(order.priorité)}</td>
                <td className="order-price">{order.prix}</td>
                <td>
                  <div className="responsible-cell">
                    <span className="responsible-avatar">
                      {getResponsibleAvatar(order.responsable)}
                    </span>
                    <span className="responsible-name">{order.responsable}</span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="Voir détails">
                      👁️
                    </button>
                    <button className="action-btn edit" title="Modifier">
                      ✏️
                    </button>
                    <button className="action-btn print" title="Bon d'impression">
                      🖨️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <div className="summary-title">Résumé du Mois</div>
            <div className="summary-stats">
              <div className="summary-stat">
                <span className="stat-label">Commandes totales :</span>
                <span className="stat-value">24</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Chiffre d'affaires :</span>
                <span className="stat-value">42M Ar</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Moyenne/commande :</span>
                <span className="stat-value">1.75M Ar</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon">🎯</div>
          <div className="summary-content">
            <div className="summary-title">Objectifs de la Semaine</div>
            <div className="summary-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <div className="progress-text">15/20 commandes terminées</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;