import React from 'react';

export const Calendar: React.FC = () => {
  return (
    <div className="bg-white pb-20 pt-10 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 uppercase">
            Próximos <span className="text-gold-400">Jogos</span>
          </h2>
          <span className="rounded-full border border-gold-400/40 bg-gold-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-navy-900">
            Época 25/26 terminada
          </span>
        </div>
      </div>
    </div>
  );
};
