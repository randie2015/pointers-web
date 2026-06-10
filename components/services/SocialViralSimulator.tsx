'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Heart, Share2 } from 'lucide-react';

const TEAL = '#39B8AD';
const MAGENTA = '#BC2656';

type Phase = 'idle' | 'cursor' | 'publish' | 'viral' | 'hold' | 'reset';

type Particle = {
  id: number;
  type: 'heart' | 'fire' | 'share';
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
};

const METRICS = [
  { key: 'likes', label: 'LIKES', target: 25400 },
  { key: 'views', label: 'VIEWS', target: 128500 },
  { key: 'followers', label: 'FOLLOWERS', target: 3120 }
] as const;

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}

function AnimatedMetric({
  label,
  target,
  running,
  highlight
}: {
  label: string;
  target: number;
  running: boolean;
  highlight?: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!running) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const duration = 3000;
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.floor(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, target]);

  return (
    <div className="text-center">
      <p className="text-[7px] font-bold tracking-widest text-white/40">{label}</p>
      <p
        className="text-sm font-bold tabular-nums transition-colors duration-300"
        style={{ color: highlight && value >= target * 0.9 ? TEAL : '#fff' }}
      >
        {formatCount(value)}
      </p>
    </div>
  );
}

function CursorPointer() {
  return (
    <svg width="20" height="24" viewBox="0 0 22 26" className="drop-shadow-lg" aria-hidden>
      <path
        d="M2 2 L2 20 L7.5 15 L11 23 L14 21.5 L10.5 14 L17 14 Z"
        fill="#fff"
        stroke="#1a1a1b"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ParticleIcon({ type, size }: { type: Particle['type']; size: number }) {
  const props = { size, strokeWidth: 2.5 };
  if (type === 'heart') return <Heart {...props} fill={MAGENTA} color={MAGENTA} />;
  if (type === 'fire') return <Flame {...props} fill="#f97316" color="#f97316" />;
  return <Share2 {...props} color={TEAL} />;
}

function generateParticles(count: number): Particle[] {
  const types: Particle['type'][] = ['heart', 'heart', 'heart', 'fire', 'share'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    x: (Math.random() - 0.5) * 120,
    delay: Math.random() * 0.8,
    duration: 1.2 + Math.random() * 1.4,
    size: 10 + Math.random() * 10,
    rotate: (Math.random() - 0.5) * 60
  }));
}

export function SocialViralSimulator() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [published, setPublished] = useState(false);
  const [viral, setViral] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const running = useRef(true);

  const particleBatch = useMemo(() => generateParticles(72), [viral]);

  useEffect(() => {
    if (viral) setParticles(particleBatch);
    else setParticles([]);
  }, [viral, particleBatch]);

  useEffect(() => {
    running.current = true;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const runLoop = async () => {
      while (running.current) {
        setPhase('idle');
        setPublished(false);
        setViral(false);
        setShowCursor(false);
        setParticles([]);
        await wait(1400);

        setPhase('cursor');
        setShowCursor(true);
        await wait(900);

        setPhase('publish');
        setPublished(true);
        await wait(400);

        setPhase('viral');
        setViral(true);
        await wait(4200);

        setPhase('hold');
        await wait(1600);

        setPhase('reset');
        setShowCursor(false);
        setPublished(false);
        setViral(false);
        setParticles([]);
        await wait(800);
      }
    };

    runLoop();
    return () => {
      running.current = false;
    };
  }, []);

  const showGlow = phase === 'viral' || phase === 'hold';

  return (
    <div
      className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl border border-border/50 shadow-xl md:min-h-[340px]"
      style={{
        backgroundColor: '#faf9f7',
        backgroundImage: `
          radial-gradient(circle at 50% 55%, rgba(188,38,86,0.08) 0%, transparent 50%),
          repeating-linear-gradient(0deg, transparent, transparent 11px, rgba(0,0,0,0.016) 11px, rgba(0,0,0,0.016) 12px),
          repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(0,0,0,0.016) 11px, rgba(0,0,0,0.016) 12px)
        `
      }}
      aria-label="Social media virality simulator"
    >
      {/* Glow magenta */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          opacity: showGlow ? 0.65 : 0,
          scale: showGlow ? 1 : 0.6
        }}
        transition={{ duration: 0.8 }}
        style={{
          width: 'min(70vw, 220px)',
          height: 'min(70vw, 220px)',
          backgroundColor: MAGENTA,
          filter: 'blur(80px)'
        }}
      />

      {/* Teléfono flotante */}
      <motion.div
        className="relative z-10"
        style={{ perspective: 900 }}
        animate={
          phase === 'idle'
            ? { scale: [1, 1.02, 1], rotateY: [-6, -4, -6], y: [0, -4, 0] }
            : viral
              ? { x: [-2, 2, -2, 2, -1, 1, 0], rotateY: -5, y: 0, scale: 1 }
              : { rotateY: -5, y: 0, scale: 1, x: 0 }
        }
        transition={
          phase === 'idle'
            ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            : viral
              ? { duration: 0.12, repeat: Infinity, ease: 'linear' }
              : { duration: 0.5 }
        }
      >
        {/* Partículas — lluvia viral */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute left-1/2 top-1/2"
                initial={{ opacity: 0, x: p.x * 0.3, y: 20, scale: 0.3 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: p.x,
                  y: [-20, -80 - Math.random() * 60],
                  scale: [0.4, 1, 0.8],
                  rotate: p.rotate
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: 'easeOut'
                }}
              >
                <ParticleIcon type={p.type} size={p.size} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cuerpo del smartphone */}
        <div
          className="relative w-[148px] rounded-[2rem] border p-[3px] shadow-2xl md:w-[158px]"
          style={{
            borderColor: `${TEAL}55`,
            background: 'linear-gradient(145deg, rgba(57,184,173,0.15), rgba(0,0,0,0.5))',
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px ${TEAL}30, inset 0 1px 0 rgba(255,255,255,0.08)`
          }}
        >
          <div
            className="overflow-hidden rounded-[1.65rem] backdrop-blur-xl"
            style={{ background: 'rgba(12,12,14,0.85)' }}
          >
            {/* Notch */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="h-4 w-16 rounded-full bg-black/80" />
            </div>

            {/* Pantalla */}
            <div className="px-3 pb-4 pt-1">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-brand/80 to-purple/60" />
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-14 rounded-full bg-white/30" />
                  <div className="h-1 w-10 rounded-full bg-white/15" />
                </div>
              </div>

              <div className="mb-3 aspect-[4/3] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-2">
                <div className="h-full w-full rounded-lg bg-white/5" />
              </div>

              {/* Publish button */}
              <div className="relative mb-4">
                <motion.button
                  type="button"
                  className="w-full rounded-full py-2 text-[9px] font-bold tracking-widest text-white transition-colors"
                  animate={{
                    backgroundColor: published ? TEAL : '#1a1a1b',
                    boxShadow: published ? `0 0 20px ${TEAL}66` : 'none'
                  }}
                  transition={{ duration: 0.35 }}
                >
                  PUBLISH
                </motion.button>

                {/* Cursor */}
                <AnimatePresence>
                  {showCursor && !viral && (
                    <motion.div
                      className="absolute -bottom-1 right-2 z-30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        <CursorPointer />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-white/5 px-1 py-2">
                {METRICS.map((m) => (
                  <AnimatedMetric
                    key={m.key}
                    label={m.label}
                    target={m.target}
                    running={viral}
                    highlight
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Marca sutil */}
      <p className="absolute bottom-3 left-0 right-0 z-10 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
        Pointers · Virality
      </p>
    </div>
  );
}
