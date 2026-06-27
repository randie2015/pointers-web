export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatPostDate(isoDate: string, locale = 'es') {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(isoDate));
}

export function excerptFromContent(content: string, maxLength = 160) {
  const plain = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trim()}…`;
}
