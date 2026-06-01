import React, { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type CupCategoryId = "sub14" | "sub12" | "sub10" | "sub16";

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

const ADSR_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/8062_imgbank.png";
const CELORICENSE_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/11074_imgbank.png";
const SEIA_LOGO = "https://cdn-img.zerozero.pt/img/logos/equipas/16479_imgbank.png";
const SABUGAL_LOGO = "https://cdn-img.zerozero.pt/img/logos/equipas/6836_imgbank.png";
const MONTEMORENSE_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/50689_imgbank_1765900018.png";
const LUSITANO_VILDEMOINHOS_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/6304_imgbank.png";
const ADOJ_CONQUISTADORES_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/43/266443_logo_ad_conquistadores.png";
const ASDREQ_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/64163_imgbank_1715011586.png";
const FC_REPESENSES_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/8116_imgbank.png";
const PADRINHO_IMAGE = "/images/TACA/tomas-silva-padrinho.jpg";
const PADRINHO_VIDEO =
  "https://res.cloudinary.com/db3y3teyv/video/upload/v1779829309/AQOFtywr8q-Xf38UBu3YxGzXKM4jamH8CRL5T2OU8chTX8YoCNkV2fkcICN5ab6h286AjHIz58cYFBk45kK4ErAp5KfZ1WgvKex7xdXCiS1Ijw_ke3g3e.mp4";

const CUP_CATEGORIES: CupCategoryConfig[] = [
  {
    id: "sub14",
    label: "Sub-14",
    tabHint: "13 Junho",
    subtitle: "Equipas Confirmadas \u00b7 Sub-14",
    dateLabel: "13/14 e 20/21 Junho",
    teamDateLabel: "SUB-14 \u00b7 13 Junho 2026",
    countdownTarget: "2026-06-13T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "70% center",
    summaryLabel: "Sub-14 \u00b7 13 Junho",
    summarySubtext: "Sub 8, 10, 12, 14 e 16",
    teams: [
      { name: "Sporting Clube Celoricense", image: CELORICENSE_LOGO },
      { name: "AD S\u00e3o Rom\u00e3o (A)", image: ADSR_LOGO },
      { name: "AD S\u00e3o Rom\u00e3o (B)", image: ADSR_LOGO },
      { name: "ADOJ Conquistadores", image: ADOJ_CONQUISTADORES_LOGO },
      { name: "Lusitano Futebol Clube de Vildemoinhos", image: LUSITANO_VILDEMOINHOS_LOGO },
      {
        name: "Futebol Clube de Ranhados",
        image: "https://cdn-img.staticzz.com/img/logos/equipas/47/11047_logo_ranhados_20260219163400.png",
      },
      { name: "Asdreq - Escolinhas de Futebol", image: ASDREQ_LOGO },
      { name: "Atl\u00e9tico Clube Montemorense", image: MONTEMORENSE_LOGO },
    ],
  },
  {
    id: "sub12",
    label: "Sub-12",
    tabHint: "14 Junho",
    subtitle: "Equipas Confirmadas \u00b7 Sub-12",
    dateLabel: "14 Junho 2026",
    teamDateLabel: "SUB-12 \u00b7 14 Junho 2026",
    countdownTarget: "2026-06-14T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "center top",
    summaryLabel: "Sub-12 \u00b7 14 Junho",
    summarySubtext: "Equipas confirmadas e uma vaga por fechar",
    teams: [
      { name: "AC Montemorense", image: MONTEMORENSE_LOGO },
      { name: "AD S\u00e3o Rom\u00e3o (A)", image: ADSR_LOGO },
      { name: "Sporting Clube Celoricense", image: CELORICENSE_LOGO },
      {
        name: "(Academia) Sporting CP - Ribeira de Frades",
        image: "https://cdn-img.staticzz.com/img/logos/equipas/16_imgbank_1741687081.png",
      },
      { name: "Seia FC (A)", image: SEIA_LOGO },
      { name: "Seia FC (B)", image: SEIA_LOGO },
      { name: "VF Naves", image: "/images/VFNAVES.png" },
      { name: "Aguiar da Beira", image: "https://cdn-img.zerozero.pt/img/logos/equipas/3546_imgbank.png" },
      { name: "FC Repesenses", image: FC_REPESENSES_LOGO },
      { name: "GD Tabuense", image: "https://cdn-img.staticzz.com/img/logos/equipas/89/6489_logo_tabuense_20260429105342.png" },
    ],
  },
  {
    id: "sub10",
    label: "Sub-10",
    tabHint: "20 Junho",
    subtitle: "Equipas Confirmadas \u00b7 Sub-10",
    dateLabel: "20 Junho 2026",
    teamDateLabel: "SUB-10 \u00b7 20 Junho 2026",
    countdownTarget: "2026-06-20T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "70% center",
    summaryLabel: "Sub-10 \u00b7 20 Junho",
    summarySubtext: "10 equipas confirmadas",
    teams: [
      { name: "Associa\u00e7\u00e3o Desportiva de S\u00e3o Rom\u00e3o", image: ADSR_LOGO },
      { name: "Atl\u00e9tico Clube Montemorense", image: MONTEMORENSE_LOGO },
      { name: "Seia FC - Forma\u00e7\u00e3o", image: SEIA_LOGO },
      { name: "SC Sabugal", image: SABUGAL_LOGO },
      { name: "Lusitano Futebol Clube de Vildemoinhos", image: LUSITANO_VILDEMOINHOS_LOGO },
      { name: "CD Tondela - Forma\u00e7\u00e3o", image: "https://cdn-img.staticzz.com/img/logos/equipas/4336_imgbank_1682585219.png" },
      { name: "Academia 5 F'S", image: "https://cdn-img.staticzz.com/img/logos/equipas/89/366589_logo_acr_sao_domingos_20251031083010.jpg" },
      { name: "Acad\u00e9mico de Viseu Futebol Clube", image: "https://cdn-img.staticzz.com/img/logos/equipas/2181_imgbank_1762193325.png" },
      { name: "Desportivo de Castelo Branco", image: "https://cdn-img.staticzz.com/img/logos/equipas/10049_imgbank.png" },
      { name: "SPORT CLUBE ESTRELA", image: "https://cdn-img.staticzz.com/img/logos/equipas/5683_imgbank.png" },
    ],
  },
  {
    id: "sub16",
    label: "Sub-16",
    tabHint: "21 Junho",
    subtitle: "Equipas Confirmadas \u00b7 Sub-16",
    dateLabel: "21 Junho 2026",
    teamDateLabel: "SUB-16 \u00b7 21 Junho 2026",
    countdownTarget: "2026-06-21T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "70% center",
    summaryLabel: "Sub-16 \u00b7 21 Junho",
    summarySubtext: "6 equipas confirmadas",
    teams: [
      { name: "Associa\u00e7\u00e3o Desportiva S\u00e3o Rom\u00e3o", image: ADSR_LOGO },
      { name: "SL Benfica - EF Coimbra", image: "/images/slbenfica.jpg" },
      { name: "Asdreq - Escolinhas de Futebol", image: ASDREQ_LOGO },
      { name: "FC Repesenses (A)", image: FC_REPESENSES_LOGO },
      { name: "FC Repesenses (B)", image: FC_REPESENSES_LOGO },
      {
        name: "GDC Silvares",
        image: "https://vemjogar.fpf.pt/filemanager/media/file?guid=8aada27f-bbc7-4180-a9c5-bfb2c55de255",
      },
    ],
  },
];

const SPONSORS = [
  { name: "Element Group - Solu\u00e7\u00f5es Digitais", logo: "/images/patrocinadoresadsrcup/6.png" },
  { name: "CDT Equipamentos", logo: "/images/rdt.svg", contain: true },
  { name: "FDM CARTERET, NJ", logo: "https://ik.imagekit.io/xqd9lrvbt/gemini-2.5-flash-image_faz-me_este_logo_tal_e_qual_com_a_maxima_qualidade_sem_mudares_nada-1.jpg" },
  { name: "Alves Bandeira", logo: "https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/aa805ee2-6fb1-4c1d-9c18-706f9556bada.jpeg" },
  { name: "Climahotel", logo: "https://climahotel.pt/wp-content/uploads/2024/10/logo-climahotel.png", contain: true },
  { name: "Cabe\u00e7a da Velha - Restaurante", logo: "/images/patrocinadoresadsrcup/3.png" },
  { name: "Padeirinhas da Estrela", logo: "/images/patrocinadoresadsrcup/5.png" },
  { name: "Casa Albuquerque", logo: "/images/patrocinadoresadsrcup/4.png" },
  { name: "Matias Nature", logo: "/images/patrocinadoresadsrcup/2.png" },
  { name: "Mota e Mota - Santa Eul\u00e1lia", logo: "/images/patrocinadoresadsrcup/1.png" },
  { name: "Radar da Sorte - Lotarias e Jogos, LDA", logo: "/images/patrocinadoresadsrcup/radar.png" },
  { name: "Cl\u00ednica de Fisioterapia - Daniela Abreu", logo: "/images/patrocinadoresadsrcup/daniela.png" },
  { name: "Ricky - M\u00fasica e Anima\u00e7\u00e3o", logo: "/images/patrocinadoresadsrcup/ricky.png" },
  { name: "Armando Cabeleireiro", logo: "/images/patrocinadoresadsrcup/armando.png" },
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

const Crest: React.FC<CupTeam & { size?: "sm" | "lg" }> = ({
  initials,
  c1 = "#1f398a",
  c2 = "#fed700",
  image,
  size = "sm",
}) => {
  const dim = size === "lg" ? "h-16 w-16 sm:h-[84px] sm:w-[84px]" : "h-10 w-10";
  const txt = size === "lg" ? "text-xl" : "text-xs";
  if (image) {
    return (
      <div className={`${dim} flex-shrink-0 overflow-hidden rounded-2xl bg-white/10 shadow-lg`}>
        <img src={image} alt="" className="h-full w-full object-contain p-1.5" />
      </div>
    );
  }
  return (
    <div
      className={`${dim} ${txt} flex flex-shrink-0 items-center justify-center rounded-2xl font-black shadow-lg`}
      style={{ background: `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)`, color: "#fff" }}
    >
      {initials}
    </div>
  );
};

export const EventsSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<CupCategoryId>("sub14");
  const [current, setCurrent] = useState(0);
  const [animated, setAnimated] = useState(true);
  const teamTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeCategory = CUP_CATEGORIES.find((c) => c.id === activeCategoryId) ?? CUP_CATEGORIES[0];
  const teams = activeCategory.teams;
  const [tl, setTl] = useState(() => getTimeLeft(activeCategory.countdownTarget));

  const runTeamTransition = (update: () => void, delay = 120) => {
    if (teamTransitionTimeoutRef.current) clearTimeout(teamTransitionTimeoutRef.current);
    setAnimated(false);
    teamTransitionTimeoutRef.current = setTimeout(() => {
      update();
      setAnimated(true);
      teamTransitionTimeoutRef.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => { if (teamTransitionTimeoutRef.current) clearTimeout(teamTransitionTimeoutRef.current); };
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const req = (event as CustomEvent<CupCategoryId>).detail;
      if (req === "sub14" || req === "sub12" || req === "sub10" || req === "sub16") setActiveCategoryId(req);
    };
    window.addEventListener("adsr-cup-category", handler);
    return () => window.removeEventListener("adsr-cup-category", handler);
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
      runTeamTransition(() => setCurrent((p) => (p + 1) % teams.length), 150);
    }, 3200);
    return () => clearInterval(t);
  }, [teams.length]);

  const goTo = (dir: 1 | -1) => runTeamTransition(() => setCurrent((p) => (p + dir + teams.length) % teams.length), 100);

  const selectCategory = (id: CupCategoryId) => {
    if (id === activeCategoryId) return;
    runTeamTransition(() => { setActiveCategoryId(id); setCurrent(0); }, 120);
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const totalTeams = CUP_CATEGORIES.reduce((s, c) => s + c.teams.length, 0);
  const activeTeam = teams[current];

  return (
    <section
      id="adsr-cup"
      className="relative overflow-hidden scroll-mt-24"
      style={{ background: "#010209" }}
    >
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(1,2,9,0.95), rgba(1,2,9,0.95)), url('/images/adsrcuphero.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        />
        {/* Stadium spotlight – gold radial from top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% -2%, rgba(254,215,0,0.18) 0%, transparent 65%)",
          }}
        />
        {/* Right accent glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 100% 30%, rgba(254,215,0,0.07) 0%, transparent 55%)",
          }}
        />
        {/* Vignette bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#010209]/90" />
        {/* Grain / noise overlay */}
        <div className="adsr-grain absolute inset-0" />
        {/* Top gold rule */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #fed700 35%, #fed700 65%, transparent 100%)",
            opacity: 0.65,
          }}
        />
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 md:pb-36 md:pt-32 lg:px-8">

        {/* ══════════════════════════════
            HERO HEADER
        ══════════════════════════════ */}
        <header className="mb-16 md:mb-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

            {/* Title block */}
            <div>
              {/* Edition badge */}
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#fed700]" />
                <span
                  className="font-display font-black uppercase text-[#fed700]"
                  style={{ fontSize: "0.625rem", letterSpacing: "0.3em" }}
                >
                  IV Edição · Torneio Futebol
                </span>
                <span className="h-px w-10 bg-[#fed700]" />
              </div>

              {/* Giant headline */}
              <h2
                className="font-display font-black uppercase leading-[0.86] text-white"
              >
                <span
                  className="block"
                  style={{ fontSize: "clamp(3.4rem, 9.5vw, 8.5rem)", letterSpacing: "-0.01em" }}
                >
                  ADSR Cup
                </span>
                <span
                  className="block text-[#fed700]"
                  style={{ fontSize: "clamp(4.8rem, 14vw, 12.5rem)", letterSpacing: "-0.025em" }}
                >
                  2026
                </span>
              </h2>

              {/* Sub-copy */}
              <p
                className="mt-6 max-w-lg leading-7 text-white/70"
                style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
              >
                Toda a competição de formação em São Romão num só palco — escalões,
                equipas confirmadas, contagem decrescente e a mensagem oficial do padrinho.
              </p>
            </div>

            {/* Stats widget */}
            <div className="grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#060d1e]">
              {[
                { value: String(CUP_CATEGORIES.length), label: "Escal\u00f5es" },
                { value: "13\u201321", label: "Junho" },
                { value: `${totalTeams}+`, label: "Equipas" },
              ].map((stat) => (
                <div key={stat.label} className="px-5 py-5 text-center sm:px-7 sm:py-6">
                  <p
                    className="font-display font-black leading-none text-white"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-1.5 font-black uppercase text-white/45"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="mt-12 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(254,215,0,0.5) 0%, rgba(254,215,0,0.2) 40%, transparent 100%)",
            }}
          />
        </header>

        {/* ══════════════════════════════
            MAIN PANEL
        ══════════════════════════════ */}
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050d1c]/90">

          {/* CATEGORY TABS */}
          <div className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-4">
            {CUP_CATEGORIES.map((category) => {
              const isActive = category.id === activeCategoryId;
              const isNew = category.id === "sub10";
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => selectCategory(category.id)}
                  className={`adsr-tab relative cursor-pointer overflow-hidden border-r border-white/10 px-4 py-5 text-left transition-all duration-300 last:border-r-0 sm:px-6 sm:py-6 text-white ${
                    isActive ? "" : "hover:bg-white/[0.05]"
                  }`}
                  style={isActive ? {
                    backgroundImage: "linear-gradient(rgba(1,2,9,0.72), rgba(1,2,9,0.82)), url('/images/adsrcuphero.png')",
                    backgroundSize: "100%",
                    backgroundPosition: "center center",
                  } : undefined}
                  aria-pressed={isActive}
                >
                  <span
                    className={`block font-black uppercase ${isActive ? "text-[#fed700]/80" : "text-white/45"}`}
                    style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}
                  >
                    {category.tabHint}
                  </span>
                  <span className="mt-1 flex items-center gap-2">
                    <span className="font-display text-xl font-black uppercase leading-none sm:text-2xl">
                      {category.label}
                    </span>
                    {isNew && (
                      <span
                        className={`rounded-full px-2 py-0.5 font-black uppercase ${
                          isActive
                            ? "bg-[#fed700] text-[#010209]"
                            : "bg-[#fed700] text-[#010209]"
                        }`}
                        style={{ fontSize: "0.55rem", letterSpacing: "0.18em" }}
                      >
                        Novo
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-2 block font-black uppercase ${isActive ? "text-white/55" : "text-white/40"}`}
                    style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
                  >
                    {category.teams.length} equipas
                  </span>
                  {/* Active bottom bar */}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#fed700]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CONTENT AREA */}
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">

              {/* ── LEFT COLUMN ── */}
              <div className="space-y-7">

                {/* COUNTDOWN SCOREBOARD */}
                <div className="relative overflow-hidden rounded-2xl border border-[#fed700]/20 bg-[#02040e] p-5 sm:p-6">
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #fed700, transparent)", opacity: 0.7 }}
                  />
                  <p
                    className="mb-5 font-black uppercase text-[#fed700]"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.28em" }}
                  >
                    Conta Regressiva &middot; {activeCategory.label}
                  </p>
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                    {[
                      { v: tl.d, label: "Dias" },
                      { v: tl.h, label: "Horas" },
                      { v: tl.m, label: "Min" },
                      { v: tl.s, label: "Seg" },
                    ].map(({ v, label }) => (
                      <div
                        key={label}
                        className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1530] p-3 text-center"
                      >
                        {/* top accent */}
                        <div
                          className="mx-auto mb-3 h-px w-8"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(254,215,0,0.5), transparent)" }}
                        />
                        <p
                          className="font-display font-black tabular-nums leading-none text-white"
                          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                        >
                          {pad(v)}
                        </p>
                        <p
                          className="mt-2 font-black uppercase text-[#fed700]/60"
                          style={{ fontSize: "0.58rem", letterSpacing: "0.22em" }}
                        >
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION HEADING */}
                <div>
                  <h3
                    className="font-display font-black uppercase leading-[0.9] text-white"
                    style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.5rem)" }}
                  >
                    {activeCategory.label}{" "}
                    <span className="text-[#fed700]">em campo</span>
                  </h3>
                  <p
                    className="mt-3 font-bold uppercase text-white/55"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.18em" }}
                  >
                    {activeCategory.subtitle}
                  </p>
                </div>

                {/* INFO PILLS */}
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/90">
                    <CalendarDays size={13} className="text-[#fed700] flex-shrink-0" />
                    {activeCategory.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/90">
                    <MapPin size={13} className="text-[#fed700] flex-shrink-0" />
                    Estádio N.S. Conceição · São Romão
                  </span>
                </div>

                {/* TEAM SPOTLIGHT CAROUSEL */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1530] p-5 sm:p-6">
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, rgba(254,215,0,0.4), rgba(254,215,0,0.15) 60%, transparent)" }}
                  />
                  <p
                    className="mb-6 font-black uppercase text-white/35"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.24em" }}
                  >
                    Em Destaque &mdash; {current + 1} / {teams.length}
                  </p>

                  <div
                    className="flex min-w-0 items-center gap-5 transition-opacity duration-200"
                    style={{ opacity: animated ? 1 : 0.15 }}
                  >
                    <Crest {...activeTeam} size="lg" />
                    <div className="min-w-0 flex-1">
                      <p
                        className="break-words font-display font-black leading-tight text-[#fed700]"
                        style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)" }}
                      >
                        {activeTeam.name}
                      </p>
                      <p
                        className="mt-2 font-semibold uppercase text-white/45"
                        style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
                      >
                        {activeCategory.teamDateLabel}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap gap-1.5">
                      {teams.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => runTeamTransition(() => setCurrent(i), 100)}
                          className={`cursor-pointer rounded-full transition-all duration-200 ${
                            i === current ? "h-2 w-8 bg-[#fed700]" : "h-2 w-2 bg-white/25 hover:bg-white/55"
                          }`}
                          aria-label={`Ver equipa ${i + 1}`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => goTo(-1)}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#0f1e3d] transition-colors duration-200 hover:border-[#fed700]/40 hover:bg-[#162748]"
                        aria-label="Equipa anterior"
                      >
                        <ChevronLeft size={17} className="text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo(1)}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#0f1e3d] transition-colors duration-200 hover:border-[#fed700]/40 hover:bg-[#162748]"
                        aria-label="Equipa seguinte"
                      >
                        <ChevronRight size={17} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ALL TEAMS GRID */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#02040e] p-5 sm:p-6">
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, rgba(254,215,0,0.4), rgba(254,215,0,0.15) 60%, transparent)" }}
                  />
                  <p
                    className="mb-5 font-black uppercase text-white/35"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.24em" }}
                  >
                    Equipas Confirmadas &mdash; {teams.length} equipas
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {teams.map((team, i) => (
                      <div
                        key={`${team.name}-${i}`}
                        className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#0b1530] px-4 py-3 transition-colors duration-150 hover:border-white/20 hover:bg-[#101e40]"
                      >
                        <Crest {...team} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold leading-snug text-white">{team.name}</p>
                          <p
                            className="mt-0.5 font-black uppercase text-[#fed700]/60"
                            style={{ fontSize: "0.58rem", letterSpacing: "0.16em" }}
                          >
                            {activeCategory.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="space-y-4">

                {/* PADRINHO VIDEO */}
                <article className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#0b1530] px-5 py-3.5">
                    <div>
                      <p
                        className="font-black uppercase text-[#fed700]"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.24em" }}
                      >
                        Mensagem do Padrinho
                      </p>
                      <p className="mt-0.5 text-base font-black text-white">Tomás Silva</p>
                    </div>
                    <span
                      className="rounded-full bg-[#fed700] px-2.5 py-1 font-black uppercase text-[#010209]"
                      style={{ fontSize: "0.55rem", letterSpacing: "0.16em" }}
                    >
                      Vídeo Oficial
                    </span>
                  </div>
                  <video
                    className="block aspect-[9/16] max-h-[660px] w-full bg-black object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    poster={PADRINHO_IMAGE}
                  >
                    <source src={PADRINHO_VIDEO} type="video/mp4" />
                  </video>
                </article>

                {/* SUMMARY CARD */}
                <article className="overflow-hidden rounded-2xl border border-white/10">
                  <div
                    className="border-b border-white/10 px-5 py-3.5"
                    style={{ background: "#0b1530" }}
                  >
                    <p
                      className="font-black uppercase text-white/40"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}
                    >
                      Resumo do Escalão
                    </p>
                  </div>
                  <div className="bg-[#0b1530] p-5">
                    <p className="font-display text-xl font-black uppercase text-[#fed700]">
                      {activeCategory.summaryLabel}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{activeCategory.summarySubtext}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border border-white/10 bg-[#02040e] px-4 py-4 text-center">
                        <p className="font-display text-3xl font-black text-white">{teams.length}</p>
                        <p
                          className="mt-1 font-black uppercase text-white/40"
                          style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}
                        >
                          Equipas
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#02040e] px-4 py-4 text-center">
                        <p className="font-display text-base font-black leading-snug text-white">
                          {activeCategory.dateLabel}
                        </p>
                        <p
                          className="mt-1 font-black uppercase text-white/40"
                          style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}
                        >
                          Data
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* ══════════ SPONSORS ══════════ */}
            <div className="mt-12 border-t border-white/10 pt-10">
              {/* Section header */}
              <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#fed700]" />
                    <span
                      className="font-black uppercase text-[#fed700]"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.28em" }}
                    >
                      Patrocinadores Oficiais
                    </span>
                  </div>
                  <p
                    className="font-display font-black uppercase leading-none text-white"
                    style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
                  >
                    ADSR Cup <span className="text-[#fed700]">2026</span>
                  </p>
                </div>
                <p className="text-sm text-white/45">{SPONSORS.length} parceiros confirmados</p>
              </div>

              {/* Sponsors grid — logo + always-visible name */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {SPONSORS.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1530] transition-all duration-300 hover:border-[#fed700]/40 hover:shadow-[0_0_28px_rgba(254,215,0,0.12)]"
                  >
                    {/* Gold top edge on hover */}
                    <div className="absolute inset-x-0 top-0 z-10 h-[2px] scale-x-0 bg-[#fed700] transition-transform duration-300 group-hover:scale-x-100" />
                    {/* Logo area */}
                    <div className={`relative aspect-video w-full overflow-hidden ${'contain' in sponsor && sponsor.contain ? 'bg-white' : 'bg-[#0b1530]'}`}>
                      {sponsor.logo ? (
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className={`absolute inset-0 h-full w-full opacity-90 transition-all duration-300 group-hover:opacity-100 ${'contain' in sponsor && sponsor.contain ? 'object-contain p-3 group-hover:scale-105' : 'object-cover group-hover:scale-105'}`}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-center text-2xl font-black text-white/20">?</span>
                        </div>
                      )}
                    </div>
                    {/* Always-visible name bar */}
                    <div className="border-t border-white/10 bg-[#060d1e] px-3 py-2.5">
                      <p
                        className="text-center font-bold leading-snug text-white/75 transition-colors duration-300 group-hover:text-white"
                        style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}
                      >
                        {sponsor.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Grain / noise overlay ── */
        .adsr-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        /* ── Ticker scroll ── */
        .adsr-ticker {
          animation: adsr-ticker-scroll 28s linear infinite;
          width: max-content;
          will-change: transform;
        }
        .adsr-ticker-shell:hover .adsr-ticker {
          animation-play-state: paused;
        }
        @keyframes adsr-ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Tab hover shimmer ── */
        .adsr-tab::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .adsr-ticker { animation: none; }
        }
      `}</style>
    </section>
  );
};
