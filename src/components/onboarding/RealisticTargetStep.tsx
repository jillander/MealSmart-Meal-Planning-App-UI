import React from 'react';
import { ArrowRightIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { getProjectionDetails, type ProjectionPace } from '../../lib/projection';

interface RealisticTargetStepProps {
  weightKg: string;
  goalWeight: string;
  pace: ProjectionPace;
  /** Whether this goal has a weight target at all. */
  hasWeightTarget: boolean;
  goalLabel: string;
  onContinue: () => void;
}

/**
 * Reassurance immediately after the pace choice: the number they picked is
 * achievable, shown as a curve that draws itself toward the goal.
 */
export function RealisticTargetStep({
  weightKg,
  goalWeight,
  pace,
  hasWeightTarget,
  goalLabel,
  onContinue
}: RealisticTargetStepProps) {
  const current = Number(weightKg);
  const target = Number(goalWeight);
  const projection = hasWeightTarget ? getProjectionDetails(current, target, pace) : null;
  const isLoss = target < current;
  const delta = Math.abs(current - target);
  const Icon = isLoss ? TrendingDownIcon : TrendingUpIcon;

  const line = isLoss ?
  'M 18 30 C 70 34, 118 72, 166 80 S 250 74, 292 96' :
  'M 18 96 C 70 92, 118 54, 166 46 S 250 52, 292 30';
  const area = `${line} L 292 118 L 18 118 Z`;
  const endY = isLoss ? 96 : 30;

  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col">
      <style>{`
        @keyframes cp-draw { from { stroke-dashoffset: 620 } to { stroke-dashoffset: 0 } }
        @keyframes cp-area { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cp-pin { 0% { opacity: 0; transform: scale(.4) } 100% { opacity: 1; transform: scale(1) } }
        @keyframes cp-fade-up { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) {
          .cp-target * { animation: none !important; stroke-dashoffset: 0 !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="cp-target flex flex-1 flex-col justify-center">
        <div style={{ animation: 'cp-fade-up 420ms cubic-bezier(0.22,1,0.36,1) both' }}>
          <h1 className="text-[31px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]">
            {projection ?
            <>
                {isLoss ? 'Losing' : 'Gaining'}{' '}
                <span className="text-[#2F7D34]">{delta} kg</span> is a realistic target.
              </> :

            <>
                <span className="text-[#2F7D34]">{goalLabel}</span> is absolutely doable.
              </>
            }
          </h1>
          <p className="mt-3 max-w-[350px] text-[15px] leading-relaxed text-[#68736D]">
            {projection ?
            `At a ${pace} pace that’s about ${projection.weeklyRate} kg a week — steady enough to hold onto, and you should be there around ${projection.projectedDate}.` :
            'We’ll keep your targets flexible so good days are easy to repeat and off days don’t undo them.'}
          </p>
        </div>

        {/* The curve draws itself toward the goal marker */}
        <div
          className="mt-8 rounded-3xl border border-[#E7EBE8] bg-white p-4 shadow-sm"
          style={{ animation: 'cp-fade-up 460ms cubic-bezier(0.22,1,0.36,1) 120ms both' }}>
          
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#1A1A1A]">Your projected path</p>
              <p className="mt-0.5 text-xs text-[#68736D]">
                {projection ? `${current} kg today → ${target} kg` : 'Consistency, not perfection'}
              </p>
            </div>
            {projection &&
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#EDF8EF] px-2.5 py-1 text-xs font-bold text-[#2F7D34]">
                <Icon size={13} /> {projection.weeks} wk
              </span>
            }
          </div>

          <svg
            className="mt-3 h-[132px] w-full overflow-visible"
            viewBox="0 0 310 132"
            role="img"
            aria-label={
            projection ?
            `A curve from ${current} kilograms today to ${target} kilograms around ${projection.projectedDate}` :
            'A steady, level path'
            }>
            
            <defs>
              <linearGradient id="cp-target-fill" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#4CAF50" stopOpacity="0.24" />
                <stop offset="1" stopColor="#4CAF50" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={`M 18 ${endY} H 292`} stroke="#DCE3DE" strokeDasharray="4 5" />
            <path
              d={area}
              fill="url(#cp-target-fill)"
              style={{ animation: 'cp-area 700ms ease-out 700ms both' }} />
            
            <path
              d={line}
              fill="none"
              stroke="#4CAF50"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="620"
              style={{ animation: 'cp-draw 1400ms cubic-bezier(0.22,1,0.36,1) 200ms both' }} />
            
            <circle cx="18" cy={isLoss ? 30 : 96} r="5" fill="#1A1A1A" />
            <g style={{ animation: 'cp-pin 420ms cubic-bezier(0.34,1.56,0.64,1) 1500ms both' }}>
              <circle cx="292" cy={endY} r="12" fill="#4CAF50" opacity="0.16" />
              <circle cx="292" cy={endY} r="5.5" fill="#4CAF50" />
            </g>
            <text x="18" y="129" fill="#89938E" fontSize="10" fontWeight="600">
              Today
            </text>
            {projection &&
            <text x="292" y="129" fill="#89938E" fontSize="10" fontWeight="600" textAnchor="end">
                {projection.projectedDate}
              </text>
            }
          </svg>
        </div>

        <p
          className="mt-5 text-center text-[13px] leading-relaxed text-[#78837D]"
          style={{ animation: 'cp-fade-up 420ms ease-out 1700ms both' }}>
          
          You can change your pace any time — nothing here is locked in.
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
        
        Continue <ArrowRightIcon className="ml-2" size={19} />
      </button>
    </section>);

}