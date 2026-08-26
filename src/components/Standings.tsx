

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { LOGO_URL, TEAM_LOGOS } from '../constants';

interface StandingRow {
  Pos: string | number;
  Equipa: string;
  P: string | number;
  J: string | number;
  V: string | number;
  E: string | number;
  D: string | number;
  DG: string | number;
}

export const Standings: React.FC = () => {
  const [data, setData] = useState<StandingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const { data, error } = await supabase
          .from('classificacoes')
          .select('*')
          .order('posicao', { ascending: true })
          .limit(14);

        if (error) {
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const transformedData: StandingRow[] = data.map((row) => {
            return {
              Pos: row.posicao,
              Equipa: row.equipa,
              P: row.pontos,
              J: row.jogos,
              V: row.vitorias,
              E: row.empates,
              D: row.derrotas,
              DG: row.diferenca_golos,
            };
          });
          setData(transformedData);
        } else {
          setData([]);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) return (
    <div className="bg-white py-16 text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div>
    </div>
  );

  const displayedData = showAll ? data : data.slice(0, 5);
  const totalTeams = data.length;

  return (
    <div id="classificacoes" className="section-y seam-light relative overflow-hidden bg-paper text-navy-900">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="kicker-rule" aria-hidden="true" />
              <p className="font-display text-[11px] font-semibold uppercase tracking-kicker text-gold-600">
                Campeonato Distrital 1ª Divisão
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h2 className="font-display text-[clamp(1.85rem,5vw,3rem)] font-bold uppercase leading-[0.92] text-navy-900">
                Classificação
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-400/15 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-gold-700">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500"></span>
                Época 2025/26 Concluída
              </span>
            </div>
          </div>
          <a href="https://www.zerozero.pt/competicao/af-guarda-1-divisao?simp=0" target="_blank" rel="noopener noreferrer" className="shrink-0 self-start text-navy-900 font-bold text-xs border-b-2 border-gold-400 pb-0.5 hover:text-gold-600 transition-colors uppercase tracking-widest md:self-auto md:pb-1">
            Ver Tabela Completa
          </a>
        </div>

        {/* Legenda */}
        <div className="mb-6 flex flex-wrap gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
            <span className="text-navy-900/70 font-medium">Campeão - Promoção ao Campeonato de Portugal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-navy-700"></div>
            <span className="text-navy-900/70 font-medium">Qualificação - Taça de Portugal 2026/2027</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
            <span className="text-navy-900/70 font-medium">Despromoção</span>
          </div>
        </div>

        <div className="shadow-card-hover rounded-2xl overflow-hidden border border-bone-200">
          {data.length === 0 ? (
            <div className="bg-white p-8 text-center">
              <p className="text-navy-900/60 font-semibold mb-2">Nenhuma classificação disponível</p>
              <p className="text-navy-900/45 text-sm">Os dados da classificação serão carregados em breve.</p>
            </div>
          ) : (
          <table className="w-full text-xs sm:text-sm text-left table-fixed">
            <thead className="bg-navy-900 text-white uppercase font-display tracking-wider">
              <tr>
                <th className="w-10 sm:w-16 px-2 sm:px-6 py-4 text-center">Pos</th>
                <th className="w-auto px-2 sm:px-6 py-4">Clube</th>
                <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden min-[380px]:table-cell">J</th>
                <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden sm:table-cell">V</th>
                <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden sm:table-cell">E</th>
                <th className="w-8 sm:w-16 px-1 sm:px-4 py-4 text-center hidden sm:table-cell">D</th>
                <th className="w-10 sm:w-20 px-1 sm:px-4 py-4 text-center hidden md:table-cell">DG</th>
                <th className="w-12 sm:w-24 px-2 sm:px-6 py-4 text-center font-bold text-gold-400">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-200">
              {displayedData.map((row, index) => {
                const teamName = String(row.Equipa || '').trim();
                const isHomeTeam = teamName.toLowerCase().includes('são romão') || teamName.toLowerCase().includes('s. romão');
                const points = String(row.P || '').replace(/\*/g, '');
                const position = Number(row.Pos);
                
                // Determinar cor de fundo baseado na posição
                let positionBgColor = '';
                if (position === 1) {
                  positionBgColor = 'bg-green-500/30 border-l-4 border-green-500';
                } else if (position === 2) {
                  positionBgColor = 'bg-navy-700/20 border-l-4 border-navy-700';
                } else if (position === 13 || position === 14) {
                  positionBgColor = 'bg-red-500/10 border-l-4 border-red-500';
                }

                return (
                  <tr key={index} className={`bg-paper hover:bg-bone transition-colors ${positionBgColor}`}>
                    {/* Posição */}
                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-center font-bold text-navy-900">
                      <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs ${index < 3 ? 'bg-navy-900 text-white' : 'text-navy-900/60'}`}>
                        {row.Pos}
                      </span>
                    </td>

                    {/* Clube + Logo */}
                    <td className="px-2 sm:px-6 py-3 sm:py-4 overflow-hidden">
                      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                        <div className="flex-shrink-0">
                          {TEAM_LOGOS[teamName] ? (
                            <img src={TEAM_LOGOS[teamName]} alt="" className={`w-5 h-5 sm:w-6 sm:h-6 object-contain ${isHomeTeam ? 'scale-125' : ''}`} loading="lazy" />
                          ) : (
                            isHomeTeam ? <img src={LOGO_URL} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain scale-125" /> : <div className="w-5 h-5 sm:w-6 sm:h-6 bg-bone-200 rounded-full" />
                          )}
                        </div>
                        <span className={`font-bold uppercase tracking-tight truncate text-[11px] sm:text-xs md:text-sm ${isHomeTeam ? 'text-navy-900 font-black' : 'text-navy-900/70'}`}>
                          {teamName}
                        </span>
                      </div>
                    </td>

                    {/* Estatísticas (Hiding dinâmico) */}
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center font-medium text-navy-900 hidden min-[380px]:table-cell">{row.J}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-navy-900/60">{row.V}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-navy-900/60">{row.E}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-navy-900/60">{row.D}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden md:table-cell text-navy-900/45 font-mono text-[11px]">{row.DG}</td>
                    
                    {/* Pontos */}
                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-center font-display font-black text-sm sm:text-xl text-navy-900">
                      {points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          )}
        </div>

        {/* Botão Ver Mais */}
        {!showAll && data.length > 5 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 px-8 rounded-lg uppercase text-sm tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Ver Tabela Completa ({totalTeams - 5} equipas)
            </button>
          </div>
        )}

        {showAll && data.length > 10 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(false)}
              className="bg-navy-900 hover:bg-navy-700 text-white font-bold py-3 px-8 rounded-full uppercase text-sm tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Ver Menos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};