import { DatabaseAdapter } from './dbAdapter';
import { localDbAdapter } from './localAdapter';
import { supabaseDbAdapter } from './supabaseAdapter';

export function getDbAdapter(): DatabaseAdapter {
  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

  const url = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');

  if (url && key && url !== 'https://placeholder.supabase.co') {
    return supabaseDbAdapter;
  }

  return localDbAdapter;
}
