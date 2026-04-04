

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface Video {
  url: string;
  title: string;
  subtitle: string;
  poster: string;
}

export const GalleryVideos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const videos: Video[] = [
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

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
           
           {/* Main Video (16:9) */}
           <div 
              onClick={() => openVideoModal(videos[0])}
              className="w-full lg:flex-[2] relative rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl border border-white/10 cursor-pointer min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
           >
              <video 
                 src={videos[0].url}
                 poster={videos[0].poster}
                 preload="metadata"
                 playsInline
                 className="absolute inset-0 w-full h-full object-cover"
              />
              <img 
                 src={videos[0].poster} 
                 alt={videos[0].title}
                 className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/50 transition-colors"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-navy-900/80 backdrop-blur border-2 md:border-3 border-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="text-yellow-400 fill-yellow-400 ml-1" size={32} />
                 </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none">
                 <span className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2 block">{videos[0].subtitle}</span>
                 <h3 className="font-display font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl text-white uppercase leading-tight">
                    {videos[0].title}
                 </h3>
              </div>
           </div>

           {/* Side Videos Column */}
           <div className="w-full lg:flex-[1] flex flex-col gap-6 md:gap-8">
              {/* Secondary Video (9:16) */}
              <div 
                 onClick={() => openVideoModal(videos[1])}
                 className="w-full relative rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl border border-white/10 cursor-pointer min-h-[250px] md:min-h-[250px] lg:min-h-[240px] max-w-[350px] mx-auto lg:mx-0 lg:max-w-none"
              >
                 <img 
                    src={videos[1].poster} 
                    alt={videos[1].title}
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/50 transition-colors"></div>
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-navy-900/80 backdrop-blur border-2 border-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                       <Play className="text-yellow-400 fill-yellow-400 ml-1" size={24} />
                    </div>
                 </div>

                 <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none">
                    <span className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 block">{videos[1].subtitle}</span>
                    <h3 className="font-display font-bold text-base md:text-lg lg:text-xl text-white uppercase leading-tight">
                       {videos[1].title}
                    </h3>
                 </div>
              </div>

              {/* Third Video */}
              <div 
                 onClick={() => openVideoModal(videos[2])}
                 className="w-full relative rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl border border-white/10 cursor-pointer min-h-[250px] md:min-h-[250px] lg:min-h-[240px] max-w-[350px] mx-auto lg:mx-0 lg:max-w-none"
              >
                 <img 
                    src={videos[2].poster} 
                    alt={videos[2].title}
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/50 transition-colors"></div>
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-navy-900/80 backdrop-blur border-2 border-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                       <Play className="text-yellow-400 fill-yellow-400 ml-1" size={24} />
                    </div>
                 </div>

                 <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none">
                    <span className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 block">{videos[2].subtitle}</span>
                    <h3 className="font-display font-bold text-base md:text-lg lg:text-xl text-white uppercase leading-tight">
                       {videos[2].title}
                    </h3>
                 </div>
              </div>
           </div>

        </div>

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