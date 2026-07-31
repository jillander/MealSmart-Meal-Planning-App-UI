export type NutritionGoal = 'lose' | 'maintain' | 'muscle' | 'consistent' | 'healthy' | null;
export type TargetPace = 'gentle' | 'steady' | 'focused';

export interface NutritionTargets {
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export function computeTargets(goal: NutritionGoal, pace: TargetPace): NutritionTargets {
  if (goal === 'muscle') return { calorieGoal: 2220, proteinGoal: 132, carbsGoal: 278, fatGoal: 74 };
  if (goal === 'lose') {
    const calorieGoal = pace === 'gentle' ? 1840 : pace === 'focused' ? 1580 : 1710;
    return { calorieGoal, proteinGoal: 112, carbsGoal: pace === 'focused' ? 150 : 175, fatGoal: pace === 'focused' ? 52 : 57 };
  }
  if (goal === 'maintain') return { calorieGoal: 2050, proteinGoal: 104, carbsGoal: 242, fatGoal: 68 };
  return { calorieGoal: 1900, proteinGoal: 98, carbsGoal: 220, fatGoal: 63 };
}