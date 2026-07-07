import type { SupabaseClient } from '@supabase/supabase-js';
import { BLOG_ASSETS_BUCKET } from './post-types';

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);
const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

export function getImageExtension(file: File) {
  const fromName = file.name.split('.').pop()?.toLowerCase();
  if (fromName && ALLOWED_EXTENSIONS.has(fromName)) {
    return fromName === 'jpeg' ? 'jpg' : fromName;
  }

  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif'
  };

  return mimeMap[file.type] ?? 'jpg';
}

export function validateImageFile(file: File) {
  if (!file.type.startsWith('image/')) {
    return 'Selecciona un archivo de imagen válido (JPG, PNG, WebP, etc.).';
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return 'La imagen no puede superar los 8 MB.';
  }

  return null;
}

type UploadCoverImageParams = {
  supabase: SupabaseClient;
  file: File;
  slug: string;
  authorId: string;
};

export async function uploadCoverImage({
  supabase,
  file,
  slug,
  authorId
}: UploadCoverImageParams) {
  const extension = getImageExtension(file);
  const filePath = `covers/${authorId}/${slug}-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(BLOG_ASSETS_BUCKET)
    .upload(filePath, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type
    });

  if (uploadError) {
    throw new Error(`No se pudo subir la imagen: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(BLOG_ASSETS_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}
