'use client';

import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se já foi aceito
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy-900 text-white p-4 md:p-6 border-t border-yellow-400 shadow-2xl">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Content */}
          <div className="flex items-start gap-3 md:gap-4 flex-1">
            <Cookie size={20} className="text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-sm md:text-base uppercase mb-1">Política de Cookies</h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Utilizamos cookies para melhorar a sua experiência no site. Ao continuar a navegar, está a consentir o seu uso.
                <a href="#" className="text-yellow-400 hover:underline ml-1">Saiba mais</a>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="flex-1 md:flex-none px-4 py-2 rounded border border-gray-400 text-gray-300 hover:text-white hover:border-white text-xs md:text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-4 py-2 rounded bg-yellow-400 text-navy-900 hover:bg-yellow-500 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Aceitar
            </button>
            <button
              onClick={handleReject}
              className="hidden md:flex p-2 text-gray-400 hover:text-white transition-colors"
              title="Fechar"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
