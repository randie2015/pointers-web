'use client';

import { useState } from 'react';

export function ReyDentalBeforeAfterSlider() {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative mx-auto mt-8 w-full max-w-3xl px-0 sm:mt-10">
      <div className="overflow-hidden rounded-xl border border-rey-neutral/40 shadow-lg select-none touch-pan-y sm:rounded-2xl">
        <div className="relative aspect-[4/3] sm:aspect-[16/10]">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rey-primary/20 via-rey-accent/30 to-white">
            <div className="px-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-rey-primary sm:text-xs">Después</p>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">Sonrisa luminosa y natural</p>
            </div>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-300 via-slate-200 to-slate-100"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <div className="px-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">Antes</p>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">Estética dental previa</p>
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-rey-primary shadow-lg sm:h-8 sm:w-8">
              <span className="text-sm text-white sm:text-xs">↔</span>
            </div>
          </div>
        </div>

        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Comparar antes y después"
        />
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 sm:hidden">Desliza para comparar</p>
    </div>
  );
}
