import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/session';
import { CmsAuthorizationError } from '@/lib/cms/authorize';
import { publishPost } from '@/lib/cms/publish-post';
import { BLOG_CATEGORIES, type BlogPostFormState } from '@/lib/cms/post-types';

function getSessionToken(request: Request) {
  return request.headers.get('cookie')?.match(/admin_session=([^;]+)/)?.[1];
}

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
}

function revalidateBlogPages(slug?: string) {
  revalidatePath('/es/blog', 'layout');
  revalidatePath('/en/blog', 'layout');

  if (slug) {
    revalidatePath(`/es/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
  }
}

function parseFormState(formData: FormData): BlogPostFormState {
  const category = String(formData.get('category') ?? '');

  return {
    title: String(formData.get('title') ?? ''),
    slug: String(formData.get('slug') ?? ''),
    excerpt: String(formData.get('excerpt') ?? ''),
    content: String(formData.get('content') ?? ''),
    category: BLOG_CATEGORIES.includes(category as (typeof BLOG_CATEGORIES)[number])
      ? (category as BlogPostFormState['category'])
      : '',
    readTime: String(formData.get('readTime') ?? '5'),
    seoDescription: String(formData.get('seoDescription') ?? ''),
    reviewedBy: formData.get('reviewedBy') === 'true'
  };
}

export async function POST(request: Request) {
  const session = verifySessionToken(getSessionToken(request));
  if (!session) return unauthorized();

  try {
    const formData = await request.formData();
    const form = parseFormState(formData);
    const imageEntry = formData.get('image');
    const imageFile = imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null;

    const result = await publishPost({
      form,
      authorId: session.username,
      imageFile
    });

    revalidateBlogPages(result.slug);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof CmsAuthorizationError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    const message = error instanceof Error ? error.message : 'No se pudo publicar el artículo.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
