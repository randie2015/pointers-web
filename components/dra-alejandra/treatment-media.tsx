import Image from 'next/image';
import { AlignCenter, Sparkles, Stethoscope, Syringe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Treatment } from '@/src/data/alejandraData';

const iconMap = {
  align: AlignCenter,
  implant: Syringe,
  whitening: Sparkles,
  general: Stethoscope
} as const;

type DraAlejandraTreatmentMediaProps = {
  treatment: Treatment;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function DraAlejandraTreatmentMedia({
  treatment,
  className,
  imageClassName,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 480px'
}: DraAlejandraTreatmentMediaProps) {
  const Icon = iconMap[treatment.icon];

  if (treatment.image) {
    return (
      <div className={cn('relative overflow-hidden bg-ale-gold/10', className)}>
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
        'flex items-center justify-center bg-gradient-to-br from-ale-gold/30 to-ale-cta/10',
        className
      )}
    >
      <Icon
        className="h-12 w-12 text-ale-cta/60 transition group-hover:scale-110 group-hover:text-ale-cta sm:h-16 sm:w-16"
        strokeWidth={1.25}
      />
    </div>
  );
}
