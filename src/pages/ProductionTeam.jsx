import React, { useState } from 'react';
import { MobileLayout, MobileSection, MobileCard } from '../components/layout/MobileLayout';
import './ProductionTeam.css';

const ProductionTeam = () => {
  const [activeTab, setActiveTab] = useState('members');

  const familyMembers = [
    {
      id: 1,
      name: 'Tovoniaina (Dada)',
      role: 'Fondateur & Maître Imprimeur',
      avatar: '/profiles/tovoniaina.jpg',
      status: 'active',
      skills: ['Sérigraphie', 'Design', 'Gestion'],
      experience: '10 ans',
      currentTask: 'Préparation écrans commande #BG-1245',
      phone: '+261 34 43 593 30',
      email: 'tovoniaina.rahendrison@gmail.com',
      shift: '07h-17h',
      tasksCompleted: 42,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Volatiana (Neny)',
      role: 'Gérante & Responsable Qualité',
      avatar: '/profiles/volatiana.jpg',
      status: 'active',
      skills: ['Impression', 'Relations Clients', 'Comptabilité'],
      experience: '8 ans',
      currentTask: 'Impression commande école',
      phone: '',
      email: 'dedettenadia@gmail.com',
      shift: '08h-16h',
      tasksCompleted: 38,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Miantsatiana',
      role: 'Responsable Design & Création',
      avatar: '/profiles/miantsatiana.jpg',
      status: 'active',
      skills: ['Design graphique', 'Conception', 'Digitalisation'],
      experience: '6 ans',
      currentTask: 'Design nouvelle collection',
      phone: '',
      email: 'miantsatianarahendrison@gmail.com',
      shift: '09h-17h',
      tasksCompleted: 35,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Tia Faniry',
      role: 'Responsable Communication & Relations',
      avatar: '/profiles/tia-faniry.jpg',
      status: 'active',
      skills: ['Communication', 'Gestion commandes', 'Logistique'],
      experience: '4 ans',
      currentTask: 'Préparation livraisons clients',
      phone: '',
      email: 'fanirytia17@gmail.com',
      shift: '08h-15h',
      tasksCompleted: 31,
      rating: 4.6
    },
  ];

  const productionSchedule = [
    { day: 'Lundi', hours: '7h-17h', focus: 'Impression commandes urgentes', team: '👨👩' },
    { day: 'Mardi', hours: '7h-17h', focus: 'Design & préparation écrans', team: '👨👧' },
    { day: 'Mercredi', hours: '7h-17h', focus: 'Production de masse', team: '👨👩👦' },
    { day: 'Jeudi', hours: '7h-17h', focus: 'Finitions & emballage', team: '👨👩👧' },
    { day: 'Vendredi', hours: '7h-16h', focus: 'Livraisons & réunion', team: '👨👩👦👧' },
    { day: 'Samedi', hours: '8h-12h', focus: 'Nettoyage & maintenance', team: '👨👦' },
    { day: 'Dimanche', hours: 'Fermé', focus: 'Repos familial', team: '🏡' },
  ];

  const currentShift = {
    time: '14h00 - 17h00',
    members: [
      { name: 'Tovoniaina', role: 'Responsable', avatar: '👨' },
      { name: 'Miantsatiana', role: 'Assistance', avatar: '👧' }
    ],
    task: 'Finition commande #BG-1245'
  };

  const actionButton = (
    <button
      onClick={() => {}}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      aria-label="Nouveau message"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="hidden sm:inline">Message</span>
    </button>
  );

  return (
    <MobileLayout 
      title="Équipe Familiale" 
      actionButton={actionButton}
    >
      {/* Tabs */}
      <MobileSection>
        <div className="team-tabs-mobile">
          <button 
            className={`team-tab ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            <span className="tab-icon">👥</span>
            <span className="tab-label">Membres</span>
          </button>
          <button 
            className={`team-tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <span className="tab-icon">📅</span>
            <span className="tab-label">Planning</span>
          </button>
          <button 
            className={`team-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <span className="tab-icon">📋</span>
            <span className="tab-label">Tâches</span>
          </button>
        </div>
      </MobileSection>

      {/* Membres de l'équipe */}
      {activeTab === 'members' && (
        <MobileSection title="👨‍👩‍👧‍👦 L'Équipe Familiale">
          <div className="team-members-grid">
            {familyMembers.map((member) => (
              <div key={member.id} className="team-member-card">
                <div className="member-header">
                  <div className="member-avatar">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="member-avatar-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = member.name.charAt(0);
                      }}
                    />
                  </div>
                  <div className="member-status">
                    <div className={`status-dot ${member.status}`}></div>
                    <span className="status-text">En ligne</span>
                  </div>
                </div>
                
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  
                  <div className="member-stats">
                    <div className="member-stat">
                      <span className="stat-label">Expérience:</span>
                      <span className="stat-value">{member.experience}</span>
                    </div>
                    <div className="member-stat">
                      <span className="stat-label">Tâches:</span>
                      <span className="stat-value">{member.tasksCompleted}</span>
                    </div>
                    <div className="member-stat">
                      <span className="stat-label">Note:</span>
                      <span className="stat-value">{member.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="member-skills">
                  <div className="skills-title">Compétences</div>
                  <div className="skills-list">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="member-current">
                  <div className="current-label">En cours:</div>
                  <div className="current-task">{member.currentTask}</div>
                </div>
                
                <div className="member-actions">
                  <button className="member-action-btn message">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Message
                  </button>
                  <button className="member-action-btn call">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Appeler
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MobileSection>
      )}

      {/* Planning */}
      {activeTab === 'schedule' && (
        <>
          <MobileSection title="📅 Planning Hebdomadaire">
            <div className="weekly-schedule-mobile">
              {productionSchedule.map((day, index) => (
                <div key={index} className="day-schedule-card">
                  <div className="day-header">
                    <div className="day-name">{day.day}</div>
                    <div className="day-hours">{day.hours}</div>
                  </div>
                  <div className="day-focus">{day.focus}</div>
                  <div className="day-team">{day.team}</div>
                </div>
              ))}
            </div>
          </MobileSection>

          <MobileSection title="🕐 Tour actuel">
            <div className="current-shift-card">
              <div className="shift-time">{currentShift.time}</div>
              <div className="shift-team">
                {currentShift.members.map((member, idx) => (
                  <div key={idx} className="shift-member">
                    <span className="member-avatar">{member.avatar}</span>
                    <div>
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="shift-task">
                <strong>Tâche :</strong> {currentShift.task}
              </div>
            </div>
          </MobileSection>
        </>
      )}

      {/* Tâches en cours */}
      {activeTab === 'tasks' && (
        <MobileSection title="📋 Tâches en cours">
          <div className="current-tasks-list">
            {familyMembers.map((member) => (
              <div key={member.id} className="member-task-card">
                <div className="task-member">
                  <div className="task-avatar">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="task-member-name">{member.name}</div>
                    <div className="task-member-role">{member.role}</div>
                  </div>
                </div>
                <div className="task-details">
                  <div className="task-title">{member.currentTask}</div>
                  <div className="task-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                    </div>
                    <div className="progress-text">75%</div>
                  </div>
                </div>
                <div className="task-actions">
                  <button className="task-action-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MobileSection>
      )}

      {/* Stats de l'équipe */}
      <MobileSection title="📊 Statistiques de l'équipe">
        <div className="team-stats-grid">
          <div className="team-stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{familyMembers.length}/4</div>
              <div className="stat-label">Présents</div>
            </div>
          </div>
          <div className="team-stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-value">146</div>
              <div className="stat-label">Tâches cette semaine</div>
            </div>
          </div>
          <div className="team-stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">92%</div>
              <div className="stat-label">Taux accomplissement</div>
            </div>
          </div>
          <div className="team-stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-value">2.1j</div>
              <div className="stat-label">Délai moyen</div>
            </div>
          </div>
        </div>
      </MobileSection>
    </MobileLayout>
  );
};

export default ProductionTeam;