import React from 'react';
import { CalendarDays, ChevronDown, ChevronRight, Clock, MapPin, Shield, Sparkles } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

const seasonHighlights = [
  { value: '26/27', label: 'Época' },
  { value: 'Mais jogos', label: 'Ambição' },
  { value: 'São Romão', label: 'Casa' },
];

const nextMatch = {
  competition: 'Seniores 26/27',
  date: '29 Ago 2026',
  time: '17:00',
  venue: 'Parque Desportivo de Campia',
  homeTeam: 'GD Campia',
  awayTeam: 'AD S. Romão',
  homeLogo: 'https://cdn-img.staticzz.com/img/logos/equipas/6695_imgbank.png',
};

const NextMatchCard = () => (
  <div className="rounded-lg border border-white/15 bg-[#021A3C]/58 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-md">
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-400 text-navy-900">
          <Shield size={21} strokeWidth={2.5} />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">Pré-época - Proximo jogo</p>
          <p className="font-display text-xl font-bold uppercase leading-none text-white">Match Day</p>
        </div>
      </div>
      <Sparkles size={19} className="text-gold-400" />
    </div>

    <div className="mt-4 grid grid-cols-3 items-center gap-3">
      <div className="flex min-h-28 flex-col items-center justify-center rounded-md border border-white/10 bg-white/[0.07] px-2 py-3 text-center">
        <img src={nextMatch.homeLogo} alt="GD Campia" className="h-12 w-12 object-contain" />
        <p className="mt-3 font-display text-sm font-bold uppercase leading-none text-white">{nextMatch.homeTeam}</p>
      </div>

      <div className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{nextMatch.competition}</p>
        <p className="mt-2 font-display text-3xl font-black uppercase leading-none text-gold-400">VS</p>
      </div>

      <div className="flex min-h-28 flex-col items-center justify-center rounded-md border border-gold-400/25 bg-gold-400/10 px-2 py-3 text-center">
        <img src={LOGO_URL} alt="AD São Romão" className="h-12 w-12 object-contain" />
        <p className="mt-3 font-display text-sm font-bold uppercase leading-none text-white">{nextMatch.awayTeam}</p>
      </div>
    </div>

    <div className="mt-4 grid gap-2">
      <div className="flex items-center gap-3 rounded-md bg-white/[0.07] px-3 py-2.5 text-sm font-semibold text-white">
        <CalendarDays size={16} className="text-gold-400" />
        {nextMatch.date}
      </div>
      <div className="flex items-center gap-3 rounded-md bg-white/[0.07] px-3 py-2.5 text-sm font-semibold text-white">
        <Clock size={16} className="text-gold-400" />
        {nextMatch.time}
      </div>
      <div className="flex items-center gap-3 rounded-md bg-white/[0.07] px-3 py-2.5 text-sm font-semibold text-white">
        <MapPin size={16} className="text-gold-400" />
        {nextMatch.venue}
      </div>
    </div>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const HERO_STYLES = `
    @keyframes hero-kenburns {
      0% { transform: scale(1.01); }
      100% { transform: scale(1.055); }
    }
    @keyframes hero-rise {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes hero-shine {
      0% { transform: translateX(-120%); opacity: 0; }
      18% { opacity: 0.8; }
      48%, 100% { transform: translateX(120%); opacity: 0; }
    }
    @keyframes hero-cue {
      0%, 100% { transform: translate(-50%, 0); opacity: 0.55; }
      50% { transform: translate(-50%, 7px); opacity: 1; }
    }
    .hero-kenburns { animation: hero-kenburns 20s ease-in-out infinite alternate; will-change: transform; }
    .hero-rise { animation: hero-rise 0.82s cubic-bezier(0.16, 1, 0.3, 1) both; }
    .hero-shine::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.24) 48%, transparent 100%);
      animation: hero-shine 4.4s ease-in-out infinite;
    }
    .hero-cue { animation: hero-cue 1.8s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      .hero-kenburns, .hero-rise, .hero-shine::after, .hero-cue { animation: none; }
    }
  `;

  return (
    <div className="relative flex flex-col overflow-hidden bg-[#010B1C]">
      <style>{HERO_STYLES}</style>

      <div className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/estadio.jpeg"
            alt="AD São Romão prepara a época 26/27"
            className="hero-kenburns absolute inset-0 h-full w-full object-cover object-[57%_center] md:object-center"
            fetchPriority="high"
          />
        </div>

        <div className="absolute inset-0 z-[1] bg-[#021A3C]/20 mix-blend-multiply" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(1,11,28,0.9)_0%,rgba(1,11,28,0.62)_28%,rgba(1,11,28,0.08)_58%,rgba(1,11,28,0.42)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(1,11,28,0.16)_0%,rgba(1,11,28,0.04)_40%,rgba(1,11,28,0.66)_100%)]" />
        <div className="absolute inset-0 z-[1] pointer-events-none shadow-[inset_0_0_150px_28px_rgba(1,11,28,0.5)]" />

        <div className="absolute left-0 right-0 top-0 z-[3] border-b border-white/10 bg-[#021A3C]/54 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#FFD700] shadow-[0_0_14px_#FFD700]" />
              Época 26/27
            </div>
            <div className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70 md:block sm:text-xs">
              Mais jogos. Mais emoção. A mesma paixão.
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto flex min-h-[calc(100svh-4rem)] w-full flex-col justify-end px-5 pb-16 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-4 lg:pb-14 lg:pt-8">
          <div className="grid w-full items-end gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,420px)]">
            <div className="max-w-2xl">
              <div className="hero-rise" style={{ animationDelay: '0.05s' }}>
                {/* Mesma régua dourada que abre todas as secções do site —
                    o hero é onde a assinatura é apresentada. */}
                <span className="hero-shine relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold-400 px-4 py-1.5 shadow-[0_0_34px_rgba(255,215,0,0.22)]">
                  <span className="relative z-10 inline-block h-[3px] w-6 bg-navy-900" aria-hidden="true" />
                  <span className="relative z-10 font-display text-[11px] font-semibold uppercase tracking-kicker text-navy-900">
                    Nova época 26/27
                  </span>
                </span>

                <h1 className="mt-5 max-w-[11ch] font-display text-[clamp(3.25rem,13vw,6.8rem)] font-bold uppercase leading-[0.84] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                  A nova época começa aqui
                </h1>

                <div className="mt-5 max-w-xl border-l-4 border-gold-400 pl-4 lg:pl-6">
                  <p className="font-display text-lg font-bold uppercase tracking-[0.08em] text-white sm:text-xl">
                    Mais jogos, mais emoção, a mesma paixão.
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-white/75 sm:text-lg">
                    A AD São Romão prepara 26/27 com ambição, identidade e a força de todos os que vivem o clube.
                  </p>
                </div>
              </div>

              <div className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4" style={{ animationDelay: '0.2s' }}>
                <button
                  type="button"
                  onClick={() => onNavigate?.('inscricoes')}
                  className="group relative overflow-hidden rounded-lg bg-gold-400 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-navy-900 shadow-[0_10px_30px_-8px_rgba(255,215,0,0.5)] transition-all duration-200 hover:scale-[1.03] hover:bg-gold-300 active:scale-95 sm:text-base"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Inscrições
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate?.('noticias')}
                  className="rounded-lg border-2 border-white/70 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-navy-900 active:scale-95 sm:text-base"
                >
                  Novidades
                </button>
              </div>

              <div className="hero-rise mt-7 lg:hidden" style={{ animationDelay: '0.28s' }}>
                <NextMatchCard />
              </div>
            </div>

            <div className="hero-rise hidden lg:block" style={{ animationDelay: '0.26s' }}>
              <NextMatchCard />
              <div className="mt-3 grid grid-cols-3 gap-3">
                {seasonHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="min-h-20 rounded-md border border-white/10 bg-[#021A3C]/48 px-3 py-3 backdrop-blur-md"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{item.label}</p>
                    <p className="mt-3 font-display text-lg font-bold uppercase leading-none text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Ver mais secções"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.82, behavior: 'smooth' })}
          className="hero-cue lg:hidden absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-gold-400/80"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 backdrop-blur-sm">
            <ChevronDown size={16} strokeWidth={2.5} />
          </span>
        </button>
      </div>
    </div>
  );
};
