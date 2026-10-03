import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, ExternalLink } from 'lucide-react';

// Links das redes sociais
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/adsaoromao/',
  facebook: 'https://www.facebook.com/adsaoromao/',
};

// Posts do Instagram para mostrar (atualizar periodicamente com os URLs dos posts)
const INSTAGRAM_POSTS = [
  'https://www.instagram.com/p/DcerbvsDCQN/',
  'https://www.instagram.com/p/Dcdw_Lzses5/',
  'https://www.instagram.com/p/DcZoBH0jP1n/'

];

const processInstagramEmbeds = () => {
  const instagram = (window as any).instgrm;
  if (instagram?.Embeds?.process) {
    instagram.Embeds.process();
  }
};

export const SocialFeed: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
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

  useEffect(() => {
    if (!isVisible) return;

    // Carrega o script de embeds do Instagram
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      {/* Superfície clara: sem véu nem diagonal, só um halo navy muito subtil para dar profundidade. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,45,97,0.05),transparent_45%)]"></div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-display text-2xl font-bold uppercase text-navy-900 sm:text-3xl md:text-5xl">
            Siga-nos nas redes
          </h2>
          <p className="mx-auto mt-4 mb-8 max-w-lg text-[12px] leading-relaxed text-gray-600 sm:text-sm">
            Fica a par de tudo o que acontece no universo ADSR. Partilha a tua paixão com{' '}
            <span className="font-semibold text-navy-800">#ADSRomao</span>.
          </p>

          {/* Social Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-14">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-navy-900/20 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900 hover:bg-navy-900 hover:text-white md:px-8"
            >
              <Instagram size={18} /> @adsaoromao
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-500 md:px-8"
            >
              <Facebook size={18} /> AD São Romão
            </a>
          </div>
        </div>

        {/* Instagram Posts Grid */}
        <div className="max-w-6xl mx-auto mb-10">
          {isVisible && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {INSTAGRAM_POSTS.map((postUrl, index) => (
                <div key={index} className="w-full max-w-[350px]">
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
                      margin: '0 auto',
                      maxWidth: '350px',
                      minWidth: '280px',
                      padding: 0,
                      width: '100%',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA para ver mais */}
        <div className="text-center">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-900 transition-colors hover:text-navy-700"
          >
            Ver mais no Instagram
            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};