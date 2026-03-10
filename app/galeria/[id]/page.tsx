'use client';

import { useParams } from 'next/navigation';
import { AlbumDetailPage } from '@/components/AlbumDetailPage';
import { useNavigate } from '@/hooks/useNavigate';

export default function AlbumDetalhe() {
  const params = useParams();
  const navigate = useNavigate();
  const albumId = Number(params.id);

  return <AlbumDetailPage albumId={albumId} onNavigate={navigate} />;
}
