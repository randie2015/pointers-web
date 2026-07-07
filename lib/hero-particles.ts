import type { Container, ISourceOptions } from 'tsparticles-engine';

const MAGENTA = '#BC2656';
const MAGENTA_LIGHT = '#D4366F';
const MAGENTA_DEEP = '#8E1D45';
const MAGENTA_GLOW = '#E85A8A';
const VIOLET = '#5E549D';

export type ParticlePreset = 'hero' | 'ambient';

const PRESETS = {
  hero: {
    mobile: 110,
    desktop: 175,
    densityArea: { mobile: 380, desktop: 420 },
    linkDistance: { mobile: 105, desktop: 125 },
    linkOpacity: { min: 0.18, max: 0.48 },
    particleOpacity: { min: 0.22, max: 0.78 },
    size: { mobile: [1.2, 4.2] as const, desktop: [1.4, 4.8] as const },
    speed: { mobile: [0.7, 2.4] as const, desktop: [0.9, 2.8] as const }
  },
  ambient: {
    mobile: 48,
    desktop: 72,
    densityArea: { mobile: 900, desktop: 520 },
    linkDistance: { mobile: 95, desktop: 130 },
    linkOpacity: { min: 0.08, max: 0.22 },
    particleOpacity: { min: 0.08, max: 0.42 },
    size: { mobile: [1, 2.8] as const, desktop: [1, 3.2] as const },
    speed: { mobile: [0.3, 1.1] as const, desktop: [0.3, 1.6] as const }
  }
} as const;

export function createHeroParticlesOptions(
  isMobile: boolean,
  preset: ParticlePreset = 'ambient'
): ISourceOptions {
  const cfg = PRESETS[preset];
  const colors =
    preset === 'hero'
      ? [MAGENTA, MAGENTA_LIGHT, MAGENTA_DEEP, MAGENTA_GLOW, VIOLET, '#ffffff']
      : ['#ffffff', MAGENTA, '#2a2a2a'];

  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: {
        value: isMobile ? cfg.mobile : cfg.desktop,
        density: {
          enable: true,
          value_area: isMobile ? cfg.densityArea.mobile : cfg.densityArea.desktop
        }
      },
      color: { value: colors },
      opacity: {
        value: cfg.particleOpacity,
        animation: {
          enable: true,
          speed: preset === 'hero' ? 1.4 : 0.6,
          minimumValue: cfg.particleOpacity.min,
          sync: false
        }
      },
      size: {
        value: {
          min: isMobile ? cfg.size.mobile[0] : cfg.size.desktop[0],
          max: isMobile ? cfg.size.mobile[1] : cfg.size.desktop[1]
        },
        animation: {
          enable: true,
          speed: preset === 'hero' ? 1.6 : 1,
          minimumValue: 0.6,
          sync: false
        }
      },
      links: {
        enable: true,
        color: MAGENTA,
        opacity: cfg.linkOpacity,
        distance: isMobile ? cfg.linkDistance.mobile : cfg.linkDistance.desktop,
        width: preset === 'hero' ? 1.2 : 1
      },
      move: {
        enable: true,
        speed: {
          min: isMobile ? cfg.speed.mobile[0] : cfg.speed.desktop[0],
          max: isMobile ? cfg.speed.mobile[1] : cfg.speed.desktop[1]
        },
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'bounce' },
        attract: { enable: false }
      }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: !isMobile,
          mode: 'repulse',
          parallax: { enable: false, force: 0, smooth: 0 }
        },
        onClick: { enable: true, mode: 'repulse' },
        resize: true
      },
      modes: {
        repulse: {
          distance: isMobile ? 110 : 140,
          duration: 0.75,
          factor: preset === 'hero' ? 0.9 : 0.75,
          speed: 1.1,
          maxSpeed: 48,
          easing: 'ease-out-quad'
        }
      }
    }
  };
}

/** @deprecated Use createHeroParticlesOptions — kept for admin background. */
export const heroParticlesOptions = createHeroParticlesOptions(false);

export function supportsDeviceOrientation(): boolean {
  return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
}

export function isEnergySaverActive(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return true;

  return false;
}

type PhysicsConfig = {
  enableGyro: boolean;
  mode?: 'hero' | 'ambient' | 'site';
};

type OrientationSample = {
  beta: number;
  gamma: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothStep(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

/**
 * Gyro-shifted void gravity + orbital swirl (hero) or gentle pull (ambient).
 * Pointer repulse is handled by tsparticles interactivity on the canvas.
 */
export function bindHeroParticlePhysics(container: Container, config: PhysicsConfig): () => void {
  // Espacio abierto del sitio: sin atracción, remolino ni centro de masa.
  if (config.mode === 'site') {
    return () => undefined;
  }

  let running = true;
  let rafId = 0;
  let targetOrientation: OrientationSample = { beta: 45, gamma: 0 };
  let smoothOrientation: OrientationSample = { beta: 45, gamma: 0 };
  const isHero = config.mode === 'hero';
  const isAmbient = config.mode === 'ambient';

  const onOrientation = (event: DeviceOrientationEvent) => {
    if (!config.enableGyro) return;
    if (event.beta != null) targetOrientation.beta = clamp(event.beta, 0, 90);
    if (event.gamma != null) targetOrientation.gamma = clamp(event.gamma, -45, 45);
  };

  const tick = () => {
    if (!running) return;

    smoothOrientation = {
      beta: smoothStep(smoothOrientation.beta, targetOrientation.beta, 0.1),
      gamma: smoothStep(smoothOrientation.gamma, targetOrientation.gamma, 0.1)
    };

    const { width, height } = container.canvas.size;
    const maxOffset = Math.min(width, height) * (config.enableGyro ? 0.055 : 0);
    const centerX = width / 2 + (smoothOrientation.gamma / 45) * maxOffset;
    const centerY = height / 2 + ((smoothOrientation.beta - 45) / 45) * maxOffset;

    const voidRadius = Math.min(width, height) * (isHero ? 0.1 : 0.05);
    const attractStrength = isHero ? 0.038 : 0.018;
    const swirlStrength = isHero ? 0.022 : 0.006;
    const repulseStrength = isHero ? 0.14 : 0.04;
    const damping = isHero ? 0.978 : 0.986;

    const particles = container.particles.filter(() => true);

    for (const particle of particles) {
      const dx = centerX - particle.position.x;
      const dy = centerY - particle.position.y;
      const distance = Math.hypot(dx, dy) || 1;

      if (isHero && distance < voidRadius) {
        const push = ((voidRadius - distance) / voidRadius) * repulseStrength;
        particle.velocity.x -= (dx / distance) * push;
        particle.velocity.y -= (dy / distance) * push;
      } else {
        const pull = attractStrength * (1 + Math.min(distance / (isHero ? 280 : 400), 0.45));
        particle.velocity.x += (dx / distance) * pull;
        particle.velocity.y += (dy / distance) * pull;
      }

      if (isHero || isAmbient) {
        particle.velocity.x += (-dy / distance) * swirlStrength;
        particle.velocity.y += (dx / distance) * swirlStrength;
      }

      particle.velocity.x *= damping;
      particle.velocity.y *= damping;
    }

    rafId = requestAnimationFrame(tick);
  };

  if (config.enableGyro && supportsDeviceOrientation()) {
    window.addEventListener('deviceorientation', onOrientation, { passive: true });
  }

  rafId = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener('deviceorientation', onOrientation);
  };
}

/** Legacy center attractor for admin panel (no gyro / repulse). */
export function bindCenterAttractor(container: Container): () => void {
  const update = () => {
    const { width, height } = container.canvas.size;
    container.interactivity.mouse.position = { x: width / 2, y: height / 2 };
    container.interactivity.status = 'pointermove';
  };

  update();
  const interval = window.setInterval(update, 50);
  window.addEventListener('resize', update);

  return () => {
    window.clearInterval(interval);
    window.removeEventListener('resize', update);
  };
}

export async function requestDeviceOrientationPermission(): Promise<boolean> {
  if (!supportsDeviceOrientation()) return false;

  const requestPermission = (
    DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
    }
  ).requestPermission;

  if (typeof requestPermission !== 'function') return true;

  try {
    const result = await requestPermission();
    return result === 'granted';
  } catch {
    return false;
  }
}
