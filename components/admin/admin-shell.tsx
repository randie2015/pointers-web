'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AdminParticlesBackground } from '@/components/admin/admin-particles-background';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AdminParticlesBackground />

      <header className="relative z-20 flex justify-center px-6 pt-8 pb-4">
        <Link href="/" aria-label="Pointers — inicio">
          <Image
            src="/logo.svg"
            alt="Pointers"
            width={160}
            height={36}
            className="h-8 w-auto brightness-0 invert md:h-9"
            priority
          />
        </Link>
      </header>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
