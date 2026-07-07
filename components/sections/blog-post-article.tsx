import Image from 'next/image';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { PublicBlogPost } from '@/lib/cms/public-post';
import { formatPostDate } from '@/lib/blog/utils';
import { sanitizeBlogHtml } from '@/lib/cms/sanitize-blog-html';

type BlogPostArticleProps = {
  post: PublicBlogPost;
  locale: string;
  backLabel: string;
};

export function BlogPostArticle({ post, locale, backLabel }: BlogPostArticleProps) {
  const sanitizedContent = sanitizeBlogHtml(post.content);

  return (
    <article className="relative z-10 container-page pt-28 pb-32">
      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-brand"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-lg bg-purple px-2.5 py-1 font-semibold text-white">
              {post.category}
            </span>
            <time className="text-muted-foreground">{formatPostDate(post.publishedAt, locale)}</time>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock3 size={14} />
              {post.readTime} min
            </span>
          </div>

          <h1 className="mt-6 font-display text-3xl tracking-tight leading-tight md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          ) : null}
        </header>

        {post.imageUrl ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border/80 bg-white shadow-sm">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ) : null}

        <div
          className="blog-content relative z-10 mt-10 font-sans"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </article>
  );
}
