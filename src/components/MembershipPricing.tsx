

import React from 'react';
import { Check } from 'lucide-react';

export const MembershipPricing: React.FC = () => {
  return (
    // 1. Contentor Principal: relative para conter a imagem absoluta
    <div className="relative py-16 md:py-24 bg-navy-900 overflow-hidden border-t border-white/5">
      
      {/* --- INÍCIO: BACKGROUND GLOBAL --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ik.imagekit.io/elementgroup/ADSR/505799880_1289829056476739_4202263280104078731_n.jpg?updatedAt=1773054469668" 
          alt="Bancadas e Adeptos" 
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradiente: Escuro nas pontas para fundir com o site, ligeiramente transparente no meio */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/95 via-navy-900/85 to-navy-900/95"></div>
      </div>
      {/* --- FIM: BACKGROUND GLOBAL --- */}

      {/* 2. Conteúdo: z-10 para garantir que fica ACIMA da imagem de fundo */}
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold-400 font-bold tracking-[0.2em] text-xs uppercase block mb-2 md:mb-3">
            Escolha o seu lugar na história
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white uppercase">
            Categorias de Sócio
          </h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md relative">
             
             {/* Main Card - Mantém o bg-navy-900 para garantir leitura, mas agora destaca-se do fundo global */}
             <div className="bg-navy-900/90 backdrop-blur-sm rounded-2xl md:rounded-3xl border-2 border-gold-400 p-6 md:p-8 lg:p-12 relative shadow-[0_0_50px_rgba(255,215,0,0.15)]">
                {/* Popular Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-400 text-navy-900 font-bold text-[10px] md:text-xs px-4 md:px-6 py-1.5 md:py-2 rounded-full uppercase tracking-wider md:tracking-widest shadow-lg whitespace-nowrap">
                  Mais Popular
                </div>

                <div className="text-center mb-6 md:mb-8 mt-4 md:mt-0">
                   <h3 className="text-white font-display font-bold text-2xl md:text-3xl uppercase mb-2">Sócio Efetivo</h3>
                   <div className="flex items-end justify-center gap-1 text-gold-400">
                      <span className="text-5xl md:text-6xl font-display font-bold">25€</span>
                      <span className="text-lg md:text-xl font-medium mb-1 md:mb-2 opacity-80">/ano</span>
                   </div>
                </div>

                <ul className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                   {[
                     'Acesso Livre aos Jogos em Casa',
                     'Direito a Voto em Assembleia',
                     'Cartão de Sócio Digital',
                     'Descontos na Rede de Parceiros',
                     'Prioridade na compra de bilhetes extra'
                   ].map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300 text-xs md:text-sm">
                         <div className="bg-gold-400/10 p-1 rounded-full mr-2 md:mr-3 shrink-0">
                           <Check className="text-gold-400 w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
                         </div>
                         {item}
                      </li>
                   ))}
                </ul>

                <button
                  onClick={() => {
                    const element = document.getElementById('membership-registration');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-3 md:py-4 rounded-lg uppercase tracking-wider md:tracking-widest text-xs md:text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-gold-400/20"
                >
                   Escolher Plano
                </button>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
};