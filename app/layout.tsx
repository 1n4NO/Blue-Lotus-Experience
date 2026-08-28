import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';

import { ApplicationModalProvider } from '@/components/application-modal-provider';
import { DeferredEnhancements } from '@/components/deferred-enhancements';
import { LoadingSequence } from '@/components/loading-sequence';
import { SiteHeader } from '@/components/site-header';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { siteConfig } from '@/lib/site';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body'
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-display'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Kodaikanal Forest Retreat · Blue Lotus Experience',
    template: `%s · ${siteConfig.shortName}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Kodaikanal Forest Retreat · Blue Lotus Experience',
    description: siteConfig.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Blue Lotus Experience — Kodaikanal forest retreat'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kodaikanal Forest Retreat · Blue Lotus Experience',
    description: siteConfig.description,
    images: ['/opengraph-image']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${libreBaskerville.variable} bg-background text-text`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-white/12 focus:bg-black/80 focus:px-4 focus:py-3 focus:text-sm"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ApplicationModalProvider>
            <SiteHeader />
            <DeferredEnhancements />
            <LoadingSequence>{children}</LoadingSequence>
          </ApplicationModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
