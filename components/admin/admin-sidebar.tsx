'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin/dashboard', label: 'Resumen', icon: LayoutDashboard },
  { href: '/admin/dashboard/blog', label: 'Blog', icon: FileText }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-white/10 bg-black/40 backdrop-blur-md md:min-h-[calc(100vh-5.5rem)] md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Panel</p>
        <h2 className="mt-1 text-lg font-bold text-white">Administración</h2>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4 md:p-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                active
                  ? 'bg-brand text-white shadow-md shadow-brand/30'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-red-500/15 hover:text-red-200"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
