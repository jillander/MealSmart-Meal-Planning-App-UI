import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { SubscriptionPlan } from '../../data/subscriptionPlans';

interface PlanOptionCardProps {
  plan: SubscriptionPlan;
  selected: boolean;
  /** Marks the plan the user is already paying for. */
  current?: boolean;
  onSelect: () => void;
}

/** Selectable plan row, matching the onboarding paywall's plan treatment. */
export function PlanOptionCard({ plan, selected, current = false, onSelect }: PlanOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all ${
      selected ? 'border-[#1A1A1A] bg-[#F6F7F6]' : 'border-[#E1E6E3] bg-white hover:border-[#C7CFCA]'}`
      }>
      
      {(current || plan.badge) &&
      <span
        className={`absolute -top-2.5 right-4 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
        current ? 'bg-[#4CAF50] text-white' : 'bg-[#1A1A1A] text-white'}`
        }>
        
          {current ? 'Current plan' : plan.badge}
        </span>
      }
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-[#C7CFCA] text-transparent'}`
          }>
          
          <CheckIcon size={12} strokeWidth={3} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#1A1A1A]">{plan.label}</p>
          <p className="text-xs text-[#68736D]">
            {plan.strikethrough &&
            <>
                <span className="mr-1 line-through">{plan.strikethrough}</span>
                <span className="mr-1 text-[10px]">Launch pricing</span>
              </>
            }
            {plan.price} · {plan.billedAs}
          </p>
        </div>
      </div>
      <span className="shrink-0 whitespace-nowrap text-sm font-bold text-[#1A1A1A]">{plan.perMonth}</span>
    </button>);

}