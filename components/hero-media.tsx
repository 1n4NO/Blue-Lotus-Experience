'use client';

import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';

export function HeroMedia() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.18], [0.42, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.03]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.video
        src="/video/hero.mp4"
        style={{ scale }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/gallery/2.png"
      />

      <motion.div
        aria-hidden="true"
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),rgba(0,0,0,0.72)_70%,rgba(0,0,0,0.92))]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#090909] via-[#090909]/88 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),transparent_26%,transparent_72%,rgba(0,0,0,0.2))]"
      />
    </div>
  );
}
