'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { HeroParticlesBackground } from '@/components/hero/hero-particles-background';
import { cn } from '@/lib/utils';

type WhiteParticlesSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  particlesId?: string;
  innerClassName?: string;
};

/** White section with lazy-loaded molecular particle network (touch + gyro via HeroParticlesBackground). */
export function WhiteParticlesSection({
  children,
  className,
  id,
  particlesId,
  innerClassName
}: WhiteParticlesSectionProps) {
  const fallbackId = useId().replace(/:/g, '');
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '160px 0px', threshold: 0.02 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn('relative overflow-hidden bg-white', className)}
    >
      {active ? (
        <HeroParticlesBackground id={particlesId ?? fallbackId} className="opacity-90" />
      ) : null}
      <div className={cn('relative z-10', innerClassName)}>{children}</div>
    </section>
  );
}
