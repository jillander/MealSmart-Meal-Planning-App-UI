import React from 'react';
import { ArrowRightIcon } from 'lucide-react';

/** Shared frame for every question screen: title, subtitle, then content. */
export function QuestionLayout({
  title,
  subtitle,
  children




}: {title: string;subtitle: string;children: React.ReactNode;}) {
  return (
    <section key={title} className="flex min-h-[calc(100vh-104px)] flex-col">
      <style>{`
        @keyframes cp-question-in { 0% { opacity: 0; transform: translateY(12px) } 100% { opacity: 1; transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) { .cp-question { animation: none !important; } }
      `}</style>
      <div>
        <h1
          className="cp-question max-w-[360px] text-[31px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]"
          style={{ animation: 'cp-question-in 480ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
          
          {title}
        </h1>
        <p
          className="cp-question mt-3 max-w-[360px] text-[15px] leading-relaxed text-[#68736D]"
          style={{ animation: 'cp-question-in 480ms cubic-bezier(0.22, 1, 0.36, 1) 140ms both' }}>
          
          {subtitle}
        </p>
      </div>
      <div className="mt-7 flex-1">{children}</div>
    </section>);

}

export function ContinueButton({
  onClick,
  disabled = false,
  label = 'Continue'




}: {onClick: () => void;disabled?: boolean;label?: string;}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all enabled:hover:bg-[#2A2A2A] enabled:active:translate-y-0.5 enabled:active:shadow-[0_2px_0_#080808] disabled:bg-[#E7EBE9] disabled:text-[#9AA39E] disabled:shadow-none">
      
      {label} <ArrowRightIcon className="ml-2" size={19} />
    </button>);

}