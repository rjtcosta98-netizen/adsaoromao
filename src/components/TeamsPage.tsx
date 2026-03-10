

import React, { useState } from 'react';
import { ArrowDown, Trophy } from 'lucide-react';
import { SQUAD_DATA, LOGO_URL } from '../constants';
import { SquadSection } from '../types';

const SQUAD = SQUAD_DATA as Record<string, SquadSection[]>;

const TROPHIES_BY_CATEGORY: Record<string, Array<{ title: string; year: string; subtitle: string }>> = {
  SENIORES: [
    {
      title: 'Campeões Distritais 1ª Divisão',
      year: '4x',
      subtitle: '1981/82, 1987/88, 1995/96, 1997/98',
    },
    {
      title: 'Presenças Campeonato Nacional',
      year: '5x',
      subtitle: '1982/83, 1983/84, 1988/89, 1996/97, 1998/99',
    },
    {
      title: 'Taça de Portugal',
      year: '4x',
      subtitle: '1982/83, 1983/84, 1988/89 (1/16), 1998/99',
    },
    {
      title: 'Campeão Distrital 2ª Divisão',
      year: '2x',
      subtitle: '2012/13, 2015/16',
    },
  ],
  'JUNIORES (U19)': [],
  'JUVENIS (U16)': [
    {
      title: 'Campeão Distrital de Juvenis',
      year: '2009/10',
      subtitle: 'AF Guarda',
    },
  ],
  'JUVENIS (U12)': [
        {
      title: 'Campeão Distrital de Infantis',
      year: '4x',
      subtitle: '2024/25, 2014/15, 2012/13, 2010/11',
    },
  ],
  'INFANTIS (U10)': [
    {
      title: 'Campeão Distrital de Infantis',
      year: '4x',
      subtitle: '2024/25, 2014/15, 2012/13, 2010/11',
    },
  ],
};

export const TeamsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof SQUAD_DATA>('SENIORES');

  const categories = Object.keys(SQUAD_DATA) as Array<keyof typeof SQUAD_DATA>;

  return (
    <div id="equipas" className="min-h-screen bg-navy-900">
      
      {/* Hero Section - Optimized for Mobile */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/Equipa%20ADSR")' }}
        ></div>
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-navy-900/80 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent z-10"></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.15em] text-[10px] sm:text-xs uppercase block mb-2 sm:mb-4">
            Do Benjamim ao Sénior
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-6xl lg:text-8xl text-white uppercase leading-tight sm:leading-none mb-3 sm:mb-6 drop-shadow-lg">
            As Nossas <br/> <span className="text-yellow-400">Equipas</span>
          </h1>
          <p className="text-gray-300 text-[12px] sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12">
            Conheça os rostos que defendem as cores da AD São Romão. Da Equipa Principal às nossas Camadas Jovens.
          </p>
          <div className="animate-bounce">
             <ArrowDown className="text-white mx-auto w-5 sm:w-6 h-5 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Filter - Improved Mobile */}
      <div className="bg-navy-900/95 backdrop-blur border-b border-white/5 shadow-lg">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 py-3 sm:py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-yellow-400 text-navy-900 shadow-[0_0_15px_rgba(255,215,0,0.3)] scale-105'
                    : 'bg-transparent border border-white/20 text-gray-400 hover:border-yellow-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-6 sm:py-8 md:py-12 lg:py-20 bg-navy-900 min-h-[500px]">
        <div className="container mx-auto px-3 sm:px-4">

          {/* Trophies Section */}
          {TROPHIES_BY_CATEGORY[activeCategory] && TROPHIES_BY_CATEGORY[activeCategory].length > 0 && (
            <div className="mb-8 sm:mb-10 md:mb-14">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="w-1 h-5 sm:h-6 md:h-8 bg-yellow-400"></div>
                <h2 className="font-display font-bold text-lg sm:text-xl md:text-3xl text-white uppercase">
                  Troféus
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {TROPHIES_BY_CATEGORY[activeCategory].map((trophy, index) => (
                  <div
                    key={`${trophy.title}-${index}`}
                    className="group bg-gradient-to-br from-yellow-400/10 to-blue-500/10 border border-yellow-400/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                        <Trophy className="text-yellow-400" size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-yellow-400 font-bold text-[11px] sm:text-xs uppercase tracking-widest mb-0.5">{trophy.year}</p>
                        <h3 className="text-white font-display font-bold text-sm sm:text-base md:text-lg uppercase leading-tight break-words">
                          {trophy.title}
                        </h3>
                        <p className="text-gray-400 text-[11px] sm:text-[12px] uppercase tracking-wider mt-1">
                          {trophy.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Teams Section */}
          {SQUAD[activeCategory] && SQUAD[activeCategory].length > 0 ? (
            SQUAD[activeCategory].map((section, idx) => (
              <div key={idx} className="mb-8 sm:mb-10 md:mb-16 last:mb-0">
                
                {/* Section Title */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="w-1 h-5 sm:h-6 md:h-8 bg-yellow-400"></div>
                  <h2 className="font-display font-bold text-lg sm:text-xl md:text-3xl text-white uppercase">
                    {section.title}
                  </h2>
                </div>

                {/* Team Photo - if exists */}
                {section.members.length === 1 && section.members[0].isTeamPhoto ? (
                  <div className="flex justify-center items-center mb-8 sm:mb-12 md:mb-16">
                    <div className="w-full max-w-3xl group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-500">
                      <div className="relative">
                        <img 
                          src={section.members[0].image} 
                          alt={`Plantel ${section.title}`} 
                          loading="lazy"
                          width={800}
                          height={450}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent"></div>
                        
                        {/* Treinador Info */}
                        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 md:p-8">
                          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                            <div className="w-1 h-6 sm:h-8 md:h-12 bg-yellow-400"></div>
                            <div>
                              <p className="text-yellow-400 font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-widest mb-0.5 md:mb-1">Treinador</p>
                              <h3 className="font-display font-bold text-base sm:text-2xl md:text-4xl text-white uppercase leading-tight">
                                {section.members[0].name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Players Grid - Responsive */
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                    {section.members.map((member) => (
                      <div key={member.id} className="group relative overflow-hidden rounded-lg bg-navy-800 border border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1">
                        
                        {member.role === 'Treinador' || member.role === 'Treinador Adjunto' || member.role === 'Analista & Tr. GR' || section.title === 'Equipa Técnica' ? (
                          /* Technical Staff Card */
                          <>
                            <div className="aspect-[3/4] overflow-hidden relative bg-gradient-to-b from-gray-700 to-navy-900">
                              {member.image ? (
                                <img src={member.image} alt={member.name} loading="lazy" width={200} height={270} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 text-center opacity-30">
                                  <img src={LOGO_URL} loading="lazy" width={64} height={64} className="w-12 sm:w-16 h-12 sm:h-16 grayscale mb-1 sm:mb-2" alt="Logo" />
                                  <span className="font-display font-bold text-xl sm:text-2xl text-white">TGR</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-90"></div>
                              
                              {/* Text Overlay */}
                              <div className="absolute bottom-0 left-0 w-full p-1.5 sm:p-3">
                                <h3 className="font-display font-bold text-[11px] sm:text-sm md:text-base text-white uppercase leading-tight truncate">{member.name}</h3>
                                <p className="text-yellow-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest truncate">{member.role}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Player Card */
                          <>
                            <div className="aspect-[3/4] overflow-hidden relative bg-navy-800">
                              {/* Background Graphics */}
                              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
                              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/20 rounded-full blur-2xl z-0"></div>
                              
                              {/* Player Image */}
                              {member.image && (
                                <img src={member.image} alt={member.name} loading="lazy" width={200} height={270} className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-500" />
                              )}
                              
                              {/* Number */}
                              {member.number && (
                                <div className="absolute top-1 sm:top-2 md:top-4 right-1 sm:right-2 md:right-4 z-20">
                                  <span className="font-display font-bold text-lg sm:text-2xl md:text-4xl text-yellow-400 drop-shadow-md opacity-80">{member.number}</span>
                                </div>
                              )}

                              {/* Logo */}
                              <img src={LOGO_URL} loading="lazy" width={32} height={32} className="absolute top-1 sm:top-2 md:top-4 left-1 sm:left-2 md:left-4 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 opacity-50 z-20 grayscale" alt="Club Logo" />

                              {/* Name Overlay */}
                              <div className="absolute bottom-0 left-0 w-full p-1.5 sm:p-3 z-30 bg-gradient-to-t from-navy-900 to-transparent pt-4 sm:pt-6 md:pt-8">
                                <h3 className="font-display font-bold text-[11px] sm:text-xs md:text-base text-white uppercase leading-tight group-hover:text-yellow-400 transition-colors truncate">{member.name}</h3>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 opacity-50">
              <img src={LOGO_URL} loading="lazy" width={96} height={96} className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 grayscale mb-2 sm:mb-3 md:mb-4" alt="Logo" />
              <p className="text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs md:text-base">Informação disponível brevemente</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};