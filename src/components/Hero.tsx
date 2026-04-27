
import React, { useEffect, useState } from 'react';
import { Calendar, Trophy, MapPin, Star, Bus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { TEAM_LOGOS } from '../constants';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

// Jogo especial em destaque — Taça de Honra Distrital da Guarda (Quartos de Final)
const FEATURED_MATCH = {
  homeTeam: 'Guarda FC',
  awayTeam: 'AD São Romão',
  date: '03/05/2025',
  time: '15:15',
  location: 'Estádio Municipal da Guarda',
  competition: 'Taça de Honra Distrital da Guarda',
  round: 'Quartos de Final',
  homeLogo: TEAM_LOGOS['Guarda FC'] || 'https://cdn-icons-png.flaticon.com/512/1273/1273736.png',
  awayLogo: TEAM_LOGOS['AD São Romão'] || '',
};

const CROWD_CHANTS = [
  'Rumo às meias-finais',
  'Orgulho serrano',
  'Força AD São Romão',
  'Amarelo e azul até ao fim',
];

const HERO_CONFETTI = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: `${2 + (i * 3.9) % 96}%`,
  delay: `${(i * 0.28) % 4}s`,
  dur: `${4.2 + (i * 0.17) % 2.1}s`,
  rot: `${(i * 37) % 360}deg`,
  width: i % 3 === 0 ? 10 : 7,
  height: i % 3 === 0 ? 3 : 2,
  color: i % 2 === 0 ? '#ffd700' : '#4aa8ff',
}));

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [nextMatch, setNextMatch] = useState<{
    homeTeam?: string;
    awayTeam?: string;
    date?: string;
    time?: string;
    location?: string;
    homeLogo?: string;
    awayLogo?: string;
  }>(FEATURED_MATCH);

  useEffect(() => {
    async function fetchMatchData() {
      try {
        const { data, error } = await supabase
          .from('jogos_futuros_ad_sao_romao')
          .select('*')
          .order('data_jogo', { ascending: true })
          .limit(1);

        if (error || !data || data.length === 0) return;

        const match = data[0];
        const homeTeam = match.equipa_casa;
        const awayTeam = match.equipa_fora;

        // Manter o jogo especial da Taça em destaque
        const matchDate = new Date(match.data_jogo).toLocaleDateString('pt-PT');
        if (matchDate === FEATURED_MATCH.date && match.hora_jogo?.startsWith('15:15')) return;

        setNextMatch({
          homeTeam,
          awayTeam,
          date: matchDate,
          time: match.hora_jogo.substring(0, 5),
          location: match.casa_fora === 'C' ? 'Estádio N. Sra. Conceição' : awayTeam || 'Fora',
          homeLogo:
            TEAM_LOGOS[homeTeam] ||
            'https://res.cloudinary.com/dc7zy0p4q/image/upload/v1768903055/608195712_1464591145667195_3693066190005632417_n-removebg-preview_sz4jxd.png',
          awayLogo: TEAM_LOGOS[awayTeam] || 'https://cdn-icons-png.flaticon.com/512/1273/1273736.png',
        });
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    }

    fetchMatchData();
  }, []);

  const isFeatured =
    nextMatch.homeTeam === FEATURED_MATCH.homeTeam &&
    nextMatch.awayTeam === FEATURED_MATCH.awayTeam;

  return (
    <div className="relative min-h-screen md:min-h-[100vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* ── Cup atmosphere: stadium beams ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
        {[
          { left: '10%', rot: '-28deg', opacity: 0.22 },
          { left: '28%', rot: '-10deg', opacity: 0.15 },
          { left: '48%', rot:   '4deg', opacity: 0.18 },
          { left: '68%', rot:  '18deg', opacity: 0.14 },
          { left: '85%', rot:  '34deg', opacity: 0.20 },
        ].map((b, i) => (
          <div key={i} className="absolute top-0"
            style={{
              left: b.left,
              width: '120px',
              height: '85%',
              background: 'linear-gradient(to bottom, rgba(248,212,35,1), transparent)',
              transform: `rotate(${b.rot})`,
              transformOrigin: 'top center',
              filter: 'blur(28px)',
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Cup atmosphere: falling gold sparks ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
        {Array.from({ length: 22 }, (_, i) => ({
          left: `${4 + (i * 4.4) % 93}%`,
          delay: `${(i * 0.41) % 4}s`,
          dur: `${3.2 + (i * 0.22) % 2.2}s`,
          size: i % 4 === 0 ? 5 : i % 4 === 1 ? 3 : i % 4 === 2 ? 4 : 2,
          opacity: 0.45 + (i % 5) * 0.09,
        })).map((p, i) => (
          <div key={i} className="absolute rounded-full hero-spark"
            style={{
              left: p.left,
              top: '-8px',
              width: p.size,
              height: p.size,
              background: i % 6 === 0 ? '#fff' : '#f8d423',
              opacity: p.opacity,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ── Cup atmosphere: grain texture ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* ── Cup atmosphere: blue/yellow confetti strips ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden>
        {HERO_CONFETTI.map(item => (
          <div
            key={item.id}
            className="absolute hero-confetti"
            style={{
              left: item.left,
              top: '-12px',
              width: item.width,
              height: item.height,
              borderRadius: 999,
              background: item.color,
              transform: `rotate(${item.rot})`,
              animationDuration: item.dur,
              animationDelay: item.delay,
              opacity: 0.75,
            }}
          />
        ))}
      </div>

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/hpkvbu9sn/IDG_20260308_155005_637.jpeg")' }}
      >
        <div className="absolute inset-0 bg-navy-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 h-full flex flex-col justify-center lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div className="max-w-2xl mb-8 lg:mb-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/50 bg-navy-900/60 backdrop-blur px-4 py-1.5 mb-4 cup-crown-glow">
            <Trophy size={14} className="text-yellow-300" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
              Especial Taça · 1/4 Final
            </span>
          </div>
          <p className="text-yellow-400 font-bold tracking-wider text-xs sm:text-sm mb-2 uppercase">
            VAMOS ÁS MEIAS-FINAIS! 
          </p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-7xl font-bold text-white leading-tight uppercase mb-4 sm:mb-6 drop-shadow-lg">
            PELO SÃO ROMÃO! <br />
            <span className="text-5xl sm:text-2xl md:text-7xl lg:text-[100px] text-yellow-400">TUDO, TUDO, TUDO!</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl border-l-4 border-yellow-400 pl-4 sm:pl-6">
            Onde a paixão se transforma em glória. Acompanha a nossa caminhada rumo à vitória e faz parte da nossa história.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => {
                const element = document.getElementById('latest-results');
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 px-6 sm:px-8 rounded shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base"
            >
              RESULTADOS
            </button>
            <button
              onClick={() => onNavigate && onNavigate('clube')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 sm:px-8 rounded transition-colors text-sm sm:text-base"
            >
              O CLUBE
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-full border border-blue-300/25 bg-navy-900/55 backdrop-blur-sm">
            <div className="hero-chant-track flex items-center gap-8 px-6 py-2.5 min-w-max">
              {CROWD_CHANTS.concat(CROWD_CHANTS).map((chant, idx) => (
                <span
                  key={`${chant}-${idx}`}
                  className={`hero-chant-word text-[10px] sm:text-xs uppercase tracking-[0.16em] font-bold ${
                    idx % 2 === 0 ? 'text-yellow-300' : 'text-blue-200'
                  }`}
                  style={{ animationDelay: `${(idx % 6) * 0.2}s` }}
                >
                  {chant}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Next Match Card */}
        <div
          className={`w-full max-w-md lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 rounded-xl overflow-hidden backdrop-blur-xl ${
            isFeatured
              ? 'border-2 border-yellow-400/70 bg-navy-900/50'
              : 'border border-white/20 bg-navy-900/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
          }`}
          style={
            isFeatured
              ? {
                  boxShadow:
                    '0 0 0 1px rgba(250,204,21,0.3), 0 0 40px 8px rgba(250,204,21,0.15), 0 8px 32px 0 rgba(0,0,0,0.5)',
                  animation: 'heroGlow 2.5s ease-in-out infinite',
                }
              : {}
          }
        >
          {/* ── FEATURED BANNER ── */}
          {isFeatured && (
            <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 px-4 py-2.5 flex items-center justify-center gap-2 overflow-hidden">
              {/* shimmer sweep */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ animation: 'shimmer 2.5s infinite' }}
              />
              <Trophy size={15} className="text-navy-900 flex-shrink-0 relative z-10" />
              <span className="text-navy-900 font-black text-[11px] sm:text-xs uppercase tracking-widest text-center leading-tight relative z-10">
                Taça de Honra Distrital da Guarda
              </span>
              <Trophy size={15} className="text-navy-900 flex-shrink-0 relative z-10" />
            </div>
          )}

          {/* Header */}
          <div className="bg-navy-900/60 p-3 sm:p-4 text-center border-b border-white/10">
            {isFeatured ? (
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                  </span>
                  <h3 className="text-yellow-400 font-black uppercase tracking-widest text-xs sm:text-sm">
                    Próximo Jogo
                  </h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/40 rounded-full px-3 py-0.5">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-300 font-bold text-[10px] uppercase tracking-widest">
                    Quartos de Final
                  </span>
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            ) : (
              <h3 className="text-gray-200 font-bold uppercase tracking-widest text-xs sm:text-sm">Próximo Jogo</h3>
            )}
          </div>

          {/* Teams */}
          <div className="p-4 sm:p-8 flex items-center justify-between relative">
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl ${
                isFeatured ? 'bg-yellow-400/15' : 'bg-blue-500/20'
              }`}
            />

            {/* Home */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 relative z-10 flex-1 min-w-0">
              {nextMatch.homeLogo && (
                <img
                  src={nextMatch.homeLogo}
                  alt={nextMatch.homeTeam}
                  loading="lazy"
                  width={80}
                  height={80}
                  className={`w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-lg ${
                    nextMatch.homeTeam === 'AD São Romão' ? 'scale-125' : ''
                  }`}
                />
              )}
              <span
                className={`font-bold text-[10px] sm:text-sm text-center leading-tight px-1 ${
                  nextMatch.homeTeam === 'AD São Romão' ? 'text-blue-300 font-black' : 'text-white'
                }`}
              >
                {nextMatch.homeTeam || 'Equipa Casa'}
              </span>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center relative z-10 mx-2 sm:mx-4">
              <div
                className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg border-2 sm:border-4 bg-yellow-400 text-navy-900 ${
                  isFeatured ? 'border-yellow-600/40 shadow-yellow-400/30' : 'border-navy-900/50'
                }`}
              >
                VS
              </div>
            </div>

            {/* Away */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 relative z-10 flex-1 min-w-0">
              {nextMatch.awayLogo && (
                <img
                  src={nextMatch.awayLogo}
                  alt={nextMatch.awayTeam}
                  loading="lazy"
                  width={80}
                  height={80}
                  className={`w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-lg ${
                    nextMatch.awayTeam === 'AD São Romão' ? 'scale-125' : ''
                  }`}
                />
              )}
              <span
                className={`font-bold text-[10px] sm:text-sm text-center leading-tight px-1 ${
                  nextMatch.awayTeam === 'AD São Romão' ? 'text-blue-300 font-black' : 'text-white'
                }`}
              >
                {nextMatch.awayTeam || 'Equipa Visitante'}
              </span>
            </div>
          </div>

          {/* Date / Location */}
          <div
            className={`p-4 sm:p-5 text-center border-t ${
              isFeatured ? 'border-yellow-400/20 bg-yellow-400/5' : 'border-white/10 bg-navy-900/60'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-gray-200 text-xs sm:text-sm mb-2">
              <Calendar size={14} className="text-yellow-400 flex-shrink-0" />
              <span className="font-semibold">
                {nextMatch.date || 'Data'} · {nextMatch.time || 'Hora'}
              </span>
            </div>
            {isFeatured && (
              <>
                <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[11px] mb-3">
                  <MapPin size={12} className="text-red-400 flex-shrink-0" />
                  <span className="truncate">{FEATURED_MATCH.location}</span>
                </div>

                {/* Autocarro */}
                <div className="mt-1 rounded-lg border border-green-400/30 bg-green-400/8 px-3 py-2.5">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Bus size={13} className="text-green-400 flex-shrink-0" />
                    <span className="text-green-300 font-bold text-[11px] uppercase tracking-wider">
                      Autocarro disponível
                    </span>
                  </div>
                  <p className="text-gray-300 text-[10px] text-center leading-snug">
                    A Associação disponibiliza autocarro para apoiar os jogadores
                  </p>
                  <div className="mt-1.5 flex items-center justify-center gap-1">
                    <span className="text-[10px] text-gray-400">💶 Valor:</span>
                    <span className="bg-green-400 text-navy-900 font-black text-[11px] px-2 py-0.5 rounded-full">
                      10€ por pessoa
                    </span>
                    <span className="text-[10px] text-gray-400">· ida e volta</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes heroGlow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(250,204,21,0.3), 0 0 20px 4px rgba(250,204,21,0.12), 0 8px 32px 0 rgba(0,0,0,0.5); }
          50%       { box-shadow: 0 0 0 1px rgba(250,204,21,0.5), 0 0 45px 12px rgba(250,204,21,0.28), 0 8px 32px 0 rgba(0,0,0,0.5); }
        }
      `}</style>
    </div>
  );
};
