'use client';

import React from 'react';
import { GalleryHero } from './GalleryHero';
import { GalleryAlbums } from './GalleryAlbums';
import { GalleryVideos } from './GalleryVideos';

interface GalleryPageProps {
  onNavigate?: (page: string, id?: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  return (
    <>
      <GalleryHero onNavigate={onNavigate} />
      <GalleryAlbums onNavigate={onNavigate} />
      <GalleryVideos />
    </>
  );
};