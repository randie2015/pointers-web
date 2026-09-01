import Image from 'next/image';
import { AlignCenter, Sparkles, Stethoscope, Syringe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Treatment } from '@/src/data/clinicData';

const iconMap = {
  align: AlignCenter,
  implant: Syringe,
  whitening: Sparkles,
  general: Stethoscope
} as const;

type ReyDentalTreatmentMediaProps = {
  treatment: Treatment;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function ReyDentalTreatmentMedia({
  treatment,
  className,
  imageClassName,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 480px'
}: ReyDentalTreatmentMediaProps) {
  const Icon = iconMap[treatment.icon];

  if (treatment.image) {
    return (
      <div className={cn('relative overflow-hidden bg-rey-accent/10', className)}>
        <Image
          src={treatment.image}
          alt={treatment.imageAlt ?? treatment.title}
          fill
          className={cn('object-cover transition duration-500 group-hover:scale-105', imageClassName)}
          style={treatment.imagePosition ? { objectPosition: treatment.imagePosition } : undefined}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br from-rey-accent/30 to-rey-primary/10',
        className
      )}
    >
      <Icon
        className="h-12 w-12 text-rey-primary/60 transition group-hover:scale-110 group-hover:text-rey-primary sm:h-16 sm:w-16"
        strokeWidth={1.25}
      />
    </div>
  );
}
