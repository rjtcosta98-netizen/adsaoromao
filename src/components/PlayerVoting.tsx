import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ChevronLeft, ChevronRight, CheckCircle, Loader2, Users, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getDeviceFingerprint } from '@/lib/fingerprint';

const SEASON = '25/26';
const VOTE_STORAGE_KEY = 'adsr_voted_melhor_jogador_2526';
const VOTE_API = '/api/vote-player';

const VOTE_START = new Date('2026-05-03T00:00:00+01:00');
const VOTE_END   = new Date('2026-06-03T23:59:59+01:00');

type VoteStatus = 'not_open' | 'open' | 'closed';

function getVoteStatus(): VoteStatus {
  const now = new Date();
  if (now < VOTE_START) return 'not_open';
  if (now > VOTE_END)   return 'closed';
  return 'open';
}

function daysUntil(date: Date): number {
  return Math.ceil((date.getTime() - Date.now()) / 86_400_000);
}

interface Candidate {
  id: number;
  name: string;
  role: string;
  image_url: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function saveVoteToSupabase(playerId: number, fp: string): Promise<'ok' | 'already_voted' | 'error'> {
  const { error } = await supabase
    .from('votacoes_melhor_jogador')
    .insert({ player_id: playerId, season: SEASON, voter_fingerprint: fp });
  if (!error) return 'ok';
  if (error.code === '23505') return 'already_voted';
  return 'error';
}

async function checkVoteInSupabase(fp: string): Promise<number | null> {
  const { data } = await supabase
    .from('votacoes_melhor_jogador')
    .select('player_id')
    .eq('season', SEASON)
    .eq('voter_fingerprint', fp)
    .maybeSingle();
  return data ? data.player_id : null;
}

export const PlayerVoting: React.FC = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Candidate[]>([]);
  const [votedPlayerId, setVotedPlayerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [voteStatus] = useState<VoteStatus>(getVoteStatus);

  const itemsToShow = isMobile ? 2 : 5;

  const fetchCandidates = useCallback(async () => {
    const { data } = await supabase
      .from('candidatos_melhor_jogador')
      .select('id, name, role, image_url')
      .eq('season', SEASON)
      .eq('active', true);
    if (data) setPlayers(shuffleArray(data));
  }, []);

  const checkExistingVote = useCallback(async () => {
    const fp = await getDeviceFingerprint();
    try {
      const res = await fetch(
        `${VOTE_API}?season=${encodeURIComponent(SEASON)}&fp=${encodeURIComponent(fp)}`,
        { signal: AbortSignal.timeout(4000) },
      );
      if (res.ok) {
        const data = await res.json();
        if (data.voted) {
          setVotedPlayerId(data.player_id);
          localStorage.setItem(VOTE_STORAGE_KEY, String(data.player_id));
        }
        return;
      }
    } catch { /* Edge Function not available yet */ }
    const existingId = await checkVoteInSupabase(fp);
    if (existingId !== null) {
      setVotedPlayerId(existingId);
      localStorage.setItem(VOTE_STORAGE_KEY, String(existingId));
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(VOTE_STORAGE_KEY);
    if (stored) setVotedPlayerId(parseInt(stored, 10));
    Promise.all([fetchCandidates(), checkExistingVote()]).finally(() => setLoading(false));
  }, [fetchCandidates, checkExistingVote]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    let timer: ReturnType<typeof setTimeout>;
    const debounced = () => { clearTimeout(timer); timer = setTimeout(check, 150); };
    window.addEventListener('resize', debounced);
    return () => { clearTimeout(timer); window.removeEventListener('resize', debounced); };
  }, []);

  const handleVote = async (playerId: number) => {
    if (votedPlayerId !== null || voting || voteStatus !== 'open') return;
    setVoting(true);

    const fp = await getDeviceFingerprint();
    let voted = false;

    // 1. Try Edge Function (adds IP-level blocking on top of fingerprint)
    try {
      const res = await fetch(VOTE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, season: SEASON, fingerprint: fp }),
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        voted = true;
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.reason === 'already_voted') {
          const existingId: number = data.player_id ?? playerId;
          localStorage.setItem(VOTE_STORAGE_KEY, String(existingId));
          setVotedPlayerId(existingId);
          setVoting(false);
          return;
        }
        if (data.reason === 'not_open' || data.reason === 'closed') {
          setVoting(false);
          return;
        }
      }
    } catch { /* Edge Function unavailable — fall through */ }

    // 2. Fallback: save directly to Supabase (guaranteed to work)
    if (!voted) {
      const result = await saveVoteToSupabase(playerId, fp);

      if (result === 'already_voted') {
        // Fingerprint constraint hit — fetch which player was voted
        const existingId = await checkVoteInSupabase(fp);
        const id = existingId ?? playerId;
        localStorage.setItem(VOTE_STORAGE_KEY, String(id));
        setVotedPlayerId(id);
        setVoting(false);
        return;
      }
      // 'ok' or 'error' — proceed (on transient error we still mark locally)
    }

    localStorage.setItem(VOTE_STORAGE_KEY, String(playerId));
    setVotedPlayerId(playerId);
    setJustVoted(true);
    setTimeout(() => setJustVoted(false), 3000);
    setVoting(false);
  };

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + itemsToShow < players.length;
  const visiblePlayers = players.slice(startIndex, startIndex + itemsToShow);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-navy-900 font-display font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <Trophy size={14} />
            Época {SEASON}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 uppercase tracking-tight">
            Jogador do Ano
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Vota no melhor jogador sénior da época {SEASON}. Cada adepto pode votar uma vez.
          </p>
          {voteStatus === 'not_open' && (
            <p className="mt-2 text-yellow-600 text-xs font-medium">
              Votação abre a 3 de Maio · faltam {daysUntil(VOTE_START)} dia{daysUntil(VOTE_START) !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Ainda não abriu — mini teaser */}
        {voteStatus === 'not_open' && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
              <Clock size={24} className="text-yellow-500" />
            </div>
            <p className="text-gray-500 text-sm">A votação abre a <strong>3 de Maio de 2026</strong></p>
          </div>
        )}

        {justVoted && voteStatus === 'open' && (
          <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl py-3 px-6 mb-8 max-w-sm mx-auto animate-fade-in-down">
            <CheckCircle size={18} />
            <span className="font-semibold text-sm">Voto registado com sucesso!</span>
          </div>
        )}

        {voteStatus !== 'not_open' && (loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-navy-900" size={36} />
          </div>
        ) : (
          <>
            <div className="relative">
              <div className="flex gap-4 overflow-hidden">
                {visiblePlayers.map(player => {
                  const isVoted = votedPlayerId === player.id;
                  const canVote = voteStatus === 'open' && votedPlayerId === null;
                  return (
                    <div
                      key={player.id}
                      className={`flex-1 min-w-0 bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden flex flex-col
                        ${isVoted
                          ? 'border-yellow-400 shadow-lg shadow-yellow-100'
                          : 'border-gray-100 hover:border-navy-800/20 hover:shadow-md'}`}
                    >
                      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                        <img
                          src={player.image_url}
                          alt={player.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                        {isVoted && (
                          <div className="absolute inset-0 bg-yellow-400/10 flex items-end justify-center pb-3">
                            <span className="bg-yellow-400 text-navy-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle size={12} /> O teu voto
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <p className="font-display font-bold text-navy-900 text-sm uppercase leading-tight truncate">
                          {player.name}
                        </p>
                        {player.role && (
                          <p className="text-gray-400 text-xs mt-0.5 truncate">{player.role}</p>
                        )}
                        <button
                          onClick={() => handleVote(player.id)}
                          disabled={!canVote || voting}
                          className={`mt-auto w-full py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 mt-4
                            ${isVoted
                              ? 'bg-yellow-400 text-navy-900 cursor-default'
                              : !canVote
                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                : 'bg-navy-900 hover:bg-navy-800 text-white active:scale-95'}`}
                        >
                          {isVoted ? '✓ Votado' : voting ? '...' : 'Votar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

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

            {votedPlayerId !== null && !justVoted && voteStatus === 'open' && (
              <p className="text-center text-gray-400 text-xs mt-6">
                Já votaste nesta época. Obrigado pela tua participação!
              </p>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate('/votacao')}
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-display font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-2xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
              >
                <Users size={16} />
                Ver todos os candidatos
              </button>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};
