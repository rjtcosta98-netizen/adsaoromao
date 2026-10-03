import React from 'react';
import { LOGO_URL } from '../constants';
import { epocaCurta } from '../lib/epoca';

type Props = {
  /** O que ainda falta publicar, em minúsculas: "os calendários", "as classificações". */
  oQueFalta: string;
  /** Contexto extra numa linha. */
  detalhe?: string;
  /** Fundo claro (sobre secções brancas) ou escuro (sobre navy). */
  tom?: 'claro' | 'escuro';
};

/**
 * Espera pelo arranque da época.
 *
 * Aparece quando a AF Guarda ainda não publicou calendário ou classificação da
 * época nova. Em vez de uma caixa vazia, mostra o número da época a ser varrido
 * por um brilho dourado — o mesmo gesto do ecrã de carregamento do site.
 */
export const EpocaAComecar: React.FC<Props> = ({ oQueFalta, detalhe, tom = 'escuro' }) => {
  const escuro = tom === 'escuro';

  return (
    <div
      className={`relative overflow-hidden rounded-xl border px-5 py-10 text-center sm:px-8 sm:py-14 ${
        escuro ? 'border-white/10 bg-navy-800/40' : 'border-navy-900/10 bg-navy-900/[0.03]'
      }`}
    >
      {/* Varrimento dourado — um único gesto, lento, em repetição. */}
      <div className="epoca-sweep pointer-events-none absolute inset-0" aria-hidden="true"></div>

      <div className="relative">
        {/* Emblema com anel a pulsar — o mesmo gesto do ecrã de carregamento,
            para a espera pertencer ao site e não parecer um erro. */}
        <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
          <span className="epoca-anel absolute inset-0 rounded-full border border-yellow-400/40"></span>
          <span className="absolute inset-3 rounded-full bg-yellow-400/10 blur-xl"></span>
          <img
            src={LOGO_URL}
            alt=""
            aria-hidden="true"
            className="epoca-crest relative z-10 h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </div>

        <p
          className={`text-[10px] font-bold uppercase tracking-[0.3em] sm:text-[11px] ${
            escuro ? 'text-yellow-400' : 'text-navy-800'
          }`}
        >
          Época {epocaCurta()}
        </p>

        <h3
          className={`mt-3 font-display text-3xl font-bold uppercase leading-none sm:text-5xl md:text-6xl ${
            escuro ? 'text-white' : 'text-navy-900'
          }`}
        >
          A começar
        </h3>

        <p
          className={`mx-auto mt-4 max-w-md text-[12px] leading-relaxed sm:text-sm ${
            escuro ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {oQueFalta} aparecem aqui assim que a AF Guarda os publicar.
          {detalhe ? ` ${detalhe}` : ''}
        </p>

        {/* Três pontos a acender em sequência: a espera tem pulso. */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="epoca-ponto h-1.5 w-1.5 rounded-full bg-yellow-400"
              style={{ animationDelay: `${i * 0.22}s` }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
