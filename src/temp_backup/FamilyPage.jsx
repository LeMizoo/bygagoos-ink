import React from 'react';
import './FamilyPage.css';

const FamilyPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Tovoniaina RAHENDRISON',
      role: 'Super-Admin - Fondateur & Structure',
      email: 'tovoniaina.rahendrison@gmail.com',
      phone: '+261 34 07 004 05',
      login: 'Tovo',
      responsibilities: [
        'Vision stratégique de l\'entreprise',
        'Structure et développement',
        'Direction générale'
      ]
    },
    {
      id: 2,
      name: 'Volatiana RANDRIANARISOA',
      role: 'Admin - Direction Générale, Inspiration & Créativité',
      email: 'dedettenadia@gmail.com',
      login: 'Vola',
      responsibilities: [
        'Direction artistique et créative',
        'Inspiration des collections',
        'Relations presse et médias'
      ]
    },
    {
      id: 3,
      name: 'Miantsatiana RAHENDRISON (Miantsa)',
      role: 'Admin - Direction des Opérations, Création & Design',
      email: 'miantsatianarahendrison@gmail.com',
      login: 'Miantsa',
      responsibilities: [
        'Gestion de la production',
        'Création et design des collections',
        'Contrôle qualité'
      ]
    },
    {
      id: 4,
      name: 'Tia Faniry RAHENDRISON (Faniry)',
      role: 'Admin - Direction Administrative, Communication & Relations',
      email: 'fanirytia17@gmail.com',
      login: 'Faniry',
      responsibilities: [
        'Communication et marketing',
        'Relations clients',
        'Administration générale'
      ]
    }
  ];

  return (
    <div className="family-page">
      <div className="container">
        <div className="family-header">
          <h1>Notre Famille ByGagoos</h1>
          <p className="subtitle">
            Une équipe passionnée, une famille soudée
          </p>
          <p>
            Derrière chaque création ByGagoos Ink se cache une équipe dévouée 
            et passionnée. Nous ne sommes pas seulement des collègues, nous 
            sommes une famille unie par la même vision : créer des vêtements 
            qui racontent des histoires.
          </p>
        </div>

        <div className="team-section">
          <h2>L'Équipe de Direction</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="member-avatar">
                  <div className="avatar-initials">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  
                  <div className="member-contact">
                    <div className="contact-item">
                      <span className="contact-label">Email :</span>
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </div>
                    {member.phone && (
                      <div className="contact-item">
                        <span className="contact-label">Téléphone :</span>
                        <a href={`tel:${member.phone.replace(/\s/g, '')}`}>
                          {member.phone}
                        </a>
                      </div>
                    )}
                    <div className="contact-item">
                      <span className="contact-label">Login :</span>
                      <span className="login-badge">{member.login}</span>
                    </div>
                  </div>

                  <div className="member-responsibilities">
                    <h4>Responsabilités :</h4>
                    <ul>
                      {member.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="family-values">
          <h2>Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Passion</h3>
              <p>Nous mettons tout notre cœur dans chaque création</p>
            </div>
            <div className="value-card">
              <h3>Qualité</h3>
              <p>Excellence dans chaque détail, de la conception à la réalisation</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Recherche constante de nouvelles techniques et designs</p>
            </div>
            <div className="value-card">
              <h3>Collaboration</h3>
              <p>Travailler ensemble pour des résultats exceptionnels</p>
            </div>
          </div>
        </div>

        <div className="family-message">
          <h2>Notre Histoire</h2>
          <p>
            ByGagoos Ink est née de la vision commune de quatre passionnés 
            désireux de révolutionner l'univers du textile personnalisé à Madagascar. 
            Ce qui a commencé comme un projet familial est rapidement devenu 
            une référence dans le domaine de la sérigraphie et de la création textile.
          </p>
          <p>
            Aujourd'hui, forts de notre expérience et de notre savoir-faire, 
            nous continuons à grandir tout en restant fidèles à nos valeurs 
            fondatrices : l'authenticité, la qualité et l'innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyPage;
