// frontend/src/pages/OrdersNewPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiUser, FiCalendar, FiDollarSign, FiFileText, FiSave, FiArrowLeft } from 'react-icons/fi';
import './OrdersNewPage.css';

const OrdersNewPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    orderType: 'tshirt',
    quantity: 1,
    designType: 'simple',
    colors: ['#3B82F6'],
    dueDate: '',
    priority: 'medium',
    specialInstructions: '',
    pricePerUnit: 5000,
    deposit: 0
  });

  const [clients] = useState([
    { id: 1, name: 'Entreprise TechMad', email: 'contact@techmad.mg', phone: '+261 32 12 345 67' },
    { id: 2, name: 'Boutique Fashion MG', email: 'order@fashionmg.mg', phone: '+261 33 12 345 68' },
    { id: 3, name: 'Hotel Ravinala', email: 'procuration@ravinalahotel.mg', phone: '+261 34 12 345 69' },
    { id: 4, name: 'Restaurant La Terrasse', email: 'gestion@laterrasse.mg', phone: '+261 32 12 345 70' },
    { id: 5, name: 'Agence Tourisme Aventure', email: 'reservation@aventure.mg', phone: '+261 38 12 345 71' },
  ]);

  const orderTypes = [
    { value: 'tshirt', label: 'T-shirt', icon: '👕', basePrice: 5000 },
    { value: 'sweatshirt', label: 'Sweatshirt', icon: '🧥', basePrice: 10000 },
    { value: 'polo', label: 'Polo', icon: '👔', basePrice: 7500 },
    { value: 'uniform', label: 'Uniforme', icon: '👨‍⚕️', basePrice: 15000 },
    { value: 'apron', label: 'Tablier', icon: '👨‍🍳', basePrice: 8000 },
    { value: 'cap', label: 'Casquette', icon: '🧢', basePrice: 3000 },
    { value: 'bag', label: 'Sac', icon: '🎒', basePrice: 4000 },
    { value: 'other', label: 'Autre', icon: '📦', basePrice: 0 },
  ];

  const designTypes = [
    { value: 'simple', label: 'Simple (1 couleur)', priceMultiplier: 1 },
    { value: 'complex', label: 'Complexe (2-3 couleurs)', priceMultiplier: 1.5 },
    { value: 'fullcolor', label: 'Full Color', priceMultiplier: 2 },
    { value: 'special', label: 'Effet spécial', priceMultiplier: 2.5 },
  ];

  const calculateTotalPrice = () => {
    const orderType = orderTypes.find(type => type.value === formData.orderType);
    const designType = designTypes.find(type => type.value === formData.designType);
    
    if (!orderType || !designType) return 0;
    
    const basePrice = orderType.basePrice;
    const designMultiplier = designType.priceMultiplier;
    const quantity = formData.quantity || 1;
    
    return basePrice * designMultiplier * quantity;
  };

  const calculateDeposit = () => {
    const total = calculateTotalPrice();
    return total * 0.5; // 50% d'acompte
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulation de création de commande
    const orderId = Math.floor(Math.random() * 10000) + 1000;
    
    alert(`Commande #CMD-${orderId} créée avec succès !\n\nClient: ${formData.clientName}\nMontant total: ${new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(calculateTotalPrice())}\n\nRedirection vers le dashboard...`);
    
    // Rediriger vers le dashboard après création
    setTimeout(() => {
      navigate('/app/dashboard');
    }, 1500);
  };

  const handleClientSelect = (client) => {
    setFormData(prev => ({
      ...prev,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone
    }));
  };

  return (
    <div className="orders-new-page">
      <div className="page-header">
        <button 
          className="btn-back"
          onClick={() => navigate('/app/dashboard')}
        >
          <FiArrowLeft />
          Retour au Dashboard
        </button>
        
        <h1 className="page-title">
          <FiPackage />
          Nouvelle Commande
        </h1>
        
        <p className="page-subtitle">
          Créez une nouvelle commande pour votre client
        </p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Section Client */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <FiUser />
                </div>
                <h2>Informations Client</h2>
              </div>
              
              <div className="client-selection">
                <h3>Sélectionnez un client existant</h3>
                <div className="clients-grid">
                  {clients.map(client => (
                    <div 
                      key={client.id}
                      className={`client-card ${formData.clientName === client.name ? 'selected' : ''}`}
                      onClick={() => handleClientSelect(client)}
                    >
                      <div className="client-avatar">
                        {client.name.charAt(0)}
                      </div>
                      <div className="client-info">
                        <h4>{client.name}</h4>
                        <p>{client.email}</p>
                        <p>{client.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="form-group">
                  <label>Nom du Client *</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="Nom complet du client"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      placeholder="email@exemple.mg"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      placeholder="+261 34 12 345 67"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section Commande */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <FiPackage />
                </div>
                <h2>Détails de la Commande</h2>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Type de Produit *</label>
                  <div className="product-types">
                    {orderTypes.map(type => (
                      <div
                        key={type.value}
                        className={`product-type ${formData.orderType === type.value ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ 
                          ...prev, 
                          orderType: type.value,
                          pricePerUnit: type.basePrice 
                        }))}
                      >
                        <span className="type-icon">{type.icon}</span>
                        <span className="type-label">{type.label}</span>
                        <span className="type-price">
                          {new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(type.basePrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Type de Design *</label>
                  <div className="design-types">
                    {designTypes.map(type => (
                      <div
                        key={type.value}
                        className={`design-type ${formData.designType === type.value ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, designType: type.value }))}
                      >
                        <span className="design-label">{type.label}</span>
                        <span className="design-multiplier">×{type.priceMultiplier}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Quantité *</label>
                  <div className="quantity-selector">
                    <button 
                      type="button"
                      className="quantity-btn"
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        quantity: Math.max(1, prev.quantity - 1) 
                      }))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        quantity: Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)) 
                      }))}
                      className="quantity-input"
                    />
                    <button 
                      type="button"
                      className="quantity-btn"
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        quantity: Math.min(1000, prev.quantity + 1) 
                      }))}
                    >
                      +
                    </button>
                    <span className="quantity-label">pièces</span>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Instructions Spéciales</label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  placeholder="Détails du design, couleurs spécifiques, placement, etc."
                  rows="4"
                />
              </div>
            </div>

            {/* Section Livraison & Priorité */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <FiCalendar />
                </div>
                <h2>Livraison & Priorité</h2>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date de Livraison Souhaitée *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="form-group">
                  <label>Priorité *</label>
                  <div className="priority-selector">
                    <div
                      className={`priority-option ${formData.priority === 'low' ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, priority: 'low' }))}
                    >
                      <span className="priority-dot low"></span>
                      <span className="priority-label">Basse</span>
                    </div>
                    <div
                      className={`priority-option ${formData.priority === 'medium' ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, priority: 'medium' }))}
                    >
                      <span className="priority-dot medium"></span>
                      <span className="priority-label">Moyenne</span>
                    </div>
                    <div
                      className={`priority-option ${formData.priority === 'high' ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, priority: 'high' }))}
                    >
                      <span className="priority-dot high"></span>
                      <span className="priority-label">Haute</span>
                    </div>
                    <div
                      className={`priority-option ${formData.priority === 'urgent' ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, priority: 'urgent' }))}
                    >
                      <span className="priority-dot urgent"></span>
                      <span className="priority-label">Urgent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Prix */}
            <div className="form-section price-section">
              <div className="section-header">
                <div className="section-icon">
                  <FiDollarSign />
                </div>
                <h2>Calcul du Prix</h2>
              </div>
              
              <div className="price-summary">
                <div className="price-row">
                  <span className="price-label">Prix unitaire:</span>
                  <span className="price-value">
                    {new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(formData.pricePerUnit)}
                  </span>
                </div>
                
                <div className="price-row">
                  <span className="price-label">Multiplicateur design ({designTypes.find(d => d.value === formData.designType)?.label}):</span>
                  <span className="price-value">×{designTypes.find(d => d.value === formData.designType)?.priceMultiplier}</span>
                </div>
                
                <div className="price-row">
                  <span className="price-label">Quantité:</span>
                  <span className="price-value">{formData.quantity} pièces</span>
                </div>
                
                <div className="price-divider"></div>
                
                <div className="price-row total">
                  <span className="price-label">Total:</span>
                  <span className="price-value">
                    {new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(calculateTotalPrice())}
                  </span>
                </div>
                
                <div className="price-row deposit">
                  <span className="price-label">Acompte recommandé (50%):</span>
                  <span className="price-value">
                    {new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(calculateDeposit())}
                  </span>
                </div>
                
                <div className="form-group">
                  <label>Montant de l'acompte</label>
                  <input
                    type="number"
                    value={formData.deposit}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      deposit: Math.min(calculateTotalPrice(), Math.max(0, parseInt(e.target.value) || 0)) 
                    }))}
                    min="0"
                    max={calculateTotalPrice()}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/app/dashboard')}
            >
              Annuler
            </button>
            
            <button 
              type="submit" 
              className="btn-primary"
            >
              <FiSave />
              Créer la Commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrdersNewPage;