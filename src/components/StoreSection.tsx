

import React, { useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag } from 'lucide-react';

interface StoreSectionProps {
  onNavigate?: (page: string) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ onNavigate }) => {
  const { products, addToCart } = useData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Approx card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (product: any) => {
    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : 'ÚNICO');
    addToCart(product, size);
  };

  return (
    <div className="bg-white py-12 md:py-24 relative overflow-hidden">

      {/* Halo navy subtil — único gesto de fundo da superfície clara */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 px-2 text-center md:text-left gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
            <h2 className="font-display text-lg font-bold uppercase text-navy-900 sm:text-xl md:text-3xl">
              Loja Oficial
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2 md:gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-navy-900/15 bg-white text-navy-900 hover:border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center"
            >
              <ChevronLeft size={18} className="md:w-5 md:h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-navy-900/15 bg-white text-navy-900 hover:border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center"
            >
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4 md:gap-6 pb-8 md:pb-12 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.slice(0, 8).map((product) => (
            <div 
              key={product.id} 
              className="min-w-[180px] md:min-w-[200px] snap-center rounded-lg border border-navy-900/10 bg-white shadow-[0_18px_50px_rgba(3,21,58,0.08)] hover:border-yellow-400/60 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)] transition-all duration-300 group flex flex-col relative overflow-hidden"
            >
              {product.isNew && (
                <span className="absolute top-2 left-2 z-20 bg-yellow-400 text-navy-900 text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Novo
                </span>
              )}
              
              {/* Image Area — campo interno navy para a foto do produto respirar */}
              <div className="h-32 md:h-40 flex items-center justify-center relative overflow-hidden bg-navy-900/[0.04]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  loading="lazy"
                  width={200}
                  height={160}
                  className="w-full h-full object-contain p-2 md:p-3 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              {/* Details Container */}
              <div className="p-3 md:p-3.5 flex flex-col flex-grow">
                {/* Category */}
                <span className="text-gray-500 text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-1">
                  {product.category}
                </span>
                
                {/* Product Name */}
                <h3 className="text-navy-900 font-bold text-xs md:text-sm leading-tight mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-2">
                    <div className="flex gap-0.5 flex-wrap">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSizes(prev => ({...prev, [product.id]: size}))}
                          className={`px-2.5 py-1.5 rounded text-[10px] md:text-[11px] font-bold transition-all ${
                            (selectedSizes[product.id] === size || (!selectedSizes[product.id] && size === product.sizes![0]))
                            ? 'bg-yellow-400 text-navy-900'
                            : 'bg-navy-900/[0.05] text-gray-600 hover:bg-navy-900/10'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Price and Action */}
                <div className="mt-auto pt-2 border-t border-navy-900/10">
                  <div className="text-lg md:text-xl font-bold text-navy-900 mb-2">
                    {product.price}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-2 md:py-2.5 px-2 rounded transition-all flex items-center justify-center gap-1 uppercase text-[10px] md:text-[11px] tracking-wider"
                  >
                    <ShoppingBag size={14} className="md:w-4 md:h-4" />
                    Carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
          
           {/* "See More" Card at the end of carousel */}
           <div className="min-w-[160px] md:min-w-[200px] snap-center flex items-center justify-center">
              <button 
                onClick={() => {
                  onNavigate && onNavigate('loja');
                }}
                className="group flex flex-col items-center gap-3 md:gap-4 text-navy-900 transition-colors"
              >
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-navy-900/20 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-yellow-400 group-hover:bg-yellow-400">
                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                 </div>
                 <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs">Ver Tudo</span>
              </button>
           </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-2 md:mt-4 px-4">
          <button 
            onClick={() => {
              onNavigate && onNavigate('loja');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 border border-navy-900/20 text-navy-900 hover:bg-navy-900 hover:text-white font-bold uppercase py-3 md:py-4 px-6 md:px-10 rounded-full transition-all tracking-widest text-[10px] md:text-xs"
          >
            Visitar Loja Online <ArrowRight size={14} className="md:w-4 md:h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
