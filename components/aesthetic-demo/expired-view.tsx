import Link from 'next/link';
import { AestheticLogo } from '@/components/aesthetic-demo/logo';
import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';

export function AestheticExpiredView({ demo }: { demo: ResolvedAestheticDemo }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-demo-base px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-demo-border bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <AestheticLogo demo={demo} size="lg" className="mx-auto justify-center" />
        <h1 className="mt-4 font-playfair text-2xl font-semibold text-demo-ink">{demo.expiration.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-demo-muted">{demo.expiration.message}</p>
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
