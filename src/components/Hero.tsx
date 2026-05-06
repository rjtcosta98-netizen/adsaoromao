
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { LOGO_URL } from '../constants';

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
        <div className="w-full max-w-sm lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 flex-shrink-0 relative">
          <style>{`
            @keyframes mascot-bob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
            @keyframes tick-flip {
              0% { transform: translateY(6px) scale(0.9); opacity: 0; }
              100% { transform: translateY(0) scale(1); opacity: 1; }
            }
            @keyframes stripe-slide {
              0% { background-position: 0 0; }
              100% { background-position: 28px 0; }
            }
            .mascot-bob { animation: mascot-bob 2.4s ease-in-out infinite; }
            .tick-flip { animation: tick-flip 0.18s ease-out; }
            .diagonal-stripes {
              background-image: repeating-linear-gradient(
                -45deg,
                rgba(255,255,255,0.07) 0px,
                rgba(255,255,255,0.07) 4px,
                transparent 4px,
                transparent 14px
              );
              animation: stripe-slide 1.2s linear infinite;
            }
          `}</style>

          {/* Mascot */}
          <img
            src="/images/TACA/mascote.png"
            alt="Mascote ADSR"
            className="mascot-bob absolute -top-12 -right-4 w-20 h-auto object-contain z-20 pointer-events-none select-none drop-shadow-lg"
          />

          <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>

            {/* ── HEADER BLOCK ── */}
            <div className="relative bg-[#1a3a8f] px-5 pt-5 pb-4">
              {/* diagonal texture overlay */}
              <div className="diagonal-stripes absolute inset-0 pointer-events-none" />

              {/* IV Edição ribbon */}
              <div className="absolute top-3 right-3 bg-[#facc15] text-[#1a3a8f] text-[9px] font-black px-2.5 py-0.5 rounded tracking-[0.18em] uppercase shadow">
                IV EDIÇÃO
              </div>

              <div className="relative flex items-center gap-3">
                <img src={LOGO_URL} alt="AD São Romão" className="w-11 h-11 object-contain flex-shrink-0" />
                <div>
                  <p className="text-white/60 text-[9px] tracking-[0.22em] uppercase leading-none mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                    Torneio Futebol de Formação
                  </p>
                  <div className="flex items-baseline gap-2 leading-none">
                    <span className="text-[#facc15] text-3xl sm:text-4xl font-black tracking-tight leading-none">ADSR CUP</span>
                    <span className="text-white text-2xl sm:text-3xl font-black tracking-widest leading-none">2026</span>
                  </div>
                </div>
              </div>

              {/* yellow bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#facc15]" />
            </div>

            {/* ── BODY ── */}
            <div className="bg-white px-5 py-4 space-y-3.5">

              {/* Date blocks */}
              <div className="flex gap-2">
                {[{ days: '13/14', phase: '1ª Fase' }, { days: '20/21', phase: '2ª Fase' }].map((block) => (
                  <div key={block.days} className="flex-1 bg-[#1a3a8f] rounded-lg text-center py-2.5">
                    <p className="text-[#facc15] text-xl font-black leading-none tracking-tight">{block.days}</p>
                    <p className="text-white/70 text-[9px] font-bold tracking-widest uppercase mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>JUNHO</p>
                    <p className="text-white/50 text-[9px] mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{block.phase}</p>
                  </div>
                ))}
              </div>

              {/* Age categories */}
              <div className="flex flex-wrap gap-1.5">
                {['SUB 8', 'SUB 10', 'SUB 12', 'SUB 14', 'SUB 16'].map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded border-2 border-[#1a3a8f] text-[#1a3a8f] tracking-wide uppercase"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-gray-500 text-[11px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                <MapPin size={11} className="text-[#1a3a8f] flex-shrink-0" />
                <span>Estádio N.S. Conceição · São Romão</span>
              </div>

              {/* Countdown */}
              <div className="bg-[#1a3a8f] rounded-xl p-3">
                <p className="text-center text-[9px] font-bold tracking-[0.22em] uppercase text-white/50 mb-2.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {countdown.days === 0 && countdown.hours === 0 ? '🟢 A DECORRER!' : 'CONTA-REGRESSIVA'}
                </p>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    { value: countdown.days, label: 'DIAS' },
                    { value: countdown.hours, label: 'HRS' },
                    { value: countdown.minutes, label: 'MIN' },
                    { value: countdown.seconds, label: 'SEG' },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center bg-white/10 rounded-lg py-2">
                      <span
                        key={value}
                        className="tick-flip text-[#facc15] text-2xl font-black leading-none tabular-nums"
                      >
                        {String(value).padStart(2, '0')}
                      </span>
                      <span className="text-white/50 text-[8px] font-bold tracking-widest mt-1 uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
