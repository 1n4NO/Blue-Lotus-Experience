'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';

import { useMediaQuery } from '@/hooks/use-media-query';

export function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!finePointer || reduceMotion) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 14);
      y.set(event.clientY - 14);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest('a, button, [role="button"]')));
    };

    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [finePointer, reduceMotion, x, y]);

  if (!finePointer || reduceMotion) {
    return null;
  }

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      aria-hidden="true"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: hovering ? 1.12 : 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="h-8 w-8 rounded-full border border-white/45 bg-white/5 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] backdrop-blur-md"
        />
        <motion.div
          animate={{ opacity: hovering ? 1 : 0.82, y: hovering ? 0 : 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-9 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 font-ui text-[0.56rem] uppercase tracking-[0.34em] text-text/90 backdrop-blur-xl"
        >
          Slow Down
        </motion.div>
      </div>
    </motion.div>
  );
}
