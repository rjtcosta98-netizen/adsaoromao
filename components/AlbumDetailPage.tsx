'use client';

import React from 'react';
import { ArrowLeft, Download, Share2, Calendar, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ALBUMS } from '../constants';

interface AlbumDetailPageProps {
  albumId: number;
  onNavigate: (page: string) => void;
}

export const AlbumDetailPage: React.FC<AlbumDetailPageProps> = ({ albumId, onNavigate }) => {
  const album = GALLERY_ALBUMS.find(a => a.id === albumId);

  if (!album) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl mb-4">Álbum não encontrado</h2>
          <button
            onClick={() => onNavigate('galeria')}
            className="bg-yellow-400 text-navy-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors"
          >
            Voltar à Galeria
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-navy-800 to-navy-900 border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => onNavigate('galeria')}
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Voltar à Galeria</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white uppercase mb-2">
                {album.title}
              </h1>
              <p className="text-gray-400 text-lg mb-3">{album.subtitle}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{album.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} />
                  <span>{album.photos.length} Fotos</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors">
                <Share2 size={18} />
                <span className="text-sm font-bold">Partilhar</span>
              </button>
              <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-navy-900 px-4 py-3 rounded-lg transition-colors">
                <Download size={18} />
                <span className="text-sm font-bold">Descarregar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {album.photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-navy-800 border border-white/10 hover:border-yellow-400/50 transition-all cursor-pointer"
            >
              <img
                src={photo.url}
                alt={`${album.title} - Foto ${photo.id}`}
                loading="lazy"
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <ImageIcon size={32} className="mx-auto mb-2" />
                  <p className="text-sm font-bold">Ver Foto</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
