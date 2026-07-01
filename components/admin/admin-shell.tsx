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
            src="/logo.png"
            alt="Pointers"
            width={48}
            height={48}
            className="h-10 w-10 md:h-11 md:w-11"
            priority
          />
        </Link>
      </header>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
