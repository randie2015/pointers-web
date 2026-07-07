import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.');
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

function toRow(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    tag: post.tag,
    status: post.status,
    published_at: post.publishedAt,
    created_at: post.createdAt,
    updated_at: post.updatedAt
  };
}

const dataFile = path.join(__dirname, '..', 'data', 'blog-posts.json');
const raw = await readFile(dataFile, 'utf-8');
const posts = JSON.parse(raw);

const { error: tableError } = await supabase.from('blog_posts').select('id').limit(1);

if (tableError) {
  console.error('Could not access blog_posts table:', tableError.message);
  console.error('Run scripts/supabase/blog-schema.sql in the Supabase SQL Editor first.');
  process.exit(1);
}

const rows = posts.map(toRow);
const { error } = await supabase.from('blog_posts').upsert(rows, { onConflict: 'id' });

if (error) {
  console.error('Seed failed:', error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} blog posts into Supabase.`);
