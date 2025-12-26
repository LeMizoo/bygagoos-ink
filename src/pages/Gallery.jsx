import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Gallery.css';

// Import simple sans imports d'images
import { getImageUrl } from '../utils/imageHelper';

const Gallery = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ÉQUIPE FAMILIALE AVEC INFORMATIONS EXACTES
  const teamMembers = [
    {
      id: 1,
      name: 'Tovoniaina RAHENDRISON',
      shortName: 'Tovo (Dada)',
      email: 'tovoniaina.rahendrison@gmail.com',
      phone: '+261 34 43 593 30',
      role: 'Fondateur & Structure',
      description: 'Responsable de la vision stratégique et de la structure de l\'entreprise',
      image: getImageUrl('tovoniaina'), // Utilisation du helper
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
      image: getImageUrl('volatiana'), // Utilisation du helper
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
      image: getImageUrl('miantsatiana'), // Utilisation du helper
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
      image: getImageUrl('tiaFaniry'), // Utilisation du helper
      emoji: '💼',
      category: 'team'
    }
  ];

  // CATÉGORIES D'IMAGES
  const imageCategories = {
    all: 'Toutes les images',
    team: 'L\'Équipe Familiale',
    production: 'Atelier de Production',
    creations: 'Nos Créations',
    events: 'Événements'
  };
  
  // Détecter le défilement pour afficher le bouton retour en haut
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Charger les images
    const loadImages = () => {
      try {
        const galleryImagesList = [
          // Équipe familiale avec vraies informations
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
          
          // Production
          {
            id: 5,
            url: getImageUrl('atelierSerigraphie'),
            thumbnail: getImageUrl('atelierSerigraphie'),
            title: 'Notre Atelier',
            category: 'production',
            description: 'Espace de création où la magie opère',
            details: 'Machines professionnelles & environnement contrôlé'
          },
          {
            id: 6,
            url: getImageUrl('equipeSerigraphie'),
            thumbnail: getImageUrl('equipeSerigraphie'),
            title: 'Équipe en Action',
            category: 'production',
            description: 'Précision et expertise à chaque étape',
            details: 'Processus qualité rigoureux'
          },
          {
            id: 7,
            url: getImageUrl('marcelProd'),
            thumbnail: getImageUrl('marcelProd'),
            title: 'Expertise Technique',
            category: 'production',
            description: 'Maitrise des techniques avancées',
            details: 'Formation continue & innovation'
          },
          
          // Images générales
          {
            id: 8,
            url: getImageUrl('teamFamily'),
            thumbnail: getImageUrl('teamFamily'),
            title: 'L\'Esprit Familial',
            category: 'team',
            description: 'Plus qu\'une entreprise, une famille',
            details: 'Cohésion & valeurs partagées'
          },
          {
            id: 9,
            url: getImageUrl('inauguration'),
            thumbnail: getImageUrl('inauguration'),
            title: 'Inauguration Officielle',
            category: 'events',
            description: '18 mai 2025 - Début de notre aventure',
            details: 'Lancement officiel de ByGagoos Ink'
          },
          {
            id: 10,
            url: getImageUrl('logo'),
            thumbnail: getImageUrl('logo'),
            title: 'Notre Identité',
            category: 'creations',
            description: 'Logo ByGagoos Ink',
            details: 'Design : Miantsa, 2025'
          },
          
          // Images supplémentaires de production
          {
            id: 11,
            url: getImageUrl('equipeProd02'),
            thumbnail: getImageUrl('equipeProd02'),
            title: 'Production en Cours',
            category: 'production',
            description: 'Notre équipe à l\'œuvre',
            details: 'Contrôle qualité minutieux'
          },
          {
            id: 12,
            url: getImageUrl('marcelinProd'),
            thumbnail: getImageUrl('marcelinProd'),
            title: 'Expert Sérigraphie',
            category: 'production',
            description: 'Technicien spécialisé',
            details: 'Expérience confirmée'
          }
        ];
        
        setGalleryImages(galleryImagesList);
        setLoading(false);
      } catch (error) {
        console.error('Erreur chargement images:', error);
        setLoading(false);
      }
    };
    
    // Charger immédiatement
    loadImages();
    
    // Nettoyer l'événement
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtrer les images par catégorie
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

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fonction pour remonter en haut de la section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="gallery-container">
      {/* HEADER HERO */}
      <header className="gallery-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="logo-display">
              <img 
                src={getImageUrl('logo')}
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
              L'art de l'impression rencontre l'âme du Madagascar.
            </p>
            <div className="hero-actions">
              <button onClick={handleLoginRedirect} className="btn-login">
                <span className="icon">🔐</span>
                Espace Professionnel
              </button>
              <a href="#notre-equipe" className="btn-discover">
                <span className="icon">👨‍👩‍👧‍👦</span>
                Découvrir l'Équipe
              </a>
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
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Créations uniques</span>
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
            ) : (
              <div className="images-grid">
                {filteredImages.map((image) => (
                  <div 
                    key={image.id} 
                    className="image-card"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="image-wrapper">
                      <img 
                        src={image.thumbnail} 
                        alt={image.title}
                        loading="lazy"
                        className="gallery-image"
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
                src={getImageUrl('logo')}
                alt="ByGagoos Ink" 
                className="footer-logo"
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
                <button onClick={scrollToTop}>
                  Accueil
                </button>
                <button onClick={() => scrollToSection('notre-equipe')}>
                  Notre Équipe
                </button>
                <button onClick={handleLoginRedirect}>Espace Pro</button>
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
        >
          <span className="floating-icon">🏠</span>
        </button>
        
        <button 
          className="floating-nav-btn"
          onClick={() => scrollToSection('notre-equipe')}
          title="Notre équipe"
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
        >
          <span className="floating-icon">📸</span>
        </button>
        
        <button 
          className="floating-nav-btn"
          onClick={handleLoginRedirect}
          title="Espace client"
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
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title}
              className="modal-image"
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

export default Gallery;