import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';

interface OnboardingProgressProps {
  current: number;
  total: number;
  onBack?: () => void;
  showBack?: boolean;
}

export function OnboardingProgress({
  current,
  total,
  onBack,
  showBack = true
}: OnboardingProgressProps) {
  const progress = Math.min(100, Math.max(0, current / total * 100));

  return (
    <div className="flex items-center gap-3 px-5 pt-5">
      {showBack ?
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1A1A1A] transition-colors hover:bg-[#F3F4F6] active:scale-95">
        
          <ArrowLeftIcon size={21} strokeWidth={2.25} />
        </button> :

      <div className="h-10 w-10 shrink-0" />
      }
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-[#E7EBEA]"
        role="progressbar"
        aria-label={`Onboarding progress: step ${current} of ${total}`}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}>
        
        <div
          className="h-full rounded-full bg-[#4CAF50] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }} />
        
      </div>
      <span className="w-10 text-right text-xs font-semibold tabular-nums text-[#7C8581]">
        {current}/{total}
      </span>
    </div>);

}