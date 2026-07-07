import { isAdmin } from '@/lib/auth/roles';
import { BLOG_CATEGORIES } from './post-types';

export class CmsAuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CmsAuthorizationError';
  }
}

export function assertCanReview(username: string, reviewedBy: boolean) {
  if (reviewedBy && !isAdmin(username)) {
    throw new CmsAuthorizationError('Solo un administrador puede marcar contenido como revisado.');
  }
}

export function assertCanPublish(username: string, reviewedBy: boolean) {
  assertCanReview(username, reviewedBy);
}

export function assertValidCategory(category: string) {
  if (!BLOG_CATEGORIES.includes(category as (typeof BLOG_CATEGORIES)[number])) {
    throw new CmsAuthorizationError('La categoría seleccionada no es válida.');
  }
}

export function resolvePublicationState(username: string, reviewedBy: boolean) {
  const admin = isAdmin(username);
  const safeReviewedBy = admin ? reviewedBy : false;

  return {
    reviewed_by: safeReviewedBy,
    status: safeReviewedBy ? ('published' as const) : ('draft' as const)
  };
}

export function assertCanEditPost(
  username: string,
  post: { author_id: string; reviewed_by: boolean }
) {
  if (isAdmin(username)) return;

  if (post.author_id !== username) {
    throw new CmsAuthorizationError('No puedes editar artículos de otros autores.');
  }

  if (post.reviewed_by) {
    throw new CmsAuthorizationError('Este artículo ya fue revisado y solo un admin puede editarlo.');
  }
}
