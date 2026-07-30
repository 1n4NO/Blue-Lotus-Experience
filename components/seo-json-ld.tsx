import { siteConfig } from '@/lib/site';

export function SeoJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/logo-mark-instagram.png`,
        email: siteConfig.email,
        sameAs: [siteConfig.instagram]
      },
      {
        '@type': 'Event',
        name: 'Blue Lotus Experience Retreat',
        startDate: '2026-10-01',
        endDate: '2026-10-02',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: siteConfig.location
        },
        organizer: {
          '@type': 'Organization',
          name: siteConfig.name
        },
        description: siteConfig.description,
        url: siteConfig.url
      },
      {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
