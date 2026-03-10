'use client';

import React from 'react';
import { NEWS_ITEMS } from '../constants';
import { ArrowLeft, Share2, Calendar, Tag } from 'lucide-react';

interface NewsDetailPageProps {
  newsId: number;
  onNavigate: (page: string, id?: number) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsId, onNavigate }) => {
  const news = NEWS_ITEMS.find(item => item.id === newsId);

  if (!news) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Notícia não encontrada</h1>
          <button
            onClick={() => onNavigate('noticias')}
            className="text-navy-900 font-bold text-sm border-b-2 border-transparent hover:border-yellow-400 transition-colors"
          >
            Voltar às notícias
          </button>
        </div>
      </div>
    );
  }

  // Get related news (same category, excluding current)
  const relatedNews = NEWS_ITEMS.filter(
    item => item.category === news.category && item.id !== news.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Back Button */}
        <button 
          onClick={() => onNavigate('noticias')}
          className="absolute top-4 md:top-8 left-4 md:left-8 z-10 inline-flex items-center gap-2 text-white hover:text-yellow-400 font-semibold text-sm transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        
        {/* Article Header */}
        <header className="mb-8 md:mb-12">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2 font-semibold text-yellow-600 uppercase tracking-wide">
              <Tag size={16} />
              {news.category}
            </span>
            <span className="text-gray-400">•</span>
            <time className="inline-flex items-center gap-2 font-semibold">
              <Calendar size={16} />
              {news.date}
            </time>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-navy-900 leading-tight mb-6">
            {news.title}
          </h1>

          {/* Subtitle/Excerpt */}
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            {news.excerpt.substring(0, 150)}...
          </p>
        </header>

        {/* Article Divider */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 to-transparent w-16 mb-12"></div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12 md:mb-16">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8 font-medium">
            {news.excerpt}
          </p>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
            A Associação Desportiva de São Romão continua a trabalhar com dedicação nos seus objetivos institucionais. Este desenvolvimento representa mais um passo importante na história do nosso clube, refletindo o compromisso com a excelência tanto no desemporto como na gestão organizacional.
          </p>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
            Os membros, adeptos e comunidade permanecem informados sobre todos os desenvolvimentos significativos através dos nossos canais de comunicação. A transparência e a partilha de informação são valores fundamentais que guiam a nossa organização.
          </p>

          <blockquote className="border-l-4 border-yellow-400 pl-6 md:pl-8 my-10 md:my-12 italic text-gray-700 text-lg">
            "A dedicação, o trabalho em equipa e a visão clara são os pilares que sustentam o crescimento contínuo da Associação Desportiva de São Romão."
          </blockquote>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Continuamos comprometidos em manter a comunidade informada e envolvida em todos os aspetos da vida do clube. Acompanhe as próximas atualizações e desenvolvimentos que moldarão o futuro da instituição.
          </p>
        </div>

        {/* Share Section */}
        <div className="py-8 md:py-12 border-t border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-semibold">Partilhe esta notícia:</span>
            <button className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold text-sm md:text-base px-5 md:px-6 py-3 rounded transition-colors">
              <Share2 size={18} />
              Partilhar
            </button>
          </div>
        </div>
      </article>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <div className="bg-gray-50 py-16 md:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-2 font-display">
              Notícias Relacionadas
            </h2>
            <p className="text-gray-600 mb-12 text-lg">Continue acompanhando as últimas atualizações do clube</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedNews.map((relatedItem) => (
                <button
                  key={relatedItem.id}
                  onClick={() => onNavigate('noticia-detalhe', relatedItem.id)}
                  className="group text-left bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-yellow-400 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-40 md:h-48 overflow-hidden bg-gray-200">
                    <img 
                      src={relatedItem.imageUrl} 
                      alt={relatedItem.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <span className="text-yellow-600 text-xs font-bold uppercase tracking-wider block mb-3">
                      {relatedItem.date}
                    </span>
                    <h3 className="font-bold text-lg text-navy-900 group-hover:text-yellow-600 transition-colors leading-tight line-clamp-2 mb-4">
                      {relatedItem.title}
                    </h3>
                    <span className="text-navy-900 group-hover:text-yellow-600 font-semibold text-sm transition-colors inline-flex items-center gap-1">
                      Ler artigo →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="bg-navy-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-black font-display mb-4">
            Acompanhe todas as notícias do clube
          </h3>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Mantenha-se informado sobre os últimos desenvolvimentos, resultados e acontecimentos do clube.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('noticias')}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold px-8 py-3 rounded transition-colors"
            >
              Ver todas as notícias
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded transition-colors border border-white/30"
            >
              Página inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
