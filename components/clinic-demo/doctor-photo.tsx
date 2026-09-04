import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

type ClinicDoctorPhotoProps = {
  demo: ResolvedDemo;
  variant?: 'hero' | 'profile';
  className?: string;
  priority?: boolean;
};

export function ClinicDoctorPhoto({
  demo,
  variant = 'profile',
  className,
  priority = false
}: ClinicDoctorPhotoProps) {
  if (variant === 'hero') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-demo-neutral/40 bg-white shadow-xl sm:rounded-3xl',
          className
        )}
      >
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-demo-accent/40 to-demo-primary/20 blur-2xl sm:-inset-4" />
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-demo-accent/10">
          <Image
            src={demo.brand.doctorPhoto}
            alt={`${demo.brand.doctorFullName}, director clínico de ${demo.brand.name}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
          />
        </div>
        <div className="border-t border-demo-neutral/30 bg-white p-4 sm:p-5">
          <p className="font-display text-lg font-semibold text-slate-900 sm:text-xl">{demo.brand.doctorFullName}</p>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            {demo.brand.positioning} · {demo.brand.usp}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600 sm:text-xs">
            {demo.home.stats.slice(0, 3).map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-demo-accent/25 bg-demo-base px-1.5 py-2.5 sm:rounded-xl sm:px-2 sm:py-3"
              >
                <p className="font-semibold text-demo-accent">{stat.value}</p>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-xl border border-demo-neutral/40 bg-white shadow-sm sm:rounded-2xl', className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-demo-accent/10 sm:aspect-[3/4]">
        <Image
          src={demo.brand.doctorPhoto}
          alt={`${demo.brand.doctorFullName}, director clínico de ${demo.brand.name}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div className="border-t border-demo-neutral/30 bg-white p-5 text-center sm:p-6">
        <p className="font-display text-xl font-semibold text-demo-ink sm:text-2xl">{demo.brand.doctorFullName}</p>
        <p className="mt-1 text-xs text-demo-ink/60 sm:text-sm">
          {demo.brand.subbrand} · {demo.brand.positioning}
        </p>
      </div>
    </div>
  );
}
