import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hwfgehcmvggpdskrbzja.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3ZmdlaGNtdmdncGRza3JiemphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTY0MTIsImV4cCI6MjA4NzUzMjQxMn0.AXcKCAvC-GeR8AlaokgVr2byX9PgcYwdexbMotrJK8g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
