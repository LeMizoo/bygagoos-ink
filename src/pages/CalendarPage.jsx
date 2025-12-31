import React, { useState, useEffect } from 'react';
import { MobileLayout, MobileSection, MobileCard } from '../components/layout/MobileLayout';
import './CalendarPage.css';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  
  // Données de démo
  const productionEvents = [
    {
      id: 1,
      date: '2024-12-16',
      time: '09:00-12:00',
      client: 'Boutique MadaStyle',
      task: 'Impression T-shirts',
      team: 'Papa, Junior',
      status: 'en_cours',
      priority: 'haute',
      location: 'Atelier principal'
    },
    {
      id: 2,
      date: '2024-12-16',
      time: '14:00-16:00',
      client: 'École Les Génies',
      task: 'Séchage Polos',
      team: 'Maman',
      status: 'planifié',
      priority: 'moyenne',
      location: 'Zone séchage'
    },
    {
      id: 3,
      date: '2024-12-17',
      time: '08:00-11:00',
      client: 'Startup TechMG',
      task: 'Design Sweatshirts',
      team: 'Papa',
      status: 'planifié',
      priority: 'haute',
      location: 'Bureau design'
    },
    {
      id: 4,
      date: '2024-12-17',
      time: '15:00-16:00',
      client: 'Restaurant La Terrasse',
      task: 'Livraison tabliers',
      team: 'Soeur',
      status: 'livraison',
      priority: 'normale',
      location: 'Client'
    },
  ];

  const familyEvents = [
    {
      id: 5,
      date: '2024-12-16',
      time: '18:00',
      title: 'Réunion famille',
      type: 'famille',
      location: 'Maison',
      description: 'Planning semaine prochaine'
    },
    {
      id: 6,
      date: '2024-12-20',
      time: 'Toute la journée',
      title: 'Anniversaire Papa',
      type: 'celebration',
      location: 'Atelier',
      description: 'Célébration en famille'
    },
    {
      id: 7,
      date: '2024-12-24',
      time: 'Journée',
      title: 'Fermeture Noël',
      type: 'fermeture',
      location: 'Atelier',
      description: 'Fermeture annuelle'
    },
  ];

  // Format de la date d'aujourd'hui
  const today = new Date().toISOString().split('T')[0];
  
  // Événements d'aujourd'hui
  const todayEvents = [...productionEvents, ...familyEvents].filter(event => event.date === today);

  // Générer les jours de la semaine
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Lundi
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const weekDays = getWeekDays();

  // Action button
  const actionButton = (
    <button
      onClick={() => navigate('/app/calendar/new')}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      aria-label="Nouvel événement"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="hidden sm:inline">Nouveau</span>
    </button>
  );

  return (
    <MobileLayout 
      title="Calendrier" 
      actionButton={actionButton}
    >
      {/* Sélecteur de vue */}
      <MobileSection>
        <div className="view-selector">
          <button
            className={`view-button ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Jour
          </button>
          <button
            className={`view-button ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Semaine
          </button>
          <button
            className={`view-button ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Mois
          </button>
        </div>
      </MobileSection>

      {/* Aujourd'hui */}
      <MobileSection title={`📌 Aujourd'hui - ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}`}>
        {todayEvents.length > 0 ? (
          <div className="today-events-list">
            {todayEvents.map(event => (
              <div key={event.id} className={`today-event ${event.type || 'production'}`}>
                <div className="event-time-badge">
                  {event.time}
                </div>
                <div className="event-content">
                  <div className="event-title">{event.task || event.title}</div>
                  {event.client && <div className="event-client">{event.client}</div>}
                  {event.team && <div className="event-team">{event.team}</div>}
                  {event.location && <div className="event-location">{event.location}</div>}
                </div>
                <div className={`event-status ${event.status || event.type}`}>
                  {event.status === 'en_cours' ? 'En cours' : 
                   event.status === 'planifié' ? 'Planifié' :
                   event.type === 'famille' ? 'Familial' : 
                   event.type === 'celebration' ? 'Célébration' : 
                   event.type === 'fermeture' ? 'Fermeture' : 'Autre'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events-today">
            <div className="no-events-icon">🎉</div>
            <p>Aucun événement prévu pour aujourd'hui</p>
            <button className="btn-add-event">
              Ajouter un événement
            </button>
          </div>
        )}
      </MobileSection>

      {/* Semaine en cours (Vue mobile) */}
      {viewMode === 'week' && (
        <MobileSection title="📆 Semaine en cours">
          <div className="week-view-mobile">
            {weekDays.map((day, index) => {
              const dateStr = day.toISOString().split('T')[0];
              const dayEvents = [...productionEvents, ...familyEvents].filter(event => event.date === dateStr);
              const isToday = dateStr === today;
              
              return (
                <div key={index} className={`day-card ${isToday ? 'today' : ''}`}>
                  <div className="day-header">
                    <div className="day-name">{day.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                    <div className="day-number">{day.getDate()}</div>
                  </div>
                  <div className="day-events">
                    {dayEvents.slice(0, 2).map(event => (
                      <div key={event.id} className="day-event-item">
                        <div className="event-time-small">{event.time.split('-')[0]}</div>
                        <div className="event-title-small">{event.task || event.title}</div>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="more-events">+{dayEvents.length - 2} autres</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </MobileSection>
      )}

      {/* Production à venir */}
      <MobileSection title="🏭 Production à venir">
        <div className="upcoming-production-list">
          {productionEvents.map(event => (
            <div key={event.id} className="upcoming-item">
              <div className="upcoming-date">
                <div className="date-day">{new Date(event.date).getDate()}</div>
                <div className="date-month">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}</div>
              </div>
              <div className="upcoming-content">
                <div className="upcoming-title">{event.task}</div>
                <div className="upcoming-details">
                  <span className="detail">{event.client}</span>
                  <span className="detail">• {event.time}</span>
                  <span className="detail">• {event.team}</span>
                </div>
                <div className={`upcoming-priority priority-${event.priority}`}>
                  {event.priority === 'haute' ? 'Haute' : 
                   event.priority === 'moyenne' ? 'Moyenne' : 'Normale'}
                </div>
              </div>
              <button className="upcoming-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V3M12 15L8 11M12 15L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </MobileSection>

      {/* Événements familiaux */}
      <MobileSection title="👨‍👩‍👧‍👦 Événements familiaux">
        <div className="family-events-list">
          {familyEvents.map(event => (
            <div key={event.id} className="family-event-item">
              <div className="family-event-icon">
                {event.type === 'famille' ? '🏡' : 
                 event.type === 'celebration' ? '🎉' : '⏸️'}
              </div>
              <div className="family-event-content">
                <div className="family-event-title">{event.title}</div>
                <div className="family-event-details">
                  <span className="detail">{event.date}</span>
                  <span className="detail">• {event.time}</span>
                  {event.location && <span className="detail">• {event.location}</span>}
                </div>
                {event.description && (
                  <div className="family-event-desc">{event.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </MobileSection>

      {/* Stats calendrier */}
      <MobileSection title="📊 Statistiques">
        <div className="calendar-stats-grid">
          <div className="calendar-stat">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-value">{productionEvents.length}</div>
              <div className="stat-label">Tâches cette semaine</div>
            </div>
          </div>
          <div className="calendar-stat">
            <div className="stat-icon">👨‍👩‍👧‍👦</div>
            <div className="stat-content">
              <div className="stat-value">{familyEvents.length}</div>
              <div className="stat-label">Événements familiaux</div>
            </div>
          </div>
          <div className="calendar-stat">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-value">32h</div>
              <div className="stat-label">Heures de production</div>
            </div>
          </div>
          <div className="calendar-stat">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-value">85%</div>
              <div className="stat-label">Taux accomplissement</div>
            </div>
          </div>
        </div>
      </MobileSection>
    </MobileLayout>
  );
};

export default CalendarPage;