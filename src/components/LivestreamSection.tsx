import React, { useState, useEffect } from 'react';
import { Radio, Clock, ChevronRight } from 'lucide-react';
import { LIVESTREAM_CONFIG, TEAM_LOGOS, LOGO_URL } from '../constants';

const PLACEHOLDER_LOGO = LOGO_URL;

function getTeamLogo(name: string): string {
  return TEAM_LOGOS[name] ?? PLACEHOLDER_LOGO;
}

function isValidYouTubeId(id: string): boolean {
  return Boolean(id) && id !== 'live_placeholder' && id.length > 5;
}

function parseMatchDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

function formatCountdown(ms: number): { hours: string; minutes: string; seconds: string } {
  if (ms <= 0) return { hours: '00', minutes: '00', seconds: '00' };
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export const LivestreamSection: React.FC = () => {
  const { youtubeId, homeTeam, awayTeam, competition, matchDate, matchTime } = LIVESTREAM_CONFIG;
  const hasStream = isValidYouTubeId(youtubeId);
  const matchDateTime = parseMatchDateTime(matchDate, matchTime);

  const [countdown, setCountdown] = useState(() =>
    formatCountdown(matchDateTime.getTime() - Date.now())
  );
  const [isStarted, setIsStarted] = useState(Date.now() >= matchDateTime.getTime());

  useEffect(() => {
    if (isStarted) return;
    const interval = setInterval(() => {
      const remaining = matchDateTime.getTime() - Date.now();
      if (remaining <= 0) {
        setIsStarted(true);
        clearInterval(interval);
      } else {
        setCountdown(formatCountdown(remaining));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isStarted]);

  const homeLogo = getTeamLogo(homeTeam);
  const awayLogo = getTeamLogo(awayTeam);

  return (
    <section className="relative bg-navy-900 border-t border-white/5 overflow-hidden">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(220,38,38,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            {/* Pulsing live badge */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: 'rgba(220,38,38,0.18)',
                border: '1.5px solid rgba(220,38,38,0.55)',
                color: '#f87171',
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-red-500"
                style={{ animation: 'livestream-pulse 1.4s ease-in-out infinite' }}
              />
              {hasStream && isStarted ? 'AO VIVO' : 'EM BREVE'}
            </span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#FFD700', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.18em' }}
            >
              {competition}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs tracking-wide">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {new Date(matchDateTime).toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}{' '}
              · {matchTime}h
            </span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">

          {/* ── Player / Coming Soon ── */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              border: '1.5px solid rgba(255,255,255,0.08)',
              background: '#010f1f',
            }}
          >
            {hasStream ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1&color=white`}
                  title={`${homeTeam} vs ${awayTeam} — ${competition}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: 'none' }}
                />
              </div>
            ) : (
              /* Coming-soon state */
              <div
                className="relative flex flex-col items-center justify-center py-16 px-6 text-center"
                style={{ minHeight: '340px' }}
              >
                {/* Decorative radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle 240px at 50% 50%, rgba(220,38,38,0.12) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-6">
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-full"
                    style={{
                      background: 'rgba(220,38,38,0.15)',
                      border: '1.5px solid rgba(220,38,38,0.4)',
                    }}
                  >
                    <Radio className="w-8 h-8 text-red-400" />
                  </div>

                  <div>
                    <p
                      className="text-white/40 text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: 'Oswald, sans-serif' }}
                    >
                      A transmissão começa em
                    </p>
                    {/* Countdown */}
                    <div className="flex items-center gap-2 justify-center">
                      {[
                        { value: countdown.hours, label: 'h' },
                        { value: countdown.minutes, label: 'm' },
                        { value: countdown.seconds, label: 's' },
                      ].map(({ value, label }, i) => (
                        <React.Fragment key={label}>
                          {i > 0 && (
                            <span
                              className="text-white/20 text-2xl font-bold"
                              style={{ lineHeight: 1 }}
                            >
                              :
                            </span>
                          )}
                          <div className="flex flex-col items-center">
                            <span
                              className="text-4xl sm:text-5xl font-black tabular-nums"
                              style={{
                                fontFamily: 'Oswald, sans-serif',
                                color: '#FFD700',
                                lineHeight: 1,
                                textShadow: '0 0 20px rgba(255,215,0,0.3)',
                              }}
                            >
                              {value}
                            </span>
                            <span className="text-white/30 text-[10px] tracking-widest uppercase mt-1">
                              {label === 'h' ? 'horas' : label === 'm' ? 'min' : 'seg'}
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <p className="text-white/30 text-sm max-w-xs leading-relaxed">
                    O link da transmissão será activado quando o jogo começar. Volta a esta página alguns minutos antes do início.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Match Info Panel ── */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-6"
            style={{
              background: 'rgba(5,57,117,0.35)',
              border: '1.5px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Teams */}
            <div className="flex flex-col gap-5">
              {/* Home */}
              <div className="flex items-center gap-4">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <img
                    src={homeLogo}
                    alt={homeTeam}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_LOGO;
                    }}
                  />
                </div>
                <div>
                  <span
                    className="text-[10px] uppercase tracking-widest text-white/30"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    Casa
                  </span>
                  <p
                    className="text-white font-bold text-base leading-tight mt-0.5"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    {homeTeam}
                  </p>
                </div>
              </div>

              {/* VS divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span
                  className="text-xs font-black tracking-widest"
                  style={{ color: '#FFD700', fontFamily: 'Oswald, sans-serif' }}
                >
                  VS
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Away */}
              <div className="flex items-center gap-4">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <img
                    src={awayLogo}
                    alt={awayTeam}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_LOGO;
                    }}
                  />
                </div>
                <div>
                  <span
                    className="text-[10px] uppercase tracking-widest text-white/30"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    Fora
                  </span>
                  <p
                    className="text-white font-bold text-base leading-tight mt-0.5"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    {awayTeam}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10" />

            {/* Match details */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#FFD700' }}
                />
                <span className="text-white/50 text-xs tracking-wide">{competition}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <span className="text-white/50 text-xs tracking-wide">
                  {new Date(matchDateTime).toLocaleDateString('pt-PT', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}{' '}
                  · {matchTime}h
                </span>
              </div>
            </div>

            {/* YouTube link */}
            {hasStream && (
              <a
                href={`https://www.youtube.com/watch?v=${youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  background: 'rgba(255,0,0,0.18)',
                  border: '1.5px solid rgba(255,0,0,0.4)',
                  color: '#ff6b6b',
                  letterSpacing: '0.1em',
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Ver no YouTube
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes livestream-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
};
