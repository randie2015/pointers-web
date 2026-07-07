import { createClient } from '@supabase/supabase-js';

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    return null;
  }

  return { url, secretKey };
}

export function isSupabaseConfigured() {
  return getSupabaseConfig() !== null;
}

export function createAdminClient() {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error(
      'Supabase no está configurado. Define SUPABASE_URL y SUPABASE_SECRET_KEY (o sus variantes NEXT_PUBLIC_).'
    );
  }

  return createClient(config.url, config.secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
