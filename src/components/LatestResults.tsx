import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Loader2, Check, Minus, X, Circle } from 'lucide-react';
import { epocaDesportiva } from '../lib/epoca';
import { supabase } from '@/lib/supabase';
import { LOGO_URL } from '../constants';

const CLUBE = 'AD São Romão';

interface Jogo {
  zz_match_id: number;
  escalao: string;
  escalao_ordem: number;
  data: string;
  hora: string | null;
  casa: boolean;
  adversario: string;
  adversario_logo: string | null;
  golos_adsr: number;
  golos_adversario: number;
  competicao: string | null;
}

const hojeISO = () => new Date().toISOString().slice(0, 10);

export const LatestResults: React.FC = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [indisponivel, setIndisponivel] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [escalao, setEscalao] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const itemsToShow = isMobile ? 1 : 5;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedCheck = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };

    checkMobile();
    window.addEventListener('resize', debouncedCheck, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);

  useEffect(() => {
    const buscar = async () => {
      const { data, error } = await supabase
        .from('jogos')
        .select(
          'zz_match_id, escalao, escalao_ordem, data, hora, casa, adversario, adversario_logo, golos_adsr, golos_adversario, competicao',
        )
        .eq('epoca', epocaDesportiva())
        .lte('data', hojeISO())
        .not('golos_adsr', 'is', null)
        .order('data', { ascending: false })
        .limit(300);

      // Tabela ainda por criar ou por sincronizar: a secção não aparece.
      if (error) {
        setIndisponivel(true);
        setLoading(false);
        return;
      }

      setJogos((data ?? []) as Jogo[]);
      setLoading(false);
    };

    buscar();
  }, []);

  // Ordem descendente: Seniores primeiro, depois os escalões de formação.
  const escaloes = useMemo(() => {
    const vistos = new Map<string, number>();
    for (const j of jogos) vistos.set(j.escalao, j.escalao_ordem);
    return [...vistos.entries()].sort((a, b) => b[1] - a[1]).map(([nome]) => nome);
  }, [jogos]);

  // Por omissão abre nos Seniores; se não houver, no primeiro escalão com jogos.
  const escalaoAtivo =
    escalao ?? (escaloes.includes('Seniores') ? 'Seniores' : (escaloes[0] ?? null));

  const visiveis = useMemo(
    () => (escalaoAtivo ? jogos.filter((j) => j.escalao === escalaoAtivo) : jogos),
    [jogos, escalaoAtivo],
  );

  // Sem tabela, ou ainda sem jogos disputados nesta época: a secção não aparece,
  // em vez de repetir os resultados da época anterior.
  if (indisponivel) return null;
  if (!loading && visiveis.length === 0) return null;

  const nextSlide = () => {
    if (startIndex + 1 <= visiveis.length - itemsToShow) setStartIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (startIndex > 0) setStartIndex((prev) => prev - 1);
  };

  const pagina = visiveis.slice(startIndex, startIndex + itemsToShow);

  return (
    <div id="latest-results" className="relative overflow-hidden bg-navy-900 py-14 sm:py-16">
      {/* Halo dourado único da secção. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.10),transparent_38%)]"
        aria-hidden="true"
      ></div>

      <div className="container relative mx-auto px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
            <h2 className="font-display text-lg font-bold uppercase text-white sm:text-xl md:text-3xl">
              Últimos Resultados
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="rounded border border-white/15 bg-white/[0.07] p-2 text-white transition-colors duration-300 hover:border-yellow-400/40 disabled:opacity-30"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={startIndex + itemsToShow >= visiveis.length}
              className="rounded border border-white/15 bg-white/[0.07] p-2 text-white transition-colors duration-300 hover:border-yellow-400/40 disabled:opacity-30"
              aria-label="Seguinte"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Escalões */}
        {escaloes.length > 1 && (
          <div className="mb-10 pb-4">
            <div className="flex flex-wrap gap-2 justify-center px-4">
              {escaloes.map((nome) => (
                <button
                  key={nome}
                  onClick={() => {
                    setEscalao(nome);
                    setStartIndex(0);
                  }}
                  className={`px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest transition-all whitespace-nowrap ${
                    nome === escalaoAtivo
                      ? 'bg-yellow-400 text-navy-900 shadow-lg scale-105'
                      : 'border border-white/10 bg-white/[0.07] text-gray-300 hover:bg-white/[0.12]'
                  }`}
                >
                  {nome}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-yellow-400" size={40} />
          </div>
        ) : pagina.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-lg border border-dashed border-white/20 bg-[#03153a]/[0.58] p-12 text-center backdrop-blur-md">
            <Trophy className="mx-auto mb-4 text-gray-400" size={40} />
            <h3 className="mb-2 font-display text-lg font-bold uppercase text-white">Sem resultados</h3>
            <p className="text-sm text-gray-300">Não existem resultados disponíveis para este escalão.</p>
          </div>
        ) : (
          <div
            className={
              isMobile
                ? 'flex justify-center'
                : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'
            }
          >
            {pagina.map((jogo) => {
              const vitoria = jogo.golos_adsr > jogo.golos_adversario;
              const empate = jogo.golos_adsr === jogo.golos_adversario;
              const derrota = jogo.golos_adsr < jogo.golos_adversario;

              // Cor com significado: verde/âmbar/vermelho só para ler o resultado,
              // nunca decoração — por isso fica confinada à etiqueta, não ao cartão.
              const corResultado = vitoria
                ? 'bg-green-500/15 text-green-400'
                : empate
                  ? 'bg-amber-400/15 text-amber-300'
                  : 'bg-red-500/15 text-red-400';

              // O placar mostra-se sempre na ordem casa-fora.
              const equipaCasa = jogo.casa ? CLUBE : jogo.adversario;
              const equipaFora = jogo.casa ? jogo.adversario : CLUBE;
              const logoCasa = jogo.casa ? LOGO_URL : jogo.adversario_logo;
              const logoFora = jogo.casa ? jogo.adversario_logo : LOGO_URL;
              const golosCasa = jogo.casa ? jogo.golos_adsr : jogo.golos_adversario;
              const golosFora = jogo.casa ? jogo.golos_adversario : jogo.golos_adsr;

              const dataPT = new Date(`${jogo.data}T12:00:00`).toLocaleDateString('pt-PT');

              return (
                <div
                  key={jogo.zz_match_id}
                  className={`group overflow-hidden rounded-lg border border-white/12 bg-[#03153a]/[0.58] backdrop-blur-md shadow-[0_22px_70px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-yellow-400/40 motion-safe:hover:-translate-y-0.5 ${isMobile ? 'w-full max-w-sm' : ''}`}
                >
                  <div
                    className={`flex items-center justify-center gap-2 border-b border-white/10 px-4 py-2 text-center text-[11px] font-bold uppercase ${corResultado}`}
                  >
                    {vitoria && <Check size={12} strokeWidth={3} />}
                    {empate && <Minus size={12} strokeWidth={3} />}
                    {derrota && <X size={12} strokeWidth={3} />}
                    <span>{dataPT}</span>
                    <span className="ml-1 rounded-full bg-black/20 px-2 py-0.5 text-[10px]">
                      {vitoria ? 'VITÓRIA' : empate ? 'EMPATE' : 'DERROTA'}
                    </span>
                  </div>

                  {/* Competição como etiqueta, entre o resultado e o placar. */}
                  {jogo.competicao && (
                    <p className="truncate px-4 pt-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                      {jogo.competicao}
                    </p>
                  )}

                  <div className="flex items-center justify-between p-5">
                    <div className="flex flex-1 min-w-0 flex-col items-center gap-2">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/90 p-1.5">
                        {logoCasa ? (
                          <img src={logoCasa} loading="lazy" width={40} height={40} className="h-full w-full object-contain" alt="" />
                        ) : (
                          <div className="h-full w-full rounded-full bg-navy-900/10" />
                        )}
                      </div>
                      <span className="px-1 text-center text-[10px] font-bold uppercase leading-tight text-white">
                        {equipaCasa}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-display text-3xl font-bold text-white tabular-nums">
                      <span>{golosCasa}</span>
                      <span className="text-gray-400">-</span>
                      <span>{golosFora}</span>
                    </div>

                    <div className="flex flex-1 min-w-0 flex-col items-center gap-2">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/90 p-1.5">
                        {logoFora ? (
                          <img src={logoFora} loading="lazy" width={40} height={40} className="h-full w-full object-contain" alt="" />
                        ) : (
                          <div className="h-full w-full rounded-full bg-navy-900/10" />
                        )}
                      </div>
                      <span className="px-1 text-center text-[10px] font-bold uppercase leading-tight text-white">
                        {equipaFora}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 border-t border-white/10 px-4 py-2 text-center text-[11px] font-bold uppercase text-gray-300">
                    <Circle
                      size={7}
                      fill="currentColor"
                      strokeWidth={0}
                      className={jogo.casa ? 'text-yellow-400' : 'text-gray-400'}
                    />
                    {jogo.casa ? 'Casa' : 'Fora'} | {jogo.hora ?? '--:--'}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Indicadores de navegação */}
        {!loading && visiveis.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(visiveis.length / itemsToShow) }).map((_, index) => {
                const isActive = Math.floor(startIndex / itemsToShow) === index;
                return (
                  <button
                    key={index}
                    onClick={() => setStartIndex(index * itemsToShow)}
                    className={`h-2 rounded-full transition-all ${
                      isActive ? 'bg-yellow-400 w-8' : 'bg-white/20 w-2 hover:bg-white/35'
                    }`}
                    aria-label={`Ir para a página ${index + 1}`}
                  />
                );
              })}
            </div>
            <span className="ml-4 text-xs font-medium text-gray-300">
              {Math.floor(startIndex / itemsToShow) + 1} / {Math.ceil(visiveis.length / itemsToShow)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
