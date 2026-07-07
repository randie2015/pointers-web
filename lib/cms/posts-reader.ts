import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/server';
import type { BlogPostRecord } from './post-types';
import { toPublicBlogPost, type PublicBlogPost } from './public-post';

async function fetchPublishedRows() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('reviewed_by', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to load blog posts: ${error.message}`);
  }

  return (data ?? []) as BlogPostRecord[];
}

export async function getPublicPosts(): Promise<PublicBlogPost[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const rows = await fetchPublishedRows();
  return rows.map(toPublicBlogPost);
}

export async function getPublicPostBySlug(slug: string): Promise<PublicBlogPost | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('reviewed_by', true)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load blog post: ${error.message}`);
  }

  return data ? toPublicBlogPost(data as BlogPostRecord) : null;
}

export async function getPublicPostSlugs(): Promise<string[]> {
  const posts = await getPublicPosts();
  return posts.map((post) => post.slug);
}
