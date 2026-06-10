'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const TEAL = '#39B8AD';

type BlockId = 'nav' | 'hero' | 'grid' | 'footer';

const LIBRARY: { id: BlockId; label: string; panelY: number }[] = [
  { id: 'nav', label: 'Nav', panelY: 30 },
  { id: 'hero', label: 'Hero', panelY: 44 },
  { id: 'grid', label: 'Grid', panelY: 58 },
  { id: 'footer', label: 'Footer', panelY: 72 }
];

const DROP_SEQUENCE: BlockId[] = ['nav', 'hero', 'grid'];

/** Posición del ítem en el panel lateral (% del simulador) */
const panelPoint = (y: number) => ({ x: 11, y });

/** Posición de soltado en el lienzo (% del simulador) */
const dropPoint: Record<BlockId, { x: number; y: number }> = {
  nav: { x: 58, y: 34 },
  hero: { x: 58, y: 50 },
  grid: { x: 58, y: 68 },
  footer: { x: 58, y: 82 }
};

function CursorPointer({ grabbing }: { grabbing?: boolean }) {
  return (
    <motion.svg
      width="22"
      height="26"
      viewBox="0 0 22 26"
      className="drop-shadow-md"
      animate={{ scale: grabbing ? 0.92 : 1 }}
      transition={{ duration: 0.15 }}
      aria-hidden
    >
      <path
        d="M2 2 L2 20 L7.5 15 L11 23 L14 21.5 L10.5 14 L17 14 Z"
        fill="#1a1a1b"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function BlockThumbnail({
  id,
  label,
  active,
  placed
}: {
  id: BlockId;
  label: string;
  active?: boolean;
  placed?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border px-2 py-1.5 transition-all duration-200',
        active && 'border-teal bg-teal/10 shadow-md ring-1 ring-teal/30',
        placed && 'opacity-40',
        !active && !placed && 'border-border/80 bg-white'
      )}
    >
      <p className="text-[9px] font-semibold text-muted-foreground mb-1">{label}</p>
      {id === 'nav' && <div className="h-1.5 w-full rounded-sm bg-muted" />}
      {id === 'hero' && (
        <div className="space-y-1">
          <div className="h-2 w-3/4 rounded-sm bg-muted" />
          <div className="h-1 w-1/2 rounded-sm bg-muted/70" />
        </div>
      )}
      {id === 'grid' && (
        <div className="grid grid-cols-3 gap-0.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-3 rounded-sm bg-muted" />
          ))}
        </div>
      )}
      {id === 'footer' && <div className="h-1 w-full rounded-sm bg-muted/80" />}
    </div>
  );
}

function GhostBlock({ id }: { id: BlockId }) {
  return (
    <motion.div
      className="w-[140px] rounded-lg border-2 border-teal/50 bg-white/95 px-2 py-2 shadow-lg"
      initial={{ opacity: 0.85, scale: 0.96 }}
      animate={{ opacity: 0.92, scale: 1.02 }}
    >
      <BlockThumbnail id={id} label={LIBRARY.find((b) => b.id === id)!.label} active />
    </motion.div>
  );
}

function PlacedBlock({ id }: { id: BlockId }) {
  const variants = {
    nav: (
      <div className="flex h-7 items-center justify-between rounded-md px-2" style={{ backgroundColor: TEAL }}>
        <div className="h-1.5 w-8 rounded-full bg-white/90" />
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-1 w-3 rounded-full bg-white/60" />
          ))}
        </div>
      </div>
    ),
    hero: (
      <div className="rounded-md px-3 py-3" style={{ backgroundColor: `${TEAL}18` }}>
        <div className="h-2 w-2/3 rounded-full mb-2" style={{ backgroundColor: TEAL }} />
        <div className="h-1.5 w-full rounded-full bg-muted mb-1" />
        <div className="h-1.5 w-4/5 rounded-full bg-muted/80" />
        <div className="mt-2 h-4 w-16 rounded-full" style={{ backgroundColor: TEAL }} />
      </div>
    ),
    grid: (
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-md border border-teal/20 bg-white p-1 shadow-sm">
            <div className="h-1 w-full rounded-full bg-muted mb-1" />
            <div className="h-4 rounded-sm" style={{ backgroundColor: `${TEAL}30` }} />
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${TEAL}25` }}>
        <div className="h-1 w-1/3 rounded-full bg-muted" />
      </div>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className="w-full"
    >
      {variants[id]}
    </motion.div>
  );
}

export function WebBuilderSimulator() {
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 50, y: 20 });
  const [highlighted, setHighlighted] = useState<BlockId | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const [ghost, setGhost] = useState<{ id: BlockId; x: number; y: number } | null>(null);
  const [placed, setPlaced] = useState<BlockId[]>([]);
  const running = useRef(true);

  useEffect(() => {
    running.current = true;

    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const moveCursor = (x: number, y: number, ms: number) =>
      new Promise<void>((resolve) => {
        setCursor({ x, y });
        setTimeout(resolve, ms);
      });

    const runLoop = async () => {
      while (running.current) {
        setPlaced([]);
        setGhost(null);
        setGrabbing(false);
        setHighlighted(null);
        await moveCursor(50, 18, 400);

        for (const blockId of DROP_SEQUENCE) {
          const lib = LIBRARY.find((b) => b.id === blockId)!;
          const panel = panelPoint(lib.panelY);
          const drop = dropPoint[blockId];

          // Paso 1–2: ir al panel y hover
          await moveCursor(panel.x, panel.y, 550);
          setHighlighted(blockId);
          await wait(350);

          // Agarrar
          setGrabbing(true);
          await wait(180);

          // Paso 2–3: arrastrar fantasma
          setGhost({ id: blockId, x: panel.x, y: panel.y });
          const steps = 14;
          for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const ease = 1 - Math.pow(1 - t, 2);
            const gx = panel.x + (drop.x - panel.x) * ease;
            const gy = panel.y + (drop.y - panel.y) * ease;
            setCursor({ x: gx, y: gy });
            setGhost({ id: blockId, x: gx, y: gy });
            await wait(45);
          }

          setGrabbing(false);
          setGhost(null);
          setHighlighted(null);

          // Soltar
          await moveCursor(drop.x, drop.y, 120);
          setPlaced((prev) => [...prev, blockId]);
          await wait(500);
        }

        await moveCursor(72, 42, 500);
        await wait(1200);
      }
    };

    runLoop();
    return () => {
      running.current = false;
    };
  }, []);

  return (
    <div
      className="min-h-[280px] overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-900 p-2 shadow-xl shadow-black/20 md:min-h-[340px] md:p-2.5"
      aria-label="Simulador de constructor web drag and drop"
    >
      {/* Barra del navegador */}
      <div className="flex items-center gap-2 rounded-t-xl bg-zinc-700/90 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto h-5 flex-1 max-w-[55%] rounded-md bg-zinc-800/80" />
      </div>

      {/* Interior */}
      <div className="relative flex min-h-[220px] rounded-b-xl bg-[#f4f4f5] md:min-h-[268px]">
        {/* Panel lateral — biblioteca */}
        <div className="w-[22%] shrink-0 border-r border-dashed border-zinc-300/80 bg-zinc-100/80 p-2">
          <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Components</p>
          <div className="space-y-2">
            {LIBRARY.map((item) => (
              <BlockThumbnail
                key={item.id}
                id={item.id}
                label={item.label}
                active={highlighted === item.id}
                placed={placed.includes(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Lienzo */}
        <div className="relative flex-1 p-3">
          <div
            className="relative h-full min-h-[190px] rounded-lg border-2 border-dashed border-zinc-300 bg-white/90 p-2 md:min-h-[230px]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '16px 16px'
            }}
          >
            {placed.length === 0 && (
              <p className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400">
                Drop components here
              </p>
            )}

            <div className="relative z-[1] flex flex-col gap-2">
              <AnimatePresence>
                {placed.includes('nav') && (
                  <motion.div key="nav" layout>
                    <PlacedBlock id="nav" />
                  </motion.div>
                )}
                {placed.includes('hero') && (
                  <motion.div key="hero" layout>
                    <PlacedBlock id="hero" />
                  </motion.div>
                )}
                {placed.includes('grid') && (
                  <motion.div key="grid" layout>
                    <PlacedBlock id="grid" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Fantasma arrastrado */}
        {ghost && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${ghost.x}%`, top: `${ghost.y}%` }}
          >
            <GhostBlock id={ghost.id} />
          </div>
        )}

        {/* Cursor */}
        <div
          className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-75 linear"
          style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
        >
          <CursorPointer grabbing={grabbing} />
        </div>
      </div>
    </div>
  );
}
