'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Loader2, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/types';
import { formatPostDate } from '@/lib/blog/utils';
import { BlogFormModal } from '@/components/admin/blog-form-modal';
import { BlogAdmin } from '@/components/admin/blog-admin';
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog';

type SortField = 'title' | 'date';
type SortDirection = 'asc' | 'desc';

function SortableHeader({
  label,
  field,
  sortField,
  sortDirection,
  onSort
}: {
  label: string;
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}) {
  const isActive = sortField === field;

  return (
    <th
      className="cursor-pointer select-none px-6 py-4 font-semibold transition-colors hover:text-white/70"
      onClick={() => onSort(field)}
    >
      <span className="relative inline-block pr-3.5">
        {label}
        <span className="pointer-events-none absolute -right-0.5 -top-1 flex flex-col items-center leading-none">
          <ChevronUp
            className={`h-3 w-3 ${
              isActive && sortDirection === 'asc' ? 'text-white/80' : 'text-white/25'
            }`}
            strokeWidth={1.75}
          />
          <ChevronDown
            className={`-mt-1 h-3 w-3 ${
              isActive && sortDirection === 'desc' ? 'text-white/80' : 'text-white/25'
            }`}
            strokeWidth={1.75}
          />
        </span>
      </span>
    </th>
  );
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/blog', { cache: 'no-store' });
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

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortField(field);
    setSortDirection(field === 'title' ? 'asc' : 'desc');
  }

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const comparison =
        sortField === 'title'
          ? a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
          : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [posts, sortField, sortDirection]);

  function openCreate() {
    setEditingPost(null);
    setShowCreateForm(true);
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

  if (showCreateForm) {
    return (
      <BlogAdmin
        onCancel={() => setShowCreateForm(false)}
        onPublished={() => {
          setShowCreateForm(false);
          void loadPosts();
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#39B8AD]">CMS · Blog</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Gestión del Blog</h1>
          <p className="mt-2 text-white/60">Administra artículos publicados y borradores.</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadPosts()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
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
        <p className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-lg shadow-black/20 backdrop-blur-md">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-6 py-16 text-white/50">
            <Loader2 size={18} className="animate-spin" />
            Cargando artículos…
          </div>
        ) : posts.length === 0 ? (
          <div className="px-6 py-16 text-center text-white/50">
            No hay artículos todavía. Crea el primero con &quot;Nuevo artículo&quot;.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wide text-white/45">
                <tr>
                  <SortableHeader
                    label="Título"
                    field="title"
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Fecha"
                    field="date"
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <th className="px-6 py-4 font-semibold">Categoría</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {sortedPosts.map((post) => (
                  <tr key={post.id} className="transition hover:bg-white/5">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{post.title}</p>
                    </td>
                    <td className="px-6 py-4 text-white/65">
                      {formatPostDate(post.publishedAt)}
                    </td>
                    <td className="px-6 py-4 text-white/55">{post.tag || '—'}</td>
                    <td className="px-6 py-4">
                      {post.status === 'draft' ? (
                        <span className="inline-flex rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-300">
                          Borrador
                        </span>
                      ) : post.isLiveOnSite ? (
                        <span className="inline-flex rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                          En vivo
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-sky-500/20 px-2.5 py-1 text-xs font-semibold text-sky-300">
                          Pendiente revisión
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(post)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-brand/40 hover:text-brand"
                        >
                          <Pencil size={14} />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(post)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/30 px-3 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/10"
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
