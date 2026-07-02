'use client';

import { HeaderLogo } from '@/components/header-logo';
import Link from 'next/link';
import { AdminParticlesBackground } from '@/components/admin/admin-particles-background';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AdminParticlesBackground />

      <header className="relative z-20 flex justify-center px-6 pt-8 pb-4">
        <Link href="/" aria-label="Pointers — inicio" className="text-white">
          <HeaderLogo />
        </Link>
      </header>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
