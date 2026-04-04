
import React, { useState } from 'react';
import { Camera, Play, X, ArrowRight } from 'lucide-react';
import { GALLERY_ALBUMS } from '../constants';

interface LatestMediaProps {
  onNavigate: (page: string, id?: number) => void;
}

export const LatestMedia: React.FC<LatestMediaProps> = ({ onNavigate }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const latestAlbum = GALLERY_ALBUMS[0];
  const latestVideo = {
    url: 'https://res.cloudinary.com/dzcwhljmz/video/upload/q_auto/f_auto/v1775296663/ADSR_Flash_Interview_qavcsw.mp4',
    poster: 'https://res.cloudinary.com/dzcwhljmz/image/upload/q_auto/f_auto/v1775296827/Screenshot_2026-04-04_at_11.00.03_ezyjxr.png',
    title: 'Flash Interview: Mister Rui Pedro após vitória nos oitavos da Taça',
    subtitle: 'Oitavos Taça',
  };

  const openVideo = () => {
    setIsVideoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="bg-[#f5f5f5] py-10 sm:py-14 md:py-20">
      <div className="container mx-auto px-3 sm:px-4">

        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <span className="text-[#1f398a] font-bold tracking-[0.2em] text-xs uppercase block mb-2 sm:mb-3">
            Última Hora
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1f398a] uppercase">
            Galeria & <span className="text-yellow-500">Vídeo</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-yellow-400 mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">

          {/* Latest Photo Album */}
          <div
            className="group relative h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden border border-black/5 shadow-xl cursor-pointer"
            onClick={() => onNavigate('album-detalhe', latestAlbum.id)}
          >
            <img
              src={latestAlbum.coverImage}
              alt={latestAlbum.title}
              loading="lazy"
              width={600}
              height={400}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f398a] via-[#1f398a]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

            {/* Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
              <span className="bg-yellow-400 text-[#1f398a] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Camera size={13} /> {latestAlbum.photos.length} Fotos
              </span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 md:p-8">
              <span className="text-yellow-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2 block">
                {latestAlbum.subtitle}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white uppercase mb-1 sm:mb-2 leading-tight group-hover:text-yellow-400 transition-colors">
                {latestAlbum.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">{latestAlbum.date}</p>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Ver Álbum <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Latest Video */}
          <div
            className="group relative h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden border border-black/5 shadow-xl cursor-pointer"
            onClick={openVideo}
          >
            <img
              src={latestVideo.poster}
              alt={latestVideo.title}
              loading="lazy"
              width={600}
              height={400}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f398a] via-[#1f398a]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#1f398a]/80 backdrop-blur border-2 border-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="text-yellow-400 fill-yellow-400 ml-1" size={28} />
              </div>
            </div>

            {/* Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className="bg-yellow-400 text-[#1f398a] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Play size={13} /> Vídeo
              </span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 md:p-8">
              <span className="text-yellow-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2 block">
                {latestVideo.subtitle}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white uppercase leading-tight group-hover:text-yellow-400 transition-colors">
                {latestVideo.title}
              </h3>
            </div>
          </div>

        </div>

        {/* Botão ver mais */}
        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => onNavigate('galeria')}
            className="bg-[#1f398a] hover:bg-[#162a6b] text-white font-bold py-3 px-8 rounded-full uppercase text-xs tracking-widest transition-all inline-flex items-center gap-2 shadow-lg"
          >
            Ver Toda a Galeria <ArrowRight size={16} />
          </button>
        </div>

      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-2 md:p-4 animate-fade-in"
          onClick={closeVideo}
        >
          <button
            onClick={closeVideo}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all shadow-lg"
            aria-label="Fechar vídeo"
          >
            <X className="text-white" size={20} />
          </button>

          <div className="absolute top-2 left-2 md:top-4 md:left-4 text-left px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg md:max-w-xs z-10">
            <span className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-1">{latestVideo.subtitle}</span>
            <h3 className="font-display font-bold text-xs md:text-sm lg:text-base text-white uppercase leading-tight">
              {latestVideo.title}
            </h3>
          </div>

          <div className="relative w-full h-full max-w-7xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <video
              src={latestVideo.url}
              controls
              autoPlay
              playsInline
              controlsList="nodownload"
              className="max-w-full max-h-[calc(100vh-80px)] md:max-h-[calc(100vh-100px)] w-auto h-auto rounded-none md:rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
