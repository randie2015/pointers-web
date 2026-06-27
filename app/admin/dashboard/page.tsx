import Link from 'next/link';
import { FileText, PenLine, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/blog/store';

const cardClass =
  'rounded-2xl border border-white/10 bg-black/35 p-6 shadow-lg shadow-black/20 backdrop-blur-md';

export default async function DashboardPage() {
  const posts = await getAllPosts();
  const published = posts.filter((post) => post.status === 'published').length;
  const drafts = posts.filter((post) => post.status === 'draft').length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-[#39B8AD]">Panel principal</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Bienvenido al CMS</h1>
        <p className="mt-2 text-white/60">Gestiona el contenido del blog desde un solo lugar.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className={cardClass}>
          <p className="text-sm text-white/50">Total artículos</p>
          <p className="mt-2 text-3xl font-bold text-white">{posts.length}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-white/50">Publicados</p>
          <p className="mt-2 text-3xl font-bold text-[#39B8AD]">{published}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-white/50">Borradores</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">{drafts}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/dashboard/blog"
          className={`group transition hover:border-brand/40 hover:bg-black/45 ${cardClass}`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20 text-brand">
              <FileText size={22} />
            </span>
            <div>
              <h2 className="font-semibold text-white group-hover:text-brand">Gestionar Blog</h2>
              <p className="text-sm text-white/55">Crear, editar y eliminar artículos.</p>
            </div>
          </div>
        </Link>

        <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-white/50">
            <Sparkles size={22} />
            <div>
              <h2 className="font-semibold text-white/70">Próximamente</h2>
              <p className="text-sm">Más módulos del CMS en futuras versiones.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-8 ${cardClass}`}>
        <div className="mb-4 flex items-center gap-2">
          <PenLine size={18} className="text-brand" />
          <h2 className="font-semibold text-white">Acceso rápido</h2>
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
