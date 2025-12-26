import React, { useState } from 'react';
import './StockConsumablesPage.css';

const StockConsumablesPage = () => {
  const [activeCategory, setActiveCategory] = useState('textiles');

  const categories = [
    { id: 'textiles', name: 'Textiles', count: 8, icon: '👕', color: '#4cc9f0' },
    { id: 'inks', name: 'Encres', count: 12, icon: '🎨', color: '#8b5cf6' },
    { id: 'consumables', name: 'Consommables', count: 15, icon: '🧴', color: '#10b981' },
    { id: 'equipment', name: 'Équipement', count: 6, icon: '🖨️', color: '#f59e0b' },
    { id: 'packaging', name: 'Emballage', count: 9, icon: '📦', color: '#ef4444' },
    { id: 'safety', name: 'Sécurité', count: 5, icon: '🛡️', color: '#3b82f6' },
  ];

  const stockItems = {
    textiles: [
      {
        id: 1,
        name: 'T-shirts Blancs 100% Cotton',
        sku: 'TXT-BLC-M-100',
        size: 'M',
        color: 'Blanc',
        quantity: 150,
        minQuantity: 50,
        unit: 'pièces',
        price: '8 000 Ar',
        supplier: 'Textile MG',
        location: 'Rack A1',
        lastRestock: '05/12/2024'
      },
      {
        id: 2,
        name: 'Sweatshirts Gris 50/50',
        sku: 'SWT-GRS-L-50',
        size: 'L',
        color: 'Gris',
        quantity: 45,
        minQuantity: 20,
        unit: 'pièces',
        price: '25 000 Ar',
        supplier: 'Cotton Plus',
        location: 'Rack B2',
        lastRestock: '10/12/2024'
      },
      {
        id: 3,
        name: 'Polos Piqué Bleu Marine',
        sku: 'POL-BLM-XL-PQ',
        size: 'XL',
        color: 'Bleu Marine',
        quantity: 22,
        minQuantity: 15,
        unit: 'pièces',
        price: '18 000 Ar',
        supplier: 'Premium Textile',
        location: 'Rack C3',
        lastRestock: '28/11/2024'
      },
    ],
    inks: [
      {
        id: 4,
        name: 'Encre Noire Water-Based',
        sku: 'INK-NOIR-WB-5L',
        type: 'Water-Based',
        color: 'Noir',
        quantity: 2.5,
        minQuantity: 5,
        unit: 'litres',
        price: '150 000 Ar',
        supplier: 'Sericol MG',
        location: 'Armoire Encre',
        lastRestock: '01/12/2024'
      },
      {
        id: 5,
        name: 'Encre Or Métallique',
        sku: 'INK-OR-MET-1L',
        type: 'Plastisol',
        color: 'Or',
        quantity: 0.8,
        minQuantity: 2,
        unit: 'litres',
        price: '85 000 Ar',
        supplier: 'Union Inks',
        location: 'Armoire Encre',
        lastRestock: '15/11/2024'
      },
    ],
    consumables: [
      {
        id: 6,
        name: 'Écrans Sérigraphie 40x60',
        sku: 'ECR-4060-MESH110',
        mesh: '110',
        size: '40x60cm',
        quantity: 8,
        minQuantity: 10,
        unit: 'unités',
        price: '45 000 Ar',
        supplier: 'ScreenTech',
        location: 'Zone Préparation',
        lastRestock: '20/11/2024'
      },
      {
        id: 7,
        name: 'Raclette Professionnelle',
        sku: 'RAC-PRO-75D',
        hardness: '75°',
        size: '30cm',
        quantity: 3,
        minQuantity: 5,
        unit: 'unités',
        price: '35 000 Ar',
        supplier: 'Printing Tools',
        location: 'Boîte à outils',
        lastRestock: '05/12/2024'
      },
    ]
  };

  const filteredItems = stockItems[activeCategory] || [];
  const lowStockItems = [...stockItems.textiles, ...stockItems.inks, ...stockItems.consumables]
    .filter(item => item.quantity <= item.minQuantity);

  const getStockStatus = (quantity, minQuantity) => {
    if (quantity <= minQuantity * 0.5) return 'critical';
    if (quantity <= minQuantity) return 'low';
    if (quantity <= minQuantity * 1.5) return 'warning';
    return 'good';
  };

  const getStockStatusBadge = (quantity, minQuantity) => {
    const status = getStockStatus(quantity, minQuantity);
    const config = {
      critical: { label: 'Critique', color: '#ef4444', bg: '#fef2f2', icon: '🔥' },
      low: { label: 'Faible', color: '#f59e0b', bg: '#fffbeb', icon: '⚠️' },
      warning: { label: 'Attention', color: '#fbbf24', bg: '#fffbeb', icon: '📊' },
      good: { label: 'Bon', color: '#10b981', bg: '#ecfdf5', icon: '✅' },
    };
    
    const { label, color, bg, icon } = config[status];
    
    return (
      <span className="stock-status" style={{ color, backgroundColor: bg }}>
        <span className="status-icon">{icon}</span>
        {label}
      </span>
    );
  };

  const calculateStockValue = () => {
    const allItems = [...stockItems.textiles, ...stockItems.inks, ...stockItems.consumables];
    return allItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="stock-page">
      <div className="page-header">
        <div>
          <h1>📦 Gestion du Stock</h1>
          <p className="page-subtitle">Inventaire des matières premières et consommables</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <span className="btn-icon">📥</span>
            Commande Fournisseur
          </button>
          <button className="btn-primary">
            <span className="btn-icon">➕</span>
            Ajouter au Stock
          </button>
        </div>
      </div>

      {/* Vue d'ensemble */}
      <div className="stock-overview">
        <div className="overview-card">
          <div className="overview-icon">💰</div>
          <div className="overview-content">
            <div className="overview-value">
              {new Intl.NumberFormat('fr-MG').format(calculateStockValue())} Ar
            </div>
            <div className="overview-label">Valeur totale du stock</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">⚠️</div>
          <div className="overview-content">
            <div className="overview-value">{lowStockItems.length}</div>
            <div className="overview-label">Articles en stock faible</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">📊</div>
          <div className="overview-content">
            <div className="overview-value">6</div>
            <div className="overview-label">Catégories gérées</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">👕</div>
          <div className="overview-content">
            <div className="overview-value">217</div>
            <div className="overview-label">Pièces textiles totales</div>
          </div>
        </div>
      </div>

      {/* Catégories */}
      <div className="categories-section">
        <h3>📁 Catégories de Stock</h3>
        <div className="categories-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{ borderLeftColor: category.color }}
            >
              <div className="category-icon" style={{ color: category.color }}>
                {category.icon}
              </div>
              <div className="category-name">{category.name}</div>
              <div className="category-count">{category.count}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Alertes Stock Critique */}
      {lowStockItems.length > 0 && (
        <div className="stock-alerts">
          <div className="alert-header">
            <span className="alert-icon">🚨</span>
            <h4>Alertes Stock Critique</h4>
            <span className="alert-count">{lowStockItems.length} articles</span>
          </div>
          <div className="alert-items">
            {lowStockItems.map((item) => (
              <div key={item.id} className="alert-item">
                <div className="alert-item-icon">
                  {item.quantity <= item.minQuantity * 0.5 ? '🔥' : '⚠️'}
                </div>
                <div className="alert-item-content">
                  <div className="alert-item-name">{item.name}</div>
                  <div className="alert-item-details">
                    <span className="detail">Stock: {item.quantity} {item.unit}</span>
                    <span className="detail">• Minimum: {item.minQuantity}</span>
                    <span className="detail">• Dernier réappro: {item.lastRestock}</span>
                  </div>
                </div>
                <button className="alert-item-action">
                  Commander
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tableau des articles */}
      <div className="stock-table-section">
        <div className="section-header">
          <h3>📋 Articles - {categories.find(c => c.id === activeCategory)?.name}</h3>
          <div className="section-actions">
            <button className="action-btn">
              <span className="action-icon">📤</span>
              Exporter
            </button>
            <button className="action-btn">
              <span className="action-icon">🖨️</span>
              Imprimer
            </button>
            <button className="action-btn">
              <span className="action-icon">🔄</span>
              Mettre à jour
            </button>
          </div>
        </div>

        <div className="stock-table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Référence</th>
                <th>Caractéristiques</th>
                <th>Quantité</th>
                <th>Minimum</th>
                <th>Prix unitaire</th>
                <th>Valeur totale</th>
                <th>Fournisseur</th>
                <th>Emplacement</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="item-name">{item.name}</td>
                  <td className="item-sku">{item.sku}</td>
                  <td className="item-specs">
                    {activeCategory === 'textiles' ? (
                      <>
                        <span className="spec">{item.size}</span>
                        <span className="spec">• {item.color}</span>
                      </>
                    ) : activeCategory === 'inks' ? (
                      <>
                        <span className="spec">{item.type}</span>
                        <span className="spec">• {item.color}</span>
                      </>
                    ) : (
                      <>
                        <span className="spec">{item.mesh || item.hardness || ''}</span>
                        <span className="spec">{item.size ? `• ${item.size}` : ''}</span>
                      </>
                    )}
                  </td>
                  <td className="item-quantity">
                    <span className={`quantity-value ${
                      getStockStatus(item.quantity, item.minQuantity)
                    }`}>
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td className="item-min">{item.minQuantity}</td>
                  <td className="item-price">{item.price}</td>
                  <td className="item-total">
                    {item.quantity * (parseInt(item.price.replace(/\D/g, '')) || 0).toLocaleString('fr-MG')} Ar
                  </td>
                  <td className="item-supplier">{item.supplier}</td>
                  <td className="item-location">{item.location}</td>
                  <td>
                    {getStockStatusBadge(item.quantity, item.minQuantity)}
                  </td>
                  <td>
                    <div className="item-actions">
                      <button className="icon-btn adjust" title="Ajuster stock">
                        📝
                      </button>
                      <button className="icon-btn order" title="Commander">
                        📦
                      </button>
                      <button className="icon-btn move" title="Déplacer">
                        🚚
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="empty-stock">
            <div className="empty-icon">📦</div>
            <h4>Aucun article dans cette catégorie</h4>
            <p>Ajoutez des articles ou vérifiez une autre catégorie</p>
          </div>
        )}
      </div>

      {/* Commandes en cours */}
      <div className="pending-orders">
        <h3>📋 Commandes Fournisseurs en Cours</h3>
        <div className="orders-list">
          <div className="order-card">
            <div className="order-header">
              <div className="order-id">CMD-FOUR-1245</div>
              <div className="order-status pending">En attente</div>
            </div>
            <div className="order-content">
              <div className="order-items">
                <span className="order-item">T-shirts Blancs M (x200)</span>
                <span className="order-item">• Encres Noire (x5L)</span>
              </div>
              <div className="order-details">
                <span className="detail">Fournisseur: Textile MG</span>
                <span className="detail">• Livraison estimée: 20/12/2024</span>
              </div>
            </div>
            <div className="order-value">2.4M Ar</div>
          </div>
          
          <div className="order-card">
            <div className="order-header">
              <div className="order-id">CMD-FOUR-1244</div>
              <div className="order-status confirmed">Confirmée</div>
            </div>
            <div className="order-content">
              <div className="order-items">
                <span className="order-item">Écrans 40x60 (x15)</span>
                <span className="order-item">• Raclettes 75° (x8)</span>
              </div>
              <div className="order-details">
                <span className="detail">Fournisseur: ScreenTech</span>
                <span className="detail">• Livraison: 18/12/2024</span>
              </div>
            </div>
            <div className="order-value">1.1M Ar</div>
          </div>
        </div>
      </div>

      {/* Conseils de gestion */}
      <div className="stock-tips">
        <h3>💡 Conseils de Gestion de Stock</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">📊</div>
            <div className="tip-content">
              <h4>Inventaire tournant</h4>
              <p>Faites un inventaire physique chaque vendredi pour maintenir l'exactitude</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🚨</div>
            <div className="tip-content">
              <h4>Seuil d'alerte</h4>
              <p>Définissez des seuils d'alerte à 150% du stock minimum pour anticiper</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🤝</div>
            <div className="tip-content">
              <h4>Fournisseurs locaux</h4>
              <p>Privilégiez les fournisseurs malgaches pour réduire les délais</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockConsumablesPage;