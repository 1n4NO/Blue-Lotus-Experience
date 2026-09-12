import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Instagram } from 'lucide-react';

import {
  aboutCopy,
  aboutManifesto,
  aboutPhilosophyLines,
  brandValues,
  corePrinciples,
  facilitators,
  founderNote,
  whyEleven
} from '@/content/site';
import { ApplyTrigger } from '@/components/apply-trigger';
import { ParallaxBackground } from '@/components/parallax-background';
import { Reveal } from '@/components/reveal';
import { StaggeredLines } from '@/components/staggered-lines';
import { siteConfig } from '@/lib/site';
import { SeoBreadcrumbs } from '@/components/seo-breadcrumbs';

export const metadata: Metadata = {
  title: { absolute: 'About Blue Lotus · Slow-Living Retreat in Kodaikanal' },
  description:
    `Learn about Blue Lotus Experience. ${siteConfig.description}`,
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/about`,
    title: 'About Blue Lotus · Slow-Living Retreat in Kodaikanal',
    description:
      `Learn about Blue Lotus Experience. ${siteConfig.description}`
  }
};

type AboutHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

function AboutHeading({ title, description, className }: AboutHeadingProps) {
  return (
    <div className={className}>
      <h2 className="max-w-3xl font-display text-[clamp(2.1rem,4.4vw,4rem)] font-normal leading-[1.2] tracking-normal text-text text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-[0.98rem] leading-7 text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main id="content" className="bg-background">
      <SeoBreadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
      <article className="relative isolate">
        <section className="section-grid px-6 pb-[6rem] pt-[10rem] sm:px-8 lg:px-10 lg:pt-[12rem]">
          <div className="mx-auto max-w-5xl">
            <Reveal className="space-y-8">
              <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.4rem)] font-normal leading-[1.2] tracking-normal text-text text-balance">
                {aboutCopy.title}
              </h1>
              <p className="max-w-2xl text-pretty text-[clamp(1rem,1.5vw,1.2rem)] leading-8 text-muted">
                {aboutCopy.subtitle}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-grid px-6 py-[6rem] sm:px-8 lg:px-10 lg:py-[8rem]">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr,1.15fr] lg:gap-18">
            <div className="lg:sticky lg:top-28 self-start">
              <AboutHeading title="Modern life has optimized everything except being human." />
            </div>

            <Reveal className="max-w-2xl">
              <p className="text-pretty text-lg leading-8 text-muted">{aboutCopy.intro}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-grid relative overflow-hidden px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(185,151,91,0.06),transparent_45%)]"
          />
          <div className="relative mx-auto max-w-5xl">
            <StaggeredLines
              lines={aboutPhilosophyLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              className="space-y-3 sm:space-y-4"
              lineClassName="font-display text-[clamp(2.3rem,5.6vw,4.8rem)] font-normal leading-[1.2] tracking-normal text-text text-balance"
              delay={0.08}
            />
          </div>
        </section>

        <section className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-5xl">
            <AboutHeading title="A note, in our own words." className="max-w-2xl" />

            <Reveal delay={0.1} className="mt-12 grid gap-8 sm:grid-cols-[6rem,1fr] sm:gap-10">
              <a href={founderNote.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${founderNote.name} on Instagram (opens in a new tab)`} className="block h-24 w-24 overflow-hidden rounded-full border border-white/12 transition-colors hover:border-gold">
                <Image src={founderNote.image} alt={founderNote.name} width={96} height={96} className="h-full w-full object-cover" />
              </a>

              <div className="space-y-5">
                {founderNote.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-pretty text-lg leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
                <div className="pt-2">
                  <a href={founderNote.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-display text-xl tracking-normal text-text transition-colors hover:text-gold" aria-label={`${founderNote.name} on Instagram (opens in a new tab)`}>
                    {founderNote.name}<Instagram className="h-4 w-4 text-gold/80" strokeWidth={1.4} aria-hidden="true" />
                  </a>
                  <p className="mt-1 font-ui text-[0.65rem] uppercase tracking-[0.3em] text-gold/75">
                    {founderNote.role}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <AboutHeading
              title="The people who hold each ritual."
              description="Each ritual is guided by the people who know it best."
              className="max-w-2xl"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {facilitators.map((person, index) => (
                <Reveal
                  key={person.modality}
                  delay={index * 0.06}
                  className="flex flex-col gap-5 border border-white/8 p-7"
                >
                  <div className="flex items-center gap-4">
                    <a href={person.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${person.name} on Instagram (opens in a new tab)`} className="block h-14 w-14 flex-none overflow-hidden rounded-full border border-white/12 transition-colors hover:border-gold">
                      <Image src={person.image} alt={person.name} width={56} height={56} className="h-full w-full object-cover" />
                    </a>
                    <div>
                      <p className="font-ui text-[0.6rem] uppercase tracking-[0.3em] text-gold/75">
                        {person.modality}
                      </p>
                      <a href={person.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on Instagram (opens in a new tab)`} className="mt-1 inline-flex items-center gap-2 font-display text-[1.25rem] leading-[1.2] tracking-normal text-text transition-colors hover:text-gold">
                        {person.name}<Instagram className="h-4 w-4 flex-none text-gold/80" strokeWidth={1.4} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm leading-[1.7] text-muted">{person.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <AboutHeading
              title="Five principles guide every detail."
              description="Nothing we create should contradict them."
              className="max-w-2xl"
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {corePrinciples.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 0.06}
                  className="border-b border-white/8 pb-6 lg:border-b-0 lg:border-l lg:border-white/8 lg:pb-0 lg:pl-5"
                >
                  <p className="font-ui text-[0.62rem] uppercase tracking-[0.34em] text-gold/70">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-[1.4rem] leading-[1.2] tracking-normal text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-muted">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:items-start lg:gap-16">
              <div className="lg:sticky lg:top-28">
                <AboutHeading title="Ten values shape how we build every experience." />
              </div>

              <div className="flex flex-wrap gap-3">
                {brandValues.map((value, index) => (
                  <Reveal key={value} delay={index * 0.04}>
                    <span className="inline-flex items-center border border-white/10 px-4 py-2.5 font-ui text-[0.68rem] uppercase tracking-[0.28em] text-muted transition duration-500 ease-calm hover:border-white/20 hover:text-text">
                      {value}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr,0.9fr] lg:items-end lg:gap-16">
              <div className="space-y-7">
                <AboutHeading
                  title="A small number keeps the experience human."
                  description="Eleven people is enough for depth, and small enough for silence to remain intact."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {whyEleven.map((item, index) => (
                  <Reveal key={item.label} delay={index * 0.08}>
                    <p className="font-display text-[clamp(3rem,7vw,5.6rem)] leading-[1.2] tracking-normal text-text">
                      {item.value}
                    </p>
                    <p className="mt-4 font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                      {item.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
              <ParallaxBackground src="/images/gallery/9.webp" overlayOpacity={0.62} />
              <Reveal className="relative space-y-7">
                <blockquote className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] font-normal leading-[1.2] tracking-normal text-text text-balance">
                  {aboutManifesto.quote}
                </blockquote>
                <p className="mx-auto max-w-2xl text-pretty text-base leading-7 text-muted">
                  {aboutManifesto.body}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <ApplyTrigger className="inline-flex items-center justify-center gap-3 border border-white/12 bg-white/8 px-6 py-3.5 font-ui text-[0.7rem] uppercase tracking-[0.3em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12">
              Begin Your Journey
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </ApplyTrigger>
          </Reveal>
        </section>
      </article>
    </main>
  );
}
