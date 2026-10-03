import { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarDays, MapPin, Medal, Share2, X } from 'lucide-react';

const STORAGE_KEY = 'seasonClosingPopup_20260523_v1';
const EVENT_END = new Date('2026-05-23T19:00:00');
const POPUP_DELAY = 3800;
const POSTER_SRC = '/images/encerramento-epoca-2026.jpg';

const calendarUrl = new URL('https://calendar.google.com/calendar/render');
calendarUrl.searchParams.set('action', 'TEMPLATE');
calendarUrl.searchParams.set('text', 'Encerramento da Epoca 25/26 - AD Sao Romao');
calendarUrl.searchParams.set('dates', '20260523T140000Z/20260523T170000Z');
calendarUrl.searchParams.set('location', 'Estadio N.S. Conceicao, Sao Romao');
calendarUrl.searchParams.set(
  'details',
  'Convivio familia ADSR, atletas, pais, treinadores e direcao. Entrega de medalhas a todos os escaloes de formacao.'
);

const whatsappText = encodeURIComponent(
  'Encerramento da Epoca 25/26 da AD Sao Romao: sabado, 23 de maio, 15h00, no Estadio N.S. Conceicao. Convivio familia ADSR e entrega de medalhas a todos os escaloes de formacao.'
);

export const SeasonClosingPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'dismissed');
  }, []);

  useEffect(() => {
    if (new Date() > EVENT_END) return;
    if (localStorage.getItem(STORAGE_KEY) === 'dismissed') return;

    const timer = setTimeout(() => setIsVisible(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, close]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 px-0 sm:items-center sm:p-5"
      role="presentation"
      onClick={close}
    >
      <div
        ref={dialogRef}
        className="relative grid w-full max-h-[92svh] overflow-hidden rounded-t-2xl border border-gold-400/25 bg-[#021A3C] shadow-2xl sm:max-w-4xl sm:grid-cols-[minmax(280px,0.95fr)_1fr] sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="season-closing-title"
        aria-describedby="season-closing-description"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Fechar popup do encerramento da época"
        >
          <X size={22} />
        </button>

        <div className="flex justify-center bg-[#021A3C] pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-white/25" />
        </div>

        <div className="relative min-h-[220px] bg-[#010B1C] sm:min-h-full">
          <img
            src={POSTER_SRC}
            alt="Cartaz Encerramento da Epoca 25/26 AD Sao Romao"
            className="h-full max-h-[38svh] w-full object-cover object-top sm:max-h-none"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#021A3C] to-transparent sm:hidden" />
        </div>

        <div className="overflow-y-auto px-5 pb-5 pt-4 sm:px-7 sm:py-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-400 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#021A3C]">
            <Medal size={13} />
            Epoca 25/26
          </div>

          <h2
            id="season-closing-title"
            className="font-display text-2xl font-black uppercase leading-none text-white sm:text-4xl"
          >
            Encerramento da Epoca
            <span className="block text-gold-400">AD Sao Romao</span>
          </h2>

          <p id="season-closing-description" className="mt-3 text-sm font-semibold leading-relaxed text-white/80 sm:text-base">
            Junta a familia ADSR para celebrar atletas, pais, treinadores e direcao. Um convivio de encerramento com
            entrega de medalhas a todos os escaloes de formacao.
          </p>

          <div className="mt-5 grid gap-2">
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] px-3 py-3">
              <CalendarDays size={18} className="shrink-0 text-gold-400" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/45">Quando</p>
                <p className="text-sm font-black text-white">Sabado, 23 Maio · 15h00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] px-3 py-3">
              <MapPin size={18} className="shrink-0 text-gold-400" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/45">Onde</p>
                <p className="text-sm font-black text-white">Estadio N.S. Conceicao · Sao Romao</p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-gold-400/30 bg-gold-400/10 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-gold-300">Mensagem principal</p>
            <p className="mt-1 text-sm font-bold text-white">
              Vem celebrar a epoca, agradecer a todos e fechar 25/26 juntos e fortes.
            </p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <a
              href={calendarUrl.toString()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold-400 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-[#021A3C] transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-[#021A3C]"
            >
              Guardar data
            </a>
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.18] bg-white/8 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-[#021A3C]"
            >
              <Share2 size={15} />
              Partilhar
            </a>
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-3 w-full py-3 text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
          >
            Agora nao
          </button>
        </div>
      </div>
    </div>
  );
};
