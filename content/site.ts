import type {
  ApplicationStep,
  ExperienceItem,
  Facilitator,
  FounderNote,
  GalleryImage,
  FaqItem,
  NavLink,
  RetreatDay
} from '@/types/site';

export const navigation: NavLink[] = [
  { label: 'Experience', href: '/#experience' },
  { label: 'Philosophy', href: '/#philosophy' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Journal', href: '/#journal' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export const applicationUrl = 'https://deformity.ai/d/2CQYLc2wbqYl';

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

export const experienceIllustrations = [
  { title: 'Forest Walks', kind: 'forest' },
  { title: 'Tea Ceremony', kind: 'tea' },
  { title: 'Campfire Conversations', kind: 'fire' },
  { title: 'Journaling', kind: 'journal' },
  { title: 'Shared Silence', kind: 'silence' }
] as const;

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
          'A slow tea ritual, held more as a practice than a performance. An opportunity to practice attention through simple actions.'
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
        title: 'Forest Bathing Ritual',
        detail:
          'Participants explore individually. Optional journaling prompts are provided. Walk slowly. Pause often. Let the forest set the pace.'
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

export const whoThisIsFor = [
  'Busy professionals',
  'Founders',
  'Creatives'
] as const;

export const whatToExpect = [
  'Forest Walks',
  'Tea Ceremony',
  'Journaling',
  'Shared Meals',
  'Campfire',
  'Reflection'
] as const;

export const faqItems: FaqItem[] = [
  {
    question: 'Is accommodation included?',
    answer:
      'Accommodation is not included in the retreat fee. We can share nearby stays in Kodaikanal if you would like a short list.'
  },
  {
    question: 'What happens after I apply?',
    answer:
      'Applications are reviewed personally. If selected, you receive a direct confirmation and payment details by email.'
  },
  {
    question: 'Can beginners attend?',
    answer:
      'Yes. No experience with meditation, journaling, or ceremony is required. The retreat is designed to be welcoming.'
  },
  {
    question: 'What if it rains?',
    answer:
      'Rain is part of the experience in the forest. The schedule adapts gently, and indoor moments are held when needed.'
  },
  {
    question: 'Can I cancel?',
    answer:
      'If your plans change, write to us as early as possible. We review cancellations personally and respond with care.'
  }
];

export const applicationProcess: ApplicationStep[] = [
  {
    title: 'Apply',
    detail: 'Tell us a little about yourself and why this retreat feels relevant right now.'
  },
  {
    title: 'Review',
    detail: 'Applications are read personally so the group stays balanced and intentionally small.'
  },
  {
    title: 'Acceptance',
    detail: 'If selected, you receive a direct invitation with the next steps and payment details.'
  },
  {
    title: 'Payment',
    detail: 'Secure your place with the retreat fee once your place has been confirmed.'
  },
  {
    title: 'Welcome',
    detail: 'You receive a quiet welcome note, practical guidance, and a gentle arrival rhythm.'
  }
];

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
  { value: '1', label: 'intent' }
] as const;

export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/6.png', alt: 'Blue lotus tea ceremony.', span: 'wide' },
  { src: '/images/gallery/18.png', alt: 'Rest and reflection in the forest.', span: 'tall' },
  { src: '/images/gallery/12.png', alt: 'Solo reflection in the forest.', span: 'default' },
  { src: '/images/gallery/9.png', alt: 'Mushroom tea in a forest setting.', span: 'default' },
  { src: '/images/gallery/11.png', alt: 'Guided forest walk.', span: 'default' }
];

export const applicationDetails = {
  month: 'November',
  location: 'Kodaikanal',
  capacityNumber: '11',
  capacityLabel: 'Participants',
  note: 'Applications reviewed personally.'
} as const;

export const applicationCard = {
  duration: '2 Days',
  participants: '11 Participants',
  price: '₹11,111',
} as const;

export const aboutCopy = {
  title: 'We are not building another escape.',
  subtitle: 'We are building an Experience that helps people remember what it feels like to be fully present.',
  intro:
    'We have more information, more productivity, and more convenience than ever, and somehow less stillness, less silence, and less connection. Blue Lotus exists to bring some of that back.'
} as const;

export const aboutPhilosophyLines = [
  'Your body is your temple.',
  'Nature is your medicine.',
  'Presence is your practice.'
] as const;

export const corePrinciples = [
  {
    title: 'Presence',
    description: 'Be fully where you are.'
  },
  {
    title: 'Simplicity',
    description: 'Remove everything unnecessary.'
  },
  {
    title: 'Intention',
    description: 'Every detail has a purpose.'
  },
  {
    title: 'Nature',
    description: 'Nature is not scenery. Nature is the teacher.'
  },
  {
    title: 'Community',
    description: 'Small groups create deep conversations.'
  }
] as const;

export const brandValues = [
  'Stillness',
  'Craftsmanship',
  'Authenticity',
  'Beauty',
  'Curiosity',
  'Mindfulness',
  'Respect',
  'Sustainability',
  'Slowness',
  'Human Connection'
] as const;

export const aboutManifesto = {
  quote: 'The forest has never been in a hurry.',
  body:
    'Rain does not rush. Trees do not compete. Mountains do not perform. Nature simply exists, and that is really what Blue Lotus is about: helping people remember how that feels, and giving them two days to practice it.'
} as const;

export const founderNote: FounderNote = {
  name: 'Founder Name',
  role: 'Founder, Blue Lotus Experience',
  paragraphs: [
    'Blue Lotus started with a simple realisation. We had built full, convenient lives with very little room left for presence.',
    'This Experience is not an escape from everyday life. It is a way to return to it slower: walking without a destination, drinking tea without distraction, sitting with people until they stop feeling like strangers.',
    'Eleven people, two days, one forest. We have never felt the need for more than that.'
  ]
} as const;

export const facilitators: Facilitator[] = [
  {
    modality: 'Breathwork & Sound Healing',
    name: 'Facilitator Name',
    role: 'Breathwork & Sound Healing Facilitator',
    bio: 'Breath and sound move through this session together, easing the body between conscious breathing and resonant tone. No performance is involved, only attention.',
    initials: 'BS'
  },
  {
    modality: 'Tea Ceremony & Journaling',
    name: 'Facilitator Name',
    role: 'Tea Ceremony & Journaling Facilitator',
    bio: 'A slow tea ritual gives way to quiet, guided writing. Each cup is a chance to notice the warmth and the pause between sips, and each page is a chance to listen to what is already there.',
    initials: 'TJ'
  },
  {
    modality: 'Forest Bathing',
    name: 'The Blue Lotus Team',
    role: 'Forest Bathing',
    bio: 'This one is held together rather than by a single guide. A practice of walking slowly and noticing fully, with no destination and no pace to keep, only the forest and the attention it asks for.',
    initials: 'BL'
  }
];

export const footerDetails = {
  instagram: 'https://www.instagram.com/experience.blue.lotus/',
  email: 'the.blue.lotus@outlook.com',
  location: 'Kodaikanal, Tamil Nadu'
} as const;
