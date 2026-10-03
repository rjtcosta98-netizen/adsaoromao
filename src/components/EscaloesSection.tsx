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

        {/* A fotografia é o conteúdo: a capa aparece com a luz original.
            Seniores ocupa duas colunas — a foto de equipa é 3:2 e as artworks
            da formação são 4:5, e numa grelha de 4 colunas o cartão duplo fica
            praticamente em 3:2. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {escaloes.map((escalao) => {
            const principal = escalao.nome === 'SENIORES';
            return (
              <button
                key={escalao.nome}
                type="button"
                onClick={() => navegar(`/equipas#${slugEscalao(escalao.nome)}`)}
                aria-label={`Ver plantel ${escalao.nome}`}
                className={`group flex flex-col overflow-hidden rounded-lg bg-navy-800 text-left shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-14px_rgba(0,0,0,0.65)] hover:ring-2 hover:ring-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                  principal ? 'col-span-2 md:col-span-3 lg:col-span-2' : ''
                }`}
              >
                {/* A imagem fica inteira e sem véu: as artworks da formação já
                    trazem o nome impresso em baixo, por isso o rótulo vive numa
                    faixa própria e nunca se sobrepõe à arte. */}
                <div
                  className={`relative w-full overflow-hidden ${
                    principal ? 'aspect-[3/2] md:aspect-[21/9] lg:aspect-auto lg:min-h-0 lg:flex-1' : 'aspect-[4/5]'
                  }`}
                >
                  <img
                    src={escalao.capa}
                    alt={escalao.nome}
                    loading="lazy"
                    width={principal ? 1200 : 600}
                    height={principal ? 800 : 750}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-3 sm:px-4 sm:py-3.5">
                  <div className="flex min-w-0 items-baseline gap-2">
                    <h3
                      className={`truncate font-display font-bold uppercase leading-none text-white transition-colors duration-300 group-hover:text-yellow-400 ${
                        principal ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                      }`}
                    >
                      {escalao.titulo}
                    </h3>
                    {escalao.sigla && (
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-yellow-400">{escalao.sigla}</span>
                    )}
                  </div>
                  <span className="flex flex-none items-center gap-1 text-xs font-semibold tabular-nums text-white/70">
                    <Camera size={13} aria-hidden="true" />
                    {escalao.fotografias}
                  </span>
                </div>
              </button>
            );
          })}
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
