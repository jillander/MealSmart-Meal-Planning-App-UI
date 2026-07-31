import React from 'react';
import { ArrowRightIcon, CheckCircle2Icon, SparklesIcon } from 'lucide-react';

interface PremiumWelcomeStepProps {
  goalLabel: string;
  proteinGoal: number;
  onStart: () => void;
}

export function PremiumWelcomeStep({ goalLabel, proteinGoal, onStart }: PremiumWelcomeStepProps) {
  return (
    <section className="flex min-h-screen flex-col overflow-hidden bg-[#FAFBFA] px-5 pb-8 pt-8 text-center">
      <div className="mx-auto flex items-center gap-1.5 rounded-full bg-[#EDF8EF] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#2F7D34]">
        <CheckCircle2Icon size={14} /> Cal Pal Plus activated
      </div>
      <div className="relative mx-auto mt-5 w-full max-w-[350px] overflow-hidden rounded-[28px] border border-[#E1E6E3] bg-white p-2 shadow-[0_12px_30px_rgba(26,26,26,0.10)]">
        <img src="/54599839-0fe6-4ef4-b304-2f47ff5f3baf.jpg" alt="A Cal Pal meal plan with meals for the day" className="h-[245px] w-full rounded-[20px] object-cover object-top" />
        <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#4CAF50] text-white shadow-lg"><SparklesIcon size={17} /></span>
      </div>
      <div className="mx-auto mt-6 max-w-[355px]">
        <h1 className="text-[33px] font-extrabold leading-[1.08] tracking-tight text-[#1A1A1A]">Your plan is ready for its first meal.</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[#59645E]">Your Plus plan is ready to support your goal to {goalLabel.toLowerCase()}. Start with one meal today—momentum follows.</p>
      </div>
      <div className="mx-auto mt-5 flex w-full max-w-[350px] items-center gap-3 rounded-2xl border border-[#E1E6E3] bg-white p-3 text-left shadow-sm">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#2F7D34]"><CheckCircle2Icon size={20} /></span>
        <div><p className="text-sm font-bold text-[#1A1A1A]">Make today count</p><p className="mt-0.5 text-xs leading-relaxed text-[#68736D]">Choose a meal that fits your {proteinGoal}g protein target.</p></div>
      </div>
      <button type="button" onClick={onStart} className="mt-auto flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-[transform,box-shadow,background-color] hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">Start with my first meal <ArrowRightIcon className="ml-2" size={19} /></button>
      <p className="mt-4 text-xs text-[#7A857F]">Small choices, repeated often, make the difference.</p>
    </section>);

}