

import React from 'react';
import { Users, Gavel, FileSearch, Hash } from 'lucide-react';

const GOVERNING_BODIES = [
  {
    title: "Direção",
    icon: Users,
    description: "Gestão executiva e administração do clube.",
    styleType: "dark",
    gridConfig: "grid-cols-4",
    members: [
      { name: "Rafael Eduardo Marques Figueiredo", role: "Presidente", number: "69" },
      { name: "Luís Manuel Mendes Silva", role: "Vice-Presidente", number: "24" },
      { name: "Ana Piedade Pereira Martins", role: "1º Secretário", number: "159" },
      { name: "Pedro Nuno Veloso Loureiro", role: "2º Secretário", number: "89" },
      { name: "Manuel António Silva Martins", role: "Tesoureiro", number: "51" },
      { name: "João Carlos Silva Martins", role: "1º Vogal", number: "63" },
      { name: "José António Martins da Costa", role: "2º Vogal", number: "43" },
      { name: "Carlos Jorge Pinheiro Carvalho", role: "3º Vogal", number: "120" },
      { name: "Nuno Tiago Santos Freitas", role: "4º Vogal", number: "218" },
      { name: "Carlos Alberto Matias da Silva", role: "5º Vogal", number: "138" },
      { name: "Ivo Ricardo Moura Cosme", role: "6º Vogal", number: "81" },
      { name: "António Manuel Ribeiro dos Santos", role: "7º Vogal", number: "95" },
    ]
  },
  {
    title: "Mesa da Assembleia Geral",
    icon: Gavel,
    description: "Órgão deliberativo supremo.",
    styleType: "dark",
    gridConfig: "grid-cols-3",
    members: [
      { name: "Duarte José Draque Marvanejo", role: "Presidente", number: "106" },
      { name: "Daniel Marques Valentim", role: "1º Secretário", number: "71" },
      { name: "Sílvia Alexandra Almeida Abreu Saraiva", role: "2º Secretário", number: "460" },
    ]
  },
  {
    title: "Conselho Fiscal",
    icon: FileSearch,
    description: "Fiscalização e rigor financeiro.",
    styleType: "dark",
    gridConfig: "grid-cols-3",
    members: [
      { name: "Jason Silva", role: "Presidente", number: "216" },
      { name: "Márcio Rafael Correia Brito", role: "Secretário", number: "92" },
      { name: "Sérgio Paulo Martins Saraiva", role: "Relator", number: "217" },
    ]
  }
];

export const ClubManagement: React.FC = () => {

  // Lógica de Estilos Dinâmicos
  const getStyles = (type: string) => {
    switch(type) {
      case 'dark': // Assembleia
        return {
          wrapper: "bg-navy-900 border-navy-800",
          title: "text-white",
          roleBadge: "bg-gold-400 text-navy-900 font-bold",
          socioLabel: "text-gray-400",
          socioValue: "text-white",
          iconColor: "text-gold-400"
        };
      case 'minimal': // Conselho Fiscal
        return {
          wrapper: "bg-gray-50 border-2 border-gray-200 hover:border-navy-900 hover:bg-white",
          title: "text-navy-900",
          roleBadge: "bg-gray-200 text-navy-700 font-bold",
          socioLabel: "text-gray-500",
          socioValue: "text-navy-900",
          iconColor: "text-navy-400"
        };
      default: // Direção (Primary)
        return {
          wrapper: "bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1",
          title: "text-navy-900",
          roleBadge: "bg-navy-50 text-navy-900 font-bold border border-navy-100",
          socioLabel: "text-gray-400",
          socioValue: "text-navy-900",
          iconColor: "text-gold-500"
        };
    }
  };

  return (
    <div className="bg-white py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="text-navy-900/60 font-bold tracking-[0.2em] text-xs uppercase block mb-2 md:mb-3">
            Biénio 2024/2026
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-navy-900 uppercase mb-3 md:mb-4">
            Corpos Gerentes
          </h2>
          <div className="w-16 md:w-20 h-1 md:h-1.5 bg-gold-400 mx-auto rounded-full"></div>
        </div>

        {/* Lista de Órgãos */}
        <div className="space-y-12 md:space-y-20">
          {GOVERNING_BODIES.map((group, groupIndex) => {
            const style = getStyles(group.styleType);
            
            return (
              <div key={groupIndex} className="relative">
                
                {/* Título da Secção */}
                <div className="flex flex-col gap-2 mb-6 md:mb-8 border-l-4 border-gold-400 pl-3 md:pl-4">
                  <h3 className="text-lg md:text-2xl font-display font-bold text-navy-900 uppercase">
                    {group.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">
                    {group.description}
                  </p>
                </div>

                {/* Grelha de Membros - Responsiva */}
                {/* Static class mapping to prevent Tailwind purge of dynamic classes */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 ${
                  group.gridConfig === 'grid-cols-4' ? 'lg:grid-cols-4' :
                  group.gridConfig === 'grid-cols-3' ? 'lg:grid-cols-3' : 'lg:grid-cols-3'
                }`}>
                  {group.members.map((member, idx) => (
                    <div 
                      key={idx} 
                      className={`
                        relative rounded-lg md:rounded-xl p-4 md:p-6 transition-all duration-300 flex flex-col justify-between
                        ${style.wrapper}
                      `}
                    >
                      {/* Topo do Cartão */}
                      <div>
                        <div className="flex justify-between items-start mb-3 md:mb-4">
                          <span className={`text-[11px] md:text-[12px] uppercase tracking-widest px-2.5 md:px-3 py-1 md:py-1.5 rounded-md ${style.roleBadge}`}>
                            {member.role}
                          </span>
                          <group.icon size={18} className={`md:w-5 md:h-5 opacity-80 ${style.iconColor}`} />
                        </div>
                        
                        <h4 className={`text-base md:text-lg font-bold leading-tight mb-3 md:mb-4 ${style.title}`}>
                          {member.name}
                        </h4>
                      </div>

                      {/* Rodapé do Cartão */}
                      <div className="mt-3 md:mt-6 pt-3 md:pt-4 border-t border-current/20"></div>
                        <div className="flex items-center gap-2 mt-2 md:mt-3">
                           <Hash size={14} className={`md:w-4 md:h-4 ${style.socioLabel}`} />
                           <p className={`text-xs uppercase tracking-widest font-medium ${style.socioLabel}`}>
                             Sócio Nº <span className={`font-bold ml-1 ${style.socioValue}`}>{member.number}</span>
                           </p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};