import React from "react";
import { CheckIcon, BoxIcon } from "lucide-react";
interface OnboardingChoiceCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  icon?: BoxIcon;
  multiSelect?: boolean;
}
export function OnboardingChoiceCard({
  label,
  description,
  selected,
  onClick,
  icon: Icon,
  multiSelect = false
}: OnboardingChoiceCardProps) {
  return <button type="button" onClick={onClick} aria-pressed={selected} className={`flex w-full items-center rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.99] ${selected ? 'border-[#4CAF50] bg-[#EDF8EF] shadow-[0_2px_8px_rgba(76,175,80,0.12)]' : 'border-[#E1E6E3] bg-white hover:border-[#B7DDBB]'}`}>
      {Icon && <div className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-[#4CAF50] text-white' : 'bg-[#F4F7F5] text-[#4A5C50]'}`}>
          <Icon size={19} strokeWidth={2.1} />
        </div>}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-tight text-[#1A1A1A]">
          {label}
        </span>
        {description && <span className="mt-1 block text-xs leading-snug text-[#6B756F]">
            {description}
          </span>}
      </span>
      <span className={`ml-3 flex h-6 w-6 shrink-0 items-center justify-center border-2 ${multiSelect ? 'rounded-md' : 'rounded-full'} ${selected ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#C7CFCA] bg-white text-transparent'}`} aria-hidden="true">
        <CheckIcon size={15} strokeWidth={3} />
      </span>
    </button>;
}