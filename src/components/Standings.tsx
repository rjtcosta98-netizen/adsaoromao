

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
    <div id="classificacoes" className="bg-white py-10 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-8 sm:w-2 sm:h-10 bg-yellow-400"></div>
             <div>
               <div className="flex items-center gap-2 flex-wrap">
                 <h2 className="text-2xl sm:text-4xl font-display font-bold text-navy-900 uppercase leading-none">Classificação</h2>
                 <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-300">
                   <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                   Época 2025/26 Concluída
                 </span>
               </div>
               <span className="text-gray-400 text-[11px] sm:text-sm font-bold uppercase tracking-widest">Campeonato Distrital 1ª Divisão</span>
             </div>
          </div>
          <a href="https://www.zerozero.pt/competicao/af-guarda-1-divisao?simp=0" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 text-navy-900 font-bold text-[11px] sm:text-sm border-b-2 border-transparent hover:border-yellow-400 transition-colors uppercase tracking-widest">
            Ver Tabela Completa
          </a>
        </div>

        {/* Legenda */}
        <div className="mb-6 flex flex-wrap gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-700 font-medium">Campeão - Promoção ao Campeonato de Portugal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-800"></div>
            <span className="text-gray-700 font-medium">Qualificação - Taça de Portugal 2026/2027</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-400"></div>
            <span className="text-gray-700 font-medium">Despromoção</span>
          </div>
        </div>

        <div className="shadow-2xl rounded-xl overflow-hidden border border-gray-100">
          {data.length === 0 ? (
            <div className="bg-white p-8 text-center">
              <p className="text-gray-500 font-semibold mb-2">Nenhuma classificação disponível</p>
              <p className="text-gray-400 text-sm">Os dados da classificação serão carregados em breve.</p>
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
                <th className="w-12 sm:w-24 px-2 sm:px-6 py-4 text-center font-bold text-yellow-400">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
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
                  positionBgColor = 'bg-cyan-800/30 border-l-4 border-cyan-800';
                } else if (position === 13 || position === 14) {
                  positionBgColor = 'bg-red-400/10 border-l-4 border-red-400';
                }

                return (
                  <tr key={index} className={`bg-white hover:bg-gray-50 transition-colors ${positionBgColor}`}>
                    {/* Posição */}
                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-center font-bold text-navy-900">
                      <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs ${index < 3 ? 'bg-navy-900 text-white' : 'text-gray-500'}`}>
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
                            isHomeTeam ? <img src={LOGO_URL} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain scale-125" /> : <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-full" />
                          )}
                        </div>
                        <span className={`font-bold uppercase tracking-tight truncate text-[11px] sm:text-xs md:text-sm ${isHomeTeam ? 'text-blue-600 font-black' : 'text-gray-600'}`}>
                          {teamName}
                        </span>
                      </div>
                    </td>

                    {/* Estatísticas (Hiding dinâmico) */}
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center font-medium text-gray-900 hidden min-[380px]:table-cell">{row.J}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-gray-500">{row.V}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-gray-500">{row.E}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden sm:table-cell text-gray-500">{row.D}</td>
                    <td className="px-1 sm:px-4 py-3 sm:py-4 text-center hidden md:table-cell text-gray-400 font-mono text-[11px]">{row.DG}</td>
                    
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
              className="bg-gray-200 hover:bg-gray-300 text-navy-900 font-bold py-3 px-8 rounded-lg uppercase text-sm tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Ver Menos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};