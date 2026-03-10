import { useParams } from 'react-router-dom';
import { AlbumDetailPage as AlbumDetailComponent } from '@/components/AlbumDetailPage';

interface AlbumDetailWrapperProps {
  onNavigate: (page: string) => void;
}

export function AlbumDetailWrapper({ onNavigate }: AlbumDetailWrapperProps) {
  const { id } = useParams<{ id: string }>();
  const albumId = parseInt(id || '0', 10);
  
  return <AlbumDetailComponent albumId={albumId} onNavigate={onNavigate} />;
}
