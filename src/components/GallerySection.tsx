
import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';
import { GALLERY_ALBUMS } from '../constants';

interface GallerySectionProps {
  onNavigate: (page: string, id?: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigate }) => {
  const albums = GALLERY_ALBUMS.slice(0, 3);
  const totalPhotos = GALLERY_ALBUMS.reduce((sum, album) => sum + album.photos.length, 0);

  return (
    <div className="bg-navy-900 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-2 sm:mb-3">
            <Camera className="inline-block w-4 h-4 mr-2 -mt-0.5" />
            Momentos do Clube
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase">
            Galeria <span className="text-yellow-400">Fotográfica</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-yellow-400 mx-auto mt-3 sm:mt-4 rounded-full"></div>
          <p className="text-gray-400 mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-base">
            Revive os melhores momentos dos nossos jogos e eventos. {totalPhotos}+ fotografias que contam a nossa história.
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className={`group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1 h-56 sm:h-64 md:h-80' : 'h-56 sm:h-64 md:h-80'
              }`}
              onClick={() => onNavigate('album-detalhe', album.id)}
            >
              {/* Image */}
              <img
                src={album.coverImage}
                alt={album.title}
                loading="lazy"
                width={600}
                height={400}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>

              {/* Photo Count Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-yellow-400 text-navy-900 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Camera size={12} />
                {album.photos.length} Fotos
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6">
                <p className="text-yellow-400/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-2">
                  {album.date}
                </p>
                <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-white uppercase leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                  {album.title}
                </h3>
                <p className="text-gray-300/80 text-xs sm:text-sm mt-1">
                  {album.subtitle}
                </p>
                <div className="mt-3 sm:mt-4 w-10 sm:w-12 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-14">
          <button
            onClick={() => onNavigate('galeria')}
            className="group/btn inline-flex items-center gap-2 sm:gap-3 bg-yellow-400 hover:bg-yellow-300 text-navy-900 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full uppercase text-xs tracking-widest transition-all shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40"
          >
            Ver Galeria Completa
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
