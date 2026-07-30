'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

import { LoadingScreen } from '@/components/loading-screen';

type LoadingSequenceProps = {
  children: ReactNode;
};

const FADE_OUT_MS = 450;

export function LoadingSequence({ children }: LoadingSequenceProps) {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setIsLoading(false);
      return;
    }

    const holdTime = reduceMotion ? 900 : 2600;
    let mounted = true;

    setIsLoading(true);

    const revealTimer = window.setTimeout(() => {
      if (!mounted) {
        return;
      }

      setIsLoading(false);
    }, holdTime);

    return () => {
      mounted = false;
      window.clearTimeout(revealTimer);
    };
  }, [pathname, reduceMotion]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>{children}</div>

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : FADE_OUT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90]"
          >
            <LoadingScreen />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
