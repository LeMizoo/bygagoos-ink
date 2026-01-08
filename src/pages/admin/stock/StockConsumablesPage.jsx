import React, { useState } from 'react';
import { MobileLayout, MobileSection, MobileCard } from '../components/layout/MobileLayout';
import { ResponsiveTable } from '../components/ui/ResponsiveTable';
import './StockConsumablesPage.css';

const StockConsumablesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données de démo
  const categories = [
    { id: 'textiles', name: 'Textiles', count: 8, icon: '👕', color: '#4cc9f0' },
    { id: 'inks', name: 'Encres', count: 12, icon: '🎨', color: '#8b5cf6' },
    { id: 'consumables', name: 'Consommables', count: 15, icon: '🧴', color: '#10b981' },
    { id: 'equipment', name: 'Équipement', count: 6, icon: '🖨️', color: '#f59e0b' },
  ];

  const stockItems = [
    {
      id: 1,
      name: 'T-shirts Blancs 100% Cotton',
      sku: 'TXT-BLC-M-100',
      category: 'textiles',
      quantity: 150,
      minQuantity: 50,
      unit: 'pièces',
      price: '8 000 Ar',
      value: '1 200 000 Ar',
      supplier: 'Textile MG',
      location: 'Rack A1',
      status: 'good',
      lastRestock: '2024-12-05'
    },
    {
      id: 2,
      name: 'Encre Noire Water-Based',
      sku: 'INK-NOIR-WB-5L',
      category: 'inks',
      quantity: 2.5,
      minQuantity: 5,
      unit: 'litres',
      price: '150 000 Ar',
      value: '375 000 Ar',
      supplier: 'Sericol MG',
      location: 'Armoire Encre',
      status: 'low',
      lastRestock: '2024-12-01'
    },
    {
      id: 3,
      name: 'Écrans Sérigraphie 40x60',
      sku: 'ECR-4060-MESH110',
      category: 'consumables',
      quantity: 8,
      minQuantity: 10,
      unit: 'unités',
      price: '45 000 Ar',
      value: '360 000 Ar',
      supplier: 'ScreenTech',
      location: 'Zone Préparation',
      status: 'low',
      lastRestock: '2024-11-20'
    },
    {
      id: 4,
      name: 'Sweatshirts Gris 50/50',
      sku: 'SWT-GRS-L-50',
      category: 'textiles',
      quantity: 45,
      minQuantity: 20,
      unit: 'pièces',
      price: '25 000 Ar',
      value: '1 125 000 Ar',
      supplier: 'Cotton Plus',
      location: 'Rack B2',
      status: 'good',
      lastRestock: '2024-12-10'
    },
    {
      id: 5,
      name: 'Encre Or Métallique',
      sku: 'INK-OR-MET-1L',
      category: 'inks',
      quantity: 0.8,
      minQuantity: 2,
      unit: 'litres',
      price: '85 000 Ar',
      value: '68 000 Ar',
      supplier: 'Union Inks',
      location: 'Armoire Encre',
      status: 'critical',
      lastRestock: '2024-11-15'
    },
  ];

  // Colonnes pour le tableau
  const columns = [
    {
      header: 'Article',
      accessor: 'name',
      render: (value, row) => (
        <div className="stock-item-cell">
          <div className="item-category-icon">
            {categories.find(c => c.id === row.category)?.icon}
          </div>
          <div>
            <div className="item-name">{value}</div>
            <div className="item-sku">{row.sku}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Quantité',
      accessor: 'quantity',
      render: (value, row) => (
        <div className={`quantity-cell ${row.status}`}>
          {value} {row.unit}
        </div>
      )
    },
    {
      header: 'Minimum',
      accessor: 'minQuantity'
    },
    {
      header: 'Valeur',
      accessor: 'value'
    },
    {
      header: 'Statut',
      accessor: 'status',
      render: (value) => (
        <span className={`stock-status status-${value}`}>
          {value === 'good' ? 'Bon' : 
           value === 'low' ? 'Faible' : 
           value === 'critical' ? 'Critique' : 'Attention'}
        </span>
      )
    },
    {
      header: 'Emplacement',
      accessor: 'location'
    }
  ];

  // Filtrage
  const filteredItems = activeCategory === 'all' 
    ? stockItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : stockItems.filter(item => 
        item.category === activeCategory && (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  // Stats
  const stats = {
    totalValue: stockItems.reduce((sum, item) => {
      const value = parseInt(item.value.replace(/\D/g, '')) || 0;
      return sum + value;
    }, 0),
    lowStock: stockItems.filter(item => item.status === 'low' || item.status === 'critical').length,
    totalItems: stockItems.length,
    categories: categories.length
  };

  // Articles en stock critique
  const criticalItems = stockItems.filter(item => item.status === 'critical');

  const actionButton = (
    <button
      onClick={() => navigate('/app/stock/add')}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      aria-label="Ajouter au stock"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="hidden sm:inline">Ajouter</span>
    </button>
  );

  return (
    <MobileLayout 
      title="Gestion du Stock" 
      actionButton={actionButton}
    >
      {/* Stats rapides */}
      <MobileSection title="Vue d'ensemble du stock">
        <div className="stats-grid-mobile">
          <div className="stat-card-mobile">
            <div className="stat-number">
              {(stats.totalValue / 1000000).toFixed(1)}M
            </div>
            <div className="stat-label">Valeur totale</div>
          </div>
          <div className="stat-card-mobile stat-warning">
            <div className="stat-number">{stats.lowStock}</div>
            <div className="stat-label">Faible stock</div>
          </div>
          <div className="stat-card-mobile stat-info">
            <div className="stat-number">{stats.totalItems}</div>
            <div className="stat-label">Articles</div>
          </div>
          <div className="stat-card-mobile stat-success">
            <div className="stat-number">{stats.categories}</div>
            <div className="stat-label">Catégories</div>
          </div>
        </div>
      </MobileSection>

      {/* Alertes stock critique */}
      {criticalItems.length > 0 && (
        <MobileSection title="🚨 Alertes stock critique">
          <div className="critical-alerts">
            {criticalItems.map(item => (
              <div key={item.id} className="critical-alert">
                <div className="alert-icon">🔥</div>
                <div className="alert-content">
                  <div className="alert-title">{item.name}</div>
                  <div className="alert-details">
                    Stock: {item.quantity} {item.unit} • Minimum: {item.minQuantity}
                  </div>
                </div>
                <button className="alert-action">
                  Commander
                </button>
              </div>
            ))}
          </div>
        </MobileSection>
      )}

      {/* Catégories */}
      <MobileSection title="📁 Catégories">
        <div className="categories-grid-mobile">
          <button
            className={`category-card-mobile ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <div className="category-icon-mobile">📦</div>
            <div className="category-name-mobile">Tous</div>
            <div className="category-count-mobile">{stockItems.length}</div>
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card-mobile ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{ borderLeftColor: category.color }}
            >
              <div className="category-icon-mobile" style={{ color: category.color }}>
                {category.icon}
              </div>
              <div className="category-name-mobile">{category.name}</div>
              <div className="category-count-mobile">{category.count}</div>
            </button>
          ))}
        </div>
      </MobileSection>

      {/* Recherche */}
      <MobileSection>
        <div className="search-input">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
            aria-label="Rechercher article"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-search"
              aria-label="Effacer la recherche"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </MobileSection>

      {/* Liste des articles */}
      <MobileSection title={`📋 Articles (${filteredItems.length})`}>
        <ResponsiveTable
          columns={columns}
          data={filteredItems}
          onRowClick={(item) => navigate(`/app/stock/${item.id}`)}
          emptyMessage="Aucun article trouvé"
          itemsPerPageOptions={[5, 10, 20]}
          defaultItemsPerPage={10}
        />
      </MobileSection>

      {/* Commandes en cours */}
      <MobileSection title="📦 Commandes en cours">
        <div className="orders-list">
          <div className="order-card-mobile">
            <div className="order-header">
              <div className="order-id">CMD-FOUR-1245</div>
              <div className="order-status pending">En attente</div>
            </div>
            <div className="order-content">
              <div className="order-items">T-shirts Blancs M (x200), Encres Noire (x5L)</div>
              <div className="order-details">
                <span>Fournisseur: Textile MG</span>
                <span>• Livraison: 20/12/2024</span>
              </div>
            </div>
            <div className="order-value">2.4M Ar</div>
          </div>
          
          <div className="order-card-mobile">
            <div className="order-header">
              <div className="order-id">CMD-FOUR-1244</div>
              <div className="order-status confirmed">Confirmée</div>
            </div>
            <div className="order-content">
              <div className="order-items">Écrans 40x60 (x15), Raclettes 75° (x8)</div>
              <div className="order-details">
                <span>Fournisseur: ScreenTech</span>
                <span>• Livraison: 18/12/2024</span>
              </div>
            </div>
            <div className="order-value">1.1M Ar</div>
          </div>
        </div>
      </MobileSection>
    </MobileLayout>
  );
};

export default ConsumablesPage;