

import React, { useState } from 'react';
import { Play, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Video {
  url: string;
  title: string;
  subtitle: string;
  poster: string;
}

export const GalleryVideos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [showAll, setShowAll] = useState(false);

  const videos: Video[] = [
      {
      url: 'https://res.cloudinary.com/dytkvxus2/video/upload/v1778230435/Flash_Interview_wo8rmw.mp4',
      poster: 'https://res.cloudinary.com/dytkvxus2/image/upload/v1778230488/FLASH_INTERVIEW_xm4sip.png',
      title: 'Flash Interview: Gonçalo Tavares',
      subtitle: 'SUB-16'
    },
    {
      url: 'https://res.cloudinary.com/di8qh6rc0/video/upload/q_auto/f_auto/v1775386390/FDownloader.net-1655148628996808-_1080p_ncpbvm.mp4',
      poster: 'https://res.cloudinary.com/di8qh6rc0/image/upload/q_auto/f_auto/v1775386847/FLASH_INTERVIEW_p4vw82.png',
      title: 'Flash Interview: Mister Davide Oliveira',
      subtitle: 'SUB-14 Allianz 1ª Divisão'
    },
       {
      url: 'https://res.cloudinary.com/dzcwhljmz/video/upload/q_auto/f_auto/v1775296663/ADSR_Flash_Interview_qavcsw.mp4',
      poster: 'https://res.cloudinary.com/di8qh6rc0/image/upload/q_auto/f_auto/v1775298633/FLASH_INTERVIEW_r06owp.png',
      title: 'Flash Interview: Mister Rui Pedro após vitória nos oitavos da Taça',
      subtitle: 'Oitavos Taça'
    },
     {
      url: 'https://res.cloudinary.com/db3y3teyv/video/upload/v1774893509/WhatsApp_Video_2026-03-21_at_23.35.24_mtc54i.mp4',
      poster: 'https://res.cloudinary.com/db3y3teyv/video/upload/so_0,w_800,q_auto,f_jpg/v1774893509/WhatsApp_Video_2026-03-21_at_23.35.24_mtc54i.jpg',
      title: 'Apresentação Website Oficial AD São Romão',
      subtitle: 'Website Oficial'
    },
    {
      url: 'https://res.cloudinary.com/db3y3teyv/video/upload/v1773058821/FDownloader.Net_AQM8YjVeL3RA_YPdMnFh5PqadfRypS8d16sx3hWqnsIBAfEZXChrJNj_FOe4xiCenuF1vq3ZRYwNO6xsLwvFEZgjMuSKLdb2sleNVo-eLpwFaw_720p__HD_n7idaz.mp4',
      poster: 'https://res.cloudinary.com/db3y3teyv/video/upload/so_0,w_800,q_auto,f_jpg/v1773058821/FDownloader.Net_AQM8YjVeL3RA_YPdMnFh5PqadfRypS8d16sx3hWqnsIBAfEZXChrJNj_FOe4xiCenuF1vq3ZRYwNO6xsLwvFEZgjMuSKLdb2sleNVo-eLpwFaw_720p__HD_n7idaz.jpg',
      title: 'Patrocinadores AD São Romão 2025',
      subtitle: 'Patrocinadores'
    },
    {
      url: 'https://res.cloudinary.com/db3y3teyv/video/upload/v1773059307/ADSR_Presi_b5jzsg.mp4',
      poster: 'https://res.cloudinary.com/db3y3teyv/video/upload/so_0,w_800,q_auto,f_jpg/v1773059307/ADSR_Presi_b5jzsg.jpg',
      title: 'Pós-Jogo: Declarações do Presidente',
      subtitle: 'Entrevista'
    }
  ];

  const openVideoModal = (video: Video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-navy-900 py-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-3">
            Em Movimento
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">
            Vídeos & <span className="text-yellow-400">Reportagens</span>
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Top 3 Videos — uniform portrait 9:16 grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {videos.slice(0, 3).map((video, idx) => (
            <div
              key={idx}
              onClick={() => openVideoModal(video)}
              className="group relative aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer"
            >
              <img
                src={video.poster}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/50 transition-colors" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy-900/80 backdrop-blur border-2 border-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="text-yellow-400 fill-yellow-400 ml-0.5" size={20} />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none">
                <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                  {video.subtitle}
                </span>
                <h3 className="font-display font-bold text-sm sm:text-base md:text-lg text-white uppercase leading-tight group-hover:text-yellow-400 transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining Videos Grid */}
        {videos.length > 3 && (
          <>
            {showAll && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
                {videos.slice(3).map((video, idx) => (
                  <div
                    key={idx}
                    onClick={() => openVideoModal(video)}
                    className="relative rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl border border-white/10 cursor-pointer min-h-[220px] md:min-h-[260px]"
                  >
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/50 transition-colors"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-navy-900/80 backdrop-blur border-2 border-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="text-yellow-400 fill-yellow-400 ml-1" size={24} />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none">
                      <span className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 block">{video.subtitle}</span>
                      <h3 className="font-display font-bold text-base md:text-lg text-white uppercase leading-tight">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy-900 font-bold py-3 px-8 rounded-full uppercase text-xs tracking-widest transition-all duration-300"
              >
                {showAll ? 'Ver Menos' : `Ver Mais (${videos.length - 3})`}
                {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </>
        )}

        {/* Video Modal/Popup */}
        {isModalOpen && currentVideo && (
          <div 
            className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-2 md:p-4 animate-fade-in"
            onClick={closeModal}
          >
            {/* Botão Fechar - Topo */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full flex items-center justify-center transition-all shadow-lg"
              aria-label="Fechar vídeo"
            >
              <X className="text-white" size={20} />
            </button>

            {/* Informação do Vídeo - Topo */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 text-left px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg md:max-w-xs z-10">
              <span className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-1">{currentVideo.subtitle}</span>
              <h3 className="font-display font-bold text-xs md:text-sm lg:text-base text-white uppercase leading-tight">
                {currentVideo.title}
              </h3>
            </div>

            {/* Container do Vídeo */}
            <div className="relative w-full h-full max-w-7xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <video
                src={currentVideo.url}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                className="max-w-full max-h-[calc(100vh-80px)] md:max-h-[calc(100vh-100px)] w-auto h-auto rounded-none md:rounded-lg shadow-2xl"
              />
            </div>

            {/* Botão Fechar - Inferior (Mobile) */}
            <button
              onClick={closeModal}
              className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-3 px-8 rounded-full uppercase text-xs tracking-widest shadow-lg flex items-center gap-2"
            >
              <X size={16} />
              Fechar Vídeo
            </button>
          </div>
        )}

      </div>
    </div>
  );
};