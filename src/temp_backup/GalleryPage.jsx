import React from 'react';
import './GalleryPage.css';

const GalleryPage = () => {
  const images = [
    {
      id: 1,
      src: '/production/atelier-serigraphie.jpg',
      title: 'Atelier de Sérigraphie',
      description: 'Notre atelier équipé pour des impressions de qualité'
    },
    {
      id: 2,
      src: '/production/equipe-serigraphie.jpg',
      title: 'Équipe en Action',
      description: 'Notre équipe travaille avec précision'
    },
    {
      id: 3,
      src: '/production/marcel-prod.jpg',
      title: 'Expertise Technique',
      description: 'Maitrise des techniques d\'impression'
    },
    {
      id: 4,
      src: '/production/equipe-prod-02.jpg',
      title: 'Production en Série',
      description: 'Capacité de production importante'
    },
    {
      id: 5,
      src: '/production/equipe-prod-03.jpg',
      title: 'Contrôle Qualité',
      description: 'Vérification minutieuse de chaque pièce'
    },
    {
      id: 6,
      src: '/production/equipe-prod-04.jpg',
      title: 'Finition',
      description: 'Dernières touches avant expédition'
    }
  ];

  return (
    <div className="gallery-page">
      <div className="container">
        <div className="gallery-header">
          <h1>Galerie ByGagoos Ink</h1>
          <p className="subtitle">Découvrez notre univers créatif et nos réalisations</p>
          <p>Notre galerie témoigne de notre passion pour la création textile et de notre engagement envers l'excellence.</p>
        </div>

        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image.id} className="gallery-card">
              <div className="image-container">
                <img 
                  src={image.src} 
                  alt={image.title}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/667eea/ffffff?text=ByGagoos+Ink';
                  }}
                />
              </div>
              <div className="image-info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-description">
          <h2>Notre Savoir-Faire</h2>
          <p>
            Chez ByGagoos Ink, chaque création est le fruit d'un processus méticuleux alliant 
            créativité artistique et expertise technique. Notre équipe passionnée travaille 
            avec des matériaux de qualité et des techniques d'impression avancées pour 
            garantir des résultats exceptionnels.
          </p>
          <p>
            Que ce soit pour des commandes personnalisées, des collections d'entreprise 
            ou des projets événementiels, nous mettons tout en œuvre pour transformer 
            vos idées en réalisations concrètes qui dépassent vos attentes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
