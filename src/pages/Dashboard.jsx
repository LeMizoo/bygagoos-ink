import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { 
      label: 'Commandes en cours', 
      value: '24', 
      change: '+3 cette semaine', 
      icon: '🖨️', 
      color: '#4cc9f0',
      detail: 'Dont 8 urgentes'
    },
    { 
      label: 'Clients Actifs', 
      value: '42', 
      change: '+2 nouveaux', 
      icon: '👔', 
      color: '#4361ee',
      detail: '12 entreprises, 30 particuliers'
    },
    { 
      label: 'Chiffre d\'affaires mensuel', 
      value: '8.5M Ar', 
      change: '+15%', 
      icon: '💰', 
      color: '#ffd166',
      detail: '≈ 1 700€'
    },
    { 
      label: 'Taux de satisfaction', 
      value: '98%', 
      change: '+2%', 
      icon: '⭐', 
      color: '#06d6a0',
      detail: '32 avis ce mois'
    },
  ];

  const recentOrders = [
    { id: '#BG-1245', client: 'Boutique MadaStyle', produit: 'T-shirts logo', quantité: '150', statut: 'Impression', délai: '2 jours' },
    { id: '#BG-1244', client: 'École Les Petits Génies', produit: 'Polos scolaire', quantité: '300', statut: 'Séchage', délai: '3 jours' },
    { id: '#BG-1243', client: 'Restaurant La Terrasse', produit: 'Tabliers staff', quantité: '25', statut: 'Terminé', délai: 'Livré' },
    { id: '#BG-1242', client: 'Startup TechMG', produit: 'Sweatshirts', quantité: '80', statut: 'Design', délai: '5 jours' },
  ];

  const productionQueue = [
    { étape: 'Préparation écrans', quantité: '8 designs', responsable: 'Papa', avancement: '75%' },
    { étape: 'Impression', quantité: '550 pièces', responsable: 'Maman', avancement: '60%' },
    { étape: 'Séchage', quantité: '300 pièces', responsable: 'Junior', avancement: '40%' },
    { étape: 'Emballage', quantité: '120 pièces', responsable: 'Soeur', avancement: '90%' },
  ];

  const stockAlert = [
    { produit: 'Encre noire', niveau: 'Faible', quantité: '2L', action: 'Commander' },
    { produit: 'T-shirts Blancs L', niveau: 'Critique', quantité: '15', action: 'Urgent' },
    { produit: 'Cadres 40x60', niveau: 'Normal', quantité: '8', action: 'Surveiller' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Tableau de Bord Atelier</h1>
          <p className="dashboard-subtitle">ByGagoos Ink • Sérigraphie Textile Familiale</p>
        </div>
        <div className="header-actions">
          <div className="atelier-info">
            <span className="info-icon">🏭</span>
            <div className="info-text">
              <span className="info-status">Atelier ouvert</span>
              <span className="info-location">Antananarivo, Madagascar</span>
            </div>
          </div>
          <button className="action-btn primary">
            <span className="btn-icon">➕</span>
            Nouvelle Commande
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div 
                className="stat-icon"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-change">{stat.change}</div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            {stat.detail && (
              <div className="stat-detail">{stat.detail}</div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Commandes Récentes */}
          <div className="content-card">
            <div className="card-header">
              <h3>🖨️ Commandes Récentes</h3>
              <button className="view-all">Voir tout →</button>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>N° Commande</th>
                    <th>Client</th>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Statut</th>
                    <th>Délai</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td className="client-name">{order.client}</td>
                      <td className="product">{order.produit}</td>
                      <td className="quantity">{order.quantité}</td>
                      <td>
                        <span className={`status-badge ${order.statut.toLowerCase()}`}>
                          {order.statut}
                        </span>
                      </td>
                      <td className="deadline">{order.délai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alertes Stock */}
          <div className="content-card">
            <div className="card-header">
              <h3>⚠️ Alertes Stock</h3>
              <button className="view-all">Gérer le stock →</button>
            </div>
            <div className="alerts-list">
              {stockAlert.map((alert, index) => (
                <div key={index} className={`alert-item ${alert.niveau.toLowerCase()}`}>
                  <div className="alert-icon">
                    {alert.niveau === 'Critique' ? '🔥' : 
                     alert.niveau === 'Faible' ? '⚠️' : '📊'}
                  </div>
                  <div className="alert-content">
                    <div className="alert-product">{alert.produit}</div>
                    <div className="alert-details">
                      <span className="alert-level">{alert.niveau}</span>
                      <span className="alert-quantity">• {alert.quantité} restant</span>
                    </div>
                  </div>
                  <button className={`alert-action ${alert.action.toLowerCase()}`}>
                    {alert.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* File de Production */}
          <div className="content-card">
            <div className="card-header">
              <h3>🏭 File de Production</h3>
              <button className="view-all">Voir planning →</button>
            </div>
            <div className="production-queue">
              {productionQueue.map((step, index) => (
                <div key={index} className="production-step">
                  <div className="step-header">
                    <div className="step-name">{step.étape}</div>
                    <div className="step-responsible">
                      <span className="responsible-icon">👤</span>
                      {step.responsable}
                    </div>
                  </div>
                  <div className="step-details">
                    <div className="step-quantity">{step.quantité}</div>
                    <div className="step-progress">
                      <div 
                        className="progress-bar"
                        style={{ width: `${step.avancement}` }}
                      >
                        <div className="progress-fill"></div>
                      </div>
                      <span className="progress-text">{step.avancement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Équipe Familiale */}
          <div className="content-card">
            <div className="card-header">
              <h3>👨‍👩‍👧‍👦 Équipe en Ligne</h3>
            </div>
            <div className="team-status">
              <div className="team-member online">
                <div className="member-avatar">👨</div>
                <div className="member-info">
                  <div className="member-name">Papa (Fondateur)</div>
                  <div className="member-task">Préparation écrans</div>
                </div>
                <div className="member-status"></div>
              </div>
              <div className="team-member online">
                <div className="member-avatar">👩</div>
                <div className="member-info">
                  <div className="member-name">Maman (Gérante)</div>
                  <div className="member-task">Impression</div>
                </div>
                <div className="member-status"></div>
              </div>
              <div className="team-member online">
                <div className="member-avatar">👦</div>
                <div className="member-info">
                  <div className="member-name">Junior (Assistant)</div>
                  <div className="member-task">Séchage</div>
                </div>
                <div className="member-status"></div>
              </div>
              <div className="team-member offline">
                <div className="member-avatar">👧</div>
                <div className="member-info">
                  <div className="member-name">Soeur (Logistique)</div>
                  <div className="member-task">Pause déjeuner</div>
                </div>
                <div className="member-status"></div>
              </div>
            </div>
          </div>

          {/* Messages Importants */}
          <div className="content-card">
            <div className="card-header">
              <h3>💬 Messages Familiaux</h3>
            </div>
            <div className="family-messages">
              <div className="message">
                <div className="message-icon">📋</div>
                <div className="message-content">
                  <p><strong>Réunion famille</strong> ce soir 18h : point sur les commandes de fin d'année</p>
                  <span className="message-time">Aujourd'hui, 10:30</span>
                </div>
              </div>
              <div className="message">
                <div className="message-icon">🚚</div>
                <div className="message-content">
                  <p><strong>Livraison encre</strong> prévue demain matin. Vérifier le stock de solvant.</p>
                  <span className="message-time">Hier, 16:45</span>
                </div>
              </div>
              <div className="message">
                <div className="message-icon">🎉</div>
                <div className="message-content">
                  <p><strong>Anniversaire Papa</strong> samedi ! Prévoir fermeture atelier 14h.</p>
                  <span className="message-time">Lundi, 09:15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer du Dashboard */}
      <div className="dashboard-footer">
        <div className="footer-info">
          <span className="footer-icon">👕</span>
          <div className="footer-text">
            <strong>ByGagoos Ink</strong> • Sérigraphie Textile Familiale depuis 2015
          </div>
        </div>
        <div className="footer-stats">
          <span className="stat">📈 +24% croissance cette année</span>
          <span className="stat">⭐ 98% clients satisfaits</span>
          <span className="stat">🌱 100% engagement local</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;