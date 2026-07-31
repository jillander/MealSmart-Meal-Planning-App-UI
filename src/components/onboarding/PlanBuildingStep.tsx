import React, { useEffect, useState } from 'react';
import { CheckCircle2Icon, SparklesIcon } from 'lucide-react';

type PlanStage = 0 | 1 | 2;

interface PlanBuildingStepProps {
  goalLabel: string;
  pace: string;
  preferences: string[];
  cuisines: string[];
  onContinue: () => void;
}

export function PlanBuildingStep({ goalLabel, pace, preferences, cuisines, onContinue }: PlanBuildingStepProps) {
  const [stage, setStage] = useState<PlanStage>(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const preference = preferences.includes('high-protein') ? 'high-protein meals' : preferences.includes('quick') ? 'quick meals' : cuisines[0] ? `${cuisines[0]} ideas` : 'meals you’ll enjoy';

  useEffect(() => {
    const shouldReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(shouldReduce);
    if (shouldReduce) {
      setStage(2);
      return undefined;
    }
    const first = window.setTimeout(() => setStage(1), 750);
    const second = window.setTimeout(() => setStage(2), 1500);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, []);

  const messages = [
  `Calibrating your plan for ${goalLabel.toLowerCase()}.`,
  `Prioritizing ${preference}.`,
  `Setting a ${pace} pace you can keep.`];


  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col items-center justify-center text-center">
      <style>{`@keyframes cp-plan-orbit { to { transform: rotate(360deg) } } @keyframes cp-plan-arrive { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } } @media (prefers-reduced-motion: reduce) { .cp-plan-orbit { animation: none !important; } }`}</style>
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="cp-plan-orbit absolute inset-0 rounded-full border-2 border-dashed border-[#A8D9AC]" style={{ animation: reduceMotion ? 'none' : 'cp-plan-orbit 5s linear infinite' }} />
        <div className="absolute inset-4 rounded-full border border-[#DCEBDD]" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#1A1A1A] text-white shadow-lg"><SparklesIcon size={28} /></div>
      </div>
      <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] text-[#4CAF50]">Personalizing your plan</p>
      <h1 className="mt-2 max-w-[330px] text-[32px] font-extrabold leading-[1.1] tracking-tight">Putting your answers to work.</h1>
      <p className="mt-3 max-w-[320px] text-[15px] leading-relaxed text-[#68736D]">We’re shaping a starting point around your real life—not a generic meal plan.</p>
      <div className="mt-8 w-full max-w-[340px] space-y-3 text-left">
        {messages.map((message, index) => {
          const complete = stage > index;
          const active = stage === index;
          return <div key={message} className="flex items-center gap-3 rounded-2xl border border-[#E1E6E3] bg-white p-3.5 shadow-sm" style={{ animation: `cp-plan-arrive 360ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 90}ms both` }}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${complete ? 'bg-[#4CAF50] text-white' : active ? 'bg-[#EDF8EF] text-[#2F7D34]' : 'bg-[#F1F4F2] text-[#A1AAA4]'}`}>{complete ? <CheckCircle2Icon size={17} /> : <span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-[#4CAF50]' : 'bg-[#C9D0CC]'}`} />}</span><span className={`text-sm font-semibold ${complete || active ? 'text-[#1A1A1A]' : 'text-[#89938E]'}`}>{message}</span></div>;
        })}
      </div>
      <button type="button" onClick={onContinue} disabled={stage < 2} className="mt-10 flex h-14 w-full max-w-[340px] items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-[opacity,transform,box-shadow] active:translate-y-0.5 active:shadow-[0_2px_0_#080808] disabled:opacity-35 disabled:shadow-none">Show my plan</button>
    </section>);

}