export const siteConfig = {
  name: 'Blue Lotus Experience',
  shortName: 'Blue Lotus',
  description:
    'A luxury slow-living retreat experience in Kodaikanal, rooted in presence, silence, tea, forest walks, and intentional community.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bluelotusexperience.com',
  email: 'bluelotusexperience@duck.com',
  instagram: 'https://www.instagram.com/blue.lotus.experience/',
  location: 'Kodaikanal, Tamil Nadu',
  retreatMonth: 'November 2026'
} as const;
