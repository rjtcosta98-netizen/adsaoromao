import React from 'react';

export const LatestResults: React.FC = () => {
  return (
    <div id="latest-results" className="bg-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-2 h-10 bg-gold-400" />
          <h2 className="text-3xl font-display font-bold text-navy-900 uppercase">
            Últimos Resultados
          </h2>
          <span className="rounded-full border border-gold-400/40 bg-gold-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-navy-900">
            Época 25/26 terminada
          </span>
        </div>
      </div>
    </div>
  );
};
