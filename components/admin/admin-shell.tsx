'use client';

import { BrandLogo } from '@/components/brand-logo';
import Link from 'next/link';
import { AdminParticlesBackground } from '@/components/admin/admin-particles-background';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AdminParticlesBackground />

      <header className="relative z-20 flex justify-center px-6 pt-8 pb-4">
        <Link href="/" aria-label="Pointers — inicio">
          <BrandLogo variant="horizontal-white" className="h-8 md:h-9" priority />
        </Link>
      </header>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
