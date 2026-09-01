'use client';

import { useEffect, useRef, useState } from 'react';
import { clinicBrand } from '@/src/data/clinicData';

export function ReyDentalHeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      void video.play().catch(() => setEnabled(false));
    };

    video.addEventListener('ended', handleEnded);

    void video.play().catch(() => setEnabled(false));

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  if (!enabled) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${clinicBrand.doctorPhoto})` }}
        aria-hidden
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="rey-hero-video pointer-events-none absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      tabIndex={-1}
      aria-hidden
    >
      <source src={clinicBrand.heroVideo} type="video/mp4" />
    </video>
  );
}
