'use client';

import { useEffect, useRef } from 'react';

const CRIMSON = { r: 188, g: 38, b: 86 };
const GRID_GAP = 14;
const MOBILE_GAP = 16;
/** Exponential tau ≈ 1.8–2.0s to settle (95% ≈ 3τ). */
const MORPH_TAU = 650;
const IDLE_MS = 1600;
const MESH_SECTIONS = ['cta-section', 'contact-form'] as const;

type Node = {
  gx: number;
  gy: number;
  ox: number;
  oy: number;
  x: number;
  y: number;
  phase: number;
  delay: number;
  linker: boolean;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function hash(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / Math.max(0.0001, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function cellKey(cx: number, cy: number) {
  return ((cx * 73856093) ^ (cy * 19349663)) >>> 0;
}

/**
 * Default: Dot Grid everywhere (Hero, Servicios, etc.).
 * Neural Mesh only while #cta-section or #contact-form is on screen.
 */
export function GlobalCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ratios = new Map<string, number>();
    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.42, tx: 0, ty: 0, active: false };
    pointer.tx = pointer.x;
    pointer.ty = pointer.y;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let gap = GRID_GAP;
    let touch = false;
    let visible = true;
    let nodes: Node[] = [];
    let linkers: Node[] = [];
    let running = true;
    let raf = 0;
    let lastTime = performance.now();
    let lastInputAt = 0;
    let morph = 0;
    let morphTarget = 0;
    let lightX = pointer.x;
    let lightY = pointer.y;

    const rebuild = () => {
      touch = isTouchDevice() || window.innerWidth < 768;
      dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.25 : 2);
      width = window.innerWidth;
      height = window.innerHeight;
      gap = touch ? MOBILE_GAP : GRID_GAP;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;
      const linkStride = touch ? 6 : 3;
      const next: Node[] = [];
      const nextLinkers: Node[] = [];
      let index = 0;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const gx = offsetX + col * gap;
          const gy = offsetY + row * gap;
          const h = hash(index);
          const h2 = hash(index + 97);
          const linker = index % linkStride === 0;
          const node: Node = {
            gx,
            gy,
            ox: gx + (h - 0.5) * (touch ? 64 : 108),
            oy: gy + (h2 - 0.5) * (touch ? 52 : 92),
            x: gx,
            y: gy,
            phase: h * Math.PI * 2,
            delay: h * 0.42,
            linker
          };
          next.push(node);
          if (linker) nextLinkers.push(node);
          index += 1;
        }
      }

      nodes = next;
      linkers = nextLinkers;
    };

    const ghost = (time: number) => ({
      x: width * 0.5 + Math.sin(time * 0.00032) * width * 0.32,
      y: height * 0.44 + Math.cos(time * 0.00024) * height * 0.26
    });

    const resolveMode = () => {
      let mesh = 0;
      for (const id of MESH_SECTIONS) mesh = Math.max(mesh, ratios.get(id) ?? 0);
      morphTarget = mesh > 0.14 ? 1 : 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        resolveMode();
      },
      { threshold: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 1], rootMargin: '-8% 0px -18% 0px' }
    );

    const observed = new Set<Element>();
    const bindSections = () => {
      for (const el of [...observed]) {
        if (!el.isConnected) {
          observer.unobserve(el);
          observed.delete(el);
          ratios.set(el.id, 0);
        }
      }
      for (const id of MESH_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) {
          ratios.set(id, 0);
          continue;
        }
        if (observed.has(el)) continue;
        observer.observe(el);
        observed.add(el);
      }
      resolveMode();
    };

    let bindTimer = 0;
    const scheduleBind = () => {
      window.clearTimeout(bindTimer);
      bindTimer = window.setTimeout(bindSections, 80);
    };

    const mutations = new MutationObserver(scheduleBind);

    const setInput = (x: number, y: number, active: boolean) => {
      pointer.tx = x;
      pointer.ty = y;
      pointer.active = active;
      if (active) lastInputAt = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => setInput(event.clientX, event.clientY, true);
    const onPointerDown = (event: PointerEvent) => setInput(event.clientX, event.clientY, true);
    const onPointerUp = () => {
      pointer.active = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) setInput(touch.clientX, touch.clientY, true);
    };
    const onScroll = () => resolveMode();

    const tick = (now: number) => {
      if (!running || !visible) return;
      const dt = Math.min(32, now - lastTime);
      lastTime = now;

      if (reduced) {
        morph = morphTarget;
      } else {
        morph += (morphTarget - morph) * (1 - Math.exp(-dt / MORPH_TAU));
        if (Math.abs(morphTarget - morph) < 0.001) morph = morphTarget;
      }

      const idle = !pointer.active && now - lastInputAt > IDLE_MS;
      const useGhost = reduced || touch || idle;
      const target = useGhost ? ghost(now) : { x: pointer.tx, y: pointer.ty };
      const follow = useGhost ? 0.04 : 0.16;
      lightX = lerp(lightX, target.x, follow);
      lightY = lerp(lightY, target.y, follow);

      const glowRadius = (touch ? 210 : 200) * (1 - morph * 0.55);
      const connectDist = touch ? 86 : 118;
      const connectDistSq = connectDist * connectDist;
      const time = reduced ? 0 : now;
      const maxLinks = touch ? 3 : 5;

      ctx.clearRect(0, 0, width, height);

      if (morph < 0.92) {
        const glow = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, glowRadius);
        const power = (1 - morph) * (reduced ? 0.35 : touch ? 1.55 : 1.15);
        glow.addColorStop(0, rgba(CRIMSON.r, CRIMSON.g, CRIMSON.b, 0.5 * power));
        glow.addColorStop(0.35, rgba(CRIMSON.r, CRIMSON.g, CRIMSON.b, 0.2 * power));
        glow.addColorStop(1, rgba(CRIMSON.r, CRIMSON.g, CRIMSON.b, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(lightX - glowRadius, lightY - glowRadius, glowRadius * 2, glowRadius * 2);
      }

      const glowRadiusSq = glowRadius * glowRadius;

      for (const node of nodes) {
        const t = smoothstep(node.delay, 0.9, morph);
        const driftX = Math.sin(time * 0.00022 + node.phase) * 12 * t;
        const driftY = Math.cos(time * 0.00018 + node.phase) * 10 * t;
        node.x = lerp(node.gx, node.ox + driftX, t);
        node.y = lerp(node.gy, node.oy + driftY, t);

        if (t > 0.45 && pointer.active && !touch) {
          const pdx = node.x - lightX;
          const pdy = node.y - lightY;
          const d2 = pdx * pdx + pdy * pdy;
          if (d2 < 22500 && d2 > 0.1) {
            const d = Math.sqrt(d2);
            const force = (1 - d / 150) * 0.45 * t;
            node.x += (pdx / d) * force * 10;
            node.y += (pdy / d) * force * 10;
          }
        }

        const dx = node.x - lightX;
        const dy = node.y - lightY;
        const distSq = dx * dx + dy * dy;
        const hot = morph < 0.85 && distSq < glowRadiusSq && distSq > 0 ? (1 - Math.sqrt(distSq) / glowRadius) ** 2 * (1 - morph) : 0;
        const size = 0.75 + hot * 1.05 + t * 0.35;
        ctx.fillStyle = hot > 0.04 ? rgba(255, 255, 255, 0.18 + hot * 0.82) : rgba(255, 255, 255, 0.16 + t * 0.08);
        ctx.fillRect(node.x - size, node.y - size, size * 2, size * 2);
      }

      if (morph > 0.12) {
        const linkAlpha = smoothstep(0.12, 0.72, morph);
        const cell = connectDist;
        const buckets = new Map<number, Node[]>();

        for (const node of linkers) {
          const cx = Math.floor(node.x / cell);
          const cy = Math.floor(node.y / cell);
          const key = cellKey(cx, cy);
          const bucket = buckets.get(key);
          if (bucket) bucket.push(node);
          else buckets.set(key, [node]);
        }

        ctx.lineCap = 'round';
        ctx.lineWidth = touch ? 0.4 : 0.5;

        for (const a of linkers) {
          const cx = Math.floor(a.x / cell);
          const cy = Math.floor(a.y / cell);
          let drawn = 0;
          for (let ox = -1; ox <= 1 && drawn < maxLinks; ox += 1) {
            for (let oy = -1; oy <= 1 && drawn < maxLinks; oy += 1) {
              const bucket = buckets.get(cellKey(cx + ox, cy + oy));
              if (!bucket) continue;
              for (const b of bucket) {
                if (b === a || b.gx + b.gy <= a.gx + a.gy) continue;
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distSq = dx * dx + dy * dy;
                if (distSq > connectDistSq || distSq < 16) continue;

                const dist = Math.sqrt(distSq);
                const midX = (a.x + b.x) * 0.5;
                const midY = (a.y + b.y) * 0.5;
                const pd = Math.hypot(midX - lightX, midY - lightY);
                const near = clamp(1 - pd / 150) * morph;
                const fade = 1 - dist / connectDist;
                const alpha = (0.045 + fade * 0.12 + near * 0.38) * linkAlpha;

                ctx.strokeStyle = near > 0.16
                  ? rgba(CRIMSON.r, CRIMSON.g, CRIMSON.b, alpha)
                  : rgba(255, 255, 255, alpha);
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
                drawn += 1;
                if (drawn >= maxLinks) break;
              }
            }
          }
        }
      }

      raf = window.requestAnimationFrame(tick);
    };

    rebuild();
    bindSections();
    mutations.observe(document.body, { childList: true, subtree: true });

    const startLoop = () => {
      if (!running) return;
      lastTime = performance.now();
      raf = window.requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      window.cancelAnimationFrame(raf);
      if (visible && running) startLoop();
    };

    let idleId = 0;
    let startTimer = 0;
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(startLoop, { timeout: 450 });
    } else {
      startTimer = window.setTimeout(startLoop, 0);
    }

    document.addEventListener('visibilitychange', onVisibility);

    window.addEventListener('resize', rebuild);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    window.addEventListener('blur', onPointerUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });
    window.addEventListener('touchcancel', onPointerUp, { passive: true });

    return () => {
      running = false;
      visible = false;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(bindTimer);
      window.clearTimeout(startTimer);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      observer.disconnect();
      mutations.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', rebuild);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('blur', onPointerUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('touchcancel', onPointerUp);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="pointers-global-canvas"
      className="pointer-events-none fixed inset-0 z-[-1]"
      aria-hidden
    />
  );
}
