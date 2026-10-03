

import React from 'react';
import { Handshake } from 'lucide-react';

export const SponsorsHero: React.FC = () => {
  return (
    <div className="relative min-h-screen md:min-h-[95vh] flex items-center bg-navy-900 overflow-hidden">
      
      {/* 1. Background Image - CORRIGIDO */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Abrigo.jpg")' 
        }}
      ></div>

      {/* 2. Overlay Escuro - Para dar contraste ao texto */}
      <div className="absolute inset-0 z-10 bg-navy-900/85 mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-12 md:pt-20 md:pb-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2">
          <span className="text-gold-400 font-bold tracking-[0.2em] text-xs uppercase block mb-2 md:mb-4">
            Crescemos juntos com a comunidade
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-tight md:leading-none mb-1 md:mb-2">
            Nossos Parceiros &
          </h1>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-gold-400 uppercase leading-tight md:leading-none mb-4 md:mb-8">
            Patrocinadores
          </h1>
          
          <p className="text-gray-300 text-xs md:text-lg leading-relaxed max-w-xl mb-6 md:mb-10">
            O apoio das empresas locais é o pilar que sustenta os nossos sonhos. Conheça as marcas que acreditam no desporto em São Romão.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
            <button
              onClick={() => {
                const element = document.getElementById('sponsors-list');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-2 md:py-3 px-6 md:px-8 rounded shadow-lg uppercase text-xs md:text-sm tracking-widest transition-transform hover:scale-105"
            >
              Ver Lista
            </button>
          </div>
        </div>

        {/* Right Content - Opportunity Card */}
        <div className="lg:w-1/3 w-full">
           <div className="bg-navy-800 rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-white/10 transform hover:-translate-y-2 transition-transform duration-300">
              {/* Card Header */}
              <div className="bg-gray-700/50 p-3 md:p-4 text-center border-b border-white/5">
                 <span className="text-gold-400 font-bold text-xs uppercase tracking-widest">Oportunidade de Marca</span>
              </div>
              
              {/* Card Body */}
              <div className="p-6 md:p-10 flex flex-col items-center text-center bg-gradient-to-b from-navy-800 to-navy-900">
                 <div className="mb-4 md:mb-6 text-gold-400 opacity-80">
                    <Handshake size={48} strokeWidth={1.5} className="md:w-16 md:h-16" />
                 </div>
                 
                 <h3 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-1 md:mb-2">O Seu Logo Aqui</h3>
                 <span className="text-gold-400 font-bold text-xs uppercase tracking-widest mb-4 md:mb-8 block">Parceiro Oficial ADSR</span>
                 
                 <p className="text-gray-400 text-xs mb-4 md:mb-8 border-t border-white/10 pt-3 md:pt-6">
                    Associe a sua marca a um clube histórico e impacte centenas de pessoas semanalmente.
                 </p>
                 
                  <button
                    onClick={() => {
                     const element = document.getElementById('sponsors-proposal');
                     if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }
                    }}
                    className="w-full bg-white hover:bg-gray-100 text-navy-900 font-bold py-2 md:py-3 rounded uppercase text-xs tracking-widest transition-colors shadow-lg"
                  >
                    Solicitar Proposta Comercial
                  </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};