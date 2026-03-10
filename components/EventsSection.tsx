'use client';

import React from 'react';
import { Calendar, MapPin, TrophyIcon, Mail, MessageCircle } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const event = {
    id: 1,
    title: 'ADSR CUP 2026',
    dates_range: '13/14 e 20/21 Junho',
    location: 'Estádio N. S. Conceição, São Romão',
    category: 'evento',
    description: 'A ADSR CUP 2026, na sua IV edição, promove voltar a reunir jovens talentos, clubes e famílias num ambiente de competição saudável, paixão pelo futebol e fair-play.',
    fullDescription: 'O torneio decorrerá nos dias 13 e 14 de junho e 20 e 21 de junho de 2026, no Estádio N. S. Conceição, em São Romão. Várias categorias em competição: SUB 8, SUB 10, SUB 12, SUB 14 e SUB 16.',
    image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CUP%202026'
  };

  return (
    <section className="py-8 md:py-12 relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header com Destaque */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#fed700] to-yellow-500 rounded-lg shadow-lg flex-shrink-0">
            <TrophyIcon size={20} className="text-[#1f398a]" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1f398a]">Eventos Importantes</h2>
        </div>

        {/* Main Event Card */}
        <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl flex flex-col lg:flex-row border-l-4 md:border-l-8 border-[#fed700] bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300 group">
          {/* Image Section - Left Side */}
          {event.image && (
            <div className="relative w-full lg:w-2/5 h-48 sm:h-56 md:h-64 lg:h-auto lg:min-h-[320px] overflow-hidden flex-shrink-0 bg-gray-100">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                width={500}
                height={320}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-gradient-to-r from-[#fed700] to-yellow-500 text-[#1f398a] px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm shadow-lg flex items-center gap-1.5 md:gap-2">
                <TrophyIcon size={14} className="fill-current flex-shrink-0" />
                <span>DESTAQUE</span>
              </div>
            </div>
          )}

          {/* Content Section - Right Side */}
          <div className="p-5 sm:p-6 md:p-8 lg:p-10 lg:w-3/5 flex flex-col justify-center">
            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1f398a] mb-2 md:mb-3 leading-tight">
              {event.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-base text-gray-700 mb-5 md:mb-7 leading-relaxed font-medium">
              {event.description}
            </p>

            {/* Event Details - Horizontal */}
            <div className="space-y-2 md:space-y-3 mb-5 md:mb-7">
              {/* Dates */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 bg-[#fed700] rounded-lg flex items-center justify-center shadow-md">
                  <Calendar size={18} className="text-[#1f398a]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">DATAS</p>
                  <p className="text-base md:text-lg font-black text-[#1f398a] break-words">{event.dates_range}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 bg-[#fed700] rounded-lg flex items-center justify-center shadow-md">
                  <MapPin size={18} className="text-[#1f398a]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">LOCAL</p>
                  <p className="text-base md:text-lg font-black text-[#1f398a] break-words">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-5 md:mb-7 bg-gradient-to-r from-[#fed700]/10 to-yellow-100 border-l-3 md:border-l-4 border-[#fed700] p-3 md:p-4 rounded-r-lg">
              <p className="text-xs text-[#1f398a] font-bold uppercase tracking-wider mb-1.5 md:mb-2">Categorias</p>
              <p className="font-black text-[#1f398a] text-xs sm:text-sm md:text-base leading-relaxed">SUB 8 • SUB 10 • SUB 12 • SUB 14 • SUB 16</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/351925228934?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20ADSR%20CUP%202026."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black py-2.5 sm:py-3 px-5 md:px-6 rounded-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:geral@adsaoromao.pt?subject=Informações ADSR CUP 2026"
                className="flex-1 bg-[#1f398a] hover:bg-[#162a6b] text-white font-black py-2.5 sm:py-3 px-5 md:px-6 rounded-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Element */}
        <div className="mt-6 md:mt-8 text-center">
          <div className="inline-flex items-center gap-1.5 md:gap-2 text-[#1f398a] font-bold flex-wrap justify-center px-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#fed700] flex-shrink-0"></div>
            <span className="text-xs md:text-sm">Eventos importantes do clube</span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#fed700] flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
