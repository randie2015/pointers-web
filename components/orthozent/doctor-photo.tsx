import Image from 'next/image';
import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/orthozentData';

type OrthozentDoctorPhotoProps = {
  variant?: 'hero' | 'profile';
  className?: string;
  priority?: boolean;
};

export function OrthozentDoctorPhoto({
  variant = 'profile',
  className,
  priority = false
}: OrthozentDoctorPhotoProps) {
  if (variant === 'hero') {
    return (
      <div className={cn('relative overflow-hidden rounded-2xl border border-ortho-neutral/40 bg-white shadow-xl sm:rounded-3xl', className)}>
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-ortho-gold/40 to-ortho-primary/20 blur-2xl sm:-inset-4" />
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ortho-gold/10">
          <Image
            src={clinicBrand.doctorPhoto}
            alt={`${clinicBrand.doctorFullName}, director clínico de ${clinicBrand.name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
          />
        </div>
        <div className="border-t border-ortho-neutral/30 bg-white p-4 sm:p-5">
          <p className="font-display text-lg font-semibold text-ortho-ink sm:text-xl">{clinicBrand.doctorFullName}</p>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Odontología especializada · Arequipa</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 sm:text-xs">
            <div className="rounded-lg bg-ortho-base px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
              <p className="font-semibold text-ortho-primary">+10</p>
              <p>años</p>
            </div>
            <div className="rounded-lg bg-ortho-base px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
              <p className="font-semibold text-ortho-primary">3D</p>
              <p>diagnóstico</p>
            </div>
            <div className="rounded-lg bg-ortho-base px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3">
              <p className="font-semibold text-ortho-primary">100%</p>
              <p>bioseguro</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-xl border border-ortho-neutral/40 bg-white shadow-sm sm:rounded-2xl', className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ortho-gold/10 sm:aspect-[3/4]">
        <Image
          src={clinicBrand.doctorPhoto}
          alt={`${clinicBrand.doctorFullName}, director clínico de ${clinicBrand.name}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div className="border-t border-ortho-neutral/30 bg-white p-5 text-center sm:p-6">
        <p className="font-display text-xl font-semibold text-ortho-ink sm:text-2xl">{clinicBrand.doctorFullName}</p>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Director clínico · {clinicBrand.name}</p>
      </div>
    </div>
  );
}
