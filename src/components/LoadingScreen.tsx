


import React, { useEffect, useState, useCallback } from 'react';
import { LOGO_URL } from '../constants';

// Fotos para o slideshow de fundo
const SLIDESHOW_PHOTOS = [
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20.jpeg',
  'https://ik.imagekit.io/elementgroup/ADSR/485290403_3241159786022635_7223684553602815447_n.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/Estadio%20ADSR?updatedAt=1772915710461',
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20Galery.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/649607114_1520282620098047_8821892702949244881_n.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20SUB%2010',
];

// Fotos para as faixas animadas
const STRIP_PHOTOS = [
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20.jpeg',
  'https://ik.imagekit.io/elementgroup/ADSR/485290403_3241159786022635_7223684553602815447_n.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/Estadio%20ADSR?updatedAt=1772915710461',
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20Galery.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/649607114_1520282620098047_8821892702949244881_n.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20SUB%2010',
  'https://ik.imagekit.io/elementgroup/ADSR/SEDE%20ADSR.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/Trofeus%20ADSR',
];

// Photo Strip component
function PhotoStrip({ photos, direction = 'left', speed = 35 }: { photos: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const doubled = [...photos, ...photos];

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-3 sm:gap-4 lg:gap-5 xl:gap-6"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[130px] h-[88px] sm:w-[170px] sm:h-[114px] md:w-[210px] md:h-[140px] lg:w-[240px] lg:h-[140px] xl:w-[280px] xl:h-[160px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/40" />
            <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-white/[0.08]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const LoadingScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Background slideshow rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDESHOW_PHOTOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 15;
  const parallaxY = (mousePos.y - 0.5) * 15;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden font-sans select-none"
      onMouseMove={handleMouseMove}
      style={{ background: '#020a18' }}
    >
      {/* ═══════ BACKGROUND SLIDESHOW (Ken Burns) ═══════ */}
      {SLIDESHOW_PHOTOS.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: currentSlide === i ? 1 : 0 }}
        >
          <div
            className="absolute inset-[-8%] bg-cover bg-center"
            style={{
              backgroundImage: `url("${src}")`,
              animation: currentSlide === i ? 'ken-burns 12s ease-in-out forwards' : 'none',
              transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`,
            }}
          />
        </div>
      ))}

      {/* ═══════ OVERLAYS ═══════ */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#020a18]/90 via-[#03173d]/80 to-[#020a18]/95" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#020a18]/40 via-transparent to-[#020a18]/40" />
      {/* Vignette */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, #020a18 100%)',
      }} />

      {/* ═══════ ANIMATED ORBS ═══════ */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
            animation: 'orb-drift 14s ease-in-out infinite',
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #facc15, transparent 70%)',
            animation: 'orb-drift 18s ease-in-out infinite reverse',
            transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
          }}
        />
      </div>

      {/* ═══════ GRID PATTERN ═══════ */}
      <div className="absolute inset-0 z-[2] opacity-[0.015] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="loading-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loading-grid)" />
        </svg>
      </div>

      {/* ═══════ FLOATING PARTICLES ═══════ */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {mounted && [...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
              background: i % 3 === 0 ? '#facc15' : i % 2 === 0 ? '#60a5fa' : '#ffffff',
              left: `${(i * 7.1 + 5) % 100}%`,
              top: `${(i * 13.7 + 8) % 100}%`,
              opacity: 0.1 + Math.random() * 0.3,
              animation: `particle-float ${6 + i * 0.8}s infinite ease-in-out`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* ═══════ TOP PHOTO STRIP ═══════ */}
      <div
        className="absolute top-[3%] sm:top-[7%] lg:top-[5%] left-0 right-0 z-[3] opacity-15 sm:opacity-35 lg:opacity-30 pointer-events-none hidden sm:block"
        style={{
          transform: `translateY(${parallaxY * -0.3}px) rotate(-2deg) scale(1.1)`,
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <PhotoStrip photos={STRIP_PHOTOS} direction="left" speed={40} />
      </div>

      {/* ═══════ BOTTOM PHOTO STRIP ═══════ */}
      <div
        className="absolute bottom-[3%] sm:bottom-[7%] lg:bottom-[5%] left-0 right-0 z-[3] opacity-15 sm:opacity-35 lg:opacity-30 pointer-events-none hidden sm:block"
        style={{
          transform: `translateY(${parallaxY * 0.3}px) rotate(2deg) scale(1.1)`,
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <PhotoStrip photos={STRIP_PHOTOS} direction="right" speed={45} />
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        
        {/* Logo Container with Glow */}
        <div className="mb-6 md:mb-10 relative animate-fade-in-down">
          <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
          <img 
            src={LOGO_URL} 
            alt="AD São Romão" 
            className="w-28 h-28 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Badge */}
        <div className="mb-4">
          <span className="text-white font-bold tracking-[0.3em] text-sm md:text-xl lg:text-2xl uppercase drop-shadow-lg">
            Associação Desportiva
          </span>
        </div>

        {/* Main Title */}
        <div className="mb-6 md:mb-8 overflow-hidden">
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-300 uppercase leading-none tracking-tighter drop-shadow-2xl animate-fade-in-up">
            SÃO ROMÃO
          </h1>
        </div>

        {/* Animated Divider */}
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <div className="w-8 h-1 bg-gradient-to-r from-transparent to-yellow-400 rounded-full animate-slide-left"></div>
          <span className="text-yellow-400 font-bold text-xs md:text-sm tracking-[0.25em] uppercase drop-shadow-lg">
            Loading
          </span>
          <div className="w-8 h-1 bg-gradient-to-l from-transparent to-yellow-400 rounded-full animate-slide-right"></div>
        </div>

        {/* Slogan */}
        <p className="font-display font-bold text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-300 uppercase tracking-[0.1em] drop-shadow-lg mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Juntos e Fortes
        </p>

        {/* Motivational Text */}
        <p className="text-blue-200 text-xs md:text-sm font-semibold tracking-wider opacity-80 animate-pulse">
          Preparando o melhor conteúdo para ti...
        </p>

        {/* Developer Credit */}
        <div className="mt-8 md:mt-12 flex items-center justify-center">
          <a
            href="https://elementgroup.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 sm:gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-yellow-400/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-400 backdrop-blur-sm"
          >
            <span className="text-blue-300/70 group-hover:text-yellow-400 transition-colors text-xs sm:text-sm font-mono font-bold">{'</>'}</span>
            <span className="text-white/50 group-hover:text-white/70 transition-colors text-[11px] sm:text-xs lg:text-sm font-medium tracking-wide">
              Desenvolvido por
            </span>
            <span className="font-bold text-white/80 group-hover:text-yellow-400 transition-colors text-[11px] sm:text-xs lg:text-sm tracking-wide">
              Elementgroup.pt
            </span>
          </a>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-blue-950/50 overflow-hidden z-20">
        <div className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-loading-progress w-full shadow-[0_0_20px_#FFD700]"></div>
      </div>
    </div>
  );
};
