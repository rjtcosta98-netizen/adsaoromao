

import React from 'react';
// import { HISTORY_STATS } from '../constants'; // Descomenta se tiveres o ficheiro, caso contrário uso um mock abaixo

// Mock para o exemplo funcionar (caso não tenhas o import)
import { Trophy, Users, Calendar, Star } from 'lucide-react';

interface HistoryStatsProps {
  onNavigate?: (page: string) => void;
  backgroundImage?: string;
}

const HISTORY_STATS = [
  { id: 1, value: "1962", label: "Ano de Fundação", icon: Calendar, color: "from-yellow-400 to-yellow-500" },
  { id: 2, value: "4X", label: "Campeões Distritais (Seniores)", icon: Trophy, color: "from-yellow-400 to-yellow-500" },
  { id: 3, value: "+180", label: "Atletas no Ativo", icon: Users, color: "from-yellow-400 to-yellow-500" },
  { id: 4, value: "5", label: "Presenças Campeonato Portugal", icon: Star, color: "from-yellow-400 to-yellow-500" },
];

export const HistoryStats: React.FC<HistoryStatsProps> = ({ onNavigate, backgroundImage }) => {
  return (
    <div className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-navy-900">

      {/* Base + imagem de contexto, conforme a camada 1-2 da spec */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        ></div>
      )}

      {/* Véu + gradiente diagonal — camadas 3-4 da spec, sobre a imagem */}
      <div className="absolute inset-0 z-0 bg-navy-900/70"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(3,21,58,0.95)_0%,rgba(3,21,58,0.72)_42%,rgba(3,21,58,0.34)_100%)]"></div>

      {/* Halo dourado — um único por secção, nunca dois */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255,215,0,0.10),transparent_38%)] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <span className="text-yellow-400 font-bold tracking-[0.22em] text-[10px] uppercase block mb-3 md:mb-4">
             O Nosso Legado
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white uppercase mb-4 md:mb-6 leading-tight tracking-tight">
            A Nossa História<br className="hidden sm:block" /> em <span className="text-yellow-400">Números</span>
          </h2>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            Mais de seis décadas formando atletas, construindo legados e elevando o nome de <span className="font-bold text-yellow-400">São Romão</span> ao mais alto nível.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-14 lg:mb-16">
          {HISTORY_STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative overflow-hidden rounded-lg md:rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Cartão da spec: superfície navy translúcida com blur, sem cartão dentro de cartão */}
                <div className="relative z-10 border border-white/12 bg-[#03153a]/58 backdrop-blur-md group-hover:border-yellow-400/40 rounded-lg md:rounded-xl p-5 md:p-6 lg:p-7 text-center shadow-[0_22px_70px_rgba(0,0,0,0.35)] h-full flex flex-col justify-center">

                  {/* Icon Container */}
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className={`w-12 md:w-14 h-12 md:h-14 rounded-lg bg-gradient-to-br ${stat.color} p-2.5 md:p-3 flex items-center justify-center shadow-[0_0_18px_rgba(255,215,0,0.35)]`}>
                      <Icon size={28} className="md:w-7 md:h-7 text-navy-900" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Stats Value — número em destaque, escala e peso generosos */}
                  <div className="font-display font-black text-5xl md:text-6xl mb-2 md:mb-3 text-white">
                    {stat.value}
                  </div>

                  {/* Stats Label */}
                  <div className="text-yellow-400 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] leading-tight">
                    {stat.label}
                  </div>
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
            className="inline-flex items-center gap-2 md:gap-3 bg-yellow-400 hover:bg-yellow-300 text-navy-900 font-black py-2.5 md:py-3 lg:py-4 px-5 md:px-7 lg:px-9 rounded-lg uppercase text-[11px] md:text-xs lg:text-sm tracking-widest transition-all duration-300 shadow-lg hover:shadow-2xl shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:-translate-y-0.5 active:scale-95"
          >
            Ler História
          </button>
        </div>
      </div>
    </div>
  );
};
