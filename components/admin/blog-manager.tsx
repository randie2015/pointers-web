'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/types';
import { formatPostDate } from '@/lib/blog/utils';
import { BlogFormModal } from '@/components/admin/blog-form-modal';
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog';

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/blog');
      if (!response.ok) throw new Error('fetch failed');
      const data = (await response.json()) as BlogPost[];
      setPosts(data);
    } catch {
      setError('No se pudieron cargar los artículos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  function openCreate() {
    setEditingPost(null);
    setModalOpen(true);
  }

  function openEdit(post: BlogPost) {
    setEditingPost(post);
    setModalOpen(true);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${deleteTarget.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('delete failed');
      setDeleteTarget(null);
      await loadPosts();
    } catch {
      setError('No se pudo eliminar el artículo.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand">CMS · Blog</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">Gestión del Blog</h1>
          <p className="mt-2 text-gray-600">Administra artículos publicados y borradores.</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadPosts()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Actualizar
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
          >
            <Plus size={16} />
            Nuevo artículo
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-6 py-16 text-gray-500">
            <Loader2 size={18} className="animate-spin" />
            Cargando artículos…
          </div>
        ) : posts.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-500">
            No hay artículos todavía. Crea el primero con &quot;Nuevo artículo&quot;.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/80 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Título</th>
                  <th className="px-6 py-4 font-semibold">Fecha</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="transition hover:bg-gray-50/60">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{post.tag}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatPostDate(post.publishedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          post.status === 'published'
                            ? 'inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700'
                            : 'inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700'
                        }
                      >
                        {post.status === 'published' ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(post)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-brand/30 hover:text-brand"
                        >
                          <Pencil size={14} />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(post)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BlogFormModal
        open={modalOpen}
        post={editingPost}
        onClose={() => setModalOpen(false)}
        onSaved={() => void loadPosts()}
      />

      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        title={deleteTarget?.title ?? ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void confirmDelete()}
        loading={deleting}
      />
    </div>
  );
}
