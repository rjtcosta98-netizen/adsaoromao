import { Routes, Route, useLocation, useNavigate as useRouterNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { DataProvider, useData } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StoreCart } from '@/components/StoreCart';
import { CheckoutForm } from '@/components/CheckoutForm';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { CookieConsent } from '@/components/CookieConsent';
import { MatchDayPopup } from '@/components/MatchDayPopup';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MaintenancePage } from '@/components/MaintenancePage';

// Pages
import { HomePage } from '@/components/HomePage';
import { ClubPage } from '@/components/ClubPage';
import { TeamsPage } from '@/components/TeamsPage';
import { RegistrationPage } from '@/components/RegistrationPage';
import { MembershipPage } from '@/components/MembershipPage';
import { SponsorsPage } from '@/components/SponsorsPage';
import { GalleryPage } from '@/components/GalleryPage';
import { AlbumDetailWrapper } from '@/pages/AlbumDetailWrapper';
import { NewsPage } from '@/components/NewsPage';
import { NewsDetailWrapper } from '@/pages/NewsDetailWrapper';
import { ContactsPage } from '@/components/ContactsPage';
import { StorePage } from '@/components/StorePage';
import { AdminDashboard } from '@/components/AdminDashboard';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';
import { TermsPage } from '@/components/TermsPage';
import { CookiePolicyPage } from '@/components/CookiePolicyPage';
import { getPageRoute } from '@/lib/routes';

// ══════════════════════════════════════════════════════════
//  MODO MANUTENÇÃO — Alterar para false para desativar
// ══════════════════════════════════════════════════════════
const MAINTENANCE_MODE = false;

function AppShell() {
  const [loading, setLoading] = useState(true);
  const [maintenanceActive, setMaintenanceActive] = useState(MAINTENANCE_MODE);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [previousCartLength, setPreviousCartLength] = useState(0);
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useData();
  const location = useLocation();
  const routerNavigate = useRouterNavigate();

  const navigate = useCallback((page: string, id?: number) => {
    const route = getPageRoute(page, id);
    window.scrollTo(0, 0);
    routerNavigate(route);
  }, [routerNavigate]);

  const pathname = location.pathname;
  const isAdmin = pathname === '/admin';
  const isMaintenance = pathname === '/manutencao';

  // Handler para quando o countdown terminar e o site for lançado
  const handleSiteLaunch = useCallback(() => {
    setMaintenanceActive(false);
    routerNavigate('/');
  }, [routerNavigate]);

  useEffect(() => {
    if (maintenanceActive || isMaintenance) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [maintenanceActive, isMaintenance]);

  // Auto open cart when item added
  useEffect(() => {
    if (cartItems.length > previousCartLength && cartItems.length > 0) {
      setIsCartOpen(true);
    }
    setPreviousCartLength(cartItems.length);
  }, [cartItems.length, previousCartLength]);

  // Modo manutenção ativo — mostrar coming soon em todas as páginas (exceto admin)
  if (maintenanceActive && !isAdmin) {
    return <MaintenancePage onLaunch={handleSiteLaunch} />;
  }

  if (isMaintenance) {
    return <MaintenancePage onLaunch={handleSiteLaunch} />;
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen font-sans bg-gray-50">
        <Routes>
          <Route path="/admin" element={<AdminDashboard onLogout={() => routerNavigate('/')} />} />
        </Routes>
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
    clearCart();
  };

  const total = cartItems.reduce((sum, item) => sum + (parseFloat(String(item.price).replace('€', '')) * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const activePage = pathname === '/' ? 'home' : pathname.slice(1).split('/')[0];

  return (
    <div className="min-h-screen font-sans bg-gray-50 animate-fade-in">
      <Navbar
        activePage={activePage}
        onNavigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={navigate} />} />
          <Route path="/clube" element={<ClubPage />} />
          <Route path="/equipas" element={<TeamsPage />} />
          <Route path="/inscricoes" element={<RegistrationPage />} />
          <Route path="/socios" element={<MembershipPage />} />
          <Route path="/patrocinadores" element={<SponsorsPage />} />
          <Route path="/galeria" element={<GalleryPage onNavigate={navigate} />} />
          <Route path="/galeria/:id" element={<AlbumDetailWrapper onNavigate={navigate} />} />
          <Route path="/noticias" element={<NewsPage onNavigate={navigate} />} />
          <Route path="/noticias/:id" element={<NewsDetailWrapper onNavigate={navigate} />} />
          <Route path="/contactos" element={<ContactsPage />} />
          <Route path="/loja" element={<StorePage />} />
          <Route path="/privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
        </Routes>
      </main>

      <StoreCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartItemQuantity}
        onCheckout={handleCheckout}
      />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
        items={cartItems}
        total={total}
      />

      <Footer onNavigate={navigate} />
      <WhatsAppWidget />
      <CookieConsent />
      <MatchDayPopup />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppShell />
    </DataProvider>
  );
}
