'use client';

import React from 'react';
import { Users, Diamond, Clock, UserCheck, TrendingUp, Heart, Shield, Target } from 'lucide-react';

export const MembershipImpact: React.FC = () => {
  const stats = [
    { icon: Users, value: '850', label: 'Sócios Ativos', suffix: '+' },
    { icon: Diamond, value: '180', label: 'Atletas Formados', suffix: '+' },
    { icon: Clock, value: '64', label: 'Anos de História', suffix: '' },
    { icon: UserCheck, value: '25', label: 'Parceiros Locais', suffix: '+' },
  ];

  const impactAreas = [
    {
      icon: TrendingUp,
      title: 'Material Desportivo',
      description: '10 quotas mensais garantem o kit de treino completo para um atleta da formação.'
    },
    {
      icon: Shield,
      title: 'Manutenção',
      description: 'As quotas asseguram a manutenção diária do relvado e das infraestruturas onde os nossos atletas crescem.'
    },
    {
      icon: Users,
      title: 'Transporte',
      description: 'O valor das quotas permite que todas as nossas equipas se desloquem com segurança para os jogos fora.'
    },
    {
      icon: Heart,
      title: 'Inclusão',
      description: 'Ajudamos a garantir que nenhuma criança do São Romão fique sem praticar desporto por motivos financeiros.'
    },
  ];

  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
         <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#032d61] uppercase">
              O Impacto da tua Quota
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-3 md:mt-4 rounded-full"></div>
         </div>

         {/* Destino Direto do Investimento */}
         <div className="max-w-5xl mx-auto mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
               <h3 className="text-2xl md:text-3xl font-display font-bold text-navy-900 uppercase mb-3">
                  Destino Direto do Investimento
               </h3>
               <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                  Transparência total: saiba exatamente onde o seu dinheiro é aplicado.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {impactAreas.map((area, index) => (
                  <div key={index} className="bg-gradient-to-br from-navy-50 to-white border border-navy-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                     <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                           <area.icon className="text-navy-900" size={24} strokeWidth={2} />
                        </div>
                        <div>
                           <h4 className="text-navy-900 font-display font-bold text-lg uppercase mb-2">
                              {area.title}
                           </h4>
                           <p className="text-gray-600 text-sm leading-relaxed">
                              {area.description}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Meta Próxima */}
         <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 md:p-10 shadow-xl">
               <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center">
                     <Target className="text-yellow-400" size={32} strokeWidth={2} />
                  </div>
               </div>
               <h3 className="text-navy-900 font-display font-bold text-xl md:text-2xl uppercase mb-3">
                  Objetivo 2026
               </h3>
               <p className="text-navy-900 text-sm md:text-base leading-relaxed font-medium">
                  Este ano, o objetivo das quotas extraordinárias é a renovação da iluminação do campo para treinos noturnos com mais qualidade.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}