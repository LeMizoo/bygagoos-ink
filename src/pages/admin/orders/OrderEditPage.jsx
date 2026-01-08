import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiSave,
  FiPrinter,
  FiMail,
  FiDownload,
  FiUser,
  FiPackage,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX
} from 'react-icons/fi';
import './OrderEditPage.css';

const OrderEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    orderNumber: '',
    status: 'en_attente',
    totalAmount: '',
    dueDate: '',
    notes: '',
    items: []
  });

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      const mockOrder = {
        id: parseInt(id),
        orderNumber: `CMD-2024-${String(id).padStart(3, '0')}`,
        clientName: 'SARL Malagasy Style',
        clientEmail: 'contact@malagasy-style.mg',
        clientPhone: '+261 34 12 345 67',
        status: 'en_production',
        totalAmount: '1 250 000 Ar',
        dueDate: '2024-01-30',
        createdAt: '2024-01-15',
        items: [
          { id: 1, name: 'T-shirts Sérigraphiés', quantity: 100, unitPrice: '8 000', total: '800 000 Ar' },
          { id: 2, name: 'Casquettes Brodées', quantity: 50, unitPrice: '5 000', total: '250 000 Ar' },
          { id: 3, name: 'Stickers Personnalisés', quantity: 200, unitPrice: '1 000', total: '200 000 Ar' }
        ],
        notes: 'Livraison prévue à l&apos;adresse du client. Contactez le client avant la livraison.'
      };
      
      setOrder(mockOrder);
      setFormData({
        clientName: mockOrder.clientName,
        clientEmail: mockOrder.clientEmail,
        clientPhone: mockOrder.clientPhone,
        orderNumber: mockOrder.orderNumber,
        status: mockOrder.status,
        totalAmount: mockOrder.totalAmount,
        dueDate: mockOrder.dueDate,
        notes: mockOrder.notes,
        items: [...mockOrder.items]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculer le total
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = parseInt(newItems[index].quantity) || 0;
      const unitPrice = parseInt(newItems[index].unitPrice.replace(/\D/g, '')) || 0;
      newItems[index].total = (quantity * unitPrice).toLocaleString('fr-MG') + ' Ar';
    }
    
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    const newItem = {
      id: formData.items.length + 1,
      name: '',
      quantity: 1,
      unitPrice: '0',
      total: '0 Ar'
    };
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const calculateTotal = () => {
    const total = formData.items.reduce((sum, item) => {
      const itemTotal = parseInt(item.total.replace(/\D/g, '')) || 0;
      return sum + itemTotal;
    }, 0);
    
    return total.toLocaleString('fr-MG') + ' Ar';
  };

  const handleSave = () => {
    console.log('Sauvegarder les modifications:', formData);
    alert('Commande mise à jour avec succès !');
    navigate('/app/orders');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    alert(`Email envoyé au client: ${formData.clientEmail}`);
  };

  const handleCancelOrder = () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
      alert('Commande annulée avec succès !');
      navigate('/app/orders');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'nouveau': { label: 'Nouveau', color: 'bg-blue-100 text-blue-800' },
      'en_attente': { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      'en_production': { label: 'En production', color: 'bg-purple-100 text-purple-800' },
      'termine': { label: 'Terminé', color: 'bg-green-100 text-green-800' },
      'livre': { label: 'Livré', color: 'bg-indigo-100 text-indigo-800' },
      'annule': { label: 'Annulé', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-white rounded-xl shadow-sm"></div>
            <div className="h-96 bg-white rounded-xl shadow-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center py-12">
            <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Commande non trouvée</h2>
            <p className="text-gray-600 mb-6">
              La commande avec l&apos;ID {id} n&apos;existe pas ou a été supprimée.
            </p>
            <button
              onClick={() => navigate('/app/orders')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiArrowLeft />
              Retour aux commandes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 order-edit-page">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app/orders')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FiArrowLeft />
            Retour
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Édition de commande
            </h1>
            <p className="text-gray-600 mt-1">
              {formData.orderNumber} • {formData.clientName}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FiPrinter />
            Imprimer
          </button>
          <button
            onClick={handleSendEmail}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FiMail />
            Envoyer
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiSave />
            Enregistrer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informations générales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de commande
                </label>
                <input
                  type="text"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="nouveau">Nouveau</option>
                  <option value="en_attente">En attente</option>
                  <option value="en_production">En production</option>
                  <option value="termine">Terminé</option>
                  <option value="livre">Livré</option>
                  <option value="annule">Annulé</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du client
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email du client
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d&apos;échéance
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Articles de la commande */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Articles commandés
              </h2>
              <button
                onClick={addItem}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <FiPlus />
                Ajouter un article
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix unitaire
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                          placeholder="Nom de l'article"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                          min="1"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                            className="w-32 px-3 py-1 border border-gray-300 rounded-lg"
                            placeholder="0 Ar"
                          />
                          <span className="text-gray-500">Ar</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {item.total}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-right font-bold text-gray-700">
                      Total général:
                    </td>
                    <td colSpan="2" className="px-4 py-3 font-bold text-lg text-green-600">
                      {calculateTotal()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          {/* Résumé */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Résumé
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Statut actuel:</span>
                {getStatusBadge(formData.status)}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Date création:</span>
                <span className="font-medium">{order.createdAt}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Date échéance:</span>
                <span className="font-medium">{formData.dueDate}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Nombre d&apos;articles:</span>
                <span className="font-medium">{formData.items.length}</span>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-green-600">{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Client
            </h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">{formData.clientName}</p>
                <p className="text-sm text-gray-600">{formData.clientEmail}</p>
                <p className="text-sm text-gray-600">{formData.clientPhone}</p>
              </div>
              
              <Link
                to="/app/clients"
                className="block w-full px-4 py-2 text-center border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <FiUser className="inline mr-2" />
                Voir fiche client
              </Link>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Actions rapides
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setFormData(prev => ({ ...prev, status: 'termine' }))}
                className="w-full px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
              >
                <FiCheckCircle />
                Marquer comme terminé
              </button>
              
              <button
                onClick={handlePrint}
                className="w-full px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
              >
                <FiDownload />
                Télécharger le bon
              </button>
              
              <button
                onClick={handleCancelOrder}
                className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
              >
                <FiAlertCircle />
                Annuler la commande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEditPage;