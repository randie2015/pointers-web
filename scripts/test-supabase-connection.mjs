import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY');
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const { data, error } = await supabase.from('posts').select('id').limit(1);

if (error) {
  console.error('Connection failed:', error.message);
  if (error.message.includes('does not exist') || error.code === '42P01') {
    console.error('\nRun these SQL files in Supabase Dashboard → SQL Editor:');
    console.error('  1. scripts/supabase/posts-schema.sql');
    console.error('  2. scripts/supabase/posts-rls.sql');
  }
  process.exit(1);
}

console.log('Supabase connected successfully.');
console.log(`posts table accessible (${data?.length ?? 0} row(s) sampled).`);
