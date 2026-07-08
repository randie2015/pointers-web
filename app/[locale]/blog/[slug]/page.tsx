import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getPublicPostBySlug } from '@/lib/cms/posts-reader';
import { getServerAdminSession } from '@/lib/auth/server-session';
import { BlogPostArticle } from '@/components/sections/blog-post-article';

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublicPostBySlug(slug);

  if (!post) {
    return { title: 'Artículo no encontrado' };
  }

  const description = post.seoDescription || post.excerpt;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      ...(post.imageUrl ? { images: [{ url: post.imageUrl, alt: post.title }] } : {})
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        es: `/es/blog/${slug}`,
        en: `/en/blog/${slug}`,
        'x-default': `/es/blog/${slug}`
      }
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [post, session] = await Promise.all([
    getPublicPostBySlug(slug),
    getServerAdminSession()
  ]);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <BlogPostArticle
      post={post}
      locale={locale}
      backLabel={t('backToBlog')}
      editLabel={t('editPost')}
      showEditControls={Boolean(session)}
    />
  );
}
