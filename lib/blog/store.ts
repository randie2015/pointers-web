/**
 * Blog persistence layer.
 *
 * Uses Supabase when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRET_KEY are set.
 * Falls back to data/blog-posts.json for local dev without Supabase.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/server';
import type { BlogPost, CreateBlogPostInput, PostStatus, UpdateBlogPostInput } from './types';
import { excerptFromContent, slugify } from './utils';

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  status: PostStatus;
  published_at: string;
  created_at: string;
  updated_at: string;
};

const SEED_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'branding-que-conecta',
    title: 'Branding que conecta: más allá del logo',
    excerpt:
      'Cómo construir una identidad visual coherente que transmita propósito y genere confianza en cada punto de contacto.',
    content:
      '<p>Una marca sólida no se limita a un logotipo atractivo. Es un sistema visual y verbal que comunica propósito en cada interacción.</p><p>En Pointers ayudamos a las empresas a definir tono, paleta, tipografía y narrativa para construir confianza duradera.</p>',
    tag: 'Branding',
    status: 'published',
    publishedAt: '2026-05-12T10:00:00.000Z',
    createdAt: '2026-05-12T10:00:00.000Z',
    updatedAt: '2026-05-12T10:00:00.000Z'
  },
  {
    id: 'post-2',
    slug: 'webs-que-convierten',
    title: 'Webs que convierten sin sacrificar estética',
    excerpt:
      'Claves de UX, velocidad y narrativa visual para transformar visitantes en clientes.',
    content:
      '<p>El diseño y el rendimiento no están en conflicto. Una web rápida, clara y visualmente memorable convierte mejor.</p><p>Prioriza jerarquía visual, mensajes directos y tiempos de carga óptimos.</p>',
    tag: 'Diseño Web',
    status: 'published',
    publishedAt: '2026-04-28T10:00:00.000Z',
    createdAt: '2026-04-28T10:00:00.000Z',
    updatedAt: '2026-04-28T10:00:00.000Z'
  },
  {
    id: 'post-3',
    slug: 'contenido-redes-2026',
    title: 'Estrategia de contenido en redes que sí funciona',
    excerpt:
      'Planifica, crea y mide publicaciones que refuercen tu marca y acerquen a tu audiencia.',
    content:
      '<p>La consistencia y la estrategia superan a la viralidad accidental. Define pilares de contenido, calendario y métricas claras.</p><p>Mide engagement, alcance y conversiones para iterar con datos.</p>',
    tag: 'Contenido',
    status: 'published',
    publishedAt: '2026-04-15T10:00:00.000Z',
    createdAt: '2026-04-15T10:00:00.000Z',
    updatedAt: '2026-04-15T10:00:00.000Z'
  }
];

let memoryStore: BlogPost[] | null = null;

function rowToPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    tag: row.tag,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function postToRow(post: BlogPost) {
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

async function readPostsFromFile(): Promise<BlogPost[]> {
  if (memoryStore) return memoryStore;

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as BlogPost[];
    memoryStore = parsed;
    return parsed;
  } catch {
    memoryStore = [...SEED_POSTS];
    await writePostsToFile(memoryStore);
    return memoryStore;
  }
}

async function writePostsToFile(posts: BlogPost[]) {
  memoryStore = posts;

  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  } catch {
    // Serverless filesystem is read-only — in-memory fallback only.
  }
}

async function readPostsFromSupabase(): Promise<BlogPost[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase read failed: ${error.message}`);
  }

  return (data as BlogPostRow[]).map(rowToPost);
}

async function readPosts(): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    return readPostsFromSupabase();
  }

  return readPostsFromFile();
}

async function writePosts(posts: BlogPost[]) {
  if (isSupabaseConfigured()) {
    return;
  }

  await writePostsToFile(posts);
}

async function uniqueSlug(base: string, posts: BlogPost[], excludeId?: string) {
  let slug = base;
  let counter = 1;

  while (posts.some((post) => post.slug === slug && post.id !== excludeId)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

export async function getAllPosts() {
  const posts = await readPosts();
  return [...posts].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getPublishedPosts() {
  const posts = await getAllPosts();
  return posts.filter((post) => post.status === 'published');
}

export async function getPostById(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle();

    if (error) {
      throw new Error(`Supabase read failed: ${error.message}`);
    }

    return data ? rowToPost(data as BlogPostRow) : null;
  }

  const posts = await readPostsFromFile();
  return posts.find((post) => post.id === id) ?? null;
}

export async function createPost(input: CreateBlogPostInput) {
  const now = new Date().toISOString();
  const posts = await readPosts();
  const baseSlug = slugify(input.title) || `post-${Date.now()}`;
  const excerpt = input.excerpt?.trim() || excerptFromContent(input.content);

  const post: BlogPost = {
    id: randomUUID(),
    slug: await uniqueSlug(baseSlug, posts),
    title: input.title.trim(),
    excerpt,
    content: input.content,
    tag: input.tag?.trim() || 'General',
    status: input.status ?? 'draft',
    publishedAt: now,
    createdAt: now,
    updatedAt: now
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postToRow(post))
      .select('*')
      .single();

    if (error) {
      throw new Error(`Supabase create failed: ${error.message}`);
    }

    return rowToPost(data as BlogPostRow);
  }

  posts.unshift(post);
  await writePosts(posts);
  return post;
}

export async function updatePost(id: string, input: UpdateBlogPostInput) {
  const posts = await readPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  const current = posts[index];
  const now = new Date().toISOString();
  const nextTitle = input.title?.trim() ?? current.title;

  const updated: BlogPost = {
    ...current,
    ...input,
    title: nextTitle,
    excerpt:
      input.excerpt?.trim() ||
      (input.content ? excerptFromContent(input.content) : current.excerpt),
    tag: input.tag?.trim() ?? current.tag,
    slug:
      input.title !== undefined
        ? await uniqueSlug(slugify(nextTitle) || current.slug, posts, id)
        : current.slug,
    status: input.status ?? current.status,
    updatedAt: now,
    publishedAt:
      input.status === 'published' && current.status !== 'published' ? now : current.publishedAt
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .update(postToRow(updated))
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new Error(`Supabase update failed: ${error.message}`);
    }

    return data ? rowToPost(data as BlogPostRow) : null;
  }

  posts[index] = updated;
  await writePosts(posts);
  return updated;
}

export async function deletePost(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('blog_posts').delete().eq('id', id).select('id');

    if (error) {
      throw new Error(`Supabase delete failed: ${error.message}`);
    }

    return (data?.length ?? 0) > 0;
  }

  const posts = await readPostsFromFile();
  const next = posts.filter((post) => post.id !== id);
  if (next.length === posts.length) return false;

  await writePosts(next);
  return true;
}
