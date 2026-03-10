import { useNavigate as useRouterNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getPageRoute } from '@/lib/routes';

export function useNavigate() {
  const router = useRouterNavigate();

  const navigate = useCallback((page: string, id?: number) => {
    const route = getPageRoute(page, id);
    window.scrollTo(0, 0);
    router(route);
  }, [router]);

  return navigate;
}
