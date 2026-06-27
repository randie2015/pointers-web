'use client';

import Link from 'next/link';
import { KeyRound } from 'lucide-react';

export function AdminAccessIcon() {
  return (
    <Link
      href="/admin/login"
      aria-label="Acceso administración"
      title="Admin"
      className="fixed bottom-6 left-6 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-brand/90 text-white shadow-lg shadow-brand/30 backdrop-blur transition hover:scale-105 hover:bg-brand sm:bottom-8 sm:left-8"
    >
      <KeyRound size={16} strokeWidth={2} />
    </Link>
  );
}
