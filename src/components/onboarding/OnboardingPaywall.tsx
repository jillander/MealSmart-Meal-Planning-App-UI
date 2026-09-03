import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  SparklesIcon,
  LockIcon } from
'lucide-react';
import { CalPalMark } from './CalPalMark';
import { subscriptionPlans } from '../../data/subscriptionPlans';
import type { PlanId } from '../../data/subscriptionPlans';

interface OnboardingPaywallProps {
  goalLabel: string;
  calorieGoal: number;
  proteinGoal: number;
  goalWeight: string | null;
  projectedDate: string | null;
  onSubscribe: () => void;
  onSkip: () => void;
}

const plans = subscriptionPlans;

/** Basic is a real, usable tier — not a locked shell. */
const basicIncluded = [
'The plan and daily targets you just built',
'3 fridge scans and recipe matches a month',
'Manual meal logging and a 7-day history',
'A starter set of recipes'];


const plusOnly = [
'Unlimited scanning and recipe matching',
'Photo calorie logging for meals you have eaten',
'Targets that adapt as your weight changes',
'Weekly meal planning and automatic shopping lists',
'The full recipe library and filters',
'Full progress history and your projected goal date'];


export function OnboardingPaywall({
  goalLabel,
  calorieGoal,
  proteinGoal,
  goalWeight,
  projectedDate,
  onSubscribe,
  onSkip
}: OnboardingPaywallProps) {
  const [selected, setSelected] = useState<PlanId>('annual');
  const [showBasicDetail, setShowBasicDetail] = useState(false);
  const perks = [
  `Hit ${proteinGoal}g protein and ${calorieGoal.toLocaleString()} cal every day`,
  ...(goalWeight && projectedDate ? [`Reach ${goalWeight} kg by ${projectedDate}`] : []),
  'Turn the ingredients you have into recipes'];


  return (
    <section className="mx-auto flex min-h-[calc(100vh-104px)] w-full max-w-[390px] flex-col">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white shadow-sm">
          <SparklesIcon size={23} />
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <CalPalMark size="sm" />
          <span className="rounded-full bg-[#EDF8EF] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#2F7D34]">
            Plus
          </span>
        </div>
        <h1 className="mx-auto mt-3 max-w-[320px] text-[25px] font-extrabold leading-[1.16] tracking-tight text-[#1A1A1A]">
          Keep building toward {goalLabel.toLowerCase()}.
        </h1>
      </div>

      <div className="mt-5 rounded-2xl border border-[#E1E6E3] bg-white p-3.5 text-left shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#2F7D34]"><CreditCardIcon size={17} /></span>
          <div><p className="text-sm font-bold text-[#1A1A1A]">Everything that supports your plan</p><p className="mt-0.5 text-xs leading-relaxed text-[#68736D]">Pick the membership that fits your routine. Cancel anytime.</p></div>
        </div>
        <div className="mt-3 space-y-2">
          {perks.map((perk) =>
          <div key={perk} className="flex items-center gap-2.5">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white"><CheckIcon size={10} strokeWidth={3} /></span>
              <span className="text-xs leading-snug text-[#3C463F]">{perk}</span>
            </div>
          )}
        </div>
      </div>

      {/* Plans */}
      <div className="mt-5 space-y-2.5">
        {plans.map((plan) => {
          const isSelected = selected === plan.id;
          return (
            <button
              type="button"
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${isSelected ? 'border-[#4CAF50] bg-[#EDF8EF]' : 'border-[#E1E6E3] bg-white hover:border-[#B7DDBB]'}`}>
              
              {plan.badge &&
              <span className="absolute -top-2.5 right-4 rounded-full bg-[#4CAF50] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              }
              <div className="flex min-w-0 items-center gap-3">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#C7CFCA] text-transparent'}`}><CheckIcon size={12} strokeWidth={3} /></span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1A1A1A]">{plan.label}</p>
                  <p className="text-xs text-[#68736D]">{plan.strikethrough && <><span className="mr-1 line-through">{plan.strikethrough}</span><span className="mr-1 text-[10px]">Launch pricing</span></>}{plan.price}</p>
                </div>
              </div>
              <span className="shrink-0 whitespace-nowrap text-sm font-bold text-[#1A1A1A]">{plan.perMonth}</span>
            </button>);

        })}
      </div>

      <p className="mt-3 text-center text-xs font-semibold text-[#68736D]">
        Cancel anytime · No commitment
      </p>

      <div className="mt-4">
        <button
          type="button"
          onClick={onSubscribe}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
          
          Start my Plus journey <ArrowRightIcon className="ml-2" size={19} />
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="mt-3 flex w-full items-center justify-center gap-1.5 py-1 text-sm font-semibold text-[#58655E] hover:text-[#1A1A1A]">
          
          Continue with basic plan
        </button>
        <button
          type="button"
          onClick={() => setShowBasicDetail((open) => !open)}
          aria-expanded={showBasicDetail}
          className="mt-1.5 flex w-full items-center justify-center gap-1 text-xs font-semibold text-[#8A948F] hover:text-[#1A1A1A]">
          
          What&rsquo;s in the basic plan?
          <ChevronDownIcon
            size={13}
            className={`transition-transform ${showBasicDetail ? 'rotate-180' : ''}`} />
          
        </button>
        {showBasicDetail &&
        <div className="mt-3 rounded-2xl border border-[#E1E6E3] bg-white p-4">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#2F7D34]">
              Basic keeps
            </p>
            <ul className="mt-2 space-y-1.5">
              {basicIncluded.map((item) =>
            <li key={item} className="flex gap-2 text-[13px] leading-snug text-[#3C463F]">
                  <CheckIcon size={14} className="mt-0.5 shrink-0 text-[#4CAF50]" />
                  {item}
                </li>
            )}
            </ul>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-[#94A3B8]">
              Plus unlocks
            </p>
            <ul className="mt-2 space-y-1.5">
              {plusOnly.map((item) =>
            <li key={item} className="flex gap-2 text-[13px] leading-snug text-[#68736D]">
                  <LockIcon size={13} className="mt-0.5 shrink-0 text-[#A7AFA9]" />
                  {item}
                </li>
            )}
            </ul>
          </div>
        }
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-center text-[10px] leading-relaxed text-[#8A948F]">
          <LockIcon size={11} /> Secure payment <span>· Restore purchase</span> <span>· No free trial</span>
        </p>
      </div>
    </section>);

}

function TimelineRow({
  icon: Icon,
  title,
  body,
  accent = false,
  last = false






}: {icon: React.ComponentType<{size?: number;className?: string;}>;title: string;body: string;accent?: boolean;last?: boolean;}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${accent ? 'bg-[#4CAF50] text-white' : 'bg-[#EEF2EF] text-[#59645E]'}`}>
          
          <Icon size={16} />
        </span>
        {!last && <span className="my-1 w-0.5 flex-1 bg-[#E4E9E5]" />}
      </div>
      <div className={last ? '' : 'pb-3'}>
        <p className="text-sm font-bold text-[#1A1A1A]">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#68736D]">{body}</p>
      </div>
    </div>);

}