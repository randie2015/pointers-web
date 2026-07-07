import { unstable_noStore as noStore } from 'next/cache';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/server';
import type { BlogPostRecord, PostStatus } from './post-types';
import { sanitizeBlogHtml } from './sanitize-blog-html';

export type AdminPostListItem = {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  createdAt: string;
  category: string;
  excerpt: string;
  content: string;
  reviewedBy: boolean;
  authorId: string;
  isLiveOnSite: boolean;
};

export type PostMetrics = {
  total: number;
  published: number;
  drafts: number;
  liveOnSite: number;
};

function mapRow(row: BlogPostRecord): AdminPostListItem {
  const isLiveOnSite = row.status === 'published' && row.reviewed_by;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    createdAt: row.created_at,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    reviewedBy: row.reviewed_by,
    authorId: row.author_id,
    isLiveOnSite
  };
}

async function fetchAllRows(): Promise<BlogPostRecord[]> {
  noStore();

  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`No se pudieron cargar los artículos: ${error.message}`);
  }

  return (data ?? []) as BlogPostRecord[];
}

export async function getAdminPosts(): Promise<AdminPostListItem[]> {
  const rows = await fetchAllRows();
  return rows.map(mapRow);
}

export async function getPostMetrics(): Promise<PostMetrics> {
  const posts = await getAdminPosts();

  return {
    total: posts.length,
    published: posts.filter((post) => post.status === 'published').length,
    drafts: posts.filter((post) => post.status === 'draft').length,
    liveOnSite: posts.filter((post) => post.isLiveOnSite).length
  };
}

export async function getAdminPostById(id: string): Promise<AdminPostListItem | null> {
  noStore();

  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar el artículo: ${error.message}`);
  }

  return data ? mapRow(data as BlogPostRecord) : null;
}

export async function deleteAdminPost(id: string): Promise<boolean> {
  noStore();

  if (!isSupabaseConfigured()) {
    return false;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.from('posts').delete().eq('id', id).select('id');

  if (error) {
    throw new Error(`No se pudo eliminar el artículo: ${error.message}`);
  }

  return (data?.length ?? 0) > 0;
}

export async function updateAdminPost(
  id: string,
  input: {
    title?: string;
    excerpt?: string;
    content?: string;
    tag?: string;
    status?: PostStatus;
  }
): Promise<AdminPostListItem | null> {
  noStore();

  if (!isSupabaseConfigured()) {
    return null;
  }

  const patch: Record<string, string> = {};
  if (input.title !== undefined) patch.title = input.title.trim();
  if (input.excerpt !== undefined) patch.excerpt = input.excerpt.trim();
  if (input.content !== undefined) patch.content = sanitizeBlogHtml(input.content);
  if (input.tag !== undefined) patch.category = input.tag.trim();
  if (input.status !== undefined) patch.status = input.status;

  if (Object.keys(patch).length === 0) {
    return getAdminPostById(id);
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('posts')
    .update(patch)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo actualizar el artículo: ${error.message}`);
  }

  return data ? mapRow(data as BlogPostRecord) : null;
}

export function toLegacyBlogPost(item: AdminPostListItem) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    tag: item.category,
    status: item.status,
    publishedAt: item.createdAt,
    createdAt: item.createdAt,
    updatedAt: item.createdAt,
    reviewedBy: item.reviewedBy,
    isLiveOnSite: item.isLiveOnSite
  };
}
