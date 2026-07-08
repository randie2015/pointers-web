'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { PublicBlogPost } from '@/lib/cms/public-post';
import { formatPostDate } from '@/lib/blog/utils';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { BlogEditLink } from '@/components/blog/blog-edit-link';

type BlogPostGridProps = {
  posts: PublicBlogPost[];
  showAdminControls?: boolean;
};

export function BlogPostGrid({ posts, showAdminControls = false }: BlogPostGridProps) {
  const t = useTranslations('blog');
  const locale = useLocale();

  return (
    <section className="relative z-[1] container-page pt-28 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
          {showAdminControls ? (
            <Link
              href="/admin/dashboard/blog?create=1"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
            >
              <Plus size={16} aria-hidden />
              {t('newPost')}
            </Link>
          ) : null}
        </div>
      </motion.div>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">{t('empty')}</p>
      ) : (
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-white shadow-sm transition-all hover:border-brand/30 hover:shadow-lg">
                {showAdminControls ? (
                  <div className="absolute right-3 top-3 z-20">
                    <BlogEditLink postId={post.id} label={t('editPost')} />
                  </div>
                ) : null}

                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                  {post.imageUrl ? (
                    <div className="relative aspect-[16/10] w-full bg-muted">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="rounded-lg bg-purple px-2.5 py-1 font-semibold text-white">
                        {post.category}
                      </span>
                      <time className="text-muted-foreground">
                        {formatPostDate(post.publishedAt, locale)}
                      </time>
                    </div>
                    <h2 className="mt-5 font-display text-xl leading-snug tracking-tight transition-colors group-hover:text-brand md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      {t('readMore')}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
