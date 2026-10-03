


import React from 'react';
import { LOGO_URL } from '../constants';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  return (
    <footer className="bg-navy-900 pt-12 md:pt-20 pb-6 md:pb-10 border-t border-navy-800 text-white">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-4 md:space-y-6">
            <img src={LOGO_URL} alt="AD São Romão" className="w-16 md:w-24 h-16 md:h-24 object-contain" loading="lazy" width={96} height={96} />
            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
              O coração da Serra da Estrela bate aqui. <br/>
              Desde 1962, a formar campeões e cidadãos.
            </p>
            <div className="flex space-x-2 md:space-x-4">
              <a href="https://facebook.com/adsaoromao" className="w-8 md:w-10 h-8 md:h-10 rounded bg-navy-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
              <a href="https://instagram.com/adsaoromao" className="w-8 md:w-10 h-8 md:h-10 rounded bg-navy-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
              <a href="https://www.youtube.com/@ADS%C3%83OROM%C3%83O" className="w-8 md:w-10 h-8 md:h-10 rounded bg-navy-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
              <a href="https://tiktok.com/@adsromao" target="_blank" rel="noopener noreferrer" className="w-8 md:w-10 h-8 md:h-10 rounded bg-navy-800 flex items-center justify-center hover:bg-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="md:w-[18px] md:h-[18px]">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.93a8.2 8.2 0 0 0 4.78 1.52V7.01a4.84 4.84 0 0 1-1.02-.32z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: O Clube */}
          <div>
            <h4 className="font-display font-bold uppercase text-sm md:text-lg mb-3 md:mb-6 border-b-2 border-gold-400 inline-block pb-1">O Clube</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/60">
              <li><a href="/clube" className="hover:text-white transition-colors">História e Palmarés</a></li>
              <li><a href="/socio" className="hover:text-white transition-colors">Área de Sócio</a></li>
              <li><a href="/inscricoes" className="hover:text-white transition-colors">Recrutamento</a></li>

            </ul>
          </div>

          {/* Column 3: Futebol */}
          <div>
            <h4 className="font-display font-bold uppercase text-sm md:text-lg mb-3 md:mb-6 border-b-2 border-gold-400 inline-block pb-1">Futebol</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/60">
              <li><a href="/equipas" className="hover:text-white transition-colors">Equipa Principal</a></li>
              <li><a href="/equipas" className="hover:text-white transition-colors">Escalões de Formação</a></li>
            </ul>
          </div>

          {/* Column 4: Contactos */}
          <div>
             <h4 className="font-display font-bold uppercase text-sm md:text-lg mb-3 md:mb-6 border-b-2 border-gold-400 inline-block pb-1">Contactos</h4>
             <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-white/60">
               <li className="flex items-start gap-2 md:gap-3">
                 <MapPin className="text-gold-400 shrink-0 mt-0.5 md:mt-1 w-4 md:w-4" />
                 <span>Praça de São Pedro, N°1 A<br/> 6270-287 São Romão</span>
               </li>
               <li className="flex items-center gap-2 md:gap-3">
                 <Phone className="text-gold-400 shrink-0 w-4 md:w-4" />
                 <span>+351 968 966 375</span>
               </li>
               <li className="flex items-center gap-2 md:gap-3">
                 <Mail className="text-gold-400 shrink-0 w-4 md:w-4" />
                 <span>geral@adsaoromao.pt</span>
               </li>
             </ul>
          </div>

        </div>

        {/* Livro de Reclamações & Credits & Legal */}
        <div className="border-t border-navy-800 mt-8 md:mt-12 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-4 text-[11px] md:text-xs text-white/45 flex-wrap">
            {/* Left: Copyright */}
            <p>&copy; 2026 ADSR. Todos os direitos reservados.</p>

            {/* Center: Links Legais & Livro de Reclamações */}
            <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
              <a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a>
              <span className="text-white/30">•</span>
              <a href="/termos" className="hover:text-white transition-colors">Termos</a>
              <span className="text-white/30">•</span>
              <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
              <span className="text-white/30">•</span>
              <a 
                href="https://www.livroreclamacoes.pt" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 transition-colors font-bold"
                title="Livro de Reclamações Eletrónico"
              >
                Reclamações
              </a>
            </div>

            {/* Right: Developer Credits - Destacado */}
            <a 
              href="https://elementgroup.pt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 hover:border-gold-400/50 rounded-full px-4 py-2 transition-all duration-300"
            >
              <span className="text-blue-400 group-hover:text-gold-400 transition-colors text-sm font-mono font-bold">{'</>'}</span>
              <span className="text-white/60 group-hover:text-white transition-colors text-xs font-medium">
                Desenvolvido por
              </span>
              <span className="font-bold text-white group-hover:text-gold-400 transition-colors text-xs tracking-wide">
                ELEMENTGROUP.PT
              </span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
