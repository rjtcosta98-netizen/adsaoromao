import React, { useEffect, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

type CupCategoryId = 'sub14' | 'sub12';

type CupTeam = {
  name: string;
  image?: string;
  initials?: string;
  c1?: string;
  c2?: string;
};

type CupCategoryConfig = {
  id: CupCategoryId;
  label: string;
  tabHint: string;
  subtitle: string;
  dateLabel: string;
  teamDateLabel: string;
  countdownTarget: string;
  backgroundImage: string;
  backgroundPosition: string;
  teams: CupTeam[];
  summaryLabel: string;
  summarySubtext: string;
};

const ADSR_LOGO = 'https://cdn-img.staticzz.com/img/logos/equipas/8062_imgbank.png';
const CELORICENSE_LOGO = 'https://cdn-img.staticzz.com/img/logos/equipas/11074_imgbank.png';
const SEIA_LOGO = 'https://cdn-img.zerozero.pt/img/logos/equipas/16479_imgbank.png';
const VILANOVENSES_LOGO = 'https://cdn-img.zerozero.pt/img/logos/equipas/10485_imgbank.png';

const CUP_CATEGORIES: CupCategoryConfig[] = [
  {
    id: 'sub14',
    label: 'Sub-14',
    tabHint: '13 Junho',
    subtitle: 'Equipas Confirmadas · Sub-14',
    dateLabel: '13/14 e 20/21 Junho',
    teamDateLabel: 'SUB-14 · 13 Junho 2026',
    countdownTarget: '2026-06-13T09:00:00',
    backgroundImage: '/images/adsrcuphero.png',
    backgroundPosition: '70% center',
    summaryLabel: '8 Equipas · 5 Categorias',
    summarySubtext: 'Sub 8, 10, 12, 14 e 16',
    teams: [
      { name: 'Sporting Clube Celoricense', image: CELORICENSE_LOGO },
      { name: 'AD São Romão (A)', image: ADSR_LOGO },
      { name: 'AD São Romão (B)', image: ADSR_LOGO },
      { name: 'ADOJ Conquistadores', image: 'https://cdn-img.staticzz.com/img/logos/equipas/43/266443_logo_ad_conquistadores.png' },
      { name: 'Lusitano Futebol Clube de Vildemoinhos', image: 'https://cdn-img.staticzz.com/img/logos/equipas/6304_imgbank.png' },
      { name: 'Futebol Clube de Ranhados', image: 'https://cdn-img.staticzz.com/img/logos/equipas/47/11047_logo_ranhados_20260219163400.png' },
      { name: 'Asdreq - Escolinhas de Futebol', image: 'https://cdn-img.staticzz.com/img/logos/equipas/64163_imgbank_1715011586.png' },
      { name: 'Atlético Clube Montemorense', image: 'https://cdn-img.staticzz.com/img/logos/equipas/50689_imgbank_1765900018.png' },
    ],
  },
  {
    id: 'sub12',
    label: 'Sub-12',
    tabHint: '14 Junho',
    subtitle: 'Equipas Confirmadas · Sub-12',
    dateLabel: '14 Junho 2026',
    teamDateLabel: 'SUB-12 · 14 Junho 2026',
    countdownTarget: '2026-06-14T09:00:00',
    backgroundImage: '/images/adsrcup-sub12.jpg',
    backgroundPosition: 'center top',
    summaryLabel: 'Sub-12 · 14 Junho',
    summarySubtext: 'Equipas confirmadas e uma vaga por fechar',
    teams: [
      { name: 'AC Montemorense', image: 'https://cdn-img.staticzz.com/img/logos/equipas/50689_imgbank_1765900018.png' },
      { name: 'AD São Romão (A)', image: ADSR_LOGO },
      { name: 'AD São Romão (B)', image: ADSR_LOGO },
      { name: 'Sporting Clube Celoricense', image: CELORICENSE_LOGO },
      { name: 'Seia FC (A)', image: SEIA_LOGO },
      { name: 'Seia FC (B)', image: SEIA_LOGO },
      { name: 'Os Vilanovenses', image: VILANOVENSES_LOGO },
      { name: 'Aguiar da Beira', image: 'https://cdn-img.zerozero.pt/img/logos/equipas/3546_imgbank.png' },
      { name: 'FC Repesenses', image: 'https://cdn-img.staticzz.com/img/logos/equipas/8116_imgbank.png' },
      { name: 'A confirmar', initials: '?', c1: '#fed700', c2: '#07112b' },
    ],
  },
];

const getTimeLeft = (targetDate: string) => {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
};

// Small crest component styled like a compact tournament shield.
const Crest: React.FC<CupTeam & { size?: 'sm' | 'lg' }> = ({
  initials,
  c1 = '#1f398a',
  c2 = '#fed700',
  image,
  size = 'sm',
}) => {
  const dim = size === 'lg' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-10 h-10';
  const txt = size === 'lg' ? 'text-lg sm:text-xl' : 'text-xs';

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
      style={{
        background: `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)`,
        color: '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.7)',
      }}
    >
      {initials}
    </div>
  );
};

export const EventsSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<CupCategoryId>('sub14');
  const [current, setCurrent] = useState(0);
  const [animated, setAnimated] = useState(true);

  const activeCategory = CUP_CATEGORIES.find((category) => category.id === activeCategoryId) ?? CUP_CATEGORIES[0];
  const teams = activeCategory.teams;
  const [tl, setTl] = useState(() => getTimeLeft(activeCategory.countdownTarget));

  useEffect(() => {
    const handleCategoryRequest = (event: Event) => {
      const requestedCategory = (event as CustomEvent<CupCategoryId>).detail;
      if (requestedCategory === 'sub14' || requestedCategory === 'sub12') {
        setActiveCategoryId(requestedCategory);
      }
    };

    window.addEventListener('adsr-cup-category', handleCategoryRequest);
    return () => window.removeEventListener('adsr-cup-category', handleCategoryRequest);
  }, []);

  useEffect(() => {
    setCurrent(0);
    setAnimated(true);
    setTl(getTimeLeft(activeCategory.countdownTarget));
  }, [activeCategory.countdownTarget]);

  useEffect(() => {
    const t = setInterval(() => setTl(getTimeLeft(activeCategory.countdownTarget)), 1000);
    return () => clearInterval(t);
  }, [activeCategory.countdownTarget]);

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

  const selectCategory = (categoryId: CupCategoryId) => {
    if (categoryId === activeCategoryId) return;
    setAnimated(false);
    setTimeout(() => {
      setActiveCategoryId(categoryId);
      setCurrent(0);
      setAnimated(true);
    }, 120);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="adsr-cup" className="relative overflow-hidden bg-[#07112b]">
      <div className="absolute inset-0">
        <img
          src="/images/adsrcuphero.png"
          alt=""
          className="w-full h-full object-cover object-top opacity-45 scale-105 transition-all duration-500 sm:opacity-80"
          style={{ filter: 'saturate(1.28) contrast(1.04)', objectPosition: '70% center' }}
        />
        <div className="absolute inset-0 bg-[#07112b]/93 sm:bg-[#07112b]/80 lg:bg-[#07112b]/58" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#07112b]/94 via-[#07112b]/86 to-[#07112b]/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07112b] via-[#07112b]/30 to-[#07112b]/76" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#fed700] text-[#07112b] text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                IV Edição · Torneio Futebol
              </span>
              <span className="text-white/55 text-xs font-semibold tracking-wider">AD São Romão Apresenta</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white/70">
              Escolhe o escalão e vê as equipas já confirmadas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/12 bg-[#07112b]/82 p-1.5 backdrop-blur-sm lg:w-[360px]">
            {CUP_CATEGORIES.map((category) => {
              const isActive = category.id === activeCategoryId;
              const isSub12 = category.id === 'sub12';
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => selectCategory(category.id)}
                  className={`relative rounded-md px-3 py-3 text-left transition-colors ${
                    isActive
                      ? 'bg-[#fed700] text-[#07112b]'
                      : 'bg-white/[0.04] text-white hover:bg-white/[0.09]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span>
                      <span className={`block text-[10px] font-black uppercase tracking-widest ${
                        isActive ? 'text-[#07112b]/70' : 'text-white/50'
                      }`}>
                        {category.tabHint}
                      </span>
                      <span className="mt-1 block text-lg font-black uppercase leading-none sm:text-xl">
                        {category.label}
                      </span>
                    </span>
                    {isSub12 && (
                      <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-widest ${
                        isActive ? 'bg-[#07112b] text-[#fed700]' : 'bg-[#fed700] text-[#07112b]'
                      }`}>
                        Novo
                      </span>
                    )}
                  </span>
                  <span className={`mt-2 block text-[10px] font-black uppercase tracking-widest ${
                    isActive ? 'text-[#07112b]/70' : 'text-white/45'
                  }`}>
                    {category.teams.length} equipas
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-stretch">
          <div>
            <h2
              className="font-black text-white leading-none tracking-tight mb-1"
              style={{
                fontSize: 'clamp(2rem, 10vw, 4rem)',
                textShadow: '0 2px 24px rgba(0,0,0,0.8)',
              }}
            >
              ADSR CUP
              <span className="text-[#fed700]"> 2026</span>
            </h2>
            <p className="text-white/70 font-bold tracking-widest text-xs mb-5 uppercase sm:text-sm sm:text-white/60">
              {activeCategory.subtitle}
            </p>

            <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:flex-wrap">
              <span className="flex w-full items-center justify-center gap-1.5 bg-white/8 border border-white/15 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm sm:w-auto sm:justify-start">
                <CalendarDays size={12} className="text-[#fed700]" /> {activeCategory.dateLabel}
              </span>
              <span className="flex w-full items-center justify-center gap-1.5 bg-white/8 border border-white/15 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm sm:w-auto sm:justify-start">
                <MapPin size={11} className="text-[#fed700]" /> Estádio N.S. Conceição · São Romão
              </span>
              <span className="flex w-full items-center justify-center gap-1.5 bg-[#fed700]/15 border border-[#fed700]/40 text-[#fed700] text-xs font-black px-3 py-1.5 rounded-full sm:w-auto sm:justify-start">
                SUB 8 · 10 · 12 · 14 · 16
              </span>
            </div>

            <div className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm p-4 sm:p-5 md:p-6">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fed700] to-transparent" />

              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-4">
                Equipas Confirmadas — {current + 1}/{teams.length}
              </p>

              <div
                className="flex min-w-0 items-center gap-3 transition-all duration-300 sm:gap-5"
                style={{ opacity: animated ? 1 : 0, transform: animated ? 'translateX(0)' : 'translateX(-12px)' }}
              >
                <Crest {...teams[current]} size="lg" />
                <div className="min-w-0">
                  <p className="text-[#fed700] font-black text-xl sm:text-2xl md:text-3xl tracking-wide leading-tight break-words">
                    {teams[current].name}
                  </p>
                  <p className="text-white/40 text-xs font-semibold mt-1 tracking-wider">{activeCategory.teamDateLabel}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 mt-5">
                <div className="flex min-w-0 flex-wrap gap-1 sm:gap-1.5">
                  {teams.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setAnimated(false);
                        setTimeout(() => {
                          setCurrent(i);
                          setAnimated(true);
                        }, 100);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === current ? 'bg-[#fed700] w-6' : 'bg-white/20 w-1.5 hover:bg-white/40'
                      }`}
                      aria-label={`Ver equipa ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    className="w-10 h-10 rounded-full bg-white/8 active:bg-[#fed700]/30 hover:bg-[#fed700]/20 border border-white/15 hover:border-[#fed700]/50 flex items-center justify-center transition-all touch-manipulation"
                    aria-label="Equipa anterior"
                  >
                    <ChevronLeft size={18} className="text-white/70" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="w-10 h-10 rounded-full bg-white/8 active:bg-[#fed700]/30 hover:bg-[#fed700]/20 border border-white/15 hover:border-[#fed700]/50 flex items-center justify-center transition-all touch-manipulation"
                    aria-label="Equipa seguinte"
                  >
                    <ChevronRight size={18} className="text-white/70" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:gap-4 lg:justify-end">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fed700] to-transparent" />
              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-4 text-center">
                Conta Regressiva · {activeCategory.label}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { v: tl.d, label: 'DIAS' },
                  { v: tl.h, label: 'HRS' },
                  { v: tl.m, label: 'MIN' },
                  { v: tl.s, label: 'SEG' },
                ].map(({ v, label }) => (
                  <div key={label} className="text-center">
                    <div className="bg-[#fed700]/10 border border-[#fed700]/25 rounded-lg py-2 sm:py-2.5 mb-1.5">
                      <p className="text-[#fed700] font-black text-lg sm:text-2xl md:text-3xl leading-none tabular-nums">
                        {pad(v)}
                      </p>
                    </div>
                    <p className="text-white/35 text-[9px] font-black tracking-widest">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#fed700]/8 border border-[#fed700]/25 rounded-lg px-4 py-3 text-center">
              <p className="text-[#fed700] font-black text-sm tracking-wide">
                {activeCategory.summaryLabel}
              </p>
              <p className="text-white/50 text-xs mt-0.5">{activeCategory.summarySubtext}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 border-t border-white/8 pt-4 md:pt-5">
          <p className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-3">
            {activeCategory.label} · Equipas Confirmadas
          </p>
          <div className="overflow-hidden relative">
            <div className="flex gap-3 adsr-ticker" key={activeCategory.id}>
              {[...teams, ...teams].map((team, i) => (
                <div
                  key={`${team.name}-${i}`}
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
