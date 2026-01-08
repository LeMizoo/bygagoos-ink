import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsumablesPage.css';

const ConsumablesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="consumables-page">
      <h1>Page des Consommables</h1>
      <p>Cette page est en cours de développement.</p>
      <button onClick={() => navigate('/admin/stock')}>
        Retour au stock
      </button>
    </div>
  );
};

export default ConsumablesPage;
