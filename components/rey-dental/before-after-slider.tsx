'use client';

import { useState } from 'react';

export function ReyDentalBeforeAfterSlider() {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative mx-auto mt-10 max-w-lg overflow-hidden rounded-2xl border border-rey-neutral/40 shadow-lg select-none">
      <div className="relative aspect-[16/10]">
        {/* After (background) */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rey-primary/20 via-rey-accent/30 to-white">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-rey-primary">Después</p>
            <p className="mt-1 text-sm text-slate-600">Sonrisa luminosa y natural</p>
          </div>
        </div>

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-300 via-slate-200 to-slate-100"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Antes</p>
            <p className="mt-1 text-sm text-slate-600">Estética dental previa</p>
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-rey-primary shadow-lg">
            <span className="text-xs text-white">↔</span>
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
  );
}
