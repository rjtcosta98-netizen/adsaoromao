

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

// Small crest component — styled shield with club initials or image
const Crest: React.FC<{ initials?: string; c1?: string; c2?: string; image?: string; size?: 'sm' | 'lg' }> = ({
  initials, c1 = '#1f398a', c2 = '#fed700', image, size = 'sm',
}) => {
  const dim = size === 'lg' ? 'w-20 h-20' : 'w-10 h-10';
  const txt = size === 'lg' ? 'text-xl' : 'text-xs';
  if (image) {
    return (
      <div className={`${dim} rounded-lg overflow-hidden bg-white/10 flex-shrink-0 shadow-lg`}>
        <img src={image} alt="" className="w-full h-full object-contain p-1" />
      </div>
    );
  }
  return (
    <div
      className={`${dim} rounded-lg flex items-center justify-center font-black ${txt} shadow-lg flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)`, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
    >
      {initials}
    </div>
  );
};

export const EventsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animated, setAnimated] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);

  const teams = [
    { name: 'Sporting Clube Celoricense', image: 'https://cdn-img.staticzz.com/img/logos/equipas/11074_imgbank.png' },
    { name: 'AD São Romão (A)', image: 'https://cdn-img.staticzz.com/img/logos/equipas/8062_imgbank.png' },
    { name: 'AD São Romão (B)', image: 'https://cdn-img.staticzz.com/img/logos/equipas/8062_imgbank.png' },
    { name: 'ADOJ Conquistadores', image: 'https://cdn-img.staticzz.com/img/logos/equipas/43/266443_logo_ad_conquistadores.png' },
    { name: 'Lusitano Futebol Clube de Vildemoinhos', image: 'https://cdn-img.staticzz.com/img/logos/equipas/6304_imgbank.png' },
    { name: 'Futebol Clube de Ranhados', image: 'https://cdn-img.staticzz.com/img/logos/equipas/47/11047_logo_ranhados_20260219163400.png' },
    { name: 'Asdreq - Escolinhas de Futebol', image: 'https://cdn-img.staticzz.com/img/logos/equipas/64163_imgbank_1715011586.png' },
    { name: 'Atlético Clube Montemorense', image: 'https://cdn-img.staticzz.com/img/logos/equipas/50689_imgbank_1765900018.png' },
  ];

  // Countdown to June 13 2026 09:00
  const getTimeLeft = () => {
    const target = new Date('2026-06-13T09:00:00').getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [tl, setTl] = useState(getTimeLeft);

  useEffect(() => {
    const t = setInterval(() => setTl(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const t = setInterval(() => {
      setAnimated(false);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % teams.length);
        setAnimated(true);
      }, 150);
    }, 3200);
    return () => clearInterval(t);
  }, [teams.length]);

  const goTo = (dir: 1 | -1) => {
    setAnimated(false);
    setTimeout(() => {
      setCurrent((p) => (p + dir + teams.length) % teams.length);
      setAnimated(true);
    }, 100);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="adsr-cup" className="relative overflow-hidden bg-[#07112b]">
      {/* ── BACKGROUND POSTER ── */}
      <div className="absolute inset-0">
        <img
          src="/images/adsrcuphero.png"
          alt=""
          className="w-full h-full object-cover object-top opacity-80 scale-105"
          style={{ filter: 'saturate(1.3)', objectPosition: '70% center' }}
        />
        <div className="absolute inset-0 bg-[#07112b]/70 lg:bg-transparent" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#07112b]/85 via-[#07112b]/80 to-[#07112b]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07112b] via-transparent to-[#07112b]/60" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* Label pill */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-[#fed700] text-[#07112b] text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
            IV Edição · Torneio Futebol
          </span>
          <span className="text-white/40 text-xs font-semibold tracking-wider">AD São Romão Apresenta</span>
        </div>

        {/* ── TWO-COLUMN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-stretch">

          {/* LEFT — Info + Carousel */}
          <div>
            {/* Tournament title */}
            <h2 className="font-black text-white leading-none tracking-tight mb-1" style={{
              fontSize: 'clamp(2rem, 10vw, 4rem)',
              textShadow: '0 2px 24px rgba(0,0,0,0.8)',
            }}>
              ADSR CUP
              <span className="text-[#fed700]"> 2026</span>
            </h2>
            <p className="text-white/60 font-bold tracking-widest text-sm mb-5 uppercase">
              Equipas Confirmadas · Sub-14
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="flex items-center gap-1.5 bg-white/8 border border-white/15 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                <span className="text-[#fed700]">📅</span> 13/14 e 20/21 Junho
              </span>
              <span className="flex items-center gap-1.5 bg-white/8 border border-white/15 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin size={11} className="text-[#fed700]" /> Estádio N.S. Conceição · São Romão
              </span>
              <span className="flex items-center gap-1.5 bg-[#fed700]/15 border border-[#fed700]/40 text-[#fed700] text-xs font-black px-3 py-1.5 rounded-full">
                SUB 8 · 10 · 12 · 14 · 16
              </span>
            </div>

            {/* ── TEAM CAROUSEL ── */}
            <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm p-5 md:p-6">
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fed700] to-transparent" />

              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-4">
                Equipas Confirmadas — {current + 1}/{teams.length}
              </p>

              {/* Team display */}
              <div
                className="flex items-center gap-5 transition-all duration-300"
                style={{ opacity: animated ? 1 : 0, transform: animated ? 'translateX(0)' : 'translateX(-12px)' }}
              >
                <Crest {...teams[current]} size="lg" />
                <div>
                  <p className="text-[#fed700] font-black text-2xl md:text-3xl tracking-wide leading-none">
                    {teams[current].name}
                  </p>
                  <p className="text-white/40 text-xs font-semibold mt-1 tracking-wider">SUB-14 · 13 Junho 2026</p>
                </div>
              </div>

              {/* Nav + dots */}
              <div className="flex items-center justify-between mt-5">
                <div className="flex gap-1.5">
                  {teams.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setAnimated(false); setTimeout(() => { setCurrent(i); setAnimated(true); }, 100); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-[#fed700] w-6' : 'bg-white/20 w-1.5 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => goTo(-1)} className="w-10 h-10 rounded-full bg-white/8 active:bg-[#fed700]/30 hover:bg-[#fed700]/20 border border-white/15 hover:border-[#fed700]/50 flex items-center justify-center transition-all touch-manipulation">
                    <ChevronLeft size={18} className="text-white/70" />
                  </button>
                  <button onClick={() => goTo(1)} className="w-10 h-10 rounded-full bg-white/8 active:bg-[#fed700]/30 hover:bg-[#fed700]/20 border border-white/15 hover:border-[#fed700]/50 flex items-center justify-center transition-all touch-manipulation">
                    <ChevronRight size={18} className="text-white/70" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Countdown + CTA */}
          <div className="flex flex-col gap-3 lg:gap-4 lg:justify-end">
            {/* Countdown block */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fed700] to-transparent" />
              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-4 text-center">
                Conta Regressiva · Sub-14
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { v: tl.d, label: 'DIAS' },
                  { v: tl.h, label: 'HRS' },
                  { v: tl.m, label: 'MIN' },
                  { v: tl.s, label: 'SEG' },
                ].map(({ v, label }) => (
                  <div key={label} className="text-center">
                    <div className="bg-[#fed700]/10 border border-[#fed700]/25 rounded-xl py-2.5 mb-1.5">
                      <p className="text-[#fed700] font-black text-xl sm:text-2xl md:text-3xl leading-none tabular-nums">
                        {pad(v)}
                      </p>
                    </div>
                    <p className="text-white/35 text-[9px] font-black tracking-widest">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info badge */}
            <div className="bg-[#fed700]/8 border border-[#fed700]/25 rounded-xl px-4 py-3 text-center">
              <p className="text-[#fed700] font-black text-sm tracking-wide">
                8 Equipas · 5 Categorias
              </p>
              <p className="text-white/50 text-xs mt-0.5">Sub 8, 10, 12, 14 e 16</p>
            </div>

          </div>
        </div>

        {/* ── SCROLLING TEAMS TICKER ── */}
        <div className="mt-6 md:mt-8 border-t border-white/8 pt-4 md:pt-5">
          <p className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-3">
            Sub-14 · Equipas Confirmadas
          </p>
          <div className="overflow-hidden relative">
            <div className="flex gap-3 adsr-ticker">
              {[...teams, ...teams].map((team, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex-shrink-0 hover:border-[#fed700]/40 hover:bg-[#fed700]/5 transition-all duration-200 cursor-default"
                >
                  <Crest {...team} />
                  <span className="text-white/70 text-xs font-bold whitespace-nowrap tracking-wide">{team.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .adsr-ticker {
          animation: ticker-scroll 28s linear infinite;
          width: max-content;
        }
        .adsr-ticker:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
