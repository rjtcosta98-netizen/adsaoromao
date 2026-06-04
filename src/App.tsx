import { Routes, Route, useLocation, useNavigate as useRouterNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { DataProvider, useData } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StoreCart } from '@/components/StoreCart';
import { CheckoutForm } from '@/components/CheckoutForm';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { CookieConsent } from '@/components/CookieConsent';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MaintenancePage } from '@/components/MaintenancePage';
import { getPageRoute } from '@/lib/routes';

// Pages — lazy loaded para reduzir o bundle inicial
const HomePage         = lazy(() => import('@/components/HomePage').then(m => ({ default: m.HomePage })));
const ClubPage         = lazy(() => import('@/components/ClubPage').then(m => ({ default: m.ClubPage })));
const TeamsPage        = lazy(() => import('@/components/TeamsPage').then(m => ({ default: m.TeamsPage })));
const RegistrationPage = lazy(() => import('@/components/RegistrationPage').then(m => ({ default: m.RegistrationPage })));
const MembershipPage   = lazy(() => import('@/components/MembershipPage').then(m => ({ default: m.MembershipPage })));
const SponsorsPage     = lazy(() => import('@/components/SponsorsPage').then(m => ({ default: m.SponsorsPage })));
const GalleryPage      = lazy(() => import('@/components/GalleryPage').then(m => ({ default: m.GalleryPage })));
const AlbumDetailWrapper = lazy(() => import('@/pages/AlbumDetailWrapper').then(m => ({ default: m.AlbumDetailWrapper })));
const NewsPage         = lazy(() => import('@/components/NewsPage').then(m => ({ default: m.NewsPage })));
const NewsDetailWrapper = lazy(() => import('@/pages/NewsDetailWrapper').then(m => ({ default: m.NewsDetailWrapper })));
const ContactsPage     = lazy(() => import('@/components/ContactsPage').then(m => ({ default: m.ContactsPage })));
const StorePage        = lazy(() => import('@/components/StorePage').then(m => ({ default: m.StorePage })));
const AdminDashboard   = lazy(() => import('@/components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const PrivacyPolicyPage = lazy(() => import('@/components/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage        = lazy(() => import('@/components/TermsPage').then(m => ({ default: m.TermsPage })));
const VotingPage       = lazy(() => import('@/pages/VotingPage').then(m => ({ default: m.VotingPage })));
const CookiePolicyPage = lazy(() => import('@/components/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));

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

  // Desliga a restauração de scroll do browser — nós controlamos a posição.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Cada rota abre sempre no topo, independentemente de como se navegou
  // (links, botão voltar/avançar, navegação programática).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <Suspense fallback={null}>
          <Routes>
            <Route path="/admin" element={<AdminDashboard onLogout={() => routerNavigate('/')} />} />
          </Routes>
        </Suspense>
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

      <div className="relative z-[10]">
      <Navbar
        activePage={activePage}
        onNavigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />
      <main>
        <Suspense fallback={null}>
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
            <Route path="/votacao" element={<VotingPage />} />
          </Routes>
        </Suspense>
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
      </div>
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
