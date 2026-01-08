import React, { useState, useEffect } from 'react';
import { productionService, dashboardService } from '../../../services/api';
import './ProductionPage.css';

const ProductionPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('team');

  useEffect(() => {
    loadProductionData();
  }, []);

  const loadProductionData = async () => {
    try {
      setLoading(true);
      // Charger les données de production
      const [teamResponse, tasksResponse] = await Promise.all([
        productionService.getTeam(),
        productionService.getTasks()
      ]);

      setTeamMembers(teamResponse.data || []);
      setTasks(tasksResponse.data || []);
    } catch (error) {
      console.log('Mode démo pour la production');
      // Données de démo
      setTeamMembers([
        {
          id: 1,
          name: 'Marcel',
          role: 'Chef Atelier Sérigraphie',
          status: 'active',
          skills: ['Sérigraphie', 'Préparation', 'Qualité'],
          currentTask: 'Commande #245 - T-shirts entreprise',
          progress: 85
        },
        {
          id: 2,
          name: 'Marcelin',
          role: 'Opérateur Machine',
          status: 'active',
          skills: ['Impression', 'Mélange couleurs', 'Entretien'],
          currentTask: 'Commande #247 - Sweats personnalisés',
          progress: 60
        },
        {
          id: 3,
          name: 'Ntsoa',
          role: 'Designer & Pré-presse',
          status: 'active',
          skills: ['Design', 'Préparation fichiers', 'Photocopie'],
          currentTask: 'Préparation fichiers Commande #250',
          progress: 90
        },
      ]);

      setTasks([
        { id: 1, orderNumber: 'CMD-2024-001', client: 'Marie RAKOTO', status: 'IN_PROGRESS', deadline: '2024-01-25', progress: 65 },
        { id: 2, orderNumber: 'CMD-2024-002', client: 'Jean RAZAFY', status: 'PENDING', deadline: '2024-01-30', progress: 0 },
        { id: 3, orderNumber: 'CMD-2023-098', client: 'Sarah ANDRIANAIVO', status: 'COMPLETED', deadline: '2024-01-10', progress: 100 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return '#10b981';
      case 'in_progress': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'En activité';
      case 'in_progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="production-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des données de production...</p>
      </div>
    );
  }

  return (
    <div className="production-page">
      {/* Header */}
      <div className="production-header">
        <div className="header-content">
          <h1 className="production-title">🏭 Production</h1>
          <p className="production-subtitle">
            Gestion de l'atelier et suivi des commandes en cours
          </p>
        </div>
        
        <div className="production-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{teamMembers.length}</div>
              <div className="stat-label">Équipe</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-value">{tasks.length}</div>
              <div className="stat-label">Tâches en cours</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">
                {Math.round(tasks.filter(t => t.status === 'IN_PROGRESS').length / tasks.length * 100) || 0}%
              </div>
              <div className="stat-label">Taux activité</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="production-tabs">
        <button 
          className={`tab ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          <span className="tab-icon">👥</span>
          Équipe ({teamMembers.length})
        </button>
        <button 
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <span className="tab-icon">📋</span>
          Tâches ({tasks.length})
        </button>
        <button 
          className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          <span className="tab-icon">📸</span>
          Galerie Atelier
        </button>
      </div>

      {/* Content */}
      <div className="production-content">
        {/* Équipe */}
        {activeTab === 'team' && (
          <div className="team-section">
            <div className="section-header">
              <h2>👥 Notre Équipe de Production</h2>
              <p>Des professionnels passionnés par la sérigraphie textile</p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                  <div className="member-header">
                    <div className="member-avatar">
                      <div className="avatar-initials">
                        {member.name?.charAt(0)}
                      </div>
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
                    {member.skills?.map((skill, index) => (
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
                      {getStatusText(member.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tâches */}
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h2>📋 Commandes en Production</h2>
              <p>Suivi en temps réel des commandes en cours</p>
            </div>

            <div className="tasks-table-container">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Commande</th>
                    <th>Client</th>
                    <th>Statut</th>
                    <th>Échéance</th>
                    <th>Progression</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <div className="order-cell">
                          <span className="order-id">{task.orderNumber}</span>
                        </div>
                      </td>
                      <td>{task.client}</td>
                      <td>
                        <span 
                          className="status-tag"
                          style={{ 
                            backgroundColor: getStatusColor(task.status) + '20',
                            color: getStatusColor(task.status)
                          }}
                        >
                          {getStatusText(task.status)}
                        </span>
                      </td>
                      <td>
                        <span className={`deadline ${
                          task.deadline === new Date().toISOString().split('T')[0] ? 'urgent' : ''
                        }`}>
                          {task.deadline ? new Date(task.deadline).toLocaleDateString('fr-FR') : '-'}
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
          </div>
        )}

        {/* Galerie */}
        {activeTab === 'gallery' && (
          <div className="gallery-section">
            <div className="section-header">
              <h2>📸 Notre Atelier</h2>
              <p>Découvrez notre espace de travail et nos équipements</p>
            </div>

            <div className="gallery-grid">
              <div className="gallery-item main-item">
                <img 
                  src="/production/atelier-serigraphie.jpg" 
                  alt="Atelier de sérigraphie"
                  className="gallery-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-workshop.jpg';
                  }}
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-team.jpg';
                  }}
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-production.jpg';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Zone de séchage et finition</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionPage;