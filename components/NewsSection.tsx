'use client';


import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight } from 'lucide-react';

interface NewsSectionProps {
  onNavigate: (page: string, id?: number) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  const { news } = useData();

  return (
    <div className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="flex items-center gap-3">
             <div className="w-2 h-10 bg-yellow-400"></div>
             <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 uppercase">
              Destaques do Clube
            </h2>
          </div>
          <button onClick={() => {
            onNavigate('noticias');
          }} className="hidden md:flex items-center text-navy-900 font-bold text-sm hover:text-blue-600 transition-colors">
            VER TODAS AS NOTÍCIAS <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
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
                <span className="text-gray-400 text-xs font-medium mb-3 block">{item.date}</span>
                <h3 className="font-display font-bold text-xl text-navy-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.excerpt}
                </p>
                <button 
                  onClick={() => {
                    onNavigate('noticia-detalhe', item.id);
                  }}
                  className="inline-block text-navy-900 font-bold text-xs uppercase tracking-widest border-b-2 border-transparent hover:border-yellow-400 transition-all self-start cursor-pointer"
                >
                  Ler Notícia
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
             <button onClick={() => {
              onNavigate('noticias');
            }} className="inline-flex items-center text-navy-900 font-bold text-sm">
            VER TODAS AS NOTÍCIAS <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
};
