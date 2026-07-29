'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/cn';

type StaggeredLinesProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
};

export function StaggeredLines({
  lines,
  className,
  lineClassName,
  delay = 0
}: StaggeredLinesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.12,
            delayChildren: delay
          }
        }
      }}
      className={cn(className)}
    >
      {lines.map((line, index) => (
        <motion.p
          key={index}
          variants={{
            hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, filter: 'blur(8px)' },
            show: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }}
          transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
          className={cn(lineClassName)}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}
