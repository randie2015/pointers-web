'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const MAGENTA = '#BC2656';
const VIOLET = '#5E549D';
const TEAL = '#39B8AD';

const IGNITE_MS = 700;
const LIFTOFF_MS = 950;
const RETURN_MS = 1600;
const WAIT_MS = 1100;

type Phase = 'wait' | 'ignite' | 'liftoff' | 'return';

type FlameParticle = {
  id: number;
  x: number;
  delay: number;
  size: number;
  color: string;
};

function buildFlames(count: number): FlameParticle[] {
  const colors = [MAGENTA, TEAL, MAGENTA, TEAL, '#e84a7a', '#5ed4c8'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 28,
    delay: Math.random() * 0.35,
    size: 4 + Math.random() * 7,
    color: colors[i % colors.length]
  }));
}

function RocketSvg() {
  return (
    <svg width="56" height="88" viewBox="0 0 56 88" className="drop-shadow-lg" aria-hidden>
      <defs>
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6d64a8" />
          <stop offset="50%" stopColor={VIOLET} />
          <stop offset="100%" stopColor="#4a4378" />
        </linearGradient>
        <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={TEAL} />
          <stop offset="100%" stopColor="#2a8a82" />
        </linearGradient>
      </defs>
      {/* Aletas */}
      <path d="M10 62 L4 78 L16 72 Z" fill="#3d3658" stroke="#2a2540" strokeWidth="0.5" />
      <path d="M46 62 L52 78 L40 72 Z" fill="#3d3658" stroke="#2a2540" strokeWidth="0.5" />
      {/* Cuerpo */}
      <path
        d="M28 8 C36 8 42 18 42 32 L42 68 C42 74 36 78 28 78 C20 78 14 74 14 68 L14 32 C14 18 20 8 28 8 Z"
        fill="url(#rocketBody)"
        stroke="#3d3658"
        strokeWidth="0.6"
      />
      {/* Ventana */}
      <circle cx="28" cy="36" r="7" fill="url(#rocketWindow)" stroke="#2a2540" strokeWidth="1" />
      <ellipse cx="26" cy="34" rx="2" ry="1.5" fill="rgba(255,255,255,0.35)" />
      {/* Nariz */}
      <path d="M28 4 L34 14 L22 14 Z" fill="#2a2540" />
      {/* Boquilla motor */}
      <rect x="22" y="74" width="12" height="6" rx="2" fill="#1a1a22" />
    </svg>
  );
}

function FlameBurst({ active, intense }: { active: boolean; intense: boolean }) {
  const particles = useMemo(() => buildFlames(intense ? 28 : 16), [intense, active]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2">
      <AnimatePresence>
        {active &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                width: p.size,
                height: p.size * (intense ? 1.8 : 1.3),
                backgroundColor: p.color,
                boxShadow: `0 0 ${intense ? 10 : 6}px ${p.color}88`
              }}
              initial={{ y: 0, opacity: 0.95, scale: 1 }}
              animate={{
                y: intense ? [0, 28, 52] : [0, 18, 34],
                opacity: [0.95, 0.7, 0],
                scale: intense ? [1, 1.2, 0.6] : [1, 0.9, 0.4],
                x: [p.x, p.x + ((p.id % 5) - 2) * 2]
              }}
              transition={{
                duration: intense ? 0.45 : 0.55,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          ))}
      </AnimatePresence>
      {/* Cono de fuego central */}
      {active && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[2px]"
          animate={{
            height: intense ? [20, 48, 56] : [12, 28, 32],
            width: intense ? [14, 22, 26] : [10, 16, 18],
            opacity: [0.85, 1, 0.7]
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            top: 2,
            background: `linear-gradient(180deg, ${TEAL} 0%, ${MAGENTA} 55%, transparent 100%)`
          }}
        />
      )}
    </div>
  );
}

function LaunchSmoke({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full bg-zinc-300/50"
            style={{
              left: `calc(50% + ${(i - 1) * 22}px)`,
              bottom: 18,
              width: 36 + i * 14,
              height: 24 + i * 10,
              marginLeft: -(18 + i * 7),
              filter: 'blur(12px)'
            }}
            initial={{ scale: 0.4, opacity: 0, y: 0 }}
            animate={{ scale: [0.4, 1.6, 2.2], opacity: [0, 0.55, 0], y: [0, -8, -16] }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: 'easeOut' }}
          />
        ))}
    </AnimatePresence>
  );
}

export function LaunchRocket() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.45, once: false });
  const [phase, setPhase] = useState<Phase>('wait');
  const [liftoffY, setLiftoffY] = useState(-320);
  const running = useRef(false);

  const igniting = phase === 'ignite';
  const lifting = phase === 'liftoff';
  const returning = phase === 'return';
  const flamesOn = phase === 'ignite' || phase === 'liftoff';
  const intenseFlames = phase === 'liftoff';

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setLiftoffY(-(containerRef.current.offsetHeight + 100));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (!inView) {
      running.current = false;
      setPhase('wait');
      return;
    }

    running.current = true;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const loop = async () => {
      while (running.current) {
        setPhase('wait');
        await wait(WAIT_MS);
        if (!running.current) break;

        setPhase('ignite');
        await wait(IGNITE_MS);
        if (!running.current) break;

        setPhase('liftoff');
        await wait(LIFTOFF_MS);
        if (!running.current) break;

        setPhase('return');
        await wait(RETURN_MS);
      }
    };

    loop();
    return () => {
      running.current = false;
    };
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/90 shadow-md"
      aria-hidden
    >
      {/* Estrellas sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {[12, 28, 45, 62, 78, 88].map((left, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-zinc-400"
            style={{ left: `${left}%`, top: `${10 + (i % 4) * 12}%` }}
          />
        ))}
      </div>

      {/* Plataforma */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-zinc-200/80 to-transparent" />
      <div className="absolute bottom-4 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-zinc-300/90" />
      <div className="absolute bottom-6 left-1/2 h-8 w-16 -translate-x-1/2 rounded-t-lg border border-zinc-300/60 bg-zinc-200/40" />

      <LaunchSmoke active={lifting} />

      {/* Cohete */}
      <motion.div
        className="absolute left-1/2 z-10 flex flex-col items-center"
        style={{ bottom: '18%' }}
        animate={
          lifting
            ? { y: liftoffY, opacity: [1, 1, 0.85, 0], scale: [1, 1.06, 1.02, 0.96] }
            : returning
              ? { y: 0, opacity: [0, 0.25, 0.7, 1], scale: [0.94, 0.97, 1], rotate: 0 }
              : igniting
                ? {
                    y: 0,
                    scale: [1, 1.02, 1, 1.02, 1],
                    rotate: [0, -2, 2, -1.5, 0],
                    opacity: 1
                  }
                : { y: 0, scale: 1, rotate: 0, opacity: 1 }
        }
        transition={
          lifting
            ? { duration: LIFTOFF_MS / 1000, ease: [0.65, 0, 0.85, 0.15] }
            : returning
              ? {
                  duration: RETURN_MS / 1000,
                  ease: [0.22, 0.85, 0.25, 1],
                  opacity: { duration: RETURN_MS / 1000, ease: 'easeOut' }
                }
              : igniting
                ? { duration: 0.12, repeat: Infinity, repeatType: 'mirror' }
                : { duration: 0.35 }
        }
      >
        <RocketSvg />
        <FlameBurst active={flamesOn} intense={intenseFlames} />
      </motion.div>

      {/* Resplandor de ignición en la base */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full"
        animate={{
          opacity: flamesOn ? [0.3, 0.7, 0.4] : 0,
          scale: flamesOn ? [1, 1.3, 1.1] : 0.8
        }}
        transition={{ duration: 0.25, repeat: flamesOn ? Infinity : 0 }}
        style={{
          width: 64,
          height: 32,
          background: `radial-gradient(ellipse, ${MAGENTA}55 0%, ${TEAL}33 45%, transparent 70%)`,
          filter: 'blur(8px)'
        }}
      />
    </div>
  );
}
