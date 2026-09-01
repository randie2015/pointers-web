'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { clinicHome } from '@/src/data/alejandraData';

const { before, after, width, height } = clinicHome.beforeAfter;
const IMAGE_CLASS = 'pointer-events-none select-none object-cover object-center';

export function DraAlejandraBeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(95, Math.max(5, next)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="relative mx-auto mt-8 w-full max-w-5xl sm:mt-10">
      <div
        ref={containerRef}
        className="relative touch-none overflow-hidden rounded-2xl border-2 border-ale-gold/50 bg-ale-ink shadow-2xl shadow-ale-gold/10 select-none sm:rounded-3xl"
        style={{ aspectRatio: `${width} / ${height}` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label="Comparar antes y después de estética dental"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(position)}
      >
        <Image
          src={after}
          alt="Después del tratamiento de estética dental"
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className={IMAGE_CLASS}
          draggable={false}
          loading="lazy"
        />

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={before}
            alt="Antes del tratamiento de estética dental"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className={IMAGE_CLASS}
            draggable={false}
            loading="lazy"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-ale-cta shadow-lg sm:h-10 sm:w-10">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <span className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-ale-dark/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:top-4 sm:left-4 sm:px-3 sm:text-xs">
          Antes
        </span>
        <span className="pointer-events-none absolute top-3 right-3 z-20 rounded-full bg-ale-cta/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:top-4 sm:right-4 sm:px-3 sm:text-xs">
          Después
        </span>
      </div>

      <p className="mt-4 text-center text-xs tracking-wide text-ale-ink/55 sm:text-sm">
        Arrastra el control para comparar carillas y diseño de sonrisa
      </p>
    </div>
  );
}
