'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import {
  BLOG_CATEGORIES,
  EMPTY_BLOG_POST_FORM,
  type BlogCategory,
  type BlogPostFormState
} from '@/lib/cms/post-types';
import { optimizeImageForUpload } from '@/lib/cms/optimize-image';
import { isPublishFormReady, validatePublishForm } from '@/lib/cms/validation';
import { validateImageFile } from '@/lib/cms/upload-cover';
import { slugify } from '@/lib/blog/utils';
import { RichTextEditor } from '@/components/admin/rich-text-editor';
import { ReviewStatusIndicator } from '@/components/admin/blog-admin/review-status-indicator';

type BlogAdminProps = {
  authorId?: string;
  isAdmin?: boolean;
  onPublished?: () => void;
  onCancel?: () => void;
};

type SessionInfo = {
  authorId: string;
  isAdmin: boolean;
};

const inputClassName =
  'w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand focus:ring-2 focus:ring-brand/20';

export function BlogAdmin({
  authorId: authorIdProp,
  isAdmin: isAdminProp = false,
  onPublished,
  onCancel
}: BlogAdminProps) {
  const [form, setForm] = useState<BlogPostFormState>(EMPTY_BLOG_POST_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [session, setSession] = useState<SessionInfo>({
    authorId: authorIdProp ?? '',
    isAdmin: isAdminProp
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [optimizingImage, setOptimizingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canPublish = useMemo(() => isPublishFormReady(form), [form]);

  useEffect(() => {
    if (authorIdProp) {
      setSession({ authorId: authorIdProp, isAdmin: isAdminProp });
      return;
    }

    void fetch('/api/admin/me')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { authorId?: string; isAdmin?: boolean } | null) => {
        if (data?.authorId) {
          setSession({
            authorId: data.authorId,
            isAdmin: Boolean(data.isAdmin)
          });
        }
      })
      .catch(() => undefined);
  }, [authorIdProp, isAdminProp]);

  useEffect(() => {
    if (slugTouched) return;
    setForm((current) => ({ ...current, slug: slugify(current.title) }));
  }, [form.title, slugTouched]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [imageFile]);

  function updateField<K extends keyof BlogPostFormState>(key: K, value: BlogPostFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setOptimizingImage(true);

    try {
      const optimized = await optimizeImageForUpload(file);
      setImageFile(optimized);
    } catch {
      setError('No se pudo optimizar la imagen. Intenta con otro archivo.');
      clearImage();
    } finally {
      setOptimizingImage(false);
    }
  }

  function clearImage() {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function resetForm() {
    setForm(EMPTY_BLOG_POST_FORM);
    setSlugTouched(false);
    clearImage();
  }

  async function handlePublish() {
    setError('');

    const validationError = validatePublishForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!session.authorId) {
      setError('No se pudo identificar al autor. Inicia sesión de nuevo.');
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append('title', form.title);
      body.append('slug', form.slug);
      body.append('excerpt', form.excerpt);
      body.append('content', form.content);
      body.append('category', form.category);
      body.append('readTime', form.readTime);
      body.append('seoDescription', form.seoDescription);
      body.append('reviewedBy', String(session.isAdmin ? form.reviewedBy : false));
      if (imageFile) body.append('image', imageFile);

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        body
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? 'No se pudo publicar el artículo.');
        return;
      }

      resetForm();
      onPublished?.();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  const submitLabel = session.isAdmin
    ? form.reviewedBy
      ? 'Publicar'
      : 'Guardar borrador'
    : 'Enviar a revisión';

  const helperText = canPublish
    ? session.isAdmin
      ? form.reviewedBy
        ? 'El artículo saldrá al blog público tras publicar.'
        : 'Se guardará como borrador hasta marcar revisión.'
      : 'Tu artículo quedará en revisión editorial antes de publicarse.'
    : 'Completa título, slug, contenido y categoría para continuar.';

  return (
    <section className="mx-auto w-full max-w-4xl">
      <header className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#39B8AD] sm:text-sm">
            CMS · Blog
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Publicar artículo
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
            {session.isAdmin
              ? 'Crea, revisa y publica contenido para el blog de Pointers.'
              : 'Redacta tu artículo y envíalo a revisión del equipo editorial.'}
          </p>
        </div>

        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
          >
            <X size={16} />
            Volver
          </button>
        ) : null}
      </header>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-lg shadow-black/20 backdrop-blur-md">
        <form
          className="divide-y divide-white/10"
          onSubmit={(event) => {
            event.preventDefault();
            void handlePublish();
          }}
        >
          <input type="hidden" name="author_id" value={session.authorId} readOnly />

          <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">
                Título <span className="text-red-300">*</span>
              </span>
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                className={inputClassName}
                placeholder="Ej. Cómo escalar contenido sin perder calidad editorial"
              />
            </label>

            <div className="grid gap-5 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">
                  Slug <span className="text-red-300">*</span>
                </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    updateField('slug', slugify(event.target.value));
                  }}
                  className={inputClassName}
                  placeholder="como-escalar-contenido-sin-perder-calidad"
                />
                <span className="mt-2 block text-xs text-white/45">
                  Se autogenera al escribir el título.
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">
                  Categoría <span className="text-red-300">*</span>
                </span>
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateField('category', event.target.value as BlogCategory | '')
                  }
                  className={inputClassName}
                  required
                >
                  <option value="" disabled className="bg-[#111] text-white/60">
                    Selecciona una categoría
                  </option>
                  {BLOG_CATEGORIES.map((category) => (
                    <option key={category} value={category} className="bg-[#111] text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">Extracto</span>
              <textarea
                value={form.excerpt}
                onChange={(event) => updateField('excerpt', event.target.value)}
                rows={3}
                className={inputClassName}
                placeholder="Resumen breve para tarjetas, listados y SEO"
              />
            </label>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div>
                <span className="mb-2 block text-sm font-medium text-white/80">
                  Imagen de portada
                </span>
                <label className="group flex min-h-[168px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center transition hover:border-brand/40 hover:bg-white/5 sm:min-h-[200px]">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(event) => void handleImageChange(event)}
                    className="hidden"
                    disabled={optimizingImage}
                  />
                  {optimizingImage ? (
                    <Loader2 className="mb-3 animate-spin text-brand" size={24} />
                  ) : (
                    <ImagePlus className="mb-3 text-white/50 transition group-hover:text-brand" />
                  )}
                  <span className="text-sm font-medium text-white/80">
                    {optimizingImage ? 'Optimizando imagen…' : 'Toca para subir imagen'}
                  </span>
                  <span className="mt-1 text-xs text-white/45">
                    Se comprime a WebP · máx. 1200px de ancho
                  </span>
                </label>
              </div>

              <div className="flex flex-col gap-4">
                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Vista previa de portada"
                      className="h-40 w-full object-cover sm:h-44"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute right-2 top-2 rounded-lg bg-black/70 p-1.5 text-white/80 transition hover:bg-black hover:text-white"
                      aria-label="Quitar imagen"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-xs text-white/45 sm:h-44">
                    Sin vista previa
                  </div>
                )}

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    Tiempo de lectura (min)
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={form.readTime}
                    onChange={(event) => updateField('readTime', event.target.value)}
                    className={inputClassName}
                  />
                </label>
              </div>
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-white/80">
                Contenido <span className="text-red-300">*</span>
              </span>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
                <RichTextEditor
                  value={form.content}
                  onChange={(content) => updateField('content', content)}
                  placeholder="Escribe el contenido del artículo…"
                />
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">SEO description</span>
              <textarea
                value={form.seoDescription}
                onChange={(event) => updateField('seoDescription', event.target.value)}
                rows={2}
                className={inputClassName}
                placeholder="Opcional. Si lo dejas vacío, se autogenera desde el contenido."
              />
            </label>

            {session.isAdmin ? (
              <ReviewStatusIndicator
                reviewed={form.reviewedBy}
                onChange={(reviewedBy) => updateField('reviewedBy', reviewedBy)}
                disabled={loading}
              />
            ) : (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                Tu artículo pasará a revisión editorial antes de publicarse en el blog público.
              </div>
            )}

            {error ? (
              <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            ) : null}
          </div>

          <footer className="flex flex-col-reverse gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-xs text-white/45">{helperText}</p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {onCancel ? (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 disabled:opacity-60"
                >
                  Cancelar
                </button>
              ) : null}

              <button
                type="submit"
                disabled={loading || optimizingImage || !canPublish}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? 'Publicando…' : submitLabel}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </section>
  );
}
