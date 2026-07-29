'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { cn } from '@/lib/cn';
import type { RetreatDay } from '@/types/site';

type RetreatTimelineProps = {
  days: RetreatDay[];
};

export function RetreatTimeline({ days }: RetreatTimelineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.86', 'end 0.16']
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const fillOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0.12, 0.45, 0.8]);

  return (
    <div ref={ref} className="space-y-8">
      {days.map((day, dayIndex) => (
        <article
          key={day.day}
          className="relative rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 sm:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">
                {day.day}
              </p>
              <h3 className="mt-2 max-w-[14ch] font-display text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.08] tracking-[-0.02em] text-text">
                {day.title}
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              {dayIndex === 0
                ? 'Arrival, orientation, tea, journaling, campfire, and closing silence.'
                : 'Sunrise gathering, breath, reflection, the closing circle, and a slow farewell.'}
            </p>
          </div>

          <div className="relative pl-10">
            <div className="absolute left-[0.8rem] top-2 bottom-2 w-px bg-white/8">
              <motion.div
                style={{ scaleY, opacity: fillOpacity }}
                className="absolute inset-0 origin-top bg-[linear-gradient(180deg,rgba(185,151,91,0.92),rgba(85,107,47,0.7))]"
              />
            </div>

            <div className="grid gap-7">
              {day.sessions.map((session, index) => (
                <motion.div
                  key={`${day.day}-${session.time}-${session.title}`}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: 'blur(10px)' }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.42 }}
                  transition={{ duration: reduceMotion ? 0 : 0.85, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div
                    className={cn(
                      'absolute -left-[1.7rem] top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition duration-700 ease-calm',
                      index === 0
                        ? 'border-[rgba(185,151,91,0.8)] bg-[#090909] shadow-[0_0_0_6px_rgba(185,151,91,0.08)]'
                        : 'border-white/15 bg-[#090909]'
                    )}
                  />
                  <p className="font-ui text-[0.68rem] uppercase tracking-[0.3em] text-gold/75">
                    {session.time}
                  </p>
                  <h4 className="mt-2 font-display text-[1.9rem] leading-[1.02] tracking-[-0.02em] text-text">
                    {session.title}
                  </h4>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{session.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
