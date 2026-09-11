import type { Metadata } from 'next';
import Image from 'next/image';
import { LeadForm } from '@/components/lead-form';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Begin Your Journey · Blue Lotus Experience' },
  description: siteConfig.description,
  alternates: { canonical: '/apply' },
  openGraph: {
    title: 'Begin Your Journey · Blue Lotus Experience',
    description: siteConfig.description,
    url: `${siteConfig.url}/apply`
  }
};

export default function ApplyPage() {
  return (
    <main id="content" className="relative isolate min-h-svh bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/hero-poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background" />
      </div>
      <section className="mx-auto w-full max-w-xl px-6 pb-10 pt-24 sm:px-8 sm:pt-28">
        <p className="mb-4 text-sm leading-6 text-gold">Kodaikanal · 13–15 November 2026</p>
        <h1 className="font-display text-[clamp(2.15rem,7vw,3.25rem)] font-normal leading-[1.2] text-text">
          A little closer<br />to the forest.
        </h1>
        <LeadForm />
      </section>
    </main>
  );
}
