import React, { useState } from 'react';
import { BellIcon, CheckIcon, CheckCircle2Icon, FlameIcon, LinkIcon } from 'lucide-react';

interface ReminderStepProps {times: string[];onTimesChange: (times: string[]) => void;onComplete: () => void;}
const reminderOptions = ['Breakfast', 'Lunch', 'Dinner'];

export function ReminderStep({ times, onTimesChange, onComplete }: ReminderStepProps) {
  const [enabled, setEnabled] = useState(false);
  const toggleTime = (time: string) => onTimesChange(times.includes(time) ? times.filter((item) => item !== time) : [...times, time]);
  const enableReminders = () => {
    setEnabled(true);
    window.setTimeout(onComplete, 700);
  };

  return (
    <section className="flex min-h-screen flex-col bg-[#FAFBFA] px-5 pb-8 pt-10 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#1A1A1A] text-white shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4CAF50] text-white"><FlameIcon size={26} fill="currentColor" /></span></div>
      <div className="mx-auto -mt-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm ring-1 ring-[#E1E6E3]"><LinkIcon size={13} className="text-[#89938E]" /><BellIcon size={15} className="text-[#4CAF50]" /></div>
      <p className="mt-7 text-sm font-bold uppercase tracking-[0.14em] text-[#4CAF50]">A small habit cue</p>
      <h1 className="mt-2 text-[31px] font-extrabold leading-[1.1] tracking-tight">Stay on track</h1>
      <p className="mx-auto mt-2 max-w-[330px] text-[16px] leading-relaxed text-[#68736D]">Never miss a meal plan.</p>
      <div className="mt-7 space-y-3 text-left"><Benefit>We’ll remind you to plan and log at the right moments.</Benefit><Benefit>People who turn on reminders are far more likely to hit their goal.</Benefit></div>
      <div className="mt-7 rounded-2xl border border-[#E1E6E3] bg-white p-4 text-left shadow-sm"><p className="text-sm font-bold text-[#1A1A1A]">When should we check in?</p><p className="mt-1 text-xs leading-relaxed text-[#68736D]">Pick the moments that fit your routine.</p><div className="mt-4 flex flex-wrap gap-2">{reminderOptions.map((time) => {const selected = times.includes(time);return <button key={time} type="button" onClick={() => toggleTime(time)} aria-pressed={selected} className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${selected ? 'border-[#4CAF50] bg-[#EDF8EF] text-[#2F7D34]' : 'border-[#E1E6E3] bg-white text-[#68736D]'}`}>{selected && <CheckIcon className="mr-1 inline" size={14} strokeWidth={3} />}{time}</button>;})}</div></div>
      <button type="button" onClick={enableReminders} disabled={enabled} className="mt-auto flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all active:translate-y-0.5 active:shadow-[0_2px_0_#080808] disabled:bg-[#2F7D34] disabled:shadow-none">{enabled ? <><CheckCircle2Icon className="mr-2" size={19} /> Reminders on</> : 'Turn on reminders'}</button>
      <button type="button" onClick={onComplete} className="mt-4 text-sm font-semibold text-[#58655E] hover:text-[#1A1A1A]">Not now</button>
    </section>);

}

function Benefit({ children }: {children: React.ReactNode;}) {return <div className="flex items-start gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white"><CheckIcon size={12} strokeWidth={3} /></span><p className="text-sm leading-relaxed text-[#3C463F]">{children}</p></div>;}