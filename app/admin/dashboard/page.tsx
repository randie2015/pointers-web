import Link from 'next/link';
import { FileText, PenLine, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/blog/store';

export default async function DashboardPage() {
  const posts = await getAllPosts();
  const published = posts.filter((post) => post.status === 'published').length;
  const drafts = posts.filter((post) => post.status === 'draft').length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-brand">Panel principal</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">Bienvenido al CMS</h1>
        <p className="mt-2 text-gray-600">Gestiona el contenido del blog desde un solo lugar.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total artículos</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{posts.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Publicados</p>
          <p className="mt-2 text-3xl font-bold text-[#39B8AD]">{published}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Borradores</p>
          <p className="mt-2 text-3xl font-bold text-amber-600">{drafts}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/dashboard/blog"
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-brand/30 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <FileText size={22} />
            </span>
            <div>
              <h2 className="font-semibold text-gray-900 group-hover:text-brand">Gestionar Blog</h2>
              <p className="text-sm text-gray-600">Crear, editar y eliminar artículos.</p>
            </div>
          </div>
        </Link>

        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 p-6">
          <div className="flex items-center gap-3 text-gray-500">
            <Sparkles size={22} />
            <div>
              <h2 className="font-semibold text-gray-700">Próximamente</h2>
              <p className="text-sm">Más módulos del CMS en futuras versiones.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <PenLine size={18} className="text-brand" />
          <h2 className="font-semibold text-gray-900">Acceso rápido</h2>
        </div>
        <Link
          href="/admin/dashboard/blog"
          className="inline-flex items-center rounded-xl bg-[#39B8AD] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
        >
          Nuevo artículo
        </Link>
      </div>
    </div>
  );
}
