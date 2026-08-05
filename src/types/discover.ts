export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type Cuisine = 'Mediterranean' | 'Asian' | 'Mexican' | 'Italian' | 'American' | 'Indian';
export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-free' | 'Dairy-free' | 'High protein' | 'Low carb';
export type Effort = 'Easy' | 'Medium' | 'Advanced';
export type DiscoverSort = 'recommended' | 'quickest' | 'protein' | 'calories' | 'popular';

export interface DiscoverRecipe {
  id: string;
  title: string;
  video: string;
  thumbnail: string;
  /** Total time in minutes — the filterable source for `duration`. */
  timeMinutes: number;
  difficulty: Effort;
  calories: number;
  protein: number;
  mealTypes: MealType[];
  cuisine: Cuisine;
  dietary: DietaryTag[];
  /** Collection ids this recipe belongs to, e.g. 'one-pan'. */
  collections: string[];
  likes: number;
  saved: boolean;
  liked: boolean;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  description: string;
}

export interface DiscoverFilters {
  mealTypes: MealType[];
  cuisines: Cuisine[];
  dietary: DietaryTag[];
  effort: Effort[];
  /** Upper bound in minutes; null means any. */
  maxTime: number | null;
  /** Lower bound in grams; null means any. */
  minProtein: number | null;
  /** Upper bound in kcal; null means any. */
  maxCalories: number | null;
  sort: DiscoverSort;
}

export const emptyFilters: DiscoverFilters = {
  mealTypes: [],
  cuisines: [],
  dietary: [],
  effort: [],
  maxTime: null,
  minProtein: null,
  maxCalories: null,
  sort: 'recommended'
};

/** How many dimensions the user has narrowed, ignoring sort. */
export function countActiveFilters(filters: DiscoverFilters): number {
  return (
    filters.mealTypes.length +
    filters.cuisines.length +
    filters.dietary.length +
    filters.effort.length + (
    filters.maxTime === null ? 0 : 1) + (
    filters.minProtein === null ? 0 : 1) + (
    filters.maxCalories === null ? 0 : 1));

}