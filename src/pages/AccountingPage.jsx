import React, { useState } from 'react';
import './AccountingPage.css';

const AccountingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Données de démo
  const invoices = [
    {
      id: 'FACT-1245',
      client: 'Boutique MadaStyle',
      date: '2024-12-15',
      amount: '2 400 000 Ar',
      status: 'paid',
      dueDate: '2024-12-30',
      items: ['150 T-shirts', '50 Casquettes']
    },
    {
      id: 'FACT-1244',
      client: 'École Les Génies',
      date: '2024-12-10',
      amount: '3 600 000 Ar',
      status: 'pending',
      dueDate: '2024-12-25',
      items: ['300 Polos scolaires']
    },
    {
      id: 'FACT-1243',
      client: 'Restaurant La Terrasse',
      date: '2024-12-05',
      amount: '450 000 Ar',
      status: 'paid',
      dueDate: '2024-12-20',
      items: ['25 Tabliers']
    },
  ];

  const expenses = [
    {
      id: 'DEP-1245',
      category: 'Matières premières',
      date: '2024-12-10',
      amount: '1 200 000 Ar',
      supplier: 'Textile MG',
      description: 'Achat T-shirts et encres'
    },
    {
      id: 'DEP-1244',
      category: 'Équipement',
      date: '2024-12-05',
      amount: '850 000 Ar',
      supplier: 'Printing Tools',
      description: 'Écrans et raclettes'
    },
    {
      id: 'DEP-1243',
      category: 'Transport',
      date: '2024-12-01',
      amount: '150 000 Ar',
      supplier: 'Carburant',
      description: 'Essence livraisons'
    },
  ];

  const stats = {
    totalRevenue: 6450000,
    totalExpenses: 2200000,
    pendingInvoices: 3600000,
    profit: 4250000,
    profitMargin: 65.9
  };

  return (
    <div className="accounting-page mobile-layout">
      <header className="mobile-header">
        <h1 className="mobile-title">💰 Comptabilité</h1>
        <div className="mobile-action">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Nouvelle facture
          </button>
        </div>
      </header>

      <main className="mobile-main-content">
        {/* Stats financières */}
        <section className="mobile-section">
          <h2 className="mobile-section-title">📊 Aperçu financier</h2>
          <div className="mobile-section-content">
            <div className="financial-stats">
              <div className="financial-stat revenue">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <div className="stat-value">{(stats.totalRevenue / 1000000).toFixed(1)}M Ar</div>
                  <div className="stat-label">Chiffre d'affaires</div>
                  <div className="stat-trend positive">+18%</div>
                </div>
              </div>
              <div className="financial-stat expenses">
                <div className="stat-icon">📉</div>
                <div className="stat-content">
                  <div className="stat-value">{(stats.totalExpenses / 1000000).toFixed(1)}M Ar</div>
                  <div className="stat-label">Dépenses</div>
                  <div className="stat-trend negative">+12%</div>
                </div>
              </div>
              <div className="financial-stat profit">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-value">{(stats.profit / 1000000).toFixed(1)}M Ar</div>
                  <div className="stat-label">Bénéfice</div>
                  <div className="stat-margin">{stats.profitMargin}% marge</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mobile-section">
          <div className="tabs-container">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Vue d'ensemble
            </button>
            <button 
              className={`tab ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              Factures
            </button>
            <button 
              className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
              onClick={() => setActiveTab('expenses')}
            >
              Dépenses
            </button>
          </div>
        </section>

        {/* Contenu des tabs */}
        {activeTab === 'invoices' && (
          <section className="mobile-section">
            <h2 className="mobile-section-title">🧾 Factures récentes</h2>
            <div className="mobile-section-content">
              <div className="invoices-list">
                {invoices.map(invoice => (
                  <div key={invoice.id} className="invoice-card">
                    <div className="invoice-header">
                      <div className="invoice-id">{invoice.id}</div>
                      <div className={`invoice-status status-${invoice.status}`}>
                        {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                      </div>
                    </div>
                    <div className="invoice-info">
                      <div className="info-row">
                        <span className="label">Client:</span>
                        <span className="value">{invoice.client}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Date:</span>
                        <span className="value">{invoice.date}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Échéance:</span>
                        <span className="value">{invoice.dueDate}</span>
                      </div>
                    </div>
                    <div className="invoice-amount">{invoice.amount}</div>
                    <div className="invoice-actions">
                      <button className="invoice-btn view">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Voir
                      </button>
                      <button className="invoice-btn download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Télécharger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'expenses' && (
          <section className="mobile-section">
            <h2 className="mobile-section-title">📉 Dépenses récentes</h2>
            <div className="mobile-section-content">
              <div className="expenses-list">
                {expenses.map(expense => (
                  <div key={expense.id} className="expense-card">
                    <div className="expense-category">
                      <div className="category-icon">
                        {expense.category === 'Matières premières' ? '🎨' : 
                         expense.category === 'Équipement' ? '🛠️' : '🚚'}
                      </div>
                      <span className="category-name">{expense.category}</span>
                    </div>
                    <div className="expense-details">
                      <div className="detail">
                        <span className="label">Fournisseur:</span>
                        <span className="value">{expense.supplier}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Date:</span>
                        <span className="value">{expense.date}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Description:</span>
                        <span className="value">{expense.description}</span>
                      </div>
                    </div>
                    <div className="expense-amount">{expense.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'overview' && (
          <section className="mobile-section">
            <h2 className="mobile-section-title">📅 Calendrier de paiement</h2>
            <div className="mobile-section-content">
              <div className="payment-calendar">
                <div className="calendar-week">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
                    <div key={day} className="calendar-day">
                      <div className="day-header">{day} {15 + idx}</div>
                      <div className="day-payments">
                        {invoices
                          .filter(inv => new Date(inv.dueDate).getDate() === 15 + idx)
                          .map(inv => (
                            <div key={inv.id} className="payment-item">
                              <span className="payment-client">{inv.client}</span>
                              <span className="payment-amount">{inv.amount}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AccountingPage;