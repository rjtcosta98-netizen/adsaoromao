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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 animate-fade-in"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Promoção Jogo Taça de Honra"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal — bottom sheet on mobile, centered card on sm+ */}
      <div
        className="relative w-full sm:max-w-lg flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-400/30 animate-scale-up max-h-[88vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — large touch target, always on top */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/80 text-white hover:bg-black transition-colors shadow-lg"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {/* Drag handle (mobile visual cue) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 rounded-t-2xl sm:rounded-2xl">
          {/* Image — hidden on very small screens, short on normal mobile */}
          <div className="w-full hidden xs:block sm:block">
            <img
              src="/images/NEWS/festa-da-taca.jpg"
              alt="Festa da Taça — ¼ Final Taça de Honra Comunilog AFG 25/26 — GFC vs AD São Romão — 03 Maio 2026 15h15"
              className="w-full object-cover object-top rounded-t-2xl sm:rounded-t-2xl max-h-[22vh] sm:max-h-[30vh]"
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-3">
            {/* Headline */}
            <h2 className="text-lg sm:text-2xl font-display font-bold text-gold-400 uppercase leading-tight text-center pr-8 sm:pr-0">
              Dia de fazer história! 💛🖤
            </h2>

            {/* Body text — condensed on mobile */}
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              A AD São Romão entra em campo na Guarda 🏟️ para disputar a{' '}
              <strong className="text-gold-400">Taça de Honra Comunilog</strong> frente à Guarda FC.
              Vamos pintar as bancadas e empurrar a nossa equipa até à vitória! 🏆
            </p>

            {/* Event details */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-2">
                <Calendar size={15} className="text-gold-400 shrink-0" />
                <span className="text-xs text-white font-semibold">03 Mai — 15h15</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-2">
                <MapPin size={15} className="text-gold-400 shrink-0" />
                <span className="text-xs text-white font-semibold">Guarda</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-2">
                <Trophy size={15} className="text-gold-400 shrink-0" />
                <span className="text-xs text-white font-semibold">¼ Final</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-2">
                <Bus size={15} className="text-gold-400 shrink-0" />
                <span className="text-xs text-white font-semibold">Autocarro 10€</span>
              </div>
            </div>

            {/* Reservation CTA */}
            <div className="bg-gold-400/10 border border-gold-400/30 rounded-xl p-3 text-center space-y-2">
              <p className="text-xs text-gold-300 font-bold uppercase tracking-wide">
                🚌 Reserva o teu lugar no autocarro!
              </p>
              <p className="text-xs text-gray-300">
                No <strong className="text-white">Bar ADSR</strong> ou liga:
              </p>
              <a
                href="https://wa.me/351969711269"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-900 font-bold rounded-lg hover:bg-gold-500 transition-colors text-sm"
              >
                <Phone size={16} />
                969 711 269
              </a>
            </div>

            {/* Close button at bottom — easy to reach on mobile */}
            <button
              onClick={close}
              className="w-full py-3 rounded-xl bg-white/5 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
