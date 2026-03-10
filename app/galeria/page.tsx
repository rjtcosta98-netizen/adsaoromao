'use client';

import { GalleryPage } from '@/components/GalleryPage';
import { useNavigate } from '@/hooks/useNavigate';

export default function Galeria() {
  const navigate = useNavigate();
  return <GalleryPage onNavigate={navigate} />;
}
