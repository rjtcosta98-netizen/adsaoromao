


import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, SectionInner, SectionHeading } from './ui/Section';

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
    <Section tone="light" seam>
      <SectionInner>

        <SectionHeading
          eyebrow="Notícias"
          title="Destaques do Clube"
          action={
            <div className="flex items-center gap-3">
              <div className="hidden md:flex gap-2">
                <button
                  onClick={prev}
                  disabled={startIndex === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone-200 bg-paper shadow-sm transition-all hover:border-gold-400 hover:shadow-card disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={16} className="text-navy-900" />
                </button>
                <button
                  onClick={next}
                  disabled={startIndex >= maxIndex}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone-200 bg-paper shadow-sm transition-all hover:border-gold-400 hover:shadow-card disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Seguinte"
                >
                  <ChevronRight size={16} className="text-navy-900" />
                </button>
              </div>
              <button
                onClick={() => onNavigate('noticias')}
                className="hidden md:flex items-center text-navy-900 font-bold text-xs uppercase tracking-widest border-b-2 border-gold-400 pb-0.5 transition-colors hover:text-gold-600"
              >
                Ver todas <ArrowRight size={15} className="ml-2" />
              </button>
            </div>
          }
        />

        {/* Carousel row — always 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group bg-paper rounded-2xl overflow-hidden border border-bone-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-navy-900 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
                <span className="text-navy-900/40 text-xs font-medium mb-3 block">{item.date}</span>
                <h3 className="font-display font-bold text-xl text-navy-900 mb-4 leading-tight group-hover:text-navy-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-navy-900/60 text-sm leading-relaxed mb-6 flex-grow">
                  {item.excerpt}
                </p>
                <button
                  onClick={() => onNavigate('noticia-detalhe', item.id)}
                  className="inline-block text-navy-900 font-bold text-xs uppercase tracking-widest border-b-2 border-transparent hover:border-gold-400 transition-all self-start cursor-pointer"
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-bone-200 bg-paper shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} className="text-navy-900" />
            </button>
            <button
              onClick={next}
              disabled={startIndex >= maxIndex}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-bone-200 bg-paper shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Seguinte"
            >
              <ChevronRight size={16} className="text-navy-900" />
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
                  i === startIndex ? 'w-6 bg-gold-400' : 'w-1.5 bg-bone-300 hover:bg-navy-900/30'
                }`}
                aria-label={`Ir para posição ${i + 1}`}
              />
            ))}
          </div>
        )}

      </SectionInner>
    </Section>
  );
};

