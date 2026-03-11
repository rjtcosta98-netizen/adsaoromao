

import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { LOGO_URL } from '../constants';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const SponsorsForm: React.FC = () => {
   const [formData, setFormData] = useState({
      empresa: '',
      responsavel: '',
      telemovel: '',
      areaNegocio: '',
      localidade: '',
      email: '',
      mensagem: '',
   });

   const [status, setStatus] = useState<FormStatus>('idle');
   const [errorMsg, setErrorMsg] = useState('');

   const handleChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
   };

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setStatus('sending');
      setErrorMsg('');

      try {
         const res = await fetch('https://formsubmit.co/ajax/geral@adsaoromao.pt', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
               _subject: `[ADSR Patrocínio] Proposta de ${formData.empresa}`,
               _cc: formData.email,
               _template: 'table',
               Empresa: formData.empresa,
               Responsavel: formData.responsavel,
               Email: formData.email,
               Telemovel: formData.telemovel || 'Não indicado',
               'Area de Negocio': formData.areaNegocio || 'Não indicada',
               Localidade: formData.localidade || 'Não indicada',
               Mensagem: formData.mensagem || 'Sem mensagem adicional',
            }),
         });

         if (!res.ok) {
            throw new Error('Erro ao enviar pedido.');
         }

         setStatus('success');
         setFormData({ empresa: '', responsavel: '', telemovel: '', areaNegocio: '', localidade: '', email: '', mensagem: '' });
      } catch (err) {
         setStatus('error');
         setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado. Tenta novamente.');
      }
   };
   return (
         <div id="sponsors-proposal" className="relative py-8 sm:py-12 md:py-16 lg:py-20 border-t border-white/5 overflow-hidden">
         
         {/* Background Image */}
         <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/484644646_1206579071468405_1129415999603510884_n.jpg")' }}
         ></div>
         
         {/* Dark Blue Overlay */}
         <div className="absolute inset-0 bg-navy-900/85 z-10"></div>
         
         <div className="container mx-auto px-3 sm:px-4 max-w-6xl relative z-20">

            {/* Section Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-14">
               <span className="text-yellow-400 font-bold tracking-[0.15em] text-[11px] sm:text-[11px] uppercase block mb-1.5 sm:mb-2">
                  Parceria Oficial ADSR
               </span>
               <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white uppercase leading-tight">
                  Pedido de Proposta Comercial
               </h2>
               <p className="text-gray-300 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto mt-2 sm:mt-3 md:mt-4">
                  Crie uma parceria com impacto real na comunidade. Apresente a sua marca e receba um dossier personalizado.
               </p>
            </div>
        
            <div className="flex flex-col lg:flex-row bg-navy-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl border border-white/5 lg:min-h-[620px]">
          
          {/* Left Side - Image */}
          <div className="lg:w-1/2 relative min-h-[200px] sm:min-h-[280px] md:min-h-[380px] lg:min-h-full">
             <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Screenshot%202026-03-09%20at%2011.36.42.png")' }}
             ></div>
             <div className="absolute inset-0 bg-navy-900/60 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
             
             <div className="absolute inset-0 p-4 sm:p-8 md:p-12 flex flex-col justify-end">
                <div className="bg-yellow-400 text-navy-900 font-bold text-[11px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded w-fit mb-2 sm:mb-3 md:mb-4 uppercase">
                   Parceria 2026
                </div>
                <h2 className="font-display font-bold text-lg sm:text-2xl md:text-4xl lg:text-5xl text-white uppercase leading-tight mb-2 sm:mb-3 md:mb-4">
                   Junte a sua <br/> marca <span className="text-yellow-400">à nossa</span>
                </h2>
                <p className="text-gray-300 text-[11px] sm:text-xs md:text-base leading-relaxed mb-4 sm:mb-6 border-l-2 border-yellow-400 pl-2 sm:pl-3 md:pl-4">
                   Transforme apoio em impacto: visibilidade local, proximidade com a comunidade e valores que unem.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 text-[10px] sm:text-xs md:text-sm text-gray-200">
                   <div className="flex items-center gap-1.5 sm:gap-2"><span className="text-yellow-400">✓</span> <span>Dossier Comercial 2026</span></div>
                   <div className="flex items-center gap-1.5 sm:gap-2"><span className="text-yellow-400">✓</span> <span>Planos flexíveis</span></div>
                   <div className="flex items-center gap-1.5 sm:gap-2"><span className="text-yellow-400">✓</span> <span>Presença no estádio</span></div>
                   <div className="flex items-center gap-1.5 sm:gap-2"><span className="text-yellow-400">✓</span> <span>Ativação digital</span></div>
                </div>
             </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-4 sm:p-6 md:p-10 lg:p-16 bg-navy-900 flex flex-col justify-center">
             
             <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                <img src={LOGO_URL} alt="Logo" loading="lazy" width={48} height={48} className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 object-contain" />
                <h3 className="font-display font-bold text-base sm:text-lg md:text-2xl text-white uppercase">Proposta de Parceria</h3>
                <p className="text-gray-400 text-[11px] sm:text-[11px] md:text-sm mt-0.5 sm:mt-1 md:mt-2">Responderemos em até 48h úteis.</p>
             </div>

             <form className="space-y-2.5 sm:space-y-3 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                   <label className="text-yellow-400 text-[11px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest block mb-0.5 sm:mb-1">Empresa</label>
                   <input
                     type="text"
                     placeholder="Nome da Empresa"
                     value={formData.empresa}
                     onChange={handleChange('empresa')}
                     className="w-full bg-navy-800 border border-navy-700 rounded px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 text-white text-[12px] sm:text-sm focus:border-yellow-400 focus:outline-none placeholder-gray-600"
                   />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                   <div>
                      <label className="text-yellow-400 text-[11px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest block mb-0.5 sm:mb-1">Responsável</label>
                      <input
                         type="text"
                         placeholder="Seu nome"
                         value={formData.responsavel}
                         onChange={handleChange('responsavel')}
                         className="w-full bg-navy-800 border border-navy-700 rounded px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 text-white text-[12px] sm:text-sm focus:border-yellow-400 focus:outline-none placeholder-gray-600"
                      />
                   </div>
                   <div>
                      <label className="text-yellow-400 text-[11px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest block mb-0.5 sm:mb-1">Telemóvel</label>
                      <input
                         type="text"
                         placeholder="912 345 678"
                         value={formData.telemovel}
                         onChange={handleChange('telemovel')}
                         className="w-full bg-navy-800 border border-navy-700 rounded px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 text-white text-[12px] sm:text-sm focus:border-yellow-400 focus:outline-none placeholder-gray-600"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                   <div>
                      <label className="text-yellow-400 text-[11px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest block mb-0.5 sm:mb-1">Área de negócio</label>
                      <input
                         type="text"
                         placeholder="Ex: Retail, Serviços"
                         value={formData.areaNegocio}
                         onChange={handleChange('areaNegocio')}
                         className="w-full bg-navy-800 border border-navy-700 rounded px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 text-white text-[12px] sm:text-sm focus:border-yellow-400 focus:outline-none placeholder-gray-600"
                      />
                   </div>
                   <div>
                      <label className="text-yellow-400 text-[11px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest block mb-0.5 sm:mb-1">Localidade</label>
                      <input
                         type="text"
                         placeholder="São Romão"
                         value={formData.localidade}
                         onChange={handleChange('localidade')}
                         className="w-full bg-navy-800 border border-navy-700 rounded px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 text-white text-[12px] sm:text-sm focus:border-yellow-400 focus:outline-none placeholder-gray-600"
                      />
                   </div>
                </div>

                <div>
                   <label className="text-yellow-400 text-[11px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest block mb-0.5 sm:mb-1">E-mail Corporativo</label>
                   <input
                      type="email"
                      placeholder="geral@empresa.pt"
                      value={formData.email}
                      onChange={handleChange('email')}
                      className="w-full bg-navy-800 border border-navy-700 rounded px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 text-white text-[12px] sm:text-sm focus:border-yellow-400 focus:outline-none placeholder-gray-600"
                   />
                </div>

                <div>
                   <label className="text-yellow-400 text-[11px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest block mb-0.5 sm:mb-1">Mensagem</label>
                   <textarea
                     rows={3}
                     placeholder="Como podemos colaborar?"
                     value={formData.mensagem}
                     onChange={handleChange('mensagem')}
                     className="w-full bg-navy-800 border border-navy-700 rounded px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 text-white text-[12px] sm:text-sm focus:border-yellow-400 focus:outline-none placeholder-gray-600 resize-none"
                   ></textarea>
                </div>

                <button
                   type="submit"
                   disabled={status === 'sending'}
                   className="w-full bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-2.5 sm:py-3 md:py-4 rounded shadow-lg uppercase text-[10px] sm:text-[11px] md:text-xs tracking-widest transition-transform hover:-translate-y-1 mt-1 sm:mt-1.5 md:mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                   {status === 'sending' ? (
                     <>
                       <Loader2 className="w-4 h-4 animate-spin" />
                       A enviar...
                     </>
                   ) : 'Solicitar Proposta'}
                </button>

                {status === 'success' && (
                  <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-lg p-3 mt-3">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    <p className="text-green-300 text-[10px] sm:text-xs">
                      Pedido enviado com sucesso! Receberá uma confirmação por email e resposta em até 48h úteis.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-red-300 text-[10px] sm:text-xs">
                      {errorMsg || 'Erro ao enviar. Contacte-nos diretamente: geral@adsaoromao.pt'}
                    </p>
                  </div>
                )}

                <p className="text-[11px] sm:text-[11px] md:text-[12px] text-gray-500 text-center mt-1.5 sm:mt-2 md:mt-3 leading-relaxed">
                  Ao submeter, concorda com o contacto da ADSR para efeitos comerciais.
                </p>
             </form>

          </div>

        </div>
      </div>
    </div>
  );
};