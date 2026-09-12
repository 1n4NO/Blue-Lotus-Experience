export const siteConfig = {
  name: 'Blue Lotus Experience',
  shortName: 'Blue Lotus',
  description:
    'Kodaikanal forest retreat, 13th November - 15th November 2026. Two nights of accommodations, two meals daily and all sessions included. ₹11,000 triple sharing; ₹15,000 double sharing; ₹22,000 single occupancy. Check-in 13th November; check-out 15th November 2026.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.blue-lotus-experience.com',
  email: 'retreat@blue-lotus-experience.com',
  instagram: 'https://www.instagram.com/bluelotus.experience/',
  location: 'Kodaikanal, Tamil Nadu',
  retreatMonth: '13th November - 15th November 2026'
} as const;
