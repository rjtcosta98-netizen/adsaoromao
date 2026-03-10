'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { GALLERY_ALBUMS } from '../constants';

interface GalleryAlbumsProps {
  onNavigate?: (page: string, id?: number) => void;
}

export const GalleryAlbums: React.FC<GalleryAlbumsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-2 sm:mb-3">
            Explorar Memórias
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase">
            Álbuns <span className="text-yellow-400">Recentes</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-yellow-400 mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {GALLERY_ALBUMS.map((album) => (
            <div 
              key={album.id} 
              className="group relative h-48 sm:h-60 md:h-72 lg:h-80 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-md sm:shadow-lg md:shadow-xl cursor-pointer"
              onClick={() => {
                onNavigate?.('album-detalhe', album.id);
              }}
            >
              {/* Background Image */}
              <img 
                src={album.coverImage} 
                alt={album.title} 
                loading="lazy"
                width={400}
                height={300}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sm:group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

              {/* Badge */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-yellow-400 text-navy-900 text-[11px] sm:text-[12px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-lg">
                {album.photos.length} Fotos
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8">
                 <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white uppercase mb-1 sm:mb-2 leading-tight group-hover:text-yellow-400 transition-colors">
                   {album.title}
                 </h3>
                 <p className="text-gray-300 text-xs sm:text-sm">
                   {album.subtitle}
                 </p>
                 <div className="mt-2 sm:mt-3 md:mt-4 w-8 sm:w-10 md:w-12 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
           <button className="bg-transparent border border-white text-white hover:bg-white hover:text-navy-900 font-bold py-4 px-10 rounded-full uppercase text-xs tracking-widest transition-all flex items-center gap-2 mx-auto">
             Explorar Mais Momentos <Plus size={16} />
           </button>
        </div>

      </div>
    </div>
  );
};