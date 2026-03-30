

import React from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';

interface GalleryHeroProps {
  onNavigate?: (page: string, id?: number) => void;
}

export const GalleryHero: React.FC<GalleryHeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[95vh] flex items-center bg-navy-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/ADSR%20Galery.jpg")' }}
      ></div>
      <div className="absolute inset-0 bg-navy-900/70 z-10"></div>

      <div className="container mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 pt-20 pb-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-4">
            Momentos eternizados em azul e ouro
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] mb-8">
            Nossa História em <br/> <span className="text-yellow-400">Imagens</span>
          </h1>
          
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">
            Reviva as grandes vitórias, o convívio da nossa comunidade e a garra dos nossos atletas através da lente oficial do clube.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-4 px-10 rounded shadow-[0_0_20px_rgba(255,215,0,0.3)] uppercase text-sm tracking-widest transition-transform hover:scale-105">
              Ver Álbuns
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded uppercase text-sm tracking-widest transition-colors">
              Vídeos
            </button>
          </div>
        </div>

        {/* Right Content - Featured Album Card */}
        <div className="lg:w-5/12 w-full">
           <div className="bg-navy-800 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer" onClick={() => {
              onNavigate?.('album-detalhe', 1);
           }}>
              {/* Card Header */}
              <div className="bg-gray-700/50 p-4 text-center border-b border-white/5">
                 <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest">Destaque da Semana</span>
              </div>
              
              {/* Featured Image */}
              <div className="aspect-video relative group cursor-pointer overflow-hidden">
                 <img 
                    src="/images/SENIORESVFNACES/1.jpg" 
                    alt="Destaque" 
                    loading="lazy"
                    width={600}
                    height={340}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* Card Body */}
              <div className="p-8 text-center bg-navy-800">
                 <h3 className="font-display font-bold text-3xl text-white uppercase mb-4">Vitória em Casa vs VF Naves</h3>
                 
                 <div className="flex items-center justify-center gap-6 text-gray-400 text-xs mb-8">
                    <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-red-500" />
                       <span>29 de Março, 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <ImageIcon size={14} className="text-yellow-400" />
                       <span>20 Fotos</span>
                    </div>
                 </div>
                 
                 <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate?.('album-detalhe', 1);
                    }}
                    className="w-full bg-white hover:bg-gray-100 text-navy-900 font-bold py-4 rounded uppercase text-xs tracking-widest transition-colors shadow-lg"
                 >
                    Abrir Álbum Completo
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};