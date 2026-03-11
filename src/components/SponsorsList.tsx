

import React from 'react';

// --- DADOS DOS PATROCINADORES ---
const SPONSORS_DATA = {
  gold: [
    // Usei imagens de exemplo que funcionam bem como "fundo"
    { id: 1, name: "Element Group - Solutions", logo: "https://ik.imagekit.io/elementgroup/ADSR/Element%20Group%20Solucoes%20Digitais", url: "https://elementgroup.pt" },
    { id: 2, name: "", logo: "", url: "#" },
  ],
  silver: [
    { id: 3, name: "Alves Bandeira", logo: "https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/aa805ee2-6fb1-4c1d-9c18-706f9556bada.jpeg", url: "https://www.alvesbandeira.pt/pt/" },
    { id: 4, name: "", logo: "", url: "#" },
    { id: 5, name: "", logo: "", url: "#" },
    { id: 6, name: "", logo: "", url: "#" },
  ],
  local: [
    { id: 7, name: "Municipio de Seia", logo: "https://ik.imagekit.io/xqd9lrvbt/logo_cm-seia.png", url: "https://cm-seia.pt/" },
    { id: 8, name: "Solar do Mimo", logo: "https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/logo-solardomimo-b.png", url: "https://www.solardomimo.org/" },
    { id: 9, name: "Agrupamento Escolas de Seia", logo: "https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/logotipo1.jpg", url: "https://www.aeseia.pt/" },
    { id: 10, name: "Bombeiros Voluntários São Romão", logo: "https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/d1df0815-7d16-4855-b150-bc73bb6bc4be.jpeg", url: "https://www.facebook.com/BombeirosVoluntariosdeSaoRomao/" },
    { id: 11, name: "Vila de S. Romão", logo: "https://ik.imagekit.io/xqd9lrvbt/gemini-2.5-flash-image_melhora-me_este_logo_sem_mudar_nada_e_remove_o_fundo-2.jpg", url: "#" },
  ]
};

export const SponsorsList: React.FC = () => {
   return (
      <div id="sponsors-list" className="py-24 border-t border-white/5">
      <div className="container mx-auto px-4 space-y-24">
        
        {/* --- SECÇÃO GOLD (MODIFICADA PARA PREENCHER TUDO) --- */}
        <div className="text-center">
           <div className="inline-block border border-yellow-400 rounded-full px-8 py-2 mb-10 bg-yellow-400/5">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em]">Parceiros Gold</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {SPONSORS_DATA.gold.map((sponsor) => (
                 <a 
                   key={sponsor.id} 
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-navy-800/50 rounded-2xl border border-white/5 relative shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1 transition-all duration-500 group overflow-hidden flex flex-col"
                 >
                    {sponsor.logo ? (
                      <>
                        <div className="h-44 relative">
                          <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all"
                            style={{ backgroundImage: `url("${sponsor.logo}")` }}
                          ></div>
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

        {/* --- SECÇÃO SILVER (MANTIDA MAIS DISCRETA) --- */}
        <div className="text-center">
           <div className="inline-block border border-gray-400 rounded-full px-8 py-2 mb-10 bg-gray-400/5">
              <span className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em]">Parceiros Silver</span>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {SPONSORS_DATA.silver.map((sponsor) => (
                 <a 
                   key={sponsor.id} 
                   href={sponsor.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-navy-800/30 rounded-xl border border-white/5 hover:bg-navy-800 transition-colors group cursor-pointer overflow-hidden flex flex-col"
                 >
                    {sponsor.logo ? (
                      <>
                        <div className="h-28 overflow-hidden">
                          <img 
                            src={sponsor.logo} 
                            alt={sponsor.name} 
                            loading="lazy" 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" 
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
                   className="bg-navy-800/20 rounded border border-white/5 hover:bg-navy-800 transition-colors group cursor-pointer overflow-hidden flex flex-col"
                 >
                    {sponsor.logo ? (
                      <>
                        <div className="h-20 flex items-center justify-center p-2">
                          <img 
                            src={sponsor.logo} 
                            alt={sponsor.name} 
                            loading="lazy" 
                            className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" 
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