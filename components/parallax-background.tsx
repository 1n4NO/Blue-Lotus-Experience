'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/cn';

type ParallaxBackgroundProps = {
  src: string;
  className?: string;
  overlayOpacity?: number;
  range?: number;
};

export function ParallaxBackground({
  src,
  className,
  overlayOpacity = 0.6,
  range = 60
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
        <div
          aria-hidden
          style={{ backgroundImage: `url(${src})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />
        <div
          aria-hidden
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
          className="absolute inset-0"
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      <motion.div
        aria-hidden
        style={{
          backgroundImage: `url(${src})`,
          y: reduceMotion ? 0 : y
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />
      <div
        aria-hidden
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        className="absolute inset-0"
      />
    </div>
  );
}
