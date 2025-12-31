import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogisticsPage.css';

const LogisticsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('deliveries');

  // Données de démo
  const deliveries = [
    {
      id: 'LIV-1245',
      orderId: 'CMD-1245',
      client: 'Boutique MadaStyle',
      address: 'Antananarivo 101',
      status: 'pending',
      scheduledDate: '2024-12-18',
      driver: 'Soeur',
      vehicle: 'Moto 125cc',
      items: ['150 T-shirts', '50 Casquettes'],
      value: '2.4M Ar'
    },
    {
      id: 'LIV-1244',
      orderId: 'CMD-1244',
      client: 'École Les Génies',
      address: 'Antananarivo Centre',
      status: 'in_transit',
      scheduledDate: '2024-12-17',
      driver: 'Junior',
      vehicle: 'Vélo cargo',
      items: ['300 Polos scolaires'],
      value: '3.6M Ar'
    },
    {
      id: 'LIV-1243',
      orderId: 'CMD-1243',
      client: 'Restaurant La Terrasse',
      address: 'Antananarivo Nord',
      status: 'delivered',
      scheduledDate: '2024-12-16',
      driver: 'Papa',
      vehicle: 'Voiture utilitaire',
      items: ['25 Tabliers'],
      value: '450K Ar'
    },
  ];

  const vehicles = [
    {
      id: 1,
      name: 'Moto 125cc',
      type: 'moto',
      status: 'available',
      lastMaintenance: '2024-12-10',
      nextMaintenance: '2025-01-10',
      driver: 'Soeur'
    },
    {
      id: 2,
      name: 'Vélo cargo',
      type: 'bike',
      status: 'in_use',
      lastMaintenance: '2024-12-05',
      nextMaintenance: '2025-01-05',
      driver: 'Junior'
    },
    {
      id: 3,
      name: 'Voiture utilitaire',
      type: 'car',
      status: 'maintenance',
      lastMaintenance: '2024-12-01',
      nextMaintenance: '2024-12-20',
      driver: 'Papa'
    },
  ];

  const stats = {
    totalDeliveries: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    availableVehicles: vehicles.filter(v => v.status === 'available').length
  };

  return (
    <div className="logistics-page mobile-layout">
      <header className="mobile-header">
        <h1 className="mobile-title">🚚 Logistique</h1>
        <div className="mobile-action">
          <button
            onClick={() => {}}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Nouvelle livraison
          </button>
        </div>
      </header>

      <main className="mobile-main-content">
        {/* Stats */}
        <section className="mobile-section">
          <h2 className="mobile-section-title">Vue d'ensemble</h2>
          <div className="mobile-section-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.totalDeliveries}</div>
                  <div className="stat-label">Livraisons</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.pending}</div>
                  <div className="stat-label">En attente</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🚚</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.inTransit}</div>
                  <div className="stat-label">En cours</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.delivered}</div>
                  <div className="stat-label">Livrées</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mobile-section">
          <div className="tabs-container">
            <button 
              className={`tab ${activeTab === 'deliveries' ? 'active' : ''}`}
              onClick={() => setActiveTab('deliveries')}
            >
              Livraisons
            </button>
            <button 
              className={`tab ${activeTab === 'vehicles' ? 'active' : ''}`}
              onClick={() => setActiveTab('vehicles')}
            >
              Véhicules
            </button>
            <button 
              className={`tab ${activeTab === 'routes' ? 'active' : ''}`}
              onClick={() => setActiveTab('routes')}
            >
              Itinéraires
            </button>
          </div>
        </section>

        {/* Contenu des tabs */}
        {activeTab === 'deliveries' && (
          <section className="mobile-section">
            <h2 className="mobile-section-title">📦 Livraisons du jour</h2>
            <div className="mobile-section-content">
              <div className="deliveries-list">
                {deliveries.map(delivery => (
                  <div key={delivery.id} className="delivery-card">
                    <div className="delivery-header">
                      <div className="delivery-id">{delivery.id}</div>
                      <div className={`delivery-status status-${delivery.status}`}>
                        {delivery.status === 'pending' ? 'En attente' : 
                         delivery.status === 'in_transit' ? 'En cours' : 'Livrée'}
                      </div>
                    </div>
                    <div className="delivery-info">
                      <div className="info-row">
                        <span className="label">Client:</span>
                        <span className="value">{delivery.client}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Adresse:</span>
                        <span className="value">{delivery.address}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Date:</span>
                        <span className="value">{delivery.scheduledDate}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Chauffeur:</span>
                        <span className="value">{delivery.driver}</span>
                      </div>
                    </div>
                    <div className="delivery-items">
                      <span className="items-label">Articles:</span>
                      <div className="items-list">
                        {delivery.items.map((item, idx) => (
                          <span key={idx} className="item-tag">{item}</span>
                        ))}
                      </div>
                    </div>
                    <div className="delivery-actions">
                      <button className="action-btn track">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Suivre
                      </button>
                      <button className="action-btn contact">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Appeler
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'vehicles' && (
          <section className="mobile-section">
            <h2 className="mobile-section-title">🚗 Véhicules</h2>
            <div className="mobile-section-content">
              <div className="vehicles-list">
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} className="vehicle-card">
                    <div className="vehicle-icon">
                      {vehicle.type === 'moto' ? '🏍️' : 
                       vehicle.type === 'bike' ? '🚲' : '🚗'}
                    </div>
                    <div className="vehicle-info">
                      <h3 className="vehicle-name">{vehicle.name}</h3>
                      <div className="vehicle-details">
                        <div className="detail">
                          <span className="label">Statut:</span>
                          <span className={`status status-${vehicle.status}`}>
                            {vehicle.status === 'available' ? 'Disponible' : 
                             vehicle.status === 'in_use' ? 'En usage' : 'Maintenance'}
                          </span>
                        </div>
                        <div className="detail">
                          <span className="label">Chauffeur:</span>
                          <span className="value">{vehicle.driver}</span>
                        </div>
                        <div className="detail">
                          <span className="label">Prochaine maintenance:</span>
                          <span className="value">{vehicle.nextMaintenance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default LogisticsPage;