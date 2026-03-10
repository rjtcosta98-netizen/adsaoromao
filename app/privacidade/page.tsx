'use client';

import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';
import { useNavigate } from '@/hooks/useNavigate';

export default function PrivacidadePage() {
  const navigate = useNavigate();
  return <PrivacyPolicyPage onNavigate={navigate} />;
}
