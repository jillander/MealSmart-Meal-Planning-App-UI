import type { DiscoverFilters, DiscoverRecipe } from '../types/discover';

/** Applies every active dimension, then the chosen sort. */
export function applyDiscoverFilters(
recipes: DiscoverRecipe[],
filters: DiscoverFilters,
query: string)
: DiscoverRecipe[] {
  const search = query.trim().toLowerCase();

  const filtered = recipes.filter((recipe) => {
    if (search) {
      const haystack = [recipe.title, recipe.description, recipe.cuisine, ...recipe.dietary].
      join(' ').
      toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (filters.mealTypes.length && !filters.mealTypes.some((meal) => recipe.mealTypes.includes(meal))) {
      return false;
    }
    if (filters.cuisines.length && !filters.cuisines.includes(recipe.cuisine)) return false;
    // Dietary needs are restrictions, so every selected one must be satisfied.
    if (filters.dietary.length && !filters.dietary.every((tag) => recipe.dietary.includes(tag))) {
      return false;
    }
    if (filters.effort.length && !filters.effort.includes(recipe.difficulty)) return false;
    if (filters.maxTime !== null && recipe.timeMinutes > filters.maxTime) return false;
    if (filters.minProtein !== null && recipe.protein < filters.minProtein) return false;
    if (filters.maxCalories !== null && recipe.calories > filters.maxCalories) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case 'quickest':
      sorted.sort((a, b) => a.timeMinutes - b.timeMinutes);
      break;
    case 'protein':
      sorted.sort((a, b) => b.protein - a.protein);
      break;
    case 'calories':
      sorted.sort((a, b) => a.calories - b.calories);
      break;
    case 'popular':
      sorted.sort((a, b) => b.likes - a.likes);
      break;
    default:
      break;
  }
  return sorted;
}

/** Formats minutes the way the recipe cards display them. */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}