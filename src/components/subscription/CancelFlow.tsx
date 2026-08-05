import React, { useState } from 'react';
import { ArrowLeftIcon, CheckIcon, HeartIcon, SparklesIcon } from 'lucide-react';
import { haptic } from '../../lib/haptics';
import { CalPalMark } from '../onboarding/CalPalMark';

type CancelStep = 'reason' | 'offer' | 'done';

interface CancelFlowProps {
  planLabel: string;
  planPrice: string;
  /** Date access ends if they go through with it. */
  accessUntil: string;
  onKeep: () => void;
  onAcceptOffer: () => void;
  onConfirmCancel: (reason: string) => void;
  onClose: () => void;
}

const reasons = [
'I don’t cook often enough',
'It costs too much',
'I’m not getting recipes I like',
'Something else'];


/** Headspace-style cancellation: ask why, make one honest offer, then confirm. */
export function CancelFlow({
  planLabel,
  planPrice,
  accessUntil,
  onKeep,
  onAcceptOffer,
  onConfirmCancel,
  onClose
}: CancelFlowProps) {
  const [step, setStep] = useState<CancelStep>('reason');
  const [reason, setReason] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="mx-auto min-h-full w-full max-w-[430px] pb-10">
        {step !== 'done' &&
        <div className="px-6 pt-12">
            <button
            type="button"
            onClick={() => step === 'reason' ? onClose() : setStep('reason')}
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
            
              <ArrowLeftIcon size={20} />
            </button>
            <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white shadow-sm">
              {step === 'reason' ? <HeartIcon size={22} /> : <SparklesIcon size={23} />}
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <CalPalMark size="sm" />
              <span className="rounded-full bg-[#EDF8EF] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#2F7D34]">
                Plus
              </span>
            </div>
          </div>
        }

        {step === 'reason' &&
        <div className="px-6 pt-4">
            <h1 className="mx-auto max-w-[320px] text-center text-[25px] font-extrabold leading-[1.16] tracking-tight text-[#1A1A1A]">
              Before you go
            </h1>
            <p className="mx-auto mt-2 max-w-[300px] text-center text-sm leading-relaxed text-[#68736D]">
              If you don’t mind sharing, we’d love to know why you’re leaving Cal Pal.
            </p>

            <div className="mt-7 space-y-3">
              {reasons.map((option) => {
              const isSelected = reason === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    haptic('light');
                    setReason(option);
                  }}
                  aria-pressed={isSelected}
                  className={`flex h-14 w-full items-center justify-center rounded-2xl border-2 px-4 text-sm font-semibold transition-all ${
                  isSelected ?
                  'border-[#1A1A1A] bg-[#1A1A1A] text-white' :
                  'border-[#E7EAE8] bg-[#F8F9F8] text-[#3C463F] hover:border-[#CFD6D2]'}`
                  }>
                  
                    {option}
                  </button>);

            })}
            </div>

            <button
            type="button"
            onClick={() => {
              haptic('selection');
              setStep('offer');
            }}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
              Continue with cancellation
            </button>
            <button
            type="button"
            onClick={onKeep}
            className="mt-3 h-12 w-full text-sm font-semibold text-[#58655E] transition-colors hover:text-[#1A1A1A]">
            
              Never mind, keep my plan
            </button>
          </div>
        }

        {step === 'offer' &&
        <div className="px-6 pt-4">
            <h1 className="mx-auto max-w-[320px] text-center text-[25px] font-extrabold leading-[1.16] tracking-tight text-[#1A1A1A]">
              Would half price help?
            </h1>

            <div className="mt-6 rounded-2xl bg-[#EDF8EF] px-5 py-4 text-center">
              <p className="text-sm text-[#68736D] line-through">
                {planPrice} / {planLabel.toLowerCase()}
              </p>
              <p className="mt-1 text-xl font-bold text-[#2F7D34]">
                Your price {halfPrice(planPrice)}
              </p>
            </div>

            <p className="mt-5 text-center text-sm leading-relaxed text-[#3C463F]">
              Stay with Cal Pal and get <strong>50% off</strong> your next {planLabel.toLowerCase()}.
            </p>
            <p className="mt-4 text-center text-sm leading-relaxed text-[#8A948F]">
              If you cancel, you’ll still have Plus until {accessUntil}. After that, recipe matching
              returns to the basic limit and your adaptive targets pause — you can come back anytime.
            </p>

            <button
            type="button"
            onClick={() => {
              haptic('selection');
              onAcceptOffer();
            }}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
              <SparklesIcon size={18} className="mr-2" /> Unlock 50% off
            </button>
            <button
            type="button"
            onClick={() => {
              onConfirmCancel(reason ?? 'Not given');
              setStep('done');
            }}
            className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl border-2 border-[#E7EAE8] text-sm font-semibold text-[#3C463F] transition-colors hover:border-[#CFD6D2]">
            
              Continue with cancellation
            </button>
          </div>
        }

        {step === 'done' &&
        <div className="flex min-h-screen flex-col justify-center px-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white">
              <CheckIcon size={30} strokeWidth={3} />
            </div>
            <h1 className="mt-6 text-[25px] font-extrabold leading-[1.16] tracking-tight text-[#1A1A1A]">
              Your plan is cancelled
            </h1>
            <p className="mx-auto mt-3 max-w-[300px] text-sm leading-relaxed text-[#68736D]">
              You’ll keep everything in Plus until {accessUntil}. Nothing else will be charged.
            </p>
            <button
            type="button"
            onClick={onClose}
            className="mt-9 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
              Back to subscription
            </button>
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