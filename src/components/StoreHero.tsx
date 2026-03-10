


import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const StoreHero: React.FC = () => {
  return (
    <div className="relative h-[35vh] md:h-[40vh] flex items-center bg-navy-900 overflow-hidden">
       {/* Background */}
       <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/C9A2E0E2-1C30-4B39-9CA8-B76DE3EC7CE9_1_105_c.jpeg")' }}
      ></div>
      <div className="absolute inset-0 bg-navy-900/80 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20 flex justify-between items-end">
         <div>
            <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-1 md:mb-2">
               Coleção Oficial 2025/2026
            </span>
            <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-7xl text-white uppercase leading-tight md:leading-none">
               ADSR <span className="text-yellow-400">Store</span>
            </h1>
         </div>
      </div>
    </div>
  );
};
