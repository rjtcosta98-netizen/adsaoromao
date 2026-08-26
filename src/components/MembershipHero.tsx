

import React from 'react';
import { LOGO_URL } from '../constants';

export const MembershipHero: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] md:min-h-[85vh] flex items-center bg-navy-900 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/488216606_1220015116791467_442197340549284104_n.jpg")' }}
      ></div>
      <div className="absolute inset-0 bg-navy-900/80 z-10 gradient-mask-r opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-transparent z-10"></div>

      <div className="container mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 mt-6 md:mt-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2 pt-6 md:pt-10 lg:pt-0">
          <span className="text-gold-400 font-bold tracking-[0.2em] text-xs uppercase block mb-3 md:mb-4">
            Faz parte da nossa família desde 1962
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white uppercase leading-[0.9] mb-6 md:mb-8">
            Orgulho em ser <br/>
            <span className="text-gold-400">Sócio ADSR</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mb-8 md:mb-10">
            Mais do que um apoio, a tua quota é a força que mantém viva a nossa história. Apoia o desporto local e desfruta de benefícios exclusivos.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={() => {
                const element = document.getElementById('membership-registration');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-3 px-6 md:py-4 md:px-8 rounded shadow-[0_0_20px_rgba(255,215,0,0.3)] uppercase text-xs md:text-sm tracking-wider md:tracking-widest transition-transform hover:scale-105 active:scale-95"
            >
              Quero ser Sócio
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('membership-benefits');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold py-3 px-6 md:py-4 md:px-8 rounded uppercase text-xs md:text-sm tracking-wider md:tracking-widest transition-colors"
            >
              Vantagens
            </button>
          </div>
        </div>

        {/* Right Content - Card Visual */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end perspective-1000 relative">
           
           <div className="relative w-full max-w-md aspect-[1.586/1] overflow-hidden transform rotate-y-12 rotate-z-6 hover:rotate-0 transition-all duration-700 cursor-pointer">
              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                 style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Cartao.png?updatedAt=1773054917046")' }}
                  >
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};