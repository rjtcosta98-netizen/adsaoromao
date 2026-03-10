'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const MembershipRegistration: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div id="membership-registration" className="bg-navy-900 py-12 md:py-20 border-t border-white/5 relative">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-2 md:mb-3">
            Processo 100% Digital
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white uppercase mb-4 md:mb-6">
            Ficha de Inscrição
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
             Preenche os teus dados abaixo. A inscrição é processada diretamente pela nossa plataforma oficial de gestão de sócios.
          </p>
        </div>

        {/* Browser Frame Container */}
        <div className="max-w-5xl mx-auto shadow-2xl rounded-lg md:rounded-xl overflow-hidden border border-white/10 bg-gray-900">
            
            {/* Barra de Título (Estilo Browser) */}
            <div className="bg-gray-800 px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 border-b border-gray-700">
               {/* Traffic Lights */}
               <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
               </div>
               
               {/* Fake URL Bar */}
               <div className="ml-2 md:ml-4 flex-1 bg-navy-900/50 rounded-md px-2 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs text-gray-400 font-mono text-center flex items-center justify-center gap-1 md:gap-2">
                  <span className="text-green-500">🔒</span>
                  <span className="truncate">secure.quotagest.pt/inscricao-adsr</span>
               </div>
            </div>
            
            {/* Área do Formulário (Iframe) */}
            <div className="bg-white relative w-full h-[600px] md:h-[800px] lg:h-[900px]">
               
               {/* Loading State (Aparece enquanto o iframe carrega) */}
               {isLoading && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-0">
                    <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-navy-900 animate-spin mb-3 md:mb-4" />
                    <p className="text-navy-900 font-bold text-xs md:text-sm uppercase tracking-wider md:tracking-widest">A carregar formulário...</p>
                 </div>
               )}

               <iframe 
                  src="https://v5.quotagest.pt/app/db/inscricao/45b2b25f315a11ef"
                  title="Ficha de Inscrição ADSR"
                  className="w-full h-full border-0 relative z-10"
                  onLoad={() => setIsLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               />
            </div>
        </div>

      </div>
    </div>
  );
};