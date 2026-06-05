

import React from 'react';

// --- DADOS DOS PATROCINADORES ---
const SPONSORS_DATA = {
  principal: [
    { id: 0, name: "Element Group - Solutions", logo: "https://ik.imagekit.io/elementgroup/ADSR/Element%20Group%20Solucoes%20Digitais", url: "https://elementgroup.pt" },
  ],
  gold: [
    { id: 1, name: "FDM CARTERET, NJ", logo: "https://ik.imagekit.io/xqd9lrvbt/gemini-2.5-flash-image_faz-me_este_logo_tal_e_qual_com_a_maxima_qualidade_sem_mudares_nada-1.jpg", url: "#" },
  ],
  technical: [
    { id: 2, name: "CDT Equipamentos", logo: "/images/rdt.svg", url: "https://www.cdt-equipamentos.com/" },
  ],
  silver: [
    { id: 3, name: "Alves Bandeira", logo: "https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/aa805ee2-6fb1-4c1d-9c18-706f9556bada.jpeg", url: "https://www.alvesbandeira.pt/pt/" },
    { id: 4, name: "Climahotel", logo: "https://climahotel.pt/wp-content/uploads/2024/10/logo-climahotel.png", url: "https://climahotel.pt/" },
  ],
  adsrcup: [
    { id: 20, name: "Element Group - Soluções Digitais", logo: "/images/patrocinadoresadsrcup/6.png", url: "https://elementgroup.pt" },
    { id: 21, name: "CDT Equipamentos", logo: "/images/rdt.svg", url: "https://www.cdt-equipamentos.com/" },
    { id: 22, name: "FDM CARTERET, NJ", logo: "https://ik.imagekit.io/xqd9lrvbt/gemini-2.5-flash-image_faz-me_este_logo_tal_e_qual_com_a_maxima_qualidade_sem_mudares_nada-1.jpg", url: "#" },
    { id: 23, name: "Alves Bandeira", logo: "https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/aa805ee2-6fb1-4c1d-9c18-706f9556bada.jpeg", url: "https://www.alvesbandeira.pt/pt/" },
    { id: 24, name: "Climahotel", logo: "https://climahotel.pt/wp-content/uploads/2024/10/logo-climahotel.png", url: "https://climahotel.pt/" },
    { id: 25, name: "Mota e Mota - Santa Eulália", logo: "/images/patrocinadoresadsrcup/1.png", url: "#" },
    { id: 26, name: "Matias Nature", logo: "/images/patrocinadoresadsrcup/2.png", url: "#" },
    { id: 27, name: "Cabeça da Velha - Restaurante", logo: "/images/patrocinadoresadsrcup/3.png", url: "#" },
    { id: 28, name: "Casa Albuquerque", logo: "/images/patrocinadoresadsrcup/4.png", url: "#" },
    { id: 29, name: "Padeirinhas da Estrela", logo: "/images/patrocinadoresadsrcup/5.png", url: "#" },
    { id: 30, name: "Radar da Sorte - Lotarias e Jogos, LDA", logo: "/images/patrocinadoresadsrcup/radar.png", url: "#" },
    { id: 31, name: "Clínica de Fisioterapia - Daniela Abreu", logo: "/images/patrocinadoresadsrcup/daniela.png", url: "#" },
    { id: 32, name: "Ricky - Música e Animação", logo: "/images/patrocinadoresadsrcup/ricky.png", url: "#" },
    { id: 33, name: "Maquiseia", logo: "/images/patrocinadoresadsrcup/maquiseia.png", url: "#" },
    { id: 34, name: "Montês Gin", logo: "/images/patrocinadoresadsrcup/montes.png", url: "#" },
    { id: 35, name: "Beijo Gelado", logo: "/images/patrocinadoresadsrcup/beijogelado.png", url: "#" },
    { id: 36, name: "Ricardo Mota Félix - Mecânica Auto", logo: "/images/patrocinadoresadsrcup/ricardomota.png", url: "#" },
    { id: 37, name: "Armando Pereira", logo: "/images/patrocinadoresadsrcup/armando.png", url: "#" },
    { id: 38, name: "Grupo Martinauto", logo: "/images/patrocinadoresadsrcup/grupo.png", url: "#", darkBg: true },
    { id: 39, name: "VISOR - Estúdios fotógrafos", logo: "/images/patrocinadoresadsrcup/visor.png", url: "#" },
  ],
  local: [
   { id: 5, name: 'Junta de Freguesia de S. Romão', category: 'Apoio Local', logo: 'https://ik.imagekit.io/xqd9lrvbt/gemini-2.5-flash-image_melhora-me_este_logo_sem_mudar_nada_e_remove_o_fundo-2.jpg', url: "#" },
  { id: 6, name: 'Município de Seia', category: 'Apoio Local', logo: 'https://ik.imagekit.io/xqd9lrvbt/logo_cm-seia.png', url: "#" },
  { id: 7, name: 'Solar do Mimo', category: 'Apoio Local',logo: 'https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/logo-solardomimo-b.png', url: "#" },
  { id: 8, name: 'Escola Evaristo Nogueira', category: 'Apoio Local', logo: 'https://ik.imagekit.io/hpkvbu9sn/416085974_893147459487726_7890513589601136074_n.jpg', url: "#" },
  { id: 9, name: 'Bombeiros Voluntários São Romão', category: 'Apoio Local', logo: 'https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/d1df0815-7d16-4855-b150-bc73bb6bc4be.jpeg', url: "#" },
  { id: 10, name: 'Agrupamento Escolas de Seia', category: 'Apoio Local', logo: 'https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/logotipo1.jpg', url: "#" },
  { id: 11, name: 'Jornal Santa Marinha', category: 'Apoio Local', logo: 'https://jornalsantamarinha.com/wp-content/uploads/2025/08/logo-oficial-jsm-retina-2023-300x99-1.png', url: "https://jornalsantamarinha.com/" },
  ]
};

export const SponsorsList: React.FC = () => {
   return (
      <div id="sponsors-list" className="py-24 border-t border-white/5">
      <div className="container mx-auto px-4 space-y-24">

        {/* --- SECÇÃO SPONSOR PRINCIPAL --- */}
        <div className="text-center">
           <div className="inline-block border-2 border-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-full px-10 py-3 mb-10 bg-gradient-to-r from-yellow-400/10 via-amber-300/10 to-yellow-400/10 shadow-lg shadow-yellow-400/20">
              <span className="text-yellow-400 text-sm font-bold uppercase tracking-[0.3em]">✦ Sponsor Principal ✦</span>
           </div>
           
           <div className="max-w-3xl mx-auto">
              {SPONSORS_DATA.principal.map((sponsor) => (
                 <a 
                   key={sponsor.id} 
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block bg-gradient-to-br from-navy-800/80 via-navy-900/90 to-navy-800/80 rounded-3xl border-2 border-yellow-400/30 relative shadow-2xl shadow-yellow-400/10 hover:shadow-yellow-400/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="h-56 md:h-64 overflow-hidden bg-white">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {sponsor.name && (
                      <div className="bg-gradient-to-t from-navy-900 via-navy-900/95 to-transparent px-6 py-4 border-t border-yellow-400/20">
                        <span className="text-white font-display text-lg uppercase tracking-widest group-hover:text-yellow-400 transition-colors">{sponsor.name}</span>
                      </div>
                    )}
                 </a>
              ))}
           </div>
        </div>
        
        {/* --- SECÇÃO GOLD --- */}
        <div className="text-center">
           <div className="inline-block border border-yellow-400 rounded-full px-8 py-2 mb-10 bg-yellow-400/5">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em]">Parceiros Gold</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              {SPONSORS_DATA.gold.map((sponsor) => (
                 <a 
                   key={sponsor.id} 
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full md:w-[calc(50%-1rem)] bg-navy-800/50 rounded-2xl border border-white/5 relative shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1 transition-all duration-500 group overflow-hidden flex flex-col"
                 >
                    {sponsor.logo ? (
                      <>
                        <div className="h-44 overflow-hidden bg-white">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        {sponsor.name && (
                          <div className="bg-gradient-to-t from-navy-900 via-navy-900/95 to-navy-900/80 px-4 py-3">
                            <span className="text-white/70 font-display text-sm uppercase tracking-wider group-hover:text-yellow-400 transition-colors">{sponsor.name}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-48 w-full">
                         <span className="text-white/30 font-display text-2xl uppercase group-hover:text-yellow-400 font-bold transition-colors">{sponsor.name || 'Disponível'}</span>
                      </div>
                    )}
                 </a>
              ))}
           </div>
        </div>

        {/* --- SECÇÃO PATROCINADOR TÉCNICO --- */}
        <div className="text-center">
           <div className="inline-block border border-sky-400 rounded-full px-8 py-2 mb-10 bg-sky-400/5">
              <span className="text-sky-300 text-xs font-bold uppercase tracking-[0.2em]">Patrocinador Técnico</span>
           </div>
           
           <div className="grid grid-cols-1 max-w-md mx-auto">
              {SPONSORS_DATA.technical.map((sponsor) => (
                 <a 
                   key={sponsor.id} 
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="rounded-2xl border border-sky-400/20 bg-navy-800 transition-colors group cursor-pointer overflow-hidden flex flex-col"
                 >
                    <div className="h-36 flex items-center justify-center bg-white p-6">
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name} 
                        loading="lazy" 
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                      />
                    </div>
                    <div className="bg-navy-900/90 px-4 py-3 border-t border-sky-400/10">
                      <span className="text-white/60 font-display text-sm uppercase tracking-wider group-hover:text-sky-300 transition-colors">{sponsor.name}</span>
                    </div>
                 </a>
              ))}
           </div>
        </div>

        {/* --- SECÇÃO SILVER (MANTIDA MAIS DISCRETA) --- */}
        <div className="text-center">
           <div className="inline-block border border-gray-400 rounded-full px-8 py-2 mb-10 bg-gray-400/5">
              <span className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em]">Parceiros Silver</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
              {SPONSORS_DATA.silver.map((sponsor) => (
                 <a 
                   key={sponsor.id} 
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-[calc(50%-0.75rem)] md:w-[calc(25%-1.125rem)] rounded-xl border border-white/5 bg-navy-800 transition-colors group cursor-pointer overflow-hidden flex flex-col"
                 >
                    {sponsor.logo ? (
                      <>
                        <div className="h-28 flex items-center justify-center bg-white p-4">
                          <img 
                            src={sponsor.logo} 
                            alt={sponsor.name} 
                            loading="lazy" 
                            className="max-w-full max-h-full object-contain opacity-100 transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>
                        {sponsor.name && (
                          <div className="bg-navy-900/90 px-3 py-2 border-t border-white/5">
                            <span className="text-white/50 font-display text-xs uppercase tracking-wider group-hover:text-gray-300 transition-colors">{sponsor.name}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-32 w-full">
                        <span className="text-white/30 font-display text-sm md:text-lg uppercase group-hover:text-white/60 transition-colors text-center px-2">{sponsor.name || 'Disponível'}</span>
                      </div>
                    )}
                 </a>
              ))}
           </div>
        </div>

        {/* --- SECÇÃO ADSR CUP --- */}
        <div className="text-center">
           <div className="inline-flex items-center gap-2 border border-yellow-500/60 rounded-full px-8 py-2 mb-10 bg-gradient-to-r from-yellow-500/10 via-amber-400/5 to-yellow-500/10">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em]">🏆 Patrocinadores ADSR Cup</span>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 max-w-6xl mx-auto">
              {SPONSORS_DATA.adsrcup.map((sponsor) => (
                 <a
                   key={sponsor.id}
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="rounded-xl border border-yellow-400/15 bg-navy-800/60 hover:border-yellow-400/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col"
                 >
                    <div className={`h-28 flex items-center justify-center p-3 ${sponsor.darkBg ? 'bg-[#1a2744]' : 'bg-white'}`}>
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-navy-900/90 px-3 py-2 border-t border-yellow-400/10">
                      <span className="text-white/50 font-display text-[10px] uppercase tracking-wider group-hover:text-yellow-400/80 transition-colors line-clamp-2 leading-tight block">{sponsor.name}</span>
                    </div>
                 </a>
              ))}
           </div>
        </div>

        {/* --- SECÇÃO LOCAL --- */}
        <div className="text-center">
           <div className="inline-block border border-orange-700/50 text-orange-500 rounded-full px-8 py-2 mb-10 bg-orange-900/10">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Apoios Locais</span>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {SPONSORS_DATA.local.map((sponsor) => (
                 <a 
                   key={sponsor.id} 
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="rounded border border-white/5 bg-navy-800/30 transition-colors group cursor-pointer overflow-hidden flex flex-col"
                 >
                    {sponsor.logo ? (
                      <>
                        <div className="h-20 flex items-center justify-center p-2">
                          <img 
                            src={sponsor.logo} 
                            alt={sponsor.name} 
                            loading="lazy" 
                            className="max-w-full max-h-full object-contain opacity-100 transition-opacity" 
                          />
                        </div>
                        {sponsor.name && (
                          <div className="bg-navy-900/80 px-2 py-1.5 border-t border-white/5">
                            <span className="text-white/40 font-display text-[10px] uppercase tracking-wider group-hover:text-orange-400/80 transition-colors line-clamp-1">{sponsor.name}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-24 w-full">
                        <span className="text-white/20 font-display text-xs uppercase group-hover:text-white/40 transition-colors">{sponsor.name || 'Disponível'}</span>
                      </div>
                    )}
                 </a>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};
