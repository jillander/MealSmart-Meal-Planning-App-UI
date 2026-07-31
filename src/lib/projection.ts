export type ProjectionPace = 'gentle' | 'steady' | 'focused';

export interface ProjectionDetails {
  weeks: number;
  projectedDate: string;
  weeklyRate: number;
}

export const WEEKLY_RATES: Record<ProjectionPace, number> = {
  gentle: 0.25,
  steady: 0.5,
  focused: 0.75
};

export function getProjectionDetails(
weightKg: number | string,
goalWeightKg: number | string,
pace: ProjectionPace,
today = new Date())
: ProjectionDetails | null {
  const current = Number(weightKg);
  const goal = Number(goalWeightKg);
  if (!Number.isFinite(current) || !Number.isFinite(goal) || Math.abs(current - goal) < 0.1) return null;

  const weeklyRate = WEEKLY_RATES[pace];
  const weeks = Math.max(1, Math.round(Math.abs(current - goal) / weeklyRate));
  const date = new Date(today);
  date.setDate(date.getDate() + weeks * 7);

  return {
    weeks,
    weeklyRate,
    projectedDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  };
}