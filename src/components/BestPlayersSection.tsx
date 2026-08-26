import React from 'react';
import { Trophy } from 'lucide-react';
import { Section, SectionInner, SectionHeading } from './ui/Section';

const BEST_PLAYERS = [
  {
    season: '25/26',
    name: 'Rafael Santos',
    role: 'Guarda-redes',
    image: '/images/vencedor.png',
  },
];

export const BestPlayersSection: React.FC = () => {
  const [featured, ...rest] = BEST_PLAYERS;

  if (!featured) return null;

  return (
    <Section tone="light" seam>
      <SectionInner>
        <SectionHeading
          eyebrow="Escolha dos adeptos"
          title="Melhores jogadores"
          description="Vencedores votados pelo público em cada época."
        />

        {/* Um único vencedor merece tratamento editorial, não uma célula
            perdida numa grelha de três colunas meia-vazia. */}
        <article className="group grid overflow-hidden rounded-2xl border border-bone-200 bg-bone md:grid-cols-[minmax(0,320px)_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden bg-navy-900 md:aspect-auto md:min-h-[340px]">
            <img
              src={featured.image}
              alt={featured.name}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(1,11,28,0.55)_100%)]" />
          </div>

          <div className="flex flex-col justify-center gap-5 p-7 md:p-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-400 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-kicker text-navy-900">
              <Trophy size={13} strokeWidth={2.8} />
              Época {featured.season}
            </div>

            <div>
              <p className="font-display text-[11px] font-semibold uppercase tracking-kicker text-gold-600">
                {featured.role}
              </p>
              <h3 className="mt-2 font-display text-[clamp(2rem,6vw,3.4rem)] font-bold uppercase leading-[0.9] text-navy-900">
                {featured.name}
              </h3>
            </div>

            <div className="h-[3px] w-16 bg-gradient-to-r from-gold-400 to-gold-600" />

            <p className="max-w-md text-base leading-relaxed text-navy-900/60">
              Eleito pelos adeptos como o melhor jogador da época {featured.season}.
            </p>
          </div>
        </article>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((player) => (
              <article
                key={player.season}
                className="group grid grid-cols-[88px_1fr] items-center gap-4 rounded-xl border border-bone-200 bg-bone p-3 transition-colors hover:border-gold-400/60 hover:bg-paper"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-navy-900">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-navy-900">
                    <Trophy size={12} strokeWidth={2.6} />
                    {player.season}
                  </div>
                  <h3 className="truncate font-display text-xl font-bold uppercase leading-none text-navy-900">
                    {player.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-navy-900/55">{player.role}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </SectionInner>
    </Section>
  );
};
