

import React from 'react';
import { SPONSORS } from '../constants';

interface SponsorsProps {
  onNavigate?: (page: string) => void;
}

export const Sponsors: React.FC<SponsorsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white py-12 md:py-20 relative overflow-hidden">

      {/* Halo navy único da secção (spec de superfície clara) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]"></div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
          <h2 className="font-display text-lg font-bold uppercase text-navy-900 sm:text-xl md:text-3xl">
            Quem Apoia o Nosso Clube
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {SPONSORS.map((sponsor) => (
            /* Cartão do logótipo: contorno e sombra visíveis para não desaparecer sobre o invólucro branco */
            <div key={sponsor.id} className="group rounded-lg border border-navy-900/10 bg-white p-3 sm:p-4 shadow-[0_10px_30px_rgba(3,21,58,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/60 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)]">

              {/* Palco branco: as marcas dos patrocinadores precisam de fundo claro para se lerem */}
              <div className="aspect-[3/2] w-full overflow-hidden rounded-md border border-navy-900/10 bg-white flex items-center justify-center">
                <img
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  loading="lazy"
                  width={200}
                  height={150}
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <h4 className="font-bold text-navy-900 text-xs sm:text-sm uppercase mt-3 text-center group-hover:text-navy-700 transition-colors">{sponsor.name}</h4>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mt-1 text-center">{sponsor.category}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 md:mt-10 px-4">
           <p className="text-gray-600 text-xs sm:text-sm">
             Queres ver a tua marca aqui? <a onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('patrocinadores'); }} href="#" className="font-bold text-navy-900 underline decoration-yellow-500 decoration-2 hover:text-navy-700 transition-colors cursor-pointer">Torna-te parceiro da ADSR</a>
           </p>
        </div>

        {/* Quality & Ethics Badges */}
        <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-navy-900/10">
             <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-10">
               <div className="h-5 w-1 bg-yellow-400 sm:h-6 md:h-8"></div>
               <h3 className="font-display text-lg font-bold uppercase text-navy-900 sm:text-xl md:text-2xl">Qualidade & Ética</h3>
             </div>
             
             <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
                <div className="flex-1 rounded-lg border border-navy-900/10 bg-white p-6 md:p-8 shadow-[0_18px_50px_rgba(3,21,58,0.08)] text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/60 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)]">
                    {/* Palco branco do selo: contorno visível para o separar do cartão */}
                    <div className="mx-auto mb-3 md:mb-4 flex h-16 w-24 md:h-20 md:w-28 items-center justify-center rounded-md border border-navy-900/10 bg-white px-3">
                        <img src="https://ik.imagekit.io/elementgroup/ADSR/Entidade%20Formadora%203%20Estrelas.png" alt="Selo de Entidade Formadora 3 Estrelas" className="h-full w-full object-contain" loading="lazy" width={80} height={80} />
                    </div>
                    <h4 className="font-bold text-navy-900 uppercase mb-2 text-sm md:text-base">Entidade Formadora - 3 Estrelas</h4>
                    <p className="text-[11px] md:text-xs text-gray-600 mb-3 md:mb-4 leading-relaxed">Certificação oficial da Federação Portuguesa de Futebol, reconhecendo a excelência na formação.</p>
                    <span className="bg-navy-900/[0.06] text-navy-800 border border-navy-900/15 text-[10px] md:text-[11px] font-bold px-2.5 md:px-3 py-1 rounded-full inline-block">CERTIFICADO FPF</span>
                </div>

                <div className="flex-1 rounded-lg border border-navy-900/10 bg-white p-6 md:p-8 shadow-[0_18px_50px_rgba(3,21,58,0.08)] text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/60 hover:shadow-[0_24px_60px_rgba(3,21,58,0.12)]">
                    {/* Palco branco do selo: contorno visível para o separar do cartão */}
                    <div className="mx-auto mb-3 md:mb-4 flex h-16 w-24 md:h-20 md:w-28 items-center justify-center rounded-md border border-navy-900/10 bg-white px-3">
                        <img src="https://ik.imagekit.io/elementgroup/ADSR/Bandeira%20da%20E%CC%81tica.png" alt="Bandeira da Ética" className="h-full w-full object-contain" loading="lazy" width={80} height={80} />
                    </div>
                    <h4 className="font-bold text-navy-900 uppercase mb-2 text-sm md:text-base">Bandeira da Ética</h4>
                    <p className="text-[11px] md:text-xs text-gray-600 mb-3 md:mb-4 leading-relaxed">Reconhecimento do Instituto Português do Desporto e Juventude pela promoção de valores éticos.</p>
                     <span className="bg-navy-900/[0.06] text-navy-800 border border-navy-900/15 text-[10px] md:text-[11px] font-bold px-2.5 md:px-3 py-1 rounded-full inline-block">IPDJ / PNED</span>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};
