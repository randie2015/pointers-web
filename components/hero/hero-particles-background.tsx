'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { useReducedMotion } from 'framer-motion';
import { loadHeroParticlesEngine } from '@/lib/hero-particles-loader';
import {
  bindHeroParticlePhysics,
  createHeroParticlesOptions,
  isEnergySaverActive,
  requestDeviceOrientationPermission,
  supportsDeviceOrientation
} from '@/lib/hero-particles';
import { useMediaQuery } from '@/lib/use-media-query';
import { cn } from '@/lib/utils';

type HeroParticlesBackgroundProps = {
  className?: string;
  id?: string;
  preset?: 'hero' | 'ambient';
};

export function HeroParticlesBackground({
  className,
  id = 'hero-particles',
  preset = 'ambient'
}: HeroParticlesBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const cleanupRef = useRef<(() => void) | null>(null);
  const containerRef = useRef<Container | null>(null);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [gyroPermissionRequested, setGyroPermissionRequested] = useState(false);

  const options = useMemo(() => createHeroParticlesOptions(isMobile, preset), [isMobile, preset]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadHeroParticlesEngine(engine);
  }, []);

  const attachPhysics = useCallback(
    (container: Container) => {
      cleanupRef.current?.();

      const enableGyro =
        isMobile &&
        gyroEnabled &&
        supportsDeviceOrientation() &&
        !isEnergySaverActive() &&
        !reducedMotion;

      cleanupRef.current = bindHeroParticlePhysics(container, {
        enableGyro,
        mode: preset
      });
    },
    [gyroEnabled, isMobile, preset, reducedMotion]
  );

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (!container) return;
      containerRef.current = container;
      attachPhysics(container);
    },
    [attachPhysics]
  );

  useEffect(() => {
    return () => cleanupRef.current?.();
  }, []);

  useEffect(() => {
    if (containerRef.current) attachPhysics(containerRef.current);
  }, [attachPhysics]);

  useEffect(() => {
    if (!isMobile || reducedMotion || isEnergySaverActive()) {
      setGyroEnabled(false);
      return;
    }

    if (!supportsDeviceOrientation()) return;

    const needsPermission =
      typeof (
        DeviceOrientationEvent as typeof DeviceOrientationEvent & {
          requestPermission?: () => Promise<string>;
        }
      ).requestPermission === 'function';

    if (!needsPermission) {
      setGyroEnabled(true);
    }
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (!isMobile || reducedMotion) return;

    const batteryApi = (navigator as Navigator & { getBattery?: () => Promise<{ charging: boolean; level: number }> })
      .getBattery;

    if (!batteryApi) return;

    let cancelled = false;

    batteryApi
      .call(navigator)
      .then((battery) => {
        if (cancelled) return;

        const syncBattery = () => {
          if (!battery.charging && battery.level < 0.2) {
            setGyroEnabled(false);
          }
        };

        syncBattery();
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (!isMobile || gyroPermissionRequested || gyroEnabled) return;
    if (!supportsDeviceOrientation()) return;

    const needsPermission =
      typeof (
        DeviceOrientationEvent as typeof DeviceOrientationEvent & {
          requestPermission?: () => Promise<string>;
        }
      ).requestPermission === 'function';

    if (!needsPermission) return;

    const enableGyroOnGesture = async () => {
      setGyroPermissionRequested(true);
      const granted = await requestDeviceOrientationPermission();
      setGyroEnabled(granted);
    };

    window.addEventListener('touchstart', enableGyroOnGesture, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', enableGyroOnGesture);
  }, [gyroEnabled, gyroPermissionRequested, isMobile]);

  if (reducedMotion) return null;

  return (
    <Particles
      id={id}
      key={isMobile ? 'hero-particles-mobile' : 'hero-particles-desktop'}
      className={cn('absolute inset-0 touch-none', preset === 'hero' ? 'z-[3]' : 'z-0', className)}
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
}
