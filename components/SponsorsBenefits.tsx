'use client';

import React from 'react';
import { Rocket, Scale, Diamond } from 'lucide-react';

export const SponsorsBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Rocket,
      title: 'Visibilidade',
      headline: 'Exposição de Marca',
      desc: 'Presença garantida em equipamentos oficiais, redes sociais e lonas publicitárias no estádio.',
      footer: 'ALCANCE LOCAL & REGIONAL'
    },
    {
      icon: Scale,
      title: 'Fiscalidade',
      headline: 'Benefícios Fiscais',
      desc: 'Otimize os custos da sua empresa através da Lei do Mecenato Desportivo (Deduções Fiscais).',
      footer: 'RENTABILIDADE DIRETA',
      isHighlight: true
    },
    {
      icon: Diamond,
      title: 'Networking',
      headline: 'Exclusividade',
      desc: 'Opções de patrocínio com exclusividade setorial, destacando-se totalmente da concorrência.',
      footer: 'POSICIONAMENTO ELITE'
    }
  ];

  return (
    // 1. Contentor Principal: relative para segurar a imagem de fundo
    <div className="relative py-24 bg-navy-900 border-t border-white/5 overflow-hidden">
      
      {/* --- INÍCIO: BACKGROUND ESTÁDIO --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dc7zy0p4q/image/upload/v1768903992/604894404_1457358689723774_6211173858757242986_n_cgjnte.jpg" 
          alt="Estádio Background" 
          className="w-full h-full object-cover opacity-40"
        />
        {/* Overlay Escuro para garantir leitura do texto */}
        <div className="absolute inset-0 bg-navy-900/90 mix-blend-multiply"></div>
      </div>
      {/* --- FIM: BACKGROUND ESTÁDIO --- */}

      {/* 2. Conteúdo: z-10 para ficar ACIMA da imagem */}
      <div className="container mx-auto px-4 relative z-10">
      
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-3">
            Parceria de Sucesso
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">
            Vantagens de Patrocinar
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div 
              key={index} 
              className={`
                rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2
                ${item.isHighlight 
                  ? 'border border-yellow-400/50 shadow-[0_0_40px_rgba(255,215,0,0.1)]' 
                  : 'border border-white/10 hover:border-white/30'
                }
              `}
            >
               
               {/* Header do Cartão */}
               <div className="bg-navy-950/80 backdrop-blur-sm py-4 text-center border-b border-white/5">
                  <span className={`text-xs font-bold uppercase tracking-[0.2em] ${item.isHighlight ? 'text-yellow-400' : 'text-yellow-500'}`}>
                    {item.title}
                  </span>
               </div>

               {/* Corpo do Cartão - Com ligeira transparência para ver o fundo */}
               <div className="bg-navy-900/80 backdrop-blur-sm p-8 flex-grow flex flex-col items-center text-center">
                  <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                     <item.icon size={48} className={item.isHighlight ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'text-blue-500'} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className={`font-display font-bold text-2xl uppercase mb-4 ${item.isHighlight ? 'text-white' : 'text-white'}`}>
                    {item.headline}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
               </div>

               {/* Footer do Cartão */}
               <div className="bg-navy-950/90 backdrop-blur-sm py-4 text-center border-t border-white/5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${item.isHighlight ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {item.footer}
                  </span>
               </div>
            </div>
          ))}
        </div>
            <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="border border-yellow-400 rounded-2xl p-12 md:p-16 text-center relative overflow-hidden bg-navy-800/30">
          
          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white uppercase mb-6">
              Quer ser o nosso próximo parceiro?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Solicite o nosso dossier comercial e descubra o plano ideal para a sua empresa.
            </p>
            
            <button className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-4 px-10 rounded shadow-lg uppercase text-sm tracking-widest transition-transform hover:scale-105">
              Enviar Proposta
            </button>
          </div>

        </div>
      </div>
    </div>
      </div>
    </div>
  );
};