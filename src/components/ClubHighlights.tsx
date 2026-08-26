import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Section, SectionInner, SectionHeading } from './ui/Section';

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
    <Section tone="light" seam>
      <SectionInner>

        <SectionHeading
          eyebrow="Novidades"
          title="Informações do Clube"
          align="center"
        />

        {/* Three-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {highlightedNews.map((item) => (
            <article
              key={item.id}
              onClick={() => onNavigate('noticia-detalhe', item.id)}
              className="group cursor-pointer bg-paper rounded-2xl overflow-hidden border border-bone-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-bone">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-navy-900 text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-wider rounded-sm shadow">
                  {item.category}
                </span>
                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5 text-navy-900/40 text-xs mb-3">
                  <Calendar size={11} />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-navy-900 leading-snug mb-3 group-hover:text-navy-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-navy-900/60 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {item.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-navy-900 font-bold text-xs uppercase tracking-widest border-b-2 border-transparent group-hover:border-gold-400 transition-all self-start">
                  Ler notícia <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>

      </SectionInner>
    </Section>
  );
};
