import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CameraIcon,
  CheckIcon,
  ClockIcon,
  LockIcon,
  ScanLineIcon,
  ShoppingBasketIcon,
  SparklesIcon,
  TrendingUpIcon } from
'lucide-react';
import { CalPalMark } from '../onboarding/CalPalMark';
import { PlanOptionCard } from './PlanOptionCard';
import { getPlan, subscriptionPlans, type PlanId } from '../../data/subscriptionPlans';
import { TRIAL_DAYS } from '../../hooks/useSubscription';
import { haptic } from '../../lib/haptics';

interface TrialEndedScreenProps {
  /** The plan the user picked when they started the trial. */
  planId: PlanId;
  /** Continues onto the selected plan and starts billing. */
  onContinue: (planId: PlanId) => void;
  /** Ends the subscription — only called after the confirmation step. */
  onDecline: () => void;
}

/** What the trial actually delivered — used as the reminder before cancelling. */
const keptBenefits = [
{ icon: ScanLineIcon, label: 'Fridge and receipt scans, up to 5 a day' },
{ icon: CameraIcon, label: 'Photo calorie and macro logging' },
{ icon: TrendingUpIcon, label: 'Targets that adapt as your weight changes' },
{ icon: ShoppingBasketIcon, label: 'Weekly plans and automatic shopping lists' }];


/** Stated plainly rather than as a scare tactic — Cal Pal needs a plan to work. */
const withoutPlus = [
'No scanning, so no recipes from your ingredients',
'No photo logging, adaptive targets, or shopping lists',
'Your plan and logged meals are kept for 30 days'];


/**
 * Blocking screen shown the moment a free trial lapses without payment.
 * It is deliberately a full screen rather than a dismissible toast: the
 * account genuinely cannot continue until the user chooses.
 */
export function TrialEndedScreen({ planId, onContinue, onDecline }: TrialEndedScreenProps) {
  const [step, setStep] = useState<'ended' | 'confirm'>('ended');
  const [selected, setSelected] = useState<PlanId>(planId);
  const [showPlans, setShowPlans] = useState(false);

  const plan = getPlan(selected);
  const startedOn = getPlan(planId);

  if (step === 'confirm') {
    return (
      <section
        className="fixed inset-0 z-50 overflow-y-auto bg-[#F8F9FA]"
        role="dialog"
        aria-modal="true"
        aria-label="Confirm losing Cal Pal Plus">
        
        <div className="mx-auto w-full max-w-[430px] px-6 pb-10 pt-14">
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
            <h1 className="mx-auto mt-3 max-w-[300px] text-[26px] font-extrabold leading-[1.14] tracking-tight text-[#1A1A1A]">
              Sure you want to give this up?
            </h1>
            <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-relaxed text-[#68736D]">
              These are the things you used over the last {TRIAL_DAYS} days.
            </p>
          </div>

          <ul className="mt-6 space-y-2.5">
            {keptBenefits.map((benefit) =>
            <li
              key={benefit.label}
              className="flex items-center gap-3.5 rounded-2xl border border-[#E1E6E3] bg-white p-4 shadow-sm">
              
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#2F7D34]">
                  <benefit.icon size={18} strokeWidth={2.2} />
                </span>
                <span className="text-[14px] font-semibold leading-snug text-[#1A1A1A]">
                  {benefit.label}
                </span>
              </li>
            )}
          </ul>

          <div className="mt-4 rounded-2xl bg-[#F1F3F2] p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#94A3B8]">
              Without Plus
            </p>
            <ul className="mt-2 space-y-1.5">
              {withoutPlus.map((item) =>
              <li key={item} className="flex gap-2 text-[13px] leading-snug text-[#68736D]">
                  <LockIcon size={13} className="mt-0.5 shrink-0 text-[#A7AFA9]" />
                  {item}
                </li>
              )}
            </ul>
            <p className="mt-3 text-[12px] leading-relaxed text-[#8A948F]">
              You can restart any time and pick up where you left off.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              haptic('selection');
              onContinue(selected);
            }}
            className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] active:scale-[0.99]">
            
            Keep Plus — {plan.price} {plan.billedAs.toLowerCase()}
          </button>
          <button
            type="button"
            onClick={() => {
              haptic('light');
              onDecline();
            }}
            className="mt-3 w-full py-2 text-center text-sm font-semibold text-[#8A948F] underline underline-offset-4 transition-colors hover:text-[#1A1A1A]">
            
            No thanks, end my subscription
          </button>
        </div>
      </section>);

  }

  return (
    <section
      className="fixed inset-0 z-50 overflow-y-auto bg-[#F8F9FA]"
      role="dialog"
      aria-modal="true"
      aria-label="Your free trial has ended">
      
      <div className="mx-auto w-full max-w-[430px] px-6 pb-10 pt-14">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white shadow-sm">
            <ClockIcon size={23} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <CalPalMark size="sm" />
            <span className="rounded-full bg-[#FFF3D6] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#8A5A00]">
              Trial ended
            </span>
          </div>
          <h1 className="mx-auto mt-3 max-w-[310px] text-[27px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]">
            Your {TRIAL_DAYS}-day trial has ended
          </h1>
          <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-relaxed text-[#68736D]">
            Nothing has been charged. Continue on the {startedOn.label} plan you picked to
            keep scanning, logging, and planning without a break.
          </p>
        </div>

        {/* What is paused right now — the reason to act */}
        <div className="mt-6 rounded-2xl bg-[#1A1A1A] p-5 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <LockIcon size={15} className="text-[#8BD98F]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#8BD98F]">
              Paused until you continue
            </span>
          </div>
          <ul className="mt-3.5 space-y-2.5">
            {keptBenefits.map((benefit) =>
            <li key={benefit.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/85">
                  <benefit.icon size={15} strokeWidth={2.2} />
                </span>
                <span className="text-[13.5px] font-medium leading-snug text-white/85">
                  {benefit.label}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Plan choice — continue as-is, or move up a tier */}
        {showPlans ?
        <div className="mt-5 space-y-2.5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#94A3B8]">
              Choose your plan
            </p>
            {subscriptionPlans.map((option) =>
          <PlanOptionCard
            key={option.id}
            plan={option}
            selected={selected === option.id}
            onSelect={() => {
              haptic('light');
              setSelected(option.id);
            }} />

          )}
          </div> :

        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border-2 border-[#1A1A1A] bg-white px-4 py-4">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#2F7D34]">
                <CheckIcon size={12} strokeWidth={3} /> Your plan
              </p>
              <p className="mt-1 text-[15px] font-bold text-[#1A1A1A]">{plan.label}</p>
              <p className="text-xs text-[#68736D]">
                {plan.price} · {plan.billedAs}
              </p>
            </div>
            <span className="shrink-0 whitespace-nowrap text-sm font-bold text-[#1A1A1A]">
              {plan.perMonth}
            </span>
          </div>
        }

        <button
          type="button"
          onClick={() => {
            haptic('selection');
            onContinue(selected);
          }}
          className="mt-5 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] active:scale-[0.99]">
          
          Continue with {plan.label}
          <ArrowRightIcon size={18} className="ml-2" />
        </button>

        <button
          type="button"
          onClick={() => {
            haptic('light');
            setShowPlans((open) => !open);
          }}
          className="mt-3 flex w-full items-center justify-center gap-1.5 py-1 text-sm font-bold text-[#1A1A1A] hover:opacity-70">
          
          <SparklesIcon size={15} />
          {showPlans ? 'Hide other plans' : 'Upgrade or change plan'}
        </button>

        <button
          type="button"
          onClick={() => {
            haptic('light');
            setStep('confirm');
          }}
          className="mt-4 w-full py-2 text-center text-sm font-semibold text-[#8A948F] underline underline-offset-4 transition-colors hover:text-[#1A1A1A]">
          
          Not now — end my subscription
        </button>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 text-center text-[10px] leading-relaxed text-[#8A948F]">
          <LockIcon size={11} /> Secure payment <span>· Cancel any time</span>
        </p>
      </div>
    </section>);

}