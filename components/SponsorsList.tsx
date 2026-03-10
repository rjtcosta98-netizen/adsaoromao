'use client';

import React from 'react';

// --- DADOS DOS PATROCINADORES ---
const SPONSORS_DATA = {
  gold: [
    // Usei imagens de exemplo que funcionam bem como "fundo"
    { id: 1, name: "Element Group - Solutions", logo: "https://ik.imagekit.io/elementgroup/ADSR/Element%20Group%20Solucoes%20Digitais", url: "https://elementgroup.pt" },
    { id: 2, name: "", logo: "", url: "#" },
  ],
  silver: [
    { id: 3, name: "", logo: "", url: "#" },
    { id: 4, name: "", logo: "", url: "#" },
    { id: 5, name: "", logo: "", url: "#" },
    { id: 6, name: "", logo: "", url: "#" },
  ],
  local: [
    { id: 7, name: "", logo: "", url: "#" },
    { id: 8, name: "", logo: "", url: "#" },
    { id: 9, name: "", logo: "", url: "#" },
    { id: 10, name: "", logo: "", url: "#" },
    { id: 11, name: "", logo: "", url: "#" },
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
                   // Removi 'flex items-center justify-center' para permitir que o fundo preencha tudo
                   className="bg-navy-800/50 h-48 rounded-2xl border border-white/5 relative shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1 transition-all duration-500 group"
                 >
                    {sponsor.logo ? (
                      // --- ABORDAGEM DE FUNDO PARA PREENCHER TOTALIDADE ---
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all"
                        style={{ backgroundImage: `url("${sponsor.logo}")` }}
                      ></div>
                    ) : (
                      // Fallback para texto (centrado se não houver imagem)
                      <div className="flex items-center justify-center h-full w-full">
                         <span className="text-white/30 font-display text-2xl uppercase group-hover:text-yellow-400 font-bold transition-colors">{sponsor.name}</span>
                      </div>
                    )}
                 </a>
              ))}
           </div>
        </div>

        {/* --- SECÇÃO SILVER (MANTIDA MAIS DISCRETA) --- */}
        <div className="text-center">
           <div className="inline-block border border-gray-400 rounded-full px-8 py-2 mb-10 bg-gray-400/5">
              <span className="text-gray-900 text-xs font-bold uppercase tracking-[0.2em]">Parceiros Silver</span>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {SPONSORS_DATA.silver.map((sponsor) => (
                 <div key={sponsor.id} className="bg-navy-800/30 h-32 rounded-xl border border-white/5 flex items-center justify-center hover:bg-navy-800 transition-colors group cursor-pointer overflow-hidden relative">
                    {sponsor.logo ? (
                       // Para Silver, mantivemos object-contain para não cortar logos mais pequenos
                      <img src={sponsor.logo} alt={sponsor.name} loading="lazy" width={160} height={80} className="w-full h-full object-contain p-4 opacity-50 group-hover:opacity-100 transition-opacity grayscale" />
                    ) : (
                      <span className="text-white/30 font-display text-sm md:text-lg uppercase group-hover:text-white/60 transition-colors text-center px-2">{sponsor.name}</span>
                    )}
                 </div>
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
                 <div key={sponsor.id} className="bg-navy-800/20 h-24 rounded border border-white/5 flex items-center justify-center hover:bg-navy-800 transition-colors group cursor-pointer px-2 text-center">
                    <span className="text-white/20 font-display text-xs uppercase group-hover:text-white/40 transition-colors">{sponsor.name}</span>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};