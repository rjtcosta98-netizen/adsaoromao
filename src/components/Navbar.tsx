


import React, { useState } from 'react';
import { LOGO_URL } from '../constants';
import { Menu, X, Home, Trophy, Users, UserPlus, Heart, Handshake, Image, Phone, ShoppingBag, Newspaper } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenCart, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'INICIO', id: 'home', icon: Home },
    { name: 'CLUBE', id: 'clube', icon: Trophy },
    { name: 'EQUIPAS', id: 'equipas', icon: Users },
    { name: 'INSCRIÇÕES', id: 'inscricoes', icon: UserPlus }, 
    { name: 'SÓCIOS', id: 'socios', icon: Heart },
    { name: 'PATROCINADORES', id: 'patrocinadores', icon: Handshake },
    { name: 'GALERIA', id: 'galeria', icon: Image },
    { name: 'NOTÍCIAS', id: 'noticias', icon: Newspaper },
    { name: 'CONTACTOS', id: 'contactos', icon: Phone },
  ];

  return (
    <>
    <nav className="sticky top-0 z-[60] bg-[#012d60] backdrop-blur-sm border-b border-navy-700 shadow-lg">
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 md:gap-3 cursor-pointer -ml-1"
            onClick={() => handleNavClick('home')}
          >
            <img className="h-10 w-10 md:h-12 md:w-12 object-contain" src={LOGO_URL} alt="AD São Romão Logo" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-base md:text-xl leading-none tracking-wider">AD SÃO ROMÃO</span>
              <span className="text-yellow-400 text-[11px] md:text-xs font-bold tracking-[0.1em] md:tracking-[0.15em]">JUNTOS E FORTES</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className={`${
                  activePage === link.id 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-yellow-400'
                } text-xs font-medium transition-all duration-200 py-2 px-2 xl:px-3 uppercase`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick('loja')}
              className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 px-3 py-2 rounded-full font-bold text-xs transition-colors shadow-lg shadow-yellow-400/20 flex items-center gap-2"
            >
              <img 
                src="https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png" 
                alt="ADSR Store" 
                className="w-5 h-5"
              />
              ADSR STORE
            </button>
            <button
              onClick={onOpenCart}
              className="relative text-white hover:text-yellow-400 p-2 rounded-full transition-colors"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={20} strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-navy-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative text-white hover:text-yellow-400 p-2 transition-colors"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={22} strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-navy-900">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-yellow-400 p-2 transition-colors relative z-[70]"
            >
              {isOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 z-[55] overflow-y-auto"
        >
          <div className="pb-8">
            {/* Menu Items */}
            <div className="px-4 pt-6 pb-8 space-y-3">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 group ${
                      activePage === link.id
                        ? 'bg-white/10 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white active:scale-95'
                    }`}
                    style={{
                      animationDelay: `${index * 40}ms`,
                      animation: 'slideIn 0.4s ease-out forwards'
                    }}
                  >
                    <Icon size={24} strokeWidth={2} className={activePage === link.id ? 'text-white' : 'group-hover:scale-125 transition-transform'} />
                    <span className={`font-bold text-base tracking-wide ${activePage === link.id ? 'text-white' : ''}`}>
                      {link.name}
                    </span>
                    {activePage === link.id && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Store CTA */}
            <div className="px-4 py-6 border-t-2 border-yellow-400/20">
              <button 
                onClick={() => handleNavClick('loja')}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-navy-900 px-6 py-4 rounded-xl font-bold text-base transition-all shadow-xl shadow-yellow-400/30 flex items-center justify-center gap-3 active:scale-95 hover:shadow-2xl"
              >
                <ShoppingBag size={22} strokeWidth={2.5} />
                LOJA ONLINE
              </button>
            </div>

            {/* Footer with Developer Credit */}
            <div className="px-6 mt-6 pt-6 border-t border-white/10 pb-6">
              {/* Developer Credit - Destacado */}
              <a 
                href="https://elementgroup.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-white/10 hover:border-yellow-400/40 rounded-2xl px-6 py-5 transition-all duration-300 mb-4"
              >
                <span className="text-blue-400 group-hover:text-yellow-400 transition-colors text-2xl font-mono font-bold">{'</>'}</span>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-medium">
                    Desenvolvido por
                  </span>
                  <span className="font-bold text-white group-hover:text-yellow-400 transition-colors text-base tracking-wider">
                    ELEMENTGROUP.PT
                  </span>
                </div>
              </a>
              
              <p className="text-gray-500 text-[10px] text-center leading-relaxed">
                AD São Romão © 2026 | Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation is now in globals.css */}
    </>
  );
};
