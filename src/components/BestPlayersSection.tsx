import React from 'react';
import { Trophy } from 'lucide-react';

const BEST_PLAYERS = [
  {
    season: '25/26',
    name: 'Rafael Santos',
    role: 'Guarda-redes',
    image: '/images/vencedor.png',
  },
];

export const BestPlayersSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-14">
      {/* Superfície clara: sem véu nem diagonal, só um halo navy muito subtil para dar profundidade. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]"></div>

      <div className="container relative mx-auto px-4">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
            <h2 className="font-display text-lg font-bold uppercase text-navy-900 sm:text-xl md:text-3xl">
              Melhores jogadores
            </h2>
          </div>
          <p className="max-w-md text-[12px] text-gray-600 sm:text-sm">
            Vencedores votados pelo público em cada época.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {BEST_PLAYERS.map((player) => (
            <article
              key={player.season}
              className="group grid grid-cols-[88px_1fr] items-center gap-4 rounded-lg border border-navy-900/10 bg-white p-3 shadow-[0_18px_50px_rgba(3,21,58,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/60 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)]"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-navy-900/[0.04]">
                <img
                  src={player.image}
                  alt={player.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Véu mais leve que na superfície escura: aqui só assenta a foto no cartão branco. */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/35 to-transparent"></div>
              </div>

              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-900">
                  <Trophy size={12} strokeWidth={2.6} />
                  {player.season}
                </div>
                <h3 className="truncate font-display text-xl font-bold uppercase leading-none text-navy-900">
                  {player.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-gray-600">{player.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
