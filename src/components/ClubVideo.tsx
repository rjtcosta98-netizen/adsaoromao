

import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize } from 'lucide-react';

const VIDEO_URL = 'https://res.cloudinary.com/db3y3teyv/video/upload/v1773052114/FDownloader.Net_AQOPj2aEXlpqSH_jId16wS05HmZTB1hr360SeKz2Tq8iEfTWq8rGqU3wMg1vA_GBLE4BuR8nmjD-GauoRZ9uI4vzOCnSO4WxR52zfyO7JooL1w_720p__HD_teiilb.mp4';

// Cloudinary gera thumbnail automaticamente trocando extensão para .jpg
const THUMBNAIL_URL = VIDEO_URL.replace('/video/upload/', '/video/upload/so_0,f_jpg,q_80/').replace('.mp4', '.jpg');

export const ClubVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="bg-navy-900 py-24 relative overflow-hidden">
      {/* Static gradient background instead of wasteful autoplay video */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-4">
            Documentário
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-12">
          Memória Viva
        </h2>

        <div className="max-w-4xl mx-auto relative group">
           {/* Video Player */}
           <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative">
              <video
                ref={videoRef}
                src={VIDEO_URL}
                poster={THUMBNAIL_URL}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                onEnded={() => setIsPlaying(false)}
                onClick={handlePlay}
              />
              
              {/* Play/Pause Overlay */}
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                onClick={handlePlay}
              >
                 <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
                    {isPlaying ? (
                      <Pause className="text-navy-900 w-8 h-8" fill="currentColor" />
                    ) : (
                      <Play className="text-navy-900 w-8 h-8 ml-1" fill="currentColor" />
                    )}
                 </div>
              </div>

              {/* Fullscreen Button */}
              {isPlaying && (
                <button
                  onClick={handleFullscreen}
                  className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg transition-all opacity-0 group-hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Maximize size={18} />
                </button>
              )}
           </div>
           
           <p className="mt-6 text-gray-400 text-sm max-w-2xl mx-auto">
             Testemunhos de antigos presidentes, jogadores e sócios que construíram a grandeza da AD São Romão. Uma viagem emocional pelas nossas raízes.
           </p>
        </div>
      </div>
    </div>
  );
};