'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { getPageRoute } from '@/lib/routes';

export function useNavigate() {
  const router = useRouter();

  const navigate = useCallback((page: string, id?: number) => {
    const route = getPageRoute(page, id);
    window.scrollTo(0, 0);
    router.push(route);
  }, [router]);

  return navigate;
}
