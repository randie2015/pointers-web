'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import type { BlogPost, PostStatus } from '@/lib/blog/types';
import { RichTextEditor } from '@/components/admin/rich-text-editor';

type BlogFormModalProps = {
  open: boolean;
  post?: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
};

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  status: PostStatus;
};

const EMPTY_FORM: FormState = {
  title: '',
  excerpt: '',
  content: '',
  tag: 'General',
  status: 'draft'
};

const fieldClassName =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';

export function BlogFormModal({ open, post, onClose, onSaved }: BlogFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (post) {
      setForm({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        tag: post.tag,
        status: post.status
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError('');
  }, [open, post]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? 'No se pudo guardar el artículo.');
        return;
      }

      onSaved();
      onClose();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-black/50 backdrop-blur-sm md:items-center md:justify-center md:p-4">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white text-gray-900 shadow-2xl md:my-auto md:max-h-[92vh] md:max-w-3xl md:rounded-2xl">
        <div className="sticky top-0 z-20 shrink-0 border-b border-gray-200 bg-white px-4 pb-4 pt-5 shadow-sm sm:px-6 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 pr-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {post ? 'Editar artículo' : 'Nuevo artículo'}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                Completa los campos y guarda los cambios.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="relative z-30 shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-6 pt-6 sm:px-6 sm:py-5 md:pt-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Título</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
                required
                className={fieldClassName}
                placeholder="Título del artículo"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Etiqueta</span>
                <input
                  type="text"
                  value={form.tag}
                  onChange={(e) => setForm((current) => ({ ...current, tag: e.target.value }))}
                  className={fieldClassName}
                  placeholder="Branding"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Estado</span>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      status: e.target.value as PostStatus
                    }))
                  }
                  className={fieldClassName}
                >
                  <option value="draft" className="bg-white text-gray-900">
                    Borrador
                  </option>
                  <option value="published" className="bg-white text-gray-900">
                    Publicado
                  </option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Extracto (opcional)
              </span>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((current) => ({ ...current, excerpt: e.target.value }))}
                rows={2}
                className={fieldClassName}
                placeholder="Resumen breve para la tarjeta del blog"
              />
            </label>

            <div>
              <span className="mb-2 block text-sm font-medium text-gray-700">Contenido</span>
              <RichTextEditor
                value={form.content}
                onChange={(content) => setForm((current) => ({ ...current, content }))}
                placeholder="Escribe el contenido del artículo…"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          <div className="sticky bottom-0 z-20 flex shrink-0 justify-end gap-3 border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-70"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Guardando…' : 'Guardar artículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
