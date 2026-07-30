'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/cn';

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(12px)', clipPath: 'inset(0 0 10% 0)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
