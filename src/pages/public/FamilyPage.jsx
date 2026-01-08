// frontend/src/pages/public/FamilyPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FamilyPage.css';

const FamilyPage = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Tovoniaina RAHENDRISON",
      role: "Directeur Général & Fondateur",
      image: "/profiles/tovoniaina.jpg",
      bio: "Expert en impression textile avec 10 ans d'expérience. Passionné par l'innovation et la qualité.",
      email: "tovoniaina.rahendrison@gmail.com",
      phone: "+261 34 11 111 11",
      skills: ["Gestion", "Innovation", "Relations Clients"]
    },
    {
      id: 2,
      name: "Volatiana RAHENDRISON",
      role: "Responsable Production & Design",
      image: "/profiles/volatiana.jpg",
      bio: "Spécialiste des procédés d'impression. Garant de la qualité et des délais de production.",
      email: "dedettenadia@gmail.com",
      phone: "+261 34 22 222 22",
      skills: ["Production", "Qualité", "Design"]
    },
    {
      id: 3,
      name: "Miantsatiana RAHENDRISON",
      role: "Responsable Commercial & Marketing",
      image: "/profiles/miantsatiana.jpg",
      bio: "Développe les partenariats et assure la satisfaction client au quotidien.",
      email: "miantsatianarahendrison@gmail.com",
      phone: "+261 34 33 333 33",
      skills: ["Vente", "Relation Client", "Marketing"]
    },
    {
      id: 4,
      name: "Faniry RAHENDRISON",
      role: "Responsable Financier & Logistique",
      image: "/profiles/tia-faniry.jpg",
      bio: "Gestion financière et logistique optimisée pour un service de qualité.",
      email: "fanirytia17@gmail.com",
      phone: "+261 34 44 444 44",
      skills: ["Finance", "Logistique", "Planification"]
    }
  ];

  const productionTeam = [
    {
      id: 1,
      name: "Marcel",
      role: "Technicien Sérigraphie Senior",
      image: "/production/marcel-prod.jpg",
      experience: "8 ans",
      specialty: "Cadrage & Impression"
    },
    {
      id: 2,
      name: "Marcelin",
      role: "Opérateur Machine",
      image: "/production/marcelin-prod.jpg",
      experience: "5 ans",
      specialty: "Impression Automatisée"
    },
    {
      id: 3,
      name: "Mbinina",
      role: "Responsable Finition",
      image: "/production/mbin-prod.jpg",
      experience: "6 ans",
      specialty: "Séchage & Finition"
    },
    {
      id: 4,
      name: "Miadrisoa",
      role: "Technicien Qualité",
      image: "/production/miadrisoa-prod.jpg",
      experience: "4 ans",
      specialty: "Contrôle Qualité"
    },
    {
      id: 5,
      name: "Ntsoa",
      role: "Préparateur Commande",
      image: "/production/ntsoa-prod.jpg",
      experience: "3 ans",
      specialty: "Préparation & Emballage"
    }
  ];

  return (
    <div className="family-page-container">
      {/* Hero Section */}
      <header className="family-hero">
        <div className="hero-content">
          <h1>Notre Famille ByGagoos Ink</h1>
          <p className="hero-subtitle">
            Une équipe passionnée, unie par l'excellence et l'innovation textile
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Clients Satisfaits</span>
            </div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Ans d'Expérience</span>
            </div>
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Projets Réalisés</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Client</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/team-family.jpg" 
            alt="Équipe familiale ByGagoos Ink" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/logo.png';
            }}
          />
        </div>
      </header>

      {/* Team Section */}
      <section className="team-section">
        <h2>L'Équipe de Direction</h2>
        <p className="section-subtitle">
          Les membres fondateurs qui guident notre entreprise vers l'excellence
        </p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                  }}
                />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
                
                <div className="team-contact">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>{member.email}</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="team-skills">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Team */}
      <section className="production-section">
        <div className="section-header">
          <h2>L'Âme de Notre Production</h2>
          <p>Des artisans passionnés qui donnent vie à vos projets</p>
        </div>

        <div className="production-hero">
          <img 
            src="/production/atelier-serigraphie.jpg" 
            alt="Atelier de sérigraphie"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/logo.png';
            }}
          />
          <div className="production-description">
            <h3>Notre Atelier d'Excellence</h3>
            <p>
              Dans notre atelier équipé des dernières technologies, chaque membre 
              de l'équipe apporte son expertise unique pour garantir la qualité 
              de chaque impression.
            </p>
          </div>
        </div>

        <div className="production-grid">
          {productionTeam.map((worker) => (
            <div key={worker.id} className="worker-card">
              <div className="worker-image">
                <img 
                  src={worker.image} 
                  alt={worker.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                  }}
                />
                <div className="worker-experience">
                  <span>{worker.experience}</span>
                </div>
              </div>
              <div className="worker-info">
                <h4>{worker.name}</h4>
                <span className="worker-role">{worker.role}</span>
                <div className="worker-specialty">
                  <i className="fas fa-star"></i>
                  <span>{worker.specialty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Nos Valeurs</h2>
        <div className="values-grid">
          <div className="value-card">
            <i className="fas fa-medal"></i>
            <h3>Qualité</h3>
            <p>Chaque produit est inspecté minutieusement</p>
          </div>
          <div className="value-card">
            <i className="fas fa-clock"></i>
            <h3>Ponctualité</h3>
            <p>Respect strict des délais convenus</p>
          </div>
          <div className="value-card">
            <i className="fas fa-lightbulb"></i>
            <h3>Innovation</h3>
            <p>Techniques d'impression à la pointe</p>
          </div>
          <div className="value-card">
            <i className="fas fa-users"></i>
            <h3>Collaboration</h3>
            <p>Travail d'équipe et synergie</p>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview">
        <h2>Moments de Vie d'Équipe</h2>
        <div className="gallery-grid">
          <img src="/production/equipe-prod-02.jpg" alt="Équipe production 1" />
          <img src="/production/equipe-prod-03.jpg" alt="Équipe production 2" />
          <img src="/production/equipe-prod-04.jpg" alt="Équipe production 3" />
          <img src="/production/equipe-prod-06.jpg" alt="Équipe production 4" />
        </div>
        <button 
          className="btn btn-outline"
          onClick={() => navigate('/gallery')}
        >
          Voir toute la galerie
        </button>
      </section>

      {/* CTA Section */}
      <section className="family-cta">
        <h2>Rejoignez Notre Famille de Clients</h2>
        <p>
          Confiez-nous vos projets d'impression textile et bénéficiez 
          de l'expertise de toute notre équipe.
        </p>
        <div className="cta-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/register')}
          >
            Devenir Client
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/login')}
          >
            Nous Contacter
          </button>
        </div>
      </section>
    </div>
  );
};

export default FamilyPage;