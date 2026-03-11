

import React, { useState, useRef } from 'react';
import { Calendar, MapPin, TrophyIcon, Mail, MessageCircle, Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';

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

  const event2026 = {
    title: 'ADSR CUP 2026',
    dates_range: '13/14 e 20/21 Junho 2026',
    location: 'Estádio N. S. Conceição, São Romão',
    categories: ['SUB 8', 'SUB 10', 'SUB 12', 'SUB 14', 'SUB 16'],
  };

  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fed700]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#fed700]/10 border border-[#fed700]/30 rounded-full px-5 py-2 mb-4">
            <Sparkles size={16} className="text-[#fed700]" />
            <span className="text-[#fed700] text-sm font-bold uppercase tracking-wider">Eventos</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3">
            ADSR <span className="text-[#fed700]">CUP</span>
          </h2>
          <p className="text-blue-200/60 text-base md:text-lg max-w-2xl mx-auto">
            O maior torneio de futebol jovem da região. Competição, fair-play e paixão pelo futebol!
          </p>
        </div>

        {/* Main Video Card - ADSR CUP 2025 Highlight */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-10 md:mb-14 border border-white/10 group">
          {/* Video */}
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/db3y3teyv/video/upload/v1773227913/ADSR_CUP_2025_S_bado_dia_21_Junho_1080P_1_1_eejxnp.mp4"
              muted={isMuted}
              loop
              playsInline
              poster="https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CUP%202026"
            />
            
            {/* Overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 md:w-28 md:h-28 bg-[#fed700] hover:bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-[#fed700]/30 hover:scale-110 transition-all duration-300 group/btn"
                >
                  <Play size={36} className="text-[#1f398a] ml-1 md:ml-2 group-hover/btn:scale-110 transition-transform" />
                </button>
                <p className="mt-6 text-white/80 text-sm md:text-base font-medium">Revive os melhores momentos</p>
              </div>
            )}

            {/* Video Controls */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
              <div>
                <span className="bg-[#fed700] text-[#1f398a] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  ADSR CUP 2025
                </span>
                <h3 className="text-white font-bold text-lg md:text-2xl mt-2">Melhores Momentos</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                </button>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-0.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ADSR CUP 2026 Announcement */}
        <div className="relative">
          {/* Glowing Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#fed700]/20 via-yellow-500/20 to-[#fed700]/20 rounded-2xl md:rounded-3xl blur-xl animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-[#1f398a] via-[#162a6b] to-[#0f1f3a] rounded-2xl md:rounded-3xl overflow-hidden border border-[#fed700]/30 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fed700]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative p-6 sm:p-8 md:p-12">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="bg-[#fed700] text-[#1f398a] px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg">
                  <TrophyIcon size={16} />
                  <span>IV Edição</span>
                </div>
                <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-wider animate-pulse">
                  📅 Data Confirmada!
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                {event2026.title}
              </h3>
              
              <p className="text-blue-200/70 text-base md:text-lg mb-8 max-w-2xl">
                A IV edição do torneio que reúne jovens talentos, clubes e famílias num ambiente de competição saudável, paixão pelo futebol e fair-play.
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                {/* Dates */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#fed700] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Calendar size={24} className="text-[#1f398a]" />
                  </div>
                  <div>
                    <p className="text-blue-300/60 text-xs font-bold uppercase tracking-wider mb-0.5">Datas</p>
                    <p className="text-white font-black text-lg md:text-xl">{event2026.dates_range}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#fed700] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin size={24} className="text-[#1f398a]" />
                  </div>
                  <div>
                    <p className="text-blue-300/60 text-xs font-bold uppercase tracking-wider mb-0.5">Local</p>
                    <p className="text-white font-black text-base md:text-lg">{event2026.location}</p>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <p className="text-blue-300/60 text-xs font-bold uppercase tracking-wider mb-3">Categorias em Competição</p>
                <div className="flex flex-wrap gap-2">
                  {event2026.categories.map((cat) => (
                    <span key={cat} className="bg-[#fed700]/10 border border-[#fed700]/30 text-[#fed700] px-4 py-2 rounded-lg font-bold text-sm">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href="https://wa.me/351925228934?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20ADSR%20CUP%202026."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-400 text-white font-black py-3.5 md:py-4 px-6 md:px-8 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1 active:scale-95 text-base shadow-lg flex items-center justify-center gap-2.5"
                >
                  <MessageCircle size={20} />
                  <span>Inscrever via WhatsApp</span>
                </a>
                <a
                  href="mailto:geral@adsaoromao.pt?subject=Inscrição ADSR CUP 2026"
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-3.5 md:py-4 px-6 md:px-8 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 text-base flex items-center justify-center gap-2.5 backdrop-blur-sm"
                >
                  <Mail size={20} />
                  <span>Contactar por Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="text-blue-200/50 text-sm mb-4">Não percas a oportunidade de participar!</p>
          <a 
            href="#contactos" 
            className="inline-flex items-center gap-2 text-[#fed700] font-bold hover:gap-4 transition-all duration-300 group"
          >
            <span>Mais informações</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
