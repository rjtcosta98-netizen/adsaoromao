'use client';


import React from 'react';
import { ArrowRight, Trophy, Users, Star } from 'lucide-react';

interface RecruitmentCTAProps {
  onNavigate?: (page: string) => void;
}

export const RecruitmentCTA: React.FC<RecruitmentCTAProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-navy-900 py-12 md:py-24 overflow-hidden group">
      {/* Background Image with Parallax feel */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/ADSR%20Equipa?updatedAt=1772916779826")' }}
      ></div>
      <div className="absolute inset-0 bg-navy-900/90 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mb-4">
               <span className="bg-yellow-400 text-navy-900 text-[11px] md:text-xs font-bold px-2 md:px-3 py-1 rounded uppercase tracking-wider">
                 Captações Abertas 2025/26
               </span>
               <span className="text-gray-300 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                 Todos os Escalões
               </span>
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-white uppercase leading-none mb-4 md:mb-6">
              O Teu Futuro <br/>
              Começa <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Aqui</span>
            </h2>
            
            <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 border-l-4 border-yellow-400 pl-4 md:pl-6">
              Sonhas ser jogador? A AD São Romão é uma entidade formadora certificada. Vem aprender, crescer e vencer com a nossa camisola.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-8 md:mb-10">
               <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full text-yellow-400">
                    <Trophy size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <span className="block text-white font-bold text-xs md:text-sm uppercase">Competição</span>
                    <span className="text-[11px] md:text-xs text-gray-400">Campeonatos Distritais</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full text-yellow-400">
                    <Users size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <span className="block text-white font-bold text-xs md:text-sm uppercase">Formação</span>
                    <span className="text-[11px] md:text-xs text-gray-400">Certificada FPF</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full text-yellow-400">
                    <Star size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <span className="block text-white font-bold text-xs md:text-sm uppercase">Valores</span>
                    <span className="text-[11px] md:text-xs text-gray-400">Respeito & Ética</span>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => {
                onNavigate && onNavigate('inscricoes');
              }}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] uppercase text-xs md:text-sm tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 md:gap-3"
            >
              Fazer Pré-Inscrição <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          {/* Floating Card Visual */}
          <div className="hidden md:block relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
             
             <div className="relative bg-white/5 backdrop-blur-md border border-white/20 p-8 rounded-2xl max-w-xs transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/5] bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
                   <img src="https://ik.imagekit.io/elementgroup/ADSR/ADSR%20SUB%2010" alt="Atleta" loading="lazy" width={320} height={400} className="object-cover w-full h-full opacity-80" />
                   <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-navy-900 to-transparent">
                      <span className="text-white font-bold uppercase text-lg">Tu?</span>
                   </div>
                </div>
                <div className="text-center">
                   <p className="text-white font-display uppercase text-xl font-bold">Próximo Craque</p>
                   <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest">AD São Romão</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
