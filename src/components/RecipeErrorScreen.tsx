import React from 'react';
import {
  CompassIcon,
  HomeIcon,
  RefreshCwIcon,
  ScanLineIcon,
  ShoppingBasketIcon,
  UtensilsCrossedIcon,
  XIcon } from
'lucide-react';

interface RecipeErrorScreenProps {
  navigateTo: (screen: string) => void;
  /** Runs recipe matching again from the start. */
  onRetry: () => void;
  /** How many times matching has already been attempted. */
  attempt?: number;
}

const destinations = [
{ key: 'ingredient-capture', label: 'Scan again', description: 'Recapture your ingredients', icon: ScanLineIcon },
{ key: 'recipe-discovery', label: 'Discover recipes', description: 'Browse ideas that fit your plan', icon: CompassIcon },
{ key: 'shopping-list', label: 'Shopping list', description: 'Plan what you still need', icon: ShoppingBasketIcon },
{ key: 'meal-prep', label: 'Meal plan', description: 'Fill your week manually', icon: UtensilsCrossedIcon },
{ key: 'home', label: 'Today', description: 'Back to your daily targets', icon: HomeIcon }];


export const RecipeErrorScreen: React.FC<RecipeErrorScreenProps> = ({ navigateTo, onRetry, attempt = 1 }) => {
  const isRepeatFailure = attempt > 1;

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] pb-8">
      <style>{`
        @keyframes cp-error-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) { .cp-error { animation: none !important; } }
      `}</style>

      <header className="flex items-center justify-between px-6 pb-2 pt-12">
        <span className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          Matching stopped
        </span>
        <button
          type="button"
          onClick={() => navigateTo('ingredient-confirmation')}
          aria-label="Close and review ingredients"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-[#F7F9F7]">
          
          <XIcon size={20} />
        </button>
      </header>

      <div className="cp-error px-6 pt-6 text-center" style={{ animation: 'cp-error-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#FEF3C7] text-4xl" role="img" aria-label="Empty plate">
          🍽️
        </div>
        <h1 className="mx-auto mt-6 max-w-[320px] text-[27px] font-bold leading-[1.15] tracking-tight text-[#1A1A1A]" style={{ fontFamily: 'var(--font-heading)' }}>
          We couldn’t match any recipes
        </h1>
        <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-relaxed text-[#64748B]">
          {isRepeatFailure ?
          'Still nothing this time. Your ingredients may be too few to combine into a full recipe — try adding a staple, or pick another route below.' :
          'This can happen when the scan picked up only a few items, or the connection dropped mid-match. Nothing was lost — you can run it again.'}
        </p>
      </div>

      <div className="mt-7 px-6">
        <button
          type="button"
          onClick={onRetry}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
          
          <RefreshCwIcon size={18} className="mr-2" /> Try matching again
        </button>
        <button
          type="button"
          onClick={() => navigateTo('ingredient-confirmation')}
          className="mt-3 h-12 w-full rounded-xl bg-white text-sm font-semibold text-[#374151] shadow-sm ring-1 ring-gray-100 transition-colors hover:bg-[#F7F9F7]">
          
          Review my ingredients
        </button>
      </div>

      <div className="mt-8 px-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">Or go somewhere else</h2>
        <div className="space-y-2">
          {destinations.map(({ key, label, description, icon: Icon }) =>
          <button
            key={key}
            type="button"
            onClick={() => navigateTo(key)}
            className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 text-left shadow-sm transition-colors hover:border-[#B7DDBB]">
            
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#4CAF50]">
                <Icon size={19} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#1A1A1A]">{label}</span>
                <span className="mt-0.5 block truncate text-xs text-[#64748B]">{description}</span>
              </span>
            </button>
          )}
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-[#94A3B8]">
          Attempt {attempt} · If this keeps happening, your ingredient photos may need better lighting.
        </p>
      </div>
    </div>);

};