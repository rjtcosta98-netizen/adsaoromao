

import React from 'react';
import { SPONSORS } from '../constants';
import { Section, SectionInner, SectionHeading } from './ui/Section';

interface SponsorsProps {
  onNavigate?: (page: string) => void;
}

export const Sponsors: React.FC<SponsorsProps> = ({ onNavigate }) => {
  return (
    <Section tone="light" seam>
      <SectionInner>

        <SectionHeading
          eyebrow="Parceiros Oficiais"
          title="Quem Apoia o Nosso Clube"
          align="center"
        />

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
  {SPONSORS.map((sponsor) => (
    <div key={sponsor.id} className="bg-bone rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center aspect-[4/3] border border-bone-200 transition-all duration-300 hover:shadow-card-hover hover:border-gold-400/50 hover:bg-paper group">
      
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

      <h4 className="font-bold text-navy-900 text-xs sm:text-sm uppercase mt-3 group-hover:text-gold-600 transition-colors">{sponsor.name}</h4>
      <p className="text-[11px] sm:text-xs text-navy-900/40 uppercase tracking-wide mt-1">{sponsor.category}</p>
    </div>
  ))}
</div>
        
        <div className="text-center mt-6 md:mt-10 px-4">
           <p className="text-navy-900/60 text-xs sm:text-sm">
             Queres ver a tua marca aqui? <a onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('patrocinadores'); }} href="#" className="font-bold text-navy-900 underline decoration-gold-400 decoration-2 hover:text-gold-600 transition-colors cursor-pointer">Torna-te parceiro da ADSR</a>
           </p>
        </div>

        {/* Quality & Ethics Badges */}
        <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-bone-200">
             <div className="mb-6 flex flex-col items-center gap-3 text-center md:mb-10">
                <div className="flex items-center gap-3">
                  <span className="kicker-rule" aria-hidden="true" />
                  <span className="font-display text-[11px] font-semibold uppercase tracking-kicker text-gold-600">Reconhecimento Institucional</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-900 uppercase">Qualidade &amp; Ética</h3>
             </div>
             
             <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
                <div className="flex-1 bg-gradient-to-br from-paper to-bone p-6 md:p-8 rounded-xl shadow-card border border-bone-200 text-center hover:shadow-card-hover hover:border-gold-400/50 transition-all duration-300">
                    <div className="h-14 md:h-16 flex items-center justify-center gap-4 mb-3 md:mb-4">
                        <img src="https://ik.imagekit.io/elementgroup/ADSR/Entidade%20Formadora%203%20Estrelas.png" alt="Bandeira da Ética" className="h-16 md:h-20 object-contain" loading="lazy" width={80} height={80} />
                    </div>
                    <h4 className="font-bold text-navy-900 uppercase mb-2 text-sm md:text-base">Entidade Formadora - 3 Estrelas</h4>
                    <p className="text-[11px] md:text-xs text-navy-900/60 mb-3 md:mb-4 leading-relaxed">Certificação oficial da Federação Portuguesa de Futebol, reconhecendo a excelência na formação.</p>
                    <span className="bg-navy-900/[0.07] text-navy-900 text-[11px] md:text-[11px] font-bold px-2.5 md:px-3 py-1 rounded-full inline-block">CERTIFICADO FPF</span>
                </div>

                <div className="flex-1 bg-gradient-to-br from-paper to-bone p-6 md:p-8 rounded-xl shadow-card border border-bone-200 text-center hover:shadow-card-hover hover:border-gold-400/50 transition-all duration-300">
                    <div className="h-14 md:h-16 flex items-center justify-center mb-3 md:mb-4">
                        <img src="https://ik.imagekit.io/elementgroup/ADSR/Bandeira%20da%20E%CC%81tica.png" alt="Bandeira da Ética" className="h-16 md:h-20 object-contain" loading="lazy" width={80} height={80} />
                    </div>
                    <h4 className="font-bold text-navy-900 uppercase mb-2 text-sm md:text-base">Bandeira da Ética</h4>
                    <p className="text-[11px] md:text-xs text-navy-900/60 mb-3 md:mb-4 leading-relaxed">Reconhecimento do Instituto Português do Desporto e Juventude pela promoção de valores éticos.</p>
                     <span className="bg-navy-900/[0.07] text-navy-900 text-[11px] md:text-[11px] font-bold px-2.5 md:px-3 py-1 rounded-full inline-block">IPDJ / PNED</span>
                </div>
             </div>
        </div>

      </SectionInner>
    </Section>
  );
};