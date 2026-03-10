'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { LOGO_URL } from '../constants';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '351968966375'; // Número de WhatsApp do clube
  const message = 'Olá! Tenho uma dúvida sobre o clube AD São Romão.';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Box Container */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-48px)] max-w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-900 to-blue-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="AD São Romão" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-bold text-sm md:text-base">AD São Romão</h3>
                <p className="text-xs opacity-90">Normalmente responde em poucas horas</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="h-64 flex flex-col justify-between p-4 bg-white">
            <div className="space-y-3">
              <div className="bg-blue-100 rounded-lg p-3 max-w-xs text-sm text-gray-800">
                Olá! 👋 Como podemos ajudar?
              </div>
              <div className="bg-blue-100 rounded-lg p-3 max-w-xs text-sm text-gray-800">
                Estamos disponíveis para tirar dúvidas sobre sócios, loja, eventos e muito mais.
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-green-900 to-green-900 text-white font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider shadow-md hover:shadow-lg"
            >
              <MessageCircle size={16} />
              Enviar Mensagem
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => {
          if (isOpen) {
            handleWhatsAppClick();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="group relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-full shadow-lg hover:shadow-2xl transition-all flex items-center justify-center text-white hover:scale-110 active:scale-95"
        title="Falar connosco no WhatsApp"
      >
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full opacity-0 group-hover:opacity-20 animate-pulse"></div>

        {/* Icon */}
        <MessageCircle size={24} className="md:w-7 md:h-7 relative z-10" strokeWidth={1.5} />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Enviar mensagem
        </div>
      </button>
    </div>
  );
};
