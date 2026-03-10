


import React from 'react';
import { LOGO_URL } from '../constants';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-navy-900 via-blue-900 to-navy-950 overflow-hidden font-sans">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ 
          backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/ADSR%20.jpeg")' 
        }}
      ></div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-blue-900/70 to-navy-950/80 z-5 mix-blend-darken"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-5">
        {/* Animated gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen opacity-20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-400 rounded-full mix-blend-screen opacity-10 blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen opacity-15 blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-5 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + i}s infinite ease-in-out`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center">
        
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
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-blue-950/50 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-loading-progress w-full shadow-[0_0_20px_#FFD700]"></div>
      </div>
    </div>
  );
};
