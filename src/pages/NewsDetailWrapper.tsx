import { useParams } from 'react-router-dom';
import { NewsDetailPage as NewsDetailComponent } from '@/components/NewsDetailPage';

interface NewsDetailWrapperProps {
  onNavigate: (page: string, id?: number) => void;
}

export function NewsDetailWrapper({ onNavigate }: NewsDetailWrapperProps) {
  const { id } = useParams<{ id: string }>();
  const newsId = parseInt(id || '0', 10);
  
  return <NewsDetailComponent newsId={newsId} onNavigate={onNavigate} />;
}
