import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProductionTeam.css';

const ProductionTeam = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données de démo pour l'équipe de production
  const demoTeam = [
    {
      id: 1,
      name: 'Marcel',
      role: 'Chef Atelier Sérigraphie',
      image: '/production/marcel-prod.jpg',
      status: 'active',
      skills: ['Sérigraphie', 'Préparation', 'Qualité'],
      currentTask: 'Commande #245 - T-shirts entreprise',
      progress: 85
    },
    {
      id: 2,
      name: 'Marcelin',
      role: 'Opérateur Machine',
      image: '/production/marcelin-prod.jpg',
      status: 'active',
      skills: ['Impression', 'Mélange couleurs', 'Entretien'],
      currentTask: 'Commande #247 - Sweats personnalisés',
      progress: 60
    },
    {
      id: 3,
      name: 'Ntsoa',
      role: 'Designer & Pré-presse',
      image: '/production/ntsoa-prod.jpg',
      status: 'active',
      skills: ['Design', 'Préparation fichiers', 'Photocopie'],
      currentTask: 'Préparation fichiers Commande #250',
      progress: 90
    },
    {
      id: 4,
      name: 'Miadrisoa',
      role: 'Séchage & Finition',
      image: '/production/miadrisoa-prod.jpg',
      status: 'active',
      skills: ['Séchage', 'Repassage', 'Emballage'],
      currentTask: 'Finition Commande #242',
      progress: 75
    },
    {
      id: 5,
      name: 'Mbin',
      role: 'Assistant Production',
      image: '/production/mbin-prod.jpg',
      status: 'break',
      skills: ['Support', 'Nettoyage', 'Logistique'],
      currentTask: 'Pause déjeuner',
      progress: 0
    }
  ];

  const demoTasks = [
    { id: 1, order: '#245', client: 'Entreprise ABC', deadline: 'Aujourd\'hui', status: 'en cours', progress: 85 },
    { id: 2, order: '#247', client: 'École XYZ', deadline: 'Demain', status: 'en cours', progress: 60 },
    { id: 3, order: '#250', client: 'Association Sportive', deadline: '2 jours', status: 'préparation', progress: 90 },
    { id: 4, order: '#242', client: 'Café Resto', deadline: 'Aujourd\'hui', status: 'finition', progress: 75 },
    { id: 5, order: '#251', client: 'Hôtel Beach', deadline: '3 jours', status: 'en attente', progress: 0 }
  ];

  useEffect(() => {
    // Simulation chargement données
    setTimeout(() => {
      setTeamMembers(demoTeam);
      setActiveTasks(demoTasks);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'break': return '#f59e0b';
      case 'off': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTaskStatusColor = (status) => {
    switch(status) {
      case 'en cours': return '#3b82f6';
      case 'préparation': return '#8b5cf6';
      case 'finition': return '#10b981';
      case 'en attente': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="production-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de l'équipe de production...</p>
      </div>
    );
  }

  return (
    <div className="production-container">
      {/* Header */}
      <div className="production-header">
        <div className="header-content">
          <h1 className="production-title">🏭 Équipe de Production</h1>
          <p className="production-subtitle">
            Atelier ByGagoos - Sérigraphie Textile
          </p>
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-value">{teamMembers.length}</div>
                <div className="stat-label">Membres d'équipe</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-info">
                <div className="stat-value">{activeTasks.length}</div>
                <div className="stat-label">Commandes en cours</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <div className="stat-value">94%</div>
                <div className="stat-label">Taux activité</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="production-content">
        {/* Section Équipe */}
        <section className="team-section">
          <div className="section-header">
            <h2 className="section-title">👥 Notre Équipe de Production</h2>
            <p className="section-description">
              Des professionnels passionnés par la sérigraphie textile
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="member-header">
                  <div className="member-avatar">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(member.status) }}
                    ></div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                  </div>
                </div>

                <div className="member-skills">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>

                <div className="current-task">
                  <p className="task-label">Tâche en cours :</p>
                  <p className="task-name">{member.currentTask}</p>
                  <div className="task-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${member.progress}%` }}
                    ></div>
                    <span className="progress-text">{member.progress}%</span>
                  </div>
                </div>

                <div className="member-status">
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(member.status) + '20',
                      color: getStatusColor(member.status)
                    }}
                  >
                    {member.status === 'active' ? '🟢 En activité' : 
                     member.status === 'break' ? '🟡 En pause' : '🔴 Absent'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Commandes */}
        <section className="tasks-section">
          <div className="section-header">
            <h2 className="section-title">📋 Commandes en Production</h2>
            <p className="section-description">
              Suivi en temps réel des commandes en cours
            </p>
          </div>

          <div className="tasks-table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Commande</th>
                  <th>Client</th>
                  <th>Échéance</th>
                  <th>Statut</th>
                  <th>Progression</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <div className="order-cell">
                        <span className="order-id">{task.order}</span>
                      </div>
                    </td>
                    <td>{task.client}</td>
                    <td>
                      <span className={`deadline ${task.deadline === 'Aujourd\'hui' ? 'urgent' : ''}`}>
                        {task.deadline}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="status-tag"
                        style={{ 
                          backgroundColor: getTaskStatusColor(task.status) + '20',
                          color: getTaskStatusColor(task.status)
                        }}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-container">
                          <div 
                            className="progress-fill"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-value">{task.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <button className="action-btn view-btn">
                        👁️ Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section Galerie Atelier */}
        <section className="gallery-section">
          <div className="section-header">
            <h2 className="section-title">📸 Notre Atelier</h2>
            <p className="section-description">
              Découvrez notre espace de travail et nos équipements
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item main-item">
              <img 
                src="/production/atelier-serigraphie.jpg" 
                alt="Atelier de sérigraphie"
                className="gallery-img"
              />
              <div className="gallery-overlay">
                <span className="gallery-caption">Atelier principal de sérigraphie</span>
              </div>
            </div>
            <div className="gallery-item">
              <img 
                src="/production/equipe-serigraphie.jpg" 
                alt="Équipe en action"
                className="gallery-img"
              />
              <div className="gallery-overlay">
                <span className="gallery-caption">Équipe en pleine action</span>
              </div>
            </div>
            <div className="gallery-item">
              <img 
                src="/production/equipe-prod-02.jpg" 
                alt="Zone de séchage"
                className="gallery-img"
              />
              <div className="gallery-overlay">
                <span className="gallery-caption">Zone de séchage et finition</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductionTeam;