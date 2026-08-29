import { DatabaseAdapter } from './dbAdapter';
import { localDbAdapter } from './localAdapter';
import { supabaseDbAdapter } from './supabaseAdapter';

export function getDbAdapter(): DatabaseAdapter {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key && url !== 'https://placeholder.supabase.co') {
    return supabaseDbAdapter;
  }

  return localDbAdapter;
}
