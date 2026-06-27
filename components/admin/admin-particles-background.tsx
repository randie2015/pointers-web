'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { bindCenterAttractor, heroParticlesOptions } from '@/lib/hero-particles';

const MAGENTA = '#BC2656';

export function AdminParticlesBackground() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (!container) return;
    cleanupRef.current?.();
    cleanupRef.current = bindCenterAttractor(container);
  }, []);

  useEffect(() => {
    return () => cleanupRef.current?.();
  }, []);

  const options = useMemo(() => heroParticlesOptions, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0b]">
      <Particles
        id="admin-particles"
        className="absolute inset-0"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(100vw, 640px)',
          height: 'min(100vw, 640px)',
          backgroundColor: MAGENTA,
          filter: 'blur(160px)',
          opacity: 0.55
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(60vw, 360px)',
          height: 'min(60vw, 360px)',
          backgroundColor: MAGENTA,
          filter: 'blur(70px)',
          opacity: 0.75
        }}
      />
    </div>
  );
}
