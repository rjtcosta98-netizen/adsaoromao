'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DataProvider, useData } from '@/context/DataContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StoreCart } from '@/components/StoreCart';
import { CheckoutForm } from '@/components/CheckoutForm';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { CookieConsent } from '@/components/CookieConsent';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MaintenancePage } from '@/components/MaintenancePage';
import { useNavigate } from '@/hooks/useNavigate';
import { getPageIdFromPath } from '@/lib/routes';

// ══════════════════════════════════════════════════════════
//  MODO MANUTENÇÃO — Alterar para false para desativar
// ══════════════════════════════════════════════════════════
const MAINTENANCE_MODE = true;

function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [previousCartLength, setPreviousCartLength] = useState(0);
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useData();
  const navigate = useNavigate();
  const pathname = usePathname();

  const activePage = getPageIdFromPath(pathname);
  const isAdmin = pathname === '/admin';
  const isMaintenance = pathname === '/manutencao';

  useEffect(() => {
    if (MAINTENANCE_MODE || isMaintenance) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [isMaintenance]);

  // Auto open cart when item added
  useEffect(() => {
    if (cartItems.length > previousCartLength && cartItems.length > 0) {
      setIsCartOpen(true);
    }
    setPreviousCartLength(cartItems.length);
  }, [cartItems.length, previousCartLength]);

  // Modo manutenção ativo — mostrar coming soon em todas as páginas (exceto admin)
  if (MAINTENANCE_MODE && !isAdmin) {
    return <MaintenancePage />;
  }

  if (isMaintenance) {
    return <>{children}</>;
  }

  if (isAdmin) {
    return <div className="min-h-screen font-sans bg-gray-50">{children}</div>;
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

  return (
    <div className="min-h-screen font-sans bg-gray-50 animate-fade-in">
      <Navbar
        activePage={activePage}
        onNavigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      <main>{children}</main>

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
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <AppShell>{children}</AppShell>
    </DataProvider>
  );
}
