'use client';

import { TermsPage } from '@/components/TermsPage';
import { useNavigate } from '@/hooks/useNavigate';

export default function TermosPage() {
  const navigate = useNavigate();
  return <TermsPage onNavigate={navigate} />;
}
