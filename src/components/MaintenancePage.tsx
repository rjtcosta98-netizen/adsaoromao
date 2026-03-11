

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { LOGO_URL } from '../constants';
import { Facebook, Instagram, Youtube, Mail, Trophy, Clock, Star, Shield, Rocket, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface MaintenancePageProps {
  onLaunch?: () => void;
}

// ══════════════════════════════════════════════════════════════
//  CONFIGURAÇÃO — Altera aqui as fotos e a data de lançamento
// ══════════════════════════════════════════════════════════════

const LAUNCH_DATE = new Date('2026-03-14T21:00:00');

// Fotos para o slideshow de fundo (substitui pelos URLs reais)
const SLIDESHOW_PHOTOS = [
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20.jpeg',
  'https://ik.imagekit.io/elementgroup/ADSR/485290403_3241159786022635_7223684553602815447_n.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/Estadio%20ADSR?updatedAt=1772915710461',
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20Galery.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/649607114_1520282620098047_8821892702949244881_n.jpg',
  'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20SUB%2010',
];

// Fotos para as faixas animadas (substitui pelos URLs reais)
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

// Som de fundo para os últimos 40 segundos do countdown (para aos 3 segundos)
const COUNTDOWN_SOUND_URL = 'https://res.cloudinary.com/db3y3teyv/video/upload/v1773235259/WhatsApp_Video_2026-03-11_at_13_mp3cut.net_borkjt.mp3';

// Som do GOLO - começa aos 3 segundos do countdown
const GOLO_SOUND_URL = 'https://res.cloudinary.com/db3y3teyv/video/upload/v1773236410/relato-emocionante-nuno-matos-golo-do-trubin-na-vito%CC%81ria-do-benfica-frente-ao-real-madrid-por-4-a-2_qh4dbm.mp3';

// Som final - começa quando o som do GOLO acaba, continua 5s após site abrir
const FINAL_SOUND_URL = 'https://res.cloudinary.com/db3y3teyv/video/upload/v1773236870/Mu%CC%81sica_de_fundo_para_vi%CC%81deo_de_futebol_soccer_background_music_Sem_direitos_autorais._adz3az.mp3';

// Referência global para o áudio final (persiste após unmount do componente)
let globalFinalAudio: HTMLAudioElement | null = null;
let globalFinalAudioStarted = false;

// Função para fade out do áudio global
const fadeOutGlobalAudio = (duration: number = 2000) => {
  if (!globalFinalAudio) return;
  
  const startVolume = globalFinalAudio.volume;
  const steps = 40;
  const stepTime = duration / steps;
  const volumeStep = startVolume / steps;
  
  const fadeInterval = setInterval(() => {
    if (globalFinalAudio && globalFinalAudio.volume > volumeStep) {
      globalFinalAudio.volume -= volumeStep;
    } else {
      if (globalFinalAudio) {
        globalFinalAudio.volume = 0;
        globalFinalAudio.pause();
        globalFinalAudio = null;
      }
      globalFinalAudioStarted = false;
      clearInterval(fadeInterval);
    }
  }, stepTime);
};

// ══════════════════════════════════════════════════════════════

function getTimeRemaining() {
  const now = new Date().getTime();
  const distance = LAUNCH_DATE.getTime() - now;
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    total: distance,
  };
}

// ── Countdown Digit with flip animation ──
function CountdownDigit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0');
  const prevRef = useRef(str);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (str !== prevRef.current) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 400);
      prevRef.current = str;
      return () => clearTimeout(t);
    }
  }, [str]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        {/* Glow on hover */}
        <div className="absolute -inset-1 sm:-inset-2 lg:-inset-3 rounded-lg sm:rounded-2xl bg-yellow-400/0 group-hover:bg-yellow-400/15 blur-xl transition-all duration-500" />
        <div className={`
          relative w-[52px] h-[62px] sm:w-[76px] sm:h-[88px] md:w-[90px] md:h-[104px] lg:w-[80px] lg:h-[92px] xl:w-[88px] xl:h-[100px]
          rounded-lg sm:rounded-2xl
          bg-gradient-to-b from-white/[0.12] to-white/[0.03]
          backdrop-blur-xl border border-white/10
          flex items-center justify-center
          shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
          overflow-hidden
          transition-transform duration-300
          ${flip ? 'scale-95' : 'scale-100'}
        `}>
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-lg sm:rounded-t-2xl" />
          {/* Digit */}
          <span className={`
            relative font-display font-black
            text-2xl sm:text-4xl md:text-5xl lg:text-[2.5rem] xl:text-[2.75rem]
            text-white tabular-nums tracking-tight
            transition-all duration-300
            ${flip ? 'text-yellow-400 scale-110' : ''}
          `}>
            {str}
          </span>
          {/* Center divider line */}
          <div className="absolute left-1.5 right-1.5 sm:left-2 sm:right-2 top-1/2 h-px bg-white/[0.06]" />
        </div>
      </div>
      <span className="mt-1.5 sm:mt-3 lg:mt-2 text-[8px] sm:text-[11px] md:text-xs lg:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-300/50">
        {label}
      </span>
    </div>
  );
}

// ── Photo Strip (infinite marquee scroll) ──
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

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ onLaunch }) => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getTimeRemaining);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [showReveal, setShowReveal] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0);
  const hasTriggeredRef = useRef(false);
  
  // Audio state
  const [isMuted, setIsMuted] = useState(false); // Começa com som ativo
  const [audioReady, setAudioReady] = useState(false);
  const countdownAudioRef = useRef<HTMLAudioElement | null>(null); // Som 1: Countdown (40s -> 3s)
  const goloAudioRef = useRef<HTMLAudioElement | null>(null); // Som 2: GOLO (3s -> fim do áudio)
  // Som 3 (final) usa a referência global para persistir após unmount
  const countdownAudioStartedRef = useRef(false);
  const goloAudioStartedRef = useRef(false);
  
  // Calcular segundos restantes
  const totalSeconds = Math.floor(time.total / 1000);
  const isUnder40Sec = totalSeconds <= 40 && totalSeconds > 0;
  const isUnder3Sec = totalSeconds <= 3 && totalSeconds > 0;

  useEffect(() => {
    setMounted(true);
    const ticker = setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => clearInterval(ticker);
  }, []);

  // Trigger reveal animation when countdown ends
  useEffect(() => {
    if (time.total === 0 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      
      setShowReveal(true);
      
      // ANIMAÇÃO ÉPICA DE FUTEBOL
      // Phase 1: Remate + Bola voa + GOLO! (0-4s)
      setTimeout(() => setRevealPhase(1), 100);
      
      // Phase 2: Logo do clube aparece com glória (4-7s)
      setTimeout(() => setRevealPhase(2), 4000);
      
      // Phase 3: Nome do clube revela (7-10s)
      setTimeout(() => setRevealPhase(3), 7000);
      
      // Phase 4: Mensagem de boas-vindas (10-12s)
      setTimeout(() => setRevealPhase(4), 10000);
      
      // Phase 5: Cortinas abrem (12-14s)
      setTimeout(() => setRevealPhase(5), 12000);
      
      // Phase 6: Fade out e launch (14s+)
      setTimeout(() => {
        setRevealPhase(6);
        if (onLaunch) {
          setTimeout(() => onLaunch(), 1000);
        }
      }, 14000);
    }
  }, [time.total, onLaunch]);

  // Background slideshow rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDESHOW_PHOTOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Função helper para fade out suave
  const fadeOutAudio = useCallback((audio: HTMLAudioElement, duration: number = 800) => {
    return new Promise<void>((resolve) => {
      const startVolume = audio.volume;
      const steps = 20;
      const stepTime = duration / steps;
      const volumeStep = startVolume / steps;
      
      const fadeInterval = setInterval(() => {
        if (audio.volume > volumeStep) {
          audio.volume -= volumeStep;
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeInterval);
          resolve();
        }
      }, stepTime);
    });
  }, []);

  // Função helper para fade in suave
  const fadeInAudio = useCallback((audio: HTMLAudioElement, targetVolume: number, duration: number = 800) => {
    audio.volume = 0;
    audio.play().catch(() => {});
    
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    
    const fadeInterval = setInterval(() => {
      if (audio.volume < targetVolume - volumeStep) {
        audio.volume += volumeStep;
      } else {
        audio.volume = targetVolume;
        clearInterval(fadeInterval);
      }
    }, stepTime);
  }, []);

  // ÁUDIO 1: Som do Countdown (40s -> 3s)
  useEffect(() => {
    // Só toca entre 40s e 3s
    const shouldPlayCountdown = isUnder40Sec && !isUnder3Sec;
    
    if (shouldPlayCountdown) {
      if (!countdownAudioRef.current) {
        countdownAudioRef.current = new Audio(COUNTDOWN_SOUND_URL);
        countdownAudioRef.current.volume = 0;
        countdownAudioRef.current.loop = true;
        
        countdownAudioRef.current.addEventListener('canplaythrough', () => {
          setAudioReady(true);
        });
      }
      
      if (!countdownAudioStartedRef.current && !isMuted) {
        // Fade in suave ao começar
        fadeInAudio(countdownAudioRef.current, 0.4, 1000);
        countdownAudioStartedRef.current = true;
      }
    }
    
    // Fade out quando chegar aos 3 segundos (transição para GOLO)
    if (isUnder3Sec && countdownAudioRef.current && countdownAudioStartedRef.current) {
      fadeOutAudio(countdownAudioRef.current, 500);
      countdownAudioStartedRef.current = false;
    }
    
    return () => {
      if (!isUnder40Sec && countdownAudioRef.current) {
        countdownAudioRef.current.pause();
        countdownAudioRef.current.volume = 0;
        countdownAudioStartedRef.current = false;
      }
    };
  }, [isUnder40Sec, isUnder3Sec, isMuted, fadeOutAudio, fadeInAudio]);

  // ÁUDIO 2: Som do GOLO (começa aos 3 segundos com fade in)
  useEffect(() => {
    if (isUnder3Sec && !goloAudioStartedRef.current && !isMuted) {
      // Criar e preparar o áudio do GOLO
      if (!goloAudioRef.current) {
        goloAudioRef.current = new Audio(GOLO_SOUND_URL);
        goloAudioRef.current.volume = 0;
        
        // Quando o áudio do GOLO acabar, fazer transição suave para o final
        goloAudioRef.current.addEventListener('ended', () => {
          if (!globalFinalAudioStarted && globalFinalAudio && !isMuted) {
            // Fade in do áudio final (global)
            globalFinalAudio.volume = 0;
            globalFinalAudio.play().catch(() => {});
            
            const steps = 20;
            const stepTime = 1000 / steps;
            const volumeStep = 0.5 / steps;
            const fadeIn = setInterval(() => {
              if (globalFinalAudio && globalFinalAudio.volume < 0.5 - volumeStep) {
                globalFinalAudio.volume += volumeStep;
              } else {
                if (globalFinalAudio) globalFinalAudio.volume = 0.5;
                clearInterval(fadeIn);
              }
            }, stepTime);
            
            globalFinalAudioStarted = true;
          }
        });
      }
      
      // Preparar o áudio final (global - persiste após unmount)
      if (!globalFinalAudio) {
        globalFinalAudio = new Audio(FINAL_SOUND_URL);
        globalFinalAudio.volume = 0;
        globalFinalAudio.loop = true;
      }
      
      // Pequena pausa para o countdown fazer fade out, depois fade in do GOLO
      setTimeout(() => {
        if (goloAudioRef.current && !isMuted) {
          fadeInAudio(goloAudioRef.current, 0.7, 600);
        }
      }, 300);
      
      goloAudioStartedRef.current = true;
    }
  }, [isUnder3Sec, isMuted, fadeInAudio]);

  // ÁUDIO 3: Parar o som final 5 segundos após o site abrir (com fade out longo)
  // Nota: O timeout é agendado globalmente para persistir após unmount do componente
  useEffect(() => {
    if (revealPhase === 6 && globalFinalAudioStarted) {
      // Agendar fade out 5 segundos após o launch (1s do phase 6 + 5s na homepage)
      // Total: 6 segundos após phase 6 começar
      setTimeout(() => {
        fadeOutGlobalAudio(2500); // Fade out suave de 2.5 segundos
      }, 6000);
    }
  }, [revealPhase]);

  // Handle mute/unmute com transições suaves
  useEffect(() => {
    const allAudios = [
      { ref: countdownAudioRef.current, targetVol: 0.4 },
      { ref: goloAudioRef.current, targetVol: 0.7 }
    ];
    
    if (isMuted) {
      // Fade out rápido de todos os áudios ativos (incluindo global)
      allAudios.forEach(({ ref }) => {
        if (ref && ref.volume > 0) {
          const fadeInterval = setInterval(() => {
            if (ref.volume > 0.05) {
              ref.volume -= 0.05;
            } else {
              ref.volume = 0;
              ref.pause();
              clearInterval(fadeInterval);
            }
          }, 30);
        }
      });
      
      // Também mutar o áudio global
      if (globalFinalAudio && globalFinalAudio.volume > 0) {
        const fadeInterval = setInterval(() => {
          if (globalFinalAudio && globalFinalAudio.volume > 0.05) {
            globalFinalAudio.volume -= 0.05;
          } else {
            if (globalFinalAudio) {
              globalFinalAudio.volume = 0;
              globalFinalAudio.pause();
            }
            clearInterval(fadeInterval);
          }
        }, 30);
      }
    } else {
      // Fade in do áudio correto baseado no estado atual
      if (isUnder40Sec && !isUnder3Sec && countdownAudioRef.current && countdownAudioStartedRef.current) {
        fadeInAudio(countdownAudioRef.current, 0.4, 500);
      }
      if (goloAudioStartedRef.current && goloAudioRef.current && !goloAudioRef.current.ended) {
        fadeInAudio(goloAudioRef.current, 0.7, 500);
      }
      // Retomar áudio global se estava a tocar
      if (globalFinalAudioStarted && globalFinalAudio) {
        globalFinalAudio.play().catch(() => {});
        const steps = 10;
        const stepTime = 500 / steps;
        const volumeStep = 0.5 / steps;
        const fadeIn = setInterval(() => {
          if (globalFinalAudio && globalFinalAudio.volume < 0.5 - volumeStep) {
            globalFinalAudio.volume += volumeStep;
          } else {
            if (globalFinalAudio) globalFinalAudio.volume = 0.5;
            clearInterval(fadeIn);
          }
        }, stepTime);
      }
    }
  }, [isMuted, isUnder40Sec, isUnder3Sec, fadeInAudio]);

  // Cleanup audio on unmount (NÃO limpar o globalFinalAudio - ele deve persistir)
  useEffect(() => {
    return () => {
      [countdownAudioRef, goloAudioRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
      // globalFinalAudio NÃO é limpo - persiste na homepage com fade out automático
    };
  }, []);

  // Toggle sound
  const toggleSound = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  const isLaunched = time.total === 0;
  const parallaxX = (mousePos.x - 0.5) * 15;
  const parallaxY = (mousePos.y - 0.5) * 15;

  const countdownItems = [
    { label: 'Dias', value: time.days },
    { label: 'Horas', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Seg', value: time.seconds },
  ];

  const launchDateFormatted = LAUNCH_DATE.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center overflow-hidden font-sans select-none"
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

      {/* ═══════ SOUND TOGGLE (when ≤ 40 seconds or during reveal) ═══════ */}
      {(isUnder40Sec || showReveal) && (
        <button
          onClick={toggleSound}
          className={`
            fixed bottom-6 right-6 z-[150] 
            w-14 h-14 rounded-full
            flex items-center justify-center
            backdrop-blur-xl border
            transition-all duration-300 ease-out
            group
            ${isMuted 
              ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
              : 'bg-yellow-400/20 border-yellow-400/30 hover:bg-yellow-400/30'
            }
          `}
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white/60 group-hover:text-white/80 transition-colors" />
          ) : (
            <>
              <Volume2 className="w-6 h-6 text-yellow-400 transition-colors" />
              {/* Sound wave animation */}
              <span className="absolute inset-0 rounded-full border-2 border-yellow-400/40 animate-ping" />
            </>
          )}
          
          {/* Tooltip */}
          <span className="
            absolute right-full mr-3 px-3 py-1.5 
            bg-black/80 backdrop-blur-sm rounded-lg
            text-xs text-white whitespace-nowrap
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            pointer-events-none
          ">
            {isMuted ? 'Ativar som final' : 'Silenciar'}
          </span>
        </button>
      )}

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
            <pattern id="maint-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#maint-grid)" />
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
        className="absolute top-[3%] sm:top-[7%] lg:top-[1%] left-0 right-0 z-[3] opacity-15 sm:opacity-35 lg:opacity-30 pointer-events-none hidden sm:block"
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
        className="absolute bottom-[3%] sm:bottom-[7%] lg:bottom-[1%] left-0 right-0 z-[3] opacity-10 sm:opacity-30 lg:opacity-25 pointer-events-none hidden sm:block"
        style={{
          transform: `translateY(${parallaxY * 0.3}px) rotate(1.5deg) scale(1.1)`,
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <PhotoStrip photos={[...STRIP_PHOTOS].reverse()} direction="right" speed={45} />
      </div>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="relative z-[10] flex flex-col items-center justify-center text-center px-4 sm:px-5 max-w-4xl xl:max-w-5xl mx-auto w-full min-h-full py-4 sm:py-8 lg:py-5">

        {/* ── Logo ── */}
        <div
          className="mb-2 sm:mb-4 md:mb-5 lg:mb-2 relative"
          style={{ animation: mounted ? 'entrance-drop 1s cubic-bezier(0.16,1,0.3,1) 0.1s both' : 'none' }}
        >
          <div className="absolute inset-0 bg-yellow-400/25 blur-[40px] sm:blur-[50px] rounded-full animate-pulse scale-[2]" />
          <div className="absolute inset-0 bg-blue-500/15 blur-[30px] sm:blur-[35px] rounded-full animate-pulse scale-[1.3]" style={{ animationDelay: '1s' }} />
          <img
            src={LOGO_URL}
            alt="AD São Romão"
            className="w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 lg:w-20 lg:h-20 xl:w-22 xl:h-22 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(250,204,21,0.3)] sm:drop-shadow-[0_0_50px_rgba(250,204,21,0.35)]"
          />
        </div>

        {/* ── Overline ── */}
        <div style={{ animation: mounted ? 'entrance-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' : 'none' }}>
          <div className="inline-flex items-center gap-1.5 sm:gap-2.5 mb-1 sm:mb-2 lg:mb-1">
            <div className="w-4 sm:w-8 lg:w-14 h-px bg-gradient-to-r from-transparent to-yellow-400/60" />
            <span className="text-yellow-400/80 font-bold tracking-[0.18em] sm:tracking-[0.3em] lg:tracking-[0.35em] text-[9px] sm:text-[11px] md:text-xs lg:text-sm uppercase">
              Associação Desportiva
            </span>
            <div className="w-4 sm:w-8 lg:w-14 h-px bg-gradient-to-l from-transparent to-yellow-400/60" />
          </div>
        </div>

        {/* ── Club Name ── */}
        <div
          className="mb-1.5 sm:mb-3 lg:mb-1"
          style={{ animation: mounted ? 'entrance-up 1s cubic-bezier(0.16,1,0.3,1) 0.3s both' : 'none' }}
        >
          <h1 className="font-display font-black text-[2.2rem] leading-none sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white uppercase tracking-tighter">
            SÃO ROMÃO
          </h1>
        </div>

        {/* ── Hero Phrase ── */}
        <div
          className="mb-3 sm:mb-5 md:mb-7 lg:mb-2 max-w-2xl lg:max-w-3xl"
          style={{ animation: mounted ? 'entrance-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both' : 'none' }}
        >
          {isLaunched ? (
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <Shield size={28} className="text-yellow-400 animate-bounce sm:w-9 sm:h-9" />
              <h2 className="font-display font-black text-xl sm:text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide">
                A Conquista Chegou!
              </h2>
            </div>
          ) : (
            <>
              <h2 className="font-display font-bold text-[17px] leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] text-white uppercase tracking-wide">
                Está quase na hora de
                <br />
                <span className="relative inline-block mt-0.5 sm:mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 font-black">
                    mais uma conquista!
                  </span>
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[2px] sm:h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
                    style={{ animation: 'underline-glow 3s ease-in-out infinite' }}
                  />
                </span>
              </h2>
              <p className="text-blue-200/50 text-[11px] sm:text-sm md:text-base lg:text-base mt-2 sm:mt-3 lg:mt-2 leading-relaxed px-2 sm:px-0">
                Algo grandioso está a ser preparado para a família
                <span className="text-white/70 font-semibold"> ADSR</span>.
              </p>
            </>
          )}
        </div>

        {/* ── Countdown ── */}
        {!isLaunched && (
          <div
            className="mb-3 sm:mb-5 md:mb-7 lg:mb-2"
            style={{ animation: mounted ? 'entrance-up 1s cubic-bezier(0.16,1,0.3,1) 0.6s both' : 'none' }}
          >
            {/* Date label */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-2 sm:mb-4 lg:mb-2">
              <Clock size={10} className="text-blue-400/50 sm:w-3 sm:h-3" />
              <span className="text-blue-300/40 text-[9px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                Data prevista
              </span>
            </div>

            {/* Date badge */}
            <div className="mb-3 sm:mb-5 lg:mb-3">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-400/[0.06] border border-yellow-400/15 rounded-full px-3 sm:px-5 py-1 sm:py-2">
                <Star size={8} className="text-yellow-400 animate-pulse flex-shrink-0 sm:w-2.5 sm:h-2.5" />
                <span className="text-yellow-400 font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                  {launchDateFormatted}
                </span>
                <Star size={8} className="text-yellow-400 animate-pulse flex-shrink-0 sm:w-2.5 sm:h-2.5" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Countdown blocks */}
            <div className="flex items-start justify-center gap-1 sm:gap-2.5 md:gap-4 lg:gap-5 xl:gap-6">
              {countdownItems.map((item, idx) => (
                <React.Fragment key={item.label}>
                  {idx > 0 && (
                    <div className="flex flex-col gap-1 sm:gap-2 lg:gap-2.5 mt-4 sm:mt-7 md:mt-8 lg:mt-8 xl:mt-9">
                      <div className="w-0.5 h-0.5 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-400/30 animate-pulse" />
                      <div className="w-0.5 h-0.5 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-400/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                  <CountdownDigit value={item.value} label={item.label} />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* ── Club Quote ── */}
        <div
          className="mb-2 sm:mb-4 md:mb-5 lg:mb-2"
          style={{ animation: mounted ? 'entrance-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s both' : 'none' }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
            <div className="w-4 sm:w-8 lg:w-10 h-px bg-gradient-to-r from-transparent to-yellow-400/30" />
            <Trophy size={12} className="text-yellow-400/60 sm:w-3.5 sm:h-3.5" />
            <div className="w-4 sm:w-8 lg:w-10 h-px bg-gradient-to-l from-transparent to-yellow-400/30" />
          </div>
          <p className="text-white/70 font-display font-bold text-[13px] sm:text-lg md:text-xl lg:text-lg italic tracking-wide">
            &ldquo;Juntos e Fortes&rdquo;
          </p>
          <p className="text-blue-400/30 text-[8px] sm:text-[10px] md:text-xs lg:text-xs mt-0.5 sm:mt-1 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Desde 1962 &bull; São Romão
          </p>
        </div>

        {/* ── Social Links ── */}
        <div style={{ animation: mounted ? 'entrance-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.85s both' : 'none' }}>
          <p className="text-blue-300/30 text-[9px] sm:text-[11px] lg:text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-1.5 sm:mb-2.5 lg:mb-1.5">
            Acompanha-nos
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 lg:gap-3">
            {[
              { href: 'https://facebook.com/adsaoromao', icon: Facebook, hover: 'hover:bg-blue-600/20 hover:border-blue-500/30' },
              { href: 'https://instagram.com/adsaoromao', icon: Instagram, hover: 'hover:bg-pink-600/20 hover:border-pink-500/30' },
              { href: 'https://www.youtube.com/@ADS%C3%83OROM%C3%83O', icon: Youtube, hover: 'hover:bg-red-600/20 hover:border-red-500/30' },
              { href: 'mailto:adsr.romao@gmail.com', icon: Mail, hover: 'hover:bg-yellow-600/20 hover:border-yellow-500/30' },
            ].map(({ href, icon: Icon, hover }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`w-9 h-9 sm:w-11 sm:h-11 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center ${hover} transition-all duration-300 group min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]`}
              >
                <Icon size={14} className="text-blue-300/60 group-hover:text-white transition-colors sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-1.5 sm:mt-3 md:mt-4 lg:mt-2"
          style={{ animation: mounted ? 'entrance-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.95s both' : 'none' }}
        >
          <p className="text-blue-400/20 text-[9px] sm:text-[11px] lg:text-[10px]">
            &copy; {new Date().getFullYear()} AD São Romão &mdash; Todos os direitos reservados.
          </p>
          <div className="mt-1.5 sm:mt-3 flex items-center justify-center">
            <a
              href="https://elementgroup.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-yellow-400/30 rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 transition-all duration-400 backdrop-blur-sm"
            >
              <span className="text-blue-300/70 group-hover:text-yellow-400 transition-colors text-[10px] sm:text-sm font-mono font-bold">{'</>'}</span>
              <span className="text-white/50 group-hover:text-white/70 transition-colors text-[10px] sm:text-xs lg:text-sm font-medium tracking-wide">
                Desenvolvido por
              </span>
              <span className="font-bold text-white/80 group-hover:text-yellow-400 transition-colors text-[10px] sm:text-xs lg:text-sm tracking-wide">
                Elementgroup.pt
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ═══════ SLIDESHOW INDICATORS ═══════ */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-[11] flex items-center gap-1.5">
        {SLIDESHOW_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-500 ${
              currentSlide === i
                ? 'w-5 sm:w-7 h-1.5 bg-yellow-400'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>

      {/* ═══════ ACCENT BARS ═══════ */}
      <div className="absolute top-0 left-0 w-full h-px z-[11] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 z-[11] overflow-hidden">
        <div
          className="h-full w-[200%] bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600"
          style={{ backgroundSize: '50% 100%', animation: 'bar-shimmer 4s linear infinite' }}
        />
      </div>

      {/* ═══════ EPIC FOOTBALL REVEAL ANIMATION ═══════ */}
      {showReveal && (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden transition-opacity duration-[1500ms] ${revealPhase >= 6 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Background base - Stadium atmosphere */}
          <div className="absolute inset-0 bg-[#020a18]" />
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(20,40,80,0.4) 0%, transparent 70%)',
            }}
          />

          {/* ══ PHASE 1: GOLO! - Remate + Bola na Baliza ══ */}
          {revealPhase >= 1 && revealPhase < 2 && (
            <>
              {/* Stadium lights flash */}
              <div 
                className="absolute inset-0 bg-white pointer-events-none"
                style={{ animation: 'stadium-flash 0.5s ease-out forwards' }}
              />
              
              {/* Goal net background */}
              <div 
                className="absolute inset-0 opacity-0 pointer-events-none"
                style={{ 
                  background: `
                    repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 32px),
                    repeating-linear-gradient(0deg, transparent 0px, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 32px)
                  `,
                  animation: 'net-appear 0.5s ease-out 0.3s forwards',
                }}
              />
              
              {/* Football flying into goal */}
              <div 
                className="absolute z-30 pointer-events-none"
                style={{
                  animation: 'ball-into-goal 1.2s cubic-bezier(0.2, 0, 0.3, 1) forwards',
                }}
              >
                <div style={{ animation: 'ball-spin 0.4s linear infinite' }}>
                  <svg 
                    width="80" 
                    height="80" 
                    viewBox="0 0 100 100" 
                    className="drop-shadow-[0_5px_30px_rgba(0,0,0,0.6)]"
                  >
                    <defs>
                      <radialGradient id="ballGrad" cx="35%" cy="35%">
                        <stop offset="0%" stopColor="#ffffff"/>
                        <stop offset="50%" stopColor="#f5f5f5"/>
                        <stop offset="100%" stopColor="#e0e0e0"/>
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#ballGrad)"/>
                    <polygon points="50,15 38,28 42,45 58,45 62,28" fill="#1a1a1a"/>
                    <polygon points="20,50 12,38 20,25 32,32 28,48" fill="#1a1a1a"/>
                    <polygon points="80,50 88,38 80,25 68,32 72,48" fill="#1a1a1a"/>
                    <polygon points="30,70 22,80 38,88 50,78 42,65" fill="#1a1a1a"/>
                    <polygon points="70,70 78,80 62,88 50,78 58,65" fill="#1a1a1a"/>
                  </svg>
                </div>
              </div>
              
              {/* Ball impact flash when it hits the net */}
              <div 
                className="absolute inset-0 bg-yellow-400 z-40 pointer-events-none opacity-0"
                style={{ animation: 'goal-impact-flash 0.4s ease-out 1s forwards' }}
              />
              
              {/* GOLO! Text - appears after ball hits */}
              <div 
                className="relative z-50 flex flex-col items-center text-center px-4 opacity-0"
                style={{ animation: 'golo-entrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s forwards' }}
              >
                {/* Glow behind text */}
                <div 
                  className="absolute inset-0 blur-[80px] bg-yellow-400 opacity-60 scale-150"
                  style={{ animation: 'glow-pulse 1.5s ease-in-out infinite' }}
                />
                
                {/* Main GOLO text */}
                <h1 
                  className="font-display font-black text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[15rem] leading-none tracking-tight relative"
                  style={{
                    background: 'linear-gradient(180deg, #fef08a 0%, #facc15 30%, #eab308 70%, #ca8a04 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.6)) drop-shadow(0 0 60px rgba(250,204,21,0.6))',
                  }}
                >
                  GOLO!
                </h1>
              </div>
              
              {/* Confetti celebration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-45">
                {[...Array(50)].map((_, i) => {
                  const colors = ['#facc15', '#3b82f6', '#ffffff', '#60a5fa', '#fbbf24', '#22c55e'];
                  const color = colors[i % colors.length];
                  const size = 6 + Math.random() * 12;
                  const isRect = Math.random() > 0.5;
                  
                  return (
                    <div
                      key={i}
                      className={isRect ? 'rounded-sm' : 'rounded-full'}
                      style={{
                        position: 'absolute',
                        width: isRect ? `${size * 0.4}px` : `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        left: '50%',
                        top: '50%',
                        opacity: 0,
                        animation: `confetti-burst ${2 + Math.random() * 1.5}s ease-out forwards`,
                        animationDelay: `${1.2 + Math.random() * 0.5}s`,
                        ['--tx' as string]: `${(Math.random() - 0.5) * 120}vw`,
                        ['--ty' as string]: `${-30 - Math.random() * 40}vh`,
                        ['--rotate' as string]: `${Math.random() * 720}deg`,
                      }}
                    />
                  );
                })}
              </div>
            </>
          )}

          {/* ══ PHASE 2: Club Logo Reveal ══ */}
          {revealPhase >= 2 && (
            <div 
              className="relative z-20 flex flex-col items-center justify-center text-center px-4 opacity-0"
              style={{ animation: revealPhase === 2 ? 'logo-glory-entrance 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none', opacity: revealPhase >= 2 ? 1 : 0 }}
            >
              {/* Outer glow rings */}
              <div 
                className="absolute -m-16 rounded-full"
                style={{
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(250,204,21,0.25) 0%, transparent 70%)',
                  animation: 'glow-ring-pulse 3s ease-in-out infinite',
                }}
              />
              <div 
                className="absolute -m-8 rounded-full"
                style={{
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                  animation: 'glow-ring-pulse 2.5s ease-in-out 0.5s infinite',
                }}
              />
              
              {/* Main Logo */}
              <img
                src={LOGO_URL}
                alt="AD São Romão"
                className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain relative z-10"
                style={{ 
                  filter: 'drop-shadow(0 0 80px rgba(250,204,21,0.6)) drop-shadow(0 0 40px rgba(59,130,246,0.4))',
                  animation: 'logo-float 4s ease-in-out infinite',
                }}
              />
            </div>
          )}

          {/* ══ PHASE 3: Club Name Reveals ══ */}
          {revealPhase >= 3 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-25 pointer-events-none">
              {/* Spacer for logo */}
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 mb-8" />
              
              {/* Club Name */}
              <div className="relative mb-6 overflow-hidden">
                <h1 
                  className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-[0.2em] opacity-0"
                  style={{ 
                    animation: 'text-slide-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  AD São Romão
                </h1>
                
                {/* Golden underline */}
                <div 
                  className="absolute -bottom-3 left-1/2 h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full"
                  style={{ 
                    animation: 'underline-expand 0.8s ease-out 0.8s forwards',
                    transform: 'translateX(-50%)',
                    width: '0%',
                  }}
                />
              </div>
              
              {/* Subtitle */}
              <div 
                className="flex items-center gap-4 opacity-0"
                style={{ animation: 'fade-up 1s ease-out 1.2s forwards' }}
              >
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-yellow-400/60" />
                <span className="text-yellow-400/90 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase">
                  Fundado em 1988
                </span>
                <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-yellow-400/60" />
              </div>
            </div>
          )}

          {/* ══ PHASE 4: Welcome Message ══ */}
          {revealPhase >= 4 && (
            <div 
              className="absolute bottom-[12%] left-0 right-0 z-30 flex flex-col items-center opacity-0"
              style={{ animation: 'message-appear 1.5s ease-out forwards' }}
            >
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white mb-3"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              >
                Bem-vindos
              </h2>
              <p className="text-blue-200/70 text-sm sm:text-base tracking-wider">
                ao site oficial
              </p>
              
              {/* Loading dots */}
              <div className="flex gap-2 mt-8">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 bg-yellow-400/80 rounded-full"
                    style={{ animation: `dot-pulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ══ PHASE 5: Curtain Opening ══ */}
          {revealPhase >= 5 && (
            <>
              {/* Left curtain */}
              <div 
                className="absolute top-0 left-0 w-1/2 h-full z-50"
                style={{
                  background: 'linear-gradient(to right, #020a18 0%, #020a18 90%, transparent 100%)',
                  animation: 'curtain-left 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                }}
              />
              
              {/* Right curtain */}
              <div 
                className="absolute top-0 right-0 w-1/2 h-full z-50"
                style={{
                  background: 'linear-gradient(to left, #020a18 0%, #020a18 90%, transparent 100%)',
                  animation: 'curtain-right 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                }}
              />

              {/* Center bright reveal */}
              <div 
                className="absolute inset-0 z-45 pointer-events-none opacity-0"
                style={{
                  background: 'radial-gradient(ellipse 20% 100% at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 100%)',
                  animation: 'center-reveal 2s ease-out 0.3s forwards',
                }}
              />
            </>
          )}
        </div>
      )}

      {/* ═══════ KEYFRAMES ═══════ */}
      <style>{`
        @keyframes ken-burns {
          0%   { transform: scale(1.08) translate(0, 0); }
          50%  { transform: scale(1.15) translate(-1.5%, -1%); }
          100% { transform: scale(1.2) translate(1%, 0.5%); }
        }

        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -25px) scale(1.05); }
          66% { transform: translate(-25px, 20px) scale(0.95); }
        }

        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.12; }
          25% { transform: translateY(-35px) translateX(15px); opacity: 0.45; }
          50% { transform: translateY(-55px) translateX(-10px); opacity: 0.15; }
          75% { transform: translateY(-25px) translateX(20px); opacity: 0.4; }
        }

        @keyframes entrance-drop {
          0% { opacity: 0; transform: translateY(-50px) scale(0.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes entrance-up {
          0% { opacity: 0; transform: translateY(35px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes bar-shimmer {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        @keyframes underline-glow {
          0%, 100% { opacity: 0.4; transform: scaleX(0.7); }
          50% { opacity: 0.9; transform: scaleX(1); }
        }

        /* ═══════ REVEAL ANIMATION - EPIC FOOTBALL KEYFRAMES ═══════ */
        
        /* Phase 1: GOLO! */
        @keyframes stadium-flash {
          0% { opacity: 0.8; }
          50% { opacity: 0.3; }
          100% { opacity: 0; }
        }

        @keyframes net-appear {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes ball-into-goal {
          0% { 
            transform: translate(-80vw, 30vh) scale(0.3);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% { 
            transform: translate(-20vw, -15vh) scale(0.8);
          }
          80% { 
            transform: translate(5vw, 5vh) scale(1.2);
          }
          100% { 
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
        }

        @keyframes ball-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes goal-impact-flash {
          0% { opacity: 0; }
          30% { opacity: 0.6; }
          100% { opacity: 0; }
        }

        @keyframes golo-entrance {
          0% { 
            transform: scale(0.2) translateY(50px);
            opacity: 0;
            filter: blur(20px);
          }
          50% {
            transform: scale(1.15) translateY(-10px);
            opacity: 1;
            filter: blur(0);
          }
          70% {
            transform: scale(0.95) translateY(5px);
          }
          100% { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1.4); }
          50% { opacity: 0.7; transform: scale(1.6); }
        }

        @keyframes confetti-burst {
          0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          20% {
            transform: translate(calc(-50% + var(--tx) * 0.3), calc(-50% + var(--ty) * 0.3)) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translate(
              calc(-50% + var(--tx)), 
              calc(-50% + var(--ty) + 80vh)
            ) rotate(var(--rotate)) scale(0.6);
            opacity: 0;
          }
        }

        /* Phase 2: Logo */
        @keyframes logo-glory-entrance {
          0% { 
            opacity: 0;
            transform: scale(0.4);
            filter: blur(30px);
          }
          60% {
            opacity: 1;
            transform: scale(1.08);
            filter: blur(0);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glow-ring-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes logo-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Phase 3: Text */
        @keyframes text-slide-in {
          0% { 
            opacity: 0;
            transform: translateY(40px);
            letter-spacing: 0.5em;
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.2em;
          }
        }

        @keyframes underline-expand {
          0% { 
            width: 0%;
            opacity: 0;
          }
          100% { 
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes fade-up {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);;
          }
        }

        @keyframes message-appear {
          0% { 
            opacity: 0;
            transform: translateY(30px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dot-pulse {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes curtain-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        @keyframes curtain-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }

        @keyframes center-reveal {
          0% { 
            opacity: 0;
            transform: scaleX(0);
          }
          50% { 
            opacity: 1;
          }
          100% { 
            opacity: 0.6;
            transform: scaleX(1);
          }
        }

        /* ═══════ GENERAL UTILITY ANIMATIONS ═══════ */
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};
