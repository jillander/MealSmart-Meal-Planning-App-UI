import React, { useEffect, useState } from 'react';
import { SparklesIcon, XIcon } from 'lucide-react';

interface RecipeLoadingScreenProps {
  navigateTo: (screen: string) => void;
}

const statusTexts = [
'Reading your ingredients.',
'Balancing your macros.',
'Matching recipes to your plan.',
'Almost ready.'];


const DURATION = 5200;

export const RecipeLoadingScreen: React.FC<RecipeLoadingScreenProps> = ({ navigateTo }) => {
  const [progress, setProgress] = useState(0);
  const [statusStep, setStatusStep] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - elapsed, 2.2);
      setProgress(eased);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const textInterval = window.setInterval(() => {
      setStatusStep((prev) => prev < statusTexts.length - 1 ? prev + 1 : prev);
    }, DURATION / statusTexts.length);

    const navTimeout = window.setTimeout(() => navigateTo('recipe-suggestions'), DURATION + 350);

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(textInterval);
      window.clearTimeout(navTimeout);
    };
  }, [navigateTo]);

  const veilHeight = Math.max(0, (1 - progress) * 100);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F6F4]">
      <style>{`
        @keyframes cp-status-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes cp-breathe { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.022) } }
        @keyframes cp-halo { 0%, 100% { opacity: .35; transform: scale(1) } 50% { opacity: .6; transform: scale(1.06) } }
        @keyframes cp-shimmer { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }
        @media (prefers-reduced-motion: reduce) {
          .cp-anim { animation: none !important; }
        }
      `}</style>

      <header className="flex items-center justify-between px-6 pb-2 pt-12">
        <span className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
          <span className="flex h-2.5 w-2.5 items-center justify-center">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4CAF50]" />
          </span>
          Finding your recipes
        </span>
        <button
          type="button"
          onClick={() => navigateTo('ingredient-confirmation')}
          aria-label="Cancel recipe matching"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-[#F7F9F7]">
          
          <XIcon size={20} />
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-16">
        <div className="relative flex items-center justify-center">
          <span
            className="cp-anim absolute h-[295px] w-[295px] rounded-full bg-[#4CAF50]/12 blur-2xl"
            style={{ animation: 'cp-halo 3.4s ease-in-out infinite' }}
            aria-hidden="true" />
          

          <div
            className="cp-anim relative h-[272px] w-[272px] overflow-hidden rounded-full shadow-[0_26px_60px_rgba(26,26,26,0.16)]"
            style={{ animation: 'cp-breathe 3.4s ease-in-out infinite' }}>
            
            <img
              src="/f82eecda-4fe1-4c59-ae63-f3bfc48b12b7.jpg"
              alt="Your ingredients being matched to recipes"
              className="h-full w-full object-cover" />
            

            {/* Translucent veil that retreats upward as matching completes */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 bg-white/72 backdrop-blur-[3px] transition-[height] duration-100 ease-linear"
              style={{ height: `${veilHeight}%` }}
              aria-hidden="true">
              
              <span className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.85)_100%)]" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-white/90 shadow-[0_0_14px_2px_rgba(255,255,255,0.85)]" />
            </div>

            {/* Light sweeping across the revealed photo */}
            <span
              className="cp-anim pointer-events-none absolute inset-y-0 w-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.28)_50%,rgba(255,255,255,0)_100%)]"
              style={{ animation: 'cp-shimmer 2.6s ease-in-out infinite' }}
              aria-hidden="true" />
            
          </div>
        </div>

        <div className="mt-11 flex min-h-[62px] flex-col items-center">
          <p
            key={statusStep}
            className="cp-anim text-[19px] font-extrabold tracking-tight text-[#1A1A1A]"
            style={{ animation: 'cp-status-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
            aria-live="polite">
            
            {statusTexts[statusStep]}
          </p>
          <p className="mt-1.5 flex items-center gap-1 text-sm text-[#8A948F]">
            Powered by Cal Pal AI <SparklesIcon size={13} className="text-[#4CAF50]" />
          </p>
        </div>

        <div className="mt-7 h-1 w-40 overflow-hidden rounded-full bg-[#E2E7E3]" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Matching progress">
          <span className="block h-full rounded-full bg-[#4CAF50] transition-[width] duration-100 ease-linear" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>);

};