import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getPublishedPosts } from '@/lib/blog/store';
import { BlogPostGrid } from '@/components/sections/blog-post-grid';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = await getPublishedPosts();

  return (
    <BlogPostGrid
      posts={posts}
      locale={locale}
      labels={{
        eyebrow: t('eyebrow'),
        title: t('title'),
        subtitle: t('subtitle'),
        readMore: t('readMore')
      }}
    />
  );
}
