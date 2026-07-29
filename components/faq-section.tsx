'use client';

import Image from 'next/image';
import { type CSSProperties, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/cn';
import type { FaqItem } from '@/types/site';

type FaqSectionProps = {
  items: FaqItem[];
};

type NotePhase = 'closed' | 'opening' | 'open' | 'closing';

type NoteKind = 'folded' | 'postcard' | 'strip' | 'torn' | 'bookmark';

type NoteLayout = {
  top: string;
  left: string;
  width: string;
  minHeight: string;
  rotate: number;
  zIndex: number;
  kind: NoteKind;
  openX: number;
  openY: number;
  openRotate: number;
};

const OPEN_MS = 780;
const CLOSE_MS = 300;

const NOTE_LAYOUTS: NoteLayout[] = [
  {
    top: '10%',
    left: '8%',
    width: '33%',
    minHeight: '10rem',
    rotate: -4.6,
    zIndex: 16,
    kind: 'folded',
    openX: 72,
    openY: 8,
    openRotate: 1.8
  },
  {
    top: '18%',
    left: '57%',
    width: '36%',
    minHeight: '11.5rem',
    rotate: 4.4,
    zIndex: 18,
    kind: 'postcard',
    openX: -84,
    openY: 10,
    openRotate: -1.4
  },
  {
    top: '37%',
    left: '16%',
    width: '22%',
    minHeight: '7.75rem',
    rotate: -1.8,
    zIndex: 20,
    kind: 'strip',
    openX: 56,
    openY: 4,
    openRotate: 0.9
  },
  {
    top: '53%',
    left: '58%',
    width: '33%',
    minHeight: '10.5rem',
    rotate: 5.2,
    zIndex: 15,
    kind: 'torn',
    openX: -68,
    openY: 6,
    openRotate: 0.6
  },
  {
    top: '68%',
    left: '11%',
    width: '29%',
    minHeight: '9rem',
    rotate: -3.1,
    zIndex: 14,
    kind: 'bookmark',
    openX: 64,
    openY: -2,
    openRotate: 0.8
  }
] as const;

const PAPER_TONES: Record<string, string> = {
  warm: 'from-[#efe6d8] via-[#e4d8c7] to-[#dbceb8]',
  paper: 'from-[#f0e8da] via-[#e5dac7] to-[#d7c8b0]',
  aged: 'from-[#e8ddca] via-[#ddd0b8] to-[#d4c19f]',
  tea: 'from-[#ede3d4] via-[#dfd2be] to-[#d5c5ab]',
  lotus: 'from-[#f1e8db] via-[#e7dbc8] to-[#ddd0ba]'
};

function PaperTexture() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(95,70,42,0.08),transparent_10%),radial-gradient(circle_at_78%_22%,rgba(95,70,42,0.05),transparent_12%),radial-gradient(circle_at_52%_84%,rgba(95,70,42,0.04),transparent_13%)] opacity-75"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(105deg,rgba(78,56,34,0.03)_0,rgba(78,56,34,0.03)_1px,transparent_1px,transparent_9px)] opacity-35 mix-blend-multiply"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12),transparent_16%,transparent_84%,rgba(83,61,39,0.08))] opacity-24"
      />
    </>
  );
}

function NoteIllustration({ kind }: { kind: NoteKind }) {
  if (kind === 'folded') {
    return <span aria-hidden="true" className="absolute right-0 top-0 h-4 w-4 bg-[linear-gradient(135deg,rgba(226,211,187,0.24),rgba(95,70,42,0.08))] [clip-path:polygon(0_0,100%_0,100%_100%)]" />;
  }

  if (kind === 'postcard') {
    return <span aria-hidden="true" className="absolute right-0 top-0 h-5 w-5 bg-[linear-gradient(135deg,rgba(225,210,186,0.18),rgba(95,70,42,0.08))] [clip-path:polygon(0_0,100%_0,100%_100%)]" />;
  }

  if (kind === 'strip') {
    return <span aria-hidden="true" className="absolute right-2 top-3 h-12 w-[1px] bg-[linear-gradient(180deg,rgba(90,65,40,0.18),transparent)]" />;
  }

  if (kind === 'torn') {
    return null;
  }

  return <span aria-hidden="true" className="absolute left-0 bottom-0 h-4 w-4 bg-[linear-gradient(45deg,rgba(226,211,187,0.22),rgba(95,70,42,0.08))] [clip-path:polygon(0_0,100%_100%,0_100%)]" />;
}

function NoteFoldMark({ kind }: { kind: NoteKind }) {
  if (kind === 'folded') {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-6 w-6 bg-[linear-gradient(135deg,rgba(95,70,42,0.18),rgba(226,211,187,0.1),transparent_75%)] [clip-path:polygon(0_0,100%_0,100%_100%)] opacity-70"
      />
    );
  }

  if (kind === 'postcard') {
    return (
      <>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[14%] h-[2px] w-[30%] bg-[linear-gradient(90deg,transparent,rgba(96,69,41,0.28),rgba(96,69,41,0.1),transparent)] rotate-[8deg] opacity-70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[3%] top-[8%] h-4 w-4 bg-[linear-gradient(135deg,rgba(96,69,41,0.14),rgba(226,211,187,0.08),transparent_72%)] [clip-path:polygon(0_0,100%_0,100%_100%)] opacity-65"
        />
      </>
    );
  }

  if (kind === 'strip') {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[12%] h-[68%] w-[1px] bg-[linear-gradient(180deg,rgba(96,69,41,0.18),rgba(96,69,41,0.06),transparent)] opacity-70"
      />
    );
  }

  if (kind === 'torn') {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-[linear-gradient(90deg,transparent,rgba(96,69,41,0.22),rgba(96,69,41,0.1),rgba(96,69,41,0.2),transparent)] mix-blend-multiply opacity-30"
        style={{
          top: '56%',
          left: '-10%',
          width: '122%',
          height: '2px',
          transform: 'rotate(-11deg)',
          transformOrigin: 'center'
        }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 bg-[linear-gradient(45deg,rgba(226,211,187,0.2),rgba(95,70,42,0.08))] [clip-path:polygon(0_0,100%_100%,0_100%)] opacity-65"
    />
  );
}

function NoteArtifact({ src, className, size }: { src: string; className: string; size: number }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute', className)}>
      <Image src={src} alt="" width={size} height={size} className="object-contain" />
    </div>
  );
}

function JournalNote({
  item,
  index,
  layout,
  phase,
  active,
  buttonId,
  panelId,
  buttonRef,
  onToggle,
  onKeyDown,
  reduceMotion
}: {
  item: FaqItem;
  index: number;
  layout: NoteLayout;
  phase: NotePhase;
  active: boolean;
  buttonId: string;
  panelId: string;
  buttonRef: (node: HTMLButtonElement | null) => void;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  reduceMotion: boolean;
}) {
  const isOpen = phase === 'open' || phase === 'opening' || phase === 'closing';
  const isOpening = phase === 'opening';
  const isClosing = phase === 'closing';
  const showAnswer = phase === 'open';
  const openMotionX = layout.openX;
  const openMotionY = layout.openY;
  const openMotionRotate = layout.openRotate;

  const styleVars = {
    '--note-top': layout.top,
    '--note-left': layout.left,
    '--note-width': layout.width,
    '--note-min-h': layout.minHeight
  } as CSSProperties;

  const isSettledOpen = phase === 'opening' || phase === 'open';

  const shapeClass =
    layout.kind === 'folded'
      ? '[clip-path:polygon(0_0,92%_0,100%_9%,100%_100%,0_100%)]'
      : layout.kind === 'postcard'
        ? '[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'
        : layout.kind === 'strip'
          ? '[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'
          : layout.kind === 'torn'
            ? '[clip-path:polygon(2%_0,94%_0,100%_8%,98%_92%,91%_100%,7%_98%,0_90%,0_6%)]'
            : '[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]';

  return (
    <motion.div
      className="relative w-full lg:absolute lg:[top:var(--note-top)] lg:[left:var(--note-left)] lg:[width:var(--note-width)]"
      style={{
        ...styleVars,
        zIndex: active ? 1000 : layout.zIndex
      }}
      animate={{
        x: isSettledOpen ? openMotionX : 0,
        y: isSettledOpen ? openMotionY : 0,
        rotate: isSettledOpen ? openMotionRotate : layout.rotate,
        opacity: active ? 1 : phase === 'closed' ? 0.98 : 0.7
      }}
      transition={{ duration: reduceMotion ? 0.12 : isClosing ? 0.32 : 0.78, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          'relative isolate',
          index === 3
            ? active
              ? 'shadow-none'
              : 'shadow-none'
            : active
              ? 'shadow-[0_28px_64px_rgba(0,0,0,0.38)]'
              : 'shadow-[0_14px_34px_rgba(0,0,0,0.16)]'
        )}
        style={{ minHeight: 'var(--note-min-h)' }}
      >
        <div className={cn('relative overflow-hidden bg-gradient-to-br', PAPER_TONES[layout.kind === 'bookmark' ? 'lotus' : layout.kind === 'torn' ? 'aged' : layout.kind === 'strip' ? 'tea' : layout.kind === 'postcard' ? 'paper' : 'warm'], shapeClass)}>
          <PaperTexture />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,234,220,0.14),rgba(244,234,220,0)_26%,rgba(78,56,34,0.05)_100%)] opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0,transparent_44%,rgba(77,55,33,0.1)_45%,transparent_49%)] opacity-50" />
          <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(120,88,53,0.08),inset_0_-1px_0_rgba(78,56,34,0.08)]" />
          {layout.kind === 'torn' ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(76,54,33,0.09),transparent_12%)] opacity-60" />
          ) : null}
          <NoteFoldMark kind={layout.kind} />
          <NoteIllustration kind={layout.kind} />

          {index === 4 ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[9] bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.18),transparent_14%),radial-gradient(circle_at_78%_24%,rgba(96,69,41,0.08),transparent_16%),radial-gradient(circle_at_52%_80%,rgba(96,69,41,0.06),transparent_18%),repeating-linear-gradient(108deg,rgba(94,68,42,0.035)_0,rgba(94,68,42,0.035)_1px,transparent_1px,transparent_11px)] opacity-75 mix-blend-multiply"
            />
          ) : null}

          {index === 1 ? (
            <NoteArtifact
              src="/images/petal.png"
              size={88}
              className="right-[-0.9rem] bottom-[-0.55rem] z-10 h-20 w-20 rotate-[14deg] opacity-90"
            />
          ) : null}

          {index === 4 ? (
            <NoteArtifact
              src="/images/pressed-lotus.png"
              size={96}
              className="right-[-0.85rem] bottom-[0.65rem] z-10 h-20 w-20 rotate-[7deg] opacity-88"
            />
          ) : null}

          <div className="relative z-20 flex min-h-[var(--note-min-h)] flex-col px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <span className="font-ui text-[0.58rem] uppercase tracking-[0.36em] text-[#8b6f46]">
                {String(index + 1).padStart(2, '0')}
              </span>

              {(phase === 'open' || phase === 'opening' || phase === 'closing') ? (
                <button
                  type="button"
                  onClick={onToggle}
                  onKeyDown={onKeyDown}
                  className="font-ui text-[0.58rem] uppercase tracking-[0.36em] text-[#8b6f46] transition duration-300 hover:text-[#6f583d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                >
                  Fold back
                </button>
              ) : null}
            </div>

            <div className="mt-4 max-w-[19rem]">
              <p
                className={cn(
                  'font-display text-[#24170f] text-balance',
                  active ? 'text-[clamp(1.08rem,1.55vw,1.5rem)] leading-[1.08]' : 'text-[clamp(0.98rem,1.15vw,1.15rem)] leading-[1.08]'
                )}
              >
                {item.question}
              </p>
            </div>

            {showAnswer ? (
              <motion.div
                initial={false}
                animate={{ opacity: isClosing ? 0 : 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="pt-5"
              >
                <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(76,56,36,0.18),transparent)]" />
                <p className="mt-4 max-w-[25rem] text-[0.96rem] leading-[1.84] text-[#2b1f14] sm:text-[0.98rem]">
                  {item.answer}
                </p>
              </motion.div>
            ) : null}
          </div>
        </div>

        {!isOpen ? (
          <button
            ref={buttonRef}
            id={buttonId}
            type="button"
            aria-expanded={active}
            aria-controls={panelId}
            onClick={onToggle}
            onKeyDown={onKeyDown}
            className="absolute inset-0 z-30 block text-left outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
          >
            <span className="sr-only">{item.question}</span>
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}

export function FaqSection({ items }: FaqSectionProps) {
  const sectionId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<NotePhase>('closed');
  const queuedIndexRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();

  const openMs = reduceMotion ? 120 : OPEN_MS;
  const closeMs = reduceMotion ? 120 : CLOSE_MS;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const openNote = (index: number) => {
    clearTimer();
    queuedIndexRef.current = null;
    setActiveIndex(index);
    setPhase('opening');
    timerRef.current = window.setTimeout(() => {
      setPhase('open');
      timerRef.current = null;
    }, openMs);
  };

  const closeNote = () => {
    clearTimer();
    setPhase('closing');
    timerRef.current = window.setTimeout(() => {
      const nextIndex = queuedIndexRef.current;
      queuedIndexRef.current = null;

      if (nextIndex === null) {
        setActiveIndex(null);
        setPhase('closed');
        timerRef.current = null;
        return;
      }

      setActiveIndex(nextIndex);
      setPhase('opening');
      timerRef.current = window.setTimeout(() => {
        setPhase('open');
        timerRef.current = null;
      }, openMs);
    }, closeMs);
  };

  const toggle = (index: number) => {
    if (activeIndex === index) {
      if (phase === 'closed') {
        openNote(index);
        return;
      }

      queuedIndexRef.current = null;
      closeNote();
      return;
    }

    if (activeIndex === null) {
      openNote(index);
      return;
    }

    queuedIndexRef.current = index;
    closeNote();
  };

  const focusIndex = (index: number) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    buttonRefs.current[next]?.focus();
  };

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusIndex(index + 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusIndex(index - 1);
      return;
    }

    if (event.key === 'Escape' && activeIndex !== null) {
      event.preventDefault();
      queuedIndexRef.current = null;
      closeNote();
    }
  };

  const layouts = useMemo(() => NOTE_LAYOUTS, []);

  return (
    <section
      id="before-you-arrive"
      className="relative overflow-hidden bg-[#090706] px-6 py-[7.5rem] sm:px-8 lg:px-10 lg:py-[9rem]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_36%),radial-gradient(circle_at_50%_20%,rgba(120,90,54,0.08),transparent_22%),linear-gradient(180deg,rgba(24,17,12,0.72),rgba(9,7,6,0.94))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent_14%,transparent_86%,rgba(255,255,255,0.015))] opacity-60" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.015)_0,rgba(255,255,255,0.015)_1px,transparent_1px,transparent_2px)] opacity-25" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr,1.18fr] lg:items-start lg:gap-16">
        <div className="max-w-md space-y-5 lg:sticky lg:top-28">
          <p className="font-ui text-[0.72rem] uppercase tracking-[0.34em] text-gold/80">
            BEFORE YOU ARRIVE
          </p>
          <h2 className="font-display text-[clamp(2.5rem,4.6vw,5rem)] leading-[0.96] tracking-[-0.035em] text-text text-balance">
            A few things
            <br />
            you may wonder.
          </h2>
          <p className="max-w-sm text-pretty text-[0.96rem] leading-7 text-muted">
            Everything you need to know, shared with the same care as the retreat itself.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-[min(100%,72rem)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_42%,rgba(64,44,27,0.54),transparent_45%),radial-gradient(circle_at_70%_62%,rgba(9,7,6,0.9),transparent_52%)] blur-2xl" />
            <div className="relative min-h-[42rem] lg:min-h-[44rem]">
              <div className="absolute inset-0 bg-[#1a120d] shadow-[0_42px_90px_rgba(0,0,0,0.44)]" />
              <div className="absolute inset-[1rem] bg-[#16100c]" />
              <div className="absolute inset-[1.65rem] bg-[#211815]">
                <div className="absolute inset-y-0 left-[3.5%] w-[39%] bg-[linear-
				gradient(90deg,rgba(247,240,228,0.94),rgba(231,220,202,0.88)_70%,rgba(219,205,186,0.96))]
				shadow-[inset_-1px_0_0_rgba(71,53,35,0.1)]">
					<div
					aria-hidden="true"
					className="pointer-events-none absolute right-0 bottom-0 top-0 z-[10]  w-[100%]
					rotate-[0.5deg] opacity-88"
					>
					<Image
						src="/images/paper.png"
						alt=""
						fill
						sizes="(max-width: 1024px) 100vw, 72rem"
						className="object-cover opacity-22 mix-blend-soft-light"
					/>
					</div>
						<div
						aria-hidden="true"
						className="pointer-events-none absolute left-[35%] top-[10%] z-30 h-20 w-60 -translate-x-1/2 -translate-y-1/2 rotate-[90deg] opacity-88"
						>
						<Image src="/images/fern-2.png" alt="" fill sizes="80px" className="object-contain" />
						</div>
						<div
						aria-hidden="true"
						className="pointer-events-none absolute left-[36%] top-[8%] z-[31] h-5 w-28 -translate-x-1/2 -translate-y-1/2 rotate-[180deg] opacity-78"
						>
						<span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(210,194,164,0.16),rgba(236,226,206,0.82)_35%,rgba(210,194,164,0.18)_70%,rgba(186,171,143,0.14))] shadow-[0_1px_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(76,55,33,0.06)]" />
						<span className="absolute left-[18%] top-[18%] h-[64%] w-[10%] -skew-y-12 bg-[rgba(156,138,108,0.14)]" />
						<span className="absolute right-[18%] top-[18%] h-[64%] w-[10%] skew-y-12 bg-[rgba(156,138,108,0.14)]" />
						</div>
					</div>
                <div className="absolute inset-y-0 right-[3.5%] w-[39%] bg-[linear-gradient(270deg,rgba(247,240,228,0.94),rgba(231,220,202,0.88)_70%,rgba(219,205,186,0.96))] shadow-[inset_1px_0_0_rgba(71,53,35,0.1)]">
					<div
					aria-hidden="true"
					className="pointer-events-none absolute right-0 bottom-0 top-0 z-[10]  w-[100%]
					rotate-[184deg] opacity-88"
					>
					<Image
						src="/images/paper.png"
						alt=""
						fill
						sizes="(max-width: 1024px) 100vw, 72rem"
						className="object-cover opacity-22 mix-blend-soft-light"
					/>
					</div>
					<div
					aria-hidden="true"
					className="pointer-events-none absolute right-[-35%] top-[8%] z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[120deg] opacity-88"
					>
					<Image src="/images/petal-2.png" alt="" fill sizes="80px" className="object-contain" />
					</div>
					<div
					aria-hidden="true"
					className="pointer-events-none absolute right-0 bottom-[-20px] top-[-20px] z-[10]  w-[100%]
					rotate-[181deg] opacity-88
					shadow-[10px_1px_20px_rgba(0,0,0,0.1)]"
					>
					<Image
						src="/images/paper-1.png"
						alt=""
						fill
						sizes="(max-width: 1024px) 100vw, 72rem"
						className="object-cover opacity-22 mix-blend-soft-light"
					/>
					</div>
				</div>
                <div className="absolute inset-y-0 left-1/2 w-[6%] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(16,12,10,0.14),rgba(9,7,6,0.34)_50%,rgba(16,12,10,0.14))] opacity-80 blur-[1px]" />
				<div
				aria-hidden="true"
				className="pointer-events-none absolute right-[5%] top-[8%] z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[120deg] opacity-88"
				>
				<Image src="/images/fern.png" alt="" fill sizes="80px" className="object-contain" />
				</div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.02),transparent_34%)]" />
                <Image
                  src="/images/paper.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 72rem"
                  className="object-cover opacity-22 mix-blend-soft-light"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.22))]" />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[8.25%] bottom-[9.85rem] z-[21] h-36 w-36 rotate-[6deg] opacity-96"
                >
                  <Image src="/images/note-1.png" alt="" fill sizes="144px" className="object-contain" />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[7.4%] bottom-[0.5rem] z-[23] h-20 w-20 rotate-[-10deg] opacity-82"
                >
                  <Image src="/images/scribble.png" alt="" fill sizes="80px" className="object-contain" />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[10.2%] bottom-[1.7rem] z-[14] h-40 w-40 rotate-[-18deg] opacity-88"
                >
                  <Image src="/images/pencil.png" alt="" fill sizes="80px" className="object-contain" />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[2.6%] bottom-[2.1rem] z-[10] h-32 w-32 rotate-[-8deg] opacity-1"
                >
                  <Image src="/images/stain.png" alt="" fill sizes="96px" className="object-contain" />
                </div>

				<div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[-3%] top-[10.1rem] z-[10] h-32 w-32 rotate-[90deg] opacity-88"
                >
                  <Image src="/images/moss.png" alt="" fill sizes="96px" className="object-contain" />
                </div>


                <div className="absolute inset-0">
                  {items.map((item, index) => {
                    const layout = layouts[index] ?? layouts[layouts.length - 1];
                    const buttonId = `${sectionId}-note-${index}-button`;
                    const panelId = `${sectionId}-note-${index}-panel`;
                    const itemPhase = activeIndex === index ? phase : 'closed';

                    return (
                      <JournalNote
                        key={item.question}
                        item={item}
                        index={index}
                        layout={layout}
                        phase={itemPhase}
                        active={activeIndex === index}
                        buttonId={buttonId}
                        panelId={panelId}
                        buttonRef={(node) => {
                          buttonRefs.current[index] = node;
                        }}
                        onToggle={() => toggle(index)}
                        onKeyDown={(event) => onKeyDown(index, event)}
                        reduceMotion={!!reduceMotion}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
