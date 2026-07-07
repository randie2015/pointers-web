import { setRequestLocale } from 'next-intl/server';
import { getPublicPosts } from '@/lib/cms/posts-reader';
import { BlogPostGrid } from '@/components/sections/blog-post-grid';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getPublicPosts();

  return <BlogPostGrid posts={posts} />;
}
