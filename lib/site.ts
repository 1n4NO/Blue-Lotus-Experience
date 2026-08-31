export const siteConfig = {
  name: 'Blue Lotus Experience',
  shortName: 'Blue Lotus',
  description:
    'A two-day slow-living forest retreat in Kodaikanal, Tamil Nadu, with forest walks, tea ceremony, journaling, and intentional community. November 2026.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.blue-lotus-experience.com',
  email: 'retreat@blue-lotus-experience.com',
  instagram: 'https://www.instagram.com/bluelotus.experience/',
  location: 'Kodaikanal, Tamil Nadu',
  retreatMonth: 'November 2026'
} as const;
