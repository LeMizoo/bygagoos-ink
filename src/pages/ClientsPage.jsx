import React, { useState } from 'react';
import './ClientsPage.css';

const ClientsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      joined: '2024-01-15',
      orders: 5,
      totalSpent: 4500,
      lastVisit: '2024-12-15',
      status: 'active',
      notes: 'Prefers traditional style tattoos'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543',
      joined: '2024-02-20',
      orders: 3,
      totalSpent: 2550,
      lastVisit: '2024-12-14',
      status: 'active',
      notes: 'Sensitive skin, requires special care'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      joined: '2024-03-10',
      orders: 2,
      totalSpent: 500,
      lastVisit: '2024-12-13',
      status: 'inactive',
      notes: 'Interested in Japanese style'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma@example.com',
      phone: '+1 (555) 234-5678',
      joined: '2024-11-25',
      orders: 1,
      totalSpent: 1500,
      lastVisit: '2024-12-12',
      status: 'active',
      notes: 'New client, portrait specialist'
    },
    {
      id: 5,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 876-5432',
      joined: '2024-10-05',
      orders: 4,
      totalSpent: 3200,
      lastVisit: '2024-12-10',
      status: 'active',
      notes: 'Regular customer, 15% discount'
    },
  ];

  const filteredClients = clients.filter(client => {
    if (activeTab === 'all') return true;
    return client.status === activeTab;
  });

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge ${status}`}>
        {status === 'active' ? 'Active' : 'Inactive'}
      </span>
    );
  };

  return (
    <div className="clients-page">
      <div className="page-header">
        <div>
          <h1>Clients Management</h1>
          <p className="page-subtitle">Manage your tattoo studio clients</p>
        </div>
        <button className="btn-primary">
          <span className="btn-icon">➕</span>
          Add Client
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Clients ({clients.length})
        </button>
        <button 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({clients.filter(c => c.status === 'active').length})
        </button>
        <button 
          className={`tab ${activeTab === 'inactive' ? 'active' : ''}`}
          onClick={() => setActiveTab('inactive')}
        >
          Inactive ({clients.filter(c => c.status === 'inactive').length})
        </button>
        <button 
          className={`tab ${activeTab === 'vip' ? 'active' : ''}`}
          onClick={() => setActiveTab('vip')}
        >
          VIP (2)
        </button>
      </div>

      {/* Client Cards Grid */}
      <div className="clients-grid">
        {filteredClients.map((client) => (
          <div key={client.id} className="client-card">
            <div className="client-header">
              <div className="client-avatar">
                {client.name.charAt(0)}
              </div>
              <div className="client-info">
                <h3 className="client-name">{client.name}</h3>
                <p className="client-email">{client.email}</p>
              </div>
              {getStatusBadge(client.status)}
            </div>
            
            <div className="client-details">
              <div className="detail">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{client.phone}</span>
              </div>
              <div className="detail">
                <span className="detail-label">Member since:</span>
                <span className="detail-value">{client.joined}</span>
              </div>
              <div className="detail">
                <span className="detail-label">Total orders:</span>
                <span className="detail-value">{client.orders}</span>
              </div>
              <div className="detail">
                <span className="detail-label">Total spent:</span>
                <span className="detail-value amount">${client.totalSpent.toLocaleString()}</span>
              </div>
            </div>
            
            {client.notes && (
              <div className="client-notes">
                <span className="notes-label">Notes:</span>
                <p className="notes-content">{client.notes}</p>
              </div>
            )}
            
            <div className="client-actions">
              <button className="action-btn view">
                <span className="action-icon">👁️</span>
                View
              </button>
              <button className="action-btn edit">
                <span className="action-icon">✏️</span>
                Edit
              </button>
              <button className="action-btn message">
                <span className="action-icon">💬</span>
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{clients.length}</div>
            <div className="stat-label">Total Clients</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">${clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{(clients.reduce((sum, c) => sum + c.orders, 0) / clients.length).toFixed(1)}</div>
            <div className="stat-label">Avg. Orders/Client</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">4.8</div>
            <div className="stat-label">Avg. Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;