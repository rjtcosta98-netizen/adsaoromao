import React from "react";
import { Trophy, Users } from "lucide-react";

type CupTeam = {
  name: string;
  image?: string;
  initials?: string;
  c1?: string;
  c2?: string;
};

type CupCategoryConfig = {
  id: string;
  label: string;
  teams: CupTeam[];
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


const CUP_CATEGORIES: CupCategoryConfig[] = [
  {
    id: "sub14",
    label: "Sub-14",
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

/** Lista única de clubes que passaram pelo torneio, sem repetir quem jogou em vários escalões. */
const ALL_PARTICIPANTS: CupTeam[] = (() => {
  const vistos = new Set<string>();
  const resultado: CupTeam[] = [];
  for (const categoria of CUP_CATEGORIES) {
    for (const equipa of categoria.teams) {
      const chave = equipa.image ?? equipa.name;
      if (vistos.has(chave)) continue;
      vistos.add(chave);
      resultado.push(equipa);
    }
  }
  return resultado;
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

/** Cabeçalho de secção: a mesma barra amarela usada no resto do site. */
const TituloSeccao: React.FC<{ children: React.ReactNode; nota?: string }> = ({ children, nota }) => (
  <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8 md:mb-10">
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
      <h2 className="font-display text-lg font-bold uppercase text-white sm:text-xl md:text-3xl">{children}</h2>
    </div>
    {nota && (
      <span className="hidden whitespace-nowrap text-[11px] uppercase tracking-widest text-gray-400 sm:block">
        {nota}
      </span>
    )}
  </div>
);

/** Emblema do clube. Sem logótipo, cai num galhardete com as iniciais. */
const Crest: React.FC<CupTeam> = ({ name, image, initials, c1 = "#032d61", c2 = "#FFD700" }) => (
  <div className="group flex flex-col items-center gap-2 sm:gap-3">
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/95 transition-colors duration-300 group-hover:border-yellow-400/60 sm:h-20 sm:w-20">
      {image ? (
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-contain p-2" />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center font-display text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)` }}
        >
          {initials}
        </span>
      )}
    </div>
    <span className="line-clamp-2 max-w-[8rem] text-center text-[10px] font-medium leading-tight text-gray-400 transition-colors duration-300 group-hover:text-white sm:text-[11px]">
      {name}
    </span>
  </div>
);

export const EventsSection: React.FC = () => (
  <section id="adsr-cup" className="bg-navy-900">
    {/* ── CAPA ──
        O cartaz oficial já traz o seu próprio lettering, por isso entra aqui
        desfocado: serve de textura e deixa o título ler-se limpo por cima. */}
    <div className="relative flex min-h-[36vh] items-end overflow-hidden sm:min-h-[42vh] md:min-h-[52vh]">
      <div
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: 'url("/images/adsrcuphero.png")' }}
      ></div>
      <div className="absolute inset-0 z-10 bg-navy-900/85 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/30"></div>

      <div className="container relative z-20 mx-auto px-4 pb-8 pt-20 sm:px-6 sm:pb-10 md:pb-14 md:pt-28">
        <h1 className="flex flex-wrap items-baseline gap-x-3 font-display font-bold uppercase italic leading-[0.85] text-white drop-shadow-lg sm:gap-x-4">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl">ADSR</span>
          <span className="text-4xl text-yellow-400 sm:text-6xl md:text-7xl lg:text-8xl">Cup</span>
          <span className="text-2xl not-italic tracking-[0.15em] text-gray-400 sm:text-3xl md:text-4xl">2026</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-gray-300 sm:mt-4 sm:text-sm md:text-base">
          Quatro dias de futebol de formação em São Romão. Ficam os clubes que nos visitaram e as marcas que
          puseram o torneio de pé.
        </p>
      </div>
    </div>

    <div className="container mx-auto px-3 py-10 sm:px-4 sm:py-14 md:py-20">
      {/* ── MENSAGEM DO PADRINHO ── */}
      <div className="mb-12 sm:mb-16 md:mb-24">
        <TituloSeccao nota="Tomás Silva">Mensagem do Padrinho</TituloSeccao>

        <div className="grid gap-5 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-8">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-navy-800 shadow-xl sm:rounded-xl">
            <video
              src={PADRINHO_VIDEO}
              poster={PADRINHO_IMAGE}
              controls
              preload="none"
              playsInline
              className="aspect-video w-full bg-navy-900 object-cover"
            >
              O teu navegador não consegue reproduzir este vídeo.
            </video>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400/20 sm:h-10 sm:w-10">
                <Trophy className="text-yellow-400" size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold uppercase leading-tight text-white sm:text-xl">
                  Tomás Silva
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-yellow-400">Padrinho da IV Edição</p>
              </div>
            </div>
            <p className="text-[12px] leading-relaxed text-gray-300 sm:text-sm">
              O internacional português de futsal deixou a sua mensagem aos jovens que passaram pelo Estádio
              N.ª S.ª da Conceição durante a ADSR Cup 2026.
            </p>
          </div>
        </div>
      </div>

      {/* ── EQUIPAS PARTICIPANTES ── */}
      <div className="mb-12 sm:mb-16 md:mb-24">
        <TituloSeccao nota={`${ALL_PARTICIPANTS.length} clubes`}>Equipas Participantes</TituloSeccao>

        <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-8 md:grid-cols-6 lg:grid-cols-8">
          {ALL_PARTICIPANTS.map((equipa) => (
            <Crest key={equipa.image ?? equipa.name} {...equipa} />
          ))}
        </div>
      </div>

      {/* ── PATROCINADORES ── */}
      <div>
        <TituloSeccao nota={`${SPONSORS.length} parceiros`}>Patrocinadores Oficiais</TituloSeccao>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {SPONSORS.map((patrocinador) => (
            <div
              key={patrocinador.name}
              title={patrocinador.name}
              // Alguns logótipos são desenhados a branco sobre a cor da marca e
              // desapareceriam num cartão branco: esses trazem `bg` próprio.
              style={{ background: "bg" in patrocinador ? patrocinador.bg : "#ffffff" }}
              className="group flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg border border-white/10 p-3 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/60 hover:shadow-xl sm:p-4"
            >
              <img
                src={patrocinador.logo}
                alt={patrocinador.name}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
