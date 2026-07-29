'use client';

import { useEffect, useRef, useState } from 'react';
import { CloudRain, Volume2, VolumeX } from 'lucide-react';
import { useScroll } from 'framer-motion';

import { cn } from '@/lib/cn';

const RAIN_AUDIO_SRC = '/sound/rain.wav';

function getRainVolume(scrollProgress: number) {
  // The rain should feel strongest at the top of the hero and fall away as
  // the user moves into the rest of the page. A non-linear falloff keeps the
  // fade gentle rather than abrupt.
  if (scrollProgress >= 1) return 0;
  if (scrollProgress <= 0.15) return 0.62;
  if (scrollProgress <= 0.5) {
    const t = (scrollProgress - 0.15) / 0.35;
    return 0.62 - t * 0.3;
  }
  if (scrollProgress <= 0.8) {
    const t = (scrollProgress - 0.5) / 0.3;
    return 0.32 - t * 0.24;
  }

  const t = (scrollProgress - 0.8) / 0.2;
  return Math.max(0, 0.08 - t * 0.08);
}

export function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    void start().then((started) => {
      setEnabled(started);
    });
    // The intent is for ambience to be present by default; if the browser
    // blocks autoplay, we fall back to the toggle state after hydration.
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !enabled) {
      return;
    }

    const updateVolume = (progress: number) => {
      const nextVolume = getRainVolume(progress);
      audio.volume = nextVolume;

      // Let the rain rest when it has faded out fully; it will resume if the
      // user scrolls back upward.
      if (nextVolume <= 0.01 && !audio.paused) {
        audio.pause();
      } else if (nextVolume > 0.01 && audio.paused) {
        void audio.play().catch(() => {
          // Autoplay can still fail if the browser revokes the gesture state.
        });
      }
    };

    updateVolume(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on('change', updateVolume);
    return () => unsubscribe();
  }, [enabled, scrollYProgress]);

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    audioRef.current = null;
  };

  const start = async () => {
    if (typeof window === 'undefined') return false;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(RAIN_AUDIO_SRC);
      audio.loop = true;
      audio.preload = 'auto';
      audioRef.current = audio;
    }

    audio.volume = getRainVolume(scrollYProgress.get());

    try {
      await audio.play();
      return true;
    } catch {
      stop();
      return false;
    }
  };

  const onToggle = async () => {
    if (enabled) {
      stop();
      setEnabled(false);
      return;
    }

    const started = await start();
    setEnabled(started);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        aria-label={enabled ? 'Disable rain ambience' : 'Enable rain ambience'}
        className={cn(
          'glass-panel inline-flex items-center gap-2 rounded-full px-4 py-3 font-ui text-[0.65rem] uppercase tracking-[0.28em] text-text transition duration-500 ease-calm hover:-translate-y-0.5 hover:border-white/18',
          enabled ? 'border-white/16 bg-white/10' : 'border-white/10'
        )}
      >
        <CloudRain className="h-4 w-4" />
        <span className="hidden sm:inline">Rain</span>
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </div>
  );
}
