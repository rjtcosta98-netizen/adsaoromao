

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsSectionProps {
  onNavigate: (page: string, id?: number) => void;
}

const CAROUSEL_IDS = [2, 3, 4, 5, 6];
const VISIBLE = 3;

export const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  const { news } = useData();
  const [startIndex, setStartIndex] = useState(0);

  const carouselNews = news.filter(item => CAROUSEL_IDS.includes(item.id))
    .sort((a, b) => CAROUSEL_IDS.indexOf(a.id) - CAROUSEL_IDS.indexOf(b.id));

  if (carouselNews.length === 0) return null;

  const maxIndex = Math.max(0, carouselNews.length - VISIBLE);
  const visibleItems = carouselNews.slice(startIndex, startIndex + VISIBLE);

  const prev = () => setStartIndex(i => Math.max(0, i - 1));
  const next = () => setStartIndex(i => Math.min(maxIndex, i + 1));

  return (
    <div className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-24">
      {/* Halo navy único e subtil da secção, conforme a spec da superfície clara */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]" />

      <div className="container relative z-10 mx-auto px-4">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
            <h2 className="font-display text-lg font-bold uppercase text-navy-900 sm:text-xl md:text-3xl">
              Destaques do Clube
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-2">
              <button
                onClick={prev}
                disabled={startIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 transition-all hover:border-yellow-400 hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={startIndex >= maxIndex}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 transition-all hover:border-yellow-400 hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Seguinte"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <button
              onClick={() => onNavigate('noticias')}
              className="hidden md:flex items-center text-navy-900 font-bold text-sm hover:text-navy-800 transition-colors"
            >
              VER TODAS <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Carousel row — always 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy-900/10 bg-white shadow-[0_18px_50px_rgba(3,21,58,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/60 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)]"
            >
              {/* Imagem: conteúdo principal do cartão, proporção fixa 16:10 */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  width={400}
                  height={250}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradiente de baixo para cima para o texto assentar sobre a foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03153a] via-[#03153a]/45 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                    {item.category} · {item.date}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase leading-tight text-white sm:text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <p className="mb-5 flex-grow text-sm leading-relaxed text-gray-600">
                  {item.excerpt}
                </p>
                <button
                  onClick={() => onNavigate('noticia-detalhe', item.id)}
                  className="inline-block self-start border-b-2 border-transparent text-xs font-bold uppercase tracking-widest text-navy-900 transition-all hover:border-yellow-400 cursor-pointer"
                >
                  Ler Notícia
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile nav + CTA */}
        <div className="mt-8 flex items-center justify-between md:hidden">
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 transition-all hover:border-yellow-400 hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={startIndex >= maxIndex}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 transition-all hover:border-yellow-400 hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Seguinte"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <button
            onClick={() => onNavigate('noticias')}
            className="inline-flex items-center text-navy-900 font-bold text-sm"
          >
            VER TODAS <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        {/* Dots indicator */}
        {carouselNews.length > VISIBLE && (
          <div className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === startIndex ? 'w-6 bg-yellow-400' : 'w-1.5 bg-navy-900/20 hover:bg-navy-900/30'
                }`}
                aria-label={`Ir para posição ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
