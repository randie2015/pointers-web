'use client';

import Link from 'next/link';
import { KeyRound } from 'lucide-react';

export function AdminAccessIcon() {
  return (
    <Link
      href="/admin/login"
      aria-label="Acceso administración"
      className="fixed bottom-4 left-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-gray-300/40 bg-white/70 text-gray-400 opacity-40 shadow-sm backdrop-blur transition hover:opacity-100 hover:text-brand focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
    >
      <KeyRound size={15} strokeWidth={1.75} />
    </Link>
  );
}
