import { slugify } from '@/lib/blog/utils';
import { resolvePublicationState } from './authorize';
import { resolveSeoDescription } from './seo';
import type { BlogPostFormState } from './post-types';
import { estimateReadTime } from './validation';

export type BuildPostPayloadInput = {
  form: BlogPostFormState;
  authorId: string;
  imageUrl?: string | null;
};

export function buildPostPayload({ form, authorId, imageUrl = null }: BuildPostPayloadInput) {
  const publication = resolvePublicationState(authorId, form.reviewedBy);
  const normalizedSlug = slugify(form.slug);

  return {
    title: form.title.trim(),
    slug: normalizedSlug,
    excerpt: form.excerpt.trim(),
    content: form.content,
    image_url: imageUrl,
    category: form.category,
    read_time: Number(form.readTime) || estimateReadTime(form.content),
    seo_description: resolveSeoDescription(form),
    author_id: authorId,
    reviewed_by: publication.reviewed_by,
    status: publication.status
  };
}
