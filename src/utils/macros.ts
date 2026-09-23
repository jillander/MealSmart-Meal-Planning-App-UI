export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroSource {
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

/**
 * Macros for a recipe. Explicit values win; anything missing is estimated
 * from the calorie total (protein at 4 kcal/g, then the remaining energy
 * split 55/45 between carbs and fat) so a card never shows a blank macro.
 */
export function getMacros(source: MacroSource): Macros {
  const protein = Math.max(0, Math.round(source.protein ?? 0));
  if (source.carbs !== undefined && source.fat !== undefined) {
    return { protein, carbs: Math.round(source.carbs), fat: Math.round(source.fat) };
  }

  const remaining = Math.max(0, source.calories - protein * 4);
  const carbs = source.carbs ?? Math.round(remaining * 0.55 / 4);
  const fat = source.fat ?? Math.round(remaining * 0.45 / 9);
  return { protein, carbs: Math.round(carbs), fat: Math.round(fat) };
}