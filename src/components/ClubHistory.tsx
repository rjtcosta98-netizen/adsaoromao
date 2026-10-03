

import React from 'react';
import { ArrowDown } from 'lucide-react';

export const ClubHistory: React.FC = () => {
  return (
    <div id="clube" className="relative w-full">
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-24 md:py-40 ">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/historia%20adsr.jpg")' }}
        ></div>
      
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-400 font-bold tracking-[0.2em] text-xs uppercase block mb-3 md:mb-4">
            Desde 10/10/1962
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-8xl text-white uppercase leading-none mb-4 md:mb-6">
            História do <br/> <span className="text-gold-400">Clube</span>
          </h1>
          <div className="animate-bounce">
            <ArrowDown className="text-white mx-auto w-8 h-8" />
          </div>
        </div>
      </div>

      {/* 50 Years Text Section */}
      <div className="bg-navy-900 py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2">
               <span className="text-gold-400 font-bold text-4xl md:text-5xl lg:text-6xl font-display mb-3 md:mb-4 block">
                 64 ANOS <br/> DE HISTÓRIA
               </span>
               <div className="h-2 w-24 bg-gold-400 mb-6 md:mb-8"></div>
               <p className="text-white text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                 Fundada a 10 de Outubro de 1962, a Associação Desportiva de São Romão ostenta um palmarés que orgulha toda a região.
               </p>
               <p className="text-gray-400 text-sm leading-relaxed mb-6">
                 Com 4 títulos de Campeão Distrital da 1.ª Divisão e 5 presenças nos Campeonatos Nacionais, somos um símbolo de competência. Mas a nossa maior vitória é a formação: década após década, temos moldado campeões desde os Infantis aos Juniores.
               </p>
               <p className="text-gray-400 text-sm leading-relaxed">
                 Do campo da Nossa Senhora da Conceição aos relvados nacionais, esta é a nossa cronologia de glória.
               </p>
            </div>
            <div className="lg:w-1/2">
                <img 
                  src="https://ik.imagekit.io/elementgroup/ADSR/ADSR%20Equipa%20antiga" 
                  alt="Equipa antiga" 
                  className="rounded-lg shadow-2xl border-4 border-white/10 transition-all duration-500"
                />
            </div>
        </div>
      </div>
    </div>
  );
};