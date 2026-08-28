'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AudioToggle = dynamic(() => import('@/components/audio-toggle').then((module) => module.AudioToggle), {
  ssr: false
});
const CustomCursor = dynamic(() => import('@/components/custom-cursor').then((module) => module.CustomCursor), {
  ssr: false
});
const NoiseOverlay = dynamic(() => import('@/components/noise-overlay').then((module) => module.NoiseOverlay), {
  ssr: false
});
const ScrollProgress = dynamic(() => import('@/components/scroll-progress').then((module) => module.ScrollProgress), {
  ssr: false
});

export function DeferredEnhancements() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadEnhancements = () => setReady(true);
    const idleWindow = window.requestIdleCallback?.(loadEnhancements, { timeout: 1800 });
    const fallbackTimer = window.setTimeout(loadEnhancements, 1400);

    return () => {
      window.clearTimeout(fallbackTimer);
      if (idleWindow !== undefined) window.cancelIdleCallback?.(idleWindow);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <ScrollProgress />
      <NoiseOverlay />
      <CustomCursor />
      <AudioToggle />
    </>
  );
}
