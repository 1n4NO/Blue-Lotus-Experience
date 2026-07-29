import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';

import {
  applicationDetails,
  applicationUrl,
  bringItems,
  experienceItems,
  galleryImages,
  includedItems,
  philosophyLines,
  principles,
  retreatSchedule,
  whyEleven
} from '@/content/site';
import { HeroSection } from '@/components/hero-section';
import { Reveal } from '@/components/reveal';
import { SectionTitle } from '@/components/section-title';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { SiteFooter } from '@/components/site-footer';
import { StaggeredLines } from '@/components/staggered-lines';
import { siteConfig } from '@/lib/site';

const gallerySpanClasses: Record<string, string> = {
  wide: 'md:col-span-2 md:row-span-2',
  tall: 'md:row-span-2',
  default: 'md:row-span-1'
};

export default function HomePage() {
  return (
    <main id="content" className="bg-background">
      <SeoJsonLd />

      <article className="relative isolate">
        <HeroSection />

        <section id="philosophy" className="section-grid px-6 py-[5rem] sm:px-8 lg:px-10 lg:py-[7rem]">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Philosophy"
              title="Very little. Very precise."
              description="Blue Lotus is built around the belief that presence becomes possible when the unnecessary is removed."
              className="max-w-2xl"
            />

            <div className="mt-16 grid gap-10 lg:mt-24">
              <StaggeredLines
                lines={philosophyLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                className="max-w-6xl space-y-3 sm:space-y-5"
                lineClassName="font-display text-[clamp(3.3rem,8.8vw,7.8rem)] leading-[1.06] tracking-[-0.025em] text-text text-balance"
                delay={0.08}
              />

              <Reveal className="max-w-2xl">
                <p className="text-pretty text-lg leading-8 text-muted">
                  Your body is your temple. Nature is your medicine. Presence is the practice.
                  Every detail on this retreat is shaped to protect those three truths.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="section-grid px-6 py-[5.5rem] sm:px-8 lg:px-10 lg:py-[7.5rem]">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/8 sm:col-span-2">
                <Image
                  src="/images/gallery/2.png"
                  alt="Rain-soaked rainforest canopy with soft mist."
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-[1200ms] ease-calm hover:scale-[1.03]"
                  priority={false}
                />
              </Reveal>
              <Reveal delay={0.08} className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/8">
                <Image
                  src="/images/gallery/4.png"
                  alt="Single dew drop hanging from a leaf."
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover transition duration-[1200ms] ease-calm hover:scale-[1.03]"
                />
              </Reveal>
              <Reveal delay={0.16} className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/8">
                <Image
                  src="/images/gallery/3.png"
                  alt="Stone forest path with soft filtered light."
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover transition duration-[1200ms] ease-calm hover:scale-[1.03]"
                />
              </Reveal>
            </div>

            <div className="self-center">
              <SectionTitle
                eyebrow="The Experience"
                title="A retreat shaped by texture, quiet, and human-scale ritual."
                description="The rhythm is slow enough to notice rain on leaves, the weight of a ceramic cup, and the relief of not needing to perform."
              />

              <div className="mt-10 grid gap-4">
                {experienceItems.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.08} className="border-b border-white/8 pb-5">
                    <div className="flex items-start gap-6">
                      <div className="min-w-12 font-ui text-[0.7rem] uppercase tracking-[0.28em] text-gold/80">
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="font-display text-[1.55rem] leading-[1.02] tracking-[-0.015em] text-text">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-7 text-muted">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="retreat" className="section-grid px-6 py-[5.5rem] sm:px-8 lg:px-10 lg:py-[7.5rem]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-16">
              <div>
                <SectionTitle
                  eyebrow="Retreat Schedule"
                  title="Two days in the forest, shaped for presence rather than pace."
                  description="Times are approximate. Presence matters more than the clock."
                />
              </div>

              <div className="space-y-8">
                {retreatSchedule.map((day, dayIndex) => (
                  <div key={day.day} className="relative rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
                    <div className="mb-8 flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                          {day.day}
                        </p>
                        <h3 className="mt-2 font-display text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[0.97] tracking-[-0.02em] text-text">
                          {day.title}
                        </h3>
                      </div>
                      <p className="max-w-sm text-sm leading-7 text-muted">
                        {dayIndex === 0
                          ? 'Arrival, orientation, tea, journaling, campfire, and closing silence.'
                          : 'Sunrise gathering, breath, reflection, the closing circle, and a slow farewell.'}
                      </p>
                    </div>

                    <div className="relative pl-10">
                      <div className="absolute left-[0.75rem] top-2 bottom-2 w-px bg-white/10" />
                      <div className="grid gap-7">
                        {day.sessions.map((session, index) => (
                          <Reveal key={`${day.day}-${session.time}-${session.title}`} delay={index * 0.05} className="relative">
                            <div className="absolute -left-7 top-2 h-2 w-2 -translate-x-1 rounded-full border border-[rgba(185,151,91,0.75)] bg-[#090909]" />
                            <p className="font-ui text-[0.68rem] uppercase tracking-[0.3em] text-gold/75">
                              {session.time}
                            </p>
                            <h4 className="mt-2 font-display text-[1.9rem] leading-[1.02] tracking-[-0.02em] text-text">
                              {session.title}
                            </h4>
                            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{session.detail}</p>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              <Reveal className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
                <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                  Included
                </p>
                <ul className="mt-5 space-y-4">
                  {includedItems.map((item) => (
                    <li key={item} className="border-b border-white/6 pb-3 text-sm leading-7 text-muted last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.08} className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
                <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                  What to Bring
                </p>
                <ul className="mt-5 space-y-4">
                  {bringItems.map((item) => (
                    <li key={item} className="border-b border-white/6 pb-3 text-sm leading-7 text-muted last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16} className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
                <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                  Our Principles
                </p>
                <ul className="mt-5 space-y-4">
                  {principles.map((item) => (
                    <li key={item} className="border-b border-white/6 pb-3 text-sm leading-7 text-muted last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="gallery" className="section-grid px-6 py-[5.5rem] sm:px-8 lg:px-10 lg:py-[7.5rem]">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Gallery"
              title="Images as atmosphere."
              description="Hovering reveals the frame. Everything else stays quiet."
            />

            <div className="mt-12 grid auto-rows-[14rem] gap-4 md:grid-cols-3 md:auto-rows-[11rem]">
              {galleryImages.map((image, index) => (
                <Reveal
                  key={image.src}
                  delay={index * 0.08}
                  className={`group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-surface ${gallerySpanClasses[image.span ?? 'default']}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-[1200ms] ease-calm group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-700 ease-calm group-hover:bg-black/12" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 opacity-0 transition duration-700 ease-calm group-hover:opacity-100">
                    <p className="max-w-xs text-sm leading-6 text-text">{image.alt}</p>
                    <span className="font-ui text-[0.65rem] uppercase tracking-[0.28em] text-gold/80">
                      View
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="journal" className="section-grid px-6 py-[5.5rem] sm:px-8 lg:px-10 lg:py-[7.5rem]">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
              <Reveal className="space-y-8">
                <p className="font-ui text-[0.7rem] uppercase tracking-[0.34em] text-gold/80">
                  Journal
                </p>
                <blockquote className="font-display text-[clamp(2.3rem,5.5vw,5.1rem)] leading-[0.98] tracking-[-0.025em] text-text text-balance">
                  The forest has never asked you to become someone else.
                  <br />
                  Only to remember who you already are.
                </blockquote>
                <p className="mx-auto max-w-2xl text-pretty text-base leading-8 text-muted">
                  A retreat is not an escape from life. It is a way of returning to it with more
                  clarity, less noise, and a steadier pulse.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="why-eleven" className="section-grid px-6 py-[5.5rem] sm:px-8 lg:px-10 lg:py-[7.5rem]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
              <div className="space-y-8">
                <SectionTitle
                  eyebrow="Why Eleven"
                  title="A small number keeps the experience human."
                  description="Eleven people is enough for depth, and small enough for silence to remain intact."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {whyEleven.map((item, index) => (
                  <Reveal
                    key={item.label}
                    delay={index * 0.08}
                    className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6"
                  >
                    <p className="font-display text-[clamp(3.5rem,8vw,6.2rem)] leading-none tracking-[-0.02em] text-text">
                      {item.value}
                    </p>
                    <p className="mt-5 font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                      {item.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="section-grid px-6 py-[5.5rem] sm:px-8 lg:px-10 lg:py-[8rem]">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal className="space-y-8">
              <p className="font-ui text-[0.72rem] uppercase tracking-[0.34em] text-gold/80">
                Application
              </p>
              <h2 className="font-display text-[clamp(2.6rem,6.6vw,6rem)] leading-[0.96] tracking-[-0.025em] text-text text-balance">
                {applicationDetails.month}
                <br />
                {applicationDetails.location}
                <br />
                <span className="font-display">{applicationDetails.capacityNumber}</span>{' '}
                <span className="font-ui text-[0.42em] uppercase tracking-[0.32em] text-muted align-middle">
                  {applicationDetails.capacityLabel}
                </span>
              </h2>
              <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
                <Link
                  href={applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-white/12 bg-white/8 px-7 py-4 font-ui text-xs uppercase tracking-[0.28em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/12"
                >
                  Apply
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <p className="text-sm leading-7 text-muted">{applicationDetails.note}</p>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 font-ui text-[0.68rem] uppercase tracking-[0.28em] text-muted transition duration-500 ease-calm hover:text-text"
                >
                  <Mail className="h-4 w-4" />
                  bluelotusexperience@duck.com
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <SiteFooter />
      </article>
    </main>
  );
}
