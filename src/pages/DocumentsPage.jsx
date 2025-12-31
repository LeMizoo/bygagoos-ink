import React, { useState } from 'react';
import { MobileLayout, MobileSection, MobileCard } from '../components/layout/MobileLayout';
import './DocumentsPage.css';

const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('designs');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données de démo
  const documentCategories = [
    { id: 'designs', name: 'Designs', count: 45, icon: '🎨', color: '#8b5cf6' },
    { id: 'contracts', name: 'Contrats', count: 12, icon: '📝', color: '#10b981' },
    { id: 'invoices', name: 'Factures', count: 28, icon: '🧾', color: '#3b82f6' },
    { id: 'certificates', name: 'Certifications', count: 8, icon: '📜', color: '#f59e0b' },
    { id: 'templates', name: 'Modèles', count: 15, icon: '📋', color: '#ef4444' },
    { id: 'archives', name: 'Archives', count: 156, icon: '🗄️', color: '#6b7280' },
  ];

  const designs = [
    {
      id: 1,
      name: 'Logo ByGagoos Ink',
      type: 'logo',
      category: 'branding',
      size: '2.4 MB',
      lastModified: '2024-12-15',
      version: '3.2',
      status: 'final',
      preview: '/logo.png',
      tags: ['logo', 'branding', 'entreprise']
    },
    {
      id: 2,
      name: 'Design T-shirt MadaStyle',
      type: 'print',
      category: 'client',
      size: '5.7 MB',
      lastModified: '2024-12-14',
      version: '2.1',
      status: 'approved',
      preview: '/designs/tshirt-madastyle.jpg',
      tags: ['tshirt', 'client', 'impression']
    },
    {
      id: 3,
      name: 'Template Polo scolaire',
      type: 'template',
      category: 'education',
      size: '3.2 MB',
      lastModified: '2024-12-10',
      version: '1.5',
      status: 'draft',
      preview: '/designs/polo-template.jpg',
      tags: ['polo', 'scolaire', 'template']
    },
    {
      id: 4,
      name: 'Pattern textile traditionnel',
      type: 'pattern',
      category: 'traditional',
      size: '8.1 MB',
      lastModified: '2024-12-05',
      version: '4.0',
      status: 'final',
      preview: '/designs/pattern-traditionnel.jpg',
      tags: ['pattern', 'traditionnel', 'madagascar']
    },
  ];

  const contracts = [
    {
      id: 1,
      name: 'Contrat SARL Malagasy Style',
      client: 'SARL Malagasy Style',
      date: '2024-11-20',
      expiry: '2025-11-20',
      status: 'active',
      value: '5 000 000 Ar',
      fileSize: '1.2 MB',
      tags: ['contrat', 'entreprise', 'annuel']
    },
    {
      id: 2,
      name: 'Contrat École Les Génies',
      client: 'École Les Petits Génies',
      date: '2024-09-15',
      expiry: '2025-06-30',
      status: 'active',
      value: '3 600 000 Ar',
      fileSize: '980 KB',
      tags: ['contrat', 'éducation', 'scolaire']
    },
  ];

  const invoices = [
    {
      id: 1,
      number: 'FACT-2024-1245',
      client: 'Boutique MadaStyle',
      date: '2024-12-15',
      amount: '2 400 000 Ar',
      status: 'paid',
      dueDate: '2024-12-30',
      pdfSize: '850 KB',
      tags: ['facture', 'payée', 'décembre']
    },
    {
      id: 2,
      number: 'FACT-2024-1244',
      client: 'Restaurant La Terrasse',
      date: '2024-12-10',
      amount: '450 000 Ar',
      status: 'pending',
      dueDate: '2024-12-25',
      pdfSize: '720 KB',
      tags: ['facture', 'en attente', 'décembre']
    },
  ];

  const actionButton = (
    <button
      onClick={() => {}}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      aria-label="Nouveau document"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="hidden sm:inline">Nouveau</span>
    </button>
  );

  return (
    <MobileLayout 
      title="Documents" 
      actionButton={actionButton}
    >
      {/* Tabs */}
      <MobileSection>
        <div className="doc-tabs">
          <button 
            className={`doc-tab ${activeTab === 'designs' ? 'active' : ''}`}
            onClick={() => setActiveTab('designs')}
          >
            <span className="tab-icon">🎨</span>
            <span className="tab-label">Designs</span>
          </button>
          <button 
            className={`doc-tab ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
          >
            <span className="tab-icon">📝</span>
            <span className="tab-label">Contrats</span>
          </button>
          <button 
            className={`doc-tab ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            <span className="tab-icon">🧾</span>
            <span className="tab-label">Factures</span>
          </button>
        </div>
      </MobileSection>

      {/* Statistiques */}
      <MobileSection title="📊 Vue d'ensemble">
        <div className="doc-stats-grid">
          {documentCategories.slice(0, 4).map(category => (
            <div key={category.id} className="doc-stat-card">
              <div className="stat-icon" style={{ color: category.color }}>
                {category.icon}
              </div>
              <div className="stat-content">
                <div className="stat-value">{category.count}</div>
                <div className="stat-label">{category.name}</div>
              </div>
            </div>
          ))}
        </div>
      </MobileSection>

      {/* Designs */}
      {activeTab === 'designs' && (
        <>
          <MobileSection title="🎨 Designs récents">
            <div className="designs-grid">
              {designs.map(design => (
                <div key={design.id} className="design-card">
                  <div className="design-preview">
                    <div className="preview-image">
                      <img 
                        src={design.preview} 
                        alt={design.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = design.icon;
                        }}
                      />
                    </div>
                    <div className={`design-status ${design.status}`}>
                      {design.status === 'final' ? 'Final' : 
                       design.status === 'approved' ? 'Approuvé' : 'Brouillon'}
                    </div>
                  </div>
                  <div className="design-info">
                    <h3 className="design-name">{design.name}</h3>
                    <div className="design-meta">
                      <span className="meta-item">Version {design.version}</span>
                      <span className="meta-item">• {design.size}</span>
                      <span className="meta-item">• {design.lastModified}</span>
                    </div>
                    <div className="design-tags">
                      {design.tags.map(tag => (
                        <span key={tag} className="design-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="design-actions">
                    <button className="design-action-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="design-action-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="design-action-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </MobileSection>

          <MobileSection title="📁 Catégories de designs">
            <div className="categories-grid">
              {documentCategories.filter(c => ['designs', 'templates'].includes(c.id)).map(category => (
                <button
                  key={category.id}
                  className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
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
          </MobileSection>
        </>
      )}

      {/* Contrats */}
      {activeTab === 'contracts' && (
        <MobileSection title="📝 Contrats en cours">
          <div className="contracts-list">
            {contracts.map(contract => (
              <div key={contract.id} className="contract-card">
                <div className="contract-header">
                  <div className="contract-icon">📝</div>
                  <div>
                    <h3 className="contract-name">{contract.name}</h3>
                    <div className="contract-client">{contract.client}</div>
                  </div>
                  <div className={`contract-status ${contract.status}`}>
                    {contract.status === 'active' ? 'Actif' : 'Expiré'}
                  </div>
                </div>
                <div className="contract-details">
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{contract.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Expiration:</span>
                    <span className="detail-value">{contract.expiry}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Valeur:</span>
                    <span className="detail-value">{contract.value}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Taille:</span>
                    <span className="detail-value">{contract.fileSize}</span>
                  </div>
                </div>
                <div className="contract-tags">
                  {contract.tags.map(tag => (
                    <span key={tag} className="contract-tag">{tag}</span>
                  ))}
                </div>
                <div className="contract-actions">
                  <button className="contract-action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Consulter
                  </button>
                  <button className="contract-action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MobileSection>
      )}

      {/* Factures */}
      {activeTab === 'invoices' && (
        <MobileSection title="🧾 Factures récentes">
          <div className="invoices-list">
            {invoices.map(invoice => (
              <div key={invoice.id} className="invoice-card">
                <div className="invoice-header">
                  <div className="invoice-number">{invoice.number}</div>
                  <div className={`invoice-status ${invoice.status}`}>
                    {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                  </div>
                </div>
                <div className="invoice-details">
                  <div className="detail-row">
                    <span className="detail-label">Client:</span>
                    <span className="detail-value">{invoice.client}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{invoice.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Montant:</span>
                    <span className="detail-value invoice-amount">{invoice.amount}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Échéance:</span>
                    <span className="detail-value">{invoice.dueDate}</span>
                  </div>
                </div>
                <div className="invoice-tags">
                  {invoice.tags.map(tag => (
                    <span key={tag} className="invoice-tag">{tag}</span>
                  ))}
                </div>
                <div className="invoice-actions">
                  <button className="invoice-action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Voir PDF
                  </button>
                  <button className="invoice-action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Envoyer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MobileSection>
      )}

      {/* Espace de stockage */}
      <MobileSection title="💾 Espace de stockage">
        <div className="storage-info">
          <div className="storage-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <div className="storage-details">
              <span className="storage-used">8.7 GB utilisés</span>
              <span className="storage-total">sur 15 GB</span>
            </div>
          </div>
          <div className="storage-stats">
            <div className="storage-stat">
              <div className="stat-icon">📁</div>
              <div className="stat-content">
                <div className="stat-value">254</div>
                <div className="stat-label">Fichiers</div>
              </div>
            </div>
            <div className="storage-stat">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">12.4 GB</div>
                <div className="stat-label">Documents</div>
              </div>
            </div>
          </div>
        </div>
      </MobileSection>
    </MobileLayout>
  );
};

export default DocumentsPage;