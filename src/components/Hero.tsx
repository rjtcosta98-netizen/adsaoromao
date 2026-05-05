
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculate() {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const countdown = useCountdown(new Date('2026-06-13T09:00:00'));

  return (
    <div className="relative min-h-screen md:min-h-[100vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
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
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-7xl font-bold text-white leading-tight uppercase mb-4 sm:mb-6 drop-shadow-lg">
            ASSOCIACÃO DESPORTIVA<br />
            <span className="text-yellow-400">SÃO ROMÃO!</span>
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

        </div>

        {/* Right Content - ADSR CUP 2026 Event Card */}
        <div className="w-full max-w-sm lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 flex-shrink-0">
          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 20px 2px rgba(250,204,21,0.25), 0 0 60px 10px rgba(250,204,21,0.08); }
              50% { box-shadow: 0 0 30px 6px rgba(250,204,21,0.45), 0 0 80px 20px rgba(250,204,21,0.18); }
            }
            @keyframes float-cup {
              0%, 100% { transform: translateY(0px) rotate(-4deg); }
              50% { transform: translateY(-6px) rotate(-4deg); }
            }
            @keyframes tick-in {
              from { transform: translateY(8px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            .cup-card { animation: pulse-glow 3s ease-in-out infinite; }
            .cup-trophy { animation: float-cup 2.8s ease-in-out infinite; }
            .shimmer-text {
              background: linear-gradient(90deg, #facc15 0%, #fef08a 40%, #facc15 60%, #eab308 100%);
              background-size: 200% auto;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: shimmer 2.5s linear infinite;
            }
            .countdown-digit {
              animation: tick-in 0.2s ease-out;
            }
          `}</style>

          <div
            className="cup-card relative rounded-2xl overflow-hidden border border-yellow-400/40"
            style={{ background: 'linear-gradient(145deg, rgba(10,18,40,0.92) 0%, rgba(5,12,30,0.97) 100%)', backdropFilter: 'blur(20px)' }}
          >
            {/* Diagonal gold stripe top */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #facc15 30%, #fef08a 50%, #facc15 70%, transparent)' }} />

            {/* Watermark football */}
            <div className="absolute right-0 bottom-0 w-48 h-48 opacity-[0.04] select-none pointer-events-none" style={{ fontSize: '11rem', lineHeight: 1, transform: 'translate(20%, 20%)' }}>⚽</div>

            {/* IV Edição badge */}
            <div className="absolute top-3 right-3 bg-yellow-400 text-[10px] font-black text-blue-950 px-2 py-0.5 rounded-full tracking-widest uppercase">
              IV Edição
            </div>

            <div className="p-5 sm:p-6">
              {/* Trophy + Title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="cup-trophy text-3xl select-none flex-shrink-0">🏆</div>
                <div>
                  <p className="text-yellow-400/70 text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5">Torneio Futebol de Formação</p>
                  <h3 className="shimmer-text font-black text-2xl sm:text-3xl leading-none tracking-tight uppercase">
                    ADSR CUP
                  </h3>
                  <p className="text-white font-black text-xl sm:text-2xl leading-none tracking-widest">2026</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, #facc15 0%, transparent 100%)' }} />

              {/* Date blocks */}
              <div className="flex gap-2 mb-4">
                {[{ days: '13/14', weekend: '1ª Fase' }, { days: '20/21', weekend: '2ª Fase' }].map((block) => (
                  <div
                    key={block.days}
                    className="flex-1 rounded-xl border border-yellow-400/30 text-center py-2.5 px-1"
                    style={{ background: 'rgba(250,204,21,0.07)' }}
                  >
                    <p className="text-yellow-400 font-black text-lg sm:text-xl leading-none">{block.days}</p>
                    <p className="text-yellow-400/50 text-[9px] font-bold tracking-widest uppercase mt-0.5">JUNHO</p>
                    <p className="text-white/50 text-[9px] mt-1 tracking-wide">{block.weekend}</p>
                  </div>
                ))}
              </div>

              {/* Age categories */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['SUB 8', 'SUB 10', 'SUB 12', 'SUB 14', 'SUB 16'].map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 text-blue-300 tracking-wide"
                    style={{ background: 'rgba(96,165,250,0.08)' }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 mb-5 text-gray-400 text-[11px]">
                <MapPin size={11} className="text-yellow-400 flex-shrink-0" />
                <span>Estádio N.S. Conceição · São Romão</span>
              </div>

              {/* Countdown */}
              <div className="rounded-xl p-3" style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.15)' }}>
                <p className="text-center text-[9px] font-bold tracking-[0.2em] uppercase text-yellow-400/60 mb-2">
                  {countdown.days === 0 && countdown.hours === 0 ? 'A DECORRER!' : 'Conta-regressiva'}
                </p>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    { value: countdown.days, label: 'DIAS' },
                    { value: countdown.hours, label: 'HRS' },
                    { value: countdown.minutes, label: 'MIN' },
                    { value: countdown.seconds, label: 'SEG' },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center">
                      <span
                        key={value}
                        className="countdown-digit font-black text-xl sm:text-2xl text-white leading-none tabular-nums"
                      >
                        {String(value).padStart(2, '0')}
                      </span>
                      <span className="text-yellow-400/50 text-[8px] font-bold tracking-widest mt-0.5">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom gold stripe */}
            <div className="h-1" style={{ background: 'linear-gradient(90deg, transparent, #facc15 30%, #fef08a 50%, #facc15 70%, transparent)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
