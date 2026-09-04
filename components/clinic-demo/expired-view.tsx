import Link from 'next/link';
import { ClinicLogo } from '@/components/clinic-demo/logo';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function ClinicExpiredView({ demo }: { demo: ResolvedDemo }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-demo-base px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-demo-neutral/40 bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <ClinicLogo demo={demo} size="lg" className="mx-auto justify-center" />
        <h1 className="mt-4 font-display text-2xl font-semibold text-demo-ink">{demo.expiration.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{demo.expiration.message}</p>
        <Link
          href={demo.expiration.ctaUrl}
          className="mt-8 inline-flex rounded-full bg-demo-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-demo-primary/90"
        >
          {demo.expiration.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
