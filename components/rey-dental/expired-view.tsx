import Link from 'next/link';
import { clinicExpiration } from '@/src/data/clinicData';

export function ReyDentalExpiredView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-rey-base px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-rey-neutral/40 bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-rey-primary">Rey Dental · Demo</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-rey-ink">{clinicExpiration.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{clinicExpiration.message}</p>
        <Link
          href={clinicExpiration.ctaUrl}
          className="mt-8 inline-flex rounded-full bg-rey-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-rey-primary/90"
        >
          {clinicExpiration.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
