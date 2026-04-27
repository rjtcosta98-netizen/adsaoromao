import React, { useEffect, useState, useRef } from 'react';
import { TEAM_LOGOS } from '../constants';

// ── Match target: 3 May 2025, 15:15 local time ──────────────────────────────
const CUP_DATE = new Date('2025-05-03T15:15:00');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    return { d, h, m, s };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Particle spark (CSS animated, no canvas) ────────────────────────────────
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.4) % 92}%`,
  delay: `${(i * 0.37) % 3}s`,
  dur: `${2.8 + (i * 0.19) % 1.8}s`,
  size: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 4,
  opacity: 0.55 + (i % 4) * 0.1,
}));

// ── Unit box ─────────────────────────────────────────────────────────────────
const Unit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div
      className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-black text-2xl sm:text-3xl md:text-4xl text-[#0a0e1a] overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #f9d423, #e8b800)',
        boxShadow: '0 4px 20px rgba(248,212,35,0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        letterSpacing: '-0.02em',
      }}
    >
      {/* inner grain */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
      {String(value).padStart(2, '0')}
    </div>
    <span className="mt-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400/70">
      {label}
    </span>
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────
export const CupBanner: React.FC = () => {
  const { d, h, m, s } = useCountdown(CUP_DATE);
  const sectionRef = useRef<HTMLDivElement>(null);

  const homeLogo  = TEAM_LOGOS['Guarda FC']    || '';
  const awayLogo  = TEAM_LOGOS['AD São Romão'] || '';

  const past = d === 0 && h === 0 && m === 0 && s === 0;

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #030510 0%, #080d24 40%, #0a1030 65%, #040812 100%)',
        minHeight: '460px',
      }}
    >
      {/* ── Stadium light beams ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {['-30deg', '5deg', '38deg'].map((rot, i) => (
          <div key={i} className="absolute top-0"
            style={{
              left: `${18 + i * 26}%`,
              width: '2px',
              height: '70%',
              background: 'linear-gradient(to bottom, rgba(248,212,35,0.22), transparent)',
              transform: `rotate(${rot})`,
              transformOrigin: 'top center',
              filter: 'blur(18px)',
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* ── Falling gold sparks ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {SPARKS.map(p => (
          <div key={p.id} className="absolute rounded-full"
            style={{
              left: p.left,
              top: '-8px',
              width: p.size,
              height: p.size,
              background: '#f8d423',
              opacity: p.opacity,
              animation: `sparkFall ${p.dur} ${p.delay} linear infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Grain texture overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* ── Diagonal gold ribbon ── */}
      <div className="absolute left-0 right-0 overflow-hidden pointer-events-none" aria-hidden
        style={{ top: '50%', transform: 'translateY(-50%) rotate(-2.8deg)', zIndex: 0 }}
      >
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(248,212,35,0.18) 20%, rgba(248,212,35,0.35) 50%, rgba(248,212,35,0.18) 80%, transparent)',
          filter: 'blur(1px)',
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14 flex flex-col items-center text-center">

        {/* Competition label */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-yellow-400/60" />
          <span
            className="text-yellow-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]"
            style={{ textShadow: '0 0 12px rgba(248,212,35,0.5)' }}
          >
            Taça de Honra Distrital da Guarda · Quartos de Final
          </span>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-yellow-400/60" />
        </div>

        {/* Trophy + Teams row */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-14 w-full max-w-2xl mb-8">

          {/* Home logo */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-30"
                style={{ background: 'radial-gradient(circle, #f8d423, transparent)' }} />
              <img src={homeLogo} alt="Guarda FC"
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_4px_16px_rgba(248,212,35,0.3)]"
              />
            </div>
            <span className="text-white/80 text-[11px] sm:text-xs font-bold uppercase tracking-wide">Guarda FC</span>
          </div>

          {/* Central trophy */}
          <div className="flex flex-col items-center gap-1 relative">
            {/* glow ring */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(248,212,35,0.18) 0%, transparent 70%)',
                filter: 'blur(20px)',
                animation: 'trophyPulse 2.5s ease-in-out infinite',
              }}
            />
            {/* trophy emoji with float */}
            <span
              className="text-5xl sm:text-6xl md:text-7xl select-none"
              style={{
                animation: 'trophyFloat 3s ease-in-out infinite',
                filter: 'drop-shadow(0 0 18px rgba(248,212,35,0.6))',
              }}
            >
              🏆
            </span>
            <span
              className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mt-1"
              style={{ color: '#f8d423', textShadow: '0 0 8px rgba(248,212,35,0.7)' }}
            >
              vs
            </span>
          </div>

          {/* Away logo */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
              <img src={awayLogo} alt="AD São Romão"
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_4px_20px_rgba(59,130,246,0.35)]"
                style={{ transform: 'scale(1.15)' }}
              />
            </div>
            <span className="text-blue-300 text-[11px] sm:text-xs font-black uppercase tracking-wide">AD São Romão</span>
          </div>
        </div>

        {/* Date line */}
        <p className="text-gray-400 text-xs sm:text-sm font-medium mb-6 tracking-wide">
          <span className="text-white font-semibold">3 de Maio de 2025</span>
          {' · '}
          <span className="text-yellow-400 font-bold">15:15</span>
          {' · '}
          Estádio Municipal da Guarda
        </p>

        {/* Countdown */}
        {!past ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
              Contagem decrescente
            </p>
            <div className="flex items-end gap-2 sm:gap-3 md:gap-4">
              <Unit value={d} label="dias" />
              <span className="text-yellow-400 font-black text-2xl sm:text-3xl mb-3 sm:mb-4 leading-none"
                style={{ animation: 'colonBlink 1s step-start infinite' }}>:</span>
              <Unit value={h} label="horas" />
              <span className="text-yellow-400 font-black text-2xl sm:text-3xl mb-3 sm:mb-4 leading-none"
                style={{ animation: 'colonBlink 1s step-start infinite' }}>:</span>
              <Unit value={m} label="minutos" />
              <span className="text-yellow-400 font-black text-2xl sm:text-3xl mb-3 sm:mb-4 leading-none"
                style={{ animation: 'colonBlink 1s step-start infinite' }}>:</span>
              <Unit value={s} label="segundos" />
            </div>
          </div>
        ) : (
          <div className="text-yellow-400 font-black text-xl sm:text-2xl uppercase tracking-widest"
            style={{ textShadow: '0 0 20px rgba(248,212,35,0.6)' }}
          >
            🏆 É hoje! Força São Romão! 🏆
          </div>
        )}

        {/* Autocarro pill */}
        <div className="mt-6 flex items-center gap-2 bg-white/5 border border-yellow-400/20 rounded-full px-4 py-2 backdrop-blur-sm">
          <span className="text-base">🚌</span>
          <span className="text-gray-300 text-[11px] sm:text-xs">
            Autocarro disponível ·{' '}
            <span className="text-yellow-400 font-bold">10€ por pessoa</span>
            {' '}· ida e volta
          </span>
        </div>

      </div>

      {/* ── Keyframes injected inline ── */}
      <style>{`
        @keyframes sparkFall {
          0%   { transform: translateY(-10px) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(110vh) scale(0.4); opacity: 0; }
        }
        @keyframes trophyFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-10px); }
        }
        @keyframes trophyPulse {
          0%, 100% { opacity: 0.18; transform: scale(1);   }
          50%       { opacity: 0.40; transform: scale(1.15); }
        }
        @keyframes colonBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};
