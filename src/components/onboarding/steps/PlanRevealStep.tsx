import React from 'react';
import { FlameIcon } from 'lucide-react';
import { ProjectionChart } from '../ProjectionChart';
import { ContinueButton } from './QuestionLayout';
import type { NutritionTargets } from '../../../lib/targets';
import type { Goal, Pace } from '../../../data/onboardingOptions';

interface PlanRevealStepProps {
  targets: NutritionTargets;
  weightKg: string;
  goalWeight: string;
  pace: Pace;
  goal: Goal | null;
  commitmentLine: string;
  commitmentDetail: string;
  onContinue: () => void;
}

/** Step 11. The payoff: their calorie target, macros, and projected path. */
export function PlanRevealStep({
  targets,
  weightKg,
  goalWeight,
  pace,
  goal,
  commitmentLine,
  commitmentDetail,
  onContinue
}: PlanRevealStepProps) {
  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white">
        <FlameIcon size={26} />
      </div>
      <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-[#4CAF50]">
        Your starting plan is ready
      </p>
      <h1 className="mt-2 text-[30px] font-extrabold leading-[1.1] tracking-tight">
        A realistic target for your real life.
      </h1>

      <div className="mt-5 rounded-[26px] bg-[#1A1A1A] p-5 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
          Daily energy target
        </p>
        <div className="mt-2 flex items-baseline justify-center">
          <span className="text-5xl font-extrabold tracking-tight">
            {targets.calorieGoal.toLocaleString()}
          </span>
          <span className="ml-2 text-sm font-semibold text-white/65">calories</span>
        </div>
        <div className="mt-5 grid grid-cols-3 border-t border-white/15 pt-4 text-left">
          <Stat label="Protein" value={`${targets.proteinGoal}g`} />
          <Stat label="Carbs" value={`${targets.carbsGoal}g`} />
          <Stat label="Fats" value={`${targets.fatGoal}g`} />
        </div>
      </div>

      <div className="mt-4">
        <ProjectionChart weightKg={weightKg} goalWeight={goalWeight} pace={pace} goal={goal} />
      </div>

      <div className="mt-3 rounded-2xl bg-[#EDF8EF] p-3.5 text-left">
        <p className="text-sm font-bold text-[#286B2D]">{commitmentLine}</p>
        <p className="mt-1 text-xs leading-relaxed text-[#496150]">{commitmentDetail}</p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#7A857F]">
        This is a flexible starting estimate, not medical advice. You can adjust it anytime.
      </p>

      <ContinueButton label="This looks good" onClick={onContinue} />
    </section>);

}

function Stat({ label, value }: {label: string;value: string;}) {
  return (
    <div className="border-r border-white/15 px-3 first:pl-0 last:border-r-0 last:pr-0">
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-1 text-base font-bold">{value}</p>
    </div>);

}