'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export function LoadingScreen() {
  const reduceMotion = useReducedMotion();

  const containerTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      };

  const bloomTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1]
      };

  return (
    <motion.div
      aria-label="Loading Blue Lotus Experience"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
      transition={containerTransition}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-background"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,151,91,0.1),transparent_42%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.02))] opacity-70"
      />

      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? { opacity: 0.22 } : { opacity: 0, scale: 0.95 }}
        animate={
          reduceMotion
            ? { opacity: 0.22 }
            : {
                opacity: [0, 0.16, 0.12],
                scale: [0.95, 1, 1.02]
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 4.8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
              }
        }
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,151,91,0.12),transparent_62%)] blur-3xl"
      />

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(18px)' }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={containerTransition}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          {/* <motion.div
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 0.35 } : { opacity: 0, scale: 0.65 }}
            animate={reduceMotion ? { opacity: 0.35 } : { opacity: [0, 0.48, 0.34], scale: [0.65, 1, 1.04] }}
            transition={bloomTransition}
            className="absolute inset-0 rounded-full border border-white/8 bg-white/[0.015]"
          /> */}

          {/* <motion.span
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 0.32, scale: 1 } : { opacity: 0, scale: 0.5 }}
            animate={reduceMotion ? { opacity: 0.32, scale: 1 } : { opacity: [0, 0.34, 0.26], scale: [0.5, 1, 1.06] }}
            transition={{ ...bloomTransition, delay: 0.08 }}
            className="absolute left-1/2 top-[8%] h-[56%] w-[22%] -translate-x-1/2 rounded-[999px] bg-[linear-gradient(180deg,rgba(185,151,91,0.34),rgba(185,151,91,0.08)_65%,transparent)] blur-[1px]"
          /> */}
          {/* <motion.span
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 0.28, scale: 1 } : { opacity: 0, scale: 0.5 }}
            animate={reduceMotion ? { opacity: 0.28, scale: 1 } : { opacity: [0, 0.32, 0.24], scale: [0.5, 1, 1.05] }}
            transition={{ ...bloomTransition, delay: 0.16 }}
            className="absolute left-[14%] top-1/2 h-[36%] w-[20%] -translate-y-1/2 rounded-[999px] bg-[linear-gradient(180deg,rgba(247,246,242,0.22),rgba(247,246,242,0.04)_72%,transparent)] blur-[1px]"
          /> */}
          {/* <motion.span
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 0.28, scale: 1 } : { opacity: 0, scale: 0.5 }}
            animate={reduceMotion ? { opacity: 0.28, scale: 1 } : { opacity: [0, 0.32, 0.24], scale: [0.5, 1, 1.05] }}
            transition={{ ...bloomTransition, delay: 0.24 }}
            className="absolute right-[14%] top-1/2 h-[36%] w-[20%] -translate-y-1/2 rounded-[999px] bg-[linear-gradient(180deg,rgba(247,246,242,0.22),rgba(247,246,242,0.04)_72%,transparent)] blur-[1px]"
          /> */}
          {/* <motion.span
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 0.28, scale: 1 } : { opacity: 0, scale: 0.5 }}
            animate={reduceMotion ? { opacity: 0.28, scale: 1 } : { opacity: [0, 0.32, 0.24], scale: [0.5, 1, 1.05] }}
            transition={{ ...bloomTransition, delay: 0.32 }}
            className="absolute left-1/2 top-[58%] h-[22%] w-[42%] -translate-x-1/2 rounded-[999px] bg-[linear-gradient(180deg,rgba(185,151,91,0.24),rgba(185,151,91,0.05)_70%,transparent)] blur-[1px]"
          /> */}

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.88 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.05, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-[6.75rem] w-[6.75rem] items-center justify-center rounded-full border border-white/10 bg-[#090909]/84 shadow-[0_20px_80px_rgba(0,0,0,0.36)] sm:h-32 sm:w-32"
          >
            <Image
              src="/images/logo-mark.png"
              alt="Blue Lotus Experience"
              width={96}
              height={96}
              priority
              className="h-20 w-20 sm:h-24 sm:w-24"
            />
          </motion.div>
        </div>

        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(8px)' }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-ui text-[0.66rem] uppercase tracking-[0.46em] text-gold/90"
        >
          Blue Lotus Experience
        </motion.p>

        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(10px)' }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: reduceMotion ? 0 : 0.95, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-sm font-display text-[clamp(1.9rem,3.6vw,3.5rem)] leading-[0.98] tracking-[-0.03em] text-text text-balance"
        >
          Come home to yourself.
        </motion.p>

        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, width: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, width: '12rem' }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: 1.02, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 h-px overflow-hidden bg-white/8"
        >
          <motion.div
            initial={reduceMotion ? { x: 0 } : { x: '-120%' }}
            animate={reduceMotion ? { x: 0 } : { x: '220%' }}
            transition={reduceMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(185,151,91,0.88),transparent)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? { opacity: 0.4 } : { opacity: 0 }}
        animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0, 0.2, 0.12] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 5.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
              }
        }
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.3)_100%)]"
      />
    </motion.div>
  );
}
