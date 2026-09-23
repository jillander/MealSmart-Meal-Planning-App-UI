import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, CheckIcon, CompassIcon, MoonIcon, XIcon } from 'lucide-react';
import { DAILY_GENERATION_LIMIT, timeUntilReset } from '../hooks/useDailyGenerationLimit';
import { discoverCreators, discoverPreviewRecipes } from '../data/discoverCreators';

interface GenerationLimitScreenProps {
  navigateTo: (screen: string) => void;
}

/**
 * Shown when someone tries a 4th ingredient scan in a day. It closes the door
 * kindly (when it reopens, how many they used) and hands them to Discover.
 */
export function GenerationLimitScreen({ navigateTo }: GenerationLimitScreenProps) {
  const [reset, setReset] = useState(() => timeUntilReset());

  useEffect(() => {
    const timer = window.setInterval(() => setReset(timeUntilReset()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const resetLabel =
  reset.hours > 0 ? `${reset.hours}h ${reset.minutes}m` : `${Math.max(1, reset.minutes)}m`;

  const rise = (delay: number) => ({
    className: 'cp-limit-rise',
    style: { animationDelay: `${delay}s` }
  });

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <style>{`
        @keyframes cp-limit-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        .cp-limit-rise { animation: cp-limit-in 280ms cubic-bezier(0.23, 1, 0.32, 1) both; }
        @media (prefers-reduced-motion: reduce) { .cp-limit-rise { animation: none; } }
      `}</style>
      <header className="flex items-center justify-end px-6 pb-2 pt-12">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          aria-label="Close and go to Today"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-[#F2F4F3]">
          
          <XIcon size={20} />
        </button>
      </header>

      <main className="px-6">
        {/* The allowance, visibly used up */}
        <div {...rise(0)}>
        <div className="flex flex-col items-center pt-2 text-center">
          <div className="flex items-center gap-2" aria-hidden="true">
            {Array.from({ length: DAILY_GENERATION_LIMIT }).map((_, index) =>
              <span
                key={index}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white">
                
                <CheckIcon size={20} strokeWidth={2.75} />
              </span>
              )}
          </div>
          <p className="mt-4 text-sm font-semibold text-[#64748B]">
            {DAILY_GENERATION_LIMIT} of {DAILY_GENERATION_LIMIT} recipe scans used today
          </p>

          <h1
              className="mt-3 max-w-[320px] text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
            You’ve cooked up your scans for today
          </h1>
          <p className="mt-3 max-w-[320px] text-[15px] leading-relaxed text-[#64748B]">
            Come back tomorrow to turn your ingredients into fresh recipes. Until then, Discover is
            full of meals that fit your targets.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#1A1A1A] shadow-sm ring-1 ring-black/5">
            <MoonIcon size={15} className="text-[#64748B]" />
            New scans in {resetLabel}
          </div>
        </div>
        </div>

        {/* The alternative — why Discover is worth it */}
        <div {...rise(0.08)}>
        <section
            aria-labelledby="discover-alt-heading"
            className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            
          <div className="grid grid-cols-3 gap-1 p-1">
            {discoverPreviewRecipes.map((recipe) =>
              <div key={recipe.title} className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
                <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#1A1A1A] backdrop-blur-sm">
                  {recipe.calories} cal · {recipe.protein}g P
                </span>
              </div>
              )}
          </div>

          <div className="px-5 pb-5 pt-4">
            <h2 id="discover-alt-heading" className="text-lg font-bold text-[#1A1A1A]">
              Recipes from people who know food
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
              Every recipe in Discover comes from real nutritionists and food creators, with
              calories and macros already worked out.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {discoverCreators.map((creator) =>
                  <img
                    key={creator.name}
                    src={creator.avatar}
                    alt={`${creator.name}, ${creator.role}`}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />

                  )}
              </div>
              <p className="text-xs font-medium text-[#64748B]">
                {discoverCreators[0].name}, {discoverCreators[1].name} and more
              </p>
            </div>
          </div>
        </section>
        </div>

        <div {...rise(0.14)}>
        <div className="mt-6">
          <button
              type="button"
              onClick={() => navigateTo('recipe-discovery')}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors duration-150 hover:bg-[#2A2A2A]">
              
            <CompassIcon size={18} />
            Discover recipes
            <ArrowRightIcon
                size={17}
                className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
              
          </button>
          <button
              type="button"
              onClick={() => navigateTo('recipe-suggestions')}
              className="mt-3 h-12 w-full rounded-xl text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-white">
              
            See today’s generated recipes
          </button>
        </div>
        </div>
      </main>
    </div>);

}