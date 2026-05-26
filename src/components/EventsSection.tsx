import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

type CupCategoryId = 'sub14' | 'sub12' | 'sub10' | 'sub16';

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
const SABUGAL_LOGO = 'https://cdn-img.zerozero.pt/img/logos/equipas/6836_imgbank.png';
const VILANOVENSES_LOGO = 'https://cdn-img.zerozero.pt/img/logos/equipas/10485_imgbank.png';
const MONTEMORENSE_LOGO = 'https://cdn-img.staticzz.com/img/logos/equipas/50689_imgbank_1765900018.png';
const LUSITANO_VILDEMOINHOS_LOGO = 'https://cdn-img.staticzz.com/img/logos/equipas/6304_imgbank.png';
const ADOJ_CONQUISTADORES_LOGO = 'https://cdn-img.staticzz.com/img/logos/equipas/43/266443_logo_ad_conquistadores.png';
const ASDREQ_LOGO = 'https://cdn-img.staticzz.com/img/logos/equipas/64163_imgbank_1715011586.png';
const FC_REPESENSES_LOGO = 'https://cdn-img.staticzz.com/img/logos/equipas/8116_imgbank.png';
const PADRINHO_IMAGE = '/images/TACA/tomas-silva-padrinho.jpg';
const PADRINHO_VIDEO = 'https://res.cloudinary.com/db3y3teyv/video/upload/v1779829309/AQOFtywr8q-Xf38UBu3YxGzXKM4jamH8CRL5T2OU8chTX8YoCNkV2fkcICN5ab6h286AjHIz58cYFBk45kK4ErAp5KfZ1WgvKex7xdXCiS1Ijw_ke3g3e.mp4';

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
    summaryLabel: 'Sub-14 · 13 Junho',
    summarySubtext: 'Sub 8, 10, 12, 14 e 16',
    teams: [
      { name: 'Sporting Clube Celoricense', image: CELORICENSE_LOGO },
      { name: 'AD São Romão (A)', image: ADSR_LOGO },
      { name: 'AD São Romão (B)', image: ADSR_LOGO },
      { name: 'ADOJ Conquistadores', image: ADOJ_CONQUISTADORES_LOGO },
      { name: 'Lusitano Futebol Clube de Vildemoinhos', image: LUSITANO_VILDEMOINHOS_LOGO },
      { name: 'Futebol Clube de Ranhados', image: 'https://cdn-img.staticzz.com/img/logos/equipas/47/11047_logo_ranhados_20260219163400.png' },
      { name: 'Asdreq - Escolinhas de Futebol', image: ASDREQ_LOGO },
      { name: 'Atlético Clube Montemorense', image: MONTEMORENSE_LOGO },
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
    backgroundImage: '/images/adsrcuphero.png',
    backgroundPosition: 'center top',
    summaryLabel: 'Sub-12 · 14 Junho',
    summarySubtext: 'Equipas confirmadas e uma vaga por fechar',
    teams: [
      { name: 'AC Montemorense', image: MONTEMORENSE_LOGO },
      { name: 'AD São Romão (A)', image: ADSR_LOGO },
      { name: 'AD São Romão (B)', image: ADSR_LOGO },
      { name: 'Sporting Clube Celoricense', image: CELORICENSE_LOGO },
      { name: '(Academia) Sporting CP - Ribeira de Frades', image: 'https://cdn-img.staticzz.com/img/logos/equipas/16_imgbank_1741687081.png' },
      { name: 'Seia FC (A)', image: SEIA_LOGO },
      { name: 'Seia FC (B)', image: SEIA_LOGO },
      { name: 'VF Naves', image: '/images/VFNAVES.png' },
      { name: 'Aguiar da Beira', image: 'https://cdn-img.zerozero.pt/img/logos/equipas/3546_imgbank.png' },
      { name: 'FC Repesenses', image: FC_REPESENSES_LOGO },
      { name: 'GD Tabuense', image: 'https://cdn-img.staticzz.com/img/logos/equipas/89/6489_logo_tabuense_20260429105342.png' },
    ],
  },
  {
    id: 'sub10',
    label: 'Sub-10',
    tabHint: '20 Junho',
    subtitle: 'Equipas Confirmadas · Sub-10',
    dateLabel: '20 Junho 2026',
    teamDateLabel: 'SUB-10 · 20 Junho 2026',
    countdownTarget: '2026-06-20T09:00:00',
    backgroundImage: '/images/adsrcuphero.png',
    backgroundPosition: '70% center',
    summaryLabel: 'Sub-10 · 20 Junho',
    summarySubtext: '10 equipas confirmadas',
    teams: [
      { name: 'Associação Desportiva de São Romão', image: ADSR_LOGO },
      { name: 'Atlético Clube Montemorense', image: MONTEMORENSE_LOGO },
      { name: 'Seia FC - Formação', image: SEIA_LOGO },
      { name: 'SC Sabugal', image: SABUGAL_LOGO },
      { name: 'Lusitano Futebol Clube de Vildemoinhos', image: LUSITANO_VILDEMOINHOS_LOGO },
      { name: 'CD Tondela - Formação', image:'https://cdn-img.staticzz.com/img/logos/equipas/4336_imgbank_1682585219.png' },
      { name: "Academia 5 F'S", image:'https://cdn-img.staticzz.com/img/logos/equipas/89/366589_logo_acr_sao_domingos_20251031083010.jpg' },
      { name: 'Académico de Viseu Futebol Clube', image:'https://cdn-img.staticzz.com/img/logos/equipas/2181_imgbank_1762193325.png' },
      { name: 'Desportivo de Castelo Branco', image:'https://cdn-img.staticzz.com/img/logos/equipas/10049_imgbank.png' },
      { name: 'SPORT CLUBE ESTRELA', image:'https://cdn-img.staticzz.com/img/logos/equipas/5683_imgbank.png' },
    ],
  },
  {
    id: 'sub16',
    label: 'Sub-16',
    tabHint: '21 Junho',
    subtitle: 'Equipas Confirmadas · Sub-16',
    dateLabel: '21 Junho 2026',
    teamDateLabel: 'SUB-16 · 21 Junho 2026',
    countdownTarget: '2026-06-21T09:00:00',
    backgroundImage: '/images/adsrcuphero.png',
    backgroundPosition: '70% center',
    summaryLabel: 'Sub-16 · 21 Junho',
    summarySubtext: '6 equipas confirmadas',
    teams: [
      { name: 'Associação Desportiva São Romão', image: ADSR_LOGO },
      { name: 'ADOJ Conquistadores', image: ADOJ_CONQUISTADORES_LOGO },
      { name: 'Asdreq - Escolinhas de Futebol', image: ASDREQ_LOGO },
      { name: 'FC Repesenses (A)', image: FC_REPESENSES_LOGO },
      { name: 'FC Repesenses (B)', image: FC_REPESENSES_LOGO },
      { name: 'GDC Silvares', image: 'https://vemjogar.fpf.pt/filemanager/media/file?guid=8aada27f-bbc7-4180-a9c5-bfb2c55de255' },
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
  const teamTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeCategory = CUP_CATEGORIES.find((category) => category.id === activeCategoryId) ?? CUP_CATEGORIES[0];
  const teams = activeCategory.teams;
  const [tl, setTl] = useState(() => getTimeLeft(activeCategory.countdownTarget));

  const runTeamTransition = (update: () => void, delay = 120) => {
    if (teamTransitionTimeoutRef.current) {
      clearTimeout(teamTransitionTimeoutRef.current);
    }

    setAnimated(false);
    teamTransitionTimeoutRef.current = setTimeout(() => {
      update();
      setAnimated(true);
      teamTransitionTimeoutRef.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (teamTransitionTimeoutRef.current) {
        clearTimeout(teamTransitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleCategoryRequest = (event: Event) => {
      const requestedCategory = (event as CustomEvent<CupCategoryId>).detail;
      if (requestedCategory === 'sub14' || requestedCategory === 'sub12' || requestedCategory === 'sub10' || requestedCategory === 'sub16') {
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
      runTeamTransition(() => {
        setCurrent((p) => (p + 1) % teams.length);
      }, 150);
    }, 3200);
    return () => clearInterval(t);
  }, [teams.length]);

  const goTo = (dir: 1 | -1) => {
    runTeamTransition(() => {
      setCurrent((p) => (p + dir + teams.length) % teams.length);
    }, 100);
  };

  const selectCategory = (categoryId: CupCategoryId) => {
    if (categoryId === activeCategoryId) return;
    runTeamTransition(() => {
      setActiveCategoryId(categoryId);
      setCurrent(0);
    }, 120);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="adsr-cup" className="adsr-cup-stage relative scroll-mt-24 overflow-hidden bg-[#030817]">
      <div className="absolute inset-0">
        <img
          src={activeCategory.backgroundImage}
          alt=""
          className="h-full w-full scale-60 object-cover object-top opacity-5 transition-all duration-700"
          style={{ filter: 'saturate(1.3) contrast(1.08)', objectPosition: activeCategory.backgroundPosition }}
        />
        <div className="absolute inset-0 bg-[#030817]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(254,215,0,0.08),transparent_30%),radial-gradient(circle_at_82%_34%,rgba(70,94,190,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030817]/98 via-[#07112b]/72 to-[#030817]/98" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030817]/96 via-[#030817]/62 to-[#030817]/88" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fed700]/70 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute left-[6%] top-20 h-48 w-px rotate-[20deg] bg-gradient-to-b from-[#fed700]/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020716] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 sm:pb-18 sm:pt-28 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="mb-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#fed700] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#061129] shadow-[0_12px_34px_rgba(254,215,0,0.22)]">
              IV Edição · Torneio Futebol
            </span>
            <h2 className="mt-4 font-display text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl lg:text-8xl">
              ADSR Cup <span className="text-[#fed700]">2026</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/70 sm:text-base">
              O palco oficial da formação em São Romão: escalões, equipas confirmadas, contagem decrescente e a mensagem do padrinho.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/12 bg-[#07112b]/82 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.24)]">
            {[
              { value: '5', label: 'Escalões' },
              { value: '13/14 - 20/21', label: 'Junho' },
              { value: '29+', label: 'Equipas' },
            ].map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-xl bg-white/[0.055] px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <p className="text-2xl font-black leading-none text-[#fed700] sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-white/52 sm:text-[10px]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="adsr-stage-shell rounded-[2rem] border border-[#6f7bb0]/28 bg-[#07112b]/82 p-2 shadow-[0_34px_110px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="rounded-[1.55rem] border border-[#6f7bb0]/24 bg-[#081232]/92 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5 lg:p-6">
            <div className="adsr-glass-panel mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CUP_CATEGORIES.map((category) => {
                const isActive = category.id === activeCategoryId;
                const isNewCategory = category.id === 'sub10';
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => selectCategory(category.id)}
                    className={`group relative min-h-[96px] overflow-hidden rounded-xl border px-3 py-3 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'border-[#fed700] bg-[#fed700] text-[#061129] shadow-[0_16px_38px_rgba(254,215,0,0.22),inset_0_1px_0_rgba(255,255,255,0.34)]'
                        : 'border-white/10 bg-white/[0.055] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-1 hover:border-[#fed700]/35 hover:bg-white/[0.09]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className={`block text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#061129]/70' : 'text-white/48'}`}>
                      {category.tabHint}
                    </span>
                    <span className="mt-1 flex items-center justify-between gap-2">
                      <span className="block text-xl font-black uppercase leading-none">{category.label}</span>
                      {isNewCategory && (
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-widest ${
                          isActive ? 'bg-[#061129] text-[#fed700]' : 'bg-[#fed700] text-[#061129]'
                        }`}>
                          Novo
                        </span>
                      )}
                    </span>
                    <span className={`mt-2 block text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#061129]/70' : 'text-white/45'}`}>
                      {category.teams.length} equipas
                    </span>
                    <span className={`absolute bottom-3 left-3 right-3 h-1 rounded-full ${isActive ? 'bg-[#061129]/18' : 'bg-white/12'}`} />
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:gap-6">
              <div className="adsr-cup-content rounded-2xl border border-[#6f7bb0]/30 bg-[#0c1640]/86 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5 lg:p-6">
                <div className="mb-5 grid gap-3 rounded-2xl border border-[#fed700]/22 bg-[#020716]/46 p-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/55">
                Conta Regressiva · {activeCategory.label}
              </p>
              <div className="grid grid-cols-4 gap-2 sm:w-[420px]">
                {[
                  { v: tl.d, label: 'DIAS' },
                  { v: tl.h, label: 'HRS' },
                  { v: tl.m, label: 'MIN' },
                  { v: tl.s, label: 'SEG' },
                ].map(({ v, label }) => (
                  <div key={label} className="rounded-md border border-[#fed700]/25 bg-[#fed700]/8 px-2 py-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <p className="text-xl font-black leading-none tabular-nums text-[#fed700] sm:text-2xl">
                      {pad(v)}
                    </p>
                    <p className="mt-1 text-[8px] font-black tracking-widest text-white/42">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="mb-1 font-display text-4xl font-black uppercase leading-none text-white sm:text-6xl">
              {activeCategory.label}
              <span className="text-[#fed700]"> em campo</span>
            </h3>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/66 sm:text-sm">
              {activeCategory.subtitle}
            </p>

            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <span className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-bold text-white/82 backdrop-blur-sm sm:w-auto sm:justify-start">
                <CalendarDays size={12} className="text-[#fed700]" /> {activeCategory.dateLabel}
              </span>
              <span className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-bold text-white/82 backdrop-blur-sm sm:w-auto sm:justify-start">
                <MapPin size={11} className="text-[#fed700]" /> Estádio N.S. Conceição · São Romão
              </span>
              <span className="flex w-full items-center justify-center gap-1.5 rounded-full border border-[#fed700]/40 bg-[#fed700]/15 px-3 py-1.5 text-xs font-black text-[#fed700] sm:w-auto sm:justify-start">
                SUB 8 · 10 · 12 · 14 · 16
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#6f7bb0]/34 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:p-5 md:p-6">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fed700] to-transparent" />

              <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                Equipas Confirmadas — {current + 1}/{teams.length}
              </p>

              <div
                className="flex min-w-0 items-center gap-3 transition-all duration-300 sm:gap-5"
                style={{ opacity: animated ? 1 : 0, transform: animated ? 'translateX(0)' : 'translateX(-12px)' }}
              >
                <Crest {...teams[current]} size="lg" />
                <div className="min-w-0">
                  <p className="break-words text-2xl font-black leading-tight tracking-wide text-[#fed700] sm:text-3xl">
                    {teams[current].name}
                  </p>
                  <p className="mt-1 text-xs font-semibold tracking-wider text-white/40">{activeCategory.teamDateLabel}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 mt-5">
                <div className="flex min-w-0 flex-wrap gap-1 sm:gap-1.5">
                  {teams.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        runTeamTransition(() => {
                          setCurrent(i);
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
                    className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#fed700]/50 hover:bg-[#fed700]/20 active:bg-[#fed700]/30"
                    aria-label="Equipa anterior"
                  >
                    <ChevronLeft size={18} className="text-white/70" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#fed700]/50 hover:bg-[#fed700]/20 active:bg-[#fed700]/30"
                    aria-label="Equipa seguinte"
                  >
                    <ChevronRight size={18} className="text-white/70" />
                  </button>
                </div>
              </div>
            </div>
              </div>

              <div className="adsr-poster-wrap flex flex-col gap-3 lg:gap-4 lg:justify-start">
            <div className="overflow-hidden rounded-2xl border border-[#fed700]/28 bg-[#020716] shadow-[0_26px_76px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="border-b border-white/10 bg-[#07112b]/88 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fed700]">Mensagem do Padrinho</p>
                <p className="mt-1 text-lg font-black leading-none text-white">Tomás Silva</p>
              </div>
              <div className="relative bg-black">
                <video
                  className="block aspect-[9/16] max-h-[620px] w-full bg-black object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  poster={PADRINHO_IMAGE}
                >
                  <source src={PADRINHO_VIDEO} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/55 to-transparent" />
                <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#fed700] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-[#061129] shadow-[0_10px_26px_rgba(0,0,0,0.32)]">
                  Vídeo Oficial
                </div>
              </div>
            </div>
              <div className="mt-0.5 text-xs text-white/56">
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/8 pt-4 md:mt-8 md:pt-5">
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-white/30">
            {activeCategory.label} · Equipas Confirmadas
          </p>
          <div className="adsr-ticker-shell relative overflow-hidden rounded-lg border border-white/10 bg-[#07112b]/86 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#07112b] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07112b] to-transparent" />
            <div className="flex gap-3 adsr-ticker px-3" key={activeCategory.id}>
              {[...teams, ...teams].map((team, i) => (
                <div
                  key={`${team.name}-${i}`}
                  className="flex flex-shrink-0 cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#fed700]/40 hover:bg-[#fed700]/8"
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
        .adsr-cup-stage {
          perspective: 1200px;
        }
        .adsr-glass-panel,
        .adsr-cup-content,
        .adsr-poster-wrap {
          will-change: transform;
          animation: adsr-float-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .adsr-cup-content {
          animation-delay: 0.06s;
        }
        .adsr-poster-wrap {
          transform-style: preserve-3d;
          animation-delay: 0.12s;
        }
        .adsr-poster-wrap:hover img {
          transform: scale(1.035);
        }
        @keyframes adsr-float-in {
          from {
            opacity: 0;
            transform: translateY(18px) rotateX(4deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
        .adsr-ticker {
          animation: ticker-scroll 28s linear infinite;
          transform: translate3d(0, 0, 0);
          width: max-content;
          will-change: transform;
        }
        .adsr-ticker:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .adsr-glass-panel,
          .adsr-cup-content,
          .adsr-poster-wrap,
          .adsr-ticker {
            animation: none;
          }
          .adsr-poster-wrap:hover img {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};
