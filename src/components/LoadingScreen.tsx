import React from 'react';
import { LOGO_URL } from '../constants';

export const LoadingScreen: React.FC = () => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="A carregar AD São Romão"
      className="ls-root fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#010B1C] px-5 text-white"
    >
      <img
        src="/images/estadio.jpeg"
        alt=""
        aria-hidden="true"
        className="ls-bg absolute inset-0 h-full w-full object-cover object-[57%_center] md:object-center"
      />

      <div className="absolute inset-0 bg-[#010B1C]/62" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(1,11,28,0.95)_0%,rgba(1,11,28,0.72)_42%,rgba(1,11,28,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,215,0,0.14),transparent_34%)]" />

      <div className="ls-panel relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
          <span className="ls-ring absolute inset-0 rounded-full border border-gold-400/35" />
          <span className="absolute inset-4 rounded-full bg-gold-400/10 blur-xl" />
          <img
            src={LOGO_URL}
            alt="AD São Romão"
            className="ls-crest relative z-10 h-24 w-24 object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.75)] sm:h-28 sm:w-28"
          />
        </div>

        <div className="ls-copy mt-7">
          <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
            Época 26/27
          </p>
          <p className="mt-3 font-display text-4xl font-bold uppercase leading-none text-white sm:text-6xl">
            Nova época
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-base">
            Mais jogos. Mais emoção. A mesma paixão.
          </p>
        </div>

        <div className="ls-progress mt-8 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-white/15">
          <span className="ls-progress-bar block h-full rounded-full bg-gold-400 shadow-[0_0_18px_rgba(255,215,0,0.75)]" />
        </div>
      </div>

      <style>{`
        .ls-bg {
          animation: ls-bg 2.2s ease-out both;
        }

        .ls-panel {
          animation: ls-enter 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .ls-ring {
          animation: ls-ring 1.7s ease-in-out infinite;
          box-shadow: 0 0 34px rgba(255,215,0, 0.18);
        }

        .ls-crest {
          animation: ls-float 3.4s ease-in-out infinite;
        }

        .ls-progress-bar {
          animation: ls-load 1.55s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        @keyframes ls-bg {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes ls-enter {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes ls-ring {
          0%, 100% { transform: scale(0.92); opacity: 0.45; }
          50% { transform: scale(1.04); opacity: 1; }
        }

        @keyframes ls-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes ls-load {
          0% { transform: translateX(-100%); width: 42%; }
          55% { transform: translateX(70%); width: 58%; }
          100% { transform: translateX(240%); width: 42%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ls-bg,
          .ls-panel,
          .ls-ring,
          .ls-crest,
          .ls-progress-bar {
            animation: none !important;
          }

          .ls-progress-bar {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
