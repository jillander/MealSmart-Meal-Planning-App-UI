import React, { useEffect, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { haptic } from '../../lib/haptics';

export interface WheelOption {
  /** The stored value, always in the canonical unit. */
  value: number;
  label: string;
}

interface WheelPickerProps {
  options: WheelOption[];
  value: number;
  onChange: (value: number) => void;
  ariaLabel: string;
}

const ITEM = 46;
const VISIBLE = 5;

/**
 * A scrollable value wheel, so details can be set by flicking rather than
 * typing. Nudge buttons sit alongside for keyboard and precise adjustment.
 */
export function WheelPicker({ options, value, onChange, ariaLabel }: WheelPickerProps) {
  const list = useRef<HTMLDivElement | null>(null);
  const settle = useRef<number | undefined>(undefined);

  const foundIndex = options.findIndex((option) => option.value === value);
  const selectedIndex = foundIndex < 0 ? Math.floor(options.length / 2) : foundIndex;

  // Keep the wheel aligned whenever the value changes from outside a scroll.
  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const target = selectedIndex * ITEM;
    if (Math.abs(element.scrollTop - target) > 2) element.scrollTop = target;
  }, [selectedIndex]);

  const commit = (index: number) => {
    const next = options[Math.min(options.length - 1, Math.max(0, index))];
    if (next && next.value !== value) {
      haptic('light');
      onChange(next.value);
    }
  };

  const handleScroll = () => {
    const element = list.current;
    if (!element) return;
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => commit(Math.round(element.scrollTop / ITEM)), 70);
  };

  const step = (delta: number) => {
    const index = Math.min(options.length - 1, Math.max(0, selectedIndex + delta));
    const element = list.current;
    if (element) element.scrollTop = index * ITEM;
    commit(index);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={selectedIndex === 0}
          aria-label={`Decrease ${ariaLabel}`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E1E6E3] bg-white text-[#59645E] transition-colors hover:border-[#B7DDBB] disabled:opacity-40">
          
          <ChevronUpIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={selectedIndex === options.length - 1}
          aria-label={`Increase ${ariaLabel}`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E1E6E3] bg-white text-[#59645E] transition-colors hover:border-[#B7DDBB] disabled:opacity-40">
          
          <ChevronDownIcon size={18} />
        </button>
      </div>

      <div className="relative flex-1" style={{ height: ITEM * VISIBLE }}>
        {/* The selected row sits in a fixed pill at the centre */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-2xl bg-[#F1F5F2]"
          style={{ height: ITEM }} />
        
        <div
          ref={list}
          onScroll={handleScroll}
          role="listbox"
          aria-label={ariaLabel}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              step(-1);
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              step(1);
            }
          }}
          className="scrollbar-hide relative h-full overflow-y-auto outline-none"
          style={{
            scrollSnapType: 'y mandatory',
            paddingTop: ITEM * 2,
            paddingBottom: ITEM * 2
          }}>
          
          {options.map((option, index) => {
            const distance = Math.abs(index - selectedIndex);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.55 : distance === 2 ? 0.28 : 0.12;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={distance === 0}
                className="flex items-center justify-center"
                style={{ height: ITEM, scrollSnapAlign: 'center', opacity }}>
                
                <span
                  className={
                  distance === 0 ?
                  'text-[23px] font-extrabold tracking-tight text-[#1A1A1A]' :
                  'text-[18px] font-semibold text-[#59645E]'
                  }>
                  
                  {option.label}
                </span>
              </div>);

          })}
        </div>
      </div>

      {/* Keeps the wheel optically centred against the nudge column */}
      <div className="w-10" aria-hidden="true" />
    </div>);

}