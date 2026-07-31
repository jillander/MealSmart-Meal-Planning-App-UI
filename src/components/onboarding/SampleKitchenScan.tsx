import React, { useEffect, useState } from 'react';
import { CheckIcon, PlusIcon, ScanLineIcon, SparklesIcon } from 'lucide-react';

export interface Detection {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
}

export const sampleDetections: Detection[] = [
{ id: 'chicken', label: 'Chicken', detail: '2 breasts', x: 23, y: 26 },
{ id: 'spinach', label: 'Spinach', detail: '1 bunch', x: 78, y: 27 },
{ id: 'tomatoes', label: 'Tomatoes', detail: '12 cherry', x: 51, y: 50 },
{ id: 'peppers', label: 'Peppers', detail: '2 bell', x: 22, y: 76 },
{ id: 'rice', label: 'Rice', detail: '1 bowl', x: 80, y: 76 }];


interface SampleKitchenScanProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export function SampleKitchenScan({ selected, onToggle }: SampleKitchenScanProps) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(sampleDetections.length);
      return undefined;
    }
    const timeouts = sampleDetections.map((_, index) =>
    window.setTimeout(() => setRevealed(index + 1), 260 + index * 190)
    );
    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, []);

  const isScanning = revealed < sampleDetections.length;

  return (
    <div>
      <style>{`
        @keyframes cp-pin-in { from { opacity: 0; transform: translate(-50%, -46%) scale(.82) } to { opacity: 1; transform: translate(-50%, -50%) scale(1) } }
        @keyframes cp-sweep { 0% { transform: translateY(-6%) } 100% { transform: translateY(104%) } }
        @media (prefers-reduced-motion: reduce) { .cp-sweep, .cp-pin { animation: none !important; } }
      `}</style>

      <div className="relative overflow-hidden rounded-[24px] border border-[#E1E6E3] bg-white shadow-[0_10px_28px_rgba(26,26,26,0.10)]">
        <div className="relative">
          <img
            src="/f82eecda-4fe1-4c59-ae63-f3bfc48b12b7.jpg"
            alt="Sample kitchen counter with chicken, spinach, tomatoes, peppers and rice"
            className="h-[320px] w-full object-cover" />
          

          {isScanning &&
          <span
            className="cp-sweep pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(76,175,80,0)_0%,rgba(76,175,80,0.28)_70%,rgba(127,217,138,0.9)_100%)]"
            style={{ animation: 'cp-sweep 1.15s cubic-bezier(0.25, 1, 0.5, 1) infinite' }} />

          }

          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#1A1A1A]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            <ScanLineIcon size={12} /> Sample kitchen
          </span>

          {sampleDetections.map((detection, index) => {
            const isVisible = index < revealed;
            const isSelected = selected.includes(detection.id);
            if (!isVisible) return null;
            return (
              <button
                key={detection.id}
                type="button"
                onClick={() => onToggle(detection.id)}
                aria-pressed={isSelected}
                className="cp-pin absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${detection.x}%`, top: `${detection.y}%`, animation: 'cp-pin-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
                
                <span
                  className={`flex items-center gap-1.5 rounded-full border-2 py-1 pl-1 pr-2.5 shadow-lg transition-colors ${isSelected ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-white/80 bg-white/92 text-[#1A1A1A] backdrop-blur-sm'}`}>
                  
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full ${isSelected ? 'bg-white/25 text-white' : 'bg-[#EDF8EF] text-[#2F7D34]'}`}>
                    {isSelected ? <CheckIcon size={12} strokeWidth={3} /> : <PlusIcon size={12} strokeWidth={3} />}
                  </span>
                  <span className="text-[11px] font-extrabold leading-none">{detection.label}</span>
                  <span className={`text-[10px] leading-none ${isSelected ? 'text-white/80' : 'text-[#68736D]'}`}>{detection.detail}</span>
                </span>
              </button>);

          })}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#EDF0EE] px-3.5 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#2F7D34]"><SparklesIcon size={16} /></span>
            <div className="text-left">
              <p className="text-xs font-bold text-[#1A1A1A]">{isScanning ? 'Detecting ingredients…' : `${sampleDetections.length} ingredients detected`}</p>
              <p className="mt-0.5 text-[11px] text-[#68736D]">{isScanning ? 'Pre-scanned demo — instant results' : 'Tap any tag to include or remove it'}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-[#1A1A1A] px-2.5 py-1 text-[11px] font-extrabold text-white">{selected.length}/{sampleDetections.length}</span>
        </div>
      </div>
    </div>);

}