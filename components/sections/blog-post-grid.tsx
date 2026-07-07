'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { PublicBlogPost } from '@/lib/cms/public-post';
import { formatPostDate } from '@/lib/blog/utils';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/ui/section-header';

type BlogPostGridProps = {
  posts: PublicBlogPost[];
  locale: string;
  labels: {
    eyebrow: string;
    title: string;
    subtitle: string;
    readMore: string;
  };
};

export function BlogPostGrid({ posts, locale, labels }: BlogPostGridProps) {
  return (
    <section className="relative z-[1] container-page pt-28 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl"
      >
        <SectionHeader eyebrow={labels.eyebrow} title={labels.title} subtitle={labels.subtitle} />
      </motion.div>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No hay artículos publicados aún.</p>
      ) : (
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-white shadow-sm transition-all hover:border-brand/30 hover:shadow-lg"
              >
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
                  <h2 className="mt-5 font-display text-xl md:text-2xl tracking-tight leading-snug group-hover:text-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    {labels.readMore}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
