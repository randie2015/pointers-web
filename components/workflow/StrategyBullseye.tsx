'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const VIOLET = '#5E549D';
const MAGENTA = '#BC2656';
const TEAL = '#39B8AD';

const FLIGHT_MS = 420;
const HOLD_MS = 1600;
const RESET_MS = 450;

/** Punto de mira: centro del lienzo (misma referencia que la diana) */
const CENTER = { x: 0, y: 0 };
/** Origen del disparo: arriba-derecha, fuera del blanco */
const START = { x: 108, y: -82 };
/** Ángulo de vuelo (punta hacia el centro); flecha dibujada con punta en el origen local */
const FLIGHT_ANGLE = Math.atan2(CENTER.y - START.y, CENTER.x - START.x) * (180 / Math.PI);

const ARROW_W = 104;
const ARROW_H = 40;
const TIP_X = 98;
const TIP_Y = ARROW_H / 2;

function BullseyeTarget({ impact }: { impact: boolean }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={impact ? { scale: [1, 0.95, 1] } : { scale: 1 }}
      transition={{ duration: 0.45, times: [0, 0.35, 1], ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: 132,
          height: 132,
          border: `2px solid ${VIOLET}`,
          opacity: 0.35,
          background: `${VIOLET}08`
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 88,
          height: 88,
          border: `2px solid ${MAGENTA}`,
          opacity: 0.55,
          background: `${MAGENTA}0c`
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 44,
          height: 44,
          border: `1.5px solid ${MAGENTA}66`,
          background: `${MAGENTA}12`
        }}
      />
      <motion.div
        className="relative z-10 rounded-full shadow-lg"
        style={{
          width: 14,
          height: 14,
          backgroundColor: TEAL,
          boxShadow: `0 0 16px ${TEAL}88`
        }}
        animate={impact ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

/** Flecha deportiva (vista lateral): punta en (TIP_X, TIP_Y) */
function SportsArrow() {
  const ty = TIP_Y;
  const tx = TIP_X;
  const shaftEnd = 24;
  const ferruleX = 80;

  return (
    <svg
      width={ARROW_W}
      height={ARROW_H}
      viewBox={`0 0 ${ARROW_W} ${ARROW_H}`}
      className="overflow-visible drop-shadow-lg"
      aria-hidden
    >
      <defs>
        <linearGradient id="shaftWood" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b5344" />
          <stop offset="45%" stopColor="#8a6d52" />
          <stop offset="100%" stopColor="#5c4838" />
        </linearGradient>
        <linearGradient id="headMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="50%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="featherTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={MAGENTA} />
          <stop offset="100%" stopColor="#8a1a42" />
        </linearGradient>
        <linearGradient id="featherBot" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={MAGENTA} />
          <stop offset="100%" stopColor="#8a1a42" />
        </linearGradient>
      </defs>

      {/* Pluma superior */}
      <path
        d={`M${shaftEnd + 2} ${ty - 1.2} C ${shaftEnd - 6} ${ty - 1}, ${shaftEnd - 14} ${ty - 11}, 3 ${ty - 13} L ${shaftEnd} ${ty - 2.2} Z`}
        fill="url(#featherTop)"
        opacity={0.95}
      />
      {/* Pluma inferior */}
      <path
        d={`M${shaftEnd + 2} ${ty + 1.2} C ${shaftEnd - 6} ${ty + 1}, ${shaftEnd - 14} ${ty + 11}, 3 ${ty + 13} L ${shaftEnd} ${ty + 2.2} Z`}
        fill="url(#featherBot)"
        opacity={0.95}
      />
      {/* Pluma central (cock feather) */}
      <path
        d={`M${shaftEnd + 1} ${ty - 0.6} C ${shaftEnd - 8} ${ty}, ${shaftEnd - 16} ${ty}, 5 ${ty} L ${shaftEnd + 1} ${ty + 0.6} Z`}
        fill={VIOLET}
        opacity={0.75}
      />

      {/* Culatín (muesca) */}
      <path
        d={`M3 ${ty} L0 ${ty - 3.5} L0 ${ty + 3.5} Z`}
        fill="#1a1a1a"
        stroke="#333"
        strokeWidth={0.4}
      />

      {/* Astil */}
      <rect
        x={shaftEnd}
        y={ty - 2}
        width={ferruleX - shaftEnd}
        height={4}
        rx={2}
        fill="url(#shaftWood)"
      />
      <line
        x1={shaftEnd + 4}
        y1={ty}
        x2={ferruleX - 2}
        y2={ty}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={0.6}
      />

      {/* Virola metálica */}
      <rect x={ferruleX} y={ty - 2.8} width={5} height={5.6} rx={0.6} fill="#9ca3af" stroke="#6b7280" strokeWidth={0.5} />

      {/* Punta de caza — triángulo alargado */}
      <path
        d={`M${tx} ${ty} L${ferruleX + 5} ${ty - 6.5} L${ferruleX + 5} ${ty + 6.5} Z`}
        fill="url(#headMetal)"
        stroke="#111"
        strokeWidth={0.4}
        strokeLinejoin="round"
      />
      {/* Filo central de la punta */}
      <line
        x1={ferruleX + 6}
        y1={ty}
        x2={tx - 1}
        y2={ty}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.5}
      />
      {/* Marca de impacto en la punta */}
      <circle cx={tx} cy={ty} r={1.3} fill={TEAL} opacity={0.95} />
    </svg>
  );
}

function ImpactRipples({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active &&
        [0, 1].map((i) => (
          <motion.div
            key={`ripple-${i}`}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2"
            style={{
              width: 24,
              height: 24,
              marginLeft: -12,
              marginTop: -12,
              borderColor: i === 0 ? TEAL : MAGENTA
            }}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 2.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        ))}
    </AnimatePresence>
  );
}

export function StrategyBullseye() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.45, once: false });
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'flying' | 'stuck'>('idle');
  const running = useRef(false);

  const impact = phase === 'stuck';

  useEffect(() => {
    if (!inView) {
      running.current = false;
      setPhase('idle');
      return;
    }

    running.current = true;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const loop = async () => {
      while (running.current) {
        setPhase('idle');
        await wait(RESET_MS);
        if (!running.current) break;

        setPhase('flying');
        await wait(FLIGHT_MS);
        if (!running.current) break;

        setPhase('stuck');
        setCycle((c) => c + 1);
        await wait(HOLD_MS);
      }
    };

    loop();
    return () => {
      running.current = false;
    };
  }, [inView]);

  const arrowX = phase === 'idle' ? START.x : CENTER.x;
  const arrowY = phase === 'idle' ? START.y : CENTER.y;
  const arrowOpacity = phase === 'idle' ? 0 : 1;

  return (
    <div
      ref={containerRef}
      className="relative mt-5 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/80 shadow-md"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-200" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-200" />
      </div>

      <div className="relative flex items-center justify-center">
        <BullseyeTarget impact={impact} />
        <ImpactRipples key={cycle} active={impact} />
      </div>

      {/* Flecha: transformOrigin = punta → impacto exacto en el centro */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20"
        style={{
          width: ARROW_W,
          height: ARROW_H,
          marginLeft: -TIP_X,
          marginTop: -TIP_Y,
          transformOrigin: `${TIP_X}px ${TIP_Y}px`
        }}
        initial={false}
        animate={{
          x: arrowX,
          y: arrowY,
          rotate: FLIGHT_ANGLE,
          opacity: arrowOpacity
        }}
        transition={
          phase === 'flying'
            ? { duration: FLIGHT_MS / 1000, ease: [0.12, 0.92, 0.22, 1] }
            : { duration: phase === 'idle' ? 0.15 : 0 }
        }
      >
        <SportsArrow />
      </motion.div>

      <AnimatePresence>
        {impact && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            initial={{ scale: 0.5, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              background: `radial-gradient(circle, ${TEAL}66 0%, ${MAGENTA}22 50%, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
