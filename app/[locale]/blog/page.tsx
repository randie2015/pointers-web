'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

type BlogPost = {
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const posts = t.raw('posts') as BlogPost[];

  return (
    <section className="container-page pt-28 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl"
      >
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      </motion.div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <article className="group flex h-full flex-col rounded-3xl border border-border/80 bg-white p-6 md:p-7 shadow-sm transition-all hover:border-brand/30 hover:shadow-lg">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="rounded-lg bg-purple px-2.5 py-1 font-semibold text-white">{post.tag}</span>
                <time className="text-muted-foreground">{post.date}</time>
              </div>
              <h2 className="mt-5 font-display text-xl md:text-2xl tracking-tight leading-snug group-hover:text-brand transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                {t('readMore')}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
