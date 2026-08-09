'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { useApplicationModal } from '@/components/application-modal-provider';

export function EndSequence() {
  const reduceMotion = useReducedMotion();
  const { open: openApplicationModal } = useApplicationModal();

  if (reduceMotion) {
    return (
      <div className="bg-background">
        <section
          aria-label="Stillness transition"
          className="relative isolate min-h-screen overflow-hidden px-6 py-24 sm:px-8 lg:px-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,246,242,0.03),transparent_44%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02)_18%,transparent_82%)] opacity-40"
          />
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-center" />
        </section>

        <section
          aria-label="Final message"
          className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-8 lg:px-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,151,91,0.06),transparent_36%)]"
          />
          <p className="relative z-10 max-w-4xl font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-normal leading-[1.2] tracking-normal text-text text-balance">
            The forest will be here when you're ready.
          </p>
        </section>

        <section
          aria-label="Final invitation"
          className="relative isolate min-h-[115vh] overflow-hidden px-6 py-24 sm:px-8 lg:px-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,246,242,0.02),transparent_42%)]"
          />

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center justify-center">
            <div className="w-full text-center">
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.38em] text-gold/78">
                Ready when you are.
              </p>

              <button
                type="button"
                onClick={openApplicationModal}
                className="relative z-20 mt-8 inline-flex items-center justify-center border border-white/12 px-7 py-4 font-ui text-[0.72rem] uppercase tracking-[0.3em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8"
              >
                Begin Your Journey
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section
        aria-label="Stillness transition"
        className="relative isolate min-h-screen overflow-hidden px-6 py-24 sm:px-8 lg:px-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,246,242,0.03),transparent_44%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02)_18%,transparent_82%)] opacity-40"
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-center" />
      </section>

      <section
        aria-label="Final message"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-8 lg:px-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,151,91,0.06),transparent_36%)]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-normal leading-[1.2] tracking-normal text-text text-balance"
        >
          The forest will be here when you're ready.
        </motion.p>
      </section>

      <section
        aria-label="Final invitation"
        className="relative isolate min-h-[115vh] overflow-hidden px-6 py-24 sm:px-8 lg:px-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,246,242,0.02),transparent_42%)]"
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-center"
          >
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.38em] text-gold/78">
              Ready when you are.
            </p>

            <button
              type="button"
              onClick={openApplicationModal}
              className="relative z-20 mt-8 inline-flex items-center justify-center border border-white/12 px-7 py-4 font-ui text-[0.72rem] uppercase tracking-[0.3em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8"
            >
              Begin Your Journey
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
