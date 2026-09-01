import Link from 'next/link';
import { DraAlejandraLogo } from '@/components/dra-alejandra/logo';
import { clinicExpiration } from '@/src/data/alejandraData';

export function DraAlejandraExpiredView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ale-ivory px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-ale-neutral/40 bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <DraAlejandraLogo size="lg" className="mx-auto justify-center" />
        <h1 className="mt-4 font-display text-2xl font-semibold text-ale-ink">{clinicExpiration.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{clinicExpiration.message}</p>
        <Link
          href={clinicExpiration.ctaUrl}
          className="mt-8 inline-flex rounded-full bg-ale-cta px-6 py-3 text-sm font-semibold text-white transition hover:bg-ale-cta/90"
        >
          {clinicExpiration.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
