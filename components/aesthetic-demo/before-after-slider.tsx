'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { AestheticReveal } from '@/components/aesthetic-demo/motion';
import { useAestheticDemo } from '@/components/aesthetic-demo/demo-provider';
import { cn } from '@/lib/utils';

const IMAGE_CLASS = 'pointer-events-none select-none object-cover object-center';

export function AestheticBeforeAfterSlider({ showHint = true }: { showHint?: boolean }) {
  const demo = useAestheticDemo();
  const { before, after, width, height } = demo.home.beforeAfter;
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(95, Math.max(5, next)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updatePosition(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <AestheticReveal className="relative mx-auto mt-8 w-full max-w-5xl sm:mt-10">
      <div
        ref={containerRef}
        className="group relative touch-none overflow-hidden rounded-2xl border-2 border-demo-accent/40 bg-demo-primary shadow-xl select-none sm:rounded-3xl max-sm:max-h-[min(72vh,520px)]"
        style={{ aspectRatio: `${width} / ${height}` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label="Comparar antes y después"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(position)}
      >
        <Image
          src={after}
          alt="Después del tratamiento"
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className={cn(IMAGE_CLASS, 'transition-transform duration-700 ease-out group-hover:scale-[1.02]')}
          draggable={false}
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={before}
            alt="Antes del tratamiento"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className={cn(IMAGE_CLASS, 'transition-transform duration-700 ease-out group-hover:scale-[1.02]')}
            draggable={false}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90 shadow-lg"
          style={{ left: `${position}%` }}
        >
          <div
            className={cn(
              'absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-demo-accent shadow-lg transition-transform duration-300 sm:h-12 sm:w-12',
              !isDragging && 'animate-mag-gold-pulse',
              isDragging && 'scale-110'
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-demo-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <span className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-demo-primary/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white sm:top-4 sm:left-4 sm:px-3 sm:text-xs">
          Antes
        </span>
        <span className="pointer-events-none absolute top-3 right-3 z-20 rounded-full bg-demo-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-demo-ink sm:top-4 sm:right-4 sm:px-3 sm:text-xs">
          Después
        </span>
      </div>
      {showHint ? (
        <p className="mt-4 text-center text-xs font-medium text-demo-muted sm:text-sm">
          Arrastra el control para comparar resultados reales
        </p>
      ) : null}
    </AestheticReveal>
  );
}
