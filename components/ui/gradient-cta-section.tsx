'use client';

import type { ReactNode } from 'react';
import { SectionBadge } from '@/components/ui/section-badge';
import { VioletMagentaGradientBg } from '@/components/ui/violet-magenta-gradient-bg';
import { cn } from '@/lib/utils';

type GradientCtaSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Contenedor estándar CTA — tarjeta rounded-3xl con degradado violeta → magenta. */
export function GradientCtaSection({ id, className, children }: GradientCtaSectionProps) {
  return (
    <section id={id} className={cn('relative z-[1] scroll-mt-24 py-12 sm:py-16 md:py-20', className)}>
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-white shadow-lg shadow-[#5E549D]/20 sm:px-10 sm:py-16 md:px-14 md:py-20">
          <VioletMagentaGradientBg />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

type GradientCtaContentProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
};

/** Layout interior estándar para CTAs — texto blanco, botón turquesa vía children. */
export function GradientCtaContent({
  eyebrow,
  title,
  subtitle,
  children,
  className
}: GradientCtaContentProps) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      {eyebrow ? <SectionBadge text={eyebrow} variant="light" /> : null}
      <h2
        className={cn(
          'font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl',
          eyebrow && 'mt-3'
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-6 md:text-base lg:text-lg">
          {subtitle}
        </p>
      ) : null}
      {children ? <div className="mt-8 flex justify-center sm:mt-10">{children}</div> : null}
    </div>
  );
}
