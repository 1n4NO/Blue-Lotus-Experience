'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { navigation } from '@/content/site';
import { cn } from '@/lib/cn';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          'border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-700 ease-calm',
          scrolled ? 'glass-panel border-white/10 shadow-soft' : 'bg-transparent'
        )}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10"
        >
          <Link href="/" aria-label="Blue Lotus Experience home" className="flex items-center gap-3">
            <Image
              src="/images/profile.png"
              alt=""
              width={34}
              height={34}
              priority
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-ui text-[0.72rem] uppercase tracking-[0.34em] text-text">
              Blue Lotus
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-ui text-[0.7rem] uppercase tracking-[0.28em] text-muted transition duration-500 ease-calm hover:text-text"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-500 ease-calm group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#apply"
              className="hidden border border-white/12 px-4 py-2 font-ui text-[0.68rem] uppercase tracking-[0.28em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/8 md:inline-flex"
            >
              Apply
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/12 text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/8 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12, filter: 'blur(10px)' }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, filter: 'blur(8px)' }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel mx-4 mt-2 rounded-2xl border-white/10 px-5 py-6 shadow-soft lg:hidden"
          >
            <div className="grid gap-1">
              {navigation.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/6 py-4 font-ui text-sm uppercase tracking-[0.28em] text-text"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  {link.label}
                  <span className="text-white/30">0{index + 1}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
