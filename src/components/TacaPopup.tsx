import React, { useEffect, useState } from 'react';
import { X, Clock, MapPin } from 'lucide-react';

export const TacaPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
      onClick={() => setVisible(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative">
          <img
            src="/images/festa-taca.jpg"
            alt="A Festa da Taça"
            className="w-full object-cover"
            style={{ maxHeight: '260px', objectPosition: 'top' }}
          />
          {/* Close button over image */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Match card */}
        <div className="bg-white px-6 py-5">
          {/* Competition label */}
          <p className="text-center text-[#003087] font-bold text-sm mb-4 uppercase tracking-wide">
            🏆 Taça de Honra ComuniLog · AF Guarda
          </p>

          {/* Info chips */}
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <Clock size={15} className="text-[#003087] shrink-0" />
              <span className="text-[#003087] text-sm font-semibold">
                Esta <strong>6ª feira</strong> às <strong>15h15</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <MapPin size={15} className="text-[#003087] shrink-0" />
              <span className="text-[#003087] text-sm font-semibold">
                Estádio N.S. da Conceição
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm text-center leading-relaxed mb-5">
            Um grande momento de futebol na <span className="font-semibold text-[#003087]">Taça de Honra ComuniLog</span>.
            Espera-se um jogo cheio de emoção, entrega e muito apoio nas bancadas!
          </p>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[#FFD700] to-[#FFC200] rounded-xl py-3 px-4">
            <p className="text-[#003087] font-extrabold text-sm">
              💛💙📣 Vamos encher o N.S.Conceição!
            </p>
            <p className="text-[#003087]/70 text-xs mt-0.5 font-medium">
              Todos juntos para celebrar o futebol!
            </p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="mt-4 w-full text-gray-400 text-xs hover:text-gray-600 transition-colors py-1"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
