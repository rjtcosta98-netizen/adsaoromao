import React from 'react';
import { LOGO_URL } from '../constants';

export const LoadingScreen: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: '#020a18' }}
    >
      {/* ── BACKGROUND VIDEO ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/adsrcuphero.png"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/images/0601.mov"
      />

      {/* ── OVERLAYS ── */}
      {/* Main dark veil */}
      <div className="absolute inset-0 z-[1] bg-[#020a18]/75" />
      {/* Bottom fade */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#020a18] via-[#020a18]/40 to-transparent" />
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, #020a18 100%)',
        }}
      />
      {/* Gold top rule */}
      <div
        className="absolute inset-x-0 top-0 z-[2] h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #facc15 30%, #facc15 70%, transparent 100%)',
          opacity: 0.7,
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex w-full flex-col items-center px-5 text-center">

        {/* Logo + glow */}
        <div className="relative mb-5 sm:mb-7">
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: 'rgba(250,204,21,0.22)', animation: 'ls-pulse 2.6s ease-in-out infinite' }}
          />
          <img
            src={LOGO_URL}
            alt="AD São Romão"
            className="relative z-10 h-[72px] w-[72px] object-contain drop-shadow-2xl sm:h-28 sm:w-28 md:h-32 md:w-32"
          />
        </div>

        {/* Association label */}
        <p
          className="mb-2 font-black uppercase text-white/55 sm:mb-3"
          style={{ fontSize: 'clamp(0.52rem, 1.6vw, 0.7rem)', letterSpacing: '0.3em' }}
        >
          Associação Desportiva
        </p>

        {/* Main headline */}
        <h1
          className="font-display font-black uppercase leading-[0.88] text-white"
          style={{
            fontSize: 'clamp(3rem, 16vw, 8rem)',
            letterSpacing: '-0.025em',
            textShadow: '0 0 80px rgba(250,204,21,0.15)',
          }}
        >
          SÃO <span style={{ color: '#facc15' }}>ROMÃO</span>
        </h1>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3 sm:my-6">
          <span
            className="h-px w-8 sm:w-12"
            style={{ background: 'linear-gradient(90deg, transparent, #facc15)' }}
          />
          <span
            className="font-black uppercase text-[#facc15]"
            style={{ fontSize: '0.58rem', letterSpacing: '0.28em' }}
          >
            A carregar
          </span>
          <span
            className="h-px w-8 sm:w-12"
            style={{ background: 'linear-gradient(90deg, #facc15, transparent)' }}
          />
        </div>

        {/* Slogan */}
        <p
          className="font-display font-black uppercase text-white/45"
          style={{
            fontSize: 'clamp(0.8rem, 3.5vw, 1.15rem)',
            letterSpacing: '0.12em',
          }}
        >
          Juntos e Fortes
        </p>

        {/* Dev credit */}
        <div className="mt-8 sm:mt-10">
          <a
            href="https://elementgroup.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium text-white/40 transition-colors hover:border-yellow-400/25 hover:text-white/65 sm:text-xs"
          >
            <span className="font-mono text-[#facc15]/60">{'</>'}</span>
            Desenvolvido por{' '}
            <strong className="font-bold text-white/55">Elementgroup.pt</strong>
          </a>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] overflow-hidden bg-white/5">
        <div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #facc15, #fef08a, #facc15, transparent)',
            animation: 'ls-bar 1.8s ease-in-out infinite',
            boxShadow: '0 0 18px #facc15',
          }}
        />
      </div>

      <style>{`
        @keyframes ls-pulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.38; transform: scale(1.18); }
        }
        @keyframes ls-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ls-pulse, .ls-bar { animation: none; }
        }
      `}</style>
    </div>
  );
};
