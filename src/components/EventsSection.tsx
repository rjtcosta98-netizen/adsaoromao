

import React, { useState, useRef } from 'react';
import { Calendar, MapPin, TrophyIcon, MessageCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#fed700] rounded-lg flex items-center justify-center shadow">
            <TrophyIcon size={20} className="text-[#1f398a]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1f398a]">ADSR CUP</h2>
        </div>

        {/* Main Grid - Video + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Video Card */}
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/db3y3teyv/video/upload/v1773227913/ADSR_CUP_2025_S_bado_dia_21_Junho_1080P_1_1_eejxnp.mp4"
              muted={isMuted}
              loop
              playsInline
              poster="https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CUP%202026"
            />
            
            {/* Play Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-[#fed700] hover:bg-yellow-400 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all"
                >
                  <Play size={28} className="text-[#1f398a] ml-1" />
                </button>
              </div>
            )}

            {/* Controls */}
            <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between ${isPlaying ? 'opacity-0 hover:opacity-100' : ''} transition-opacity`}>
              <span className="bg-[#fed700] text-[#1f398a] px-2.5 py-1 rounded-full text-xs font-bold">ADSR CUP 2025</span>
              <div className="flex gap-2">
                <button onClick={toggleMute} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
                  {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
                </button>
                <button onClick={togglePlay} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
                  {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Info Card - ADSR CUP 2026 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#fed700] text-[#1f398a] px-3 py-1 rounded-full text-xs font-bold">IV EDIÇÃO</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">📅 2026</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-[#1f398a] mb-3">ADSR CUP 2026</h3>
            
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-[#fed700]" />
                <span className="text-gray-700 font-semibold">13/14 e 20/21 Junho</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#fed700]" />
                <span className="text-gray-700 font-semibold">Estádio N. S. Conceição</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {['SUB 8', 'SUB 10', 'SUB 12', 'SUB 14', 'SUB 16'].map((cat) => (
                <span key={cat} className="bg-[#1f398a]/10 text-[#1f398a] px-2.5 py-1 rounded text-xs font-bold">{cat}</span>
              ))}
            </div>

            <a
              href="https://wa.me/351925228934?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20ADSR%20CUP%202026."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-5 rounded-lg transition-all flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle size={18} />
              <span>Inscrever via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
