

import React from 'react';
import { Check } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface MembershipProps {
  onNavigate?: (page: string) => void;
}

export const Membership: React.FC<MembershipProps> = ({ onNavigate }) => {
  return (
    <div id="socios" className="section-y relative overflow-hidden bg-navy-900 text-white">
       {/* Background Textures */}
       <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Socios")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/60 md:to-navy-900/40 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Content: Call to Action */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
              <span className="kicker-rule" aria-hidden="true" />
              <span className="font-display text-[11px] font-semibold uppercase tracking-kicker text-gold-400">
                Faz parte da família
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,6.5vw,3.75rem)] font-bold text-white uppercase leading-[0.9] mb-5 md:mb-8 drop-shadow-lg">
              O Teu Lugar é No <br/>
              <span className="text-gold-400">São Romão</span>
            </h2>

            <p className="text-white/65 max-w-lg mx-auto lg:mx-0 mb-6 md:mb-8 text-base leading-relaxed">
              Mais do que um adepto, sê o motor do nosso crescimento. Apoia o desporto local e desfruta de benefícios exclusivos.
            </p>

            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 text-left max-w-md mx-auto lg:mx-0">
              {[
                'Entrada gratuita nos jogos em casa',
                'Descontos em parceiros locais',
                'Voto direto nas decisões do clube'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start text-white text-xs md:text-sm font-bold tracking-wide">
                  <Check className="text-gold-400 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 stroke-[3px] flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto lg:mx-0">
              <button 
                onClick={() => onNavigate && onNavigate('socios')}
                className="w-full sm:w-auto bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-3 md:py-4 px-6 md:px-8 rounded shadow-lg shadow-gold-400/20 uppercase text-xs md:text-sm tracking-widest transition-all hover:scale-105"
              >
                Quero ser Sócio
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('socios')}
                className="w-full sm:w-auto bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold py-3 md:py-4 px-6 md:px-8 rounded uppercase text-xs md:text-sm tracking-widest transition-colors"
              >
                Pedir Informações
              </button>
            </div>
          </div>

          {/* Right Content: Cards Visual */}
          <div className="relative h-[300px] sm:h-[320px] md:h-[360px] lg:h-[400px] w-full flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <img 
              src="https://ik.imagekit.io/elementgroup/ADSR/Cartao%20Socio%20ADSR" 
              alt="Membership Card" 
              loading="lazy"
              width={350}
              height={220}
              className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[40vh] max-w-[350px] lg:max-w-none h-auto object-contain rounded-lg transform transition-transform duration-500 hover:scale-105 lg:hover:rotate-y-180 cursor-pointer drop-shadow-2xl" 
            />
          </div>

        </div>
      </div>
    </div>
  );
};