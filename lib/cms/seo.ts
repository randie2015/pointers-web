import { getPlainTextContent } from './validation';

const DEFAULT_MAX_LENGTH = 160;

export function generateSeoDescription(
  content: string,
  options?: { excerpt?: string; maxLength?: number }
) {
  const maxLength = options?.maxLength ?? DEFAULT_MAX_LENGTH;
  const excerpt = options?.excerpt?.trim();
  const source = excerpt || getPlainTextContent(content);

  if (!source) return '';
  if (source.length <= maxLength) return source;

  const truncated = source.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > maxLength * 0.6) {
    return `${truncated.slice(0, lastSpace).trim()}…`;
  }

  return `${truncated.trim()}…`;
}

export function resolveSeoDescription(form: {
  seoDescription: string;
  excerpt: string;
  content: string;
}) {
  const manual = form.seoDescription.trim();
  if (manual) return manual;

  const fromExcerpt = generateSeoDescription(form.content, { excerpt: form.excerpt });
  if (fromExcerpt) return fromExcerpt;

  return generateSeoDescription(form.content) || null;
}
