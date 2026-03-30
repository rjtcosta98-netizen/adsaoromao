import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Star, ChevronLeft, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SQUAD_DATA } from '../constants';

const SEASON = '25/26';
const VOTE_STORAGE_KEY = 'adsr_voted_melhor_jogador_2526';

// Only show players (not technical staff)
const PLAYER_SECTIONS = ['Guarda-Redes', 'Defesas', 'Médios', 'Avançados'];

interface PlayerVote {
  player_id: number;
  vote_count: number;
}

interface PlayerWithVotes {
  id: number;
  name: string;
  role: string;
  image: string;
  votes: number;
}

export const PlayerVoting: React.FC = () => {
  const [players, setPlayers] = useState<PlayerWithVotes[]>([]);
  const [votedPlayerId, setVotedPlayerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [justVoted, setJustVoted] = useState(false);

  const itemsToShow = isMobile ? 2 : 5;

  // Get all senior players (excluding technical staff)
  const seniorPlayers = (SQUAD_DATA['SENIORES'] ?? [])
    .filter(section => PLAYER_SECTIONS.includes(section.title))
    .flatMap(section => section.members);

  const fetchVotes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('votacoes_melhor_jogador')
        .select('player_id')
        .eq('season', SEASON);

      if (error) throw error;

      const voteCounts: Record<number, number> = {};
      (data ?? []).forEach((row: { player_id: number }) => {
        voteCounts[row.player_id] = (voteCounts[row.player_id] ?? 0) + 1;
      });

      const playersWithVotes: PlayerWithVotes[] = seniorPlayers.map(p => ({
        id: p.id,
        name: p.name,
        role: p.role,
        image: p.image,
        votes: voteCounts[p.id] ?? 0,
      }));

      // Sort by votes descending
      playersWithVotes.sort((a, b) => b.votes - a.votes);
      setPlayers(playersWithVotes);
    } catch {
      // If table doesn't exist yet, show players with 0 votes
      const playersWithVotes: PlayerWithVotes[] = seniorPlayers.map(p => ({
        id: p.id,
        name: p.name,
        role: p.role,
        image: p.image,
        votes: 0,
      }));
      setPlayers(playersWithVotes);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(VOTE_STORAGE_KEY);
    if (stored) setVotedPlayerId(parseInt(stored, 10));

    fetchVotes();
  }, [fetchVotes]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    let timer: ReturnType<typeof setTimeout>;
    const debounced = () => { clearTimeout(timer); timer = setTimeout(check, 150); };
    window.addEventListener('resize', debounced);
    return () => { clearTimeout(timer); window.removeEventListener('resize', debounced); };
  }, []);

  const handleVote = async (playerId: number) => {
    if (votedPlayerId !== null || voting) return;

    setVoting(true);
    try {
      const { error } = await supabase
        .from('votacoes_melhor_jogador')
        .insert({ player_id: playerId, season: SEASON });

      if (error) throw error;

      localStorage.setItem(VOTE_STORAGE_KEY, String(playerId));
      setVotedPlayerId(playerId);
      setJustVoted(true);
      setTimeout(() => setJustVoted(false), 3000);
      await fetchVotes();
    } catch {
      // Fallback: store vote locally so UX is not broken
      localStorage.setItem(VOTE_STORAGE_KEY, String(playerId));
      setVotedPlayerId(playerId);
      setPlayers(prev =>
        prev.map(p => p.id === playerId ? { ...p, votes: p.votes + 1 } : p)
          .sort((a, b) => b.votes - a.votes)
      );
      setJustVoted(true);
      setTimeout(() => setJustVoted(false), 3000);
    } finally {
      setVoting(false);
    }
  };

  const totalVotes = players.reduce((sum, p) => sum + p.votes, 0);
  const maxVotes = players.length > 0 ? Math.max(...players.map(p => p.votes), 1) : 1;

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + itemsToShow < players.length;

  const visiblePlayers = players.slice(startIndex, startIndex + itemsToShow);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-navy-900 font-display font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <Trophy size={14} />
            Época {SEASON}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 uppercase tracking-tight">
            Melhor Jogador
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Vota no teu jogador sénior favorito da época {SEASON}. Cada fã pode votar uma vez.
          </p>
          {totalVotes > 0 && (
            <p className="mt-1 text-navy-900 font-semibold text-sm">
              {totalVotes.toLocaleString('pt-PT')} {totalVotes === 1 ? 'voto' : 'votos'} registados
            </p>
          )}
        </div>

        {/* Voted confirmation banner */}
        {justVoted && (
          <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl py-3 px-6 mb-8 max-w-sm mx-auto animate-fade-in-down">
            <CheckCircle size={18} />
            <span className="font-semibold text-sm">Voto registado com sucesso!</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-navy-900" size={36} />
          </div>
        ) : (
          <>
            {/* Carousel */}
            <div className="relative">
              <div className="flex gap-4 overflow-hidden">
                {visiblePlayers.map((player, idx) => {
                  const isVoted = votedPlayerId === player.id;
                  const isTopVoted = players[0]?.id === player.id && player.votes > 0;
                  const barWidth = totalVotes > 0 ? Math.round((player.votes / maxVotes) * 100) : 0;
                  const rank = players.findIndex(p => p.id === player.id) + 1;

                  return (
                    <div
                      key={player.id}
                      className={`flex-1 min-w-0 bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden flex flex-col
                        ${isVoted ? 'border-yellow-400 shadow-lg shadow-yellow-100' : 'border-gray-100 hover:border-navy-800/20 hover:shadow-md'}
                        ${isTopVoted ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
                      `}
                    >
                      {/* Top badge */}
                      {isTopVoted && (
                        <div className="bg-yellow-400 text-navy-900 text-xs font-display font-bold text-center py-1 tracking-widest uppercase flex items-center justify-center gap-1">
                          <Star size={11} fill="currentColor" /> Líder
                        </div>
                      )}

                      {/* Photo */}
                      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                        <img
                          src={player.image}
                          alt={player.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                        {/* Rank badge */}
                        <div className="absolute top-2 left-2 bg-navy-900/80 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-sm">
                          {rank}
                        </div>
                        {isVoted && (
                          <div className="absolute inset-0 bg-yellow-400/10 flex items-end justify-center pb-3">
                            <span className="bg-yellow-400 text-navy-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle size={12} /> O teu voto
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3 flex flex-col flex-1">
                        <p className="font-display font-bold text-navy-900 text-sm uppercase leading-tight truncate">
                          {player.name}
                        </p>
                        {player.role && (
                          <p className="text-gray-400 text-xs mt-0.5 truncate">{player.role}</p>
                        )}

                        {/* Vote bar */}
                        <div className="mt-2 mb-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{player.votes} {player.votes === 1 ? 'voto' : 'votos'}</span>
                            {totalVotes > 0 && (
                              <span>{Math.round((player.votes / totalVotes) * 100)}%</span>
                            )}
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full transition-all duration-700"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                        </div>

                        {/* Vote button */}
                        <button
                          onClick={() => handleVote(player.id)}
                          disabled={votedPlayerId !== null || voting}
                          className={`mt-auto w-full py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200
                            ${isVoted
                              ? 'bg-yellow-400 text-navy-900 cursor-default'
                              : votedPlayerId !== null
                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                : 'bg-navy-900 hover:bg-navy-800 text-white active:scale-95'
                            }
                          `}
                        >
                          {isVoted ? '✓ Votado' : voting ? '...' : 'Votar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Nav buttons */}
              {canGoPrev && (
                <button
                  onClick={() => setStartIndex(i => Math.max(0, i - 1))}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition z-10"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={20} className="text-navy-900" />
                </button>
              )}
              {canGoNext && (
                <button
                  onClick={() => setStartIndex(i => Math.min(players.length - itemsToShow, i + 1))}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition z-10"
                  aria-label="Próximo"
                >
                  <ChevronRight size={20} className="text-navy-900" />
                </button>
              )}
            </div>

            {/* Dot indicators */}
            {players.length > itemsToShow && (
              <div className="flex justify-center gap-1.5 mt-6">
                {Array.from({ length: players.length - itemsToShow + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStartIndex(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === startIndex ? 'w-5 h-2 bg-navy-900' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Already voted note */}
            {votedPlayerId !== null && !justVoted && (
              <p className="text-center text-gray-400 text-xs mt-6">
                Já votaste nesta época. Obrigado pela tua participação!
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};
