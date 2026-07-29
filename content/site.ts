import type {
  ExperienceItem,
  GalleryImage,
  NavLink,
  RetreatDay
} from '@/types/site';

export const navigation: NavLink[] = [
  { label: 'Experience', href: '#experience' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Retreat', href: '#retreat' },
  { label: 'Journal', href: '#journal' },
  { label: 'Apply', href: '#apply' }
];

export const heroCopy = {
  headline: 'Come home to yourself.',
  subheading: 'Two days in the forests of Kodaikanal. Limited to eleven participants.',
  primaryCta: 'Begin Your Journey',
  secondaryCta: 'Explore',
  bottomHint: 'Scroll'
} as const;

export const philosophyLines = [
  'Your body is your temple.',
  'Nature is your medicine.'
] as const;

export const experienceItems: ExperienceItem[] = [
  {
    title: 'Forest Walks',
    description:
      'Unhurried walks through the rainforest where attention returns to texture, moisture, and breath.'
  },
  {
    title: 'Tea Ceremony',
    description:
      'A quiet tea ritual designed to slow the body and soften the pace of the room.'
  },
  {
    title: 'Journaling',
    description:
      'Reflective prompts and private writing time to listen more closely to what is already there.'
  },
  {
    title: 'Campfire Conversations',
    description:
      'Small circle conversations that make room for honesty, warmth, and lived experience.'
  },
  {
    title: 'Shared Silence',
    description:
      'Space to be together without performance, allowing silence to become part of the practice.'
  }
];

export const retreatSchedule: RetreatDay[] = [
  {
    day: 'Day One',
    title: 'A gentle arrival into the forest',
    sessions: [
      {
        time: '9:00 AM',
        title: 'Arrival',
        detail:
          'Participants arrive at the retreat venue. Welcome tea is served while everyone settles into the space. Phones are encouraged to remain on silent.'
      },
      {
        time: '9:45 AM',
        title: 'Opening Circle',
        detail:
          'A gentle introduction. We meet one another, share intentions, and begin creating a space built on trust, curiosity, and presence.'
      },
      {
        time: '10:30 AM',
        title: 'Forest Walk',
        detail:
          'A slow guided walk through the surrounding rainforest. There is no destination. Only observation.'
      },
      {
        time: '12:30 PM',
        title: 'Farm-to-Table Lunch',
        detail:
          'A seasonal vegetarian meal prepared using locally sourced ingredients. Conversation is welcome. Silence is equally welcome.'
      },
      {
        time: '2:00 PM',
        title: 'Rest & Reflection',
        detail:
          'Unstructured time. Journal. Read. Nap. Sit beneath a tree. Watch the rain. Do nothing.'
      },
      {
        time: '3:30 PM',
        title: 'Tea Ceremony',
        detail:
          'A slow tea ritual inspired by mindfulness rather than tradition. An opportunity to practice attention through simple actions.'
      },
      {
        time: '4:30 PM',
        title: 'Guided Journaling',
        detail:
          'Prompt-based reflective writing. No writing experience is required. The goal is honesty, not perfection.'
      },
      {
        time: '6:00 PM',
        title: 'Sunset Walk',
        detail:
          'A quiet walk through the forest as evening approaches. Observe how the landscape changes with fading light.'
      },
      {
        time: '7:00 PM',
        title: 'Campfire Dinner & Conversation',
        detail:
          'Dinner is shared around a fire. The evening is intentionally unstructured. Stories emerge naturally.'
      },
      {
        time: '9:00 PM',
        title: 'Closing Silence',
        detail:
          'Before leaving for the evening, participants spend a few quiet minutes together. No instructions. Just stillness.'
      }
    ]
  },
  {
    day: 'Day Two',
    title: 'A quieter morning, a slower departure',
    sessions: [
      {
        time: '7:00 AM',
        title: 'Sunrise Gathering',
        detail: 'Meet outdoors. Watch the forest wake. No agenda. Simply notice.'
      },
      {
        time: '7:45 AM',
        title: 'Breath & Presence',
        detail:
          'Gentle breathing exercises suitable for everyone. No advanced practice. No performance. Only awareness.'
      },
      {
        time: '8:30 AM',
        title: 'Tea & Light Breakfast',
        detail:
          'Fresh fruit, seasonal local food, handcrafted tea, and slow conversation.'
      },
      {
        time: '9:30 AM',
        title: 'Solo Reflection Walk',
        detail:
          'Participants explore individually. Optional journaling prompts are provided. Walk slowly. Pause often. Leave no trace.'
      },
      {
        time: '11:00 AM',
        title: 'Closing Circle',
        detail:
          'We gather once more. Participants are invited, but never required, to share what they are taking home from the experience.'
      },
      {
        time: '12:00 PM',
        title: 'Farewell Lunch',
        detail: 'A final shared meal. Simple. Seasonal. Nourishing.'
      },
      {
        time: '1:30 PM',
        title: 'Departure',
        detail:
          'No formal goodbye. Only gratitude. The retreat ends. The practice continues.'
      }
    ]
  }
];

export const includedItems = [
  'Guided forest walks',
  'Tea ceremonies',
  'Journaling prompts',
  'Seasonal farm-to-table meals',
  'Campfire gathering',
  'Reflection materials'
] as const;

export const bringItems = [
  'Comfortable walking shoes',
  'Reusable water bottle',
  'Journal, optional',
  'Light rain jacket',
  'Warm layer for the evening',
  'An open mind'
] as const;

export const principles = [
  'Presence over productivity.',
  'Curiosity over certainty.',
  'Listening over speaking.',
  'Simplicity over excess.',
  'Nature over distraction.'
] as const;

export const whyEleven = [
  { value: '11', label: 'people' },
  { value: '2', label: 'days' },
  { value: '1', label: 'forest' }
] as const;

export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/1.png', alt: 'Blue lotus flower in deep shadow with dew.', span: 'tall' },
  { src: '/images/gallery/2.png', alt: 'Rain-soaked rainforest floor and soft mist.', span: 'wide' },
  { src: '/images/gallery/3.png', alt: 'Forest path framed by moss, trunks, and filtered light.', span: 'default' },
  { src: '/images/gallery/4.png', alt: 'Single water droplet on a leaf in low light.', span: 'default' }
];

export const applicationDetails = {
  month: 'October 2026',
  location: 'Kodaikanal',
  capacityNumber: '11',
  capacityLabel: 'Participants',
  note: 'Applications reviewed personally.'
} as const;

export const footerDetails = {
  instagram: 'https://instagram.com/bluelotusexperience',
  email: 'hello@bluelotusexperience.com',
  location: 'Kodaikanal, Tamil Nadu'
} as const;
