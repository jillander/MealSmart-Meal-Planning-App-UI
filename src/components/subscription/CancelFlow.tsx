import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  PauseCircleIcon,
  SparklesIcon,
  XIcon } from
'lucide-react';
import { haptic } from '../../lib/haptics';

type CancelStep = 'reason' | 'alternatives' | 'confirm' | 'done';

interface CancelFlowProps {
  planLabel: string;
  planPrice: string;
  /** Date access ends if they go through with it. */
  accessUntil: string;
  onKeep: () => void;
  onAcceptOffer: () => void;
  /** Pauses billing for a number of months instead of cancelling. */
  onPause?: (months: number) => void;
  onConfirmCancel: (reason: string) => void;
  onClose: () => void;
}

const OTHER = 'Something else';

const reasons = [
{ label: 'I’m not cooking often enough', detail: 'Plans go unused most weeks' },
{ label: 'It costs too much', detail: 'The price doesn’t match how I use it' },
{ label: 'I’m not getting recipes I like', detail: 'Matches aren’t to my taste' },
{ label: 'I’ve reached my goal', detail: 'I don’t need tracking right now' },
{ label: OTHER, detail: 'Tell us in your own words' }];


const pauseOptions = [1, 2, 3];

/** What actually stops working, so the decision is informed rather than nudged. */
const losing = [
'Fridge and receipt scanning',
'Recipes matched to what you have',
'Photo calorie and macro logging',
'Weekly plans and shopping lists'];


/**
 * Three-step cancellation: understand why, offer a genuine alternative
 * (pause or half price), then confirm. Each step says where the user is,
 * so the flow never feels like it is trapping them.
 */
export function CancelFlow({
  planLabel,
  planPrice,
  accessUntil,
  onKeep,
  onAcceptOffer,
  onPause,
  onConfirmCancel,
  onClose
}: CancelFlowProps) {
  const [step, setStep] = useState<CancelStep>('reason');
  const [reason, setReason] = useState<string | null>(null);
  // "Something else" is only useful if they can say what it was.
  const [showOtherDialog, setShowOtherDialog] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [pauseMonths, setPauseMonths] = useState(1);

  const stepNumber = step === 'reason' ? 1 : step === 'alternatives' ? 2 : 3;
  const selectedReason =
  reason === OTHER && otherReason.trim() ? `Something else: ${otherReason.trim()}` : reason;

  const goBack = () => {
    if (step === 'reason') return onClose();
    setStep(step === 'confirm' ? 'alternatives' : 'reason');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="mx-auto min-h-full w-full max-w-[430px] pb-10">
        {step !== 'done' &&
        <header className="sticky top-0 z-10 bg-white/95 px-6 pb-3 pt-12 backdrop-blur">
            <div className="flex items-center justify-between">
              <button
              type="button"
              onClick={goBack}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
              
                <ArrowLeftIcon size={20} />
              </button>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#94A3B8]">
                Step {stepNumber} of 3
              </span>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#A7AFA9] transition-colors hover:bg-[#F3F4F6] hover:text-[#1A1A1A]">
              
                <XIcon size={18} />
              </button>
            </div>
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((index) =>
            <span
              key={index}
              className={`h-1 flex-1 rounded-full ${
              index <= stepNumber ? 'bg-[#1A1A1A]' : 'bg-[#E7EAE8]'}`
              } />

            )}
            </div>
          </header>
        }

        {/* 1 — Why they are leaving */}
        {step === 'reason' &&
        <div className="px-6 pt-6">
            <h1 className="text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]">
              We&rsquo;re sad to see you go
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#68736D]">
              Before you cancel, help us understand what didn&rsquo;t work. It takes one tap and it
              genuinely shapes what we build next.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E7EAE8]">
              {reasons.map((option, index) => {
              const isSelected = reason === option.label;
              const isOther = option.label === OTHER;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => {
                    haptic('light');
                    setReason(option.label);
                    if (isOther) setShowOtherDialog(true);
                  }}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-3.5 px-4 py-4 text-left transition-colors ${
                  index === reasons.length - 1 ? '' : 'border-b border-[#EFF1F0]'} ${
                  isSelected ? 'bg-[#F6F7F6]' : 'bg-white hover:bg-[#FAFBFA]'}`}>
                  
                    <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ?
                    'border-[#1A1A1A] bg-[#1A1A1A] text-white' :
                    'border-[#CFD6D2] text-transparent'}`
                    }>
                    
                      <CheckIcon size={11} strokeWidth={3} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold leading-tight text-[#1A1A1A]">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-[#8A948F]">
                        {isOther && isSelected && otherReason.trim() ?
                      `“${otherReason.trim()}”` :
                      option.detail}
                      </span>
                    </span>
                    {isOther &&
                  <ChevronRightIcon size={16} className="shrink-0 text-[#A7AFA9]" />
                  }
                  </button>);

            })}
            </div>

            <button
            type="button"
            onClick={() => {
              haptic('selection');
              setStep('alternatives');
            }}
            disabled={!reason}
            className="mt-7 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#EFF1F0] disabled:text-[#9AA39E]">
            
              Continue
            </button>
            <button
            type="button"
            onClick={onKeep}
            className="mt-3 h-12 w-full text-sm font-semibold text-[#58655E] transition-colors hover:text-[#1A1A1A]">
            
              Never mind, keep my plan
            </button>
          </div>
        }

        {/* 2 — A real alternative: pause, or half price */}
        {step === 'alternatives' &&
        <div className="px-6 pt-6">
            <h1 className="text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]">
              Take a break instead?
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#68736D]">
              Pausing keeps your plan, targets, and saved recipes exactly as they are. Nothing is
              charged while you&rsquo;re paused.
            </p>

            <div className="mt-6 rounded-2xl border-2 border-[#1A1A1A] bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1A1A1A] text-white">
                  <PauseCircleIcon size={18} />
                </span>
                <div>
                  <p className="text-[15px] font-bold leading-tight text-[#1A1A1A]">
                    Pause my membership
                  </p>
                  <p className="text-xs text-[#68736D]">Billing stops, your data stays</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {pauseOptions.map((months) =>
              <button
                key={months}
                type="button"
                onClick={() => {
                  haptic('light');
                  setPauseMonths(months);
                }}
                aria-pressed={pauseMonths === months}
                className={`rounded-xl border-2 py-3 text-[13px] font-bold transition-colors ${
                pauseMonths === months ?
                'border-[#1A1A1A] bg-[#1A1A1A] text-white' :
                'border-[#E1E6E3] bg-white text-[#1A1A1A] hover:bg-[#F8F9FA]'}`
                }>
                
                    {months} {months === 1 ? 'month' : 'months'}
                  </button>
              )}
              </div>
              <button
              type="button"
              onClick={() => {
                haptic('selection');
                onPause?.(pauseMonths);
              }}
              className="mt-3 flex w-full items-center justify-center rounded-2xl bg-[#1A1A1A] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#2A2A2A]">
              
                Pause for {pauseMonths} {pauseMonths === 1 ? 'month' : 'months'}
                <ArrowRightIcon size={17} className="ml-2" />
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-[#E7EAE8] bg-[#FAFBFA] p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#2F7D34]">
                  <SparklesIcon size={18} />
                </span>
                <div>
                  <p className="text-[15px] font-bold leading-tight text-[#1A1A1A]">
                    Or stay for half price
                  </p>
                  <p className="text-xs text-[#68736D]">
                    <span className="line-through">{planPrice}</span> {halfPrice(planPrice)} for
                    your next {planLabel.toLowerCase()}
                  </p>
                </div>
              </div>
              <button
              type="button"
              onClick={() => {
                haptic('selection');
                onAcceptOffer();
              }}
              className="mt-4 flex w-full items-center justify-center rounded-2xl border-2 border-[#1A1A1A] py-3.5 text-[15px] font-bold text-[#1A1A1A] transition-colors hover:bg-[#F1F3F2]">
              
                Unlock 50% off
              </button>
            </div>

            <button
            type="button"
            onClick={() => setStep('confirm')}
            className="mt-6 h-12 w-full text-sm font-semibold text-[#8A948F] underline underline-offset-4 transition-colors hover:text-[#1A1A1A]">
            
              No thanks, continue cancelling
            </button>
          </div>
        }

        {/* 3 — Confirm, with the consequences stated plainly */}
        {step === 'confirm' &&
        <div className="px-6 pt-6">
            <h1 className="text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]">
              Cancel your membership?
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#68736D]">
              You&rsquo;ll keep everything until <strong className="text-[#1A1A1A]">{accessUntil}</strong>.
              After that, these stop working:
            </p>

            <ul className="mt-5 space-y-2">
              {losing.map((item) =>
            <li
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-[#E7EAE8] bg-white px-4 py-3.5">
              
                  <XIcon size={15} className="shrink-0 text-[#EF4444]" strokeWidth={2.5} />
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">{item}</span>
                </li>
            )}
            </ul>

            <p className="mt-4 text-[13px] leading-relaxed text-[#8A948F]">
              Your logged meals and plan are kept for 30 days, so resubscribing picks up where you
              left off.
            </p>

            <button
            type="button"
            onClick={() => {
              haptic('selection');
              onConfirmCancel(selectedReason ?? 'Not given');
              setStep('done');
            }}
            className="mt-7 flex h-14 w-full items-center justify-center rounded-2xl border-2 border-[#EF4444] text-base font-bold text-[#EF4444] transition-colors hover:bg-[#FEF2F2]">
            
              Cancel my membership
            </button>
            <button
            type="button"
            onClick={onKeep}
            className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
              Keep my membership
            </button>
          </div>
        }

        {step === 'done' &&
        <div className="flex min-h-screen flex-col justify-center px-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white">
              <CheckIcon size={30} strokeWidth={3} />
            </div>
            <h1 className="mt-6 text-[26px] font-extrabold leading-[1.14] tracking-tight text-[#1A1A1A]">
              Your membership is cancelled
            </h1>
            <p className="mx-auto mt-3 max-w-[310px] text-[15px] leading-relaxed text-[#68736D]">
              You&rsquo;ll keep everything in Plus until {accessUntil}. Nothing else will be charged.
            </p>
            <p className="mx-auto mt-4 max-w-[310px] text-[13px] leading-relaxed text-[#8A948F]">
              Thanks for telling us why — it goes straight to the team.
            </p>
            <button
            type="button"
            onClick={onClose}
            className="mt-9 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
              Back to subscription
            </button>
          </div>
        }

        {showOtherDialog &&
        <div
          className="fixed inset-0 z-[60] flex items-end bg-black/50 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Tell us what happened">
          
            <div className="mx-auto w-full max-w-[430px] rounded-t-3xl bg-white p-6 sm:rounded-3xl">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />
              <h2 className="text-xl font-bold leading-tight text-[#1A1A1A]">
                What made you decide to leave?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#68736D]">
                Anything you tell us here goes straight to the team building Cal Pal.
              </p>
              <label htmlFor="cancel-other" className="sr-only">
                Your reason
              </label>
              <textarea
              id="cancel-other"
              value={otherReason}
              onChange={(event) => setOtherReason(event.target.value)}
              rows={4}
              maxLength={300}
              autoFocus
              placeholder="In your own words…"
              className="mt-4 w-full resize-none rounded-2xl border-2 border-[#E1E6E3] bg-white p-4 text-[16px] leading-relaxed text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A] placeholder:text-[#A7AFA9]" />
            
              <p className="mt-1.5 text-right text-[11px] text-[#A7AFA9]">
                {otherReason.length}/300
              </p>
              <button
              type="button"
              onClick={() => {
                haptic('selection');
                setShowOtherDialog(false);
              }}
              className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A]">
              
                Save my reason
              </button>
              <button
              type="button"
              onClick={() => {
                setShowOtherDialog(false);
                setOtherReason('');
              }}
              className="mt-2 h-11 w-full text-sm font-semibold text-[#8A948F] transition-colors hover:text-[#1A1A1A]">
              
                Skip this
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}

/** Halves a "$49.98" style price for the retention offer. */
function halfPrice(price: string): string {
  const value = Number(price.replace(/[^0-9.]/g, ''));
  if (!value) return price;
  return `$${(value / 2).toFixed(2)}`;
}