'use client';

import { motion, useReducedMotion } from 'framer-motion';

const MAGENTA = '#BC2656';
const MAGENTA_DEEP = '#7A1838';
const VIOLET = '#5E549D';
const VOID_CORE = '#12060c';

type HeroCosmicVoidProps = {
  className?: string;
};

/** Layered black-hole void — diffuse accretion glow with dark event horizon. */
export function HeroCosmicVoid({ className }: HeroCosmicVoidProps) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-[46%] z-[1] -translate-x-1/2 -translate-y-1/2 ${className ?? ''}`}
    >
      {/* Outermost nebula — vast cosmic haze */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(140vw, 920px)',
          height: 'min(140vw, 920px)',
          background: `radial-gradient(circle, ${MAGENTA}18 0%, ${VIOLET}10 28%, transparent 62%)`,
          filter: 'blur(72px)'
        }}
        animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Accretion disk — elliptical, diffused */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(95vw, 640px)',
          height: 'min(55vw, 360px)',
          background: `radial-gradient(ellipse at center, ${MAGENTA}55 0%, ${MAGENTA}30 22%, ${VIOLET}18 45%, transparent 72%)`,
          filter: 'blur(48px)'
        }}
        animate={reduced ? undefined : { rotate: [-12, -8, -14, -12], scale: [1, 1.04, 0.98, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mid glow ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(72vw, 480px)',
          height: 'min(72vw, 480px)',
          background: `radial-gradient(circle, ${MAGENTA}66 0%, ${MAGENTA}28 35%, transparent 68%)`,
          filter: 'blur(36px)'
        }}
        animate={reduced ? undefined : { opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Inner photon ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(38vw, 220px)',
          height: 'min(38vw, 220px)',
          background: `radial-gradient(circle, ${MAGENTA}88 0%, ${MAGENTA}44 40%, transparent 72%)`,
          filter: 'blur(22px)'
        }}
      />

      {/* Event horizon — dark core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(16vw, 96px)',
          height: 'min(16vw, 96px)',
          background: `radial-gradient(circle, ${VOID_CORE} 0%, ${MAGENTA_DEEP}55 55%, transparent 100%)`,
          boxShadow: `0 0 40px 20px ${MAGENTA}44, 0 0 100px 50px ${MAGENTA}22, inset 0 0 30px 8px rgba(0,0,0,0.85)`
        }}
      />

      {/* Singularity pin-point */}
      <div
        className="absolute left-1/2 top-1/2 h-[min(4vw,24px)] w-[min(4vw,24px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, #000 0%, ${VOID_CORE} 70%, transparent 100%)`,
          boxShadow: `0 0 18px 6px ${MAGENTA}66`
        }}
      />
    </div>
  );
}
