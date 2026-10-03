


import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ShoppingCart, Filter } from 'lucide-react';
import { Product } from '../types';

interface StoreCatalogProps {
  onAddToCart: (product: Product, size: string) => void;
}

export const StoreCatalog: React.FC<StoreCatalogProps> = ({ onAddToCart }) => {
  const { products } = useData(); // Use Context
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');
  
  // Categories derived from products
  const categories = ['TODOS', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'TODOS' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Simple local state for selected size per product (ephemeral)
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({...prev, [productId]: size}));
  };

  const handleAddClick = (product: Product) => {
    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : 'ÚNICO');
    onAddToCart(product, size);
    // Optional: Reset size or show feedback
  };

  return (
    <div className="bg-gray-50 py-8 md:py-16 min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
           <div className="flex items-center gap-2 text-navy-900">
              <Filter size={16} className="sm:w-5 sm:h-5" />
              <span className="font-bold uppercase tracking-wide text-xs sm:text-xs md:text-sm">Filtrar por:</span>
           </div>
           
           <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-start sm:justify-center">
              {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-2.5 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                     activeCategory === cat 
                     ? 'bg-navy-900 text-white shadow-lg' 
                     : 'bg-white border border-gray-200 text-gray-500 hover:border-navy-900 hover:text-navy-900'
                   }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>
           
           <div className="text-gray-400 text-xs font-bold uppercase">
              {filteredProducts.length} Produtos
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
           {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-100 hover:border-gold-400 group">
                 
                 {/* Image Section */}
                 <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden h-40 sm:h-48 md:h-56 flex items-center justify-center p-2 sm:p-3">
                    {product.isNew && (
                       <span className="absolute top-2 left-2 bg-gold-400 text-navy-900 text-[10px] sm:text-xs font-bold px-2.5 py-1 uppercase tracking-wide rounded-full shadow-lg z-10">
                          Novo
                       </span>
                    )}
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      loading="lazy"
                      width={200}
                      height={160}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                 </div>

                 {/* Content Section */}
                 <div className="p-3 sm:p-4 bg-white">
                    <span className="text-gold-500 text-[11px] sm:text-xs font-bold uppercase tracking-wide block mb-1.5">{product.category}</span>
                    <h3 className="font-display font-bold text-navy-900 text-xs sm:text-sm leading-tight mb-3 line-clamp-2 h-8 sm:h-10">
                       {product.name}
                    </h3>
                    
                    {/* Size Selector */}
                    {product.sizes && product.sizes.length > 0 && (
                       <div className="mb-3 pb-3 border-b border-gray-200">
                          <span className="text-[11px] sm:text-xs text-gray-600 uppercase font-bold block mb-1.5">Tamanho:</span>
                          <div className="flex gap-1 flex-wrap">
                             {product.sizes.map(size => (
                                <button
                                  key={size}
                                  onClick={() => handleSizeSelect(product.id, size)}
                                  className={`w-10 h-10 sm:w-9 sm:h-9 rounded text-[11px] sm:text-xs font-bold flex items-center justify-center transition-all ${
                                     (selectedSizes[product.id] === size || (!selectedSizes[product.id] && size === product.sizes![0]))
                                     ? 'bg-gold-400 text-navy-900 border-2 border-gold-400 shadow-md'
                                     : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-gold-400'
                                  }`}
                                >
                                   {size}
                                </button>
                             ))}
                          </div>
                       </div>
                    )}

                    {/* Price and Button */}
                    <div className="flex justify-between items-center gap-2">
                       <div className="text-lg sm:text-xl font-black text-gold-500">
                          {product.price}
                       </div>
                       <button 
                         onClick={() => handleAddClick(product)}
                         className="bg-gold-400 hover:bg-gold-500 text-navy-900 p-2.5 sm:p-2.5 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 font-bold flex items-center justify-center flex-shrink-0 min-w-[44px] min-h-[44px]"
                         title="Adicionar ao Carrinho"
                       >
                          <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
                       </button>
                    </div>
                 </div>

              </div>
           ))}
        </div>

      </div>
    </div>
  );
};
