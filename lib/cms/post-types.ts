export const BLOG_CATEGORIES = [
  'Estrategia & Branding',
  'Arquitectura & Tech',
  'Reviews & Herramientas',
  'Growth & Conversión'
] as const;

export const BLOG_ASSETS_BUCKET = 'blog-assets';

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type PostStatus = 'draft' | 'published';

export type BlogPostRecord = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: BlogCategory;
  status: PostStatus;
  read_time: number;
  seo_description: string | null;
  author_id: string;
  reviewed_by: boolean;
};

export type BlogPostInsert = Omit<BlogPostRecord, 'id' | 'created_at'>;

export type BlogPostFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory | '';
  readTime: string;
  seoDescription: string;
  reviewedBy: boolean;
};

export const EMPTY_BLOG_POST_FORM: BlogPostFormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  readTime: '5',
  seoDescription: '',
  reviewedBy: false
};
