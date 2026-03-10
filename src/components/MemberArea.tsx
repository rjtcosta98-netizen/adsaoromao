

import React from 'react';
import { Shield } from 'lucide-react';

export const MemberArea: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12 md:py-20 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Left Side: Dark Blue Info */}
        <div className="md:w-1/2 bg-navy-900 relative p-8 md:p-12 flex flex-col justify-center overflow-hidden group">
          
          {/* --- INÍCIO: Imagem de Fundo --- */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://ik.imagekit.io/elementgroup/ADSR/Socios%20ADSR.jpg" 
              alt="Ambiente do Clube" 
              loading="lazy"
              width={400}
              height={500}
              className="w-full h-full object-cover opacity-25 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradiente para garantir contraste do texto (Acessibilidade) */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/90"></div>
          </div>
          {/* --- FIM: Imagem de Fundo --- */}

          {/* Background Elements (Movi para z-0 para ficarem atrás do texto mas sobre a img) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/2 z-0"></div>
          
          <div className="relative z-10">
            <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-4 md:mb-6">
              Comunidade ADSR
            </span>
            
            <h3 className="font-display font-normal text-2xl md:text-3xl text-white uppercase leading-none mb-2">
              Já somos mais de
            </h3>
            
            <div className="font-display font-bold text-6xl md:text-8xl text-white mb-2 tracking-tighter">
              469
            </div>
            
            <span className="text-yellow-400 font-bold text-lg md:text-xl uppercase tracking-widest block mb-8 md:mb-12">
              Sócios Ativos
            </span>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs border-t border-white/10 pt-4 md:pt-6">
              Obrigado por fazeres parte da nossa história e ajudares o clube a crescer todos os dias.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          
          <div className="mb-6 md:mb-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-navy-900 rounded-full flex items-center justify-center mb-4 md:mb-6">
               <Shield className="text-yellow-400 w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
            </div>
            
            <h2 className="font-display font-bold text-navy-900 text-2xl md:text-3xl uppercase tracking-wide mb-4 md:mb-6">
              Área de Sócio
            </h2>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-6 md:mb-8">
              Consulta as tuas quotas, acede a benefícios exclusivos e atualiza os teus dados de forma rápida.
            </p>
            
            <a 
              href="https://v5.quotagest.pt/portal/db/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 rounded-lg uppercase tracking-wider text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center justify-center"
            >
              Entrar na minha área
            </a>

          <div className="border-t border-gray-100 pt-6 md:pt-8 text-center md:text-left">
            <span className="text-navy-900 text-sm">
              Ainda não é? <a href="#socios" className="font-bold underline decoration-yellow-400 decoration-2 hover:text-blue-600 transition-colors">Quero ser sócio</a>
            </span>
          </div>
          </div>
          </div>
      </div>
    </div>
  );
}