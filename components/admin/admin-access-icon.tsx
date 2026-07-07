'use client';

import Link from 'next/link';
import { KeyRound } from 'lucide-react';

export function AdminAccessIcon() {
  return (
    <Link
      href="/admin/login"
      aria-label="Acceso administración"
      title="Admin"
      className="absolute right-4 top-4 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-gray-900/20 shadow-none backdrop-blur-0 transition-all duration-300 ease-out hover:border-white/25 hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-brand/30 focus-visible:border-white/25 focus-visible:bg-brand focus-visible:text-white focus-visible:shadow-lg focus-visible:shadow-brand/30 focus-visible:outline-none active:scale-95 active:border-white/25 active:bg-brand active:text-white active:shadow-lg active:shadow-brand/30 sm:right-6 sm:top-6 sm:h-11 sm:w-11 md:right-8 md:top-8"
    >
      <KeyRound className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
    </Link>
  );
}
