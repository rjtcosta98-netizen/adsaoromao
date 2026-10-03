

import React from 'react';
import { MapPin, Users, LandPlot } from 'lucide-react';

export const ClubStadium: React.FC = () => {
  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden bg-white py-6">
        <div className="container mx-auto px-4">
          {/* Imagem do Estádio */}
          <div 
            className="w-full h-[250px] rounded-xl overflow-hidden bg-cover bg-center mb-6 shadow-lg"
            style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Estadio%20ADSR?updatedAt=1772915710461")' }}
          ></div>

          {/* Card com Informações */}
          <div className="bg-navy-900/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-gold-400 shadow-2xl">
             <span className="text-gold-400 font-bold tracking-[0.2em] text-xs uppercase block mb-2">
               O Palco dos Sonhos
             </span>
             <h2 className="text-2xl font-display font-bold text-white uppercase mb-4 leading-none">
               A Nossa <br/> Casa
             </h2>
             
             <p className="text-gray-300 text-xs leading-relaxed mb-6">
               Mais do que um relvado, o Estádio da nossa Senhora da Conceição é a nossa fortaleza. É aqui que gerações se cruzam, onde o suor se transforma em glória e onde o coração da nossa comunidade bate mais forte a cada domingo.
             </p>

             <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mb-6">
                <div className="text-center">
                   <div className="text-gold-400 mb-1 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                   </div>
                   <div className="font-display font-bold text-lg text-white">1962</div>
                   <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Inauguração</div>
                </div>

                <div className="text-center border-l border-white/10 border-r">
                   <div className="text-gold-400 mb-1 flex justify-center">
                     <LandPlot size={18} />
                   </div>
                   <div className="font-display font-bold text-lg text-white">Sintético</div>
                   <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Piso</div>
                </div>

                <div className="text-center">
                   <div className="text-gold-400 mb-1 flex justify-center">
                     <Users size={18} />
                   </div>
                   <div className="font-display font-bold text-lg text-white">975</div>
                   <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Lotação</div>
                </div>
             </div>

<button 
  onClick={() => window.open('https://maps.app.goo.gl/SKtjuHyhzjYa8MuL8', '_blank')}
  className="w-full bg-white hover:bg-gray-100 text-navy-900 font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-colors pointer-events-auto cursor-pointer"
>
  <MapPin size={16} className="text-gold-500" />
  Como Chegar
</button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative h-[600px] lg:h-[700px] w-full overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Estadio%20ADSR?updatedAt=1772915710461")' }}
        ></div>
        <div className="absolute inset-0 bg-navy-900/10 z-10"></div>
        
        {/* Content Container (Left Aligned Box) */}
        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <div className="w-full md:max-w-md bg-navy-900/80 backdrop-blur-sm p-6 md:p-10 lg:p-14 rounded-xl md:rounded-r-3xl border-l-4 border-gold-400 shadow-2xl">
             <span className="text-gold-400 font-bold tracking-[0.2em] text-xs uppercase block mb-2">
               O Palco dos Sonhos
             </span>
             <h2 className="text-2xl md:text-4xl lg:text-6xl font-display font-bold text-white uppercase mb-4 md:mb-6 leading-none">
               A Nossa <br/> Casa
             </h2>
             
             <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 md:mb-10">
               Mais do que um relvado, o Estádio da nossa Senhora da Conceição é a nossa fortaleza. É aqui que gerações se cruzam, onde o suor se transforma em glória e onde o coração da nossa comunidade bate mais forte a cada domingo.
             </p>

             <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-white/10 pt-4 md:pt-8 mb-6 md:mb-10">
                <div className="text-center">
                   <div className="text-gold-400 mb-1 md:mb-2 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                   </div>
                   <div className="font-display font-bold text-lg md:text-2xl text-white">1962</div>
                   <div className="text-[11px] md:text-[12px] text-gray-400 uppercase tracking-wider mt-0.5 md:mt-1">Inauguração</div>
                </div>

                <div className="text-center border-l border-white/10 border-r">
                   <div className="text-gold-400 mb-1 md:mb-2 flex justify-center">
                     <LandPlot size={18} className="md:w-6 md:h-6" />
                   </div>
                   <div className="font-display font-bold text-lg md:text-2xl text-white">Sintético</div>
                   <div className="text-[11px] md:text-[12px] text-gray-400 uppercase tracking-wider mt-0.5 md:mt-1">Piso</div>
                </div>

                <div className="text-center">
                   <div className="text-gold-400 mb-1 md:mb-2 flex justify-center">
                     <Users size={18} className="md:w-6 md:h-6" />
                   </div>
                   <div className="font-display font-bold text-lg md:text-2xl text-white">975</div>
                   <div className="text-[11px] md:text-[12px] text-gray-400 uppercase tracking-wider mt-0.5 md:mt-1">Lotação</div>
                </div>
             </div>

             <button 
               onClick={() => window.open('https://maps.app.goo.gl/SKtjuHyhzjYa8MuL8', '_blank')}
               className="w-full md:w-auto bg-white hover:bg-gray-100 text-navy-900 font-bold py-2 md:py-3 px-6 md:px-8 rounded-full shadow-lg flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest transition-colors cursor-pointer"
             >
                <MapPin size={16} className="text-gold-500" />
                Como Chegar
             </button>
          </div>
        </div>
      </div>
    </>
  );
};