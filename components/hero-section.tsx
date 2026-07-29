import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { heroCopy } from '@/content/site';
import { Reveal } from '@/components/reveal';
import { HeroMedia } from '@/components/hero-media';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-background" aria-label="Hero">
      <HeroMedia />

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 pb-6 pt-24 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.36em] text-white/52">
          <p className="font-ui">Blue Lotus Experience</p>
          <p className="hidden font-ui md:block">Kodaikanal · October 2026</p>
        </div>

        <div className="max-w-4xl pb-8">
          <Reveal className="space-y-7">
            <h1 className="max-w-3xl font-display text-[clamp(3.5rem,8.8vw,7.8rem)] leading-[0.96] tracking-[-0.025em] text-text text-balance">
              {heroCopy.headline}
            </h1>

            <p className="max-w-2xl text-pretty text-[clamp(1rem,1.8vw,1.2rem)] leading-8 text-muted">
              {heroCopy.subheading}
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#apply"
              className="inline-flex items-center justify-center gap-3 border border-white/12 bg-white/8 px-6 py-3.5 font-ui text-[0.7rem] uppercase tracking-[0.3em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12"
            >
              {heroCopy.primaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="#experience"
              className="inline-flex items-center justify-center border border-white/10 px-6 py-3.5 font-ui text-[0.7rem] uppercase tracking-[0.3em] text-muted transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/22 hover:text-text"
            >
              {heroCopy.secondaryCta}
            </Link>
          </Reveal>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-5 text-[0.58rem] uppercase tracking-[0.46em] text-white/48">
          <p className="font-ui">{heroCopy.bottomHint}</p>
          <p className="hidden font-ui sm:block">Slow living · presence · silence · tea · forest</p>
        </div>
      </div>
    </section>
  );
}
