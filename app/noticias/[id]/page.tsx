'use client';

import { useParams } from 'next/navigation';
import { NewsDetailPage } from '@/components/NewsDetailPage';
import { useNavigate } from '@/hooks/useNavigate';

export default function NoticiaDetalhe() {
  const params = useParams();
  const navigate = useNavigate();
  const newsId = Number(params.id);

  return <NewsDetailPage newsId={newsId} onNavigate={navigate} />;
}
