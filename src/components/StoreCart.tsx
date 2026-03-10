


import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface StoreCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onCheckout: () => void;
}

export const StoreCart: React.FC<StoreCartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (parseFloat(String(item.price).replace('€', '')) * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         
         <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-navy-900 text-white">
               <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400" />
                  <h2 className="font-display font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide">O Teu Carrinho</h2>
               </div>
               <button onClick={onClose} className="p-2 sm:p-1.5 md:p-2 hover:bg-navy-800 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <X size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
               </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
               {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                     <ShoppingBag size={40} className="sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2 sm:mb-3 md:mb-4 text-gray-300" />
                     <p className="font-bold text-navy-900 uppercase text-xs sm:text-sm md:text-base">O carrinho está vazio</p>
                     <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">Adiciona produtos para começar a comprar.</p>
                  </div>
               ) : (
                  items.map((item) => (
                     <div key={item.cartId} className="flex gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-16 md:w-20 h-16 md:h-20 bg-white rounded overflow-hidden flex items-center justify-center shrink-0">
                           <img src={item.imageUrl} alt={item.name} loading="lazy" width={80} height={80} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-bold text-navy-900 text-xs md:text-sm uppercase leading-tight mb-0.5 md:mb-1">{item.name}</h4>
                           <div className="text-[10px] md:text-xs text-gray-500 mb-2 md:mb-3">
                              Tamanho: <span className="font-bold text-navy-900">{item.selectedSize}</span>
                           </div>
                           
                           {/* Quantity Controls */}
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden bg-white">
                                 <button
                                   onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                                   className="p-2 md:p-1.5 text-gray-500 hover:text-navy-900 hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                   title="Diminuir quantidade"
                                 >
                                   <Minus size={14} className="md:w-4 md:h-4" />
                                 </button>
                                 <span className="px-2 md:px-3 font-bold text-navy-900 text-xs md:text-sm min-w-[2rem] text-center">
                                    {item.quantity}
                                 </span>
                                 <button
                                   onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                                   className="p-2 md:p-1.5 text-gray-500 hover:text-navy-900 hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                   title="Aumentar quantidade"
                                 >
                                   <Plus size={14} className="md:w-4 md:h-4" />
                                 </button>
                              </div>
                              
                              <button 
                                onClick={() => onRemove(item.cartId)}
                                className="text-red-400 hover:text-red-600 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                title="Remover do carrinho"
                              >
                                 <Trash2 size={16} className="md:w-4 md:h-4" />
                              </button>
                           </div>
                           
                           <div className="mt-2 md:mt-3 text-right">
                              <span className="font-bold text-yellow-500 text-sm md:text-base">
                                {item.price}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
               <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
                  <button 
                    onClick={onCheckout}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 md:py-4 rounded-lg uppercase tracking-widest text-xs md:text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                     Pedir Cotação <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
               </div>
            )}
         </div>
      </div>
    </>
  );
};
