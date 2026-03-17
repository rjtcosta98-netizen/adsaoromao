

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactsHero: React.FC = () => {
  const contactCards = [
    { icon: MapPin, label: 'Morada', value: 'Praça de São Pedro, N°1 A 6270-287 São Romão', href: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d759.6021070313888!2d-7.712482668286935!3d40.39980197942756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3cd5c76ac1575d%3A0xd1eb4b72faab685!2sCampo%20de%20futebol%20de%20S%C3%A3o%20Rom%C3%A3o!5e0!3m2!1spt-PT!2spt!4v1773752166776!5m2!1spt-PT!2spt' },
    { icon: Phone, label: 'Telefone', value: '+351 925 228 934', href: 'tel:+351925228934' },
    { icon: Mail, label: 'Email', value: 'geral@adsaoromao.pt', href: 'mailto:geral@adsaoromao.pt' },
    { icon: Clock, label: 'Secretaria', value: 'Seg-Sex 18h-20h · Sáb 10h-12h30', href: undefined },
  ];

  return (
    <div className="relative bg-navy-900 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://ik.imagekit.io/elementgroup/ADSR/607654669_1457358276390482_2193990120447886833_n.jpg")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-900/80 to-navy-900 z-10" />

      <div className="relative z-20 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-28">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase px-4 py-1.5 rounded-full mb-5">
            Estamos aqui para ti
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-none mb-5">
            Fale <span className="text-yellow-400">Connosco</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Tens dúvidas sobre inscrições, quotas ou parcerias? Estamos prontos para ajudar.
          </p>
        </div>

        {/* Quick contact cards */}
        <div className="container mx-auto px-4 mt-10 sm:mt-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const Wrapper = card.href ? 'a' : 'div';
              const wrapperProps = card.href
                ? { href: card.href, target: card.href.startsWith('http') ? '_blank' as const : undefined, rel: card.href.startsWith('http') ? 'noopener noreferrer' : undefined }
                : {};
              return (
                <Wrapper
                  key={card.label}
                  {...wrapperProps}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-400/20 transition-colors">
                    <Icon size={18} className="text-yellow-400 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-yellow-400 font-bold uppercase tracking-wider mb-1">{card.label}</p>
                  <p className="text-white text-[11px] sm:text-xs leading-snug">{card.value}</p>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
