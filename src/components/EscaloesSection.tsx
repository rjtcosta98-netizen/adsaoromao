import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';
import { SQUAD_DATA } from '../constants';
import { SquadSection } from '../types';
import { slugEscalao } from '../lib/escaloes';

interface EscaloesSectionProps {
  onNavigate: (page: string, id?: number) => void;
}

const SQUAD = SQUAD_DATA as Record<string, SquadSection[]>;

// Os seniores não têm artwork de apresentação 26/27 como as camadas jovens,
// por isso a capa é a fotografia oficial de equipa.
const CAPA_SENIORES = 'https://ik.imagekit.io/elementgroup/ADSR/Equipa%20ADSR';

function capaDoEscalao(nome: string, seccoes: SquadSection[]): string {
  if (nome === 'SENIORES') return CAPA_SENIORES;
  const membros = seccoes.flatMap((s) => s.members);
  // O cartão promocional é artwork do clube: capa mais forte do que um retrato.
  const promo = membros.find((m) => m.isPromoCard);
  return (promo ?? membros[0])?.image ?? CAPA_SENIORES;
}

export const EscaloesSection: React.FC<EscaloesSectionProps> = ({ onNavigate }) => {
  const navegar = useNavigate();

  const escaloes = Object.entries(SQUAD).map(([nome, seccoes]) => {
    // 'JUVENIS (U16)' parte-se em título + sigla para caber na linha única.
    const partes = nome.match(/^(.+?)\s*\((U\d+)\)$/);
    return {
      nome,
      titulo: partes ? partes[1] : nome,
      sigla: partes ? partes[2] : null,
      capa: capaDoEscalao(nome, seccoes),
      fotografias: seccoes.reduce((total, s) => total + s.members.length, 0),
    };
  });

  const totalFotografias = escaloes.reduce((total, e) => total + e.fotografias, 0);

  return (
    <div className="relative overflow-hidden bg-navy-900 py-12 sm:py-16 md:py-24">
      {/* Halo dourado único da secção — nunca mais do que um por secção */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.10),transparent_38%)]"></div>

      <div className="container relative z-10 mx-auto px-3 sm:px-4">
        {/* Header — padrão do site: barra amarela + título, sem kicker */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
            <h2 className="font-display text-lg font-bold uppercase text-white sm:text-xl md:text-3xl">
              Os Nossos Escalões
            </h2>
          </div>
          <span className="hidden whitespace-nowrap text-[11px] uppercase tracking-widest text-gray-400 sm:block">
            {totalFotografias} fotografias
          </span>
        </div>

        {/* Os sete escalões vivem numa única linha. Abaixo de lg não cabem, por
            isso a linha passa a carrossel com scroll horizontal e snap. */}
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 lg:overflow-visible lg:pb-0">
          {escaloes.map((escalao) => (
            <button
              key={escalao.nome}
              type="button"
              onClick={() => navegar(`/equipas#${slugEscalao(escalao.nome)}`)}
              aria-label={`Ver plantel ${escalao.nome}`}
              className="group relative aspect-[4/5] w-[58%] flex-none snap-start overflow-hidden rounded-lg border border-white/12 bg-[#03153a]/58 text-left shadow-[0_22px_70px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 sm:w-[32%] md:w-[24%] lg:w-auto lg:flex-1 lg:basis-0"

            >
              <img
                src={escalao.capa}
                alt={escalao.nome}
                loading="lazy"
                width={600}
                height={750}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradiente de baixo para cima para o texto assentar sobre a foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03153a] via-[#03153a]/85 to-[#03153a]/10"></div>

              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-yellow-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-900 shadow-lg sm:right-4 sm:top-4 sm:px-3 sm:text-xs">
                <Camera size={12} />
                {escalao.fotografias}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 lg:p-3 xl:p-4">
                <h3 className="font-display text-base font-bold uppercase leading-tight text-white transition-colors duration-300 group-hover:text-yellow-400 sm:text-lg lg:text-base xl:text-lg">
                  {escalao.titulo}
                </h3>
                {escalao.sigla && (
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                    {escalao.sigla}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center sm:mt-10 md:mt-14">
          <button
            onClick={() => onNavigate('equipas')}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 text-xs font-bold uppercase tracking-widest text-navy-900 shadow-lg shadow-yellow-400/20 transition-all hover:bg-yellow-300 hover:shadow-yellow-400/40 sm:gap-3 sm:px-10 sm:py-4"
          >
            Ver Todas as Equipas
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
