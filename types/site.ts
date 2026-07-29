export type NavLink = {
  label: string;
  href: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  span?: 'wide' | 'tall' | 'default';
};

export type ExperienceItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ApplicationStep = {
  title: string;
  detail: string;
};

export type RhythmItem = {
  time: string;
  title: string;
  detail: string;
};

export type RetreatSession = {
  time: string;
  title: string;
  detail: string;
};

export type RetreatDay = {
  day: string;
  title: string;
  sessions: RetreatSession[];
};
