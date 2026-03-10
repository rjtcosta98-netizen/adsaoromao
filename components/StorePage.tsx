'use client';


import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { StoreHero } from './StoreHero';
import { StoreCatalog } from './StoreCatalog';

export const StorePage: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useData();

  const handleCheckout = () => {
    alert("Checkout functionality would go here! Thank you for supporting ADSR.");
    clearCart();
  };

  return (
    <div className="relative">
      <StoreHero />
      <StoreCatalog onAddToCart={addToCart} />
    </div>
  );
};
