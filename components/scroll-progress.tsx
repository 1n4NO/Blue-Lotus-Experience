'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ width, opacity }}
        className="h-px origin-left bg-gradient-to-r from-transparent via-[rgba(185,151,91,0.86)] to-transparent"
      />
    </div>
  );
}
