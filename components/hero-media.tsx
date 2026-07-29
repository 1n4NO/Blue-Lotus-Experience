'use client';

import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';

export function HeroMedia() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.3, 0.48, 0.72]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 0.56, 0.68]);
  const bottomFade = useTransform(scrollYProgress, [0, 0.4, 1], [0.84, 0.9, 0.96]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.video
        src="/video/hero.mp4"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.04],
                x: [0, 1.5, 0],
                y: [0, -1, 0]
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 40,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'linear'
              }
        }
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
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.08, 0.16, 0.1],
                x: ['-3%', '2%', '-1%'],
                y: ['1%', '-1%', '0%']
              }
        }
        transition={reduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent_20%),radial-gradient(circle_at_75%_15%,rgba(185,151,91,0.18),transparent_18%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.08),transparent_24%)] mix-blend-screen"
      />

      <motion.div
        aria-hidden="true"
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black"
      />

      <motion.div
        aria-hidden="true"
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),rgba(0,0,0,0.64)_68%,rgba(0,0,0,0.9))]"
      />

      <motion.div
        aria-hidden="true"
        style={{ opacity: bottomFade }}
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#090909] via-[#090909]/90 to-transparent"
      />

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.08, 0.14, 0.1],
                x: ['0%', '1.5%', '0%']
              }
        }
        transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),transparent_24%,transparent_70%,rgba(0,0,0,0.18))]"
      />
    </div>
  );
}
