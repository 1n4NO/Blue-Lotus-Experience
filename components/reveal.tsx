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

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: reduceMotion ? 0 : 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
