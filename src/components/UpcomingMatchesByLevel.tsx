import React, { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { epocaDesportiva } from '../lib/epoca';
import { EpocaAComecar } from './EpocaAComecar';
import { supabase } from '@/lib/supabase';

/** Escalões que o clube apresenta, pela ordem em que aparecem na secção. */
const AGE_GROUPS = [
  'Traquinas U8',
  'Benjamins U10',
  'Infantis U12',
  'Iniciados U14',
  'Juvenis U16',
  'Juniores U19',
  'Seniores',
];

interface Jogo {
  escalao: string;
  escalao_ordem: number;
  data: string;
  hora: string | null;
  casa: boolean;
  adversario: string;
  adversario_logo: string | null;
  competicao: string | null;
}

const hojeISO = () => new Date().toISOString().slice(0, 10);

function formatarData(data: string): string {
  const d = new Date(`${data}T12:00:00`);
  const texto = d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const UpcomingMatchesByLevel: React.FC = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [estado, setEstado] = useState<'a-carregar' | 'pronto' | 'indisponivel'>('a-carregar');

  useEffect(() => {
    const buscar = async () => {
      const { data, error } = await supabase
        .from('jogos')
        .select('escalao, escalao_ordem, data, hora, casa, adversario, adversario_logo, competicao')
        .eq('epoca', epocaDesportiva())
        .gte('data', hojeISO())
        .order('data', { ascending: true })
        .limit(200);

      // Erro = tabela ainda não criada ou sem sincronização: mantém a mensagem antiga.
      if (error) {
        setEstado('indisponivel');
        return;
      }

      setJogos((data ?? []) as Jogo[]);
      setEstado('pronto');
    };

    buscar();
  }, []);

  // Primeiro jogo de cada escalão (a query já vem ordenada por data).
  const proximo = new Map<string, Jogo>();
  for (const jogo of jogos) {
    if (!proximo.has(jogo.escalao)) proximo.set(jogo.escalao, jogo);
  }

  // Mostra os escalões conhecidos mais os que venham do zerozero e não estejam
  // na lista (ex.: Petizes U7), sem perder a ordem definida pelo clube.
  const extra = [...proximo.values()]
    .filter((j) => !AGE_GROUPS.includes(j.escalao))
    .sort((a, b) => a.escalao_ordem - b.escalao_ordem)
    .map((j) => j.escalao);
  const todosOsEscaloes = [...AGE_GROUPS, ...extra];
  const escaloes = todosOsEscaloes.filter((g) => proximo.has(g));
  const semJogo = todosOsEscaloes.filter((g) => !proximo.has(g));

  return (
    <section className="relative overflow-hidden bg-navy-900 py-10 sm:py-14">
      {/* Halo dourado único da secção — não decorar mais nada com brilho. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.10),transparent_38%)]"
        aria-hidden="true"
      ></div>

      <div className="container relative mx-auto px-4">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
            <h2 className="font-display text-lg font-bold uppercase text-white sm:text-xl md:text-3xl">
              Próximos jogos por escalão
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-300 sm:text-right">
            Atualizado automaticamente a partir do zerozero.pt.
          </p>
        </div>

        {escaloes.length === 0 && estado !== 'a-carregar' && (
          <div className="mx-auto max-w-3xl">
            <EpocaAComecar
              tom="escuro"
              oQueFalta="Os calendários de todos os escalões"
              detalhe="Cada jogo marcado passa a aparecer aqui sem ninguém ter de o escrever."
            />
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {escaloes.map((group) => {
            const jogo = proximo.get(group);

            return (
              <article
                key={group}
                className="flex min-h-24 flex-col justify-between gap-3 rounded-lg border border-white/12 bg-[#03153a]/[0.58] px-4 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-yellow-400/40 motion-safe:hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold uppercase leading-none text-white">
                      {group}
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                      {jogo
                        ? `${formatarData(jogo.data)}${jogo.hora ? ` · ${jogo.hora}` : ''}`
                        : estado === 'pronto'
                          ? 'Sem jogo agendado'
                          : 'Brevemente disponível'}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.07] text-yellow-400">
                    <CalendarDays size={18} strokeWidth={2.5} />
                  </span>
                </div>

                {jogo && (
                  <div className="min-w-0 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          jogo.casa
                            ? 'bg-yellow-400 text-navy-900'
                            : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {jogo.casa ? 'Casa' : 'Fora'}
                      </span>

                      {jogo.adversario_logo && (
                        <img
                          src={jogo.adversario_logo}
                          alt=""
                          className="h-5 w-5 flex-shrink-0 object-contain"
                          loading="lazy"
                        />
                      )}

                      <span className="truncate text-sm font-bold text-white">
                        {jogo.adversario}
                      </span>
                    </div>

                    {jogo.competicao && (
                      <p className="mt-1.5 truncate text-[11px] text-gray-400">{jogo.competicao}</p>
                    )}
                  </div>
                )}
              </article>
            );
          })}

          {/* Escalões sem calendário publicado: cartão de espera com a mesma
              proporção dos reais, para a grelha não perder o ritmo. Só aparece
              no caso misto — quando já há pelo menos um escalão com jogo. */}
          {escaloes.length > 0 &&
            semJogo.map((group) => (
              <article
                key={`espera-${group}`}
                className="flex min-h-24 flex-col justify-between gap-3 rounded-lg border border-white/12 bg-[#03153a]/[0.58] px-4 py-4 opacity-70 backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold uppercase leading-none text-white">
                      {group}
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                      Brevemente
                    </p>
                  </div>

                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.07] text-yellow-400">
                    <CalendarDays size={18} strokeWidth={2.5} />
                  </span>
                </div>

                {/* Duas barras de esqueleto no lugar da data e do adversário,
                    varridas pelo mesmo brilho dourado da EpocaAComecar. */}
                <div className="epoca-sweep relative min-w-0 overflow-hidden border-t border-white/10 pt-3">
                  <div className="h-2.5 w-3/5 rounded bg-white/[0.07]"></div>
                  <div className="mt-2 h-2.5 w-2/5 rounded bg-white/[0.07]"></div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};
