'use client';

import { NewsPage } from '@/components/NewsPage';
import { useNavigate } from '@/hooks/useNavigate';
import { useData } from '@/context/DataContext';

export default function Noticias() {
  const navigate = useNavigate();
  const { cartItems } = useData();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <NewsPage
      onNavigate={navigate}
      activePage="noticias"
      cartCount={cartCount}
      onOpenCart={() => {}}
    />
  );
}
