'use client';


import React, { useState } from 'react';
import { Check, ShieldCheck, User, Calendar, Phone, Mail, Award, ExternalLink } from 'lucide-react';

export const RegistrationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 pb-12 sm:pb-16 md:pb-20">
      
      {/* Hero Header */}
      <div className="relative bg-navy-900 py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-3 sm:px-4 relative z-10 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.15em] text-[11px] sm:text-xs uppercase block mb-2 sm:mb-3 md:mb-4">
            Época 2025/2026
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white uppercase leading-tight sm:leading-none mb-3 sm:mb-4 md:mb-6">
            Junta-te à <span className="text-yellow-400">Equipa</span>
          </h1>
          <p className="text-gray-300 text-[12px] sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
             Preenche o formulário oficial abaixo para formalizar a tua inscrição na Associação Desportiva de São Romão.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 -mt-6 sm:-mt-8 md:-mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
           
           {/* Left Column: Official Form Iframe */}
           <div className="lg:w-2/3">
              {/* Device Frame Visual */}
              <div className="bg-gray-800 rounded-t-2xl sm:rounded-t-[2rem] p-2 sm:p-3 pb-0 shadow-lg sm:shadow-2xl relative border border-gray-700">
                {/* Camera Dot */}
                <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-900 rounded-full border border-gray-700"></div>
                
                {/* Screen Container */}
                <div className="bg-white rounded-t-lg sm:rounded-t-xl overflow-hidden min-h-[400px] sm:min-h-[600px] md:min-h-[800px] relative">
                  
                  {/* Loading State */}
                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-0">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 border-3 sm:border-4 border-navy-900 border-t-yellow-400 rounded-full animate-spin mb-2 sm:mb-4"></div>
                      <span className="text-[11px] sm:text-xs font-bold text-navy-900 uppercase tracking-widest">A carregar formulário...</span>
                    </div>
                  )}

                  {/* QuotaGest Iframe */}
                  <iframe 
                    src="https://v5.quotagest.pt/app/db/inscricao/d927eb6246b511ef" 
                    className="w-full h-[400px] sm:h-[600px] md:h-[800px] border-none relative z-10"
                    title="Ficha de Inscrição ADSR"
                    onLoad={() => setIsLoading(false)}
                  ></iframe>

                </div>
              </div>
              
              <div className="text-center mt-2 sm:mt-3 md:mt-4">
                 <a 
                   href="https://v5.quotagest.pt/app/db/inscricao/d927eb6246b511ef" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 sm:gap-2 text-navy-900 font-bold text-[11px] sm:text-xs uppercase hover:text-blue-600 transition-colors"
                 >
                   Não consegue visualizar? Abrir numa nova janela <ExternalLink size={11} className="sm:w-3 sm:h-3" />
                 </a>
              </div>
           </div>

           {/* Right Column: Info & Escalões */}
           <div className="lg:w-1/3 space-y-4 sm:space-y-6 md:space-y-8">
              
              {/* Why Join Box */}
              <div className="bg-navy-900 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-lg sm:shadow-xl border-t-4 border-yellow-400">
                 <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl uppercase mb-3 sm:mb-4 md:mb-6">Porquê a ADSR?</h3>
                 <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                    {[
                       'Entidade Formadora Certificada (3 Estrelas)',
                       'Bandeira da Ética IPDJ',
                       'Campo Sintético Renovado',
                       'Acompanhamento Técnico Especializado',
                       'Seguro Desportivo Incluído',
                       'Kit de Treino Oficial'
                    ].map((item, idx) => (
                       <li key={idx} className="flex items-start gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm">
                          <Check className="text-yellow-400 shrink-0 w-4 sm:w-4 md:w-5 h-4 sm:h-4 md:h-5 mt-0.5" />
                          <span className="text-gray-300 leading-snug">{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>

              {/* Escalões Info */}
              <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md sm:shadow-lg border border-gray-100">
                 <h3 className="font-display font-bold text-base sm:text-lg md:text-xl uppercase mb-3 sm:mb-4 md:mb-6 text-navy-900">Escalões Etários</h3>
                 <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 sm:pb-2">
                       <span className="font-bold text-gray-700 text-[11px] sm:text-xs md:text-sm">Traquinas (U8)</span>
                       <span className="text-[11px] sm:text-[11px] md:text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded text-gray-500 font-mono whitespace-nowrap">2018/2019</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 sm:pb-2">
                       <span className="font-bold text-gray-700 text-[11px] sm:text-xs md:text-sm">Benjamins (U10)</span>
                       <span className="text-[11px] sm:text-[11px] md:text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded text-gray-500 font-mono whitespace-nowrap">2016/2017</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 sm:pb-2">
                       <span className="font-bold text-gray-700 text-[11px] sm:text-xs md:text-sm">Infantis (U12)</span>
                       <span className="text-[11px] sm:text-[11px] md:text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded text-gray-500 font-mono whitespace-nowrap">2014/2015</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 sm:pb-2">
                       <span className="font-bold text-gray-700 text-[11px] sm:text-xs md:text-sm">Iniciados (U14)</span>
                       <span className="text-[11px] sm:text-[11px] md:text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded text-gray-500 font-mono whitespace-nowrap">2012/2013</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 sm:pb-2">
                       <span className="font-bold text-gray-700 text-[11px] sm:text-xs md:text-sm">Juvenis (U16)</span>
                       <span className="text-[11px] sm:text-[11px] md:text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded text-gray-500 font-mono whitespace-nowrap">2010/2011</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 sm:pb-2">
                       <span className="font-bold text-gray-700 text-[11px] sm:text-xs md:text-sm">Juniores (U19)</span>
                       <span className="text-[11px] sm:text-[11px] md:text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded text-gray-500 font-mono whitespace-nowrap">2007/2008/2009</span>
                    </div>
                     <div className="flex justify-between items-center">
                       <span className="font-bold text-gray-700 text-[11px] sm:text-xs md:text-sm">Seniores</span>
                    </div>
                 </div>
              </div>

              {/* Documents Needed */}
              <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-gray-200">
                 <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-navy-900">
                    <ShieldCheck size={18} className="sm:w-5 sm:h-5" />
                    <h4 className="font-bold uppercase text-[10px] sm:text-xs md:text-sm">Documentos Necessários</h4>
                 </div>
                 <p className="text-[10px] sm:text-xs md:text-xs text-gray-500 leading-relaxed">
                    Para formalizar a inscrição na secretaria, deverá fazer-se acompanhar do Cartão de Cidadão do atleta e do encarregado de educação, bem como uma fotografia tipo passe atualizada.
                 </p>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
};
