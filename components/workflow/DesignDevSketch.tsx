'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const MAGENTA = '#BC2656';
const VIOLET = '#5E549D';
const TEAL = '#39B8AD';

const DRAW_MS = 2800;
const FILL_MS = 900;
const HOLD_MS = 1800;
const RESET_MS = 500;

/** Marca abstracta estilizada (forma «A» / puntero) — trazos continuos */
const LOGO_PATHS = [
  'M 38 72 L 50 28 L 62 72',
  'M 43 56 L 57 56'
] as const;

const VIEW = 100;

const PENCIL_START = { x: 88, y: 12, rotate: -135 };

function pencilFromProgress(progress: number, paths: SVGPathElement[]) {
  if (paths.length === 0 || progress <= 0) return PENCIL_START;

  let total = 0;
  const lengths = paths.map((p) => {
    const len = p.getTotalLength();
    total += len;
    return len;
  });

  let target = progress * total;
  let idx = 0;
  while (idx < lengths.length && target > lengths[idx]) {
    target -= lengths[idx];
    idx++;
  }

  const path = paths[Math.min(idx, paths.length - 1)];
  const len = lengths[Math.min(idx, lengths.length - 1)] || 1;
  const at = path.getPointAtLength(Math.min(target, len));
  const before = path.getPointAtLength(Math.max(0, Math.min(target, len) - 2));
  const angle = (Math.atan2(at.y - before.y, at.x - before.x) * 180) / Math.PI;

  return {
    x: (at.x / VIEW) * 100,
    y: (at.y / VIEW) * 100,
    rotate: angle + 42
  };
}

function DesignPencil() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="drop-shadow-md" aria-hidden>
      <defs>
        <linearGradient id="pencilBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="100%" stopColor="#d4b896" />
        </linearGradient>
      </defs>
      {/* Cuerpo */}
      <rect
        x="10"
        y="4"
        width="10"
        height="22"
        rx="1.5"
        fill="url(#pencilBody)"
        stroke="#c4a574"
        strokeWidth="0.5"
        transform="rotate(-42 15 15)"
      />
      {/* Goma */}
      <rect
        x="10.5"
        y="3"
        width="9"
        height="5"
        rx="1.2"
        fill="#e8a0a8"
        stroke="#d47882"
        strokeWidth="0.4"
        transform="rotate(-42 15 6)"
      />
      {/* Ferrule */}
      <rect
        x="10.2"
        y="20"
        width="10.2"
        height="3"
        rx="0.4"
        fill="#b8bcc4"
        stroke="#8b919a"
        strokeWidth="0.35"
        transform="rotate(-42 15 22)"
      />
      {/* Punta de grafito */}
      <path
        d="M 28 30 L 33 35 L 31 33 L 26 28 Z"
        fill="#2d2d2d"
        stroke="#1a1a1a"
        strokeWidth="0.3"
      />
      <path d="M 30 32 L 33 35" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

export function DesignDevSketch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const inView = useInView(containerRef, { amount: 0.45, once: false });

  const [phase, setPhase] = useState<'idle' | 'drawing' | 'fill' | 'hold'>('idle');
  const [progress, setProgress] = useState(0);
  const running = useRef(false);

  const showFill = phase === 'fill' || phase === 'hold';
  const pencilVisible = phase === 'drawing';
  const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
  const pencilPos =
    phase === 'drawing' ? pencilFromProgress(progress, paths) : PENCIL_START;
  const pencilOpacity = pencilVisible ? 1 : 0;

  useEffect(() => {
    if (phase !== 'drawing') return;

    const controls = animate(0, 1, {
      duration: DRAW_MS / 1000,
      ease: [0.42, 0, 0.2, 1],
      onUpdate: (v) => setProgress(v)
    });

    return () => controls.stop();
  }, [phase]);

  useEffect(() => {
    if (!inView) {
      running.current = false;
      setPhase('idle');
      setProgress(0);
      return;
    }

    running.current = true;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const loop = async () => {
      while (running.current) {
        setPhase('idle');
        setProgress(0);
        await wait(RESET_MS);
        if (!running.current) break;

        setPhase('drawing');
        await wait(DRAW_MS);
        if (!running.current) break;

        setPhase('fill');
        await wait(FILL_MS);
        if (!running.current) break;

        setPhase('hold');
        await wait(HOLD_MS);
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
      className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-100 shadow-md"
      style={{
        backgroundColor: '#faf9f7',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 11px, rgba(0,0,0,0.014) 11px, rgba(0,0,0,0.014) 12px),
          repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(0,0,0,0.014) 11px, rgba(0,0,0,0.014) 12px)
        `
      }}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="logoFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={MAGENTA} />
            <stop offset="48%" stopColor={VIOLET} />
            <stop offset="100%" stopColor={TEAL} />
          </linearGradient>
        </defs>

        {/* Silueta rellenable */}
        <motion.path
          d="M 38 72 L 50 28 L 62 72 Z"
          fill="url(#logoFill)"
          stroke="none"
          initial={false}
          animate={{
            opacity: showFill ? 1 : 0,
            scale: showFill ? 1 : 0.96
          }}
          transition={{ duration: FILL_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '50px 50px' }}
        />

        {/* Wireframe fantasma */}
        {LOGO_PATHS.map((d, i) => (
          <path
            key={`ghost-${i}`}
            d={d}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Trazo dibujado */}
        {LOGO_PATHS.map((d, i) => (
          <motion.path
            key={`draw-${i}`}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="#3f3f46"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{
              pathLength: phase === 'idle' ? 0 : progress,
              opacity: phase === 'hold' || phase === 'fill' ? 0.35 : 1
            }}
            transition={{
              pathLength: { duration: 0.05, ease: 'linear' },
              opacity: { duration: 0.4 }
            }}
          />
        ))}
      </svg>

      {/* Lápiz */}
      <motion.div
        className="pointer-events-none absolute z-20"
        style={{
          left: `${pencilPos.x}%`,
          top: `${pencilPos.y}%`,
          marginLeft: -18,
          marginTop: -18
        }}
        animate={{
          rotate: pencilPos.rotate,
          opacity: pencilOpacity,
          scale: pencilVisible ? 1 : 0.92
        }}
        transition={{
          opacity: { duration: 0.35 },
          rotate: { type: 'spring', stiffness: 180, damping: 22 }
        }}
      >
        <DesignPencil />
      </motion.div>

      {/* Brillo al rellenar */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        initial={false}
        animate={{
          opacity: showFill ? [0, 0.5, 0.2] : 0,
          scale: showFill ? [0.6, 1.4, 1.1] : 0.6
        }}
        transition={{ duration: 0.9 }}
        style={{
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          background: `radial-gradient(circle, ${TEAL}33 0%, ${VIOLET}18 40%, transparent 70%)`
        }}
      />
    </div>
  );
}
