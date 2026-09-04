'use client';

import Image from 'next/image';
import Link from 'next/link';
import { aestheticContainer, aestheticSection } from '@/lib/aesthetic-demo/layout';
import { AestheticCtaButton } from '@/components/aesthetic-demo/cta-button';
import {
  aestheticImageZoom,
  aestheticLuxuryCard,
  AestheticReveal,
  AestheticStagger,
  AestheticStaggerChild
} from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

export function AestheticFeaturedTreatmentsSection() {
  const demo = useAestheticDemo();
  const { featuredTreatments } = demo;

  return (
    <section className={cn('bg-white', aestheticSection)}>
      <div className={aestheticContainer}>
        <AestheticReveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-demo-jade sm:text-xs">
                Tratamientos destacados
              </p>
              <h2 className="mt-2 font-playfair text-2xl font-semibold text-balance text-demo-ink sm:text-3xl">
                Protocolos faciales, corporales y antiage
              </h2>
            </div>
            <Link
              href={`${demo.basePath}/tratamientos`}
              className="shrink-0 text-sm font-semibold text-demo-jade transition-colors duration-300 hover:text-demo-ink"
            >
              Ver todos los tratamientos →
            </Link>
          </div>
        </AestheticReveal>

        <AestheticStagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {featuredTreatments.map((treatment) => (
            <AestheticStaggerChild key={treatment.id}>
              <Link
                href={`${demo.basePath}/tratamientos#${treatment.anchor}`}
                className={cn(aestheticLuxuryCard, 'flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm')}
              >
                <div className="relative h-44 overflow-hidden sm:h-48 md:h-52">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={cn('object-cover', aestheticImageZoom)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-demo-primary/90 via-demo-primary/45 to-demo-primary/15" />
                  <span className="absolute top-4 left-4 rounded-full bg-demo-primary/50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-white backdrop-blur-sm">
                    {treatment.badge}
                  </span>
                  <h3 className="absolute right-3 bottom-3 left-3 font-playfair text-base font-semibold leading-snug text-white sm:right-4 sm:bottom-4 sm:left-4 sm:text-lg md:text-xl">
                    {treatment.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="flex-1 text-sm leading-relaxed text-demo-muted">{treatment.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-demo-jade transition-colors duration-300 group-hover:text-demo-ink">
                    Ver detalles del tratamiento →
                  </span>
                </div>
              </Link>
            </AestheticStaggerChild>
          ))}
        </AestheticStagger>

        <AestheticReveal className="mt-10 text-center" delay={0.15}>
          <AestheticCtaButton
            href={`${demo.basePath}/tratamientos`}
            label="Explorar catálogo completo"
            variant="secondary"
            external={false}
            shimmer={false}
          />
        </AestheticReveal>
      </div>
    </section>
  );
}
