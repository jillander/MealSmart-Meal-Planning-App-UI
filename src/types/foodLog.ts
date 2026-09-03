/** One food Cal Pal recognised on the plate. */
export interface DetectedFood {
  id: string;
  name: string;
  /** Portion as described, e.g. "1 cup" or "120 g". */
  portionLabel: string;
  /** How many of that portion the user is logging. Adjustable in 0.5 steps. */
  quantity: number;
  /** Per-portion nutrition. */
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  /** Recognition confidence, 0–1. Drives the "check this one" hint. */
  confidence: number;
}

export interface PlateAnalysis {
  /** Best guess at the dish as a whole. */
  dishName: string;
  image: string;
  items: DetectedFood[];
}

export interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

/** Sums every included item, scaled by its quantity. */
export function totalMacros(items: DetectedFood[]): MacroTotals {
  return items.reduce<MacroTotals>(
    (totals, item) => ({
      calories: totals.calories + item.calories * item.quantity,
      protein: totals.protein + item.protein * item.quantity,
      carbs: totals.carbs + item.carbs * item.quantity,
      fat: totals.fat + item.fat * item.quantity
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}