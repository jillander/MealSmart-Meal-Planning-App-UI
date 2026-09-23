export type HubSort = 'match' | 'quickest' | 'protein' | 'calories' | 'popular';

export interface HubRecipe {
  id: string;
  title: string;
  /** Used by search to match dish queries like "salad" or "soup". */
  description?: string;
  image: string;
  matchPercentage: number;
  cookingTime: string;
  calories: number;
  protein: number;
  /** Optional — estimated from calories and protein when absent. */
  carbs?: number;
  fat?: number;
  difficulty: string;
  trending?: boolean;
  tags: string[];
  /** What the recipe is made of, for ingredient search. */
  ingredients: string[];
  saved: boolean;
  liked: boolean;
}

export interface HubFilters {
  meals: string[];
  cuisines: string[];
  dietary: string[];
  effort: string[];
  maxTime: number | null;
  maxCalories: number | null;
  minProtein: number | null;
  sort: HubSort;
}

export const emptyHubFilters: HubFilters = {
  meals: [],
  cuisines: [],
  dietary: [],
  effort: [],
  maxTime: null,
  maxCalories: null,
  minProtein: null,
  sort: 'match'
};

/**
 * Fixed dimensions, so the sheet always offers the same vocabulary as the
 * search chips. Ingredients are deliberately absent — they live only in
 * Search, so there is one place to say "I have chicken".
 */
export const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
export const cuisineOptions = [
'Mediterranean',
'Asian',
'Mexican',
'Italian',
'American',
'Indian'];

export const dietaryOptions = [
'High protein',
'Vegetarian',
'Vegan',
'Gluten-free',
'Dairy-free',
'Low carb'];

export const effortOptions = ['Easy', 'Medium', 'Advanced'];

/** "25 min" -> 25. Falls back to a large number so unparsed times never pass a limit. */
export function parseCookingMinutes(cookingTime: string): number {
  const match = cookingTime.match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
}

export function countActiveHubFilters(filters: HubFilters): number {
  return (
    filters.meals.length +
    filters.cuisines.length +
    filters.dietary.length +
    filters.effort.length + (
    filters.maxTime === null ? 0 : 1) + (
    filters.maxCalories === null ? 0 : 1) + (
    filters.minProtein === null ? 0 : 1));

}

export function applyHubFilters(recipes: HubRecipe[], filters: HubFilters): HubRecipe[] {
  const filtered = recipes.filter((recipe) => {
    // OR within meal, cuisine and effort; AND across every dimension.
    if (filters.meals.length && !filters.meals.some((meal) => recipe.tags.includes(meal))) return false;
    if (filters.cuisines.length && !filters.cuisines.some((cuisine) => recipe.tags.includes(cuisine))) {
      return false;
    }
    // Dietary needs are restrictions, so all selected must be satisfied.
    if (filters.dietary.length && !filters.dietary.every((tag) => recipe.tags.includes(tag))) return false;
    if (filters.effort.length && !filters.effort.includes(recipe.difficulty)) return false;
    if (filters.maxTime !== null && parseCookingMinutes(recipe.cookingTime) > filters.maxTime) return false;
    if (filters.maxCalories !== null && recipe.calories > filters.maxCalories) return false;
    if (filters.minProtein !== null && recipe.protein < filters.minProtein) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case 'quickest':
      sorted.sort((a, b) => parseCookingMinutes(a.cookingTime) - parseCookingMinutes(b.cookingTime));
      break;
    case 'protein':
      sorted.sort((a, b) => b.protein - a.protein);
      break;
    case 'calories':
      sorted.sort((a, b) => a.calories - b.calories);
      break;
    case 'popular':
      sorted.sort((a, b) => Number(Boolean(b.trending)) - Number(Boolean(a.trending)));
      break;
    default:
      sorted.sort((a, b) => b.matchPercentage - a.matchPercentage);
      break;
  }
  return sorted;
}