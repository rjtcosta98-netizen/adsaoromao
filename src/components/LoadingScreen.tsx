import React from 'react';
import { LOGO_URL } from '../constants';

/**
 * ADSR CUP — Match-Day Kickoff loading screen.
 * A darkened stadium: blurred cup poster + CSS pitch + sweeping floodlights,
 * with a custom navy/gold spinning soccer ball as the hero loader.
 */
export const LoadingScreen: React.FC = () => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="A carregar ADSR Cup 2026"
      className="ls-root fixed inset-0 z-[100] flex flex-col items-center justify-end overflow-hidden select-none"
      style={{ background: '#020a18' }}
    >
      {/* ── STADIUM BACKDROP ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* ADSR Cup poster — featured, responsive (mobile portrait / desktop landscape) */}
        <picture>
          <source media="(max-width: 1023px)" srcSet="/images/adsrcuphero-mobile.png" />
          <img
            src="/images/adsrcuphero.png"
            alt="ADSR Cup 2026"
            className="ls-poster absolute inset-0 h-full w-full object-cover object-top lg:object-center opacity-90"
          />
        </picture>
        {/* Grass-glow grounding the pitch */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 78%, rgba(15,60,40,0.55) 0%, transparent 60%)',
          }}
        />
        {/* Pitch markings — kickoff circle + halfway line, in perspective */}
        <div className="ls-pitch absolute inset-x-0 bottom-[-12%] z-[1] mx-auto h-[70%] w-[150%]">
          <div className="ls-pitch-line absolute left-0 right-0 top-1/2 h-px" />
          <div className="ls-pitch-circle absolute left-1/2 top-1/2 h-[42%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div className="ls-pitch-spot absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
      </div>

      {/* ── FLOODLIGHTS ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="ls-beam ls-beam--l" />
        <div className="ls-beam ls-beam--r" />
      </div>

      {/* ── OVERLAYS — keep the poster readable, darken only the bottom for the loader ── */}
      <div className="absolute inset-0 z-[2] bg-[#020a18]/15" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#020a18] via-[#020a18]/45 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(ellipse 95% 88% at 50% 42%, transparent 42%, rgba(2,10,24,0.85) 100%)' }}
      />
      {/* Gold top rule */}
      <div
        className="absolute inset-x-0 top-0 z-[3] h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #facc15 30%, #facc15 70%, transparent)',
          opacity: 0.7,
        }}
      />

      {/* ── CONTENT — bottom-anchored loader cluster (poster carries the branding) ── */}
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-5 pb-12 sm:pb-14 text-center">

        {/* Club crest — small, sets authorship */}
        <div className="ls-in ls-d0 mb-5 flex items-center gap-2.5 sm:mb-7">
          <img src={LOGO_URL} alt="AD São Romão" className="h-8 w-8 object-contain drop-shadow sm:h-10 sm:w-10" />
          <span
            className="font-display font-black uppercase text-white/45"
            style={{ fontSize: 'clamp(0.5rem,1.5vw,0.62rem)', letterSpacing: '0.32em' }}
          >
            AD São Romão · Apresenta
          </span>
        </div>

        {/* ── THE CUP EMBLEM — featured tournament logo ── */}
        <div className="ls-in ls-d1 relative mb-7 sm:mb-9">
          {/* rotating gold aura ring — trophy spotlight */}
          <div
            className="ls-aura pointer-events-none absolute -inset-7 rounded-full blur-2xl"
            style={{
              background:
                'conic-gradient(from 0deg, transparent, rgba(250,204,21,0.5) 12%, transparent 32%, rgba(250,204,21,0.32) 55%, transparent 78%, rgba(250,204,21,0.42) 100%)',
            }}
          />
          {/* soft static halo */}
          <div
            className="pointer-events-none absolute -inset-2 rounded-[28px] blur-2xl"
            style={{ background: 'rgba(250,204,21,0.16)' }}
          />
          {/* framed logo card */}
          <div className="ls-emblem relative overflow-hidden rounded-[22px] border-2 border-yellow-400/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),0_0_64px_rgba(250,204,21,0.28)]">
            <img
              src="/images/adsrcuplogo.png"
              alt="ADSR Cup 2026 — Torneio de Futebol · SUB 8/10/12/14/16 · 13/14 e 20/21 de Junho"
              className="block h-auto"
              style={{ width: 'clamp(220px, 68vw, 330px)' }}
            />
            {/* gold inner highlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[22px]"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 70px rgba(0,0,0,0.35)' }}
            />
            {/* shine sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
              <div
                className="ls-shine absolute inset-y-0 -left-1/3 w-1/3"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)' }}
              />
            </div>
          </div>
          {/* corner spinning ball badge — nods to kickoff */}
          <div className="ls-ball-corner absolute -bottom-4 -right-3 z-20">
            <svg className="ls-ball-spin" width="44" height="44" viewBox="0 0 100 100" role="img" aria-hidden>
              <defs>
                <radialGradient id="cballBody" cx="38%" cy="32%" r="75%">
                  <stop offset="0%" stopColor="#1b3a73" />
                  <stop offset="55%" stopColor="#0c2150" />
                  <stop offset="100%" stopColor="#05122f" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#cballBody)" stroke="#facc15" strokeWidth="2" />
              <g stroke="#facc15" strokeWidth="2.6" strokeLinecap="round" opacity="0.9">
                <line x1="50" y1="34" x2="50" y2="2" />
                <line x1="65.2" y1="45.1" x2="95.6" y2="35.2" />
                <line x1="59.4" y1="62.9" x2="78.2" y2="88.8" />
                <line x1="40.6" y1="62.9" x2="21.8" y2="88.8" />
                <line x1="34.8" y1="45.1" x2="4.4" y2="35.2" />
              </g>
              <polygon points="50,34 65.2,45.1 59.4,62.9 40.6,62.9 34.8,45.1" fill="#facc15" />
            </svg>
          </div>
        </div>

        {/* ── KICKOFF LOADER LINE ── */}
        <div className="ls-in ls-d4 mt-5 flex items-center gap-3">
          <span className="h-px w-8 sm:w-12" style={{ background: 'linear-gradient(90deg, transparent, #facc15)' }} />
          <span
            className="flex items-center gap-1 font-display font-black uppercase text-[#facc15]"
            style={{ fontSize: '0.6rem', letterSpacing: '0.26em' }}
          >
            A entrar em campo
            <span className="ls-dot ls-dot1">.</span>
            <span className="ls-dot ls-dot2">.</span>
            <span className="ls-dot ls-dot3">.</span>
          </span>
          <span className="h-px w-8 sm:w-12" style={{ background: 'linear-gradient(90deg, #facc15, transparent)' }} />
        </div>

        {/* ── DEV CREDIT ── */}
        <div className="ls-in ls-d5 mt-8 sm:mt-9">
          <a
            href="https://elementgroup.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium text-white/40 transition-colors hover:border-yellow-400/25 hover:text-white/65 sm:text-xs"
          >
            <span className="font-mono text-[#facc15]/60">{'</>'}</span>
            Desenvolvido por <strong className="font-bold text-white/55">Elementgroup.pt</strong>
          </a>
        </div>
      </div>

      {/* ── PROGRESS BAR (pitch sideline) ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] overflow-hidden bg-white/5">
        <div
          className="ls-bar h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #facc15, #fef08a, #facc15, transparent)',
            boxShadow: '0 0 18px #facc15',
          }}
        />
      </div>

      <style>{`
        /* pitch markings */
        .ls-pitch-line { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent); }
        .ls-pitch-circle { border: 1px solid rgba(255,255,255,0.13); box-shadow: inset 0 0 40px rgba(250,204,21,0.05); }
        .ls-pitch-spot { background: rgba(255,255,255,0.45); }
        .ls-pitch { transform: perspective(520px) rotateX(58deg); transform-origin: 50% 100%; opacity: 0.85; }

        /* floodlight beams */
        .ls-beam { position: absolute; top: -30%; width: 60%; height: 120%; filter: blur(26px); opacity: 0.5;
          background: linear-gradient(180deg, rgba(255,247,214,0.55), rgba(250,204,21,0.06) 55%, transparent 80%); }
        .ls-beam--l { left: -18%; transform-origin: top center; transform: rotate(20deg); animation: ls-sway-l 6s ease-in-out infinite; }
        .ls-beam--r { right: -18%; transform-origin: top center; transform: rotate(-20deg); animation: ls-sway-r 6s ease-in-out infinite; }
        @keyframes ls-sway-l { 0%,100% { transform: rotate(18deg); opacity: 0.42; } 50% { transform: rotate(24deg); opacity: 0.6; } }
        @keyframes ls-sway-r { 0%,100% { transform: rotate(-18deg); opacity: 0.6; } 50% { transform: rotate(-24deg); opacity: 0.42; } }

        /* ball */
        .ls-ball-spin { transform-origin: 50% 50%; animation: ls-spin 1.5s linear infinite; }
        .ls-ball-bob { animation: ls-bob 1.5s ease-in-out infinite; }
        .ls-ball-shadow { background: radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%); animation: ls-shadow 1.5s ease-in-out infinite; }
        .ls-halo { animation: ls-pulse 2.6s ease-in-out infinite; }
        @keyframes ls-spin { to { transform: rotate(360deg); } }
        @keyframes ls-bob { 0%,100% { transform: translate(-50%, 14px); } 50% { transform: translate(-50%, -2px); } }
        @keyframes ls-shadow { 0%,100% { transform: translateX(-50%) scale(1); opacity: 0.55; } 50% { transform: translateX(-50%) scale(0.7); opacity: 0.3; } }
        @keyframes ls-pulse { 0%,100% { opacity: 0.2; transform: translateX(-50%) scale(1); } 50% { opacity: 0.42; transform: translateX(-50%) scale(1.18); } }

        /* cup emblem */
        .ls-aura { animation: ls-aura 9s linear infinite; }
        @keyframes ls-aura { to { transform: rotate(360deg); } }
        .ls-emblem { animation: ls-emblem-in 0.9s cubic-bezier(0.16,1,0.3,1) both, ls-float 5s ease-in-out 0.9s infinite; }
        @keyframes ls-emblem-in { 0% { opacity: 0; transform: translateY(24px) scale(0.88); } 60% { opacity: 1; transform: translateY(0) scale(1.015); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes ls-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .ls-shine { animation: ls-shine 5.5s 1.3s ease-in-out infinite; }
        @keyframes ls-shine { 0% { transform: translateX(-160%) skewX(-18deg); } 60%,100% { transform: translateX(520%) skewX(-18deg); } }
        .ls-ball-corner { animation: ls-float 4.2s ease-in-out 0.6s infinite; }

        /* loader dots */
        .ls-dot { animation: ls-blink 1.4s infinite both; }
        .ls-dot2 { animation-delay: 0.2s; }
        .ls-dot3 { animation-delay: 0.4s; }
        @keyframes ls-blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }

        /* progress bar */
        .ls-bar { animation: ls-bar 1.8s ease-in-out infinite; }
        @keyframes ls-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

        /* staggered entrance */
        .ls-in { opacity: 0; animation: ls-rise 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .ls-d0 { animation-delay: 0.05s; } .ls-d1 { animation-delay: 0.15s; }
        .ls-d2 { animation-delay: 0.28s; } .ls-d3 { animation-delay: 0.42s; }
        .ls-d4 { animation-delay: 0.54s; } .ls-d5 { animation-delay: 0.66s; }
        @keyframes ls-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        @media (prefers-reduced-motion: reduce) {
          .ls-ball-spin, .ls-ball-bob, .ls-ball-shadow, .ls-halo, .ls-beam,
          .ls-aura, .ls-emblem, .ls-shine, .ls-ball-corner,
          .ls-dot, .ls-bar, .ls-in { animation: none; }
          .ls-in, .ls-emblem { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
