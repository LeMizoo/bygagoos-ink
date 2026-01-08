// frontend/src/pages/StockPage.jsx
import React, { useState } from 'react';
import './StockPage.css';

const StockPage = () => {
  const [stock] = useState([
    { id: 1, name: 'T-shirts Blancs', category: 'Textile', quantity: 150, min: 50, unit: 'pièces', status: 'good' },
    { id: 2, name: 'Encre Noire', category: 'Consommable', quantity: 8, min: 5, unit: 'kg', status: 'warning' },
    { id: 3, name: 'Cadres Sérigraphie', category: 'Équipement', quantity: 12, min: 10, unit: 'unités', status: 'good' },
    { id: 4, name: 'Sweats Gris', category: 'Textile', quantity: 45, min: 30, unit: 'pièces', status: 'good' },
    { id: 5, name: 'Encre Bleue', category: 'Consommable', quantity: 2, min: 5, unit: 'kg', status: 'critical' },
  ]);

  return (
    <div className="stock-container">
      {/* Header */}
      <header className="stock-header">
        <h1>📦 Gestion du Stock</h1>
        <p>Suivez et gérez votre inventaire en temps réel</p>
      </header>
      
      {/* Contenu */}
      <main className="stock-content">
        <section className="stock-table">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Quantité</th>
                <th>Stock minimum</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>{item.min} {item.unit}</td>
                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status === 'good' && '✅ Bon'}
                      {item.status === 'warning' && '⚠️ À réapprovisionner'}
                      {item.status === 'critical' && '❌ Critique'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">📝 Modifier</button>
                    <button className="action-btn">📊 Historique</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default StockPage;
