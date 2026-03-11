


import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { TEAM_LOGOS } from '../constants';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [nextMatch, setNextMatch] = React.useState<{
    homeTeam?: string;
    awayTeam?: string;
    date?: string;
    time?: string;
    location?: string;
    homeLogo?: string;
    awayLogo?: string;
  }>({});

  useEffect(() => {
    async function fetchMatchData() {
      try {
        const { data, error } = await supabase
          .from('jogos_futuros_ad_sao_romao')
          .select('*')
          .order('data_jogo', { ascending: true })
          .limit(1);

        if (error || !data || data.length === 0) {
          console.error('Erro ao buscar próximo jogo:', error);
          return;
        }

        const match = data[0];
        const homeTeam = match.equipa_casa;
        const awayTeam = match.equipa_fora;

        const matchObj = {
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          date: new Date(match.data_jogo).toLocaleDateString('pt-PT'),
          time: match.hora_jogo.substring(0, 5),
          location: match.casa_fora === 'C' ? 'Estádio N. Sra. Conceição' : awayTeam || 'Fora',
          homeLogo: TEAM_LOGOS[homeTeam] || 'https://res.cloudinary.com/dc7zy0p4q/image/upload/v1768903055/608195712_1464591145667195_3693066190005632417_n-removebg-preview_sz4jxd.png',
          awayLogo: TEAM_LOGOS[awayTeam] || 'https://cdn-icons-png.flaticon.com/512/1273/1273736.png',
        };

        setNextMatch(matchObj);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    }

    fetchMatchData();
  }, []);

  return (
    <div className="relative min-h-screen md:min-h-[100vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Estadio%20ADSR")' }}
      >
        <div className="absolute inset-0 bg-navy-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 h-full flex flex-col justify-center lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content - Hero Text */}
        <div className="max-w-2xl mb-8 lg:mb-0">
          <p className="text-yellow-400 font-bold tracking-wider text-xs sm:text-sm mb-2 uppercase">
            A trabalhar para a comunidade desde 10/10/1962
          </p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight uppercase mb-4 sm:mb-6 drop-shadow-lg">
            Associação Desportiva <br />
            <span className="text-4xl sm:text-5xl md:text-7xl lg:text-[110px] text-yellow-400">São Romão</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl border-l-4 border-yellow-400 pl-4 sm:pl-6">
            Onde a paixão se transforma em glória. Acompanha a nossa caminhada rumo à vitória e faz parte da nossa história.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={() => {
                const element = document.getElementById('latest-results');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 px-6 sm:px-8 rounded shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base"
            >
              RESULTADOS
            </button>
            <button 
              onClick={() => {
                onNavigate && onNavigate('clube');
              }}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 sm:px-8 rounded transition-colors text-sm sm:text-base"
            >
              O CLUBE
            </button>
          </div>
        </div>

        {/* Right Content - Next Match Card (Glass Effect) */}
        <div className="w-full max-w-md lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 rounded-xl overflow-hidden backdrop-blur-xl bg-navy-900/40 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          {/* Header */}
          <div className="bg-navy-900/50 p-3 sm:p-4 text-center border-b border-white/10">
            <h3 className="text-gray-200 font-bold uppercase tracking-widest text-xs sm:text-sm">Próximo Jogo</h3>
          </div>

          {/* Teams */}
          <div className="p-4 sm:p-8 flex items-center justify-between relative">
             {/* Glow effect behind teams */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

            <div className="flex flex-col items-center gap-1 sm:gap-2 relative z-10 flex-1 min-w-0">
              {nextMatch.homeLogo && <img src={nextMatch.homeLogo} alt={nextMatch.homeTeam} loading="lazy" width={80} height={80} className={`w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-lg ${nextMatch.homeTeam === 'AD São Romão' ? 'scale-125' : ''}`} />}
              <span className={`font-bold text-[10px] sm:text-sm text-center text-shadow leading-tight px-1 ${nextMatch.homeTeam === 'AD São Romão' ? 'text-blue-300 font-black' : 'text-white'}`}>{nextMatch.homeTeam || 'Equipa Casa'}</span>
            </div>

            <div className="flex flex-col items-center relative z-10 mx-2 sm:mx-4">
              <div className="bg-yellow-400 text-navy-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg border-2 sm:border-4 border-navy-900/50">
                VS
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-2 relative z-10 flex-1 min-w-0">
              {nextMatch.awayLogo && <img src={nextMatch.awayLogo} alt={nextMatch.awayTeam} loading="lazy" width={80} height={80} className={`w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-lg ${nextMatch.awayTeam === 'AD São Romão' ? 'scale-125' : ''}`} />}
              <span className={`font-bold text-[10px] sm:text-sm text-center text-shadow leading-tight px-1 ${nextMatch.awayTeam === 'AD São Romão' ? 'text-blue-300 font-black' : 'text-white'}`}>{nextMatch.awayTeam || 'Equipa Visitante'}</span>
            </div>
          </div>

          {/* Date Info */}
          <div className="bg-navy-900/60 p-4 sm:p-6 text-center border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-gray-200 text-xs sm:text-sm">
              <Calendar size={14} className="text-yellow-400 flex-shrink-0" />
              <span className="truncate">{nextMatch.date || 'Data'}, {nextMatch.time || 'Hora'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
