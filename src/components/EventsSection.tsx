import React, { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, CircleDot, MapPin, ShieldCheck, Star, Trophy, type LucideIcon } from "lucide-react";

type CupCategoryId = "sub14" | "sub12" | "sub8" | "sub10" | "sub16";

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
  completed?: boolean;
};

type CupAward = {
  title: string;
  name: string;
  club?: string;
  icon: LucideIcon;
  initials: string;
  accent: "gold" | "violet" | "blue";
  image?: string;
};

type CupStandingsRow = {
  pos: number;
  team: CupTeam;
  j: number;
  v: number;
  e: number;
  d: number;
  pts: number;
  isChampion?: boolean;
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
const SL_BENFICA_LOGO = "/images/slbenfica.jpg";
const AGUIAR_DA_BEIRA_LOGO = "https://cdn-img.zerozero.pt/img/logos/equipas/3546_imgbank.png";
const FC_OLIVEIRA_HOSPITAL_LOGO = "/images/team-logos/oliveira-hospital.png";
const DRAGON_FORCE_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/46413_imgbank.png";
const DESPORTIVO_CASTELO_BRANCO_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/10049_imgbank.png";
const CD_TONDELA_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/4336_imgbank_1682585219.png";
const ACADEMIA_5FS_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/89/366589_logo_acr_sao_domingos_20251031083010.jpg";
const ACADEMICO_VISEU_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/2181_imgbank_1762193325.png";
const ESTRELA_PORTALEGRE_LOGO = "https://cdn-img.staticzz.com/img/logos/equipas/5683_imgbank.png";
const PADRINHO_IMAGE = "/images/TACA/tomas-silva-padrinho.jpg";
const PADRINHO_VIDEO =
  "https://res.cloudinary.com/db3y3teyv/video/upload/v1779829309/AQOFtywr8q-Xf38UBu3YxGzXKM4jamH8CRL5T2OU8chTX8YoCNkV2fkcICN5ab6h286AjHIz58cYFBk45kK4ErAp5KfZ1WgvKex7xdXCiS1Ijw_ke3g3e.mp4";

// Foto de campeão por escalão (mostrada no destaque quando o escalão termina).
const CHAMPION_IMAGE: Partial<Record<CupCategoryId, string>> = {
  sub14: "/images/ADSRCUP/CAMEPOES.JPG",
  sub12: "/images/ADSRCUP/sub12campeos.jpg",
};

const CUP_STANDINGS: Partial<Record<CupCategoryId, CupStandingsRow[]>> = {
  sub14: [
    { pos: 1, team: { name: "AD São Romão (A)", image: ADSR_LOGO }, j: 4, v: 3, e: 1, d: 0, pts: 10, isChampion: true },
    { pos: 2, team: { name: "Os Conquistadores", image: ADOJ_CONQUISTADORES_LOGO }, j: 4, v: 2, e: 1, d: 1, pts: 7 },
    { pos: 3, team: { name: "Ac. Sporting Viseu", image: "https://cdn-img.staticzz.com/img/logos/equipas/16_imgbank_1741687081.png" }, j: 3, v: 2, e: 0, d: 1, pts: 6 },
    { pos: 4, team: { name: "A.S.D.R.E.Q", image: ASDREQ_LOGO }, j: 3, v: 1, e: 1, d: 1, pts: 4 },
    { pos: 5, team: { name: "AC Montemorense", image: MONTEMORENSE_LOGO }, j: 3, v: 1, e: 0, d: 2, pts: 3 },
    { pos: 6, team: { name: "SC Celoricense", image: CELORICENSE_LOGO }, j: 3, v: 0, e: 2, d: 1, pts: 2 },
    { pos: 7, team: { name: "AD São Romão (B)", image: ADSR_LOGO }, j: 3, v: 0, e: 2, d: 1, pts: 2 },
    { pos: 8, team: { name: "Lusitano FC Vildemoinho", image: LUSITANO_VILDEMOINHOS_LOGO }, j: 3, v: 0, e: 1, d: 2, pts: 1 },
  ],
  sub12: [
    { pos: 1, team: { name: "AD São Romão", image: ADSR_LOGO }, j: 5, v: 4, e: 1, d: 0, pts: 13, isChampion: true },
    { pos: 2, team: { name: "GD Tabuense", image: "https://cdn-img.staticzz.com/img/logos/equipas/89/6489_logo_tabuense_20260429105342.png" }, j: 4, v: 4, e: 0, d: 0, pts: 12 },
    { pos: 3, team: { name: "AC Montemorense", image: MONTEMORENSE_LOGO }, j: 4, v: 3, e: 1, d: 0, pts: 10 },
    { pos: 4, team: { name: "SC Celoricense", image: CELORICENSE_LOGO }, j: 4, v: 2, e: 1, d: 1, pts: 7 },
    { pos: 5, team: { name: "Ac. Sporting R. Frades", image: "https://cdn-img.staticzz.com/img/logos/equipas/16_imgbank_1741687081.png" }, j: 4, v: 2, e: 0, d: 2, pts: 6 },
    { pos: 6, team: { name: "VF Naves", image: "/images/VFNAVES.png" }, j: 4, v: 2, e: 0, d: 2, pts: 6 },
    { pos: 7, team: { name: "Seia FC (B)", image: SEIA_LOGO }, j: 4, v: 1, e: 1, d: 2, pts: 4 },
    { pos: 8, team: { name: "Aguiar da Beira", image: AGUIAR_DA_BEIRA_LOGO }, j: 4, v: 1, e: 0, d: 3, pts: 3 },
    { pos: 9, team: { name: "Os Repesenses", image: FC_REPESENSES_LOGO }, j: 4, v: 0, e: 0, d: 4, pts: 0 },
    { pos: 10, team: { name: "Seia FC (A)", image: SEIA_LOGO }, j: 4, v: 0, e: 0, d: 4, pts: 0 },
  ],
};

const CUP_AWARDS: Partial<Record<CupCategoryId, CupAward[]>> = {
  sub14: [
    {
      title: "Melhor Marcador",
      name: "João Simões",
      club: "AD São Romão (A)",
      icon: CircleDot,
      initials: "JS",
      accent: "gold",
      image: "/images/ADSRCUP/JS.JPG",
    },
    {
      title: "Melhor Jogador",
      name: "Tomas Pina Alves",
      club: "Os Conquistadores",
      icon: Star,
      initials: "TP",
      accent: "violet",
      image: "/images/ADSRCUP/TP.JPG",
    },
    {
      title: "Melhor Guarda-Redes",
      name: "Rodrigo Afonso Figueiredo",
      club: "A.S.D.R.E.Q",
      icon: ShieldCheck,
      initials: "RF",
      accent: "blue",
      image: "/images/ADSRCUP/RF.JPG",
    },
  ],
  sub12: [
    {
      title: "Melhor Marcador",
      name: "Diego Cabrita",
      icon: CircleDot,
      initials: "DC",
      accent: "gold",
      image: "/images/ADSRCUP/sub12melhormarcador.jpg",
    },
    {
      title: "Melhor Jogador(a)",
      name: "Heloise",
      club: "Ribeira de Frades",
      icon: Star,
      initials: "H",
      accent: "violet",
      image: "/images/ADSRCUP/sub12mvp.jpg",
    },
    {
      title: "Melhor Guarda-Redes",
      name: "Gonçalo Carapinheiro",
      icon: ShieldCheck,
      initials: "GC",
      accent: "blue",
      image: "/images/ADSRCUP/GonçaloCarapinheiro.jpg",
    },
    {
      title: "Melhor Guarda-Redes",
      name: "Guilherme Fernandes",
      icon: ShieldCheck,
      initials: "GF",
      accent: "blue",
      image: "/images/ADSRCUP/GuilhermeFernandes.jpg",
    },
  ],
};

const CUP_CATEGORIES: CupCategoryConfig[] = [
  {
    id: "sub14",
    label: "Sub-14",
    tabHint: "13 Junho",
    subtitle: "Equipas Confirmadas · Sub-14",
    dateLabel: "13/14 e 20/21 Junho",
    teamDateLabel: "SUB-14 · 13 Junho 2026",
    countdownTarget: "2026-06-13T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "70% center",
    summaryLabel: "Sub-14 · 13 Junho",
    summarySubtext: "Sub 8, 10, 12, 14 e 16",
    completed: true,
    teams: [
      { name: "Sporting Clube Celoricense", image: CELORICENSE_LOGO },
      { name: "AD São Romão (A)", image: ADSR_LOGO },
      { name: "AD São Romão (B)", image: ADSR_LOGO },
      { name: "ADOJ Conquistadores", image: ADOJ_CONQUISTADORES_LOGO },
      { name: "Lusitano Futebol Clube de Vildemoinhos", image: LUSITANO_VILDEMOINHOS_LOGO },
      {
        name: "Futebol Clube de Ranhados",
        image: "https://cdn-img.staticzz.com/img/logos/equipas/47/11047_logo_ranhados_20260219163400.png",
      },
      { name: "Asdreq - Escolinhas de Futebol", image: ASDREQ_LOGO },
      { name: "Atlético Clube Montemorense", image: MONTEMORENSE_LOGO },
    ],
  },
  {
    id: "sub12",
    label: "Sub-12",
    tabHint: "14 Junho",
    subtitle: "Equipas Confirmadas · Sub-12",
    dateLabel: "14 Junho 2026",
    teamDateLabel: "SUB-12 · 14 Junho 2026",
    countdownTarget: "2026-06-14T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "center top",
    summaryLabel: "Sub-12 · 14 Junho",
    summarySubtext: "Equipas confirmadas e uma vaga por fechar",
    completed: true,
    teams: [
      { name: "AC Montemorense", image: MONTEMORENSE_LOGO },
      { name: "AD São Romão", image: ADSR_LOGO },
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
    id: "sub8",
    label: "Sub-8",
    tabHint: "20 Junho",
    subtitle: "Equipas Confirmadas · Sub-8",
    dateLabel: "20 Junho 2026",
    teamDateLabel: "SUB-8 · 20 Junho 2026",
    countdownTarget: "2026-06-20T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "70% center",
    summaryLabel: "Sub-8 · 20 Junho",
    summarySubtext: "10 equipas confirmadas",
    teams: [
      { name: "São Romão A", image: ADSR_LOGO },
      { name: "SLB", image: SL_BENFICA_LOGO },
      { name: "SC Sabugal", image: SABUGAL_LOGO },
      { name: "FC Oliveira do Hospital", image: FC_OLIVEIRA_HOSPITAL_LOGO },
      { name: "Aguiar da Beira", image: AGUIAR_DA_BEIRA_LOGO },
      { name: "São Romão B", image: ADSR_LOGO },
      { name: "Dragon Force", image: DRAGON_FORCE_LOGO },
      { name: "D. Castelo Branco", image: DESPORTIVO_CASTELO_BRANCO_LOGO },
      { name: "Academia 5 F'S", image: ACADEMIA_5FS_LOGO },
      { name: "SL Nelas", image: "https://cdn-img.staticzz.com/img/logos/equipas/4319_imgbank_1703071681.png" },
    ],
  },
  {
    id: "sub10",
    label: "Sub-10",
    tabHint: "20 Junho",
    subtitle: "Equipas Confirmadas · Sub-10",
    dateLabel: "20 Junho 2026",
    teamDateLabel: "SUB-10 · 20 Junho 2026",
    countdownTarget: "2026-06-20T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "70% center",
    summaryLabel: "Sub-10 · 20 Junho",
    summarySubtext: "12 equipas confirmadas · 2 grupos",
    teams: [
      { name: "São Romão A", image: ADSR_LOGO },
      { name: "Castelo Branco A", image: DESPORTIVO_CASTELO_BRANCO_LOGO },
      { name: "Seia F. C.", image: SEIA_LOGO },
      { name: "Montemorense", image: MONTEMORENSE_LOGO },
      { name: "Lusitano Vildemoinhos", image: LUSITANO_VILDEMOINHOS_LOGO },
      { name: "Tondela", image: CD_TONDELA_LOGO },
      { name: "São Romão B", image: ADSR_LOGO },
      { name: "Castelo Branco B", image: DESPORTIVO_CASTELO_BRANCO_LOGO },
      { name: "Academia 5 F'S", image: ACADEMIA_5FS_LOGO },
      { name: "Estrela Portalegre", image: ESTRELA_PORTALEGRE_LOGO },
      { name: "Sabugal", image: SABUGAL_LOGO },
      { name: "Académico de Viseu", image: ACADEMICO_VISEU_LOGO },
    ],
  },
  {
    id: "sub16",
    label: "Sub-16",
    tabHint: "21 Junho",
    subtitle: "Equipas Confirmadas · Sub-16",
    dateLabel: "21 Junho 2026",
    teamDateLabel: "SUB-16 · 21 Junho 2026",
    countdownTarget: "2026-06-21T09:00:00",
    backgroundImage: "/images/adsrcuphero.png",
    backgroundPosition: "70% center",
    summaryLabel: "Sub-16 · 21 Junho",
    summarySubtext: "6 equipas confirmadas",
    teams: [
      { name: "AD São Romão", image: ADSR_LOGO },
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

const ALL_PARTICIPANTS: CupTeam[] = (() => {
  const seen = new Set<string>();
  const result: CupTeam[] = [];
  for (const cat of CUP_CATEGORIES) {
    for (const team of cat.teams) {
      const key = team.image ?? team.name;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(team);
      }
    }
  }
  return result;
})();

const SPONSORS = [
  { name: "Element Group - Soluções Digitais", logo: "/images/patrocinadoresadsrcup/elementgroup.png", bg: "#0d1117" },
  { name: "CDT Equipamentos", logo: "/images/patrocinadoresadsrcup/cdt.png" },
  { name: "FDM CARTERET, NJ", logo: "/images/patrocinadoresadsrcup/fdm.png" },
  { name: "Alves Bandeira", logo: "/images/patrocinadoresadsrcup/alvesbandeira.png", bg: "#1a3a8c" },
  { name: "Climahotel", logo: "/images/patrocinadoresadsrcup/climahotel.png" },
  { name: "Intermarché - São Romão", logo: "/images/patrocinadoresadsrcup/intermarche-sao-romao.png" },
  { name: "Garcia & Gouveia - Serralharia Civil", logo: "/images/patrocinadoresadsrcup/garciaegouveia.png", lightBg: true },
  { name: "EXPLISEIA - Centro de Explicações", logo: "/images/patrocinadoresadsrcup/expliseia.png", lightBg: true },
  { name: "Cabeça da Velha - Restaurante", logo: "/images/patrocinadoresadsrcup/cabecadavelha.png", lightBg: true },
  { name: "Padeirinhas da Estrela", logo: "/images/patrocinadoresadsrcup/Padeirinhas.png", lightBg: true },
  { name: "Casa Albuquerque", logo: "/images/patrocinadoresadsrcup/casaalbuquerque.png", lightBg: true },
  { name: "Matias Nature", logo: "/images/patrocinadoresadsrcup/matiasnature.png" },
  { name: "Mota e Mota - Santa Eulália", logo: "/images/patrocinadoresadsrcup/motaemota.png" },
  { name: "Radar da Sorte - Lotarias e Jogos, LDA", logo: "/images/patrocinadoresadsrcup/radar.png" },
  { name: "Clínica de Fisioterapia - Daniela Abreu", logo: "/images/patrocinadoresadsrcup/daniela.png", lightBg: true },
  { name: "Ricky - Música e Animação", logo: "/images/patrocinadoresadsrcup/ricky.png" },
  { name: "Maquiseia", logo: "/images/patrocinadoresadsrcup/maquiseia.png" },
  { name: "Montês Gin", logo: "/images/patrocinadoresadsrcup/montes.png" },
  { name: "Beijo gelado", logo: "/images/patrocinadoresadsrcup/Beijogelado.jpeg", lightBg: true },
  { name: "Ricardo Mota Félix - Mecânica Auto", logo: "/images/patrocinadoresadsrcup/ricardomota.png" },
  { name: "Armando Pereira", logo: "/images/patrocinadoresadsrcup/armando.png", bg: "#f0f0f0" },
  { name: "Grupo Martinauto", logo: "/images/patrocinadoresadsrcup/grupo.png", bg: "#009ed4" },
  { name: "VISOR - Estúdios fotógrafos", logo: "/images/patrocinadoresadsrcup/visor.png", lightBg: true },
  { name: "A&F - Mediação de Seguros", logo: "/images/patrocinadoresadsrcup/AF.jpeg", bg: "#1e5f87" },
  { name: "Tavfer", logo: "/images/ADSRCUP/tavfer.png" },
  { name: "Tavfer Hotéis", logo: "/images/ADSRCUP/tavfer hoteis.png" },
  { name: "Tavfer Vinhos", logo: "/images/ADSRCUP/tavfer vinhos.png" },
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
  /* 16:9 small format — sm: w-16 h-9 (64×36px) · lg: w-24 h-[54px] (96×54px) */
  const dim = size === "lg" ? "w-24 aspect-video" : "w-16 aspect-video";
  const txt = size === "lg" ? "text-sm" : "text-[0.5rem]";
  if (image) {
    return (
      <div className={`${dim} flex-shrink-0 overflow-hidden rounded-lg bg-white/10 shadow`}>
        <img src={image} alt="" className="h-full w-full object-contain p-1" />
      </div>
    );
  }
  return (
    <div
      className={`${dim} ${txt} flex flex-shrink-0 items-center justify-center rounded-lg font-black shadow`}
      style={{ background: `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)`, color: "#fff" }}
    >
      {initials}
    </div>
  );
};

const AwardAvatar: React.FC<Pick<CupAward, "initials" | "accent" | "image">> = ({ initials, accent, image }) => {
  const ring =
    accent === "gold"
      ? "border-[#fed700] shadow-[0_0_16px_rgba(254,215,0,0.45)]"
      : accent === "violet"
        ? "border-[#b99cff] shadow-[0_0_16px_rgba(185,156,255,0.38)]"
        : "border-[#8fc7ff] shadow-[0_0_16px_rgba(143,199,255,0.32)]";

  return (
    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-[3px] bg-[#070a18] overflow-hidden ${ring}`}>
      {image ? (
        <img src={image} alt={initials} className="h-full w-full object-cover" />
      ) : (
        <span className="font-display text-base font-black text-white">{initials}</span>
      )}
    </div>
  );
};

export const EventsSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<CupCategoryId>("sub12");
  const [standingsExpanded, setStandingsExpanded] = useState(false);

  const activeCategory = CUP_CATEGORIES.find((c) => c.id === activeCategoryId) ?? CUP_CATEGORIES[0];
  const teams = activeCategory.teams;
  const activeStandings = CUP_STANDINGS[activeCategoryId];
  const showStandings = activeCategory.completed === true && Boolean(activeStandings?.length);
  const activeAwards = CUP_AWARDS[activeCategoryId] ?? [];
  const champion = activeStandings?.find((row) => row.isChampion);
  const championImg = CHAMPION_IMAGE[activeCategoryId];
  const isCompleted = activeCategory.completed === true;
  const [tl, setTl] = useState(() => getTimeLeft(activeCategory.countdownTarget));

  useEffect(() => {
    const handler = (event: Event) => {
      const req = (event as CustomEvent<CupCategoryId>).detail;
      if (req === "sub14" || req === "sub12" || req === "sub8" || req === "sub10" || req === "sub16") {
        setActiveCategoryId(req);
      }
    };
    window.addEventListener("adsr-cup-category", handler);
    return () => window.removeEventListener("adsr-cup-category", handler);
  }, []);

  useEffect(() => {
    setTl(getTimeLeft(activeCategory.countdownTarget));
  }, [activeCategory.countdownTarget]);

  useEffect(() => {
    const t = setInterval(() => setTl(getTimeLeft(activeCategory.countdownTarget)), 1000);
    return () => clearInterval(t);
  }, [activeCategory.countdownTarget]);

  const selectCategory = (id: CupCategoryId) => {
    if (id === activeCategoryId) return;
    setActiveCategoryId(id);
    setStandingsExpanded(false);
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const totalTeams = CUP_CATEGORIES.reduce((s, c) => s + c.teams.length, 0);
  const doneCount = CUP_CATEGORIES.filter((c) => c.completed).length;

  return (
    <section id="adsr-cup" className="relative scroll-mt-24" style={{ background: "#010209" }}>

      {/* ── BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Hero image with lighter overlay so it breathes */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(1,2,9,0.91), rgba(1,2,9,0.91)), url('/images/adsrcuphero.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        />
        {/* Subtle dot grid for texture */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(rgba(254,215,0,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Gold top bar */}
        <div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #fed700 25%, #fed700 75%, transparent)" }}
        />
        {/* Ambient gold glow top-left */}
        <div
          className="absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #fed700, transparent 65%)" }}
        />
        {/* Purple glow bottom-right for depth */}
        <div
          className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #6b56ff, transparent 65%)" }}
        />
      </div>

      <div className="relative z-10 px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-10">

        {/* ── HERO HEADER ── */}
        <header className="mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <span className="h-px w-5 bg-[#fed700]" />
                <span className="font-black uppercase text-[#fed700]" style={{ fontSize: "0.6rem", letterSpacing: "0.28em" }}>
                  IV Edição · Torneio Único de Formação
                </span>
              </div>
              <h2 className="flex flex-wrap items-baseline gap-x-3 pr-12 font-display font-black uppercase italic leading-[0.9]">
                <span
                  style={{
                    fontSize: "clamp(2.4rem, 8vw, 4.4rem)",
                    letterSpacing: "-0.025em",
                    backgroundImage: "linear-gradient(180deg, #fff5c0 0%, #fed700 50%, #c8890a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    paddingBottom: "0.1em",
                    paddingRight: "0.45em",
                  }}
                >
                  ADSR Cup
                </span>
                <span
                  style={{
                    fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                    letterSpacing: "0.02em",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    WebkitTextStroke: "2px rgba(254,215,0,0.45)",
                  }}
                >
                  2026
                </span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                Toda a competição de formação de São Romão num só lugar — classificações,
                prémios, equipas e contagem decrescente por escalão.
              </p>
            </div>

            {/* Scoreboard stats */}
            <div className="flex w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm lg:w-auto">
              {[
                { value: String(CUP_CATEGORIES.length), label: "Escalões" },
                { value: `${doneCount}/${CUP_CATEGORIES.length}`, label: "Concluídos" },
                { value: `${totalTeams}+`, label: "Equipas" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-1 flex-col items-center justify-center py-4 lg:flex-none lg:px-8 ${i > 0 ? "border-l border-white/10" : ""}`}
                >
                  <span
                    className="font-display font-black leading-none text-white"
                    style={{ fontSize: "clamp(1.8rem, 6vw, 2.6rem)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-1 font-black uppercase text-white/40" style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient divider */}
          <div
            className="mt-8 h-px"
            style={{ background: "linear-gradient(90deg, #fed700 0%, rgba(254,215,0,0.18) 35%, transparent 70%)" }}
          />
        </header>

        {/* ── CATEGORY FIXTURE CARDS ── */}
        <div id="adsr-cup-category-panel" className="scroll-mt-24 mb-7">
          <p className="mb-3 font-black uppercase text-white/30" style={{ fontSize: "0.58rem", letterSpacing: "0.3em" }}>
            — Escolhe o escalão —
          </p>
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
            role="tablist"
            aria-label="Escalões da ADSR Cup"
          >
            {CUP_CATEGORIES.map((category) => {
              const isActive = category.id === activeCategoryId;
              const isDone = category.completed === true;
              const accent = isDone ? "#4ade80" : "#fed700";
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  onClick={() => selectCategory(category.id)}
                  aria-selected={isActive}
                  className="group relative flex min-w-[8.5rem] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fed700]"
                  style={{
                    background: isActive ? `rgba(${isDone ? "74,222,128" : "254,215,0"},0.09)` : "#060b1a",
                    border: `1px solid ${isActive ? `${accent}50` : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isActive ? `0 0 20px ${accent}18` : "none",
                  }}
                >
                  {/* Top accent bar */}
                  <span
                    className="h-[3px] w-full shrink-0 transition-all duration-200"
                    style={{ background: isActive ? accent : "rgba(255,255,255,0.06)" }}
                  />
                  <div className="flex flex-1 flex-col gap-1.5 px-4 py-3">
                    {/* Category name — BIG */}
                    <span
                      className="font-display font-black uppercase leading-none text-white"
                      style={{ fontSize: "clamp(1.1rem, 3vw, 1.35rem)" }}
                    >
                      {category.label}
                    </span>
                    {/* Status row */}
                    <span
                      className="flex items-center gap-1"
                      style={{ color: isActive ? accent : isDone ? `${accent}80` : "rgba(255,255,255,0.3)" }}
                    >
                      {isDone ? <CheckCircle2 size={10} /> : <CalendarDays size={10} />}
                      <span className="font-black uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.14em" }}>
                        {isDone ? "Concluído" : category.tabHint}
                      </span>
                    </span>
                    {/* Team count */}
                    <span className="font-bold text-white/25" style={{ fontSize: "0.6rem" }}>
                      {category.teams.length} equipas
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">

          {/* LEFT — main content */}
          <div className="order-1 space-y-4">

            {/* STATUS BLOCK */}
            {isCompleted ? (
              /* Completed — celebratory */
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid rgba(74,222,128,0.3)",
                  background: "linear-gradient(135deg, rgba(74,222,128,0.08), rgba(74,222,128,0.03))",
                  boxShadow: "0 0 32px rgba(74,222,128,0.07)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, #4ade80 40%, #4ade80 60%, transparent)" }}
                />
                <div className="flex items-center gap-4 p-4 sm:p-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)" }}
                  >
                    <CheckCircle2 size={22} className="text-[#4ade80]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-black uppercase text-[#4ade80]" style={{ fontSize: "0.6rem", letterSpacing: "0.28em" }}>
                      Apito Final · Evento Concluído
                    </p>
                    <p className="mt-0.5 font-display text-lg font-black uppercase leading-tight text-white sm:text-xl">
                      {activeCategory.label} · {activeCategory.dateLabel}
                    </p>
                  </div>
                  <Trophy size={32} className="shrink-0 text-[#fed700] opacity-25" />
                </div>
              </div>
            ) : (
              /* Countdown — dramatic scoreboard */
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid rgba(254,215,0,0.2)",
                  background: "#02040e",
                  boxShadow: "0 0 40px rgba(254,215,0,0.06)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, #fed700 40%, #fed700 60%, transparent)" }}
                />
                {/* Title with horizontal rules */}
                <div className="flex items-center gap-3 px-5 pt-4">
                  <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(254,215,0,0.25))" }} />
                  <p className="font-black uppercase text-[#fed700]" style={{ fontSize: "0.58rem", letterSpacing: "0.32em" }}>
                    Conta Regressiva · {activeCategory.label}
                  </p>
                  <span className="h-px flex-1" style={{ background: "linear-gradient(270deg, transparent, rgba(254,215,0,0.25))" }} />
                </div>
                {/* Digit tiles */}
                <div className="grid grid-cols-4 gap-2.5 p-4 sm:gap-3 sm:p-5">
                  {[
                    { v: tl.d, label: "Dias" },
                    { v: tl.h, label: "Horas" },
                    { v: tl.m, label: "Min" },
                    { v: tl.s, label: "Seg" },
                  ].map(({ v, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center rounded-xl py-4 sm:py-5"
                      style={{ background: "#0c1535", border: "1px solid rgba(254,215,0,0.1)", borderTop: "2px solid rgba(254,215,0,0.3)" }}
                    >
                      <span
                        className="font-display font-black tabular-nums leading-none text-white"
                        style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}
                      >
                        {pad(v)}
                      </span>
                      <span className="mt-2 font-black uppercase text-[#fed700]/55" style={{ fontSize: "0.55rem", letterSpacing: "0.16em" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location pills */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/60">
                <CalendarDays size={11} className="text-[#fed700]" />
                {activeCategory.dateLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/60">
                <MapPin size={11} className="text-[#fed700]" />
                Estádio N.S. Conceição · São Romão
              </span>
            </div>

            {/* Champion photo */}
            {showStandings && champion && (
              championImg ? (
                <figure className="relative overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(254,215,0,0.4)", boxShadow: "0 0 32px rgba(254,215,0,0.08)" }}>
                  <img
                    src={championImg}
                    alt={`Plantel campeão ${activeCategory.label} — ${champion.team.name}`}
                    className="block aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
                    loading="lazy"
                  />
                  <figcaption className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#fed700] px-3 py-1 shadow-lg">
                    <Trophy size={11} className="text-[#06020d]" />
                    <span className="font-black uppercase text-[#06020d]" style={{ fontSize: "0.58rem", letterSpacing: "0.16em" }}>
                      Campeão · {activeCategory.label}
                    </span>
                  </figcaption>
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#06020d]/97 via-[#06020d]/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 sm:p-5">
                    <Crest {...champion.team} size="lg" />
                    <div className="min-w-0">
                      <p className="font-black uppercase text-[#fed700]" style={{ fontSize: "0.58rem", letterSpacing: "0.22em" }}>
                        Plantel Vencedor
                      </p>
                      <p className="mt-0.5 font-display text-xl font-black uppercase leading-none text-white sm:text-2xl">
                        {champion.team.name}
                      </p>
                    </div>
                  </div>
                </figure>
              ) : (
                <div
                  className="flex items-center gap-4 rounded-2xl p-4 sm:p-5"
                  style={{ border: "1px solid rgba(254,215,0,0.35)", background: "#0c0e04" }}
                >
                  <Crest {...champion.team} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="font-black uppercase text-[#fed700]" style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}>
                      <Trophy size={11} className="mb-0.5 mr-1 inline" />
                      Campeão · {activeCategory.label}
                    </p>
                    <p className="mt-1 font-display text-xl font-black uppercase leading-none text-white sm:text-2xl">
                      {champion.team.name}
                    </p>
                    <p className="mt-1.5 text-xs text-white/35">Foto do plantel em breve</p>
                  </div>
                  <Trophy size={36} className="shrink-0 text-[#fed700] opacity-20" />
                </div>
              )
            )}

            {/* Standings + Awards side-by-side (or Teams if not completed) */}
            {showStandings && activeStandings ? (
              <div className={activeAwards.length > 0 ? "grid gap-4 lg:grid-cols-2 lg:items-start" : ""}>

                {/* Standings */}
                <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.09)", background: "#02040e" }}>
                  <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3">
                    <Trophy size={14} className="text-[#fed700]" aria-hidden />
                    <p className="flex-1 font-black uppercase text-[#fed700]" style={{ fontSize: "0.62rem", letterSpacing: "0.22em" }}>
                      Classificação Final
                    </p>
                    <span className="font-black uppercase text-white/20" style={{ fontSize: "0.55rem" }}>
                      {activeCategory.label}
                    </span>
                  </div>
                  {/* Column headers — only when full-width (no awards beside) */}
                  {activeAwards.length === 0 && (
                    <div className="hidden border-b border-white/[0.06] sm:flex sm:items-center">
                      <div className="flex flex-1 items-center gap-3 px-4 py-2">
                        <span className="w-6 text-center font-black uppercase text-white/20" style={{ fontSize: "0.58rem" }}>#</span>
                        <span className="ml-9 font-black uppercase text-white/20" style={{ fontSize: "0.58rem", letterSpacing: "0.1em" }}>Equipa</span>
                      </div>
                      <div className="flex shrink-0 gap-0 border-l border-white/8">
                        {["J", "V", "E", "D"].map((col) => (
                          <span key={col} className="w-9 py-2 text-center font-black uppercase text-white/20" style={{ fontSize: "0.58rem" }}>{col}</span>
                        ))}
                        <span className="w-12 border-l border-white/8 py-2 text-center font-black uppercase text-[#fed700]" style={{ fontSize: "0.58rem" }}>Pts</span>
                      </div>
                    </div>
                  )}
                  <div className="divide-y divide-white/[0.05]">
                    {(standingsExpanded ? activeStandings : activeStandings.slice(0, 5)).map((row) => (
                      <div
                        key={row.pos}
                        className={`relative flex items-center ${row.isChampion ? "bg-[#fed700]/[0.06]" : ""}`}
                      >
                        {row.isChampion && <span className="absolute inset-y-0 left-0 w-[3px] bg-[#fed700]" />}
                        <div className="flex flex-1 items-center gap-2.5 px-3 py-2.5">
                          <span
                            className={`w-5 shrink-0 text-center font-display font-black ${row.isChampion ? "text-[#fed700]" : "text-white/25"}`}
                            style={{ fontSize: row.pos <= 3 ? "1rem" : "0.85rem" }}
                          >
                            {row.pos}
                          </span>
                          <Crest {...row.team} />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <p className="line-clamp-1 text-xs font-semibold text-white/90">{row.team.name}</p>
                              {row.isChampion && (
                                <span className="shrink-0 rounded-full bg-[#fed700] px-1.5 py-0.5 font-black uppercase text-[#010209]" style={{ fontSize: "0.5rem", letterSpacing: "0.08em" }}>
                                  Campeão
                                </span>
                              )}
                            </div>
                            {/* Stats inline — always visible (replaces desktop-only panel in compact mode) */}
                            <div className="mt-0.5 flex gap-2">
                              {[{ k: "J", v: row.j }, { k: "V", v: row.v }, { k: "E", v: row.e }, { k: "D", v: row.d }].map(({ k, v }) => (
                                <span key={k} className="font-black text-white/30" style={{ fontSize: "0.58rem" }}>
                                  {k} <span className="text-white/55">{v}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Desktop stats panel — only in full-width mode */}
                        {activeAwards.length === 0 && (
                          <div className="hidden shrink-0 items-stretch border-l border-white/[0.06] sm:flex">
                            {[row.j, row.v, row.e, row.d].map((v, i) => (
                              <span key={i} className="flex w-9 items-center justify-center text-xs font-semibold text-white/40">{v}</span>
                            ))}
                            <div className={`flex w-12 items-center justify-center border-l border-white/[0.06] ${row.isChampion ? "bg-[#fed700]" : "bg-white/[0.06]"}`}>
                              <span className={`font-display text-lg font-black leading-none ${row.isChampion ? "text-[#06020d]" : "text-white"}`}>{row.pts}</span>
                            </div>
                          </div>
                        )}
                        {/* Points badge — always in compact, mobile-only otherwise */}
                        <div className={`mx-2.5 flex h-9 w-10 shrink-0 flex-col items-center justify-center rounded-lg ${activeAwards.length === 0 ? "sm:hidden" : ""} ${row.isChampion ? "bg-[#fed700]" : "bg-white/[0.07]"}`}>
                          <span className="font-black uppercase" style={{ fontSize: "0.45rem", color: row.isChampion ? "#06020d" : "#9f8fc8" }}>Pts</span>
                          <span className={`font-display text-lg font-black leading-none ${row.isChampion ? "text-[#06020d]" : "text-white"}`}>{row.pts}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {activeStandings.length > 5 && (
                    <button
                      type="button"
                      onClick={() => setStandingsExpanded((v) => !v)}
                      className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-t border-white/10 py-3 font-black uppercase text-white/40 transition-colors duration-200 hover:bg-white/[0.03] hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#fed700]"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
                    >
                      {standingsExpanded ? <>&#8593; Recolher</> : <>&#8595; Ver todos os {activeStandings.length} classificados</>}
                    </button>
                  )}
                </div>

                {/* Awards — beside standings */}
                {activeAwards.length > 0 && (
                  <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(107,86,255,0.25)", background: "#02040e" }}>
                    <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3">
                      <Star size={13} className="text-[#fed700]" aria-hidden />
                      <p className="font-black uppercase text-[#fed700]" style={{ fontSize: "0.62rem", letterSpacing: "0.22em" }}>
                        Prémios Individuais · {activeCategory.label}
                      </p>
                    </div>
                    <div className="divide-y divide-white/[0.05]">
                      {activeAwards.map((award) => {
                        const Icon = award.icon;
                        return (
                          <article
                            key={`${award.title}-${award.name}`}
                            className="flex items-center gap-3 bg-[#02040e] p-4 transition-colors duration-150 hover:bg-[#0a0620]"
                          >
                            <AwardAvatar initials={award.initials} accent={award.accent} image={award.image} />
                            <div className="min-w-0 flex-1">
                              <p className="font-black uppercase text-white/38" style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                                {award.title}
                              </p>
                              <p className="mt-0.5 font-display text-sm font-black uppercase leading-tight text-white">{award.name}</p>
                              {award.club && <p className="mt-0.5 text-[10px] font-semibold text-[#b9a9ee]">{award.club}</p>}
                            </div>
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#1b1730]">
                              <Icon size={16} className="text-[#fed700]" aria-hidden />
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Teams grid */
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.09)", background: "#02040e" }}>
                <div className="border-b border-white/8 px-4 py-3">
                  <p className="font-black uppercase text-white/30" style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}>
                    Equipas Confirmadas · {teams.length} equipas
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/[0.05] sm:grid-cols-3">
                  {teams.map((team, i) => (
                    <div
                      key={`${team.name}-${i}`}
                      className="flex items-center gap-2.5 bg-[#02040e] px-3 py-3 transition-colors duration-150 hover:bg-[#0b1530]"
                    >
                      <Crest {...team} />
                      <p className="line-clamp-2 text-xs font-semibold leading-snug text-white/85">{team.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — padrinho + clubes */}
          <div className="order-2 space-y-4 lg:sticky lg:top-24">

            {/* Padrinho video */}
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="flex items-center justify-between bg-[#06091a] px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <p className="font-black uppercase text-[#fed700]" style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}>
                    Mensagem do Padrinho
                  </p>
                  <p className="mt-0.5 text-sm font-black text-white">Tomás Silva</p>
                </div>
                <span
                  className="rounded-full bg-[#fed700] px-2.5 py-1 font-black uppercase text-[#010209]"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.12em" }}
                >
                  Vídeo Oficial
                </span>
              </div>
              <video
                className="block aspect-[9/16] max-h-[460px] w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
                poster={PADRINHO_IMAGE}
              >
                <source src={PADRINHO_VIDEO} type="video/mp4" />
              </video>
            </article>

            {/* Clubes participantes */}
            <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.09)", background: "#02040e" }}>
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
                <span className="h-px w-4 bg-[#fed700]/50" />
                <p className="font-black uppercase text-white/45" style={{ fontSize: "0.58rem", letterSpacing: "0.26em" }}>
                  Clubes Participantes
                </p>
                <span
                  className="ml-auto rounded-full bg-[#fed700]/10 px-2 py-0.5 font-black uppercase text-[#fed700]"
                  style={{ fontSize: "0.5rem", letterSpacing: "0.1em" }}
                >
                  {ALL_PARTICIPANTS.length}
                </span>
              </div>
              {/* Mobile: 6 cols (legible logos) · sm+: 12 cols — all clubs, no scroll, logos only (name in tooltip) */}
              <div className="grid grid-cols-6 gap-px bg-white/[0.04] sm:grid-cols-12">
                {ALL_PARTICIPANTS.map((team, i) => (
                  <div
                    key={`${team.name}-${i}`}
                    title={team.name}
                    className="group relative bg-[#02040e] p-1 transition-colors duration-150 hover:bg-[#0c1530]"
                    style={{ aspectRatio: "1/1" }}
                  >
                    {team.image ? (
                      <img
                        src={team.image}
                        alt={team.name}
                        className="absolute inset-0 h-full w-full object-contain p-0.5 transition-transform duration-200 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-[0.4rem] font-black text-white"
                        style={{ background: `linear-gradient(135deg, ${team.c1 ?? "#1f398a"} 50%, ${team.c2 ?? "#fed700"} 50%)` }}
                      >
                        {team.initials}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── SPONSORS ── */}
        <div className="mt-14 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#fed700]" />
                <span className="font-black uppercase text-[#fed700]" style={{ fontSize: "0.6rem", letterSpacing: "0.26em" }}>
                  Patrocinadores Oficiais
                </span>
              </div>
              <p className="font-display font-black uppercase leading-none text-white" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>
                ADSR Cup <span className="text-[#fed700]">2026</span>
              </p>
            </div>
            <p className="text-xs text-white/30">{SPONSORS.length} parceiros</p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {SPONSORS.map((sponsor) => {
              const bg = "bg" in sponsor ? (sponsor as { bg: string }).bg : "#ffffff";
              return (
              <div
                key={sponsor.name}
                title={sponsor.name}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: bg,
                }}
                onMouseEnter={(e) => { (e.currentTarget.style as CSSStyleDeclaration).borderColor = "rgba(254,215,0,0.5)"; }}
                onMouseLeave={(e) => { (e.currentTarget.style as CSSStyleDeclaration).borderColor = "rgba(255,255,255,0.12)"; }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-xl font-black text-gray-300">?</span>
                  )}
                </div>
                {/* Slide-up name on hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#fed700] px-2 py-1.5 transition-transform duration-200 ease-out group-hover:translate-y-0">
                  <p className="text-center font-black uppercase leading-tight text-[#010209]" style={{ fontSize: "0.52rem", letterSpacing: "0.06em" }}>
                    {sponsor.name}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0ms !important; }
        }
      `}</style>
    </section>
  );
};
