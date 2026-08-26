
import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { GALLERY_ALBUMS } from '../constants';
import { Section, SectionInner, SectionHeading } from './ui/Section';

interface GallerySectionProps {
  onNavigate: (page: string, id?: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigate }) => {
  const albums = GALLERY_ALBUMS.slice(0, 3);
  const totalPhotos = GALLERY_ALBUMS.reduce((sum, album) => sum + album.photos.length, 0);

  return (
    <Section tone="dark">
      {/* Luz de estádio — o mesmo halo dourado usado em todas as secções escuras */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold-400/[0.06] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-navy-300/[0.06] rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <SectionInner>
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Momentos do Clube"
          title={<>Galeria <span className="text-gold-400">Fotográfica</span></>}
          description={`Revive os melhores momentos dos nossos jogos e eventos. ${totalPhotos}+ fotografias que contam a nossa história.`}
        />

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className={`group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1 h-56 sm:h-64 md:h-80' : 'h-56 sm:h-64 md:h-80'
              }`}
              onClick={() => onNavigate('album-detalhe', album.id)}
            >
              {/* Image */}
              <img
                src={album.coverImage}
                alt={album.title}
                loading="lazy"
                width={600}
                height={400}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>

              {/* Photo Count Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gold-400 text-navy-900 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-gold flex items-center gap-1.5">
                <Camera size={12} />
                {album.photos.length} Fotos
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6">
                <p className="text-gold-400/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-2">
                  {album.date}
                </p>
                <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-white uppercase leading-tight group-hover:text-gold-400 transition-colors duration-300">
                  {album.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm mt-1">
                  {album.subtitle}
                </p>
                <div className="mt-3 sm:mt-4 w-10 sm:w-12 h-0.5 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-14">
          <button
            onClick={() => onNavigate('galeria')}
            className="group/btn inline-flex items-center gap-2 sm:gap-3 bg-gold-400 hover:bg-gold-300 text-navy-900 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full uppercase text-xs tracking-widest transition-all shadow-gold"
          >
            Ver Galeria Completa
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </SectionInner>
    </Section>
  );
};
