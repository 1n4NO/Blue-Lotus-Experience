'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/cn';
import type { FaqItem } from '@/types/site';

type FaqSectionProps = {
  items: FaqItem[];
};

type NotePhase = 'closed' | 'opening' | 'open' | 'closing-content' | 'closing-fold';

const OPEN_MS = 760;
const CLOSE_CONTENT_MS = 180;
const CLOSE_FOLD_MS = 520;

const CLOSED_VARIATIONS = [
  { rotate: -0.45, x: -4, y: 0 },
  { rotate: 0.36, x: 10, y: 10 },
  { rotate: -0.28, x: -2, y: 18 },
  { rotate: 0.22, x: 8, y: 28 },
  { rotate: -0.18, x: -8, y: 38 }
] as const;

function PaperSurface() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#e7decd_0%,#ded3bf_100%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(124,92,61,0.07),transparent_10%),radial-gradient(circle_at_78%_18%,rgba(124,92,61,0.05),transparent_12%),radial-gradient(circle_at_50%_82%,rgba(124,92,61,0.035),transparent_14%)] opacity-70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(96deg,rgba(87,63,39,0.035)_0,rgba(87,63,39,0.035)_1px,transparent_1px,transparent_9px)] opacity-35 mix-blend-multiply"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.15),transparent_12%,transparent_88%,rgba(78,57,34,0.08))] opacity-25"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(80,60,37,0.04),inset_0_24px_48px_rgba(255,255,255,0.08),inset_0_-18px_30px_rgba(82,60,37,0.05)]"
      />
    </>
  );
}

function FaqPaperNote({
  item,
  index,
  phase,
  active,
  buttonId,
  panelId,
  buttonRef,
  onToggle,
  onKeyDown
}: {
  item: FaqItem;
  index: number;
  phase: NotePhase;
  active: boolean;
  buttonId: string;
  panelId: string;
  buttonRef: (node: HTMLButtonElement | null) => void;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const reduceMotion = useReducedMotion();
  const variation = CLOSED_VARIATIONS[index] ?? { rotate: 0, x: 0, y: index * 10 };
  const isOpenSurface = phase === 'opening' || phase === 'open' || phase === 'closing-content';
  const isShowingAnswer = phase === 'opening' || phase === 'open' || phase === 'closing-content';
  const isClosing = phase === 'closing-content' || phase === 'closing-fold';

  return (
    <motion.button
      ref={buttonRef}
      id={buttonId}
      type="button"
      aria-expanded={active}
      aria-controls={panelId}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      layout
      whileHover={reduceMotion || active ? undefined : { y: -2 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative block w-full origin-top-left overflow-hidden text-left outline-none"
      style={{
        zIndex: active ? 40 : 20 - index,
        rotate: reduceMotion || active ? 0 : variation.rotate,
        x: reduceMotion || active ? 0 : variation.x,
        y: reduceMotion || active ? 0 : variation.y
      }}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-[0.18rem] border-0 shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-colors duration-500 ease-calm',
          isOpenSurface ? 'bg-[#e4dbc8]' : 'bg-[#e0d6c2]'
        )}
      >
        <PaperSurface />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-12 origin-top overflow-hidden"
          style={{ transformPerspective: 1200 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: isOpenSurface ? 1 : 0.98,
                  rotateX: isOpenSurface ? 0 : -12
                }
          }
          transition={{ duration: reduceMotion ? 0.18 : 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,234,221,0.96),rgba(224,213,195,0.94))]" />
          <span className="absolute inset-x-4 top-8 h-px bg-[linear-gradient(90deg,transparent,rgba(73,53,33,0.15),transparent)]" />
          <span className="absolute inset-0 bg-[linear-gradient(145deg,transparent_45%,rgba(83,60,36,0.11)_46%,transparent_47%)] opacity-45" />
        </motion.div>

        <div className="relative z-10 px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex items-start gap-4">
            <span className="mt-[0.1rem] flex-none font-ui text-[0.6rem] uppercase tracking-[0.34em] text-[#99784e]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  'max-w-[34rem] font-display tracking-[-0.03em] text-[#24180f] text-balance transition-[font-size,line-height] duration-500 ease-calm',
                  active
                    ? 'text-[clamp(1.38rem,2vw,1.95rem)] leading-[1.06]'
                    : 'text-[clamp(1.01rem,1.45vw,1.18rem)] leading-[1.12]'
                )}
              >
                {item.question}
              </p>
            </div>
          </div>

          <AnimatePresence initial={false} mode="wait">
            {isShowingAnswer ? (
              <motion.div
                key={item.question}
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : phase === 'closing-content'
                      ? { opacity: 1, height: 'auto' }
                      : { opacity: 0, height: 0 }
                }
                animate={
                  reduceMotion
                    ? { opacity: phase === 'closing-content' ? 0 : 1 }
                    : phase === 'closing-content'
                      ? { opacity: 0, height: 'auto' }
                      : { opacity: 1, height: 'auto' }
                }
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{
                  duration: reduceMotion ? 0.2 : phase === 'closing-content' ? 0.18 : 0.72,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="overflow-hidden"
              >
                <div className="pt-4 sm:pt-5">
                  <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(73,53,33,0.2),transparent)]" />
                  <div className="max-w-[34rem] pt-4 sm:pt-5">
                    <p className="text-[0.96rem] leading-[1.88] text-[#2b2015] sm:text-[1rem]">
                      {item.answer}
                    </p>
                    <p className="mt-4 font-ui text-[0.63rem] uppercase tracking-[0.34em] text-[#6f583d]/72 italic">
                      with care
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {!reduceMotion ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-[linear-gradient(180deg,transparent,rgba(72,53,31,0.03))]"
            animate={{ opacity: isClosing ? 0.45 : 0.18 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          />
        ) : null}
      </div>
    </motion.button>
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
  const openMs = reduceMotion ? 160 : OPEN_MS;
  const closeContentMs = reduceMotion ? 90 : CLOSE_CONTENT_MS;
  const closeFoldMs = reduceMotion ? 120 : CLOSE_FOLD_MS;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const openAt = (index: number) => {
    clearTimer();
    queuedIndexRef.current = null;
    setActiveIndex(index);
    setPhase('opening');
    timerRef.current = window.setTimeout(() => {
      setPhase('open');
      timerRef.current = null;
    }, openMs);
  };

  const finishClose = () => {
    const nextIndex = queuedIndexRef.current;
    queuedIndexRef.current = null;

    if (nextIndex === null) {
      setActiveIndex(null);
      setPhase('closed');
      return;
    }

    setActiveIndex(nextIndex);
    setPhase('opening');
    timerRef.current = window.setTimeout(() => {
      setPhase('open');
      timerRef.current = null;
    }, openMs);
  };

  const closeCurrent = () => {
    clearTimer();
    setPhase('closing-content');
    timerRef.current = window.setTimeout(() => {
      setPhase('closing-fold');
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        finishClose();
      }, closeFoldMs);
    }, closeContentMs);
  };

  const toggleIndex = (index: number) => {
    if (activeIndex === index) {
      if (phase === 'closed') {
        openAt(index);
      } else {
        queuedIndexRef.current = null;
        closeCurrent();
      }
      return;
    }

    if (activeIndex === null) {
      openAt(index);
      return;
    }

    queuedIndexRef.current = index;
    closeCurrent();
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
      closeCurrent();
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  return (
    <section
      id="faq"
      className="section-grid relative overflow-hidden bg-background px-6 py-[7rem] sm:px-8 lg:px-10 lg:py-[9rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/images/paper.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-28 mix-blend-soft-light"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%),radial-gradient(circle_at_60%_70%,rgba(185,151,91,0.02),transparent_28%),linear-gradient(180deg,rgba(9,9,9,0.28),rgba(9,9,9,0.62))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.84fr,1.16fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 self-start max-w-md space-y-5">
          <p className="font-ui text-[0.72rem] uppercase tracking-[0.34em] text-gold/80">
            FAQ
          </p>
          <h2 className="font-display text-[clamp(2.35rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.035em] text-text text-balance">
            Questions,
            <br />
            answered quietly.
          </h2>
          <p className="max-w-sm text-pretty text-[0.95rem] leading-7 text-muted">
            Practical details, without disturbing the rhythm.
          </p>
        </div>

        <div className="relative min-h-[28rem]">
          <div className="relative flex flex-col">
            {items.map((item, index) => {
              const buttonId = `${sectionId}-faq-button-${index}`;
              const panelId = `${sectionId}-faq-panel-${index}`;
              const itemPhase = activeIndex === index ? phase : 'closed';

              return (
                <motion.div
                  key={item.question}
                  layout
                  transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(index === 0 ? 'relative' : 'relative mt-[-0.8rem] sm:mt-[-1rem]')}
                  style={{
                    zIndex: activeIndex === index ? 50 : 30 - index
                  }}
                >
                  <FaqPaperNote
                    item={item}
                    index={index}
                    phase={itemPhase}
                    active={activeIndex === index}
                    buttonId={buttonId}
                    panelId={panelId}
                    buttonRef={(node) => {
                      buttonRefs.current[index] = node;
                    }}
                    onToggle={() => toggleIndex(index)}
                    onKeyDown={(event) => onKeyDown(index, event)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
