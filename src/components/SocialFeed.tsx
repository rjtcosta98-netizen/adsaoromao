import React, { useEffect, useRef } from 'react';
import { Instagram, Facebook, ExternalLink } from 'lucide-react';

// 1. Declaração TypeScript para aceitar o custom element do RSS.app sem erros
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'rssapp-carousel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { id: string };
    }
  }
}

// Links das redes sociais
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/adsaoromao/',
  facebook: 'https://www.facebook.com/adsaoromao/',
};

export const SocialFeed: React.FC = () => {
  const scriptLoaded = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !scriptLoaded.current) {
          scriptLoaded.current = true;
          
          // Injeção assíncrona do script do RSS.app para proteger os Core Web Vitals
          const script = document.createElement('script');
          script.src = 'https://widget.rss.app/v1/carousel.js';
          script.type = 'text/javascript';
          script.async = true;
          document.body.appendChild(script);
          
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Pre-load 200px antes de aparecer no ecrã
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-20 lg:py-24 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase block mb-3">
            #ADSRomao
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 uppercase mb-6">
            Siga-nos nas Redes
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
            Fica a par de tudo o que acontece no universo ADSR. Partilha a tua paixão usando a nossa hashtag oficial.
          </p>

          {/* Social Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-14">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 md:px-8 py-3 bg-navy-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Instagram size={18} /> @adsaoromao
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 md:px-8 py-3 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Facebook size={18} /> AD São Romão
            </a>
          </div>
        </div>

        {/* RSS.APP Carousel Widget */}
        <div className="max-w-6xl mx-auto mb-10 min-h-[300px] flex justify-center">
          <rssapp-carousel id="6zRmNoW8o7Oa231Z"></rssapp-carousel>
        </div>

        {/* CTA para ver mais */}
        <div className="text-center">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-navy-900 font-bold text-sm uppercase tracking-wider hover:text-yellow-600 transition-colors group"
          >
            Ver mais no Instagram
            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};