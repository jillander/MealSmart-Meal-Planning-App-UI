import React, { useEffect, useState } from 'react';
import { SparklesIcon } from 'lucide-react';

interface PlateAnalyzingProps {
  image: string;
  onDone: () => void;
}

const stages = [
'Looking at your plate.',
'Identifying each food.',
'Working out your portions.',
'Almost ready.'];


/**
 * The photo carries the wait: a frosted veil retreats up the plate as the
 * analysis progresses, matching the recipe-matching screen's treatment.
 */
export function PlateAnalyzing({ image, onDone }: PlateAnalyzingProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(100);
      const done = window.setTimeout(onDone, 600);
      return () => window.clearTimeout(done);
    }

    const tick = window.setInterval(() => {
      setProgress((current) => Math.min(100, current + 2));
    }, 46);
    return () => window.clearInterval(tick);
  }, [onDone]);

  useEffect(() => {
    setStage(Math.min(stages.length - 1, Math.floor(progress / 26)));
    if (progress >= 100) {
      const done = window.setTimeout(onDone, 420);
      return () => window.clearTimeout(done);
    }
  }, [progress, onDone]);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F8F9FA] px-8">
      <div className="relative">
        <div
          className="absolute -inset-5 rounded-full bg-[#4CAF50]/12 blur-2xl"
          aria-hidden="true" />
        
        <div className="relative h-[228px] w-[228px] overflow-hidden rounded-full shadow-xl">
          <img src={image} alt="" className="h-full w-full object-cover" />
          {/* Frosted veil retreating upward as progress builds */}
          <div
            className="absolute inset-x-0 top-0 bg-white/55 backdrop-blur-md transition-[height] duration-200 ease-out"
            style={{ height: `${100 - progress}%` }}
            aria-hidden="true" />
          
          <div
            className="absolute inset-x-0 h-[3px] bg-white/85 shadow-[0_0_18px_rgba(255,255,255,0.9)] transition-[top] duration-200 ease-out"
            style={{ top: `${100 - progress}%` }}
            aria-hidden="true" />
          
        </div>
      </div>

      <div className="mt-9 w-full max-w-[300px] text-center" aria-live="polite">
        <p className="text-[19px] font-bold leading-snug text-[#1A1A1A]">{stages[stage]}</p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#8A948F]">
          <SparklesIcon size={13} className="text-[#4CAF50]" /> Powered by Cal Pal AI
        </p>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#E7EBE9]">
          <div
            className="h-full rounded-full bg-[#1A1A1A] transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }} />
          
        </div>
      </div>
    </section>);

}