import React from 'react';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { getProjectionDetails, type ProjectionPace } from '../../lib/projection';

type ProjectionGoal = 'lose' | 'maintain' | 'muscle' | 'consistent' | 'healthy' | null;

interface ProjectionChartProps {
  weightKg: number | string;
  goalWeight: number | string;
  pace: ProjectionPace;
  goal: ProjectionGoal;
}

export function ProjectionChart({ weightKg, goalWeight, pace, goal }: ProjectionChartProps) {
  const current = Number(weightKg);
  const target = Number(goalWeight);
  const isWeightJourney = (goal === 'lose' || goal === 'muscle') && Number.isFinite(current) && Number.isFinite(target);
  const projection = isWeightJourney ? getProjectionDetails(current, target, pace) : null;
  const isLoss = target < current;
  const chartPath = isLoss ? 'M 16 33 C 58 35, 94 69, 142 73 S 224 64, 276 91' : 'M 16 91 C 58 88, 94 55, 142 51 S 224 59, 276 33';
  const fillPath = `${chartPath} L 276 110 L 16 110 Z`;
  const startY = isLoss ? 33 : 91;
  const endY = isLoss ? 91 : 33;
  const Icon = isLoss ? TrendingDownIcon : TrendingUpIcon;

  if (!projection) {
    return (
      <div className="rounded-2xl border border-[#E1E6E3] bg-white p-4 text-left shadow-sm">
        <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-[#1A1A1A]">Here’s where you’re headed</p><p className="mt-0.5 text-xs text-[#68736D]">A steady, flexible rhythm that keeps you on track.</p></div><span className="rounded-full bg-[#EDF8EF] px-2.5 py-1 text-xs font-bold text-[#2F7D34]">Stay steady</span></div>
        <svg className="mt-4 h-[96px] w-full" viewBox="0 0 292 112" role="img" aria-label="A flat band showing steady progress">
          <defs><linearGradient id="steady-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#4CAF50" stopOpacity="0.20" /><stop offset="1" stopColor="#4CAF50" stopOpacity="0.02" /></linearGradient></defs>
          <path d="M 14 57 C 82 48, 148 64, 278 56 L 278 82 C 148 90, 82 74, 14 83 Z" fill="url(#steady-fill)" />
          <path d="M 14 70 C 82 61, 148 77, 278 69" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
          <path d="M 14 70 H 278" stroke="#B7DDBB" strokeDasharray="4 5" />
          <circle cx="278" cy="69" r="5" fill="#4CAF50" /><circle cx="278" cy="69" r="10" fill="#4CAF50" opacity="0.15" />
        </svg>
        <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-[#89938E]"><span>Today</span><span>Keep going</span><span>On track</span></div>
      </div>);

  }

  return (
    <div className="rounded-2xl border border-[#E1E6E3] bg-white p-4 text-left shadow-sm">
      <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-[#1A1A1A]">Here’s where you’re headed</p><p className="mt-0.5 text-xs text-[#68736D]">A {pace} pace, built for consistency.</p></div><span className="flex shrink-0 items-center gap-1 rounded-full bg-[#EDF8EF] px-2.5 py-1 text-xs font-bold text-[#2F7D34]"><Icon size={13} /> {projection.weeks} wk</span></div>
      <div className="relative mt-3">
        <svg className="h-[116px] w-full overflow-visible" viewBox="0 0 292 122" role="img" aria-label={`Weight projection from ${current} kilograms to ${target} kilograms by ${projection.projectedDate}`}>
          <defs><linearGradient id="projection-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#4CAF50" stopOpacity="0.25" /><stop offset="1" stopColor="#4CAF50" stopOpacity="0.02" /></linearGradient></defs>
          <path d="M 16 26 H 276" stroke="#C7CFCA" strokeDasharray="4 5" />
          <path d={fillPath} fill="url(#projection-fill)" />
          <path d={chartPath} fill="none" stroke="#4CAF50" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="16" cy={startY} r="4.5" fill="#1A1A1A" />
          <circle cx="276" cy={endY} r="11" fill="#4CAF50" opacity="0.14"><animate attributeName="r" values="8;13;8" dur="2.2s" repeatCount="indefinite" /></circle>
          <circle cx="276" cy={endY} r="5" fill="#4CAF50" />
          <text x="16" y="117" fill="#89938E" fontSize="10" fontWeight="600">Today</text><text x="141" y="117" fill="#89938E" fontSize="10" fontWeight="600" textAnchor="middle">Week {Math.max(1, Math.round(projection.weeks / 2))}</text><text x="276" y="117" fill="#89938E" fontSize="10" fontWeight="600" textAnchor="end">{projection.projectedDate}</text>
        </svg>
        <div className="absolute right-0 top-0 rounded-lg bg-[#1A1A1A] px-2 py-1 text-[10px] font-bold text-white shadow-sm">{target} kg · {projection.projectedDate}</div>
      </div>
    </div>);

}