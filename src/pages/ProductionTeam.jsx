import React, { useState } from 'react';
import './ProductionTeam.css';

const ProductionTeam = () => {
  const [activeTab, setActiveTab] = useState('members');

  const familyMembers = [
    {
      id: 1,
      name: 'Papa Gagoos',
      role: 'Fondateur & Maître Imprimeur',
      avatar: '👨',
      status: 'active',
      skills: ['Sérigraphie', 'Design', 'Gestion'],
      years: '10 ans',
      currentTask: 'Préparation écrans #BG-1245',
      phone: '+261 34 00 00 01',
      email: 'papa@bygagoos.mg'
    },
    {
      id: 2,
      name: 'Maman Gagoos',
      role: 'Gérante & Responsable Qualité',
      avatar: '👩',
      status: 'active',
      skills: ['Impression', 'Relations Clients', 'Comptabilité'],
      years: '8 ans',
      currentTask: 'Impression commande école',
      phone: '+261 34 00 00 02',
      email: 'maman@bygagoos.mg'
    },
    {
      id: 3,
      name: 'Junior Gagoos',
      role: 'Assistant Production',
      avatar: '👦',
      status: 'active',
      skills: ['Séchage', 'Emballage', 'Logistique'],
      years: '3 ans',
      currentTask: 'Contrôle qualité séchage',
      phone: '+261 34 00 00 03',
      email: 'junior@bygagoos.mg'
    },
    {
      id: 4,
      name: 'Soeur Gagoos',
      role: 'Responsable Logistique',
      avatar: '👧',
      status: 'break',
      skills: ['Livraisons', 'Stock', 'Communication'],
      years: '2 ans',
      currentTask: 'Préparation livraisons',
      phone: '+261 34 00 00 04',
      email: 'soeur@bygagoos.mg'
    },
  ];

  const productionSchedule = [
    { day: 'Lundi', hours: '7h-17h', focus: 'Impression commandes urgentes' },
    { day: 'Mardi', hours: '7h-17h', focus: 'Design & préparation écrans' },
    { day: 'Mercredi', hours: '7h-17h', focus: 'Production de masse' },
    { day: 'Jeudi', hours: '7h-17h', focus: 'Finitions & emballage' },
    { day: 'Vendredi', hours: '7h-16h', focus: 'Livraisons & réunion famille' },
    { day: 'Samedi', hours: '8h-12h', focus: 'Nettoyage & maintenance' },
    { day: 'Dimanche', hours: 'Fermé', focus: 'Repos familial' },
  ];

  const skillMatrix = [
    { skill: 'Sérigraphie', papa: 'Expert', maman: 'Expert', junior: 'Intermédiaire', soeur: 'Débutant' },
    { skill: 'Design', papa: 'Expert', maman: 'Intermédiaire', junior: 'Débutant', soeur: 'Débutant' },
    { skill: 'Gestion', papa: 'Expert', maman: 'Expert', junior: 'Apprentissage', soeur: 'Apprentissage' },
    { skill: 'Relation Client', papa: 'Intermédiaire', maman: 'Expert', junior: 'Débutant', soeur: 'Intermédiaire' },
    { skill: 'Logistique', papa: 'Intermédiaire', maman: 'Intermédiaire', junior: 'Intermédiaire', soeur: 'Expert' },
  ];

  return (
    <div className="production-team-page">
      <div className="page-header">
        <div>
          <h1>👨‍👩‍👧‍👦 Équipe Familiale</h1>
          <p className="page-subtitle">L'âme de l'atelier ByGagoos Ink</p>
        </div>
        <div className="family-badge">
          <span className="badge-icon">🏡</span>
          <span>Entreprise Familiale depuis 2015</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="team-tabs">
        <button 
          className={`tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          👥 Membres
        </button>
        <button 
          className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          📅 Planning
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          🎯 Compétences
        </button>
        <button 
          className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          💬 Messages
        </button>
      </div>

      {activeTab === 'members' && (
        <div className="members-section">
          <div className="members-grid">
            {familyMembers.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-header">
                  <div className="member-avatar">{member.avatar}</div>
                  <div className="member-status-indicator">
                    <div className={`status-dot ${member.status}`}></div>
                  </div>
                </div>
                
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <div className="member-experience">
                    <span className="experience-icon">⏳</span>
                    {member.years} d'expérience
                  </div>
                </div>
                
                <div className="member-skills">
                  <div className="skills-label">Compétences :</div>
                  <div className="skills-list">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="member-current-task">
                  <div className="task-label">En cours :</div>
                  <div className="task-content">{member.currentTask}</div>
                </div>
                
                <div className="member-contact">
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    {member.phone}
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    {member.email}
                  </div>
                </div>
                
                <div className="member-actions">
                  <button className="action-btn message">
                    <span className="action-icon">💬</span>
                    Message
                  </button>
                  <button className="action-btn assign">
                    <span className="action-icon">📋</span>
                    Assigner tâche
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="schedule-section">
          <div className="weekly-schedule">
            <h3>📅 Planning Hebdomadaire de l'Atelier</h3>
            <div className="schedule-grid">
              {productionSchedule.map((day, index) => (
                <div key={index} className="day-card">
                  <div className="day-header">
                    <div className="day-name">{day.day}</div>
                    <div className="day-hours">{day.hours}</div>
                  </div>
                  <div className="day-focus">{day.focus}</div>
                  <div className="day-team">
                    {day.day === 'Dimanche' ? (
                      <span className="team-status">👨‍👩‍👧‍👦 Repos familial</span>
                    ) : (
                      <span className="team-status">🏭 Toute l'équipe</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="current-shift">
            <h3>🕐 Tour de Garde Actuel</h3>
            <div className="shift-info">
              <div className="shift-time">14h00 - 17h00</div>
              <div className="shift-members">
                <div className="shift-member">
                  <span className="member-avatar">👨</span>
                  <span>Papa (Responsable)</span>
                </div>
                <div className="shift-member">
                  <span className="member-avatar">👦</span>
                  <span>Junior (Assistance)</span>
                </div>
              </div>
              <div className="shift-task">
                <strong>Tâche :</strong> Finition commande #BG-1245
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="skills-section">
          <div className="skills-matrix">
            <h3>🎯 Matrice des Compétences Familiales</h3>
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Compétence</th>
                  <th>Papa</th>
                  <th>Maman</th>
                  <th>Junior</th>
                  <th>Soeur</th>
                </tr>
              </thead>
              <tbody>
                {skillMatrix.map((row, index) => (
                  <tr key={index}>
                    <td className="skill-name">{row.skill}</td>
                    <td>
                      <span className={`skill-level ${row.papa.toLowerCase()}`}>
                        {row.papa}
                      </span>
                    </td>
                    <td>
                      <span className={`skill-level ${row.maman.toLowerCase()}`}>
                        {row.maman}
                      </span>
                    </td>
                    <td>
                      <span className={`skill-level ${row.junior.toLowerCase()}`}>
                        {row.junior}
                      </span>
                    </td>
                    <td>
                      <span className={`skill-level ${row.soeur.toLowerCase()}`}>
                        {row.soeur}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="training-section">
            <h3>📚 Programme de Formation</h3>
            <div className="training-cards">
              <div className="training-card">
                <div className="training-icon">🎨</div>
                <div className="training-content">
                  <h4>Junior - Perfectionnement Design</h4>
                  <p>Formation logiciels design graphique</p>
                  <span className="training-status upcoming">À programmer</span>
                </div>
              </div>
              <div className="training-card">
                <div className="training-icon">💼</div>
                <div className="training-content">
                  <h4>Soeur - Gestion Commerciale</h4>
                  <p>Cours gestion entreprise familiale</p>
                  <span className="training-status in-progress">En cours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="messages-section">
          <div className="family-messages">
            <h3>💬 Messages Familiaux</h3>
            <div className="message-list">
              <div className="message-card">
                <div className="message-header">
                  <span className="message-sender">👨 Papa</span>
                  <span className="message-time">Aujourd'hui, 10:30</span>
                </div>
                <div className="message-content">
                  N'oubliez pas la réunion ce soir 18h pour préparer les commandes de fin d'année.
                </div>
              </div>
              <div className="message-card">
                <div className="message-header">
                  <span className="message-sender">👩 Maman</span>
                  <span className="message-time">Hier, 16:45</span>
                </div>
                <div className="message-content">
                  Livraison d'encre prévue demain matin. Vérifiez le stock de solvant SVP.
                </div>
              </div>
              <div className="message-card">
                <div className="message-header">
                  <span className="message-sender">👧 Soeur</span>
                  <span className="message-time">Lundi, 09:15</span>
                </div>
                <div className="message-content">
                  Rappel : anniversaire Papa samedi ! Prévoir fermeture atelier à 14h.
                </div>
              </div>
            </div>
            
            <div className="message-composer">
              <textarea 
                placeholder="Écrire un message à la famille..."
                className="message-input"
              />
              <button className="send-btn">
                <span className="btn-icon">✉️</span>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Family Values */}
      <div className="family-values">
        <h3>🏡 Nos Valeurs Familiales</h3>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <div className="value-title">Solidarité</div>
            <div className="value-desc">Chacun contribue selon ses forces</div>
          </div>
          <div className="value-card">
            <div className="value-icon">⭐</div>
            <div className="value-title">Excellence</div>
            <div className="value-desc">Qualité artisanale dans chaque pièce</div>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <div className="value-title">Transmission</div>
            <div className="value-desc">Savoir-faire passé aux générations</div>
          </div>
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <div className="value-title">Passion</div>
            <div className="value-desc">Amour du métier dans chaque création</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionTeam;