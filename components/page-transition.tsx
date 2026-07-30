'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(14px)', clipPath: 'inset(0 0 4% 0)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
