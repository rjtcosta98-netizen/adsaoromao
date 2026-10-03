import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ClubHighlightsProps {
  onNavigate: (page: string, id?: number) => void;
}

export const ClubHighlights: React.FC<ClubHighlightsProps> = ({ onNavigate }) => {
  const { news } = useData();
  const highlightedIds = [0, 1, 2];
  const highlightedNews = highlightedIds
    .map(id => news.find(item => item.id === id))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  if (highlightedNews.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-navy-900 py-16">

      {/* Halo dourado único da secção (spec de superfície) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.10),transparent_38%)]"></div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header — padrão do site: barra amarela + título, sem kicker por cima */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-10">
          <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
          <h2 className="font-display text-lg font-bold uppercase text-white sm:text-xl md:text-3xl">
            Informações do Clube
          </h2>
        </div>

        {/* Three-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {highlightedNews.map((item) => (
            <article
              key={item.id}
              onClick={() => onNavigate('noticia-detalhe', item.id)}
              className="group cursor-pointer rounded-lg border border-white/12 bg-[#03153a]/58 backdrop-blur-md shadow-[0_22px_70px_rgba(0,0,0,0.35)] hover:border-yellow-400/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-white/[0.07]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-navy-900 text-[10px] font-black px-2.5 py-1 uppercase tracking-wider rounded-sm">
                  {item.category}
                </span>
                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                  <Calendar size={11} className="text-yellow-400" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-snug mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {item.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-white font-bold text-xs uppercase tracking-widest border-b-2 border-transparent group-hover:border-yellow-400 transition-all self-start">
                  Ler notícia <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
