'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS, DOG_PATHS, DOG_VIEWBOX } from './dog-path';

type Phase =
  | 'dip-magenta'
  | 'paint-1'
  | 'pulse-1'
  | 'dip-violet'
  | 'paint-2'
  | 'pulse-2'
  | 'reset';

const MAGENTA = COLORS.magenta;
const VIOLET = COLORS.violet;
const TEAL = COLORS.teal;

/** Puntos clave (% del canvas) para el pincel */
const POINTS = {
  paletteMagenta: { x: 22, y: 58 },
  paletteViolet: { x: 28, y: 52 },
  logo1: { x: 52, y: 48 },
  logo2: { x: 78, y: 48 },
  rest: { x: 18, y: 42 }
} as const;

function PaintedDog({
  progress,
  fill,
  pulse
}: {
  progress: number;
  fill: string;
  pulse?: boolean;
}) {
  const clipId = useId();
  const width = 150 * Math.min(1, Math.max(0, progress));

  return (
    <motion.svg
      viewBox={DOG_VIEWBOX}
      className="h-[76px] w-auto md:h-[88px]"
      animate={pulse ? { scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)'] } : { scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={width} height="105" />
        </clipPath>
      </defs>
      {/* Relleno pintado */}
      <g clipPath={`url(#${clipId})`}>
        {DOG_PATHS.map((d, i) => (
          <path key={`fill-${i}`} d={d} fill={fill} />
        ))}
      </g>
      {/* Wireframe / lienzo */}
      {DOG_PATHS.map((d, i) => (
        <path
          key={`line-${i}`}
          d={d}
          fill="none"
          stroke="#e7e5e4"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      ))}
    </motion.svg>
  );
}

function PaintBrush({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="drop-shadow-md" aria-hidden>
      <motion.g
        animate={{ rotate: [-8, -4, -8] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M8 28 L14 6 L20 8 L14 30 Z"
          fill="#8B7355"
          stroke="#6B5344"
          strokeWidth="0.6"
        />
        <path d="M13 5 L21 7 L19 11 L11 9 Z" fill={color} stroke="#fff" strokeWidth="0.4" opacity={0.95} />
        <ellipse cx="14" cy="30" rx="5" ry="2" fill="#6B5344" opacity="0.35" />
      </motion.g>
    </svg>
  );
}

function WoodenPalette() {
  return (
    <svg viewBox="0 0 200 120" className="h-[100px] w-[168px] md:h-[118px] md:w-[190px]" aria-hidden>
      {/* Madera */}
      <ellipse cx="100" cy="62" rx="88" ry="48" fill="#C4A574" stroke="#9A7B4F" strokeWidth="1.5" />
      <ellipse cx="100" cy="58" rx="82" ry="42" fill="#D4B896" opacity="0.6" />
      <ellipse cx="72" cy="38" rx="14" ry="10" fill="#B8956A" opacity="0.5" />
      {/* Óleos — texturas gruesas */}
      <g filter="url(#oilTexture)">
        <path
          d="M58 48 C52 38, 48 52, 54 62 C60 68, 68 58, 58 48 Z"
          fill={MAGENTA}
          opacity={0.95}
        />
        <path
          d="M88 42 C82 32, 78 48, 86 58 C94 64, 102 50, 88 42 Z"
          fill={VIOLET}
          opacity={0.95}
        />
        <path
          d="M118 50 C112 40, 108 56, 116 66 C124 72, 132 58, 118 50 Z"
          fill={TEAL}
          opacity={0.95}
        />
        {/* Highlights óleo */}
        <ellipse cx="62" cy="50" rx="4" ry="2.5" fill="#fff" opacity="0.25" />
        <ellipse cx="92" cy="44" rx="3.5" ry="2" fill="#fff" opacity={0.22} />
        <ellipse cx="122" cy="52" rx="4" ry="2" fill="#fff" opacity={0.25} />
      </g>
      <defs>
        <filter id="oilTexture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
    </svg>
  );
}

export function BrandingPainter() {
  const [phase, setPhase] = useState<Phase>('dip-magenta');
  const [paint1, setPaint1] = useState(0);
  const [paint2, setPaint2] = useState(0);
  const [fill1, setFill1] = useState<string>(MAGENTA);
  const [fill2, setFill2] = useState<string>(VIOLET);
  const [brushColor, setBrushColor] = useState<string>(MAGENTA);
  const [pulse1, setPulse1] = useState(false);
  const [pulse2, setPulse2] = useState(false);
  const running = useRef(true);
  const [brushPos, setBrushPos] = useState<{ x: number; y: number }>(POINTS.rest);

  useEffect(() => {
    running.current = true;

    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const moveBrush = (x: number, y: number, durationMs: number) =>
      new Promise<void>((resolve) => {
        setBrushPos({ x, y });
        setTimeout(resolve, durationMs);
      });

    const paintReveal = (setter: (v: number) => void, durationMs: number) =>
      new Promise<void>((resolve) => {
        setter(0);
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / durationMs);
          setter(p);
          if (p < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });

    const runLoop = async () => {
      while (running.current) {
        // Paso 1 — recoger magenta
        setPhase('dip-magenta');
        setBrushColor(MAGENTA);
        setPulse1(false);
        setPulse2(false);
        await moveBrush(POINTS.paletteMagenta.x, POINTS.paletteMagenta.y, 650);
        await wait(280);

        // Paso 2 — pintar logo 1
        setPhase('paint-1');
        setFill1(MAGENTA);
        await moveBrush(POINTS.logo1.x, POINTS.logo1.y, 850);
        await paintReveal(setPaint1, 2400);
        await wait(120);

        // Pulso turquesa
        setPhase('pulse-1');
        setPulse1(true);
        setFill1(TEAL);
        await wait(650);
        setPulse1(false);
        setFill1(MAGENTA);
        await wait(200);

        // Paso 3 — recoger violeta
        setPhase('dip-violet');
        setBrushColor(VIOLET);
        await moveBrush(POINTS.paletteViolet.x, POINTS.paletteViolet.y, 700);
        await wait(280);

        // Pintar logo 2
        setPhase('paint-2');
        setFill2(VIOLET);
        await moveBrush(POINTS.logo2.x, POINTS.logo2.y, 850);
        await paintReveal(setPaint2, 2400);
        await wait(120);

        setPhase('pulse-2');
        setPulse2(true);
        setFill2(TEAL);
        await wait(650);
        setPulse2(false);

        // Reset para loop
        setPhase('reset');
        setPaint1(0);
        setPaint2(0);
        setFill2(VIOLET);
        await moveBrush(POINTS.rest.x, POINTS.rest.y, 600);
        await wait(500);
      }
    };

    runLoop();
    return () => {
      running.current = false;
    };
  }, []);

  return (
    <div
      className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border/60 bg-[#faf9f7] p-4 shadow-xl shadow-black/[0.05] md:min-h-[340px] md:p-5"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(188,38,86,0.04) 0%, transparent 45%),
          radial-gradient(circle at 80% 70%, rgba(57,184,173,0.05) 0%, transparent 40%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 11px,
            rgba(0,0,0,0.018) 11px,
            rgba(0,0,0,0.018) 12px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 11px,
            rgba(0,0,0,0.018) 11px,
            rgba(0,0,0,0.018) 12px
          )
        `
      }}
      aria-label="Animación de branding: paleta y pintura del logo"
    >
      {/* Paleta fija */}
      <div className="absolute left-[2%] top-1/2 z-10 -translate-y-1/2">
        <WoodenPalette />
      </div>

      {/* Logos en lienzo */}
      <div className="absolute left-[38%] top-1/2 z-[1] flex -translate-y-1/2 items-center gap-6 md:gap-10">
        <PaintedDog progress={paint1} fill={fill1} pulse={pulse1} />
        <PaintedDog progress={paint2} fill={fill2} pulse={pulse2} />
      </div>

      {/* Pincel animado */}
      <motion.div
        className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: `${brushPos.x}%`, top: `${brushPos.y}%` }}
      >
        <PaintBrush color={brushColor} />
      </motion.div>

      {/* Mancha de pintura bajo el pincel al pintar */}
      {(phase === 'paint-1' || phase === 'paint-2') && (
        <motion.div
          className="pointer-events-none absolute z-[2] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: phase === 'paint-1' ? `${POINTS.logo1.x}%` : `${POINTS.logo2.x}%`,
            top: phase === 'paint-1' ? `${POINTS.logo1.y}%` : `${POINTS.logo2.y}%`,
            backgroundColor: phase === 'paint-1' ? fill1 : fill2
          }}
          animate={{ scale: [0.5, 1.2, 0.8], opacity: [0.6, 0.3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  );
}
