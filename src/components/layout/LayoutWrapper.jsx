// frontend/src/components/layout/LayoutWrapper.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MobileNavbar from './Navbar';
import './LayoutWrapper.css';

const LayoutWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Détecter les changements de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fermer sidebar sur changement de route (mobile)
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Déterminer le type de layout
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isClientRoute = location.pathname.startsWith('/client');
  const isProtectedRoute = isAdminRoute || isClientRoute;

  // Layout Public (visiteurs)
  if (!user || (!isProtectedRoute && !isAdminRoute)) {
    return (
      <div className="public-layout">
        <Header type="public" isMobile={isMobile} />
        <main className="public-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  // Layout Admin (utilisateurs connectés)
  if (isAdminRoute && user) {
    return (
      <div className="admin-layout">
        <Header 
          type="admin" 
          isMobile={isMobile}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <div className="admin-content-wrapper">
          {/* Sidebar Desktop */}
          {!isMobile && (
            <Sidebar />
          )}

          {/* Sidebar Mobile Overlay */}
          {isMobile && isSidebarOpen && (
            <div className="mobile-sidebar-overlay" onClick={() => setIsSidebarOpen(false)}>
              <div className="mobile-sidebar" onClick={e => e.stopPropagation()}>
                <Sidebar isMobile={true} onClose={() => setIsSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Contenu principal */}
          <main className="admin-main-content">
            <div className="content-container">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Navigation mobile */}
        {isMobile && (
          <MobileNavbar 
            currentPath={location.pathname}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}
      </div>
    );
  }

  // Layout Client (clients connectés)
  if (isClientRoute && user) {
    return (
      <div className="client-layout">
        <Header type="client" />
        <main className="client-main">
          <div className="client-container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Par défaut
  return (
    <div className="default-layout">
      <Outlet />
    </div>
  );
};

export default LayoutWrapper;