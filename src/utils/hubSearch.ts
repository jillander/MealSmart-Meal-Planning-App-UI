import type { HubRecipe } from './hubFilters';
import { ingredientSuggestions } from '../data/searchSuggestions';

/**
 * Search state for Discover. Ingredients and dish queries live here; meal
 * intents are written straight into HubFilters.meals so search and the
 * Filters sheet are one shared state.
 */
export interface HubSearch {
  /** AND: the recipe must contain every one of these. */
  ingredients: string[];
  /** AND: each must appear in the title, description, cuisine or tags. */
  dishQueries: string[];
}

export const emptyHubSearch: HubSearch = { ingredients: [], dishQueries: [] };

export const mealIntents = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

/** Ingredients we recognise by name, beyond the visible suggestion rows. */
const knownIngredients = [
...ingredientSuggestions.map((item) => item.name),
'Beef',
'Tuna',
'Oats',
'Halloumi',
'Noodles',
'Peanut butter',
'Tomatoes',
'Tomato',
'Potato',
'Quinoa',
'Cheddar',
'Mozzarella',
'Parmesan',
'Egg',
'Banana',
'Berries',
'Lentils',
'Cauliflower',
'Courgette',
'Peas'];


function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Loose token match, so "egg" finds "Eggs" and "tomato" finds "Tomatoes". */
function tokenMatches(needle: string, haystack: string): boolean {
  const a = normalize(needle);
  const b = normalize(haystack);
  if (!a || !b) return false;
  return b.includes(a) || a.includes(b);
}

export type ResolvedToken =
{kind: 'ingredient';value: string;} |
{kind: 'meal';value: string;} |
{kind: 'dish';value: string;};

/**
 * Decide what a typed token means: a known ingredient, a meal intent, or a
 * dish query. "Breakfast" is an intent, never an ingredient.
 */
export function resolveToken(raw: string): ResolvedToken {
  const token = raw.trim();
  const meal = mealIntents.find((entry) => normalize(entry) === normalize(token));
  if (meal) return { kind: 'meal', value: meal };

  const ingredient = knownIngredients.find((entry) => tokenMatches(token, entry));
  if (ingredient) return { kind: 'ingredient', value: ingredient };

  return { kind: 'dish', value: token };
}

/** How many of the searched ingredients this recipe actually uses. */
export function countIngredientMatches(recipe: HubRecipe, ingredients: string[]): number {
  return ingredients.filter((wanted) =>
  recipe.ingredients.some((have) => tokenMatches(wanted, have))
  ).length;
}

function matchesDishQuery(recipe: HubRecipe, query: string): boolean {
  const haystack = [recipe.title, recipe.description ?? '', ...recipe.tags].join(' ');
  return normalize(haystack).includes(normalize(query));
}

/**
 * AND across groups: every ingredient must be present, and every dish query
 * must appear somewhere descriptive. Recipes that use more of the searched
 * ingredients rank higher.
 */
export function applyHubSearch(recipes: HubRecipe[], search: HubSearch): HubRecipe[] {
  const matched = recipes.filter((recipe) => {
    if (
    search.ingredients.length &&
    countIngredientMatches(recipe, search.ingredients) < search.ingredients.length)
    {
      return false;
    }
    if (search.dishQueries.length && !search.dishQueries.every((query) => matchesDishQuery(recipe, query))) {
      return false;
    }
    return true;
  });

  if (!search.ingredients.length) return matched;

  return [...matched].sort(
    (a, b) =>
    countIngredientMatches(b, search.ingredients) -
    countIngredientMatches(a, search.ingredients)
  );
}

export function hasActiveSearch(search: HubSearch): boolean {
  return search.ingredients.length > 0 || search.dishQueries.length > 0;
}