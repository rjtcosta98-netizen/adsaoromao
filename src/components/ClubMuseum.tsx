

import React from 'react';
import { Trophy, FileText, Coffee } from 'lucide-react';

export const ClubMuseum: React.FC = () => {
  return (
    <div className="bg-navy-900 py-16 md:py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          
          {/* Left Side Content */}
          <div className="lg:w-1/2">
            <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-3 border-b-2 border-yellow-400 inline-block pb-1">
              O Coração do Clube
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase mb-6 md:mb-8">
              Guardiã da <br/> Mística
            </h2>
            
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 md:mb-10">
              Mais do que paredes e teto, a nossa sede é o cofre das nossas memórias. É aqui que preservamos cada taça erguida, cada fotografia amarelada pelo tempo e cada documento que comprova a nossa longa caminhada desde 1962. Um espaço de encontro entre o passado glorioso e o futuro que construímos juntos.
            </p>

            <div className="space-y-3 md:space-y-4">
              {/* Card 1 */}
              <div className="bg-navy-800 p-3 md:p-4 rounded-lg flex items-start gap-3 md:gap-4 hover:bg-navy-700 transition-colors cursor-default border border-white/5">
                 <div className="bg-yellow-400/10 p-2 md:p-3 rounded-full text-yellow-400 shrink-0">
                    <Trophy size={18} className="md:w-5 md:h-5" />
                 </div>
                 <div>
                    <h4 className="text-white font-bold uppercase text-sm md:text-lg">Sala de Troféus</h4>
                    <p className="text-gray-400 text-xs mt-1">O nosso orgulho exposto em vitrines de glória.</p>
                 </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-navy-800 p-3 md:p-4 rounded-lg flex items-start gap-3 md:gap-4 hover:bg-navy-700 transition-colors cursor-default border border-white/5">
                 <div className="bg-yellow-400/10 p-2 md:p-3 rounded-full text-yellow-400 shrink-0">
                    <FileText size={18} className="md:w-5 md:h-5" />
                 </div>
                 <div>
                    <h4 className="text-white font-bold uppercase text-sm md:text-lg">Arquivo Histórico</h4>
                    <p className="text-gray-400 text-xs mt-1">Documentos fundadores e registos desde 1962.</p>
                 </div>
              </div>

               {/* Card 3 */}
              <div className="bg-navy-800 p-3 md:p-4 rounded-lg flex items-start gap-3 md:gap-4 hover:bg-navy-700 transition-colors cursor-default border border-white/5">
                 <div className="bg-yellow-400/10 p-2 md:p-3 rounded-full text-yellow-400 shrink-0">
                    <Coffee size={18} className="md:w-5 md:h-5" />
                 </div>
                 <div>
                    <h4 className="text-white font-bold uppercase text-sm md:text-lg">Espaço de Convívio</h4>
                    <p className="text-gray-400 text-xs mt-1">Ponto de encontro para sócios e adeptos.</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side Visuals */}
          <div className="lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
             {/* Main Image (Trophies) */}
             <div className="absolute top-0 right-0 w-3/4 h-3/5 rounded-lg md:rounded-2xl overflow-hidden border-2 md:border-4 border-white/10 shadow-xl md:shadow-2xl z-10">
                <img src="https://ik.imagekit.io/elementgroup/ADSR/SEDE%20ADSR.jpg" alt="Sede Antiga" loading="lazy" width={400} height={300} className="w-full h-full object-cover" />
             </div>
             {/* Secondary Image (Old Photo) */}
             <div className="absolute bottom-0 left-0 w-3/5 h-1/2 rounded-lg md:rounded-2xl overflow-hidden border-2 md:border-4 border-white/10 shadow-xl md:shadow-2xl z-20">
                <img src="https://ik.imagekit.io/elementgroup/ADSR/Trofeus%20ADSR" alt="Trofeus" loading="lazy" width={400} height={300} className="w-full h-full object-cover grayscale" />
             </div>

             {/* Sticker Badge */}
             <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 z-30 bg-yellow-400 text-navy-900 p-2 md:p-4 rounded-lg shadow-lg md:shadow-xl -rotate-6 transform hover:rotate-0 transition-transform">
                <span className="text-[11px] md:text-[12px] font-bold uppercase block tracking-wider">Fundação</span>
                <span className="text-lg md:text-2xl font-display font-bold uppercase block leading-none">10 OUT 1962</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};