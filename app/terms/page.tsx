import type { Metadata } from 'next';

import { footerDetails } from '@/content/site';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for applying to and attending Blue Lotus Experience.',
  alternates: {
    canonical: '/terms'
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/terms`,
    title: `Terms & Conditions \u00b7 ${siteConfig.shortName}`,
    description: 'Terms and conditions for applying to and attending Blue Lotus Experience.'
  }
};

const sections = [
  {
    title: 'Application & acceptance',
    body: [
      'Submitting an application does not guarantee a seat. Applications are reviewed personally, and the group is intentionally kept small.',
      'If your application is accepted, you will receive a direct confirmation by email along with payment details and next steps.'
    ]
  },
  {
    title: 'Group size',
    body: [
      'This retreat is intentionally limited to eleven participants. This is a core part of the experience, not a scheduling constraint, and it will not be exceeded.'
    ]
  },
  {
    title: 'What is included',
    body: [
      'Your fee covers guided forest walks, tea ceremonies, journaling sessions, seasonal farm-to-table meals, the campfire gathering, and reflection materials for the two days of the retreat.'
    ]
  },
  {
    title: 'What is not included',
    body: [
      'Transportation to and from Kodaikanal is not included.',
      'Accommodation is not included. We are happy to share a short list of nearby stays if it would help your planning.'
    ]
  },
  {
    title: 'Payment',
    body: [
      'A place is only confirmed once payment is received, following your acceptance. Payment instructions are sent by email.'
    ]
  },
  {
    title: 'Cancellations',
    body: [
      'If your plans change, write to us as early as possible. Cancellations are reviewed personally, and we will always respond with care.'
    ]
  },
  {
    title: 'Health & accessibility',
    body: [
      'We ask about accessibility needs, medical considerations, and allergies during the application so we can prepare thoughtfully. Please let us know of any changes before the retreat begins.',
      'Participants are responsible for any medication, treatment, or equipment they personally require during their stay.'
    ]
  },
  {
    title: 'Assumption of risk',
    body: [
      'The retreat takes place outdoors, in and around forest terrain, and includes walking on uneven ground. Participants take part at their own discretion and are responsible for their own safety and wellbeing throughout.'
    ]
  },
  {
    title: 'Conduct',
    body: [
      'This is a small, intimate group built on trust and mutual respect. We ask every participant to be considerate of others\u2019 privacy, pace, and comfort throughout the retreat.'
    ]
  },
  {
    title: 'Contact',
    body: [
      `Questions about these terms can be sent to ${footerDetails.email}.`
    ]
  }
];

export default function TermsPage() {
  return (
    <main id="content" className="bg-background">
      <article className="relative isolate px-6 pb-[6rem] pt-[10rem] sm:px-8 lg:px-10 lg:pt-[12rem]">
        <div className="mx-auto max-w-3xl">
          <p className="font-ui text-[0.7rem] uppercase tracking-[0.34em] text-gold/80">
            Blue Lotus Experience
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-normal leading-[1.2] tracking-normal text-text text-balance">
            Terms &amp; Conditions
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted">
            These terms apply to anyone applying for or attending Blue Lotus Experience. If
            anything here is unclear, write to us before you apply.
          </p>

          <div className="mt-14 space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-t border-white/8 pt-8">
                <h2 className="font-display text-[1.4rem] font-normal leading-[1.2] tracking-normal text-text">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph, index) => (
                    <p key={index} className="text-pretty text-[0.96rem] leading-7 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
