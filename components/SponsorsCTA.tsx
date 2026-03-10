'use client';

import React from 'react';

export const SponsorsCTA: React.FC = () => {
  return (
    <div className="bg-navy-900 py-10 px-4">
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
  );
};