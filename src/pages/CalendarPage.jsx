import React, { useState } from 'react';
import './CalendarPage.css';

const CalendarPage = () => {
  const [currentMonth] = useState(new Date());
  
  const productionEvents = [
    { id: 1, date: '2024-12-15', client: 'Boutique MadaStyle', task: 'Impression T-shirts', time: '9h-12h', team: '👨 Papa, 👦 Junior', status: 'en-cours' },
    { id: 2, date: '2024-12-15', client: 'École Les Génies', task: 'Séchage Polos', time: '14h-16h', team: '👩 Maman', status: 'planifié' },
    { id: 3, date: '2024-12-16', client: 'Startup TechMG', task: 'Design Sweatshirts', time: '8h-11h', team: '👨 Papa', status: 'planifié' },
    { id: 4, date: '2024-12-16', client: 'Restaurant La Terrasse', task: 'Livraison tabliers', time: '15h-16h', team: '👧 Soeur', status: 'livraison' },
    { id: 5, date: '2024-12-17', client: 'Association Sportive', task: 'Préparation écrans', time: '10h-12h', team: '👨 Papa', status: 'planifié' },
  ];

  const familyEvents = [
    { id: 6, date: '2024-12-15', title: 'Réunion famille', time: '18h', type: 'famille', location: 'Maison' },
    { id: 7, date: '2024-12-20', title: 'Anniversaire Papa', time: 'Toute la journée', type: 'celebration', location: 'Atelier' },
    { id: 8, date: '2024-12-24', title: 'Fermeture Noël', time: 'Journée', type: 'fermeture', location: 'Atelier' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = [...productionEvents, ...familyEvents].filter(event => event.date === today);

  return (
    <div className="calendar-page">
      <div className="page-header">
        <div>
          <h1>📅 Calendrier de Production</h1>
          <p className="page-subtitle">Planning de l'atelier et événements familiaux</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <span className="btn-icon">📋</span>
            Vue Semaine
          </button>
          <button className="btn-primary">
            <span className="btn-icon">➕</span>
            Nouvel Événement
          </button>
        </div>
      </div>

      {/* Aujourd'hui */}
      <div className="today-section">
        <h3>📌 Aujourd'hui - {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
        <div className="today-events">
          {todayEvents.length > 0 ? (
            todayEvents.map(event => (
              <div key={event.id} className={`today-event ${event.type || 'production'}`}>
                <div className="event-time">{event.time}</div>
                <div className="event-content">
                  <div className="event-title">{event.task || event.title}</div>
                  {event.client && <div className="event-client">Client: {event.client}</div>}
                  {event.team && <div className="event-team">Équipe: {event.team}</div>}
                </div>
                <div className={`event-status ${event.status || event.type}`}>
                  {event.status === 'en-cours' ? 'En cours' : 
                   event.status === 'planifié' ? 'Planifié' :
                   event.type === 'famille' ? 'Familial' : 
                   event.type === 'celebration' ? 'Célébration' : 'Autre'}
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <span className="no-events-icon">🎉</span>
              <p>Aucun événement prévu pour aujourd'hui</p>
            </div>
          )}
        </div>
      </div>

      {/* Semaine en cours */}
      <div className="week-section">
        <h3>📆 Semaine du 15 au 21 Décembre 2024</h3>
        <div className="week-grid">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
            <div key={day} className="day-column">
              <div className="day-header">{day} {15 + index}</div>
              <div className="day-events">
                {productionEvents
                  .filter(event => {
                    const eventDay = parseInt(event.date.split('-')[2]);
                    return eventDay === 15 + index;
                  })
                  .map(event => (
                    <div key={event.id} className="production-event">
                      <div className="event-time-small">{event.time}</div>
                      <div className="event-task">{event.task}</div>
                      <div className="event-client-small">{event.client}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Événements à venir */}
      <div className="upcoming-section">
        <div className="upcoming-production">
          <h3>🏭 Production à venir</h3>
          <div className="upcoming-list">
            {productionEvents.slice(0, 5).map(event => (
              <div key={event.id} className="upcoming-item">
                <div className="upcoming-date">{event.date}</div>
                <div className="upcoming-content">
                  <div className="upcoming-title">{event.task}</div>
                  <div className="upcoming-details">
                    <span className="detail">{event.client}</span>
                    <span className="detail">• {event.time}</span>
                    <span className="detail">• {event.team}</span>
                  </div>
                </div>
                <button className="upcoming-action">📋</button>
              </div>
            ))}
          </div>
        </div>

        <div className="upcoming-family">
          <h3>👨‍👩‍👧‍👦 Événements Familiaux</h3>
          <div className="family-events">
            {familyEvents.map(event => (
              <div key={event.id} className="family-event">
                <div className="family-date">{event.date}</div>
                <div className="family-content">
                  <div className="family-title">{event.title}</div>
                  <div className="family-details">
                    <span className="detail">{event.time}</span>
                    <span className="detail">• {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques calendrier */}
      <div className="calendar-stats">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-value">{productionEvents.length}</div>
            <div className="stat-label">Tâches cette semaine</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍👩‍👧‍👦</div>
          <div className="stat-content">
            <div className="stat-value">{familyEvents.length}</div>
            <div className="stat-label">Événements familiaux</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">4</div>
            <div className="stat-label">Jours pleins cette semaine</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">32h</div>
            <div className="stat-label">Heures de production planifiées</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;