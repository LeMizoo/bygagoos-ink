import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StockConsumablesPage.css';

const StockConsumablesPage = () => {
  const navigate = useNavigate();
  const [consumables, setConsumables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données
    setTimeout(() => {
      setConsumables([
        { id: 1, name: 'Encre noire', quantity: 25, unit: 'L', minStock: 5 },
        { id: 2, name: 'Encre rouge', quantity: 12, unit: 'L', minStock: 5 },
        { id: 3, name: 'Encre bleue', quantity: 8, unit: 'L', minStock: 5 },
        { id: 4, name: 'Cadres sérigraphiques', quantity: 15, unit: 'pièces', minStock: 10 },
        { id: 5, name: 'Raclette', quantity: 30, unit: 'pièces', minStock: 15 },
        { id: 6, name: 'Emulsion photosensible', quantity: 18, unit: 'L', minStock: 10 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/stock/consumables/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/admin/stock/consumables/new');
  };

  if (loading) {
    return (
      <div className="consumables-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des consommables...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="consumables-container">
      <div className="consumables-header">
        <h1>Gestion des Consommables</h1>
        <button onClick={handleAdd} className="btn-add">
          + Ajouter un consommable
        </button>
      </div>

      <div className="consumables-stats">
        <div className="stat-card">
          <h3>{consumables.length}</h3>
          <p>Types de consommables</p>
        </div>
        <div className="stat-card">
          <h3>{consumables.filter(c => c.quantity < c.minStock).length}</h3>
          <p>Réapprovisionnement nécessaire</p>
        </div>
        <div className="stat-card">
          <h3>
            {consumables.reduce((total, c) => total + (c.quantity * (c.unit === 'L' ? 15000 : 5000)), 0).toLocaleString()} Ar
          </h3>
          <p>Valeur totale du stock</p>
        </div>
      </div>

      <div className="consumables-table-container">
        <table className="consumables-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Unité</th>
              <th>Stock minimum</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {consumables.map((consumable) => (
              <tr key={consumable.id}>
                <td>{consumable.name}</td>
                <td>{consumable.quantity}</td>
                <td>{consumable.unit}</td>
                <td>{consumable.minStock}</td>
                <td>
                  <span className={`status-badge ${consumable.quantity < consumable.minStock ? 'status-low' : 'status-ok'}`}>
                    {consumable.quantity < consumable.minStock ? '⚠️ Réapprovisionner' : '✅ Suffisant'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => handleEdit(consumable.id)} 
                      className="btn-edit"
                    >
                      Modifier
                    </button>
                    <button className="btn-delete">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockConsumablesPage;
