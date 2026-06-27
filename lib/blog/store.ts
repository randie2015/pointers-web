/**
 * Blog persistence layer.
 *
 * Local dev: reads/writes `data/blog-posts.json`.
 * Serverless (Vercel): falls back to in-memory storage (resets on cold start).
 *
 * To connect a real database, replace the read/write helpers below with your
 * Prisma / Supabase / MongoDB client calls. Keep the exported function signatures.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from './types';
import { excerptFromContent, slugify } from './utils';

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

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

async function readPosts(): Promise<BlogPost[]> {
  if (memoryStore) return memoryStore;

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as BlogPost[];
    memoryStore = parsed;
    return parsed;
  } catch {
    memoryStore = [...SEED_POSTS];
    await writePosts(memoryStore);
    return memoryStore;
  }
}

async function writePosts(posts: BlogPost[]) {
  memoryStore = posts;

  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  } catch {
    // Serverless filesystem is read-only — in-memory fallback only.
  }
}

function uniqueSlug(base: string, posts: BlogPost[], excludeId?: string) {
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
  const posts = await readPosts();
  return posts.find((post) => post.id === id) ?? null;
}

export async function createPost(input: CreateBlogPostInput) {
  const posts = await readPosts();
  const now = new Date().toISOString();
  const baseSlug = slugify(input.title) || `post-${Date.now()}`;
  const excerpt = input.excerpt?.trim() || excerptFromContent(input.content);

  const post: BlogPost = {
    id: randomUUID(),
    slug: uniqueSlug(baseSlug, posts),
    title: input.title.trim(),
    excerpt,
    content: input.content,
    tag: input.tag?.trim() || 'General',
    status: input.status ?? 'draft',
    publishedAt: input.status === 'published' ? now : now,
    createdAt: now,
    updatedAt: now
  };

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
        ? uniqueSlug(slugify(nextTitle) || current.slug, posts, id)
        : current.slug,
    status: input.status ?? current.status,
    updatedAt: now,
    publishedAt:
      input.status === 'published' && current.status !== 'published' ? now : current.publishedAt
  };

  posts[index] = updated;
  await writePosts(posts);
  return updated;
}

export async function deletePost(id: string) {
  const posts = await readPosts();
  const next = posts.filter((post) => post.id !== id);
  if (next.length === posts.length) return false;

  await writePosts(next);
  return true;
}
