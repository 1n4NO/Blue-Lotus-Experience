'use client';

import { type ReactNode, useEffect } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let cancelled = false;
    let started = false;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frame = 0;

    const raf = (time: number) => {
      lenis?.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    const start = async () => {
      if (started) return;
      started = true;
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.35,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1
      });

      frame = window.requestAnimationFrame(raf);
    };

    const idleWindow = window.requestIdleCallback?.(() => void start(), { timeout: 1800 });
    const fallbackTimer = window.setTimeout(() => void start(), 1400);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      if (idleWindow !== undefined) window.cancelIdleCallback?.(idleWindow);
      window.cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
