import type { BlogPostFormState } from './post-types';

export function getPlainTextContent(content: string) {
  return content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function estimateReadTime(content: string) {
  const plain = getPlainTextContent(content);
  const words = plain ? plain.split(' ').length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function isPublishFormReady(form: BlogPostFormState) {
  return Boolean(
    form.title.trim() &&
      form.slug.trim() &&
      getPlainTextContent(form.content) &&
      form.category
  );
}

export function validatePublishForm(form: BlogPostFormState) {
  if (!form.title.trim()) {
    return 'El título es obligatorio.';
  }

  if (!form.slug.trim()) {
    return 'El slug es obligatorio.';
  }

  if (!getPlainTextContent(form.content)) {
    return 'El contenido es obligatorio.';
  }

  if (!form.category) {
    return 'Selecciona una categoría.';
  }

  return null;
}
