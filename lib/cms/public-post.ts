import type { BlogPostRecord } from './post-types';

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string | null;
  readTime: number;
  seoDescription: string | null;
  publishedAt: string;
};

export function toPublicBlogPost(row: BlogPostRecord): PublicBlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    imageUrl: row.image_url,
    readTime: row.read_time,
    seoDescription: row.seo_description,
    publishedAt: row.created_at
  };
}
