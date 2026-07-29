export const siteConfig = {
  name: 'Blue Lotus Experience',
  shortName: 'Blue Lotus',
  description:
    'A luxury slow-living retreat experience in Kodaikanal, rooted in presence, silence, tea, forest walks, and intentional community.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bluelotusexperience.com',
  email: 'hello@bluelotusexperience.com',
  instagram: 'https://instagram.com/bluelotusexperience',
  location: 'Kodaikanal, Tamil Nadu',
  retreatMonth: 'October 2026'
} as const;
