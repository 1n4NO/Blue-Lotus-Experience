'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { heroCopy } from '@/content/site';
import { Reveal } from '@/components/reveal';
import { HeroMedia } from '@/components/hero-media';

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-background" aria-label="Hero">
      <HeroMedia />

      <div aria-hidden="true" className="absolute inset-0 z-10 overflow-hidden">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.08, 0.14, 0.09],
                  x: ['-4%', '2%', '-1%'],
                  y: ['1%', '-1%', '0%']
                }
          }
          transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 top-12 h-72 w-72 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.05, 0.11, 0.06],
                  x: ['2%', '-1%', '0%'],
                  y: ['-1%', '2%', '0%']
                }
          }
          transition={reduceMotion ? undefined : { duration: 34, repeat: Infinity, ease: 'linear' }}
          className="absolute right-[-6rem] top-1/4 h-96 w-96 rounded-full bg-[rgba(185,151,91,0.08)] blur-3xl"
        />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 pb-6 pt-24 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.36em] text-white/52">
          <p className="font-ui">Blue Lotus Experience</p>
          <p className="hidden font-ui md:block">Kodaikanal · October 2026</p>
        </div>

        <div className="max-w-4xl pb-8">
          <Reveal className="space-y-8">
            <h1 className="max-w-3xl font-display text-[clamp(3.9rem,9vw,8.4rem)] leading-[0.92] tracking-[-0.03em] text-text text-balance">
              {heroCopy.headline}
            </h1>

            <p className="max-w-2xl text-pretty text-[clamp(1rem,1.55vw,1.15rem)] leading-9 text-muted">
              {heroCopy.subheading}
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#apply"
              className="inline-flex items-center justify-center gap-3 border border-white/12 bg-white/8 px-6 py-3.5 font-ui text-[0.7rem] uppercase tracking-[0.3em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
            >
              {heroCopy.primaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="#experience"
              className="inline-flex items-center justify-center border border-white/10 px-6 py-3.5 font-ui text-[0.7rem] uppercase tracking-[0.3em] text-muted transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/22 hover:text-text hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            >
              {heroCopy.secondaryCta}
            </Link>
          </Reveal>
        </div>

        <div className="flex items-end justify-end gap-6 border-t border-white/10 pt-5 text-[0.58rem] uppercase tracking-[0.46em] text-white/48">
          <div className="hidden items-center gap-3 sm:flex">
            <span className="h-px w-12 bg-white/18" />
            <p className="font-ui">Slow living · presence · silence · tea · forest</p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center"
      >
        <div className="flex flex-col items-center gap-3 text-white/50">
          <span className="font-ui text-[0.58rem] uppercase tracking-[0.44em]">Scroll</span>
          <span className="h-14 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </div>
    </section>
  );
}
