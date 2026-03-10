'use client';

import { AdminDashboard } from '@/components/AdminDashboard';
import { useNavigate } from '@/hooks/useNavigate';

export default function Admin() {
  const navigate = useNavigate();
  return <AdminDashboard onLogout={() => navigate('home')} />;
}
