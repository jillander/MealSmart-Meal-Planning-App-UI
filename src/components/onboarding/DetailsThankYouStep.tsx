import React from 'react';
import { ArrowRightIcon, CheckIcon, HeartHandshakeIcon, LockIcon } from 'lucide-react';

export interface ReviewItem {
  label: string;
  value: string;
}

interface DetailsThankYouStepProps {
  items: ReviewItem[];
  onContinue: () => void;
}

/**
 * The payoff at the end of the question run: thanks them, shows the answers
 * their plan will be built from, then hands over to plan building.
 */
export function DetailsThankYouStep({ items, onContinue }: DetailsThankYouStepProps) {
  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col">
      <style>{`
        @keyframes cp-seal { 0% { transform: scale(.55); opacity: 0 } 62% { transform: scale(1.1) } 100% { transform: scale(1); opacity: 1 } }
        @keyframes cp-ring { 0% { transform: scale(.7); opacity: .5 } 100% { transform: scale(1.5); opacity: 0 } }
        @keyframes cp-spark { 0% { transform: translateY(0) scale(0); opacity: 0 } 35% { opacity: 1 } 100% { transform: translateY(-58px) scale(1); opacity: 0 } }
        @keyframes cp-row { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) {
          .cp-thanks * { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="cp-thanks flex flex-1 flex-col items-center text-center">
        <div className="relative mt-4">
          {[-46, -26, -6, 16, 38].map((left, position) =>
          <span
            key={left}
            aria-hidden="true"
            className="absolute block h-2 w-2 rounded-full"
            style={{
              left,
              top: 14,
              background: ['#4CAF50', '#FFB020', '#1A1A1A', '#4CAF50', '#FFB020'][position],
              animation: `cp-spark ${880 + position * 130}ms ease-out ${
              220 + position * 70}ms both`

            }} />

          )}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[32px] border-2 border-[#4CAF50]"
            style={{ animation: 'cp-ring 900ms ease-out 260ms both' }} />
          
          <div
            className="flex h-24 w-24 items-center justify-center rounded-[32px] bg-[#4CAF50] text-white shadow-[0_12px_26px_-10px_rgba(47,125,52,0.7)]"
            style={{ animation: 'cp-seal 520ms cubic-bezier(0.34,1.56,0.64,1) both' }}>
            
            <HeartHandshakeIcon size={46} strokeWidth={2.1} />
          </div>
        </div>

        <h1 className="mt-7 text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#1A1A1A]">
          Thank you for trusting us
        </h1>
        <p className="mx-auto mt-3 max-w-[320px] text-[16px] leading-relaxed text-[#68736D]">
          That’s everything we need — we can now build your plan.
        </p>

        <div className="mt-8 w-full space-y-2 text-left">
          {items.map((item, position) =>
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl border border-[#E7EAE8] bg-white px-4 py-3.5"
            style={{
              animation: `cp-row 380ms cubic-bezier(0.22,1,0.36,1) ${560 + position * 90}ms both`
            }}>
            
              <span className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDF8EF] text-[#2F7D34]">
                  <CheckIcon size={13} strokeWidth={3.5} />
                </span>
                <span className="text-[13px] font-semibold text-[#68736D]">{item.label}</span>
              </span>
              <span className="text-[15px] font-bold text-[#1A1A1A]">{item.value}</span>
            </div>
          )}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-[13px] text-[#78837D]">
          <LockIcon size={14} className="text-[#4CAF50]" />
          Private to you, and used only to personalize your plan.
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
        
        Build my plan <ArrowRightIcon className="ml-2" size={19} />
      </button>
    </section>);

}