import Image from 'next/image';
import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/alejandraData';

type DraAlejandraDoctorPhotoProps = {
  variant?: 'hero' | 'profile';
  className?: string;
  priority?: boolean;
};

export function DraAlejandraDoctorPhoto({
  variant = 'profile',
  className,
  priority = false
}: DraAlejandraDoctorPhotoProps) {
  if (variant === 'hero') {
    return (
      <div className={cn('relative overflow-hidden rounded-2xl border border-ale-neutral/40 bg-white shadow-xl sm:rounded-3xl', className)}>
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-ale-gold/40 to-ale-cta/20 blur-2xl sm:-inset-4" />
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ale-gold/10">
          <Image
            src={clinicBrand.doctorPhoto}
            alt={`${clinicBrand.doctorFullName}, director clínico de ${clinicBrand.name}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
          />
        </div>
        <div className="border-t border-ale-neutral/30 bg-white p-4 sm:p-5">
          <p className="font-display text-lg font-semibold text-slate-900 sm:text-xl">{clinicBrand.doctorFullName}</p>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            {clinicBrand.positioning} · {clinicBrand.usp}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600 sm:text-xs">
            <div className="rounded-lg border border-ale-gold/25 bg-ale-ivory px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
              <p className="font-semibold text-ale-gold">USP</p>
              <p>Brasil</p>
            </div>
            <div className="rounded-lg border border-ale-gold/25 bg-ale-ivory px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
              <p className="font-semibold text-ale-gold">Mock-up</p>
              <p>en boca</p>
            </div>
            <div className="rounded-lg border border-ale-gold/25 bg-ale-ivory px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
              <p className="font-semibold text-ale-gold">100%</p>
              <p>estética</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-xl border border-ale-neutral/40 bg-white shadow-sm sm:rounded-2xl', className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ale-gold/10 sm:aspect-[3/4]">
        <Image
          src={clinicBrand.doctorPhoto}
          alt={`${clinicBrand.doctorFullName}, director clínico de ${clinicBrand.name}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div className="border-t border-ale-neutral/30 bg-white p-5 text-center sm:p-6">
        <p className="font-display text-xl font-semibold text-ale-ink sm:text-2xl">{clinicBrand.doctorFullName}</p>
        <p className="mt-1 text-xs text-ale-ink/60 sm:text-sm">
          {clinicBrand.subbrand} · {clinicBrand.positioning}
        </p>
      </div>
    </div>
  );
}
