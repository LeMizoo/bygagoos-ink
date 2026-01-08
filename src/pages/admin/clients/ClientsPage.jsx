import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientsService } from '../../../services/api';
import './ClientsPage.css';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const response = await clientsService.getAll();
      setClients(response.data || []);
    } catch (error) {
      console.log('Mode démo pour les clients');
      // Données de démo
      setClients([
        {
          id: 1,
          company: 'TechMad SARL',
          firstName: 'Marie',
          lastName: 'RAKOTO',
          email: 'marie@techmad.mg',
          phone: '+261 34 12 345 67',
          totalOrders: 12,
          totalSpent: 8500000,
          lastOrder: '2024-01-15',
          status: 'ACTIVE'
        },
        {
          id: 2,
          company: 'Fashion MG',
          firstName: 'Jean',
          lastName: 'RAZAFY',
          email: 'jean@fashionmg.mg',
          phone: '+261 33 98 765 43',
          totalOrders: 8,
          totalSpent: 4200000,
          lastOrder: '2024-01-14',
          status: 'ACTIVE'
        },
        {
          id: 3,
          company: 'EcoPrint Madagascar',
          firstName: 'Sarah',
          lastName: 'ANDRIANAIVO',
          email: 'sarah@ecoprint.mg',
          phone: '+261 32 45 678 90',
          totalOrders: 5,
          totalSpent: 3100000,
          lastOrder: '2024-01-05',
          status: 'ACTIVE'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      ACTIVE: { text: 'Actif', color: 'status-active' },
      PENDING: { text: 'En attente', color: 'status-pending' },
      INACTIVE: { text: 'Inactif', color: 'status-inactive' }
    };
    
    const statusInfo = statusMap[status] || { text: status, color: 'status-default' };
    
    return (
      <span className={`status-badge ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="clients-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des clients...</p>
      </div>
    );
  }

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'ACTIVE').length,
    totalRevenue: clients.reduce((sum, c) => sum + (c.totalSpent || 0), 0),
    avgOrders: (clients.reduce((sum, c) => sum + (c.totalOrders || 0), 0) / clients.length).toFixed(1)
  };

  return (
    <div className="clients-page">
      {/* Header */}
      <div className="clients-header">
        <div className="header-left">
          <h1><span className="header-icon">👥</span> Clients</h1>
          <p className="page-subtitle">Gestion de la clientèle ByGagoos</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <span className="btn-icon">➕</span>
            Ajouter un client
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalClients}</div>
            <div className="stat-label">Clients total</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalRevenue.toLocaleString()} MGA</div>
            <div className="stat-label">Chiffre d'affaires</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{stats.avgOrders}</div>
            <div className="stat-label">Moy. commandes</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeClients}</div>
            <div className="stat-label">Clients actifs</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-options">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="ACTIVE">Clients actifs</option>
            <option value="PENDING">En attente</option>
            <option value="INACTIVE">Inactifs</option>
          </select>
          
          <div className="results-count">
            {filteredClients.length} client(s) trouvé(s)
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="clients-grid">
        {filteredClients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>Aucun client trouvé</h3>
            <p>Aucun client ne correspond à votre recherche</p>
          </div>
        ) : (
          filteredClients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-header">
                <div className="client-avatar">
                  {getInitials(client.firstName, client.lastName)}
                </div>
                <div className="client-info">
                  <h3 className="client-name">
                    {client.firstName} {client.lastName}
                  </h3>
                  <p className="client-company">{client.company}</p>
                  {getStatusBadge(client.status)}
                </div>
              </div>
              
              <div className="client-details">
                <div className="detail">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{client.email}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Téléphone:</span>
                  <span className="detail-value">{client.phone}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Commandes totales:</span>
                  <span className="detail-value">{client.totalOrders}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Chiffre total:</span>
                  <span className="detail-value amount">
                    {client.totalSpent?.toLocaleString()} MGA
                  </span>
                </div>
                <div className="detail">
                  <span className="detail-label">Dernière commande:</span>
                  <span className="detail-value">
                    {client.lastOrder ? new Date(client.lastOrder).toLocaleDateString('fr-FR') : '-'}
                  </span>
                </div>
              </div>
              
              <div className="client-actions">
                <Link 
                  to={`/admin/clients/${client.id}`}
                  className="action-btn view"
                >
                  <span className="action-icon">👁️</span>
                  Voir
                </Link>
                <button className="action-btn edit">
                  <span className="action-icon">✏️</span>
                  Modifier
                </button>
                <button className="action-btn message">
                  <span className="action-icon">💬</span>
                  Contacter
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientsPage;