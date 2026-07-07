import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { assertCanPublish, assertValidCategory } from './authorize';
import { buildPostPayload } from './build-post-payload';
import type { BlogPostFormState } from './post-types';
import { validatePublishForm } from './validation';
import { uploadCoverImage } from './upload-cover';

export type PublishPostInput = {
  form: BlogPostFormState;
  authorId: string;
  imageFile?: File | null;
};

export async function publishPost({ form, authorId, imageFile }: PublishPostInput) {
  const validationError = validatePublishForm(form);
  if (validationError) {
    throw new Error(validationError);
  }

  assertValidCategory(form.category);
  assertCanPublish(authorId, form.reviewedBy);

  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase no está configurado. Define SUPABASE_URL y SUPABASE_SECRET_KEY en el servidor.'
    );
  }

  const supabase = createAdminClient();
  const payload = buildPostPayload({ form, authorId });

  const imageUrl = imageFile
    ? await uploadCoverImage({
        supabase,
        file: imageFile,
        slug: payload.slug,
        authorId
      })
    : null;

  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...payload,
      image_url: imageUrl
    })
    .select('id, status, reviewed_by')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
