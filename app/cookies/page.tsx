'use client';

import { CookiePolicyPage } from '@/components/CookiePolicyPage';
import { useNavigate } from '@/hooks/useNavigate';

export default function CookiesPage() {
  const navigate = useNavigate();
  return <CookiePolicyPage onNavigate={navigate} />;
}
