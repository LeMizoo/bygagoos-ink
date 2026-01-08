import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ==========================
     SLIDER INAUGURATION - Uniquement images existantes
  ========================== */
  const inaugurationSlides = [
    {
      id: 1,
      title: "Inauguration officielle",
      subtitle: "ByGagoos Ink ouvre ses portes",
      text: "Une entreprise familiale malgache dédiée à la sérigraphie textile sur mesure.",
      date: "18 mai 2025 • Madagascar 🇲🇬",
      image: "/inauguration.jpg"
    },
    {
      id: 2,
      title: "Une aventure familiale",
      subtitle: "Passion & savoir-faire",
      text: "Chaque création est portée par l'expertise, la créativité et l'amour du métier.",
      date: "Depuis 2025",
      image: "/team-family.jpg"
    },
    {
      id: 3,
      title: "Création textile",
      subtitle: "Qualité & identité",
      text: "Nous transformons vos idées en impressions textiles uniques.",
      date: "Made in Madagascar 🇲🇬",
      image: "/production/atelier-serigraphie.jpg"
    }
  ];

  /* ==========================
     ÉQUIPE FAMILIALE
  ========================== */
  const teamMembers = [
    {
      id: 1,
      name: 'Tovoniaina RAHENDRISON',
      shortName: 'Tovo (Dada)',
      email: 'tovoniaina.rahendrison@gmail.com',
      phone: '+261 34 43 593 30',
      role: 'Fondateur & Structure',
      description: 'Responsable de la vision stratégique et de la structure de l\'entreprise',
      image: '/profiles/tovoniaina.jpg',
      emoji: '👨‍💻',
      category: 'team'
    },
    {
      id: 2,
      name: 'Volatiana RANDRIANARISOA',
      shortName: 'Vola (Neny)',
      email: 'dedettenadia@gmail.com',
      phone: '',
      role: 'Direction Générale - Inspiration & Créativité',
      description: 'Dirige l\'inspiration artistique et la créativité de l\'entreprise',
      image: '/profiles/volatiana.jpg',
      emoji: '🎨',
      category: 'team'
    },
    {
      id: 3,
      name: 'Miantsatiana RAHENDRISON',
      shortName: 'Miantsa',
      email: 'miantsatianarahendrison@gmail.com',
      phone: '',
      role: 'Direction des Opérations - Création & Design',
      description: 'Gère la production, la création et le design des collections',
      image: '/profiles/miantsatiana.jpg',
      emoji: '👩‍🔧',
      category: 'team'
    },
    {
      id: 4,
      name: 'Tia Faniry RAHENDRISON',
      shortName: 'Faniry',
      email: 'fanirytia17@gmail.com',
      phone: '',
      role: 'Direction Administrative - Communication & Relations',
      description: 'Responsable de la communication, administration et relations clients',
      image: '/profiles/tia-faniry.jpg',
      emoji: '💼',
      category: 'team'
    }
  ];

  const imageCategories = {
    all: 'Toutes les images',
    team: 'L\'Équipe Familiale',
    production: 'Atelier de Production',
    creations: 'Nos Créations',
    events: 'Événements'
  };

  useEffect(() => {
    // Autoplay du slider
    const interval = setInterval(() => {
      setCurrentSlide(prev =>
        prev === inaugurationSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    // Gestion du scroll
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    
    // Charger les images de la galerie - UNIQUEMENT images existantes
    const loadImages = () => {
      try {
        const galleryImagesList = [
          // Équipe familiale
          ...teamMembers.map(member => ({
            id: member.id,
            url: member.image,
            thumbnail: member.image,
            title: member.shortName,
            fullName: member.name,
            category: 'team',
            description: member.description,
            role: member.role,
            email: member.email,
            phone: member.phone,
            emoji: member.emoji
          })),
          
          // Production - UNIQUEMENT images qui existent
          {
            id: 5,
            url: '/production/atelier-serigraphie.jpg',
            thumbnail: '/production/atelier-serigraphie.jpg',
            title: 'Notre Atelier',
            category: 'production',
            description: 'Espace de création où la magie opère',
            details: 'Machines professionnelles & environnement contrôlé'
          },
          {
            id: 6,
            url: '/production/equipe-serigraphie.jpg',
            thumbnail: '/production/equipe-serigraphie.jpg',
            title: 'Équipe en Action',
            category: 'production',
            description: 'Précision et expertise à chaque étape',
            details: 'Processus qualité rigoureux'
          },
          {
            id: 7,
            url: '/production/marcel-prod.jpg',
            thumbnail: '/production/marcel-prod.jpg',
            title: 'Expertise Technique',
            category: 'production',
            description: 'Maitrise des techniques avancées',
            details: 'Formation continue & innovation'
          },
          {
            id: 15,
            url: '/production/marcelin-prod.jpg',
            thumbnail: '/production/marcelin-prod.jpg',
            title: 'Production Marcelin',
            category: 'production',
            description: 'Travail minutieux sur nos machines',
            details: 'Qualité garantie'
          },
          {
            id: 16,
            url: '/production/mbin-prod.jpg',
            thumbnail: '/production/mbin-prod.jpg',
            title: 'Production Mbin',
            category: 'production',
            description: 'Processus de contrôle qualité',
            details: 'Vérification étape par étape'
          },
          {
            id: 17,
            url: '/production/miadrisoa-prod.jpg',
            thumbnail: '/production/miadrisoa-prod.jpg',
            title: 'Production Miadrisoa',
            category: 'production',
            description: 'Expertise en finition',
            details: 'Dernières touches avant livraison'
          },
          {
            id: 18,
            url: '/production/ntsoa-prod.jpg',
            thumbnail: '/production/ntsoa-prod.jpg',
            title: 'Production Ntsoa',
            category: 'production',
            description: 'Préparation des commandes',
            details: 'Organisation et logistique'
          },
          
          // Images générales
          {
            id: 8,
            url: '/team-family.jpg',
            thumbnail: '/team-family.jpg',
            title: 'L\'Esprit Familial',
            category: 'team',
            description: 'Plus qu\'une entreprise, une famille',
            details: 'Cohésion & valeurs partagées'
          },
          {
            id: 9,
            url: '/inauguration.jpg',
            thumbnail: '/inauguration.jpg',
            title: 'Inauguration Officielle',
            category: 'events',
            description: '18 mai 2025 - Début de notre aventure',
            details: 'Lancement officiel de ByGagoos Ink'
          },
          {
            id: 10,
            url: '/logo.png',
            thumbnail: '/logo.png',
            title: 'Notre Identité',
            category: 'creations',
            description: 'Logo ByGagoos Ink',
            details: 'Design : Miantsa, 2025'
          },
          {
            id: 19,
            url: '/bygagoos-large.png',
            thumbnail: '/bygagoos-large.png',
            title: 'ByGagoos Large',
            category: 'creations',
            description: 'Logo version grande',
            details: 'Identité visuelle complète'
          },
          
          // Ajout des autres images de production
          {
            id: 20,
            url: '/production/equipe-prod-02.jpg',
            thumbnail: '/production/equipe-prod-02.jpg',
            title: 'Équipe Production 02',
            category: 'production',
            description: 'Collaboration et synergie',
            details: 'Travail d\'équipe optimal'
          },
          {
            id: 21,
            url: '/production/equipe-prod-03.jpg',
            thumbnail: '/production/equipe-prod-03.jpg',
            title: 'Équipe Production 03',
            category: 'production',
            description: 'Focus sur les détails',
            details: 'Perfectionnisme à chaque étape'
          },
          {
            id: 22,
            url: '/production/equipe-prod-04.jpg',
            thumbnail: '/production/equipe-prod-04.jpg',
            title: 'Équipe Production 04',
            category: 'production',
            description: 'Formation interne',
            details: 'Partage des connaissances'
          },
          {
            id: 23,
            url: '/production/equipe-prod-06.jpg',
            thumbnail: '/production/equipe-prod-06.jpg',
            title: 'Équipe Production 06',
            category: 'production',
            description: 'Innovation technique',
            details: 'Adaptation aux nouvelles technologies'
          },
          {
            id: 24,
            url: '/production/equipe-prod-07.jpg',
            thumbnail: '/production/equipe-prod-07.jpg',
            title: 'Équipe Production 07',
            category: 'production',
            description: 'Processus automatisé',
            details: 'Efficacité et rapidité'
          },
          {
            id: 25,
            url: '/production/equipe-prod-08.jpg',
            thumbnail: '/production/equipe-prod-08.jpg',
            title: 'Équipe Production 08',
            category: 'production',
            description: 'Contrôle final',
            details: 'Validation avant expédition'
          }
        ];
        
        setGalleryImages(galleryImagesList);
        setLoading(false);
      } catch (error) {
        console.error('Erreur chargement images:', error);
        setLoading(false);
      }
    };
    
    loadImages();
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Fonction pour gérer les erreurs d'image - avec fallback local
  const handleImageError = (e) => {
    console.warn(`Image non trouvée: ${e.target.src}`);
    e.target.onerror = null;
    
    // Fallback selon le type d'image
    if (e.target.classList.contains('member-image-detailed')) {
      // Pour les photos de profil
      e.target.src = '/logo.png'; // Utiliser le logo comme fallback
    } else if (e.target.src.includes('/production/')) {
      // Pour les images de production
      e.target.src = '/production/atelier-serigraphie.jpg'; // Image par défaut de production
    } else if (e.target.src.includes('/profiles/')) {
      // Pour les profiles
      e.target.src = '/logo.png'; // Logo comme fallback
    } else {
      // Pour toutes les autres images
      e.target.src = '/logo.png'; // Logo comme fallback général
    }
    
    // Ajouter une classe pour indiquer l'erreur
    e.target.classList.add('image-error');
  };

  return (
    <div className="gallery-container">
      {/* HEADER HERO */}
      <header className="gallery-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="logo-display">
              <img 
                src="/logo.png"
                alt="ByGagoos Ink Logo" 
                className="hero-logo"
                onError={handleImageError}
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
              L'art de l'impression rencontre l'âme du Madagascar.
            </p>
            <div className="hero-actions">
              <button onClick={handleLoginRedirect} className="btn-login">
                <span className="icon">🔐</span>
                Espace Professionnel
              </button>
              <button 
                onClick={() => scrollToSection('notre-equipe')} 
                className="btn-discover"
              >
                <span className="icon">👨‍👩‍👧‍👦</span>
                Découvrir l'Équipe
              </button>
            </div>
          </div>
        </div>
        
        {/* Flèche pour descendre */}
        <div className="hero-arrow" onClick={() => {
          document.querySelector('.story-section')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <span className="hero-arrow-icon">⬇️</span>
        </div>
      </header>

      {/* SLIDER INAUGURATION */}
      <section className="inauguration-slider">
        <div className="slider-wrapper">
          {inaugurationSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="slide-overlay">
                <span className="slide-badge">🎉 Inauguration</span>
                <h2 className="slide-title">{slide.title}</h2>
                <h3 className="slide-subtitle">{slide.subtitle}</h3>
                <p className="slide-text">{slide.text}</p>
                <p className="slide-date">{slide.date}</p>
              </div>
            </div>
          ))}

          <div className="slider-dots">
            {inaugurationSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="gallery-main">
        {/* SECTION NOTRE HISTOIRE */}
        <section className="story-section">
          <div className="container">
            <h2 className="section-title">
              <span className="icon">📜</span>
              Notre Histoire
            </h2>
            <div className="story-content">
              <div className="story-text">
                <p>
                  Fondée en <strong>2025</strong> et inaugurée le <strong>18 mai 2025</strong>, 
                  ByGagoos Ink est née d'une passion pour l'artisanat textile et d'un désir 
                  de créer une entreprise familiale durable à Madagascar.
                </p>
                <p>
                  Sous la direction de <strong>Tovoniaina RAHENDRISON</strong> (Fondateur & Structure), 
                  l'entreprise combine expertise technique et créativité artistique pour offrir 
                  des créations textile uniques.
                </p>
                <div className="family-roles-wrapper">
                  <p>Chaque membre de la famille apporte son expertise unique :</p>
                  <ul className="family-roles">
                    <li><span className="emoji">👨‍💻</span> <strong>Tovo</strong> - Structure & Vision</li>
                    <li><span className="emoji">🎨</span> <strong>Vola</strong> - Créativité & Inspiration</li>
                    <li><span className="emoji">👩‍🔧</span> <strong>Miantsa</strong> - Création & Design</li>
                    <li><span className="emoji">💼</span> <strong>Faniry</strong> - Communication & Relations</li>
                  </ul>
                </div>
              </div>
              <div className="story-stats">
                <div className="stat-item">
                  <span className="stat-number">2025</span>
                  <span className="stat-label">Année de création</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Membres famille</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">18/05</span>
                  <span className="stat-label">Inauguration</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Images disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION GALERIE */}
        <section className="images-section">
          <div className="container">
            <h2 className="section-title">
              <span className="icon">📸</span>
              Notre Univers en Images
            </h2>
            
            {/* Catégories */}
            <div className="categories-filter">
              {Object.entries(imageCategories).map(([key, label]) => (
                <button
                  key={key}
                  className={`category-btn ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                  aria-pressed={activeCategory === key}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Grille d'images */}
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Chargement des images...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="no-images">
                <p>Aucune image dans cette catégorie pour le moment.</p>
                <button 
                  className="btn-back"
                  onClick={() => setActiveCategory('all')}
                >
                  Voir toutes les images
                </button>
              </div>
            ) : (
              <div className="images-grid">
                {filteredImages.map((image) => (
                  <div 
                    key={image.id} 
                    className="image-card"
                    onClick={() => handleImageClick(image)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleImageClick(image)}
                  >
                    <div className="image-wrapper">
                      <img 
                        src={image.thumbnail} 
                        alt={image.title}
                        loading="lazy"
                        className="gallery-image"
                        onError={handleImageError}
                      />
                      <div className="image-overlay">
                        <span className="view-icon">👁️</span>
                      </div>
                    </div>
                    <div className="image-info">
                      <h3>
                        {image.emoji && <span className="member-emoji">{image.emoji}</span>}
                        {image.title}
                      </h3>
                      <p>{image.description}</p>
                      {image.role && <p className="image-role">{image.role}</p>}
                      <span className="image-category">{image.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION ÉQUIPE DÉTAILLÉE */}
        <section id="notre-equipe" className="team-section">
          <div className="container">
            <h2 className="section-title">
              <span className="icon">👨‍👩‍👧‍👦</span>
              L'Âme de ByGagoos Ink : Notre Famille
            </h2>
            
            <div className="team-grid-detailed">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-card-detailed">
                  <div className="member-photo-detailed">
                    <img 
                      src={member.image} 
                      alt={member.shortName}
                      className="member-image-detailed"
                      onError={handleImageError}
                    />
                    <div className="member-emoji-detailed">
                      {member.emoji}
                    </div>
                  </div>
                  <div className="member-info-detailed">
                    <h3 className="member-name">
                      {member.name}
                      <span className="member-nickname">({member.shortName})</span>
                    </h3>
                    <p className="member-role-detailed">{member.role}</p>
                    <p className="member-description-detailed">{member.description}</p>
                    
                    <div className="member-contact">
                      {member.email && (
                        <div className="contact-item">
                          <span className="contact-icon">📧</span>
                          <a href={`mailto:${member.email}`} className="contact-link">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="contact-item">
                          <span className="contact-icon">📱</span>
                          <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="contact-link">
                            {member.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">
                Prêt à donner vie à vos idées ?
              </h2>
              <p className="cta-text">
                Que vous soyez entreprise, association ou particulier, 
                transformons ensemble votre vision en création textile unique.
              </p>
              <div className="cta-actions">
                <button onClick={handleLoginRedirect} className="cta-btn-primary">
                  <span className="icon">🚀</span>
                  Accéder à votre espace
                </button>
                <div className="contact-info-detailed">
                  <div className="contact-block">
                    <h4>
                      <span className="icon">📍</span> 
                      Notre Atelier
                    </h4>
                    <p>Lot IPA 165 Anosimasina</p>
                    <p>Antananarivo, Madagascar</p>
                  </div>
                  <div className="contact-block">
                    <h4>
                      <span className="icon">📞</span> 
                      Contact Général
                    </h4>
                    <p><strong>Téléphone :</strong> +261 34 43 359 30</p>
                    <p><strong>Email :</strong> positifaid@live.fr</p>
                  </div>
                  <div className="contact-block">
                    <h4>
                      <span className="icon">👨‍👩‍👧‍👦</span> 
                      Équipe
                    </h4>
                    <p>4 membres familiaux spécialisés</p>
                    <p>Expertise combinée depuis 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="gallery-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img 
                src="/logo.png"
                alt="ByGagoos Ink" 
                className="footer-logo"
                onError={handleImageError}
              />
              <div className="brand-info">
                <h3>ByGagoos Ink</h3>
                <p className="footer-date">
                  <span className="icon">📅</span>
                  Inauguré le 18 mai 2025
                </p>
                <p className="footer-tagline">
                  <span className="icon">🇲🇬</span>
                  Fièrement Made in Madagascar
                </p>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Navigation</h4>
                <button onClick={scrollToTop} className="footer-link-btn">
                  Accueil
                </button>
                <button onClick={() => scrollToSection('notre-equipe')} className="footer-link-btn">
                  Notre Équipe
                </button>
                <button onClick={handleLoginRedirect} className="footer-link-btn">Espace Pro</button>
              </div>
              
              <div className="link-group">
                <h4>Coordonnées</h4>
                <p><strong>Adresse :</strong> Lot IPA 165 Anosimasina</p>
                <p><strong>Ville :</strong> Antananarivo</p>
                <p><strong>Tél :</strong> +261 34 43 359 30</p>
                <p><strong>Email :</strong> positifaid@live.fr</p>
              </div>
              
              <div className="link-group">
                <h4>L'Équipe</h4>
                <p>Tovo - Fondateur & Structure</p>
                <p>Vola - Direction Générale</p>
                <p>Miantsa - Création & Design</p>
                <p>Faniry - Communication</p>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} ByGagoos Ink. Tous droits réservés.</p>
            <p className="family-motto">
              <span className="icon">❤️</span>
              "Une famille, une passion, un métier" • Depuis 2025
            </p>
          </div>
        </div>
      </footer>

      {/* BOUTON RETOUR EN HAUT */}
      {showScrollTop && (
        <button 
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          <span className="scroll-icon">⬆️</span>
          <span className="scroll-text">Haut</span>
        </button>
      )}

      {/* NAVIGATION FLOATING */}
      <div className="floating-nav">
        <button 
          className="floating-nav-btn"
          onClick={scrollToTop}
          title="Retour en haut"
          aria-label="Retour en haut"
        >
          <span className="floating-icon">🏠</span>
        </button>
        
        <button 
          className="floating-nav-btn"
          onClick={() => scrollToSection('notre-equipe')}
          title="Notre équipe"
          aria-label="Voir notre équipe"
        >
          <span className="floating-icon">👨‍👩‍👧‍👦</span>
        </button>
        
        <button 
          className="floating-nav-btn"
          onClick={() => {
            const gallerySection = document.querySelector('.images-section');
            if (gallerySection) {
              gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          title="Galerie photos"
          aria-label="Voir la galerie photos"
        >
          <span className="floating-icon">📸</span>
        </button>
        
        <button 
          className="floating-nav-btn"
          onClick={handleLoginRedirect}
          title="Espace client"
          aria-label="Accéder à l'espace client"
        >
          <span className="floating-icon">🔐</span>
        </button>
      </div>

      {/* MODAL D'IMAGE */}
      {selectedImage && (
        <div 
          className="modal-overlay" 
          onClick={handleModalClick}
        >
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={closeModal}
              aria-label="Fermer"
            >
              ×
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title}
              className="modal-image"
              onError={handleImageError}
            />
            <div className="modal-info">
              <h2>
                {selectedImage.emoji && <span className="modal-emoji">{selectedImage.emoji}</span>}
                {selectedImage.fullName || selectedImage.title}
              </h2>
              
              {selectedImage.role && (
                <p className="modal-role-detailed">{selectedImage.role}</p>
              )}
              
              <p className="modal-description">{selectedImage.description}</p>
              
              {selectedImage.details && (
                <p className="modal-details">{selectedImage.details}</p>
              )}
              
              {(selectedImage.email || selectedImage.phone) && (
                <div className="modal-contact">
                  <h4>Contact :</h4>
                  {selectedImage.email && (
                    <p className="modal-email">
                      <span className="contact-icon">📧</span> 
                      <a href={`mailto:${selectedImage.email}`}>{selectedImage.email}</a>
                    </p>
                  )}
                  {selectedImage.phone && (
                    <p className="modal-phone">
                      <span className="contact-icon">📱</span> 
                      <a href={`tel:${selectedImage.phone.replace(/\s/g, '')}`}>{selectedImage.phone}</a>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;