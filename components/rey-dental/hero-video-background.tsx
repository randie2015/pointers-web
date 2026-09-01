'use client';

import { useEffect, useRef, useState } from 'react';
import { clinicBrand } from '@/src/data/clinicData';

export function ReyDentalHeroVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loadVideo || !enabled) return;

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
  }, [loadVideo, enabled]);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${clinicBrand.heroPoster})` }}
      />

      {enabled && loadVideo ? (
        <video
          ref={videoRef}
          className="rey-hero-video pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={clinicBrand.heroPoster}
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          tabIndex={-1}
        >
          <source src={clinicBrand.heroVideoWebm} type="video/webm" />
          <source src={clinicBrand.heroVideo} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
