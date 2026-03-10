'use client';

import React from 'react';
import { Ticket, Percent, Users, Vote, ShoppingBag } from 'lucide-react';

export const MembershipBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Ticket,
      title: 'Acesso aos Jogos',
      description: 'Entrada gratuita em todos os jogos em casa da AD São Romão durante a época desportiva.'
    },
    {
      icon: Percent,
      title: 'Descontos Mensalidades',
      description: 'Desconto direto na mensalidade dos atletas de formação.'
    },
    {
      icon: Users,
      image: 'https://play-lh.googleusercontent.com/B_f5GP-3sd5tywdSwoCis-zkYzTV8jPhD6owV3XG-FSActQyXDn67ylqcRoM0OfGbWQQ',
      title: 'Rede de Parceiros',
      description: 'Desconto na bomba de gasolina do Alves & bandeira e comércio local.'
    },
    {
      icon: ShoppingBag,
      title: 'Merchandising Oficial',
      description: 'Desconto em produtos oficiais e merchandising do clube.'
    },
    {
      icon: Vote,
      title: 'Voz Ativa',
      description: 'Participação direta nas Assembleias Gerais e direito de voto nas decisões cruciais.'
    }
  ];

  return (
    <div id="membership-benefits" className="bg-white pb-24 pt-10">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase block mb-3">
            Porquê ser sócio?
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#032d61] uppercase">
            Benefícios Exclusivos
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-navy-800 border border-yellow/100 rounded-2xl p-8 hover:bg-navy-700 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg border border-yellow-400]">
                {benefit.image ? (
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <benefit.icon className="text-yellow-400 w-7 h-7" />
                )}
              </div>
              <h3 className="text-yellow-400 font-display font-bold text-xl uppercase mb-4 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Banner Strip (Screenshot 3) */}
        <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-lg p-1 relative overflow-hidden shadow-2xl border-l-4 border-yellow-400">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="relative py-12 px-4 text-center">
              <p className="text-xl md:text-2xl text-white font-medium">
                A tua quota de apenas <span className="text-yellow-400 font-bold">25€/ano</span> ajuda a formar os nossos jovens atletas.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};