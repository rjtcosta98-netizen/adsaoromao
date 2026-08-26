

import React from 'react';
// import { HISTORY_STATS } from '../constants'; // Descomenta se tiveres o ficheiro, caso contrário uso um mock abaixo

// Mock para o exemplo funcionar (caso não tenhas o import)
import { Trophy, Users, Calendar, Star } from 'lucide-react';

interface HistoryStatsProps {
  onNavigate?: (page: string) => void;
  backgroundImage?: string;
}

const HISTORY_STATS = [
  { id: 1, value: "1962", label: "Ano de Fundação", icon: Calendar, color: "from-gold-400 to-gold-500" },
  { id: 2, value: "4X", label: "Campeões Distritais (Seniores)", icon: Trophy, color: "from-gold-400 to-gold-500" },
  { id: 3, value: "+180", label: "Atletas no Ativo", icon: Users, color: "from-gold-400 to-gold-500" },
  { id: 4, value: "5", label: "Presenças Campeonato Portugal", icon: Star, color: "from-gold-400 to-gold-500" },
];

export const HistoryStats: React.FC<HistoryStatsProps> = ({ onNavigate, backgroundImage }) => {
  return (
    <div className="section-y relative overflow-hidden bg-navy-900 text-white">
      
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        ></div>
      )}

      {/* Gradient Overlay on top of image */}
      <div className="absolute inset-0 z-0 bg-navy-900/40"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy-900 via-navy-900/70 to-navy-900"></div>

      {/* Animated Background Elements Only */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl opacity-5 z-0 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300 rounded-full blur-3xl opacity-5 z-0 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-12 flex max-w-3xl flex-col items-center gap-4 text-center md:mb-16 mx-auto">
          <div className="flex items-center gap-3">
            <span className="kicker-rule" aria-hidden="true" />
            <span className="font-display text-[11px] font-semibold uppercase tracking-kicker text-gold-400">
              O Nosso Legado
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.85rem,5vw,3rem)] font-bold uppercase leading-[0.92] text-white">
            A Nossa História<br className="hidden sm:block" /> em <span className="text-gold-400">Números</span>
          </h2>
          <p className="text-base leading-relaxed text-white/65">
            Mais de seis décadas formando atletas, construindo legados e elevando o nome de <span className="font-bold text-gold-400">São Romão</span> ao mais alto nível.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-14 lg:mb-16">
          {HISTORY_STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id}
                className="group relative overflow-hidden rounded-lg md:rounded-xl transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`}></div>
                
                {/* Card Body */}
                <div className="relative z-10 bg-navy-800/60 backdrop-blur-md border border-white/10 group-hover:border-gold-400/50 rounded-lg md:rounded-xl p-5 md:p-6 lg:p-7 text-center transition-all duration-300 h-full flex flex-col justify-center">
                  
                  {/* Icon Container */}
                  <div className={`flex justify-center mb-3 md:mb-4 transform group-hover:scale-125 transition-all duration-300`}>
                    <div className={`w-12 md:w-14 h-12 md:h-14 rounded-lg bg-gradient-to-br ${stat.color} p-2.5 md:p-3 flex items-center justify-center shadow-lg group-hover:shadow-2xl`}>
                      <Icon size={28} className="md:w-7 md:h-7" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Stats Value */}
                  <div className={`font-display font-black text-4xl md:text-5xl mb-2 md:mb-3 transition-all duration-300 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
                    {stat.value}
                  </div>
                  
                  {/* Stats Label */}
                  <div className="text-white text-[11px] md:text-xs font-black uppercase tracking-[0.1em] leading-tight opacity-90 group-hover:opacity-100 transition-opacity">
                    {stat.label}
                  </div>
                  
                  {/* Bottom accent bar */}
                  <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500 mt-3 md:mt-4 mx-auto`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            onClick={() => {
              onNavigate && onNavigate('clube');
            }}
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-navy-900 font-black py-2.5 md:py-3 lg:py-4 px-5 md:px-7 lg:px-9 rounded-lg md:rounded-lg uppercase text-[11px] md:text-xs lg:text-sm tracking-widest transition-all duration-300 shadow-lg hover:shadow-2xl shadow-gold-400/20 hover:shadow-gold-400/40 hover:scale-105 active:scale-95"
          >
            Ler História
          </button>
        </div>
      </div>
    </div>
  );
};