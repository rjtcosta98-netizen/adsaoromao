import { useState, useEffect, useCallback } from 'react';
import { X, Bus, Phone, MapPin, Trophy, Calendar } from 'lucide-react';

const STORAGE_KEY = 'matchDayPopup_20260503';
const EVENT_DATE = new Date('2026-05-03T18:00:00');
const POPUP_DELAY = 3500;

export const MatchDayPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const close = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'dismissed');
  }, []);

  useEffect(() => {
    // Don't show after the event
    if (new Date() > EVENT_DATE) return;
    // Don't show if already dismissed
    if (localStorage.getItem(STORAGE_KEY) === 'dismissed') return;

    const timer = setTimeout(() => setIsVisible(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isVisible, close]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Promoção Jogo Taça de Honra"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl shadow-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-yellow-400/30 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — always visible, outside scroll */}
        <button
          onClick={close}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors shadow-lg"
          aria-label="Fechar"
        >
          <X size={22} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 rounded-2xl">
          {/* Image */}
          <div className="w-full">
            <img
              src="/images/NEWS/festa-da-taca.jpg"
              alt="Festa da Taça — ¼ Final Taça de Honra Comunilog AFG 25/26 — GFC vs AD São Romão — 03 Maio 2026 15h15"
              className="w-full rounded-t-2xl object-cover max-h-[35vh] sm:max-h-none"
            />
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          {/* Headline */}
          <h2 className="text-xl md:text-2xl font-display font-bold text-yellow-400 uppercase leading-tight text-center">
            Dia de fazer história! 💛🖤
          </h2>

          {/* Body text */}
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Dia de fazer história e mostrar a força da nossa união! A Associação Desportiva de São Romão entra em campo na Guarda 🏟️ para disputar a <strong className="text-yellow-400">Taça de Honra Comunilog</strong> da Associação de Futebol da Guarda frente à Guarda Futebol Clube.
          </p>

          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Vamos pintar as bancadas, cantar mais alto e empurrar a nossa equipa até à vitória! 🏆
          </p>

          {/* Event details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5">
              <Calendar size={18} className="text-yellow-400 shrink-0" />
              <span className="text-sm text-white font-semibold">03 Maio 2026 — 15h15</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5">
              <MapPin size={18} className="text-yellow-400 shrink-0" />
              <span className="text-sm text-white font-semibold">Guarda</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5">
              <Trophy size={18} className="text-yellow-400 shrink-0" />
              <span className="text-sm text-white font-semibold">¼ Final Taça de Honra</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5">
              <Bus size={18} className="text-yellow-400 shrink-0" />
              <span className="text-sm text-white font-semibold">Autocarro — 10€/pessoa</span>
            </div>
          </div>

          {/* Reservation CTA */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 text-center space-y-2">
            <p className="text-sm text-yellow-300 font-bold uppercase tracking-wide">
              🚌 Reserva o teu lugar no autocarro!
            </p>
            <p className="text-xs text-gray-300">
              Faz já a tua reserva no <strong className="text-white">Bar ADSR</strong> ou liga:
            </p>
            <a
              href="https://wa.me/351969711269"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-navy-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors text-sm"
            >
              <Phone size={16} />
              969 711 269
            </a>
          </div>

          {/* Closing line */}
          <p className="text-center text-base md:text-lg font-display font-bold text-white uppercase tracking-wide">
            Contamos contigo! 💪<br />
            <span className="text-yellow-400">JUNTOS & FORTES!</span><br />
            <span className="text-xl md:text-2xl">VAMOS SÃO ROMÃO! 💛🖤</span>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
