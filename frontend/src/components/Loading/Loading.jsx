// frontend/src/components/Loading/Loading.jsx
import { getImageUrl, getPlaceholderImage } from '../../config/images';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <img 
        src={getImageUrl('/images/logo.png')} // ⬅️ CORRIGÉ
        alt="ByGagoos-Ink Logo" 
        className="loading-logo"
        onError={(e) => {
          e.target.src = getPlaceholderImage('BG');
          e.target.style.display = 'block';
        }}
      />
      <p className="loading-text">Chargement...</p>
    </div>
  );
};

export default Loading;