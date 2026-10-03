import React, { useEffect, useMemo, useState } from 'react';
import { epocaDesportiva } from '../lib/epoca';
import { EpocaAComecar } from './EpocaAComecar';
import { supabase } from '@/lib/supabase';
import { LOGO_URL, TEAM_LOGOS } from '../constants';

interface Linha {
  edicao_id: number | null;
  escalao: string | null;
  escalao_ordem: number | null;
  competicao: string | null;
  epoca: string | null;
  posicao: number;
  equipa: string;
  equipa_logo: string | null;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  diferenca_golos: number;
}

const COLUNAS =
  'edicao_id, escalao, escalao_ordem, competicao, epoca, posicao, equipa, equipa_logo, pontos, jogos, vitorias, empates, derrotas, diferenca_golos';

const ehADSR = (nome: string) => /s[ãa]o rom[ãa]o|s\. rom[ãa]o/i.test(nome);

/**
 * Um escalão pode ter várias competições em simultâneo (1ª fase, 2ª fase, taça).
 * A relevante é aquela em que a ADSR já disputou mais jogos; em caso de empate,
 * a edição mais recente (id maior).
 */
function escolherEdicao(linhas: Linha[]): number | null {
  const porEdicao = new Map<number, { jogos: number }>();

  for (const l of linhas) {
    if (l.edicao_id === null) continue;
    if (!porEdicao.has(l.edicao_id)) porEdicao.set(l.edicao_id, { jogos: 0 });
    if (ehADSR(l.equipa)) porEdicao.get(l.edicao_id)!.jogos = l.jogos;
  }

  let melhor: number | null = null;
  let melhorJogos = -1;

  for (const [id, { jogos }] of porEdicao) {
    if (jogos > melhorJogos || (jogos === melhorJogos && melhor !== null && id > melhor)) {
      melhor = id;
      melhorJogos = jogos;
    }
  }

  return melhor;
}

export const Standings: React.FC = () => {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [escalao, setEscalao] = useState<string | null>(null);

  useEffect(() => {
    const buscar = async () => {
      // Classificações sincronizadas do zerozero, só da época corrente: uma
      // tabela da época passada é pior do que tabela nenhuma.
      const sincronizadas = await supabase
        .from('classificacoes')
        .select(COLUNAS)
        .eq('epoca', epocaDesportiva())
        .not('escalao', 'is', null)
        .order('escalao_ordem', { ascending: true })
        .order('posicao', { ascending: true });

      if (!sincronizadas.error && sincronizadas.data) setLinhas(sincronizadas.data as Linha[]);
      setLoading(false);
    };

    buscar();
  }, []);

  const escaloes = useMemo(() => {
    const vistos = new Map<string, number>();
    for (const l of linhas) {
      if (l.escalao) vistos.set(l.escalao, l.escalao_ordem ?? 99);
    }
    return [...vistos.entries()].sort((a, b) => a[1] - b[1]).map(([nome]) => nome);
  }, [linhas]);

  // Por omissão abre nos Seniores; se não houver, no primeiro escalão disponível.
  const escalaoAtivo =
    escalao ?? (escaloes.includes('Seniores') ? 'Seniores' : (escaloes[0] ?? null));

  const tabela = useMemo(() => {
    if (!escalaoAtivo) return linhas;
    const doEscalao = linhas.filter((l) => l.escalao === escalaoAtivo);
    const edicao = escolherEdicao(doEscalao);
    return edicao === null ? doEscalao : doEscalao.filter((l) => l.edicao_id === edicao);
  }, [linhas, escalaoAtivo]);

  const contexto = tabela[0];
  const ehSeniores = escalaoAtivo === 'Seniores' || escaloes.length === 0;

  // A secção é clara: o estado de carregamento acompanha-a, sem piscar a escuro.
  if (loading)
    return (
      <div className="bg-white py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div>
      </div>
    );

  // Época a arrancar: a AF Guarda ainda não publicou nenhuma classificação.
  // A secção é clara, por isso o bloco de espera acompanha-a.
  if (tabela.length === 0)
    return (
      <div className="relative overflow-hidden bg-white py-10 sm:py-14 md:py-16">
        {/* Halo navy subtil — único gesto de fundo da superfície clara */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]"></div>
        <div className="container relative mx-auto max-w-3xl px-4">
          <EpocaAComecar
            tom="claro"
            oQueFalta="As classificações de todos os escalões"
            detalhe="Basta a primeira jornada para as tabelas começarem a encher-se sozinhas."
          />
        </div>
      </div>
    );

  const visiveis = showAll ? tabela : tabela.slice(0, 5);
  const total = tabela.length;

  const linkZerozero = contexto?.edicao_id
    ? `https://www.zerozero.pt/edicao/-/${contexto.edicao_id}`
    : 'https://www.zerozero.pt/equipa/ad-sao-romao/8062/classificacoes-clube';

  return (
    <div id="classificacoes" className="relative overflow-hidden bg-white py-10 sm:py-16">
      {/* Halo navy subtil — um único por secção, como manda a spec clara */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Cabeçalho */}
        <div className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-bold uppercase text-navy-900 sm:text-xl md:text-3xl">
                  Classificação
                </h2>
                {contexto?.epoca && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-navy-900">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-navy-900"></span>
                    Época {contexto.epoca}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 sm:text-sm">
                {contexto?.competicao ?? 'Campeonato Distrital 1ª Divisão'}
              </span>
            </div>
          </div>
          <a
            href={linkZerozero}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-widest text-gray-600 border-b-2 border-transparent transition-colors hover:border-yellow-400 hover:text-navy-900 sm:text-sm"
          >
            Ver Tabela Completa
          </a>
        </div>

        {/* Escalões — mesmas classes das pills usadas em Equipas */}
        {escaloes.length > 1 && (
          <div className="mb-6 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {escaloes.map((nome) => (
                <button
                  key={nome}
                  onClick={() => {
                    setEscalao(nome);
                    setShowAll(false);
                  }}
                  className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                    nome === escalaoAtivo
                      ? 'bg-yellow-400 text-navy-900'
                      : 'border border-navy-900/15 text-gray-600 hover:border-yellow-400 hover:text-navy-900'
                  }`}
                >
                  {nome}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Legenda (só faz sentido no campeonato de seniores) */}
        {ehSeniores && (
          <div className="mb-6 flex flex-wrap gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
              <span className="text-gray-600 font-medium">Campeão - Promoção ao Campeonato de Portugal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-500"></div>
              <span className="text-gray-600 font-medium">Qualificação - Taça de Portugal 2026/2027</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
              <span className="text-gray-600 font-medium">Despromoção</span>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-navy-900/10 bg-white shadow-[0_18px_50px_rgba(3,21,58,0.08)] transition-all duration-300 hover:border-yellow-400/60 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)]">
          {tabela.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-navy-900 font-semibold mb-2">Nenhuma classificação disponível</p>
              <p className="text-gray-500 text-sm">Os dados da classificação serão carregados em breve.</p>
            </div>
          ) : (
            <table className="w-full text-xs sm:text-sm text-left table-fixed">
              <thead className="bg-navy-900/[0.05] text-gray-600 uppercase font-display tracking-wider">
                <tr>
                  <th className="w-10 sm:w-16 px-2 sm:px-6 py-4 text-center">Pos</th>
                  <th className="w-auto px-2 sm:px-6 py-4">Clube</th>
                  <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden min-[380px]:table-cell">J</th>
                  <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden sm:table-cell">V</th>
                  <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden sm:table-cell">E</th>
                  <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden sm:table-cell">D</th>
                  <th className="w-10 sm:w-20 px-1 sm:px-4 py-4 text-center hidden md:table-cell">DG</th>
                  <th className="w-12 sm:w-24 px-2 sm:px-6 py-4 text-center font-bold text-navy-900">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900/10">
                {visiveis.map((row, index) => {
                  const teamName = String(row.equipa || '').trim();
                  const isHomeTeam = ehADSR(teamName);
                  const position = Number(row.posicao);
                  const logo = row.equipa_logo ?? TEAM_LOGOS[teamName] ?? (isHomeTeam ? LOGO_URL : null);

                  // Selo da posição: a cor só aparece quando a posição tem
                  // significado real (subida, taça ou descida) — nunca como
                  // decoração pura. Fora dos seniores só o 1º lugar conta.
                  let seloClasse = 'bg-navy-900/[0.06] text-navy-900';
                  if (ehSeniores) {
                    if (position === 1) {
                      seloClasse = 'bg-green-500 text-navy-900';
                    } else if (position === 2) {
                      seloClasse = 'bg-cyan-500 text-navy-900';
                    } else if (position >= total - 1) {
                      seloClasse = 'bg-red-500/10 text-red-600 border border-red-500/30';
                    }
                  } else if (position === 1) {
                    seloClasse = 'bg-green-500 text-navy-900';
                  }

                  return (
                    <tr
                      key={`${row.edicao_id}-${teamName}-${index}`}
                      className={`transition-colors ${
                        isHomeTeam
                          ? 'bg-yellow-400/[0.12] ring-1 ring-inset ring-yellow-400/40'
                          : 'hover:bg-navy-900/[0.03]'
                      }`}
                    >
                      {/* Posição */}
                      <td className="px-2 sm:px-6 py-3 sm:py-4 text-center">
                        <span className={`tabular-nums inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs font-bold ${seloClasse}`}>
                          {row.posicao}
                        </span>
                      </td>

                      {/* Clube + Logo */}
                      <td className="px-2 sm:px-6 py-3 sm:py-4 overflow-hidden">
                        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                          <div className="flex-shrink-0">
                            {logo ? (
                              <img src={logo} alt="" className={`w-5 h-5 sm:w-6 sm:h-6 object-contain ${isHomeTeam ? 'scale-125' : ''}`} loading="lazy" />
                            ) : (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-navy-900/10 rounded-full" />
                            )}
                          </div>
                          <span className={`uppercase tracking-tight truncate text-[11px] sm:text-xs md:text-sm ${isHomeTeam ? 'text-navy-900 font-black' : 'text-gray-600 font-bold'}`}>
                            {teamName}
                          </span>
                        </div>
                      </td>

                      {/* Estatísticas (Hiding dinâmico) */}
                      <td className="tabular-nums px-1 sm:px-4 py-3 sm:py-4 text-center font-medium text-gray-600 hidden min-[380px]:table-cell">{row.jogos}</td>
                      <td className="tabular-nums px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-gray-500">{row.vitorias}</td>
                      <td className="tabular-nums px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-gray-500">{row.empates}</td>
                      <td className="tabular-nums px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-gray-500">{row.derrotas}</td>
                      <td className="tabular-nums px-1 sm:px-4 py-3 sm:py-4 text-center hidden md:table-cell text-gray-500 font-mono text-[11px]">{row.diferenca_golos}</td>

                      {/* Pontos */}
                      <td className="tabular-nums px-2 sm:px-6 py-3 sm:py-4 text-center font-display font-black text-sm sm:text-xl text-navy-900">
                        {row.pontos}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Botão Ver Mais */}
        {!showAll && total > 5 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 px-8 rounded-lg uppercase text-sm tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Ver Tabela Completa ({total - 5} equipas)
            </button>
          </div>
        )}

        {showAll && total > 10 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(false)}
              className="border border-navy-900/20 text-navy-900 hover:bg-navy-900 hover:text-white font-bold py-3 px-8 rounded-lg uppercase text-sm tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Ver Menos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
