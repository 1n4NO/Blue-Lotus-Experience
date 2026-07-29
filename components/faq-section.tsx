'use client';

import Image from 'next/image';
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/cn';
import type { FaqItem } from '@/types/site';

type FaqSectionProps = {
  items: FaqItem[];
};

type NoteState = 'closed' | 'opening' | 'open' | 'closing';

type NoteStyle = {
  top: string;
  left: string;
  width: string;
  rotate: number;
  zIndex: number;
  tucked: 'left' | 'right' | 'center';
  tone: 'warm' | 'paper' | 'aged' | 'tea' | 'lotus';
  accent?: 'lotus' | 'moss' | 'tea-stain' | 'sketch';
};

const OPEN_MS = 860;
const CLOSE_MS = 240;

const NOTE_STYLES: NoteStyle[] = [
  { top: '11%', left: '6%', width: '33%', rotate: -2.2, zIndex: 6, tucked: 'left', tone: 'warm', accent: 'lotus' },
  { top: '23%', left: '61%', width: '30%', rotate: 1.7, zIndex: 5, tucked: 'right', tone: 'paper', accent: 'moss' },
  { top: '38%', left: '20%', width: '34%', rotate: -0.9, zIndex: 7, tucked: 'center', tone: 'aged', accent: 'tea-stain' },
  { top: '58%', left: '56%', width: '31%', rotate: 1.2, zIndex: 4, tucked: 'right', tone: 'tea', accent: 'sketch' },
  { top: '70%', left: '9%', width: '35%', rotate: -1.4, zIndex: 3, tucked: 'left', tone: 'lotus' }
];

const PAPER_TONES: Record<NoteStyle['tone'], string> = {
  warm: 'from-[#ede5d7] via-[#e4dacc] to-[#dbcfbc]',
  paper: 'from-[#ece3d3] via-[#e5d8c3] to-[#d8c8af]',
  aged: 'from-[#e6dbc8] via-[#ddcfb7] to-[#d4c19f]',
  tea: 'from-[#e9dfd0] via-[#dfd1bd] to-[#d6c4aa]',
  lotus: 'from-[#efe7da] via-[#e6dbc8] to-[#ddd0bb]'
};

function GrainLayer() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(105,78,48,0.08),transparent_12%),radial-gradient(circle_at_80%_24%,rgba(105,78,48,0.05),transparent_11%),radial-gradient(circle_at_50%_82%,rgba(105,78,48,0.04),transparent_13%)] opacity-70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(105deg,rgba(77,55,33,0.03)_0,rgba(77,55,33,0.03)_1px,transparent_1px,transparent_9px)] opacity-35 mix-blend-multiply"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.16),transparent_18%,transparent_82%,rgba(83,61,39,0.08))] opacity-25"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_24px_42px_rgba(255,255,255,0.08),inset_0_-20px_34px_rgba(72,52,31,0.06)]"
      />
    </>
  );
}

function Bookmark({ accent }: { accent?: NoteStyle['accent'] }) {
  if (accent === 'lotus') {
    return (
      <div aria-hidden="true" className="absolute -right-3 top-8 h-14 w-4">
        <div className="absolute inset-0 rotate-[10deg] bg-[#7c96b7]/40 shadow-[0_6px_16px_rgba(0,0,0,0.12)]" />
        <svg viewBox="0 0 24 64" className="absolute inset-0 h-full w-full rotate-[10deg]" fill="none">
          <path d="M12 5C14 11 18 15 20 18C16 19 15 23 12 27C9 23 8 19 4 18C6 15 10 11 12 5Z" fill="#7396ba" fillOpacity="0.55" />
          <path d="M12 24C12 34 12 44 12 58" stroke="#59748f" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (accent === 'moss') {
    return (
      <div aria-hidden="true" className="absolute -left-3 top-8 h-12 w-4 rotate-[-6deg] rounded-full bg-[#5b6744]/45 shadow-[0_6px_16px_rgba(0,0,0,0.12)]" />
    );
  }

  if (accent === 'tea-stain') {
    return (
      <div
        aria-hidden="true"
        className="absolute right-4 top-5 h-14 w-14 rounded-full bg-[radial-gradient(circle,rgba(127,95,51,0.24),rgba(127,95,51,0.05)_55%,transparent_72%)] opacity-65 blur-[0.2px]"
      />
    );
  }

  if (accent === 'sketch') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 80 40"
        className="absolute -left-2 top-7 h-8 w-14 -rotate-12 opacity-45"
        fill="none"
      >
        <path d="M8 28c8-10 13-16 22-16 10 0 17 6 24 6 6 0 11-3 18-9" stroke="#81623d" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M21 20c1 4 4 6 7 8" stroke="#81623d" strokeWidth="1" strokeLinecap="round" />
        <path d="M50 19c2 4 4 6 8 8" stroke="#81623d" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
}

function TuckedNotePreview({
  item,
  index,
  styleInfo,
  active,
  onOpen,
  buttonRef,
  buttonId,
  panelId,
  onKeyDown
}: {
  item: FaqItem;
  index: number;
  styleInfo: NoteStyle;
  active: boolean;
  onOpen: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
  buttonId: string;
  panelId: string;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      ref={buttonRef}
      id={buttonId}
      type="button"
      aria-expanded={active}
      aria-controls={panelId}
      onClick={onOpen}
      onKeyDown={onKeyDown}
      className="group absolute left-1/2 top-1/2 block origin-center text-left outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
      style={{
        top: styleInfo.top,
        left: styleInfo.left,
        width: styleInfo.width,
        zIndex: active ? 30 : styleInfo.zIndex,
        rotate: active ? 0 : styleInfo.rotate,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <div
        className={cn(
          'relative shadow-[0_14px_26px_rgba(0,0,0,0.17)] transition-all duration-500 ease-calm',
          'bg-transparent'
        )}
      >
        <div className="relative min-h-[8.2rem]">
          <div className={cn('absolute inset-0 bg-gradient-to-br', PAPER_TONES[styleInfo.tone])} />
          <Image
            src="/images/paper.png"
            alt=""
            fill
            sizes="(max-width: 768px) 80vw, 28vw"
            className="object-cover opacity-38 mix-blend-soft-light"
          />
          <GrainLayer />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_34%,rgba(80,58,33,0.05)_100%)] opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0,transparent_46%,rgba(79,58,34,0.09)_47%,transparent_49%)] opacity-40" />
          <Bookmark accent={styleInfo.accent} />

          <div className="relative z-10 flex h-full min-h-[8.2rem] flex-col px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <span className="font-ui text-[0.58rem] uppercase tracking-[0.36em] text-[#8b6f46]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <p
              className={cn(
                'mt-4 max-w-[18rem] font-display text-[#24170f] text-balance',
                active ? 'text-[clamp(1.15rem,1.6vw,1.75rem)] leading-[1.06]' : 'text-[clamp(0.96rem,1.15vw,1.15rem)] leading-[1.12]'
              )}
            >
              {item.question}
            </p>

            <div className="mt-auto pt-6" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function OpenNote({
  item,
  index,
  styleInfo,
  state,
  buttonId,
  panelId,
  reduceMotion,
  onToggle
}: {
  item: FaqItem;
  index: number;
  styleInfo: NoteStyle;
  state: NoteState;
  buttonId: string;
  panelId: string;
  reduceMotion: boolean;
  onToggle: () => void;
}) {
  const opening = state === 'opening';
  const open = state === 'open';
  const closing = state === 'closing';
  const showContent = state !== 'closed';

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-40 block origin-center text-left outline-none"
      style={{
        top: styleInfo.top,
        left: styleInfo.left,
        width: `calc(${styleInfo.width} + clamp(6rem, 7vw, 8.5rem))`,
        zIndex: 40,
        rotate: 0,
        translateX: '-50%',
        translateY: '-50%'
      }}
      initial={false}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : closing
            ? { opacity: 0.985, scale: 0.996 }
            : { opacity: 1, scale: 1 }
      }
      transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: [0.2, 0.95, 0.26, 1] }}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[6%] top-[-0.95rem] h-9 w-[72%] shadow-[0_22px_44px_rgba(0,0,0,0.24)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,237,224,0.98),rgba(226,213,192,0.98))]" />
          <div className="absolute inset-x-4 top-6 h-px bg-[linear-gradient(90deg,transparent,rgba(74,55,35,0.16),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_45%,rgba(88,63,38,0.09)_46%,transparent_47%)] opacity-55" />
        </div>

        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            'relative text-left shadow-[0_30px_78px_rgba(0,0,0,0.38)]',
            showContent ? 'bg-[#e7dccb]' : 'bg-[#e3d6c0]'
          )}
          style={{ perspective: undefined }}
          initial={false}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: [0.2, 0.95, 0.26, 1] }}
        >
          <div className="relative">
            <div className={cn('absolute inset-0 bg-gradient-to-br', PAPER_TONES[styleInfo.tone])} />
            <Image
              src="/images/paper.png"
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 30vw"
              className="object-cover opacity-36 mix-blend-soft-light"
            />
            <GrainLayer />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_28%,rgba(77,55,33,0.05)_100%)] opacity-55" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0,transparent_47%,rgba(77,55,33,0.08)_49%,transparent_52%)] opacity-40" />
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-14"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,236,223,0.98),rgba(226,214,195,0.96))]" />
              <div className="absolute inset-x-5 top-9 h-px bg-[linear-gradient(90deg,transparent,rgba(76,56,36,0.16),transparent)]" />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_45%,rgba(88,63,38,0.09)_46%,transparent_47%)] opacity-45" />
            </motion.div>

            <div className="relative z-10 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
              <div className="flex items-start justify-between gap-5">
                <span className="font-ui text-[0.58rem] uppercase tracking-[0.36em] text-[#8b6f46]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={onToggle}
                  className="font-ui text-[0.58rem] uppercase tracking-[0.36em] text-[#8b6f46] transition duration-300 hover:text-[#6f583d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                >
                  Keep back
                </button>
              </div>

              <h3 className="mt-4 max-w-[25rem] font-display text-[clamp(1.34rem,2vw,2.05rem)] leading-[1.02] tracking-[-0.03em] text-[#24170f] text-balance">
                {item.question}
              </h3>

              <div className="mt-5 h-px bg-[linear-gradient(90deg,transparent,rgba(76,56,36,0.2),transparent)]" />

              {showContent ? (
                <motion.div
                  key={item.question}
                  initial={false}
                  animate={closing ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.2, 0.95, 0.26, 1] }}
                  className="pt-5"
                >
                  <p className="max-w-[26rem] text-[0.98rem] leading-[1.88] text-[#2b1f14] sm:text-[1rem]">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function FaqSection({ items }: FaqSectionProps) {
  const sectionId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [state, setState] = useState<NoteState>('closed');
  const queuedIndexRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();

  const openMs = reduceMotion ? 160 : OPEN_MS;
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
    setState('opening');
    timerRef.current = window.setTimeout(() => {
      setState('open');
      timerRef.current = null;
    }, openMs);
  };

  const closeThenMaybeOpen = () => {
    clearTimer();
    setState('closing');
    timerRef.current = window.setTimeout(() => {
      const nextIndex = queuedIndexRef.current;
      queuedIndexRef.current = null;

      if (nextIndex === null) {
        setActiveIndex(null);
        setState('closed');
        timerRef.current = null;
        return;
      }

      setActiveIndex(nextIndex);
      setState('opening');
      timerRef.current = window.setTimeout(() => {
        setState('open');
        timerRef.current = null;
      }, openMs);
    }, closeMs);
  };

  const toggle = (index: number) => {
    if (activeIndex === index) {
      if (state === 'closed') {
        openNote(index);
        return;
      }

      queuedIndexRef.current = null;
      closeThenMaybeOpen();
      return;
    }

    if (activeIndex === null) {
      openNote(index);
      return;
    }

    queuedIndexRef.current = index;
    closeThenMaybeOpen();
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
      closeThenMaybeOpen();
    }
  };

  const noteStyles = useMemo(() => NOTE_STYLES, []);

  return (
    <section
      id="before-you-arrive"
      className="relative overflow-hidden bg-background px-6 py-[7.5rem] sm:px-8 lg:px-10 lg:py-[9rem]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.045),transparent_44%),radial-gradient(circle_at_20%_16%,rgba(185,151,91,0.06),transparent_18%),radial-gradient(circle_at_84%_14%,rgba(255,255,255,0.03),transparent_16%),linear-gradient(180deg,rgba(9,9,9,0.22),rgba(9,9,9,0.72))]" />
        <div className="absolute inset-0 animate-[floatLight_18s_ease-in-out_infinite] bg-[radial-gradient(circle_at_25%_25%,rgba(255,242,216,0.06),transparent_18%),radial-gradient(circle_at_72%_20%,rgba(255,244,220,0.04),transparent_12%),radial-gradient(circle_at_58%_64%,rgba(185,151,91,0.03),transparent_20%)] opacity-60" />
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
          <div className="journal-frame relative w-[min(100%,72rem)] aspect-[1.38/1]">
            <div className="absolute inset-0 bg-[#120f0c] shadow-[0_32px_70px_rgba(0,0,0,0.46)]" />
            <div className="absolute inset-[1.1rem] bg-[#17120f]" />
            <div className="absolute inset-[1.45rem] bg-[#201813]">
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.06)_12%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.04)_88%,transparent)]" />
              <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.02),transparent_42%)]" />
              <Image
                src="/images/paper.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 72rem"
                className="object-cover opacity-26 mix-blend-soft-light"
              />

              <div className="absolute inset-y-0 left-[6%] w-[38%] bg-[linear-gradient(90deg,rgba(249,243,232,0.86),rgba(234,224,207,0.9)_68%,rgba(217,205,186,0.95))] shadow-[inset_-1px_0_0_rgba(90,65,40,0.12),inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
              <div className="absolute inset-y-0 right-[6%] w-[38%] bg-[linear-gradient(270deg,rgba(249,243,232,0.86),rgba(234,224,207,0.9)_68%,rgba(217,205,186,0.95))] shadow-[inset_1px_0_0_rgba(90,65,40,0.12),inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
              <div className="absolute inset-y-0 left-1/2 w-[8%] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(43,31,22,0.18),rgba(16,12,10,0.34)_50%,rgba(43,31,22,0.18))] opacity-75 blur-[1px]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15),transparent_18%,transparent_82%,rgba(0,0,0,0.18))]" />
              <GrainLayer />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[28.25rem] top-[22%] z-9 h-24 w-24 -translate-y-1/2 rotate-[-10deg] opacity-92"
              >
                <Image
                  src="/images/moss.png"
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[72.5%] top-[59%] z-1 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[14deg] opacity-88"
              >
                <Image
                  src="/images/petal.png"
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[5.75%] bottom-[1.1rem] z-20 h-20 w-20 rotate-[7deg] opacity-92"
              >
                <Image
                  src="/images/pressed-lotus.png"
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <LayoutGroup id={sectionId}>
                <div className="absolute inset-0">
                  {items.map((item, index) => {
                    const buttonId = `${sectionId}-note-${index}-button`;
                    const panelId = `${sectionId}-note-${index}-panel`;
                    const styleInfo = noteStyles[index] ?? noteStyles[noteStyles.length - 1];
                    const itemState = activeIndex === index ? state : 'closed';

                    return activeIndex === index ? (
                      <OpenNote
                        key={item.question}
                        item={item}
                        index={index}
                        styleInfo={styleInfo}
                        state={itemState}
                        buttonId={buttonId}
                        panelId={panelId}
                        reduceMotion={!!reduceMotion}
                        onToggle={() => toggle(index)}
                      />
                    ) : (
                      <TuckedNotePreview
                        key={item.question}
                        item={item}
                        index={index}
                        styleInfo={styleInfo}
                        active={false}
                        onOpen={() => toggle(index)}
                        buttonRef={(node) => {
                          buttonRefs.current[index] = node;
                        }}
                        buttonId={buttonId}
                        panelId={panelId}
                        onKeyDown={(event) => onKeyDown(index, event)}
                      />
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
