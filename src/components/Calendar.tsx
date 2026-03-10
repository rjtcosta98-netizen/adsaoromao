

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar as CalendarIcon, Loader2, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { TEAM_LOGOS } from '../constants';

const CATEGORIES = [
  { id: 'ALL', label: 'SENIORES', table: 'jogos_futuros_ad_sao_romao' },
  { id: 'SUB19', label: 'SUB19', table: 'jogos_futuros_sub19_ad_sao_romao' },
  { id: 'SUB16', label: 'SUB16', table: 'jogos_futuros_sub16_ad_sao_romao' },
  { id: 'SUB14', label: 'SUB14', table: 'jogos_futuros_sub14_ad_sao_romao' },
];

interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  location: string;
  logoHome?: string;
  logoAway?: string;
}

export const Calendar: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('ALL');
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const itemsToShow = isMobile ? 1 : 3;

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

  // Buscar eventos do Supabase
  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      setError(null);
      setStartIndex(0);

      try {
        // Determinar qual tabela usar
        let tableName = 'jogos_futuros_ad_sao_romao'; // Default para Seniores
        
        if (activeTab === 'SUB14') {
          tableName = 'jogos_futuros_sub14_ad_sao_romao';
        } else if (activeTab === 'SUB16') {
          tableName = 'jogos_futuros_sub16_ad_sao_romao';
        } else if (activeTab === 'SUB19') {
          tableName = 'jogos_futuros_sub19_ad_sao_romao';
        }
        // Para 'ALL', usa a tabela padrão de Seniores (jogos_futuros_ad_sao_romao)

        const { data, error: fetchError } = await supabase
          .from(tableName)
          .select('*')
          .order('data_jogo', { ascending: true });

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

    fetchCalendar();
  }, [activeTab]);

  const filteredMatches = matches;

  // Funções de Navegação
  const nextSlide = () => {
    if (startIndex + 1 <= filteredMatches.length - itemsToShow) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const visibleMatches = filteredMatches.slice(
    startIndex,
    startIndex + itemsToShow
  );

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
    <div className="bg-white pb-20 pt-10 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header com Controlos de Navegação */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 uppercase">
              Calendário <span className="text-yellow-400">Jogos ADSR</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="p-2 bg-navy-900 text-white rounded shadow hover:bg-navy-700 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={startIndex + itemsToShow >= filteredMatches.length}
              className="p-2 bg-navy-900 text-white rounded shadow hover:bg-navy-700 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>
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
          <div className="py-20 flex justify-center bg-white" role="status">
            <Loader2 className="animate-spin text-yellow-400" size={40} />
          </div>
        ) : visibleMatches.length > 0 ? (
          <div
            className={
              isMobile
                ? 'flex justify-center'
                : 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-500 ease-in-out'
            }
          >
            {visibleMatches.map((match) => (
              <div
                key={match.id}
                className={`bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group animate-in fade-in slide-in-from-right-4 ${
                  isMobile ? 'w-full max-w-sm' : ''
                }`}
              >
                <div className="bg-navy-900 p-3 flex justify-between items-center">
                  <span className="text-yellow-400 text-[11px] font-bold uppercase tracking-widest">
                    {match.competition}
                  </span>
                  <span className="text-gray-300 text-[11px] font-bold uppercase tracking-widest">
                    {match.time}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <img
                        src={match.logoHome}
                        loading="lazy"
                        width={56}
                        height={56}
                        className={`w-14 h-14 object-contain group-hover:scale-110 transition-transform ${
                          match.homeTeam === 'AD São Romão' ? 'scale-125' : ''
                        }`}
                        alt={match.homeTeam}
                      />
                      <h3
                        className={`font-bold text-[11px] uppercase text-center leading-tight h-8 flex items-center justify-center ${
                          match.homeTeam === 'AD São Romão'
                            ? 'text-blue-600 font-black'
                            : 'text-navy-900'
                        }`}
                      >
                        {match.homeTeam}
                      </h3>
                    </div>

                    <div className="flex flex-col items-center justify-center min-w-[70px]">
                      <div className="bg-gray-100 text-navy-900 rounded-lg px-2 py-1 font-bold text-lg font-display mb-1">
                        {match.time}
                      </div>
                      <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter">
                        VS
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-1">
                      <img
                        src={match.logoAway}
                        loading="lazy"
                        width={56}
                        height={56}
                        className={`w-14 h-14 object-contain group-hover:scale-110 transition-transform ${
                          match.awayTeam === 'AD São Romão' ? 'scale-125' : ''
                        }`}
                        alt={match.awayTeam}
                      />
                      <h3
                        className={`font-bold text-[11px] uppercase text-center leading-tight h-8 flex items-center justify-center ${
                          match.awayTeam === 'AD São Romão'
                            ? 'text-blue-600 font-black'
                            : 'text-navy-900'
                        }`}
                      >
                        {match.awayTeam}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center justify-center text-gray-500 text-[11px] font-medium">
                      <CalendarIcon size={14} className="text-yellow-500 mr-2" />
                      {match.date}
                    </div>
                    <div className="flex items-center justify-center text-gray-500 text-[11px] font-medium">
                      <MapPin size={14} className="text-red-500 mr-2" />
                      <span className="truncate">
                        {match.location === 'Casa'
                          ? 'Estádio N. Sra. Conceição'
                          : 'Campo Adversário'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto border border-dashed border-gray-200 text-center">
            <Trophy className="text-gray-300 mx-auto mb-4" size={40} />
            <h3 className="text-navy-900 font-bold uppercase text-lg mb-2">
              Sem jogos agendados
            </h3>
            <p className="text-gray-500 text-sm">
              Não existem jogos previstos para este escalão brevemente.
            </p>
          </div>
        )}

        {/* Navigation Indicators */}
        {!loading && filteredMatches.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              {Array.from({
                length: Math.ceil(filteredMatches.length / itemsToShow),
              }).map((_, index) => {
                const isActive = Math.floor(startIndex / itemsToShow) === index;
                return (
                  <button
                    key={index}
                    onClick={() => setStartIndex(index * itemsToShow)}
                    className={`h-2 rounded-full transition-all ${
                      isActive
                        ? 'bg-yellow-400 w-8'
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                );
              })}
            </div>
            <span className="ml-4 text-xs text-gray-500 font-medium">
              {Math.floor(startIndex / itemsToShow) + 1} /{' '}
              {Math.ceil(filteredMatches.length / itemsToShow)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};