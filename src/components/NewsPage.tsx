

import React, { useState } from 'react';
import { NEWS_ITEMS } from '../constants';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Navbar } from './Navbar';

interface NewsPageProps {
  onNavigate: (page: string, id?: number) => void;
  activePage?: string;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, activePage = 'noticias', cartCount = 0, onOpenCart = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Get unique categories
  const categories = ['TODAS', ...Array.from(new Set(NEWS_ITEMS.map(item => item.category)))];

  // Filter news based on category and search
  const filteredNews = NEWS_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'TODAS' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="noticias" className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-6 md:py-10 lg:py-14 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-900/90 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://ik.imagekit.io/elementgroup/ADSR/506020443_1281302113996100_7365020318977922087_n.jpg?updatedAt=1773055175652')`,
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <button 
            onClick={() => {
              onNavigate('home');
            }}
            className="inline-flex items-center text-gold-400 hover:text-gold-500 font-bold text-xs transition-colors mb-2 md:mb-3"
          >
            <ArrowLeft size={14} className="mr-1.5" />
            Voltar
          </button>
          
          <h1 className="font-display font-bold text-2xl md:text-3xl lg:text-5xl text-white uppercase leading-tight mb-1 md:mb-2">
            Todas as <br className="hidden sm:block" /> <span className="text-gold-400">Notícias</span>
          </h1>
          <p className="text-gray-300 text-xs md:text-sm lg:text-base max-w-3xl leading-relaxed">
            Fique atualizado com os destaques do clube
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 py-3 md:py-4 lg:py-5 sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Search and Filters Row */}
          <div className="flex flex-col lg:flex-row gap-2 md:gap-3 lg:gap-4 items-start lg:items-center lg:justify-between mb-3 lg:mb-4">
            {/* Search Bar */}
            <div className="w-full lg:flex-1">
              {!showSearch ? (
                <button
                  onClick={() => setShowSearch(true)}
                  className="lg:hidden w-full flex items-center justify-center gap-2 text-gray-600 bg-white border border-gray-300 rounded-lg py-2 text-xs hover:border-gold-400 transition-colors"
                >
                  <Search size={16} />
                  Procurar notícias...
                </button>
              ) : (
                <div className="lg:hidden flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Procurar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-gold-400 focus:outline-none transition-colors text-xs"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchTerm('');
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="hidden lg:block relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Procurar notícias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-md pl-12 pr-4 py-2 lg:py-3 rounded-lg border border-gray-300 focus:border-gold-400 focus:outline-none transition-colors font-medium text-sm"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 overflow-x-auto pb-1 lg:pb-0 md:justify-center lg:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs lg:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm hover:shadow-md ${
                  selectedCategory === category
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-white text-navy-900 border border-gray-300 hover:border-gold-400 hover:bg-gold-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="py-6 sm:py-10 md:py-16 lg:py-24 xl:py-32">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          {filteredNews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
                {filteredNews.map((news) => (
                  <div 
                    key={news.id} 
                    onClick={() => {
                      onNavigate('noticia-detalhe', news.id);
                    }}
                    className="group bg-white rounded-lg md:rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg sm:hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1 sm:hover:-translate-y-3 cursor-pointer hover:border-gold-400/30"
                  >
                    {/* Image */}
                    <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 overflow-hidden bg-gray-100">
                      <img 
                        src={news.imageUrl} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-navy-900 text-white text-[11px] md:text-[12px] lg:text-xs font-bold px-2.5 md:px-3 lg:px-4 py-1 md:py-1.5 uppercase tracking-wider rounded-full shadow-md">
                        {news.category}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 md:p-5 lg:p-6 xl:p-7 flex flex-col flex-grow">
                      <span className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 block">
                        {news.date}
                      </span>
                      
                      <h3 className="font-display font-bold text-sm md:text-base lg:text-lg xl:text-xl text-navy-900 mb-2 md:mb-3 leading-tight group-hover:text-gold-600 transition-colors line-clamp-3">
                        {news.title}
                      </h3>
                      
                      <p className="text-gray-600 text-[11px] md:text-xs lg:text-sm leading-relaxed mb-4 md:mb-5 lg:mb-6 flex-grow line-clamp-2 md:line-clamp-3">
                        {news.excerpt}
                      </p>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('noticia-detalhe', news.id);
                        }}
                        className="inline-flex items-center text-navy-900 font-bold text-[10px] md:text-xs lg:text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-gold-400 transition-all self-start group/btn"
                      >
                        Ler Notícia
                        <ArrowLeft size={12} className="md:w-3.5 md:h-3.5 ml-1.5 md:ml-2 group-hover/btn:translate-x-0.5 transition-transform -rotate-180" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 md:py-24 lg:py-32">
              <p className="text-gray-500 text-base md:text-lg lg:text-xl font-medium mb-6">Nenhuma notícia encontrada</p>
              <button
                onClick={() => {
                  setSelectedCategory('TODAS');
                  setSearchTerm('');
                }}
                className="text-navy-900 font-bold text-sm md:text-base border-b-2 border-transparent hover:border-gold-400 transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {/* Results Count */}
          {filteredNews.length > 0 && (
            <div className="mt-10 md:mt-14 lg:mt-16 xl:mt-20 text-center text-gray-500 text-xs md:text-sm lg:text-base">
              Mostrando <span className="font-bold text-navy-900">{filteredNews.length}</span> de <span className="font-bold text-navy-900">{NEWS_ITEMS.length}</span> notícias
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
