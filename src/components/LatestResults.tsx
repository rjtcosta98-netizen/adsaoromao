

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { TEAM_LOGOS } from '../constants';

const CATEGORIES = [
  { id: 'ALL', label: 'SENIORES', table: 'jogos_ad_sao_romao' },
  { id: 'SUB19', label: 'SUB19', table: 'jogos_sub19_ad_sao_romao' },
  { id: 'SUB16', label: 'SUB16', table: 'jogos_sub16_ad_sao_romao' },
  { id: 'SUB14', label: 'SUB14', table: 'jogos_sub14_ad_sao_romao' },
];

interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition: string;
  location: string;
  logoHome?: string;
  logoAway?: string;
}

export const LatestResults: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('ALL');
  const [isMobile, setIsMobile] = useState(false);

  const itemsToShow = isMobile ? 1 : 5;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedCheck = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };

    checkMobile();
    window.addEventListener('resize', debouncedCheck, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);

  // Buscar resultados do Supabase
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      setStartIndex(0);

      try {
        // Determinar qual tabela usar
        let tableName = 'jogos_ad_sao_romao'; // Default para Seniores
        
        if (activeTab === 'SUB14') {
          tableName = 'jogos_sub14_ad_sao_romao';
        } else if (activeTab === 'SUB16') {
          tableName = 'jogos_sub16_ad_sao_romao';
        } else if (activeTab === 'SUB19') {
          tableName = 'jogos_sub19_ad_sao_romao';
        }
        // Para 'ALL', usa a tabela padrão de Seniores (jogos_ad_sao_romao)

        const { data, error: fetchError } = await supabase
          .from(tableName)
          .select('*')
          .order('data_jogo', { ascending: false });

        if (fetchError) {
          setError(`Erro ao buscar dados: ${fetchError.message}`);
          setMatches([]);
          return;
        }

        if (data) {
          const processedMatches = data.map((match: any) => ({
            id: match.id,
            date: new Date(match.data_jogo).toLocaleDateString('pt-PT'),
            time: match.hora_jogo ? match.hora_jogo.substring(0, 5) : '--:--',
            homeTeam: match.equipa_casa,
            awayTeam: match.equipa_fora,
            homeScore: match.golos_casa,
            awayScore: match.golos_fora,
            competition: match.competicao,
            location: match.casa_fora === 'C' ? 'Casa' : 'Fora',
            logoHome: TEAM_LOGOS[match.equipa_casa] || 'https://via.placeholder.com/150?text=?',
            logoAway: TEAM_LOGOS[match.equipa_fora] || 'https://via.placeholder.com/150?text=?',
          }));
          setMatches(processedMatches);
        }
      } catch (err) {
        setError('Erro ao conectar ao Supabase. Verifique as credenciais.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [activeTab]);

  const nextSlide = () => {
    if (startIndex + 1 <= matches.length - itemsToShow) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const visibleMatches = matches.slice(startIndex, startIndex + itemsToShow);

  if (error) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-red-700 font-bold mb-2">Erro ao carregar dados</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="latest-results" className="bg-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div className="flex items-center gap-3">
             <div className="w-2 h-10 bg-yellow-400"></div>
             <h2 className="text-3xl font-display font-bold text-navy-900 uppercase">Últimos Resultados</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prevSlide} disabled={startIndex === 0} className="p-2 bg-navy-900 text-white rounded disabled:opacity-20"><ChevronLeft size={20} /></button>
            <button onClick={nextSlide} disabled={startIndex + itemsToShow >= matches.length} className="p-2 bg-navy-900 text-white rounded disabled:opacity-20"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 pb-4">
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest transition-all whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-yellow-400 text-navy-900 shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-yellow-400" size={40} /></div>
        ) : matches.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto border border-dashed border-gray-200 text-center">
            <Trophy className="text-gray-300 mx-auto mb-4" size={40} />
            <h3 className="text-navy-900 font-bold uppercase text-lg mb-2">Sem resultados</h3>
            <p className="text-gray-500 text-sm">Não existem resultados disponíveis para este escalão.</p>
          </div>
        ) : (
          <div className={isMobile ? "flex justify-center" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"}>
            {visibleMatches.map((match) => {
              const isSaoRomao = match.homeTeam === 'AD São Romão' || match.awayTeam === 'AD São Romão';
              const saoRomaoScore = match.homeTeam === 'AD São Romão' ? match.homeScore : match.awayScore;
              const opponentScore = match.homeTeam === 'AD São Romão' ? match.awayScore : match.homeScore;
              const isVictory = isSaoRomao && saoRomaoScore > opponentScore;
              const isDraw = isSaoRomao && saoRomaoScore === opponentScore;
              const isDefeat = isSaoRomao && saoRomaoScore < opponentScore;

              return (
                <div key={match.id} className={`bg-white border shadow-lg rounded-lg overflow-hidden group ${isMobile ? 'w-full max-w-sm' : ''} ${
                  isVictory ? 'border-green-400 border-2' : isDraw ? 'border-gray-300' : isDefeat ? 'border-red-400 border-2' : 'border-gray-100'
                }`}>
                  <div className={`px-4 py-2 border-b text-[11px] font-bold text-center uppercase flex items-center justify-center gap-2 ${
                    isVictory ? 'bg-green-50 text-green-700' : isDraw ? 'bg-gray-50 text-gray-400' : isDefeat ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-400'
                  }`}>
                    {isVictory && <span className="text-green-600">✓</span>}
                    {isDraw && <span className="text-gray-500">−</span>}
                    {isDefeat && <span className="text-red-600">✗</span>}
                    <span>{match.date}</span>
                    {isVictory && <span className="ml-2 text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full">VITÓRIA</span>}
                    {isDraw && <span className="ml-2 text-[10px] bg-gray-400 text-white px-2 py-0.5 rounded-full">EMPATE</span>}
                    {isDefeat && <span className="ml-2 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full">DERROTA</span>}
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex flex-col items-center gap-2 w-1/3">
                      <img src={match.logoHome} loading="lazy" width={40} height={40} className={`w-10 h-10 object-contain ${match.homeTeam === 'AD São Romão' ? 'scale-125' : ''}`} alt="Home" />
                      <span className={`text-[11px] font-bold text-center uppercase line-clamp-2 h-6 ${match.homeTeam === 'AD São Romão' ? 'text-blue-600 font-black' : 'text-navy-900'}`}>{match.homeTeam}</span>
                    </div>
                    <div className="flex items-center gap-1 font-display text-2xl font-bold text-navy-900">
                      <span>{match.homeScore}</span><span>-</span><span>{match.awayScore}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-1/3">
                      <img src={match.logoAway} loading="lazy" width={40} height={40} className={`w-10 h-10 object-contain ${match.awayTeam === 'AD São Romão' ? 'scale-125' : ''}`} alt="Away" />
                      <span className={`text-[11px] font-bold text-center uppercase line-clamp-2 h-6 ${match.awayTeam === 'AD São Romão' ? 'text-blue-600 font-black' : 'text-navy-900'}`}>{match.awayTeam}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white border-t text-center text-[11px] text-gray-400 font-bold uppercase">
                    <span className={match.location === 'Casa' ? 'text-navy-900' : 'text-red-500'}>●</span> {match.location} | {match.time}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation Indicators */}
        {!loading && matches.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(matches.length / itemsToShow) }).map((_, index) => {
                const isActive = Math.floor(startIndex / itemsToShow) === index;
                return (
                  <button
                    key={index}
                    onClick={() => setStartIndex(index * itemsToShow)}
                    className={`h-2 rounded-full transition-all ${
                      isActive ? 'bg-yellow-400 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                );
              })}
            </div>
            <span className="ml-4 text-xs text-gray-500 font-medium">
              {Math.floor(startIndex / itemsToShow) + 1} / {Math.ceil(matches.length / itemsToShow)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};