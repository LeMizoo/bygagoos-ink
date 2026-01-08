// frontend/src/pages/InventoryPage.jsx
import React from 'react';
import './InventoryPage.css';

const InventoryPage = () => {
  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1>
            <span className="inventory-icon">📦</span>
            Inventaire Complet
          </h1>
          <p className="inventory-subtitle">Gestion globale du stock</p>
        </div>
      </div>

      <div className="inventory-stats">
        {/* Votre contenu d'inventaire */}
        <div className="stat-card-inv">
          <div className="stat-icon-inv products">📦</div>
          <div className="stat-content-inv">
            <div className="stat-value-inv">156</div>
            <div className="stat-label-inv">Produits</div>
          </div>
        </div>
        {/* ... plus de stats ... */}
      </div>

      <div className="inventory-grid">
        <h3>Inventaire des produits</h3>
        {/* Tableau d'inventaire */}
      </div>
    </div>
  );
};

export default InventoryPage;