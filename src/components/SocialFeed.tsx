

import React, { useEffect, useRef } from 'react';
import { Instagram, Facebook, ExternalLink } from 'lucide-react';

// Coloca aqui os URLs dos posts de Instagram que queres mostrar
const INSTAGRAM_POSTS = [
  'https://rss.app/embed/v1/carousel/6zRmNoW8o7Oa231Z',

];

// Links das redes sociais
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/adsaoromao/',
  facebook: 'https://www.facebook.com/adsaoromao/',
};

export const SocialFeed: React.FC = () => {
  const embedsLoaded = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedsLoaded.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !embedsLoaded.current) {
          embedsLoaded.current = true;
          const script = document.createElement('script');
          script.src = 'https://www.instagram.com/embed.js';
          script.async = true;
          script.onload = () => {
            if ((window as any).instgrm) {
              (window as any).instgrm.Embeds.process();
            }
          };
          document.body.appendChild(script);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-white py-16 md:py-20 lg:py-24 border-t border-gray-100">
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

        {/* Instagram Embeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {INSTAGRAM_POSTS.map((postUrl, index) => (
            <div key={index} className="flex justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={postUrl}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '12px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '0',
                  maxWidth: '540px',
                  minWidth: '280px',
                  width: '100%',
                }}
              >
              </blockquote>
            </div>
          ))}
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
    </div>
  );
};
