import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, CheckCircle, Loader2, ArrowLeft, Users, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getDeviceFingerprint } from '@/lib/fingerprint';

const SEASON = '25/26';
const VOTE_STORAGE_KEY = 'adsr_voted_melhor_jogador_2526';
const VOTE_API = '/api/vote-player';

type VoteStatus = 'open' | 'closed';

const VOTE_START = new Date('2026-05-03T00:00:00+01:00');
const VOTE_END   = new Date('2026-06-03T23:59:59+01:00');

function getVoteStatus(): VoteStatus {
  const now = new Date();
  if (now < VOTE_START) return 'closed';
  if (now > VOTE_END)   return 'closed';
  return 'open';
}

interface Candidate {
  id: number;
  name: string;
  role: string;
  position_group: string;
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

export function VotingPage() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [votedPlayerId, setVotedPlayerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('Todos');
  const [voteStatus] = useState<VoteStatus>(getVoteStatus);

  const tabs = useMemo(() => {
    const groups = ['Guarda-Redes', 'Defesas', 'Médios', 'Avançados'];
    return ['Todos', ...groups.filter(g => candidates.some(c => c.position_group === g))];
  }, [candidates]);

  const visibleCandidates = useMemo(() => {
    const pool = activeSection === 'Todos'
      ? candidates
      : candidates.filter(c => c.position_group === activeSection);
    return shuffleArray(pool);
  }, [activeSection, candidates]);

  const fetchCandidates = useCallback(async () => {
    const { data } = await supabase
      .from('candidatos_melhor_jogador')
      .select('id, name, role, position_group, image_url')
      .eq('season', SEASON)
      .eq('active', true)
      .order('position_group')
      .order('name');
    if (data) setCandidates(data);
  }, []);

  const checkExistingVote = useCallback(async () => {
    const fp = await getDeviceFingerprint();
    try {
      const res = await fetch(
        `${VOTE_API}?season=${encodeURIComponent(SEASON)}&fp=${encodeURIComponent(fp)}`,
        { signal: AbortSignal.timeout(4000) },
      );
      const isJson = res.headers.get('content-type')?.includes('application/json') ?? false;
      if (res.ok && isJson) {
        const data = await res.json();
        if (data.voted) {
          setVotedPlayerId(data.player_id);
          localStorage.setItem(VOTE_STORAGE_KEY, String(data.player_id));
        } else {
          setVotedPlayerId(null);
          localStorage.removeItem(VOTE_STORAGE_KEY);
        }
        return;
      }
    } catch { /* Edge Function unavailable */ }
    // Fonte de verdade: Supabase direto
    const existingId = await checkVoteInSupabase(fp);
    if (existingId !== null) {
      setVotedPlayerId(existingId);
      localStorage.setItem(VOTE_STORAGE_KEY, String(existingId));
    } else {
      // Sem voto no DB — limpar cache local desatualizado
      setVotedPlayerId(null);
      localStorage.removeItem(VOTE_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = localStorage.getItem(VOTE_STORAGE_KEY);
    if (stored) setVotedPlayerId(parseInt(stored, 10));
    Promise.all([fetchCandidates(), checkExistingVote()]).finally(() => setLoading(false));
  }, [fetchCandidates, checkExistingVote]);

  const handleVote = async (playerId: number) => {
    if (votedPlayerId !== null || voting || voteStatus !== 'open') return;
    setVoting(true);
    const fp = await getDeviceFingerprint();
    let voted = false;

    try {
      const res = await fetch(VOTE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, season: SEASON, fingerprint: fp }),
        signal: AbortSignal.timeout(5000),
      });
      const isJson = res.headers.get('content-type')?.includes('application/json') ?? false;
      if (res.ok && isJson) {
        voted = true;
      } else if (!res.ok && isJson) {
        const data = await res.json().catch(() => ({}));
        if (data.reason === 'already_voted') {
          const existingId: number = data.player_id ?? playerId;
          localStorage.setItem(VOTE_STORAGE_KEY, String(existingId));
          setVotedPlayerId(existingId);
          setVoting(false);
          return;
        }
        if (data.reason === 'closed') {
          setVoting(false);
          return;
        }
      }
      // non-JSON response = SPA fallback (Cloudflare), fall through to Supabase
    } catch { /* Edge Function unavailable */ }

    if (!voted) {
      const result = await saveVoteToSupabase(playerId, fp);
      if (result === 'already_voted') {
        const existingId = await checkVoteInSupabase(fp);
        const id = existingId ?? playerId;
        localStorage.setItem(VOTE_STORAGE_KEY, String(id));
        setVotedPlayerId(id);
        setVoting(false);
        return;
      }
    }

    localStorage.setItem(VOTE_STORAGE_KEY, String(playerId));
    setVotedPlayerId(playerId);
    setJustVoted(true);
    setTimeout(() => setJustVoted(false), 3000);
    setVoting(false);
  };

  const canVote = voteStatus === 'open' && votedPlayerId === null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-navy-900 font-display font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                <Trophy size={14} />
                Época {SEASON}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
                Jogador do Ano
              </h1>
              <p className="mt-3 text-white/50 text-sm sm:text-base max-w-xl">
                Vota no melhor jogador sénior da época {SEASON}. Cada adepto pode votar uma vez.
              </p>
              {voteStatus === 'open' && (
                <p className="mt-2 text-green-400/80 text-xs font-medium">
                  Votação aberta até 3 de Junho
                </p>
              )}
              {voteStatus === 'closed' && (
                <p className="mt-2 text-white/40 text-xs font-medium">
                  Votação encerrada
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-5 py-3 text-white self-start sm:self-auto">
              <Users size={18} className="text-yellow-400" />
              <span className="font-display font-bold text-lg">{candidates.length}</span>
              <span className="text-white/60 text-sm">candidatos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {candidates.length > 0 && (
        <div className="sticky top-[22px] z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-200
                    ${activeSection === tab
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-navy-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Encerrada */}
        {voteStatus === 'closed' && (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Lock size={32} className="text-gray-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-navy-900 uppercase">
              Votação encerrada
            </h2>
            <p className="text-gray-500 text-sm max-w-sm">
              A votação para Jogador do Ano da época {SEASON} encerrou a 3 de Junho de 2026.
              Obrigado a todos os que participaram!
            </p>
          </div>
        )}

        {/* Aberta */}
        {voteStatus === 'open' && (
          <>
            {justVoted && (
              <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl py-3 px-6 mb-8 max-w-sm mx-auto">
                <CheckCircle size={18} />
                <span className="font-semibold text-sm">Voto registado com sucesso!</span>
              </div>
            )}

            {votedPlayerId !== null && !justVoted && (
              <p className="text-center text-gray-400 text-xs mb-8">
                Já votaste nesta época. Obrigado pela tua participação!
              </p>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-navy-900" size={36} />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {visibleCandidates.map(player => {
                  const isVoted = votedPlayerId === player.id;
                  return (
                    <div
                      key={player.id}
                      className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden flex flex-col
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
                        <p className="font-display font-bold text-navy-900 text-xs uppercase leading-tight truncate">
                          {player.name}
                        </p>
                        {player.role && (
                          <p className="text-gray-400 text-xs mt-0.5 truncate">{player.role}</p>
                        )}
                        <button
                          onClick={() => handleVote(player.id)}
                          disabled={!canVote || voting}
                          className={`mt-3 w-full py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
