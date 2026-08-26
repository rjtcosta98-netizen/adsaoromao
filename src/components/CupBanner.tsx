import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CupBannerProps {
  onNavigate: (page: string) => void;
}

const CUP_BANNER_STYLES = `
  @keyframes cup-poster-reveal {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cup-poster-reveal {
    animation: cup-poster-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .cup-poster-reveal { animation: none; }
  }
`;

export const CupBanner: React.FC<CupBannerProps> = ({ onNavigate }) => {
  const colors = {
    '--cup-ink': '#010B1C',
    '--cup-blue': '#053975',
    '--cup-yellow': '#FFD700',
    '--cup-white': '#ffffff',
  } as React.CSSProperties;

  return (
    <section
      id="adsr-cup-banner"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--cup-ink)] px-3 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
      style={colors}
    >
      <style>{CUP_BANNER_STYLES}</style>

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_18%_20%,var(--cup-blue),transparent_38%),radial-gradient(circle_at_85%_85%,rgba(255,215,0,0.13),transparent_24%)]"
      />

      <button
        type="button"
        onClick={() => onNavigate('adsr-cup')}
        className="cup-poster-reveal group relative mx-auto block w-full max-w-[1500px] cursor-pointer overflow-hidden rounded-[1.4rem] border border-white/20 bg-[var(--cup-blue)] text-left shadow-[0_28px_90px_rgba(0,0,0,0.52)] outline-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[var(--cup-yellow)] hover:shadow-[0_36px_110px_rgba(0,0,0,0.68),0_0_36px_rgba(255,215,0,0.13)] focus-visible:ring-4 focus-visible:ring-[var(--cup-yellow)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--cup-ink)]"
      >
        <div className="relative aspect-[9/14] overflow-hidden bg-[var(--cup-blue)] sm:aspect-[4/3] md:aspect-video">
          <picture className="absolute inset-0 block h-full w-full">
            <source media="(max-width: 767px)" srcSet="/images/adsrcuphero-mobile.png" />
            <img
              src="/images/adsrcuphero.png"
              alt="Cartaz oficial da ADSR Cup 2026, torneio de futebol de formação em São Romão"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              loading="lazy"
            />
          </picture>

          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(1,11,28,0.16)]" />

          <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-[var(--cup-ink)]/70 px-3 py-2 font-cup text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--cup-white)] backdrop-blur-md sm:right-6 sm:top-6 sm:px-4 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-[var(--cup-yellow)] shadow-[0_0_12px_var(--cup-yellow)]" />
            IV edição
          </span>
        </div>

        <div className="relative grid gap-5 bg-[var(--cup-yellow)] px-5 py-5 sm:px-7 md:grid-cols-[1fr_auto] md:items-center lg:px-10 lg:py-6">
          <div>
            <p className="font-cup text-[0.68rem] font-bold uppercase tracking-[0.25em] text-[var(--cup-ink)]/65 sm:text-xs">
              A competição de formação da Serra da Estrela
            </p>
            <p className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-[var(--cup-ink)] sm:text-3xl">
              Toda a emoção. Todas as equipas. Um só lugar.
            </p>
          </div>

          <span className="inline-flex min-h-12 w-fit items-center gap-4 rounded-full bg-[var(--cup-ink)] px-5 py-3 font-cup text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--cup-white)] transition-colors duration-200 group-hover:bg-[var(--cup-blue)] sm:px-6 sm:text-base">
            Entrar na ADSR Cup
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--cup-yellow)] text-[var(--cup-ink)]">
              <ArrowUpRight size={18} strokeWidth={2.7} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </span>
        </div>
      </button>
    </section>
  );
};
