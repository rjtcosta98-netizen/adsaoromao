'use client';

import React from 'react';
import { SPONSORS } from '../constants';

interface SponsorsProps {
  onNavigate?: (page: string) => void;
}

export const Sponsors: React.FC<SponsorsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-8 md:mb-12">
          <span className="text-navy-900/50 font-bold tracking-[0.15em] md:tracking-[0.2em] text-[11px] md:text-xs uppercase block mb-2">Parceiros Oficiais</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-navy-900 uppercase">
            Quem Apoia o Nosso Clube
          </h2>
        </div>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
  {SPONSORS.map((sponsor) => (
    <div key={sponsor.id} className="bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center aspect-[4/3] border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-yellow-400/50 hover:bg-white group">
      
      {/* Logo do Patrocinador */}
      <div className="w-full h-full flex items-center justify-center relative">
         <img 
           src={sponsor.imageUrl} 
           alt={sponsor.name}
           loading="lazy"
           width={200}
           height={150}
           className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
         />
      </div>

      <h4 className="font-bold text-navy-900 text-xs sm:text-sm uppercase mt-3 group-hover:text-yellow-600 transition-colors">{sponsor.name}</h4>
      <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide mt-1">{sponsor.category}</p>
    </div>
  ))}
</div>
        
        <div className="text-center mt-6 md:mt-10 px-4">
           <p className="text-gray-500 text-xs sm:text-sm">
             Queres ver a tua marca aqui? <a onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('patrocinadores'); }} href="#" className="font-bold text-navy-900 underline decoration-yellow-400 decoration-2 hover:text-yellow-600 transition-colors cursor-pointer">Torna-te parceiro da ADSR</a>
           </p>
        </div>

        {/* Quality & Ethics Badges */}
        <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-gray-100">
             <div className="text-center mb-6 md:mb-10">
                <span className="text-blue-600 font-bold tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-[11px] uppercase block mb-2">Reconhecimento Institucional</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-900 uppercase">Qualidade & Ética</h3>
             </div>
             
             <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
                <div className="flex-1 bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                    <div className="h-14 md:h-16 flex items-center justify-center gap-4 mb-3 md:mb-4">
                        <img src="https://ik.imagekit.io/elementgroup/ADSR/Entidade%20Formadora%203%20Estrelas.png" alt="Bandeira da Ética" className="h-16 md:h-20 object-contain" loading="lazy" width={80} height={80} />
                    </div>
                    <h4 className="font-bold text-navy-900 uppercase mb-2 text-sm md:text-base">Entidade Formadora - 3 Estrelas</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 mb-3 md:mb-4 leading-relaxed">Certificação oficial da Federação Portuguesa de Futebol, reconhecendo a excelência na formação.</p>
                    <span className="bg-blue-100 text-blue-800 text-[10px] md:text-[11px] font-bold px-2.5 md:px-3 py-1 rounded-full inline-block">CERTIFICADO FPF</span>
                </div>

                <div className="flex-1 bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                    <div className="h-14 md:h-16 flex items-center justify-center mb-3 md:mb-4">
                        <img src="https://ik.imagekit.io/elementgroup/ADSR/Bandeira%20da%20E%CC%81tica.png" alt="Bandeira da Ética" className="h-16 md:h-20 object-contain" loading="lazy" width={80} height={80} />
                    </div>
                    <h4 className="font-bold text-navy-900 uppercase mb-2 text-sm md:text-base">Bandeira da Ética</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 mb-3 md:mb-4 leading-relaxed">Reconhecimento do Instituto Português do Desporto e Juventude pela promoção de valores éticos.</p>
                     <span className="bg-blue-100 text-blue-800 text-[10px] md:text-[11px] font-bold px-2.5 md:px-3 py-1 rounded-full inline-block">IPDJ / PNED</span>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};