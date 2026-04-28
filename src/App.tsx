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
import { CupSupportBanner } from '@/components/CupSupportBanner';

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
import { VotingPage } from '@/pages/VotingPage';
import { CookiePolicyPage } from '@/components/CookiePolicyPage';
import { getPageRoute } from '@/lib/routes';

// ══════════════════════════════════════════════════════════
//  MODO MANUTENÇÃO — Alterar para false para desativar
// ══════════════════════════════════════════════════════════
const MAINTENANCE_MODE = false;

const GLOBAL_PARTY_CONFETTI = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${2 + (i * 2.7) % 96}%`,
  delay: `${(i * 0.23) % 5}s`,
  dur: `${4.8 + (i * 0.16) % 2.5}s`,
  rot: `${(i * 33) % 360}deg`,
  width: i % 3 === 0 ? 11 : 8,
  height: i % 3 === 0 ? 3 : 2,
  color: i % 2 === 0 ? '#ffd700' : '#4aa8ff',
  opacity: 0.35 + (i % 5) * 0.1,
}));

const GLOBAL_PARTY_SPARKS = Array.from({ length: 44 }, (_, i) => ({
  id: i,
  left: `${1 + (i * 2.25) % 98}%`,
  delay: `${(i * 0.19) % 4.2}s`,
  dur: `${3.3 + (i * 0.14) % 1.9}s`,
  size: i % 4 === 0 ? 5 : i % 4 === 1 ? 3 : 4,
  color: i % 3 === 0 ? '#ffffff' : i % 2 === 0 ? '#ffd700' : '#5cb8ff',
  opacity: 0.45 + (i % 4) * 0.12,
}));

const GLOBAL_PARTY_STREAMERS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${3 + (i * 7.1) % 94}%`,
  delay: `${(i * 0.31) % 4}s`,
  dur: `${7.5 + (i * 0.27) % 2.8}s`,
  rot: `${(i % 2 === 0 ? -1 : 1) * (10 + (i % 5) * 7)}deg`,
  color: i % 2 === 0 ? 'rgba(255, 215, 0, 0.45)' : 'rgba(74, 168, 255, 0.45)',
}));

const GLOBAL_STADIUM_BEAMS = [
  { left: '8%', rot: '-28deg', color: 'rgba(255,215,0,0.26)', blur: 26, height: '78%' },
  { left: '24%', rot: '-10deg', color: 'rgba(74,168,255,0.22)', blur: 24, height: '74%' },
  { left: '42%', rot: '4deg', color: 'rgba(255,215,0,0.22)', blur: 28, height: '80%' },
  { left: '62%', rot: '18deg', color: 'rgba(74,168,255,0.24)', blur: 24, height: '72%' },
  { left: '82%', rot: '32deg', color: 'rgba(255,215,0,0.24)', blur: 26, height: '76%' },
];

interface PartyDuoPopup {
  id: number;
  top: string;
  mascoteLeft: boolean;
}

function AppShell() {
  const [loading, setLoading] = useState(true);
  const [maintenanceActive, setMaintenanceActive] = useState(MAINTENANCE_MODE);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [previousCartLength, setPreviousCartLength] = useState(0);
  const [partyDuoPopup, setPartyDuoPopup] = useState<PartyDuoPopup | null>(null);
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

  // Popups discretos: a cada 7s aparece mascote + cachecol em simultaneo nas laterais.
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let hideTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let active = true;

    const spawn = () => {
      if (!active) return;
      const isMobile = window.innerWidth < 768;
      const top = isMobile ? `${22 + Math.random() * 28}%` : `${18 + Math.random() * 44}%`;
      const mascoteLeft = Math.random() > 0.5;

      setPartyDuoPopup({
        id: Date.now(),
        top,
        mascoteLeft,
      });

      hideTimeoutId = setTimeout(() => {
        if (!active) return;
        setPartyDuoPopup(null);
      }, 4400);
    };

    spawn();
    intervalId = setInterval(spawn, 7000);

    return () => {
      active = false;
      if (intervalId) clearInterval(intervalId);
      if (hideTimeoutId) clearTimeout(hideTimeoutId);
    };
  }, []);

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
      {/* Festa global da Taça — camadas atrás do conteúdo */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute inset-0">
          {GLOBAL_STADIUM_BEAMS.map((beam, index) => (
            <div
              key={index}
              className="absolute top-0 global-stadium-beam"
              style={{
                left: beam.left,
                width: '130px',
                height: beam.height,
                background: `linear-gradient(to bottom, ${beam.color}, transparent)`,
                transform: `rotate(${beam.rot})`,
                transformOrigin: 'top center',
                filter: `blur(${beam.blur}px)`,
                animationDelay: `${index * 0.35}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {GLOBAL_PARTY_SPARKS.map(piece => (
            <div
              key={piece.id}
              className="absolute rounded-full global-party-spark"
              style={{
                left: piece.left,
                top: '-10px',
                width: piece.size,
                height: piece.size,
                background: piece.color,
                opacity: piece.opacity,
                animationDuration: piece.dur,
                animationDelay: piece.delay,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {GLOBAL_PARTY_STREAMERS.map(streamer => (
            <div
              key={streamer.id}
              className="absolute global-party-streamer"
              style={{
                left: streamer.left,
                top: '-24px',
                height: '150px',
                width: '2px',
                background: `linear-gradient(to bottom, ${streamer.color}, transparent)`,
                transform: `rotate(${streamer.rot})`,
                animationDuration: streamer.dur,
                animationDelay: streamer.delay,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 global-party-flares" />
        <div className="absolute inset-0 global-party-white-space-ink" />
        <div className="absolute inset-0 global-party-grain" />
        <div className="absolute inset-0 global-party-crowd-wave" />
        <div className="absolute inset-0 global-party-goal-flash" />
      </div>

      {/* Só confettis passam à frente do texto */}
      <div className="fixed inset-0 z-[30] pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute inset-0">
          {GLOBAL_PARTY_CONFETTI.map(piece => (
            <div
              key={piece.id}
              className="absolute rounded-full global-party-confetti"
              style={{
                left: piece.left,
                top: '-12px',
                width: piece.width,
                height: piece.height,
                background: piece.color,
                opacity: piece.opacity,
                transform: `rotate(${piece.rot})`,
                animationDuration: piece.dur,
                animationDelay: piece.delay,
              }}
            />
          ))}
        </div>

        {partyDuoPopup && (
          <div className="absolute inset-0">
            <div
              className={`absolute ${partyDuoPopup.mascoteLeft ? 'global-party-sticker-left' : 'global-party-sticker-right'}`}
              style={{
                top: partyDuoPopup.top,
              }}
            >
              <img
                src="/images/TACA/mascote.png"
                alt="mascote"
                width={116}
                height={116}
                className="global-mascot-img object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
              />
            </div>

            <div
              className={`absolute ${partyDuoPopup.mascoteLeft ? 'global-party-sticker-right' : 'global-party-sticker-left'}`}
              style={{
                top: `calc(${partyDuoPopup.top} + 6px)`,
              }}
            >
              <img
                src="/images/TACA/cachecol.png"
                alt="cachecol"
                width={142}
                height={142}
                className="global-scarf-img object-contain rotate-90 drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        )}
      </div>

      <div className="relative z-[10]">
      <Navbar
        activePage={activePage}
        onNavigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />
      <CupSupportBanner />

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
          <Route path="/votacao" element={<VotingPage />} />
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
