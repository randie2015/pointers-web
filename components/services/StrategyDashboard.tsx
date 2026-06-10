'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  Circle,
  LineChart,
  Minus,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MAGENTA = '#BC2656';
const VIOLET = '#5E549D';
const TEAL = '#39B8AD';

type BarConfig = {
  id: number;
  idle: number;
  active: number;
  color: string;
  tooltipIcon: LucideIcon;
  tooltipValue: string;
};

const BARS: BarConfig[] = [
  { id: 0, idle: 32, active: 92, color: MAGENTA, tooltipIcon: Users, tooltipValue: '+350' },
  { id: 1, idle: 24, active: 78, color: VIOLET, tooltipIcon: TrendingUp, tooltipValue: '15K' },
  { id: 2, idle: 38, active: 100, color: TEAL, tooltipIcon: Users, tooltipValue: '+1.2K' },
  { id: 3, idle: 28, active: 85, color: MAGENTA, tooltipIcon: TrendingUp, tooltipValue: '+890' },
  { id: 4, idle: 22, active: 72, color: VIOLET, tooltipIcon: Users, tooltipValue: '8.4K' }
];

const spring = { type: 'spring' as const, stiffness: 320, damping: 26 };

function AbstractToggle({
  active,
  onToggle
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative mx-auto flex h-10 w-[104px] items-center rounded-full border border-zinc-200/80 bg-zinc-100/90 p-1 shadow-inner transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39B8AD] focus-visible:ring-offset-2"
      aria-pressed={active}
    >
      <motion.div
        className="absolute top-1 h-8 w-12 rounded-full shadow-md"
        animate={{
          x: active ? 48 : 0,
          backgroundColor: active ? TEAL : '#e4e4e7'
        }}
        transition={spring}
      />
      <span className="relative z-10 flex flex-1 items-center justify-center">
        <Circle
          className={cn('h-4 w-4 transition-colors', !active ? 'text-zinc-500' : 'text-zinc-300')}
          strokeWidth={2}
        />
        <Minus
          className={cn(
            'absolute h-3 w-3 transition-opacity',
            !active ? 'text-zinc-600 opacity-100' : 'opacity-0'
          )}
          strokeWidth={2.5}
        />
      </span>
      <span className="relative z-10 flex flex-1 items-center justify-center">
        <motion.span
          animate={{
            opacity: active ? 1 : 0.35,
            scale: active ? 1.1 : 1,
            filter: active ? `drop-shadow(0 0 6px ${TEAL})` : 'none'
          }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          {active ? (
            <Rocket className="h-4 w-4" style={{ color: '#fff' }} strokeWidth={2.25} />
          ) : (
            <Zap className="h-4 w-4 text-zinc-400" strokeWidth={2} />
          )}
        </motion.span>
      </span>
    </button>
  );
}

function BarColumn({
  bar,
  active,
  hovered,
  onHover
}: {
  bar: BarConfig;
  active: boolean;
  hovered: boolean;
  onHover: (id: number | null) => void;
}) {
  const height = active ? bar.active : bar.idle;
  const Icon = bar.tooltipIcon;

  return (
    <div
      className="relative flex h-full flex-1 flex-col items-center justify-end"
      onMouseEnter={() => onHover(bar.id)}
      onMouseLeave={() => onHover(null)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-9 z-20 flex items-center gap-1 rounded-lg bg-zinc-900 px-2 py-1 shadow-lg"
          >
            <Icon className="h-3 w-3 text-white/70" strokeWidth={2.5} />
            <span className="text-[10px] font-bold tabular-nums text-white">{bar.tooltipValue}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-full max-w-[36px] rounded-t-lg origin-bottom"
        animate={{
          height: `${height}%`,
          scaleX: hovered ? 1.08 : 1,
          backgroundColor: active ? bar.color : '#e5e7eb',
          boxShadow: active && hovered ? `0 0 20px ${bar.color}44` : 'none'
        }}
        transition={spring}
        style={{
          minHeight: 8,
          background: active
            ? `linear-gradient(180deg, ${bar.color}ee 0%, ${bar.color} 100%)`
            : undefined
        }}
      />
    </div>
  );
}

function KpiCard({
  icon: Icon,
  value,
  color,
  className
}: {
  icon: LucideIcon;
  value: string;
  color: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        'flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-2.5 py-2 shadow-lg backdrop-blur-md',
        className
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, ...spring }}
    >
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color }} strokeWidth={2.5} />
      </div>
      <span className="text-sm font-bold tabular-nums text-zinc-800">{value}</span>
    </motion.div>
  );
}

export function StrategyDashboard() {
  const [active, setActive] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const userTouched = useRef(false);

  const toggle = useCallback(() => {
    userTouched.current = true;
    setActive((v) => !v);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!userTouched.current) setActive((v) => !v);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex min-h-[280px] flex-col rounded-3xl bg-white p-5 shadow-2xl shadow-black/[0.08] md:min-h-[340px] md:p-6"
      aria-hidden
    >
      <div className="mb-6 flex justify-center pt-1">
        <AbstractToggle active={active} onToggle={toggle} />
      </div>

      <div className="relative flex flex-1 flex-col justify-end">
        {/* KPI cards — glassmorphism sobre el gráfico */}
        <div className="pointer-events-none absolute left-2 top-0 z-10 md:left-4">
          <KpiCard icon={ArrowDown} value="-45%" color={MAGENTA} />
        </div>
        <div className="pointer-events-none absolute right-2 top-6 z-10 md:right-4">
          <motion.div
            animate={{ opacity: active ? 1 : 0.55, scale: active ? 1 : 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <KpiCard icon={active ? LineChart : ArrowUp} value="+420%" color={TEAL} />
          </motion.div>
        </div>

        {/* Gráfico de barras */}
        <div className="relative mx-auto flex h-[min(180px,42vw)] w-full max-w-[300px] items-end gap-2 px-2 pb-1 pt-16 md:h-[200px] md:max-w-[320px] md:gap-3">
          {/* Línea base sutil */}
          <div className="pointer-events-none absolute bottom-1 left-2 right-2 h-px bg-zinc-200" />

          {BARS.map((bar) => (
            <BarColumn
              key={bar.id}
              bar={bar}
              active={active}
              hovered={hoveredBar === bar.id}
              onHover={setHoveredBar}
            />
          ))}
        </div>

        {/* Indicador de estado — solo color, sin texto */}
        <motion.div
          className="mx-auto mt-4 h-1 w-12 rounded-full"
          animate={{
            backgroundColor: active ? TEAL : '#d4d4d8',
            width: active ? 48 : 32
          }}
          transition={spring}
        />
      </div>
    </div>
  );
}
