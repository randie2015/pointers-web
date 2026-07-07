import { setRequestLocale } from 'next-intl/server';
import { getPublicPosts } from '@/lib/cms/posts-reader';
import { getServerAdminSession } from '@/lib/auth/server-session';
import { BlogPostGrid } from '@/components/sections/blog-post-grid';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [posts, session] = await Promise.all([getPublicPosts(), getServerAdminSession()]);

  return <BlogPostGrid posts={posts} showNewPostCta={Boolean(session)} />;
}
