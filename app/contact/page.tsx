import type { Metadata } from 'next';
import Link from 'next/link';

import { footerDetails } from '@/content/site';
import { Reveal } from '@/components/reveal';
import { siteConfig } from '@/lib/site';
import { SeoBreadcrumbs } from '@/components/seo-breadcrumbs';

export const metadata: Metadata = {
  title: { absolute: 'Contact Blue Lotus Experience' },
  description: 'Contact Blue Lotus Experience about the November 2026 Kodaikanal forest retreat and application process.',
  alternates: {
    canonical: '/contact'
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/contact`,
    title: 'Contact Blue Lotus Experience',
    description: 'Contact Blue Lotus Experience about the November 2026 Kodaikanal forest retreat and application process.'
  }
};

export default function ContactPage() {
  return (
    <main
      id="content"
      className="flex min-h-screen items-center justify-center bg-background px-6 py-28 sm:px-8 lg:px-10"
    >
      <SeoBreadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
      <Reveal className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-normal leading-[1.2] tracking-normal text-text text-balance">
          Get in touch.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-7 text-muted">
          For questions about the retreat, or anything else, write to us directly.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href={`mailto:${footerDetails.email}`}
            className="border-b border-white/20 pb-1 font-ui text-sm tracking-normal text-text transition duration-500 ease-calm hover:border-white/40"
          >
            {footerDetails.email}
          </Link>
          <Link
            href={footerDetails.instagram}
            target="_blank"
            rel="noreferrer"
            className="border-b border-white/20 pb-1 font-ui text-sm tracking-normal text-text transition duration-500 ease-calm hover:border-white/40"
          >
            Instagram
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
