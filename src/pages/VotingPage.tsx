import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, CheckCircle, Loader2, ArrowLeft, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getDeviceFingerprint } from '@/lib/fingerprint';
import { SQUAD_DATA } from '../constants';

const SEASON = '25/26';
const VOTE_STORAGE_KEY = 'adsr_voted_melhor_jogador_2526';
const PLAYER_SECTIONS = ['Guarda-Redes', 'Defesas', 'Médios', 'Avançados'];
const VOTE_API = '/api/vote-player';

interface PlayerItem {
  id: number;
  name: string;
  role: string;
  image: string;
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
  const [votedPlayerId, setVotedPlayerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('Todos');

  const allPlayers: PlayerItem[] = useMemo(() => {
    const raw = (SQUAD_DATA['SENIORES'] ?? [])
      .filter(s => PLAYER_SECTIONS.includes(s.title))
      .flatMap(s => s.members.map(p => ({ ...p, _section: s.title })));
    return shuffleArray(raw.map(p => ({ id: p.id, name: p.name, role: p.role, image: p.image })));
  }, []);

  const sectionPlayers: PlayerItem[] = useMemo(() => {
    if (activeSection === 'Todos') return allPlayers;
    const raw = (SQUAD_DATA['SENIORES'] ?? [])
      .filter(s => s.title === activeSection)
      .flatMap(s => s.members.map(p => ({ id: p.id, name: p.name, role: p.role, image: p.image })));
    return shuffleArray(raw);
  }, [activeSection, allPlayers]);

  const checkExistingVote = useCallback(async () => {
    const fp = await getDeviceFingerprint();

    // 1. Try Edge Function (IP + fingerprint check, server-side)
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
    } catch { /* Edge Function unavailable */ }

    // 2. Fallback: check Supabase directly by fingerprint
    const existingId = await checkVoteInSupabase(fp);
    if (existingId !== null) {
      setVotedPlayerId(existingId);
      localStorage.setItem(VOTE_STORAGE_KEY, String(existingId));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = localStorage.getItem(VOTE_STORAGE_KEY);
    if (stored) setVotedPlayerId(parseInt(stored, 10));
    checkExistingVote().finally(() => setLoading(false));
  }, [checkExistingVote]);

  const handleVote = async (playerId: number) => {
    if (votedPlayerId !== null || voting) return;
    setVoting(true);

    const fp = await getDeviceFingerprint();
    let voted = false;

    // 1. Try Edge Function (adds IP-level blocking)
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
      }
    } catch { /* Edge Function unavailable — fall through */ }

    // 2. Fallback: save directly to Supabase (always reliable)
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

  const tabs = ['Todos', ...PLAYER_SECTIONS];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 pt-24 pb-12">
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
                Melhor Jogador
              </h1>
              <p className="mt-3 text-white/50 text-sm sm:text-base max-w-xl">
                Vota no teu jogador sénior favorito da época {SEASON}. Cada fã pode votar uma vez.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-5 py-3 text-white self-start sm:self-auto">
              <Users size={18} className="text-yellow-400" />
              <span className="font-display font-bold text-lg">{allPlayers.length}</span>
              <span className="text-white/60 text-sm">jogadores</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-[64px] z-20 bg-white border-b border-gray-100 shadow-sm">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
            {sectionPlayers.map(player => {
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
                      src={player.image}
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
                      disabled={votedPlayerId !== null || voting}
                      className={`mt-3 w-full py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200
                        ${isVoted
                          ? 'bg-yellow-400 text-navy-900 cursor-default'
                          : votedPlayerId !== null
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
      </div>
    </div>
  );
}
