


import React, { useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag } from 'lucide-react';
import { Section, SectionInner, SectionHeading } from './ui/Section';

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
    <Section tone="light" seam>

      {/* Halo navy — contraparte clara do halo dourado das secções escuras */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-navy-900/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <SectionInner>

        <SectionHeading
          eyebrow="Loja Oficial"
          title={<>Novidades <span className="text-navy-700">Exclusivas</span></>}
          action={
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={() => scroll('left')}
                aria-label="Anterior"
                className="w-11 h-11 rounded-full border border-bone-200 bg-paper text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all flex items-center justify-center shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Seguinte"
                className="w-11 h-11 rounded-full border border-bone-200 bg-paper text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all flex items-center justify-center shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          }
        />

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4 md:gap-6 pb-8 md:pb-12 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.slice(0, 8).map((product) => (
            <div 
              key={product.id} 
              className="min-w-[180px] md:min-w-[200px] snap-center bg-paper rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 group border border-bone-200 flex flex-col relative overflow-hidden"
            >
              {product.isNew && (
                <span className="absolute top-2 left-2 z-20 bg-gold-400 text-navy-900 text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Novo
                </span>
              )}
              
              {/* Image Area */}
              <div className="h-32 md:h-40 flex items-center justify-center relative overflow-hidden bg-bone">
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
                <span className="text-navy-900/45 text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-1">
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
                            ? 'bg-navy-900 text-white'
                            : 'bg-bone text-navy-900/75 hover:bg-bone-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Price and Action */}
                <div className="mt-auto pt-2 border-t border-bone-200">
                  <div className="text-lg md:text-xl font-bold text-navy-900 mb-2">
                    {product.price}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-2 md:py-2.5 px-2 rounded transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1 uppercase text-[10px] md:text-[11px] tracking-wider"
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
                className="group flex flex-col items-center gap-3 md:gap-4 text-navy-900 hover:text-gold-600 transition-colors"
              >
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 bg-navy-900 text-white hover:bg-navy-800 font-bold uppercase py-3 md:py-4 px-6 md:px-10 rounded-full transition-all shadow-card hover:shadow-card-hover hover:-translate-y-1 tracking-widest text-[11px] md:text-xs"
          >
            Visitar Loja Online <ArrowRight size={14} className="text-gold-400 md:w-4 md:h-4" />
          </button>
        </div>

      </SectionInner>
    </Section>
  );
};
