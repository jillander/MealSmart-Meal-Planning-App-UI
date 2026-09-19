import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';
import { OFFER_PERCENT, annualOffer } from '../../data/launchOffer';
import { haptic } from '../../lib/haptics';

interface LaunchOfferScreenProps {
  /** Claim the discounted yearly plan. */
  onClaim: (planId: 'annual') => void;
  onDismiss: () => void;
  onRestore: () => void;
}

/**
 * The special offer. One number carries the screen — the percentage off —
 * followed by the price it works out to and a single plan to accept.
 *
 * Apple 3.1.2: the BILLED amount is the most prominent price on the screen.
 */
export function LaunchOfferScreen({ onClaim, onDismiss, onRestore }: LaunchOfferScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-offer-heading">
      
      <style>{`
        @keyframes cp-offer-in { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes cp-offer-pop { 0% { opacity: 0; transform: scale(0.94) } 100% { opacity: 1; transform: scale(1) } }
        @media (prefers-reduced-motion: reduce) {
          .cp-offer * { animation: none !important; }
        }
      `}</style>

      <div className="cp-offer mx-auto flex min-h-full w-full max-w-[430px] flex-col px-6 pb-8 pt-4">
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close offer"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A] transition-colors hover:bg-[#F3F4F4]">
          
          <XIcon size={24} strokeWidth={2.5} />
        </button>

        <h1
          id="launch-offer-heading"
          ref={headingRef}
          tabIndex={-1}
          className="mt-6 text-center text-[34px] font-extrabold leading-tight tracking-tight text-[#1A1A1A] outline-none"
          style={{ animation: 'cp-offer-in 400ms cubic-bezier(0.22,1,0.36,1) both' }}>
          
          Your special offer
        </h1>

        {/* The discount itself — the first and largest thing on the screen */}
        <div
          className="relative mx-auto mt-8 w-full max-w-[300px]"
          style={{ animation: 'cp-offer-pop 460ms cubic-bezier(0.22,1,0.36,1) 80ms both' }}>
          
          <Sparkle className="absolute -left-5 top-8 h-9 w-9 text-[#1A1A1A]" />
          <Sparkle className="absolute -left-1 -top-2 h-5 w-5 text-[#B6BBC4]" />
          <Sparkle className="absolute -left-4 bottom-2 h-4 w-4 text-[#1A1A1A]" />
          <Sparkle className="absolute -right-5 top-5 h-10 w-10 text-[#1A1A1A]" />
          <Sparkle className="absolute -right-2 bottom-8 h-6 w-6 text-[#B6BBC4]" />
          <Sparkle className="absolute -right-3 bottom-0 h-4 w-4 text-[#1A1A1A]" />

          <div className="flex h-[150px] items-center justify-center rounded-[26px] bg-[#1A1A1A] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]">
            <span className="text-[46px] font-extrabold tracking-tight text-white">
              {OFFER_PERCENT} OFF
            </span>
          </div>
        </div>

        <div
          className="mt-7 text-center"
          style={{ animation: 'cp-offer-in 420ms cubic-bezier(0.22,1,0.36,1) 160ms both' }}>
          
          <p className="text-[26px] leading-tight tracking-tight text-[#1A1A1A]">
            <span className="font-extrabold line-through">{annualOffer.standard}</span>{' '}
            <span className="font-medium text-[#3D4643]">{annualOffer.price}/year</span>
          </p>
          <p className="mt-1.5 text-[22px] font-medium leading-snug text-[#4A5350]">
            {OFFER_PERCENT} less than our monthly rate!
          </p>
        </div>

        {/* The one plan on offer */}
        <div
          className="mt-auto pt-10"
          style={{ animation: 'cp-offer-in 420ms cubic-bezier(0.22,1,0.36,1) 220ms both' }}>
          
          <div className="overflow-hidden rounded-2xl border-2 border-[#1A1A1A]">
            <p className="bg-[#1A1A1A] py-1.5 text-center text-[13px] font-extrabold uppercase tracking-[0.08em] text-white">
              3-day free trial
            </p>
            <div className="flex items-center justify-between bg-white px-4 py-3.5">
              <div>
                <p className="text-[18px] font-extrabold tracking-tight text-[#1A1A1A]">
                  Yearly plan
                </p>
                <p className="mt-0.5 text-[15px] text-[#8A918E]">{annualOffer.term}</p>
              </div>
              <p className="text-[20px] font-extrabold tracking-tight text-[#1A1A1A]">
                {annualOffer.price}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              haptic('success');
              onClaim('annual');
            }}
            className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-[17px] font-extrabold text-white transition-all hover:bg-[#2A2A2A] active:scale-[0.99]">
            
            Claim my {OFFER_PERCENT} off
          </button>

          <p className="mt-4 text-center text-[13px] text-[#8A918E]">
            3 days free, then {annualOffer.price} per year.
          </p>
          <p className="mt-2 text-center text-[13px] leading-relaxed text-[#A4ABA8]">
            Billed annually and renews automatically unless canceled in the App Store.
          </p>
          <p className="mt-3 text-center text-[13px] text-[#8A918E]">
            <button type="button" className="hover:text-[#1A1A1A] hover:underline">
              Terms
            </button>
            {' · '}
            <button type="button" className="hover:text-[#1A1A1A] hover:underline">
              Privacy
            </button>
            {' · '}
            <button type="button" onClick={onRestore} className="hover:text-[#1A1A1A] hover:underline">
              Restore
            </button>
          </p>
        </div>
      </div>
    </div>);

}

/** Four-point sparkle, matching the burst around the discount card. */
function Sparkle({ className }: {className: string;}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 5.7 5.7 10.8 12 12-6.3 1.2-11.4 6.3-12 12-.6-5.7-5.7-10.8-12-12C6.3 10.8 11.4 5.7 12 0z" />
    </svg>);

}