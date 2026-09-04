'use client';

import { useEffect, useRef } from 'react';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

function resumePlayback(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.controls = false;

  if (video.ended || video.currentTime >= video.duration - 0.05) {
    video.currentTime = 0;
  }

  if (video.paused) {
    const playPromise = video.play();
    if (playPromise) {
      void playPromise.catch(() => {
        window.setTimeout(() => {
          void video.play().catch(() => undefined);
        }, 300);
      });
    }
  }
}

export function ClinicHeroVideoBackground({ demo }: { demo: ResolvedDemo }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      video.currentTime = 0;
      resumePlayback(video);
    };

    const onPause = () => {
      if (document.visibilityState === 'visible') {
        resumePlayback(video);
      }
    };

    const onStalled = () => resumePlayback(video);
    const onLoadedData = () => resumePlayback(video);
    const onCanPlay = () => resumePlayback(video);

    video.addEventListener('ended', onEnded);
    video.addEventListener('pause', onPause);
    video.addEventListener('stalled', onStalled);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('canplay', onCanPlay);

    resumePlayback(video);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') resumePlayback(video);
    };

    document.addEventListener('visibilitychange', onVisibility);

    const keepAlive = window.setInterval(() => {
      if (document.visibilityState === 'visible') resumePlayback(video);
    }, 2500);

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('stalled', onStalled);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('canplay', onCanPlay);
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(keepAlive);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${demo.brand.heroPoster})` }}
      />

      <video
        ref={videoRef}
        className="demo-hero-video pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={demo.brand.heroPoster}
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        tabIndex={-1}
        onContextMenu={(event) => event.preventDefault()}
      >
        <source src={demo.brand.heroVideo} type="video/mp4" />
        {demo.brand.heroVideoWebm ? <source src={demo.brand.heroVideoWebm} type="video/webm" /> : null}
      </video>
    </div>
  );
}
