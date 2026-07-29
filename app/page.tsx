import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import {
  applicationCard,
  applicationDetails,
  applicationProcess,
  applicationUrl,
  bringItems,
  experienceIllustrations,
  experienceItems,
  faqItems,
  galleryImages,
  includedItems,
  philosophyLines,
  retreatSchedule,
  whatToExpect,
  whoThisIsFor,
  whyEleven
} from '@/content/site';
import { FaqAccordion } from '@/components/faq-accordion';
import { HeroSection } from '@/components/hero-section';
import { LineIllustration } from '@/components/line-illustration';
import { ParallaxBackground } from '@/components/parallax-background';
import { Reveal } from '@/components/reveal';
import { RetreatTimeline } from '@/components/retreat-timeline';
import { SectionTitle } from '@/components/section-title';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { EndSequence } from '@/components/end-sequence';
import { StaggeredLines } from '@/components/staggered-lines';

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

        <section id="philosophy" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr,1.1fr] lg:items-start lg:gap-18">
            <div className="lg:sticky lg:top-28">
              <SectionTitle
                title="Very little. Very precise."
                description="Blue Lotus is built around the belief that presence becomes possible when the unnecessary is removed."
                className="max-w-2xl"
              />
            </div>

            <div className="space-y-8">
              <StaggeredLines
                lines={philosophyLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                className="max-w-6xl space-y-4 sm:space-y-5"
                lineClassName="font-display text-[clamp(3.4rem,8vw,7.9rem)] leading-[0.99] tracking-[-0.03em] text-text text-balance"
                delay={0.08}
              />

              <Reveal className="max-w-2xl">
                <p className="text-pretty text-lg leading-7 text-muted">
                  Presence is the practice. Every detail on this retreat is shaped to protect that
                  quiet center: fewer choices, slower transitions, more room to breathe.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal className="group relative min-h-[29rem] overflow-hidden rounded-[2rem] border border-white/8 sm:col-span-2">
                <Image
                  src="/images/gallery/2.png"
                  alt="Rain-soaked rainforest canopy with soft mist."
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-[1400ms] ease-calm hover:scale-[1.03] hover:brightness-105"
                />
                <div className="absolute inset-0 bg-black/10 transition duration-700 group-hover:bg-black/0" />
              </Reveal>
              <Reveal delay={0.08} className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/8">
                <Image
                  src="/images/gallery/4.png"
                  alt="Single dew drop hanging from a leaf."
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover transition duration-[1400ms] ease-calm hover:scale-[1.03] hover:brightness-105"
                />
              </Reveal>
              <Reveal delay={0.16} className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/8">
                <Image
                  src="/images/gallery/3.png"
                  alt="Stone forest path with soft filtered light."
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover transition duration-[1400ms] ease-calm hover:scale-[1.03] hover:brightness-105"
                />
              </Reveal>
            </div>

            <div className="self-center">
              <SectionTitle
                title="A retreat shaped by texture, quiet, and human-scale ritual."
                description="The rhythm is slow enough to notice rain on leaves, the weight of a ceramic cup, and the relief of not needing to perform."
              />

              <div className="mt-9 grid gap-4">
                {experienceItems.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.08} className="border-b border-white/8 pb-5">
                    <div className="flex items-start gap-4">
                      <LineIllustration
                        kind={
                          experienceIllustrations.find((illustration) => illustration.title === item.title)
                            ?.kind ?? 'forest'
                        }
                        className="mt-1 h-16 w-16 flex-none text-gold/80"
                      />
                      <div>
                        <h3 className="font-display text-[1.48rem] leading-[1.04] tracking-[-0.025em] text-text">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-[1.72] text-muted">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="retreat" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.88fr,1.12fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 self-start">
                <SectionTitle
                  title="Two days in the forest, shaped for presence rather than pace."
                  description="Times are approximate. Presence matters more than the clock."
                />
              </div>

              <RetreatTimeline days={retreatSchedule} />
            </div>

            <div className="mt-14 grid gap-10 sm:gap-12 lg:grid-cols-3">
              <Reveal>
                <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                  Included
                </p>
                <ul className="mt-4 space-y-3.5">
                  {includedItems.map((item) => (
                    <li key={item} className="border-b border-white/6 pb-2.5 text-sm leading-[1.7] text-muted last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                  What To Expect
                </p>
                <ul className="mt-4 space-y-3.5">
                  {whatToExpect.map((item) => (
                    <li key={item} className="border-b border-white/6 pb-2.5 text-sm leading-[1.7] text-muted last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                  What To Bring
                </p>
                <ul className="mt-4 space-y-3.5">
                  {bringItems.map((item) => (
                    <li key={item} className="border-b border-white/6 pb-2.5 text-sm leading-[1.7] text-muted last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="why-eleven" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr,0.9fr] lg:items-end lg:gap-16">
              <div className="space-y-7">
                <SectionTitle
                  title="A small number keeps the experience human."
                  description="Eleven people is enough for depth, and small enough for silence to remain intact."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {whyEleven.map((item, index) => (
                  <Reveal key={item.label} delay={index * 0.08}>
                    <p className="font-display text-[clamp(3.5rem,8vw,6.8rem)] leading-[0.9] tracking-[-0.03em] text-text">
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

        <section id="gallery" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              title="A few unguarded moments."
              description="What stillness looks like, from the outside."
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
                    className="object-cover transition duration-[1400ms] ease-calm group-hover:scale-[1.04] group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-700 ease-calm group-hover:bg-black/12" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.28))] opacity-40" />
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

        <section id="journal" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
            <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
              <ParallaxBackground src="/images/journal.png" overlayOpacity={0.6} />
              <Reveal className="relative space-y-7">
                <p className="font-ui text-[0.7rem] uppercase tracking-[0.34em] text-gold/80">
                  Journal
                </p>
                <blockquote className="mx-auto max-w-3xl font-display text-[clamp(2.3rem,5.5vw,5.1rem)] leading-[0.94] tracking-[-0.03em] text-text text-balance">
                  The forest has never asked you to become someone else.
                  <br />
                  Only to remember who you already are.
                </blockquote>
                <p className="mx-auto max-w-2xl text-pretty text-base leading-7 text-muted">
                  A retreat is not an escape from life. It is a way of returning to it with more
                  clarity, less noise, and a steadier pulse.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="who-this-is-for" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 self-start">
              <SectionTitle
                title="For people who need the pace of their days to change."
                description="This retreat is for those who are carrying a full calendar, a noisy mind, or a steady ache for stillness."
              />
            </div>

            <div className="flex flex-col">
              {whoThisIsFor.map((item, index) => (
                <Reveal
                  key={item}
                  delay={index * 0.08}
                  className="flex items-baseline justify-between gap-6 border-b border-white/8 py-5 first:pt-0 last:border-b-0"
                >
                  <p className="font-display text-[1.55rem] leading-[1.02] tracking-[-0.025em] text-text">
                    {item}
                  </p>
                  <span className="font-ui text-[0.62rem] uppercase tracking-[0.34em] text-gold/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative h-[70vh] w-full min-h-[420px] overflow-hidden">
          <Image
            src="/images/gallery/10.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        <section id="what-to-expect" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 self-start">
              <SectionTitle
                title="A checklist of the rhythm ahead."
                description="The retreat is structured, but never crowded. Each element exists to support calm, not momentum."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {whatToExpect.map((item, index) => (
                <Reveal
                  key={item}
                  delay={index * 0.05}
                  className="text-[0.83rem] uppercase tracking-[0.22em] text-text/90"
                >
                  <span className="mr-2.5 text-gold/80">✓</span>
                  {item}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 self-start">
              <SectionTitle
                title="Questions, answered with the same restraint as the rest of the retreat."
                description="If something is still unclear, we would rather answer it directly than let it become noise."
              />
            </div>

            <FaqAccordion items={faqItems} />
          </div>
        </section>

        <section id="application-process" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="max-w-md font-display text-[clamp(2.35rem,5.2vw,4.9rem)] leading-[1.12] tracking-[-0.035em] text-text text-balance">
                Apply.
                <br />
                Review.
                <br />
                Welcome.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-[0.98rem] leading-7 text-muted">
                The process is intentionally human. The sequence is short so the experience feels
                calm from the first reply.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {applicationProcess.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06}>
                  <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                    0{index + 1}
                  </p>
                  <p className="mt-3.5 font-display text-[1.6rem] leading-[1.08] tracking-[-0.025em] text-text">
                    {step.title}
                  </p>
                  <p className="mt-2.5 text-sm leading-[1.7] text-muted">{step.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="application" className="section-grid px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]">
          <div className="mx-auto max-w-5xl">
            <Reveal className="space-y-7 text-center">
              <p className="font-ui text-[0.72rem] uppercase tracking-[0.34em] text-gold/80">
                Application
              </p>

              <div className="mx-auto max-w-4xl space-y-3.5">
                <h2 className="font-display text-[clamp(2.8rem,6.8vw,6.3rem)] leading-[0.92] tracking-[-0.03em] text-text text-balance">
                  {applicationDetails.month} 2026
                  <br />
                  {applicationDetails.location}
                </h2>

                <p className="mx-auto max-w-2xl text-pretty text-base leading-7 text-muted">
                  {applicationDetails.note}
                </p>
              </div>

              <div className="mx-auto grid max-w-4xl gap-6 border-y border-white/8 py-6 sm:grid-cols-3">
                {[applicationCard.duration, applicationCard.participants, applicationCard.price].map((item) => (
                  <p key={item} className="font-ui text-[0.62rem] uppercase tracking-[0.34em] text-gold/75">
                    {item}
                  </p>
                ))}
              </div>

              <div className="mx-auto flex max-w-xl flex-col items-center gap-3.5 pt-2" />
            </Reveal>
          </div>
        </section>

        <EndSequence />
      </article>
    </main>
  );
}
