import Link from 'next/link';
import Image from 'next/image';
import { clinicBrand, clinicExpiration } from '@/src/data/orthozentData';

export function OrthozentExpiredView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ortho-base px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-ortho-neutral/40 bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <Image
          src={clinicBrand.logo}
          alt={`${clinicBrand.name} logo`}
          width={120}
          height={120}
          className="mx-auto h-16 w-auto object-contain sm:h-20"
        />
        <h1 className="mt-4 font-display text-2xl font-semibold text-ortho-ink">{clinicExpiration.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{clinicExpiration.message}</p>
        <Link
          href={clinicExpiration.ctaUrl}
          className="mt-8 inline-flex rounded-full bg-ortho-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-ortho-primary/90"
        >
          {clinicExpiration.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
