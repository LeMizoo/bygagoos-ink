import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images pour le slider
  const slides = [
    {
      id: 1,
      image: '/images/team-family.jpg',
      title: 'La Famille ByGagoos',
      subtitle: 'Une équipe, une passion, un métier',
      slogan: 'Notre équipe familiale dédiée à l\'excellence textile depuis 2025'
    },
    {
      id: 2,
      image: '/production/atelier-serigraphie.jpg',
      title: 'Notre Atelier',
      subtitle: 'Technologie & Savoir-faire',
      slogan: 'Équipements modernes pour une impression de qualité supérieure'
    },
    {
      id: 3,
      image: '/production/equipe-serigraphie.jpg',
      title: 'Expertise en Sérigraphie',
      subtitle: 'Art & Précision',
      slogan: 'Chaque détail compte pour créer des textiles uniques'
    },
    {
      id: 4,
      image: '/images/inauguration.jpg',
      title: 'Inauguration 2025',
      subtitle: 'Un nouveau départ',
      slogan: 'Le lancement officiel de notre entreprise familiale'
    }
  ];

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-container">
      {/* SLIDER SECTION - Tout en haut */}
      <section className="slider-section">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <p className="slide-slogan">{slide.slogan}</p>
              </div>
            </div>
          ))}
          
          {/* Contrôles du slider */}
          <button className="slider-btn prev" onClick={prevSlide} aria-label="Slide précédent">
            ❮
          </button>
          <button className="slider-btn next" onClick={nextSlide} aria-label="Slide suivant">
            ❯
          </button>
          
          {/* Indicateurs */}
          <div className="slider-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="logo-display">
              <img 
                src="/logo.png"
                alt="ByGagoos Ink Logo" 
                className="hero-logo"
              />
              <h1 className="hero-title">
                <span className="highlight">ByGagoos</span> Ink
              </h1>
            </div>
            
            <p className="hero-subtitle">
              Sérigraphie Textile d'Excellence • Inauguration 18 mai 2025
            </p>
            
            <p className="hero-description">
              Une entreprise familiale malgache spécialisée dans la création textile sur mesure.
              <br />
              <span className="hero-motto">L'art de l'impression rencontre l'âme du Madagascar.</span>
            </p>
            
            <div className="hero-actions">
              <button onClick={() => navigate('/gallery')} className="btn-primary">
                <span className="icon">📸</span>
                Découvrir notre galerie
              </button>
              
              <button onClick={() => navigate('/family')} className="btn-secondary">
                <span className="icon">👨‍👩‍👧‍👦</span>
                Rencontrer l'équipe
              </button>
              
              <button onClick={() => navigate('/login')} className="btn-tertiary">
                <span className="icon">🔐</span>
                Espace professionnel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            <span className="title-icon">🌟</span>
            Pourquoi choisir ByGagoos Ink ?
          </h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏭</div>
              <h3>Production Locale</h3>
              <p>Fabrication 100% malgache avec des matériaux de qualité premium</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Équipe Familiale</h3>
              <p>4 experts passionnés dédiés à votre projet</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Création Sur Mesure</h3>
              <p>Design personnalisé adapté à votre identité visuelle</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Rapidité d'Exécution</h3>
              <p>Délais respectés pour vos événements et projets urgents</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Qualité Garantie</h3>
              <p>Contrôle qualité strict à chaque étape de production</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Service Complet</h3>
              <p>De la conception à la livraison, nous vous accompagnons</p>
            </div>
          </div>
        </div>
      </section>

      {/* REALISATIONS SECTION */}
      <section className="portfolio-section">
        <div className="container">
          <h2 className="section-title">
            <span className="title-icon">📦</span>
            Nos Réalisations
          </h2>
          
          <div className="portfolio-grid">
            <div className="portfolio-item" style={{ backgroundImage: 'url(/production/marcel-prod.jpg)' }}>
              <div className="portfolio-overlay">
                <h3>T-shirts Entreprise</h3>
                <p>Uniformes corporatifs sur mesure</p>
              </div>
            </div>
            
            <div className="portfolio-item" style={{ backgroundImage: 'url(/production/mbin-prod.jpg)' }}>
              <div className="portfolio-overlay">
                <h3>Événements Spéciaux</h3>
                <p>Textiles pour mariages et célébrations</p>
              </div>
            </div>
            
            <div className="portfolio-item" style={{ backgroundImage: 'url(/production/miadrisoa-prod.jpg)' }}>
              <div className="portfolio-overlay">
                <h3>Produits Promotionnels</h3>
                <p>Objets publicitaires personnalisés</p>
              </div>
            </div>
          </div>
          
          <div className="portfolio-cta">
            <button onClick={() => navigate('/gallery')} className="portfolio-btn">
              <span className="icon">🖼️</span>
              Voir toutes nos réalisations
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à concrétiser votre projet textile ?</h2>
            <p className="cta-subtitle">
              Que ce soit pour votre entreprise, un événement spécial ou un projet personnel,
              nous créons le textile parfait pour vous.
            </p>
            
            <div className="cta-buttons">
              <button onClick={() => navigate('/gallery')} className="cta-btn-primary">
                <span className="icon">📸</span>
                Explorer notre galerie
              </button>
              
              <button onClick={() => navigate('/family')} className="cta-btn-secondary">
                <span className="icon">👥</span>
                Connaître notre équipe
              </button>
              
              <button onClick={() => navigate('/login')} className="cta-btn-tertiary">
                <span className="icon">💼</span>
                Devis professionnel
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;