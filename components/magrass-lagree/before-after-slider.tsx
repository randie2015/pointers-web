'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { clinicHome } from '@/src/data/magrassData';

const { before, after, width, height } = clinicHome.beforeAfter;
const IMAGE_CLASS = 'pointer-events-none select-none object-cover object-center';

export function MagrassBeforeAfterSlider() {
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
        className="relative touch-none overflow-hidden rounded-2xl border-2 border-mag-sand/50 bg-mag-navy shadow-xl select-none sm:rounded-3xl"
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
        <Image src={after} alt="Después del tratamiento" fill sizes="(max-width: 896px) 100vw, 896px" className={IMAGE_CLASS} draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before} alt="Antes del tratamiento" fill sizes="(max-width: 896px) 100vw, 896px" className={IMAGE_CLASS} draggable={false} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-lg" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-mag-sand shadow-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-mag-navy" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <span className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-mag-navy/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white sm:top-4 sm:left-4 sm:px-3 sm:text-xs">
          Antes
        </span>
        <span className="pointer-events-none absolute top-3 right-3 z-20 rounded-full bg-mag-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-mag-navy sm:top-4 sm:right-4 sm:px-3 sm:text-xs">
          Después
        </span>
      </div>
      <p className="mt-4 text-center text-xs font-medium text-mag-muted sm:text-sm">
        Arrastra el control para comparar resultados reales
      </p>
    </div>
  );
}
