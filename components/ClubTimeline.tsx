'use client';

import React from 'react';

export const ClubTimeline: React.FC = () => {
  const events = [
    {
      year: '1962',
      title: 'O Início',
      description: 'A 10 de Outubro, nasce oficialmente a Associação Desportiva de São Romão, fruto da paixão de uma vila inteira pelo futebol.'
    },
    {
      year: '1981-99',
      title: 'A Hegemonia Sénior',
      description: '4x Campeões Distritais (1.ª Div): 81/82, 87/88, 95/96 e 97/98. 5 Presenças Nacionais em épocas consecutivas nos anos 80 e finais de 90.',
      highlight: true
    },
    {
      year: '1989',
      title: 'Taça de Portugal',
      description: 'O momento mais alto na prova rainha. A 11/01/1989, recebemos o poderoso Estrela da Amadora (1.ª Liga) nos 1/16 de final.'
    },
    {
      year: '2008-17',
      title: 'Geração de Ouro',
      description: 'Uma década inesquecível para a formação, varrendo títulos em todos os escalões: Campeões Iniciados, Juvenis, Infantis e múltiplas dobradinhas.',
      highlight: true
    },
    {
      year: '2013-16',
      title: 'Renascer Sénior',
      description: 'Prova de resiliência da equipa principal, conquistando por duas vezes o título da 2.ª Divisão Distrital (2012/13 e 2015/16).'
    },
    {
      year: '2025',
      title: 'O Futuro é Agora',
      description: 'A tradição formadora continua viva. Na época 2024/2025, sagrámo-nos novamente Campeões Distritais de Infantis.'
    }
  ];

  return (
    <div className="bg-gray-50 py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-navy-900/50 font-bold tracking-[0.2em] text-xs uppercase block mb-2">Marcos & Conquistas</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-navy-900 uppercase">
            Linha do Tempo
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line - Desktop only */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-navy-900/20 hidden md:block"></div>
          
          {/* Vertical Line - Mobile */}
          <div className="absolute left-4 md:hidden w-0.5 h-full bg-navy-900/20"></div>

          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`p-4 md:p-6 rounded-lg shadow-lg border-b-4 transition-transform duration-300 hover:-translate-y-1 ${event.highlight ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-yellow-400'}`}>
                    <span className="text-navy-900 font-display font-bold text-2xl md:text-4xl block mb-1 md:mb-2">{event.year}</span>
                    <h3 className="text-base md:text-lg font-bold text-navy-900 uppercase mb-2">{event.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Dot - Desktop */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-navy-900 border-4 border-white shadow flex items-center justify-center shrink-0 hidden md:flex">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>

                {/* Dot - Mobile */}
                <div className="absolute left-0 top-0 z-10 w-8 h-8 rounded-full bg-navy-900 border-4 border-gray-50 shadow flex items-center justify-center shrink-0 md:hidden">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>

                {/* Empty Space for alignment - Desktop */}
                <div className="w-full md:w-[45%] hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};