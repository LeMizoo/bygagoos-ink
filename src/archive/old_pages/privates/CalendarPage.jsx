import React, { useState, useEffect } from 'react';
import './CalendarPage.css';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month'); // 'month', 'week', 'day'

  // Données de démo
  const demoEvents = [
    {
      id: 1,
      title: 'Livraison Commande #245',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: '14:00',
      type: 'delivery',
      client: 'Entreprise ABC',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Réunion Client - Projet Logo',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: '10:30',
      type: 'meeting',
      client: 'Café Resto',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Contrôle Qualité Batch #12',
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: '09:00',
      type: 'production',
      client: 'Interne',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Formation Sérigraphie Nouvelle Machine',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: '08:00',
      type: 'training',
      client: 'Équipe',
      status: 'confirmed'
    },
    {
      id: 5,
      title: 'Commande Urgente - École XYZ',
      date: new Date(),
      time: '16:00',
      type: 'order',
      client: 'École XYZ',
      status: 'urgent'
    }
  ];

  useEffect(() => {
    setEvents(demoEvents);
  }, []);

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'delivery': return '#10b981';
      case 'meeting': return '#3b82f6';
      case 'production': return '#8b5cf6';
      case 'training': return '#f59e0b';
      case 'order': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getEventStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'urgent': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="header-content">
          <h1 className="calendar-title">📅 Calendrier des Commandes</h1>
          <p className="calendar-subtitle">
            Planifiez et suivez toutes vos activités et livraisons
          </p>
          
          <div className="calendar-controls">
            <div className="date-display">
              <button className="nav-button" onClick={() => setCurrentDate(new Date())}>
                Aujourd'hui
              </button>
              <div className="current-date">
                {formatDate(currentDate)}
              </div>
            </div>
            
            <div className="view-selector">
              <button 
                className={`view-button ${view === 'month' ? 'active' : ''}`}
                onClick={() => setView('month')}
              >
                Mois
              </button>
              <button 
                className={`view-button ${view === 'week' ? 'active' : ''}`}
                onClick={() => setView('week')}
              >
                Semaine
              </button>
              <button 
                className={`view-button ${view === 'day' ? 'active' : ''}`}
                onClick={() => setView('day')}
              >
                Jour
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="calendar-content">
        {/* Vue principale */}
        <div className="calendar-main">
          {/* Vue Mois (simplifiée) */}
          {view === 'month' && (
            <div className="month-view">
              <div className="month-header">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                  <div key={day} className="day-header">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="month-grid">
                {/* Simuler 35 jours pour un mois */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 15);
                  const dayEvents = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  return (
                    <div 
                      key={i} 
                      className={`month-day ${isToday ? 'today' : ''} ${day.getMonth() !== currentDate.getMonth() ? 'other-month' : ''}`}
                    >
                      <div className="day-number">{day.getDate()}</div>
                      {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          className="day-event"
                          style={{ backgroundColor: getEventTypeColor(event.type) + '20' }}
                        >
                          <div className="event-dot" style={{ backgroundColor: getEventTypeColor(event.type) }}></div>
                          <span className="event-title">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Vue Liste (par défaut sur mobile) */}
          <div className="list-view">
            <div className="view-header">
              <h2 className="view-title">Événements à venir</h2>
              <button className="add-event-button">
                + Ajouter un événement
              </button>
            </div>

            <div className="events-list">
              {getUpcomingEvents().map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <div 
                      className="event-type-badge"
                      style={{ backgroundColor: getEventTypeColor(event.type) }}
                    >
                      {event.type === 'delivery' ? '🚚' :
                       event.type === 'meeting' ? '🤝' :
                       event.type === 'production' ? '🏭' :
                       event.type === 'training' ? '🎓' : '📋'}
                    </div>
                    <div className="event-info">
                      <h3 className="event-name">{event.title}</h3>
                      <div className="event-meta">
                        <span className="event-date">
                          📅 {event.date.toLocaleDateString('fr-FR', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </span>
                        <span className="event-time">⏰ {event.time}</span>
                        <span className="event-client">👤 {event.client}</span>
                      </div>
                    </div>
                    <div 
                      className="event-status"
                      style={{ 
                        backgroundColor: getEventStatusColor(event.status) + '20',
                        color: getEventStatusColor(event.status)
                      }}
                    >
                      {event.status === 'confirmed' ? '✓ Confirmé' :
                       event.status === 'pending' ? '⏳ En attente' : '❗ Urgent'}
                    </div>
                  </div>
                  
                  <div className="event-actions">
                    <button className="action-button details-button">
                      👁️ Détails
                    </button>
                    <button className="action-button edit-button">
                      ✏️ Modifier
                    </button>
                    {event.type === 'delivery' && (
                      <button className="action-button delivery-button">
                        🚚 Suivi livraison
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="calendar-sidebar">
          {/* Statistiques */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">📊 Statistiques du mois</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Événements</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🚚</div>
                <div className="stat-content">
                  <div className="stat-value">8</div>
                  <div className="stat-label">Livraisons</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🤝</div>
                <div className="stat-content">
                  <div className="stat-value">4</div>
                  <div className="stat-label">Réunions</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">❗</div>
                <div className="stat-content">
                  <div className="stat-value">2</div>
                  <div className="stat-label">Urgents</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">🔍 Filtres</h3>
            <div className="filters-list">
              <label className="filter-option">
                <input type="checkbox" defaultChecked />
                <span className="filter-label">Livraisons</span>
                <span className="filter-count">8</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" defaultChecked />
                <span className="filter-label">Réunions</span>
                <span className="filter-count">4</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" defaultChecked />
                <span className="filter-label">Production</span>
                <span className="filter-count">5</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span className="filter-label">Formations</span>
                <span className="filter-count">1</span>
              </label>
            </div>
          </div>

          {/* Prochaines échéances */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">⏳ Échéances critiques</h3>
            <div className="deadlines-list">
              {events
                .filter(event => event.status === 'urgent')
                .map(event => (
                  <div key={event.id} className="deadline-item">
                    <div className="deadline-icon">❗</div>
                    <div className="deadline-info">
                      <div className="deadline-title">{event.title}</div>
                      <div className="deadline-date">
                        {event.date.toLocaleDateString('fr-FR')} à {event.time}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">⚡ Actions rapides</h3>
            <div className="quick-actions">
              <button className="quick-action-button">
                + Nouvelle commande
              </button>
              <button className="quick-action-button">
                📅 Planifier livraison
              </button>
              <button className="quick-action-button">
                🤝 Ajouter réunion
              </button>
              <button className="quick-action-button">
                📤 Exporter calendrier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;