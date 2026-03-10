'use client';

import React from 'react';
import { LogIn, ExternalLink, ShieldCheck, Divide } from 'lucide-react';
import { LOGO_URL } from '../constants'; // Certifica-te que tens isto ou comenta

export const MembershipLogin: React.FC = () => {
  return (
    <div className="bg-navy-900 py-16 md:py-24 flex justify-center px-4 relative overflow-hidden">
      <div 
       className="absolute inset-0 bg-cover bg-center opacity-20"
         style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/487378227_1220176786775300_2284925828392370125_n.jpg")' }}
         ></div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-5xl w-full bg-navy-800 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] border border-white/5 relative z-10">
        
        {/* Lado Esquerdo: Visual/Marketing */}
        <div className="md:w-1/2 relative bg-black overflow-hidden group hidden md:block">
           <div 
             className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-[20s]"
             style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/487630ab-e607-4f46-84da-15231c7d2289.jpeg")' }}
           ></div>
           <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
           
           <div className="absolute bottom-12 left-12 right-12">
              <h2 className="font-display font-bold text-4xl text-white uppercase leading-none mb-4">
                 A tua casa <br/> <span className="text-yellow-400">Digital</span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                 Acede ao teu cartão de sócio, quotas e benefícios exclusivos através do nosso portal seguro.
              </p>
           </div>
        </div>

        {/* Lado Direito: Call to Action (Sem Iframe, Com Botão) */}
        <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center items-center text-center relative">
          
          <div className="w-16 h-16 md:w-20 md:h-20 bg-navy-50 rounded-full flex items-center justify-center mb-4 md:mb-6 text-navy-900">
             <ShieldCheck size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
          </div>

          <h3 className="font-display font-bold text-2xl md:text-3xl text-navy-900 uppercase mb-2 md:mb-3">
             Área de Sócio
          </h3>
          
          <p className="text-gray-500 text-sm mb-6 md:mb-8 max-w-xs mx-auto">
             Para tua segurança, o login é efetuado diretamente na plataforma certificada QuotaGest.
          </p>

          <a 
            href="https://v5.quotagest.pt/portal/db/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group w-full max-w-xs bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 md:py-4 rounded-xl uppercase tracking-wider md:tracking-widest text-xs md:text-sm transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3 transform hover:-translate-y-1 active:scale-95"
          >
             <span>Aceder ao Portal</span>
             <ExternalLink size={16} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100 w-full max-w-xs">
             <p className="text-xs text-gray-400 mb-2">Esqueceste-te dos dados?</p>
             <a href="https://v5.quotagest.pt/portal/db/login" target="_blank" className="text-navy-900 font-bold text-xs hover:text-yellow-600 underline decoration-yellow-400">
                Recuperar Senha
             </a>
          </div>

        </div>

      </div>
    </div>
  );
};