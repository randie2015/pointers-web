import Link from 'next/link';
import { FileText, Globe, PenLine } from 'lucide-react';
import { getPostMetrics } from '@/lib/cms/posts-admin';

export const dynamic = 'force-dynamic';

const cardClass =
  'rounded-2xl border border-white/10 bg-black/35 p-6 shadow-lg shadow-black/20 backdrop-blur-md';

export default async function DashboardPage() {
  const metrics = await getPostMetrics();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-[#39B8AD]">Panel principal</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Bienvenido al CMS</h1>
        <p className="mt-2 text-white/60">Gestiona el contenido del blog desde un solo lugar.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={cardClass}>
          <p className="text-sm text-white/50">Total artículos</p>
          <p className="mt-2 text-3xl font-bold text-white">{metrics.total}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-white/50">Publicados</p>
          <p className="mt-2 text-3xl font-bold text-[#39B8AD]">{metrics.published}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-white/50">Borradores</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">{metrics.drafts}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-white/50">En sitio público</p>
          <p className="mt-2 text-3xl font-bold text-emerald-300">{metrics.liveOnSite}</p>
          <p className="mt-1 text-xs text-white/40">Publicados y revisados</p>
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
            <Globe size={22} />
            <div>
              <h2 className="font-semibold text-white/70">Sincronización</h2>
              <p className="text-sm">
                El panel lee la tabla <code className="text-white/60">posts</code> en tiempo real, igual que el
                blog público.
              </p>
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
