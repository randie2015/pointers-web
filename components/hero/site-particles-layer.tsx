'use client';

import { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { useReducedMotion } from 'framer-motion';
import { loadHeroParticlesEngine } from '@/lib/hero-particles-loader';
import { createSiteParticlesOptions } from '@/lib/site-particles';
import { useMediaQuery } from '@/lib/use-media-query';

/**
 * Capa fija de partículas — red dispersa sin gravedad.
 * Repulsión vía tsparticles (window). Sin física custom hacia el centro.
 */
export function SiteParticlesLayer() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const options = useMemo(() => createSiteParticlesOptions(isMobile), [isMobile]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadHeroParticlesEngine(engine);
  }, []);

  if (reducedMotion) return null;

  return (
    <Particles
      id="site-particles"
      key={isMobile ? 'site-particles-mobile' : 'site-particles-desktop'}
      className="particles-canvas-layer pointer-events-none -z-10"
      init={particlesInit}
      options={options}
    />
  );
}
