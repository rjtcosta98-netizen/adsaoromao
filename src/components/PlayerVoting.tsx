import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ChevronLeft, ChevronRight, CheckCircle, Loader2, Users, Clock, Crown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getDeviceFingerprint } from '@/lib/fingerprint';

const SEASON = '25/26';
const VOTE_STORAGE_KEY = 'adsr_voted_melhor_jogador_2526';
const VOTE_API = '/api/vote-player';

const VOTE_START = new Date('2026-05-03T00:00:00+01:00');
const VOTE_END   = new Date('2026-06-03T23:59:59+01:00');

function getVotingState(): 'soon' | 'open' | 'closed' {
  const now = new Date();
  if (now < VOTE_START) return 'soon';
  if (now > VOTE_END)   return 'closed';
  return 'open';
}

// Countdown hook
function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff % 86_400_000) / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
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

// Countdown unit box
const Unit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy-900 rounded-xl flex items-center justify-center font-display font-black text-2xl sm:text-3xl text-yellow-400 shadow-sm">
      {String(value).padStart(2, '0')}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
  </div>
);

// Brand soccer ball — navy body with gold pentagon panels. Reused across the
// loading screen and the voting verdict so the football motif stays consistent.
const SoccerBall: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({
  size = 40,
  className,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} aria-hidden>
    <defs>
      <radialGradient id="vbBody" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#1b3a73" />
        <stop offset="55%" stopColor="#0c2150" />
        <stop offset="100%" stopColor="#05122f" />
      </radialGradient>
      <radialGradient id="vbSheen" cx="34%" cy="28%" r="40%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#vbBody)" stroke="#FFD700" strokeWidth="1.5" />
    <g stroke="#FFD700" strokeWidth="2.2" strokeLinecap="round" opacity="0.9">
      <line x1="50" y1="34" x2="50" y2="2" />
      <line x1="65.2" y1="45.1" x2="95.6" y2="35.2" />
      <line x1="59.4" y1="62.9" x2="78.2" y2="88.8" />
      <line x1="40.6" y1="62.9" x2="21.8" y2="88.8" />
      <line x1="34.8" y1="45.1" x2="4.4" y2="35.2" />
    </g>
    <polygon points="50,34 65.2,45.1 59.4,62.9 40.6,62.9 34.8,45.1" fill="#FFD700" />
    <g fill="#FFD700" opacity="0.92">
      <polygon points="50,3 58.56,9.22 55.29,19.28 44.71,19.28 41.44,9.22" />
      <polygon points="50,3 58.56,9.22 55.29,19.28 44.71,19.28 41.44,9.22" transform="rotate(72 50 50)" />
      <polygon points="50,3 58.56,9.22 55.29,19.28 44.71,19.28 41.44,9.22" transform="rotate(144 50 50)" />
      <polygon points="50,3 58.56,9.22 55.29,19.28 44.71,19.28 41.44,9.22" transform="rotate(216 50 50)" />
      <polygon points="50,3 58.56,9.22 55.29,19.28 44.71,19.28 41.44,9.22" transform="rotate(288 50 50)" />
    </g>
    <circle cx="50" cy="50" r="48" fill="url(#vbSheen)" />
  </svg>
);

// ════════════════════════════════════════════════════════════════════════════
// CHAMPION REVEAL — closed-voting winner announcement
// A night-stadium celebration: floodlights, pitch markings, falling confetti,
// and the winner's poster framed in gold under a floating crown.
// ════════════════════════════════════════════════════════════════════════════
const WINNER = { name: 'Rafael Santos', role: 'Guarda-redes', poster: '/images/vencedor.png' };

const ClosedVerdict: React.FC<{ season: string }> = ({ season }) => {
  // Ambient gold embers rising off the pitch.
  const sparks = React.useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i % 11) * 0.9,
        dur: 6 + (i % 5) * 1.4,
        size: 2 + (i % 3),
        bright: i % 4 === 0,
      })),
    [],
  );

  // Deterministic celebration confetti falling over the reveal.
  const confetti = React.useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: (i * 53) % 100,
        delay: (i % 13) * 0.42,
        dur: 4.4 + (i % 6) * 0.8,
        size: 5 + (i % 4) * 2,
        rot: (i * 47) % 360,
        color: ['#FFD700', '#caa53d', '#021d40', '#0a2a55'][i % 4],
      })),
    [],
  );

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16">
      <style>{`
        @keyframes sv-orbit { to { transform: rotate(360deg); } }
        @keyframes sv-orbit-rev { to { transform: rotate(-360deg); } }
        @keyframes sv-roll { to { transform: rotate(360deg); } }
        @keyframes sv-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes sv-glow {
          0%,100% { opacity: .55; transform: scale(1); }
          50% { opacity: .9; transform: scale(1.08); }
        }
        @keyframes sv-shimmer { to { background-position: 220% center; } }
        @keyframes sv-rise {
          0% { transform: translateY(20px) scale(.7); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: .7; }
          100% { transform: translateY(-340px) scale(.4); opacity: 0; }
        }
        @keyframes sv-pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: .35; transform: scale(.7); }
        }
        @keyframes sv-tick { 0%,100% { opacity: .25; } 50% { opacity: 1; } }
        @keyframes sv-seal-in {
          0% { transform: rotate(-18deg) scale(1.7); opacity: 0; }
          60% { transform: rotate(-12deg) scale(.92); opacity: 1; }
          100% { transform: rotate(-12deg) scale(1); opacity: 1; }
        }
        @keyframes sv-reveal {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sv-beam-l { 0%,100% { transform: rotate(17deg); opacity: .4; } 50% { transform: rotate(23deg); opacity: .58; } }
        @keyframes sv-beam-r { 0%,100% { transform: rotate(-17deg); opacity: .58; } 50% { transform: rotate(-23deg); opacity: .4; } }
        @keyframes sv-fall {
          0% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(620px) rotate(560deg); opacity: 0; }
        }
        @keyframes sv-pop {
          0% { opacity: 0; transform: translateY(26px) scale(.86); }
          60% { opacity: 1; transform: translateY(0) scale(1.015); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sv-shine { 0% { transform: translateX(-160%) skewX(-18deg); } 60%,100% { transform: translateX(180%) skewX(-18deg); } }
        @keyframes sv-aura { to { transform: rotate(360deg); } }
        @keyframes sv-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .sv-shimmer {
          background: linear-gradient(100deg,#caa53d 0%,#FFD700 18%,#fff7d6 32%,#FFD700 46%,#caa53d 64%,#FFD700 100%);
          background-size: 220% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: sv-shimmer 5.5s linear infinite;
        }
        .sv-pitch { transform: perspective(620px) rotateX(60deg); transform-origin: 50% 100%; }
        .sv-beam {
          position: absolute; top: -34%; width: 56%; height: 130%; filter: blur(34px);
          background: linear-gradient(180deg, rgba(255,200,0,0.22), rgba(255,215,0,0.05) 55%, transparent 80%);
        }
        @media (prefers-reduced-motion: reduce) {
          .sv-anim { animation: none !important; }
        }
      `}</style>

      {/* Warm gold wash on white */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -8%, rgba(255,200,0,0.14), rgba(255,215,0,0) 50%), radial-gradient(80% 60% at 50% 100%, rgba(2,29,64,0.05), rgba(2,29,64,0) 60%)',
        }}
      />
      {/* Floodlights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sv-beam sv-anim" style={{ left: '-16%', transformOrigin: 'top center', animation: 'sv-beam-l 6s ease-in-out infinite' }} />
        <div className="sv-beam sv-anim" style={{ right: '-16%', transformOrigin: 'top center', animation: 'sv-beam-r 6s ease-in-out infinite' }} />
      </div>
      {/* Painted pitch markings */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-14%] mx-auto h-[78%] w-[160%] opacity-70">
        <div className="sv-pitch relative h-full w-full">
          {/* halfway line */}
          <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(2,29,64,.12),transparent)' }} />
          {/* centre circle */}
          <div className="absolute left-1/2 top-1/2 h-[40%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-900/10" />
          {/* centre spot */}
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-900/25" />
          {/* penalty arc (bottom) */}
          <div className="absolute left-1/2 bottom-[-6%] h-[26%] w-[44%] -translate-x-1/2 rounded-full border border-navy-900/[0.08]" />
        </div>
      </div>
      {/* Rising embers */}
      <div className="pointer-events-none absolute inset-0">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="sv-anim absolute bottom-10 rounded-full"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              background: s.bright ? '#e0b520' : '#FFD700',
              boxShadow: `0 0 ${s.bright ? 8 : 5}px rgba(224,170,20,${s.bright ? .5 : .35})`,
              animation: `sv-rise ${s.dur}s ${s.delay}s ease-in infinite`,
            }}
          />
        ))}
      </div>
      {/* Falling celebration confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c, i) => (
          <span
            key={i}
            className="sv-anim absolute top-0"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size * 1.7,
              background: c.color,
              borderRadius: 1,
              transform: `rotate(${c.rot}deg)`,
              animation: `sv-fall ${c.dur}s ${c.delay}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Result kicker */}
        <div
          className="sv-anim inline-flex items-center gap-2.5 rounded-md border border-yellow-400/50 bg-navy-900/[0.03] px-4 py-1.5 shadow-[inset_0_0_18px_rgba(255,215,0,0.06)]"
          style={{ animation: 'sv-reveal .7s .05s both' }}
        >
          <Crown size={13} className="text-[#b8860b]" strokeWidth={2.2} />
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9a7209]">
            Resultado oficial · Época {season}
          </span>
        </div>

        {/* ── CHAMPION BANNER, framed in gold ── */}
        <div
          className="sv-anim relative mx-auto mt-9 w-full max-w-3xl"
          style={{ animation: 'sv-pop .9s .25s both' }}
        >
          {/* floating crown crest */}
          <div
            className="sv-anim absolute -top-6 left-1/2 z-20 -translate-x-1/2 sm:-top-7"
            style={{ animation: 'sv-float 3.6s ease-in-out infinite' }}
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/50 bg-[#04132c] shadow-[0_10px_28px_-8px_rgba(0,0,0,.8)] sm:h-14 sm:w-14">
              <div className="absolute inset-0 rounded-full blur-lg" style={{ background: 'radial-gradient(circle,rgba(255,215,0,.5),transparent 65%)' }} />
              <Crown size={24} className="relative text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,.6)] sm:w-[26px]" strokeWidth={1.8} fill="rgba(255,215,0,0.18)" />
            </div>
          </div>

          {/* the framed banner */}
          <div className="sv-anim relative overflow-hidden rounded-xl border-2 border-yellow-400/70 shadow-[0_34px_90px_-24px_rgba(0,0,0,.85),0_0_60px_rgba(255,215,0,.22)] sm:rounded-2xl" style={{ animation: 'sv-float 5s ease-in-out infinite' }}>
            <img
              src={WINNER.poster}
              alt={`${WINNER.name} — Jogador do Ano da época ${season}, eleito pelos adeptos da AD São Romão`}
              className="block h-auto w-full"
              loading="lazy"
            />
            {/* gold inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 70px rgba(0,0,0,.30)' }} />
            {/* shine sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
              <div
                className="sv-anim absolute inset-y-0 -left-1/3 w-1/3"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.32), transparent)', animation: 'sv-shine 5.5s 1.2s ease-in-out infinite' }}
              />
            </div>
          </div>

          {/* corner ball badges */}
          <div className="absolute -bottom-3.5 -right-2.5 z-20 sv-anim sm:-bottom-4 sm:-right-3" style={{ animation: 'sv-float 4.2s .5s ease-in-out infinite' }}>
            <SoccerBall size={36} className="drop-shadow-[0_6px_14px_rgba(0,0,0,.6)] sm:w-10" />
          </div>
          <div className="absolute -top-3.5 -left-2.5 z-20 sv-anim sm:-top-4 sm:-left-3" style={{ animation: 'sv-float 3.8s .9s ease-in-out infinite' }}>
            <SoccerBall size={28} className="drop-shadow-[0_6px_14px_rgba(0,0,0,.6)] sm:w-8" />
          </div>
        </div>

        {/* Congratulations */}
        <p
          className="sv-anim mt-8 font-display text-xl font-bold uppercase tracking-tight text-navy-900 sm:mt-9 sm:text-2xl"
          style={{ animation: 'sv-reveal .7s .5s both' }}
        >
          Parabéns, <span className="text-[#b8860b]">{WINNER.name}</span>!
        </p>
        <p
          className="sv-anim mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-navy-900/55"
          style={{ animation: 'sv-reveal .7s .58s both' }}
        >
          {WINNER.role} · Eleito pelos adeptos da AD São Romão. Obrigado a todos os que votaram!
        </p>
      </div>
    </section>
  );
};

export const PlayerVoting: React.FC = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Candidate[]>([]);
  const [votedPlayerId, setVotedPlayerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [votingState] = useState(getVotingState);
  const [pendingVoteId, setPendingVoteId] = useState<number | null>(null);
  const countdown = useCountdown(VOTE_START);
  const countdownEnd = useCountdown(VOTE_END);

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
    } catch { /* Edge Function not available */ }
    const existingId = await checkVoteInSupabase(fp);
    if (existingId !== null) {
      setVotedPlayerId(existingId);
      localStorage.setItem(VOTE_STORAGE_KEY, String(existingId));
    } else {
      setVotedPlayerId(null);
      localStorage.removeItem(VOTE_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    // Do NOT pre-populate votedPlayerId from localStorage before the server
    // confirms. A stale localStorage entry (e.g. left over from a shared
    // device or a previous false-positive) would incorrectly show the "already
    // voted" UI to someone who has never actually voted.
    // The server check (checkExistingVote) is the single source of truth.
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
    if (votedPlayerId !== null || voting || votingState !== 'open') return;
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
        if (data.reason === 'closed') { setVoting(false); return; }
      }
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

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + itemsToShow < players.length;
  const visiblePlayers = players.slice(startIndex, startIndex + itemsToShow);
  const canVote = votingState === 'open' && votedPlayerId === null;

  // ── Shared header ────────────────────────────────────────────────────────────
  const header = (
    <div className="text-center mb-8">
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
    </div>
  );

  // ── "Em breve" state ─────────────────────────────────────────────────────────
  if (votingState === 'soon') {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {header}

          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 rounded-full bg-navy-900/5 flex items-center justify-center">
              <Clock size={32} className="text-navy-900" />
            </div>

            <div>
              <p className="font-display font-bold text-navy-900 text-lg uppercase tracking-wide">
                Votação em breve
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Abre a{' '}
                <span className="text-navy-900 font-semibold">
                  {VOTE_START.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </p>
            </div>

            {/* Countdown */}
            <div className="flex items-end gap-2 sm:gap-3">
              <Unit value={countdown.d} label="dias" />
              <span className="text-navy-900/30 font-black text-2xl mb-4">:</span>
              <Unit value={countdown.h} label="horas" />
              <span className="text-navy-900/30 font-black text-2xl mb-4">:</span>
              <Unit value={countdown.m} label="min" />
              <span className="text-navy-900/30 font-black text-2xl mb-4">:</span>
              <Unit value={countdown.s} label="seg" />
            </div>

            <p className="text-gray-400 text-xs max-w-xs">
              Prepara o teu voto! Os candidatos já estão definidos — descobre-os abaixo.
            </p>

            <button
              onClick={() => navigate('/votacao')}
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-display font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-2xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
            >
              <Users size={16} />
              Ver os candidatos
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── "Votação encerrada" state — The Sealed Verdict ───────────────────────────
  if (votingState === 'closed') {
    return <ClosedVerdict season={SEASON} />;
  }

  // ── Open state ───────────────────────────────────────────────────────────────
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {header}

        {/* Countdown to voting end */}
        {votingState === 'open' && (
          <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center gap-3 text-center mb-8">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
              <Clock size={13} />
              Votação termina em
            </div>
            <div className="flex items-end gap-2">
              <Unit value={countdownEnd.d} label="dias" />
              <span className="text-navy-900/30 font-black text-2xl mb-4">:</span>
              <Unit value={countdownEnd.h} label="horas" />
              <span className="text-navy-900/30 font-black text-2xl mb-4">:</span>
              <Unit value={countdownEnd.m} label="min" />
              <span className="text-navy-900/30 font-black text-2xl mb-4">:</span>
              <Unit value={countdownEnd.s} label="seg" />
            </div>
            <p className="text-gray-400 text-[11px]">
              Vota antes de <span className="font-semibold text-navy-900">3 de junho de 2026 às 23:59</span>
            </p>
          </div>
        )}

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
            <div className="relative">
              <div className="flex gap-4 overflow-hidden">
                {visiblePlayers.map(player => {
                  const isVoted = votedPlayerId === player.id;
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
                          onClick={() => setPendingVoteId(player.id)}
                          disabled={!canVote || voting}
                          className={`mt-4 w-full py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-200
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

            {votedPlayerId !== null && !justVoted && (
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
        )}
      </div>

      {/* ── Modal de confirmação de voto ──────────────────────────────────── */}
      {pendingVoteId !== null && (() => {
        const pendingPlayer = players.find(p => p.id === pendingVoteId);
        if (!pendingPlayer) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center gap-5 animate-fade-in-down">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
                <img
                  src={pendingPlayer.image_url}
                  alt={pendingPlayer.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm">Vais votar em</p>
                <p className="font-display font-bold text-navy-900 text-xl uppercase tracking-tight mt-1">
                  {pendingPlayer.name}
                </p>
                {pendingPlayer.role && (
                  <p className="text-gray-400 text-xs mt-0.5">{pendingPlayer.role}</p>
                )}
              </div>
              <p className="text-gray-400 text-xs text-center">
                Só podes votar uma vez. Tens a certeza?
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setPendingVoteId(null)}
                  disabled={voting}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    await handleVote(pendingVoteId);
                    setPendingVoteId(null);
                  }}
                  disabled={voting}
                  className="flex-1 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-navy-900 text-sm font-bold font-display uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {voting ? <Loader2 size={16} className="animate-spin" /> : <Trophy size={16} />}
                  {voting ? 'A votar...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};
