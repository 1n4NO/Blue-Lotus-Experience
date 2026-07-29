import { cn } from '@/lib/cn';

type IllustrationKind = 'forest' | 'tea' | 'fire' | 'journal' | 'silence';

type LineIllustrationProps = {
  kind: IllustrationKind;
  className?: string;
};

const strokes = 'none';

export function LineIllustration({ kind, className }: LineIllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={cn('h-20 w-20 text-gold/80', className)}
      fill={strokes}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === 'forest' ? (
        <>
          <path d="M18 94c8-17 18-29 27-39 8-8 16-17 19-31" />
          <path d="M60 24c4 11 7 20 13 29 8 13 20 24 29 41" />
          <path d="M30 56c7 0 12-5 18-9" />
          <path d="M53 46c7 1 12 5 17 10" />
          <path d="M71 35c6 3 11 8 16 15" />
          <path d="M24 94h72" />
          <circle cx="43" cy="39" r="6" />
          <circle cx="76" cy="31" r="7" />
        </>
      ) : null}
      {kind === 'tea' ? (
        <>
          <path d="M39 50h37v18c0 11-8 20-19 20h-2c-10 0-18-8-18-18V50Z" />
          <path d="M76 56h7c5 0 9 4 9 9s-4 9-9 9h-5" />
          <path d="M48 42c0-5 3-9 3-14" />
          <path d="M58 39c0-4 2-7 3-11" />
          <path d="M68 42c0-5 3-9 3-14" />
          <path d="M44 86h32" />
        </>
      ) : null}
      {kind === 'fire' ? (
        <>
          <path d="M59 23c3 9-3 14-7 20-4 6-6 11-3 17 2 5 7 7 10 12 4 6 4 15-1 22" />
          <path d="M60 25c7 6 14 10 18 18 6 10 6 21 1 31-4 8-12 13-19 16-9 4-20 5-30 3" />
          <path d="M26 95h67" />
          <path d="M39 88c4-9 10-16 17-21 5 5 10 11 15 21" />
          <path d="M48 88c2-5 6-9 11-13 4 4 8 8 11 13" />
        </>
      ) : null}
      {kind === 'journal' ? (
        <>
          <rect x="27" y="24" width="56" height="72" rx="6" />
          <path d="M39 24v72" />
          <path d="M48 39h24" />
          <path d="M48 51h24" />
          <path d="M48 63h16" />
          <path d="M52 78l20-20 6 6-20 20-8 2 2-8Z" />
        </>
      ) : null}
      {kind === 'silence' ? (
        <>
          <path d="M24 60h72" />
          <path d="M32 52c6-9 13-14 20-14 4 0 8 1 12 4 4-3 8-4 12-4 7 0 14 5 20 14" />
          <path d="M40 71c5 7 10 11 20 11s15-4 20-11" />
          <path d="M48 42c-3 5-5 10-5 18" />
          <path d="M72 42c3 5 5 10 5 18" />
        </>
      ) : null}
    </svg>
  );
}
