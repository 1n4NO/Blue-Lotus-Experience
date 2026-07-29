'use client';

import { useEffect, useRef, useState } from 'react';
import { CloudRain, Volume2, VolumeX } from 'lucide-react';

import { cn } from '@/lib/cn';

type RainEngine = {
  context: AudioContext;
  sources: AudioBufferSourceNode[];
  timeouts: number[];
  stop: () => void;
};

export function AudioToggle() {
  const engineRef = useRef<RainEngine | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    return () => {
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, []);

  const start = async () => {
    if (typeof window === 'undefined' || engineRef.current) {
      return;
    }

    const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();
    await context.resume();

    const makeNoiseBuffer = (durationSeconds: number, amplitude = 0.35) => {
      const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * durationSeconds), context.sampleRate);
      const data = buffer.getChannelData(0);

      for (let index = 0; index < data.length; index += 1) {
        data[index] = (Math.random() * 2 - 1) * amplitude;
      }

      return buffer;
    };

    const sources: AudioBufferSourceNode[] = [];
    const timeouts: number[] = [];

    const startLayer = (
      buffer: AudioBuffer,
      filterFactory: () => BiquadFilterNode,
      gainValue: number
    ) => {
      const source = context.createBufferSource();
      const filter = filterFactory();
      const gain = context.createGain();
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();

      source.buffer = buffer;
      source.loop = true;
      gain.gain.value = gainValue;

      lfo.type = 'sine';
      lfo.frequency.value = 0.03 + Math.random() * 0.05;
      lfoGain.gain.value = gainValue * 0.45;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);

      source.start();
      lfo.start();

      sources.push(source);
      sources.push(lfo as unknown as AudioBufferSourceNode);
    };

    startLayer(makeNoiseBuffer(2, 0.3), () => {
      const filter = context.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 520 + Math.random() * 180;
      filter.Q.value = 0.8;
      return filter;
    }, 0.011);

    startLayer(makeNoiseBuffer(1.5, 0.22), () => {
      const filter = context.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1200 + Math.random() * 700;
      filter.Q.value = 0.6;
      return filter;
    }, 0.006);

    const scheduleDrop = () => {
      const delay = 90 + Math.random() * 700 + Math.random() * 500;
      const timeoutId = window.setTimeout(() => {
        if (context.state === 'closed') {
          return;
        }

        const dropStart = context.currentTime;
        const dropBuffer = makeNoiseBuffer(0.16, 0.7);
        const source = context.createBufferSource();
        const bandPass = context.createBiquadFilter();
        const dropGain = context.createGain();
        const pan = context.createStereoPanner();

        source.buffer = dropBuffer;
        bandPass.type = 'bandpass';
        bandPass.frequency.value = 1800 + Math.random() * 2800;
        bandPass.Q.value = 6 + Math.random() * 6;
        pan.pan.value = (Math.random() - 0.5) * 0.7;

        dropGain.gain.setValueAtTime(0.0001, dropStart);
        dropGain.gain.exponentialRampToValueAtTime(0.035 + Math.random() * 0.02, dropStart + 0.008);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, dropStart + 0.11 + Math.random() * 0.12);

        source.connect(bandPass);
        bandPass.connect(pan);
        pan.connect(dropGain);
        dropGain.connect(context.destination);
        source.start(dropStart);
        source.stop(dropStart + 0.28);
        sources.push(source);

        if (Math.random() > 0.78) {
          const clusterDelay = 35 + Math.random() * 110;
          const clusterTimeout = window.setTimeout(() => {
            const clusterStart = context.currentTime;
            const clusterSource = context.createBufferSource();
            const clusterFilter = context.createBiquadFilter();
            const clusterGain = context.createGain();

            clusterSource.buffer = makeNoiseBuffer(0.09, 0.65);
            clusterFilter.type = 'highpass';
            clusterFilter.frequency.value = 2300 + Math.random() * 1800;
            clusterGain.gain.setValueAtTime(0.0001, clusterStart);
            clusterGain.gain.exponentialRampToValueAtTime(0.018 + Math.random() * 0.01, clusterStart + 0.006);
            clusterGain.gain.exponentialRampToValueAtTime(0.0001, clusterStart + 0.06 + Math.random() * 0.09);

            clusterSource.connect(clusterFilter);
            clusterFilter.connect(clusterGain);
            clusterGain.connect(context.destination);
            clusterSource.start(clusterStart);
            clusterSource.stop(clusterStart + 0.16);
            sources.push(clusterSource);
          }, clusterDelay);

          timeouts.push(clusterTimeout);
        }

        scheduleDrop();
      }, delay);

      timeouts.push(timeoutId);
    };

    const scheduleInsect = () => {
      const delay = 1400 + Math.random() * 5200 + Math.random() * 3800;
      const timeoutId = window.setTimeout(() => {
        if (context.state === 'closed') {
          return;
        }

        const chirpStart = context.currentTime;
        const oscillator = context.createOscillator();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        const pan = context.createStereoPanner();
        const frequencyBase = 4300 + Math.random() * 3800;
        const sweep = 180 + Math.random() * 240;

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(frequencyBase + sweep, chirpStart);
        oscillator.frequency.exponentialRampToValueAtTime(frequencyBase, chirpStart + 0.02 + Math.random() * 0.02);
        oscillator.frequency.exponentialRampToValueAtTime(frequencyBase + sweep * 0.55, chirpStart + 0.05 + Math.random() * 0.04);

        filter.type = 'bandpass';
        filter.frequency.value = frequencyBase;
        filter.Q.value = 10 + Math.random() * 8;

        pan.pan.value = (Math.random() - 0.5) * 0.55;

        gain.gain.setValueAtTime(0.0001, chirpStart);
        gain.gain.exponentialRampToValueAtTime(0.008 + Math.random() * 0.007, chirpStart + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, chirpStart + 0.07 + Math.random() * 0.09);

        oscillator.connect(filter);
        filter.connect(pan);
        pan.connect(gain);
        gain.connect(context.destination);
        oscillator.start(chirpStart);
        oscillator.stop(chirpStart + 0.22);
        sources.push(oscillator as unknown as AudioBufferSourceNode);

        if (Math.random() > 0.7) {
          const followUpDelay = 55 + Math.random() * 180;
          const followUpId = window.setTimeout(() => {
            if (context.state === 'closed') {
              return;
            }

            const followStart = context.currentTime;
            const followOscillator = context.createOscillator();
            const followFilter = context.createBiquadFilter();
            const followGain = context.createGain();
            const followPan = context.createStereoPanner();

            followOscillator.type = 'square';
            followOscillator.frequency.setValueAtTime(3600 + Math.random() * 2600, followStart);
            followFilter.type = 'bandpass';
            followFilter.frequency.value = 3800 + Math.random() * 2200;
            followFilter.Q.value = 7 + Math.random() * 4;
            followPan.pan.value = (Math.random() - 0.5) * 0.4;
            followGain.gain.setValueAtTime(0.0001, followStart);
            followGain.gain.exponentialRampToValueAtTime(0.004 + Math.random() * 0.004, followStart + 0.004);
            followGain.gain.exponentialRampToValueAtTime(0.0001, followStart + 0.05 + Math.random() * 0.05);

            followOscillator.connect(followFilter);
            followFilter.connect(followPan);
            followPan.connect(followGain);
            followGain.connect(context.destination);
            followOscillator.start(followStart);
            followOscillator.stop(followStart + 0.12);
            sources.push(followOscillator as unknown as AudioBufferSourceNode);
          }, followUpDelay);

          timeouts.push(followUpId);
        }

        scheduleInsect();
      }, delay);

      timeouts.push(timeoutId);
    };

    const scheduleFrog = () => {
      const delay = 1800 + Math.random() * 8500 + Math.random() * 6500;
      const timeoutId = window.setTimeout(() => {
        if (context.state === 'closed') {
          return;
        }

        const croakStart = context.currentTime;
        const oscillator = context.createOscillator();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        const pan = context.createStereoPanner();
        const wetOscillator = context.createOscillator();
        const wetFilter = context.createBiquadFilter();
        const wetGain = context.createGain();
        const wetPan = context.createStereoPanner();
        const croakSweep = 42 + Math.random() * 16;
        const croakBase = 68 + Math.random() * 16;

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(croakBase + croakSweep, croakStart);
        oscillator.frequency.exponentialRampToValueAtTime(croakBase * 0.92, croakStart + 0.11);
        oscillator.frequency.exponentialRampToValueAtTime(croakBase + croakSweep * 0.7, croakStart + 0.3);

        filter.type = 'bandpass';
        filter.frequency.value = 88 + Math.random() * 28;
        filter.Q.value = 4.5 + Math.random() * 2.5;

        pan.pan.value = (Math.random() - 0.5) * 0.65;

        gain.gain.setValueAtTime(0.0001, croakStart);
        gain.gain.exponentialRampToValueAtTime(0.045 + Math.random() * 0.025, croakStart + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, croakStart + 0.38 + Math.random() * 0.24);

        wetOscillator.type = 'sawtooth';
        wetOscillator.frequency.setValueAtTime(croakBase * 0.92, croakStart);
        wetOscillator.frequency.exponentialRampToValueAtTime(croakBase * 0.72, croakStart + 0.1);
        wetFilter.type = 'lowpass';
        wetFilter.frequency.value = 180 + Math.random() * 70;
        wetFilter.Q.value = 1.3;
        wetPan.pan.value = (Math.random() - 0.5) * 0.4;
        wetGain.gain.setValueAtTime(0.0001, croakStart);
        wetGain.gain.exponentialRampToValueAtTime(0.022 + Math.random() * 0.015, croakStart + 0.01);
        wetGain.gain.exponentialRampToValueAtTime(0.0001, croakStart + 0.26 + Math.random() * 0.14);

        oscillator.connect(filter);
        filter.connect(pan);
        pan.connect(gain);
        gain.connect(context.destination);
        wetOscillator.connect(wetFilter);
        wetFilter.connect(wetPan);
        wetPan.connect(wetGain);
        wetGain.connect(context.destination);
        oscillator.start(croakStart);
        wetOscillator.start(croakStart + 0.01);
        oscillator.stop(croakStart + 0.5);
        wetOscillator.stop(croakStart + 0.36);
        sources.push(oscillator as unknown as AudioBufferSourceNode);
        sources.push(wetOscillator as unknown as AudioBufferSourceNode);

        if (Math.random() > 0.28) {
          const replyDelay = 120 + Math.random() * 520;
          const replyTimeout = window.setTimeout(() => {
            if (context.state === 'closed') {
              return;
            }

            const replyStart = context.currentTime;
            const replyOscillator = context.createOscillator();
            const replyFilter = context.createBiquadFilter();
            const replyGain = context.createGain();
            const replyPan = context.createStereoPanner();

            replyOscillator.type = 'triangle';
            replyOscillator.frequency.setValueAtTime(62 + Math.random() * 24, replyStart);
            replyOscillator.frequency.exponentialRampToValueAtTime(44 + Math.random() * 14, replyStart + 0.11);
            replyFilter.type = 'bandpass';
            replyFilter.frequency.value = 70 + Math.random() * 34;
            replyFilter.Q.value = 3.5 + Math.random() * 1.8;
            replyPan.pan.value = (Math.random() - 0.5) * 0.55;
            replyGain.gain.setValueAtTime(0.0001, replyStart);
            replyGain.gain.exponentialRampToValueAtTime(0.026 + Math.random() * 0.014, replyStart + 0.01);
            replyGain.gain.exponentialRampToValueAtTime(0.0001, replyStart + 0.3 + Math.random() * 0.14);

            replyOscillator.connect(replyFilter);
            replyFilter.connect(replyPan);
            replyPan.connect(replyGain);
            replyGain.connect(context.destination);
            replyOscillator.start(replyStart);
            replyOscillator.stop(replyStart + 0.42);
            sources.push(replyOscillator as unknown as AudioBufferSourceNode);
          }, replyDelay);

          timeouts.push(replyTimeout);
        }

        scheduleFrog();
      }, delay);

      timeouts.push(timeoutId);
    };

    const scheduleBird = () => {
      const delay = 7000 + Math.random() * 16000 + Math.random() * 14000;
      const timeoutId = window.setTimeout(() => {
        if (context.state === 'closed') {
          return;
        }

        const chirpStart = context.currentTime;
        const chirpOscillator = context.createOscillator();
        const chirpFilter = context.createBiquadFilter();
        const chirpGain = context.createGain();
        const chirpPan = context.createStereoPanner();

        chirpOscillator.type = 'sine';
        chirpOscillator.frequency.setValueAtTime(3200 + Math.random() * 1800, chirpStart);
        chirpOscillator.frequency.exponentialRampToValueAtTime(4200 + Math.random() * 1800, chirpStart + 0.02);
        chirpOscillator.frequency.exponentialRampToValueAtTime(2800 + Math.random() * 1200, chirpStart + 0.05);

        chirpFilter.type = 'bandpass';
        chirpFilter.frequency.value = 3600 + Math.random() * 2200;
        chirpFilter.Q.value = 12 + Math.random() * 5;
        chirpPan.pan.value = (Math.random() - 0.5) * 0.65;

        chirpGain.gain.setValueAtTime(0.0001, chirpStart);
        chirpGain.gain.exponentialRampToValueAtTime(0.006 + Math.random() * 0.005, chirpStart + 0.004);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, chirpStart + 0.08 + Math.random() * 0.08);

        chirpOscillator.connect(chirpFilter);
        chirpFilter.connect(chirpPan);
        chirpPan.connect(chirpGain);
        chirpGain.connect(context.destination);
        chirpOscillator.start(chirpStart);
        chirpOscillator.stop(chirpStart + 0.18);
        sources.push(chirpOscillator as unknown as AudioBufferSourceNode);

        if (Math.random() > 0.72) {
          const secondDelay = 95 + Math.random() * 260;
          const secondTimeout = window.setTimeout(() => {
            if (context.state === 'closed') {
              return;
            }

            const secondStart = context.currentTime;
            const secondOscillator = context.createOscillator();
            const secondFilter = context.createBiquadFilter();
            const secondGain = context.createGain();

            secondOscillator.type = 'triangle';
            secondOscillator.frequency.setValueAtTime(2800 + Math.random() * 1500, secondStart);
            secondOscillator.frequency.exponentialRampToValueAtTime(3900 + Math.random() * 1600, secondStart + 0.02);
            secondFilter.type = 'highpass';
            secondFilter.frequency.value = 2400 + Math.random() * 1200;
            secondFilter.Q.value = 7 + Math.random() * 3;
            secondGain.gain.setValueAtTime(0.0001, secondStart);
            secondGain.gain.exponentialRampToValueAtTime(0.003 + Math.random() * 0.003, secondStart + 0.003);
            secondGain.gain.exponentialRampToValueAtTime(0.0001, secondStart + 0.05 + Math.random() * 0.05);

            secondOscillator.connect(secondFilter);
            secondFilter.connect(secondGain);
            secondGain.connect(context.destination);
            secondOscillator.start(secondStart);
            secondOscillator.stop(secondStart + 0.14);
            sources.push(secondOscillator as unknown as AudioBufferSourceNode);
          }, secondDelay);

          timeouts.push(secondTimeout);
        }

        scheduleBird();
      }, delay);

      timeouts.push(timeoutId);
    };

    scheduleDrop();
    scheduleInsect();
    scheduleFrog();
    scheduleBird();

    engineRef.current = {
      context,
      sources,
      timeouts,
      stop: () => {
        for (const timeoutId of timeouts) {
          window.clearTimeout(timeoutId);
        }

        for (const source of sources) {
          try {
            source.stop();
          } catch {
            // Some sources may already be stopped when teardown runs.
          }
        }

        try {
          void context.close();
        } catch {
          // Ignore teardown race conditions on already-closed contexts.
        }
      }
    };
  };

  const stop = () => {
    engineRef.current?.stop();
    engineRef.current = null;
  };

  const onToggle = async () => {
    if (enabled) {
      stop();
      setEnabled(false);
      return;
    }

    await start();
    setEnabled(Boolean(engineRef.current));
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
