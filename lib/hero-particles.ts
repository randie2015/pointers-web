import type { Container, ISourceOptions } from 'tsparticles-engine';

const MAGENTA = '#BC2656';

const MOBILE_PARTICLE_COUNT = 32;
const DESKTOP_PARTICLE_COUNT = 68;

export function createHeroParticlesOptions(isMobile: boolean): ISourceOptions {
  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: {
        value: isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT,
        density: { enable: true, value_area: isMobile ? 900 : 520 }
      },
      color: { value: ['#ffffff', MAGENTA, '#2a2a2a'] },
      opacity: {
        value: { min: 0.08, max: 0.42 },
        animation: {
          enable: true,
          speed: 0.6,
          minimumValue: 0.06,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: isMobile ? 2.8 : 3.2 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.8,
          sync: false
        }
      },
      links: {
        enable: true,
        color: MAGENTA,
        opacity: { min: 0.08, max: 0.22 },
        distance: isMobile ? 95 : 130,
        width: 1
      },
      move: {
        enable: true,
        speed: { min: 0.3, max: isMobile ? 1.1 : 1.6 },
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
        attract: { enable: false }
      }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
          parallax: { enable: false, force: 0, smooth: 0 }
        },
        onClick: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: isMobile ? 95 : 130,
          duration: 0.85,
          factor: 0.75,
          speed: 0.9,
          maxSpeed: 42,
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
 * Gyro-shifted void gravity + elastic return via light velocity damping.
 * Pointer repulse is handled by tsparticles interactivity on the canvas.
 */
export function bindHeroParticlePhysics(container: Container, config: PhysicsConfig): () => void {
  let running = true;
  let rafId = 0;
  let targetOrientation: OrientationSample = { beta: 45, gamma: 0 };
  let smoothOrientation: OrientationSample = { beta: 45, gamma: 0 };

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

    const attractStrength = 0.018;
    const damping = 0.985;

    const particles = container.particles.filter(() => true);

    for (const particle of particles) {
      const dx = centerX - particle.position.x;
      const dy = centerY - particle.position.y;
      const distance = Math.hypot(dx, dy) || 1;
      const pull = attractStrength * (1 + Math.min(distance / 400, 0.35));

      particle.velocity.x += (dx / distance) * pull;
      particle.velocity.y += (dy / distance) * pull;
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
