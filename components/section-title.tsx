import { cn } from '@/lib/cn';

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className
}: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 font-ui text-[0.66rem] uppercase tracking-[0.36em] text-gold/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-3xl font-display text-[clamp(2.3rem,5.2vw,5rem)] leading-[0.92] tracking-[-0.025em] text-text text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-[0.98rem] leading-7 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
