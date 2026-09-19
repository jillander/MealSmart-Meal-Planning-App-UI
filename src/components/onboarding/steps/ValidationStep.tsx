import React from 'react';
import { BrainCircuitIcon, SparklesIcon } from 'lucide-react';
import { ContinueButton } from './QuestionLayout';

interface ValidationStepProps {
  goalLabel: string;
  empathy: string;
  promise: string;
  onContinue: () => void;
}

/** Step 3. Reflects their barrier back before asking for anything else. */
export function ValidationStep({
  goalLabel,
  empathy,
  promise,
  onContinue
}: ValidationStepProps) {
  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col justify-between py-5 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E6F6E8] text-[#4CAF50]">
        <SparklesIcon size={38} />
      </div>

      <div className="my-auto">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4CAF50]">
          You’re not alone
        </p>
        <h1 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-tight">
          Honestly, {empathy}
        </h1>
        <p className="mx-auto mt-4 max-w-[330px] text-[16px] leading-relaxed text-[#68736D]">
          {promise}
        </p>
      </div>

      <div className="rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-[#E9EFEB]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] text-white">
            <BrainCircuitIcon size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">
              Built around your goal to {goalLabel.toLowerCase()}
            </p>
            <p className="text-xs text-[#68736D]">Not a one-size-fits-all diet.</p>
          </div>
        </div>
      </div>

      <ContinueButton label="Show me how Cal Pal helps" onClick={onContinue} />
    </section>);

}