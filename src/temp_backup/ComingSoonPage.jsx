// frontend/src/pages/ComingSoonPage.jsx
export default function ComingSoonPage({ featureName }) {
  return (
    <div className="coming-soon-container">
      <h1>🛠️ {featureName} - Bientôt disponible</h1>
      <p>Cette fonctionnalité est en cours de développement.</p>
      <div className="progress-bar">
        <div className="progress" style={{width: '70%'}}></div>
      </div>
    </div>
  );
}