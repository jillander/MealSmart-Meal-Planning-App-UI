export type HubSort = 'match' | 'quickest' | 'calories' | 'popular';

export interface HubRecipe {
  id: string;
  title: string;
  image: string;
  matchPercentage: number;
  cookingTime: string;
  calories: number;
  difficulty: string;
  trending?: boolean;
  tags: string[];
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
  minMatch: number | null;
  sort: HubSort;
}

export const emptyHubFilters: HubFilters = {
  meals: [],
  cuisines: [],
  dietary: [],
  effort: [],
  maxTime: null,
  maxCalories: null,
  minMatch: null,
  sort: 'match'
};

const mealTags = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const cuisineTags = ['Mediterranean', 'Asian', 'Mexican', 'Italian', 'Indian', 'American'];

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
    filters.minMatch === null ? 0 : 1));

}

/** Options built from the real pool, so no filter can return an empty set by definition. */
export function buildHubFacets(recipes: HubRecipe[]) {
  const tags = new Set<string>();
  const efforts = new Set<string>();
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => tags.add(tag));
    efforts.add(recipe.difficulty);
  });
  const all = Array.from(tags);
  return {
    meals: mealTags.filter((tag) => tags.has(tag)),
    cuisines: cuisineTags.filter((tag) => tags.has(tag)),
    dietary: all.filter((tag) => !mealTags.includes(tag) && !cuisineTags.includes(tag)).sort(),
    efforts: ['Easy', 'Medium', 'Advanced'].filter((effort) => efforts.has(effort))
  };
}

export function applyHubFilters(recipes: HubRecipe[], filters: HubFilters): HubRecipe[] {
  const filtered = recipes.filter((recipe) => {
    if (filters.meals.length && !filters.meals.some((meal) => recipe.tags.includes(meal))) return false;
    if (filters.cuisines.length && !filters.cuisines.some((cuisine) => recipe.tags.includes(cuisine))) {
      return false;
    }
    // Dietary needs are restrictions, so all selected must be satisfied.
    if (filters.dietary.length && !filters.dietary.every((tag) => recipe.tags.includes(tag))) return false;
    if (filters.effort.length && !filters.effort.includes(recipe.difficulty)) return false;
    if (filters.maxTime !== null && parseCookingMinutes(recipe.cookingTime) > filters.maxTime) return false;
    if (filters.maxCalories !== null && recipe.calories > filters.maxCalories) return false;
    if (filters.minMatch !== null && recipe.matchPercentage < filters.minMatch) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case 'quickest':
      sorted.sort((a, b) => parseCookingMinutes(a.cookingTime) - parseCookingMinutes(b.cookingTime));
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