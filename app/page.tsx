'use client';

import { HomePage } from '@/components/HomePage';
import { useNavigate } from '@/hooks/useNavigate';

export default function Home() {
  const navigate = useNavigate();
  return <HomePage onNavigate={navigate} />;
}
