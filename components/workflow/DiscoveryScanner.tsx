'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const MAGENTA = '#BC2656';
const TEAL = '#39B8AD';
const VIOLET = '#5E549D';

const COLS = 9;
const ROWS = 6;
const REVEAL_RADIUS = 0.14;

type RevealKind = 'growth' | 'radar' | 'opportunity';

type GridNode = {
  id: string;
  x: number;
  y: number;
  kind: RevealKind;
};

function buildGrid(): GridNode[] {
  const kinds: RevealKind[] = ['growth', 'radar', 'opportunity'];
  const nodes: GridNode[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      nodes.push({
        id: `${r}-${c}`,
        x: (c + 0.5) / COLS,
        y: (r + 0.5) / ROWS,
        kind: kinds[(r + c) % 3]
      });
    }
  }
  return nodes;
}

function MagnifierGlass() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="drop-shadow-lg" aria-hidden>
      <defs>
        <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(57,184,173,0.12)" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="17"
        fill="url(#lensGlass)"
        stroke={TEAL}
        strokeWidth="2.5"
        style={{ filter: 'drop-shadow(0 0 8px rgba(57,184,173,0.35))' }}
      />
      <circle cx="24" cy="24" r="14" fill="rgba(255,255,255,0.08)" />
      <line
        x1="36"
        y1="36"
        x2="50"
        y2="50"
        stroke={TEAL}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 14 24 Q 24 16 34 24"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
    </svg>
  );
}

function GrowthGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <rect x="1" y="9" width="2.5" height="4" rx="0.5" fill={MAGENTA} opacity="0.7" />
      <rect x="5" y="6" width="2.5" height="7" rx="0.5" fill={MAGENTA} />
      <rect x="9" y="3" width="2.5" height="10" rx="0.5" fill={MAGENTA} />
      <path d="M1 12 L13 2" stroke={MAGENTA} strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

function RadarGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <circle cx="7" cy="7" r="5.5" fill="none" stroke={TEAL} strokeWidth="1" opacity="0.45" />
      <circle cx="7" cy="7" r="3.2" fill="none" stroke={TEAL} strokeWidth="1" opacity="0.7" />
      <circle cx="7" cy="7" r="1.2" fill={TEAL} />
      <line x1="7" y1="7" x2="11" y2="4" stroke={TEAL} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function OpportunityGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <polygon
        points="7,1.5 8.6,5.4 12.8,5.6 9.4,8.1 10.6,12.2 7,9.8 3.4,12.2 4.6,8.1 1.2,5.6 5.4,5.4"
        fill={VIOLET}
      />
      <circle cx="7" cy="10.5" r="1" fill={VIOLET} opacity="0.85" />
    </svg>
  );
}

function NodeGlyph({ kind }: { kind: RevealKind }) {
  if (kind === 'growth') return <GrowthGlyph />;
  if (kind === 'radar') return <RadarGlyph />;
  return <OpportunityGlyph />;
}

function ScannerNode({
  node,
  revealed
}: {
  node: GridNode;
  revealed: boolean;
}) {
  const color =
    node.kind === 'growth' ? MAGENTA : node.kind === 'radar' ? TEAL : VIOLET;

  return (
    <motion.div
      className="absolute z-[1] flex items-center justify-center"
      style={{
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
        width: 12,
        height: 12,
        marginLeft: -6,
        marginTop: -6
      }}
      animate={{
        scale: revealed ? 1.15 : 1,
        opacity: revealed ? 1 : 0.55
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        animate={{
          width: revealed ? 22 : 6,
          height: revealed ? 22 : 6,
          backgroundColor: revealed ? `${color}18` : '#e5e7eb',
          boxShadow: revealed ? `0 0 14px ${MAGENTA}55` : 'none'
        }}
        transition={{ duration: 0.35 }}
      >
        {revealed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <NodeGlyph kind={node.kind} />
          </motion.div>
        ) : (
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        )}
      </motion.div>
    </motion.div>
  );
}

export function DiscoveryScanner() {
  const nodes = useMemo(() => buildGrid(), []);
  const [lens, setLens] = useState({ x: 0.2, y: 0.5 });

  useEffect(() => {
    const duration = 9000;
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = ((now - start) % duration) / duration;
      const x = 0.12 + 0.76 * (0.5 - 0.5 * Math.cos(t * Math.PI * 2));
      const y = 0.32 + 0.22 * Math.sin(t * Math.PI * 4 + 0.4);
      setLens({ x, y });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const edges = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x1 = ((c + 0.5) / COLS) * 100;
        const y1 = ((r + 0.5) / ROWS) * 100;
        if (c < COLS - 1) {
          lines.push({
            key: `h-${r}-${c}`,
            x1,
            y1,
            x2: ((c + 1.5) / COLS) * 100,
            y2: y1
          });
        }
        if (r < ROWS - 1) {
          lines.push({
            key: `v-${r}-${c}`,
            x1,
            y1,
            x2: x1,
            y2: ((r + 1.5) / ROWS) * 100
          });
        }
      }
    }
    return lines;
  }, []);

  const isRevealed = (node: GridNode) => {
    const dx = node.x - lens.x;
    const dy = node.y - lens.y;
    return Math.hypot(dx, dy) < REVEAL_RADIUS;
  };

  return (
    <div
      className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/80 shadow-md"
      aria-hidden
    >
      {/* Grilla de conexiones */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {edges.map((e) => {
          const nearLens =
            Math.hypot((e.x1 / 100 + e.x2 / 100) / 2 - lens.x, (e.y1 / 100 + e.y2 / 100) / 2 - lens.y) <
            REVEAL_RADIUS + 0.06;
          return (
            <line
              key={e.key}
              x1={`${e.x1}%`}
              y1={`${e.y1}%`}
              x2={`${e.x2}%`}
              y2={`${e.y2}%`}
              stroke={nearLens ? `${TEAL}44` : '#e5e7eb'}
              strokeWidth={nearLens ? 1.2 : 0.8}
              style={{ transition: 'stroke 0.3s ease' }}
            />
          );
        })}
      </svg>

      {/* Nodos */}
      {nodes.map((node) => (
        <ScannerNode key={node.id} node={node} revealed={isRevealed(node)} />
      ))}

      {/* Resplandor bajo la lupa */}
      <motion.div
        className="pointer-events-none absolute z-[5] rounded-full"
        style={{
          left: `${lens.x * 100}%`,
          top: `${lens.y * 100}%`,
          width: 72,
          height: 72,
          marginLeft: -36,
          marginTop: -36,
          background: `radial-gradient(circle, ${MAGENTA}22 0%, transparent 70%)`
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Lupa */}
      <div
        className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${lens.x * 100}%`, top: `${lens.y * 100}%` }}
      >
        <MagnifierGlass />
      </div>
    </div>
  );
}
