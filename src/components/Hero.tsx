import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculate() {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const countdown = useCountdown(new Date('2026-06-13T09:00:00'));
  const PADRINHO_IMAGE = '/images/TACA/tomas-silva-padrinho.jpg';

  const openCupCategory = (category: 'sub14' | 'sub12' | 'sub10' | 'sub16') => {
    window.dispatchEvent(new CustomEvent('adsr-cup-category', { detail: category }));
    const el = document.getElementById('adsr-cup');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const CARD_STYLES = `
    @keyframes mascot-bob {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50% { transform: translateY(-8px) rotate(2deg); }
    }
    @keyframes padrinho-float {
      0%, 100% { transform: translateY(0) rotateX(0deg); }
      50% { transform: translateY(-6px) rotateX(1.5deg); }
    }
    @keyframes tick-flip {
      0% { transform: translateY(6px) scale(0.9); opacity: 0; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    @keyframes cup-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(250,204,21,0.0); }
      50% { box-shadow: 0 0 0 6px rgba(250,204,21,0.12); }
    }
    .mascot-bob { animation: mascot-bob 3s ease-in-out infinite; }
    .padrinho-float { animation: padrinho-float 5s ease-in-out infinite; will-change: transform; }
    .tick-flip { animation: tick-flip 0.18s ease-out; }
    .cup-card { animation: cup-pulse 3s ease-in-out infinite; }
    .noise-overlay {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      background-size: 120px;
      opacity: 0.04;
      mix-blend-mode: overlay;
    }
    @media (prefers-reduced-motion: reduce) {
      .mascot-bob, .padrinho-float, .tick-flip, .cup-card { animation: none; }
    }
  `;

  return (
    /*
     * LAYOUT STRATEGY
     * ─ Mobile  : flex-col — video panel (100svh) stacks above card panel
     * ─ Desktop : card is lg:absolute over the video panel (classic side card)
     */
    <div className="relative flex flex-col" style={{ background: '#020a18' }}>

      {/* ═══════════════════════════════════════
          VIDEO HERO PANEL — always 100svh tall
      ═══════════════════════════════════════ */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '100svh' }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/adsrcuphero.png"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src="/images/0601.mov"
        />
        {/* Overlays */}
        <div className="absolute inset-0 z-[1] bg-navy-900/65 mix-blend-multiply" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-900 via-transparent to-transparent" />

        {/* Left text content */}
        <div className="relative z-10 container mx-auto w-full px-4 pb-10 pt-28 sm:pt-32 lg:pt-8">
          <div className="max-w-2xl">
            {/* Mobile: ADSR Cup headline */}
            <div className="sm:hidden flex items-end gap-3 mb-4">
              <h1 className="font-display text-4xl font-bold text-white leading-tight uppercase drop-shadow-lg flex-1">
                <span className="block text-[11px] tracking-[0.3em] text-white/50 font-bold mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>AD SÃO ROMÃO APRESENTA</span>
                <span className="text-yellow-400" style={{ fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif", fontSize: '3.2rem', lineHeight: 1 }}>ADSR CUP</span>
                <span className="block text-white" style={{ fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif", fontSize: '2.4rem', lineHeight: 1 }}>2026</span>
              </h1>
              <img
                src="/images/TACA/mascote.png"
                alt="Mascote ADSR Cup"
                className="w-24 h-auto object-contain drop-shadow-[0_4px_16px_rgba(250,204,21,0.4)] flex-shrink-0 self-end"
                style={{ filter: 'drop-shadow(0 0 12px rgba(250,204,21,0.3))' }}
              />
            </div>

            {/* Desktop: original club name */}
            <h1 className="hidden sm:block font-display text-5xl md:text-7xl lg:text-7xl font-bold text-white leading-tight uppercase mb-6 drop-shadow-lg">
              ASSOCIAÇÃO DESPORTIVA<br />
              <span className="text-yellow-400">SÃO ROMÃO!</span>
            </h1>

            {/* Mobile subtitle: Cup dates */}
            <p className="sm:hidden text-gray-300 text-base leading-relaxed max-w-xl border-l-4 border-yellow-400 pl-4 mb-4">
              Torneio de Futebol · Sub 8, 10, 12, 14 &amp; 16<br />
              <span className="text-yellow-400 font-bold">13/14 e 20/21 de Junho</span> · Estádio N.S. Conceição
            </p>

            {/* Desktop subtitle: original */}
            <p className="hidden sm:block text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl border-l-4 border-yellow-400 pl-6">
              Onde a paixão se transforma em glória. Acompanha a nossa caminhada rumo à vitória e faz parte da nossa história.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const element = document.getElementById('latest-results');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 px-6 sm:px-8 rounded shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base"
              >
                RESULTADOS
              </button>
              <button
                onClick={() => onNavigate && onNavigate('clube')}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 sm:px-8 rounded transition-colors text-sm sm:text-base"
              >
                O CLUBE
              </button>
            </div>
          </div>
        </div>
      </div>{/* end VIDEO HERO PANEL */}

      {/* ═══════════════════════════════════════════════════════════
          ADSR CUP CARD
          • Mobile  : in normal flow, below the video (dark bg)
          • Desktop : absolute, vertically centred on the right side
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="
          relative z-10
          w-full bg-[#020a18] px-4 pt-8 pb-12 sm:px-6
          lg:absolute lg:right-6 xl:right-12 lg:top-1/2 lg:-translate-y-1/2
          lg:w-[380px] lg:bg-transparent lg:px-0 lg:py-0
          flex-shrink-0
        "
      >
        <style>{CARD_STYLES}</style>

        {/* Floating Mascot */}
        <img
          src="/images/TACA/mascote.png"
          alt="Mascote ADSR"
          className="mascot-bob absolute -top-10 right-4 w-[72px] h-auto object-contain z-20 pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] lg:-top-14 lg:-right-3"
        />

        {/* Padrinho image */}
        <div className="padrinho-float relative z-10 mb-3 overflow-hidden rounded-2xl border border-[#facc15]/35 bg-black shadow-[0_22px_56px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="relative aspect-[21/9] sm:aspect-[16/9] lg:aspect-[16/10]">
            <img
              src={PADRINHO_IMAGE}
              alt="Tomás Silva, padrinho oficial da ADSR CUP 2026"
              className="absolute inset-0 h-full w-full object-cover object-[72%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/22 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/88 via-black/20 to-transparent" />
            <div className="absolute left-3 top-3 rounded-full bg-[#facc15] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-[#07112b]">
              Padrinho Oficial
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#facc15]">
                ADSR Cup 2026
              </p>
              <p className="mt-1 text-xl font-black leading-none text-white drop-shadow sm:text-2xl">
                Tomás Silva
              </p>
            </div>
          </div>
        </div>

        {/* Cup card */}
        <div
          className="cup-card relative rounded-2xl overflow-hidden z-10 border border-white/10"
          style={{
            background: 'linear-gradient(160deg, #0f2265 0%, #0a1845 55%, #060e2e 100%)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          <div className="noise-overlay absolute inset-0 pointer-events-none z-0 rounded-2xl" />
          <div
            className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none z-0"
            style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)' }}
          />

          {/* TOP BADGE ROW */}
          <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <img src={LOGO_URL} alt="AD São Romão" className="w-8 h-8 object-contain drop-shadow" />
              <div className="leading-none">
                <p className="text-white/40 text-[8px] tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>AD São Romão</p>
                <p className="text-white/70 text-[9px] tracking-[0.15em] uppercase font-bold" style={{ fontFamily: 'system-ui, sans-serif' }}>Apresenta</p>
                <p className="mt-0.5 text-[#facc15] text-[7px] tracking-[0.14em] uppercase font-black" style={{ fontFamily: 'system-ui, sans-serif' }}>Padrinho · Tomás Silva</p>
              </div>
            </div>
            <div
              className="text-[#0a1845] text-[8px] font-black px-2 py-0.5 rounded-sm tracking-[0.15em] uppercase"
              style={{ background: '#facc15', fontFamily: 'system-ui, sans-serif' }}
            >
              IV EDIÇÃO
            </div>
          </div>

          {/* TITLE BLOCK */}
          <div className="relative z-10 px-4 pb-3">
            <p
              className="text-white/50 text-[10px] tracking-[0.3em] uppercase leading-none mb-1"
              style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 700 }}
            >
              TORNEIO FUTEBOL · SUB 8.10.12.14.16
            </p>
            <div className="flex items-baseline gap-2 leading-none">
              <span
                className="font-black leading-none tracking-tight"
                style={{
                  fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                  fontSize: 'clamp(2rem, 6vw, 2.6rem)',
                  color: '#facc15',
                  textShadow: '0 2px 12px rgba(250,204,21,0.35)',
                }}
              >
                ADSR CUP
              </span>
              <span
                className="font-black leading-none tracking-widest text-white"
                style={{
                  fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                  fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.6)',
                }}
              >
                2026
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="relative z-10 mx-4 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #facc15, rgba(250,204,21,0.2))' }} />

          {/* DATES */}
          <div className="relative z-10 px-4 pt-3 pb-3">
            <div className="flex gap-2">
              {[{ days: '13/14', phase: '1ª Fase' }, { days: '20/21', phase: '2ª Fase' }].map((block) => (
                <div
                  key={block.days}
                  className="flex-1 rounded-lg text-center py-2.5 border border-white/10"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <p
                    className="text-[#facc15] leading-none font-black"
                    style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", fontSize: '1.25rem' }}
                  >
                    {block.days}
                  </p>
                  <p className="text-white/60 text-[8px] font-bold tracking-[0.2em] uppercase mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>JUNHO</p>
                  <p className="text-white/35 text-[8px] mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>{block.phase}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LOCATION */}
          <div className="relative z-10 px-4 pb-3 flex items-center gap-1.5">
            <MapPin size={10} className="text-[#facc15] flex-shrink-0" />
            <span className="text-white/50 text-[10px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Estádio N.S. Conceição · São Romão
            </span>
          </div>

          <div className="relative z-10 mx-4 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* COUNTDOWN */}
          <div className="relative z-10 px-4 pt-3 pb-4">
            <p
              className="text-center text-[8px] font-bold tracking-[0.25em] uppercase mb-2.5 text-white/35"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {countdown.days === 0 && countdown.hours === 0 ? '🟢 A DECORRER!' : 'CONTA-REGRESSIVA'}
            </p>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { value: countdown.days, label: 'DIAS' },
                { value: countdown.hours, label: 'HRS' },
                { value: countdown.minutes, label: 'MIN' },
                { value: countdown.seconds, label: 'SEG' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-lg py-2 border border-white/10"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <span
                    key={value}
                    className="tick-flip font-black leading-none tabular-nums"
                    style={{
                      color: '#facc15',
                      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                      fontSize: '1.4rem',
                      textShadow: '0 1px 8px rgba(250,204,21,0.3)',
                    }}
                  >
                    {String(value).padStart(2, '0')}
                  </span>
                  <span className="text-white/35 text-[7px] font-bold tracking-widest mt-0.5 uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="relative z-10 px-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {(['sub14', 'sub12', 'sub10', 'sub16'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => openCupCategory(cat)}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#facc15]/45 bg-white/[0.06] py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/[0.12] active:scale-95"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Equipas {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>{/* end CARD */}

    </div>
  );
};
