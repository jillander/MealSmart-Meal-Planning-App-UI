import type { DetectedFood } from '../types/foodLog';

/** Nutrition for one portion of a food, before any quantity multiplier. */
export interface CommonFood {
  id: string;
  name: string;
  portionLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  /** Grouping used by the add sheet. */
  group: 'Protein' | 'Carbs' | 'Vegetables' | 'Fats & extras' | 'Drinks';
}

/** The foods most often missed by a photo — sauces, drinks, and sides. */
export const commonFoods: CommonFood[] = [
{ id: 'cf-chicken', name: 'Grilled chicken breast', portionLabel: '100 g', calories: 165, protein: 31, carbs: 0, fat: 4, group: 'Protein' },
{ id: 'cf-egg', name: 'Egg', portionLabel: '1 large', calories: 72, protein: 6, carbs: 0, fat: 5, group: 'Protein' },
{ id: 'cf-salmon', name: 'Salmon fillet', portionLabel: '100 g', calories: 208, protein: 22, carbs: 0, fat: 13, group: 'Protein' },
{ id: 'cf-tofu', name: 'Firm tofu', portionLabel: '100 g', calories: 144, protein: 15, carbs: 3, fat: 9, group: 'Protein' },
{ id: 'cf-yogurt', name: 'Greek yogurt', portionLabel: '150 g', calories: 89, protein: 15, carbs: 5, fat: 1, group: 'Protein' },

{ id: 'cf-rice', name: 'Cooked rice', portionLabel: '1 cup', calories: 206, protein: 4, carbs: 45, fat: 0, group: 'Carbs' },
{ id: 'cf-bread', name: 'Bread', portionLabel: '1 slice', calories: 79, protein: 3, carbs: 15, fat: 1, group: 'Carbs' },
{ id: 'cf-pasta', name: 'Cooked pasta', portionLabel: '1 cup', calories: 221, protein: 8, carbs: 43, fat: 1, group: 'Carbs' },
{ id: 'cf-potato', name: 'Potato', portionLabel: '1 medium', calories: 161, protein: 4, carbs: 37, fat: 0, group: 'Carbs' },

{ id: 'cf-salad', name: 'Mixed salad', portionLabel: '1 bowl', calories: 33, protein: 2, carbs: 6, fat: 0, group: 'Vegetables' },
{ id: 'cf-broccoli', name: 'Broccoli', portionLabel: '100 g', calories: 35, protein: 3, carbs: 7, fat: 0, group: 'Vegetables' },
{ id: 'cf-avocado', name: 'Avocado', portionLabel: '½ fruit', calories: 160, protein: 2, carbs: 9, fat: 15, group: 'Vegetables' },

{ id: 'cf-oil', name: 'Olive oil', portionLabel: '1 tbsp', calories: 119, protein: 0, carbs: 0, fat: 14, group: 'Fats & extras' },
{ id: 'cf-butter', name: 'Butter', portionLabel: '1 tsp', calories: 34, protein: 0, carbs: 0, fat: 4, group: 'Fats & extras' },
{ id: 'cf-mayo', name: 'Mayonnaise', portionLabel: '1 tbsp', calories: 94, protein: 0, carbs: 0, fat: 10, group: 'Fats & extras' },
{ id: 'cf-cheese', name: 'Cheddar cheese', portionLabel: '30 g', calories: 120, protein: 7, carbs: 0, fat: 10, group: 'Fats & extras' },
{ id: 'cf-ketchup', name: 'Ketchup', portionLabel: '1 tbsp', calories: 19, protein: 0, carbs: 5, fat: 0, group: 'Fats & extras' },

{ id: 'cf-latte', name: 'Latte', portionLabel: '1 medium', calories: 132, protein: 8, carbs: 13, fat: 5, group: 'Drinks' },
{ id: 'cf-juice', name: 'Orange juice', portionLabel: '250 ml', calories: 112, protein: 2, carbs: 26, fat: 0, group: 'Drinks' },
{ id: 'cf-softdrink', name: 'Soft drink', portionLabel: '330 ml', calories: 139, protein: 0, carbs: 35, fat: 0, group: 'Drinks' }];


/** Turns a library food into a plate item the user added themselves. */
export function toDetectedFood(food: CommonFood): DetectedFood {
  return {
    id: `${food.id}-${Date.now()}`,
    name: food.name,
    portionLabel: food.portionLabel,
    quantity: 1,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    // Added by hand, so there is nothing to be uncertain about.
    confidence: 1
  };
}