/** Suggestion rows on the Search screen. */

export interface IngredientSuggestion {
  name: string;
  emoji: string;
}

export interface IntentSuggestion {
  name: string;
  /** Meal intents set the Meal filter; dish intents match title, tags or cuisine. */
  kind: 'meal' | 'dish';
}

export const ingredientSuggestions: IngredientSuggestion[] = [
{ name: 'Chicken', emoji: '🍗' },
{ name: 'Pasta', emoji: '🍝' },
{ name: 'Salmon', emoji: '🍣' },
{ name: 'Eggs', emoji: '🥚' },
{ name: 'Avocado', emoji: '🥑' },
{ name: 'Broccoli', emoji: '🥦' },
{ name: 'Rice', emoji: '🍚' },
{ name: 'Feta', emoji: '🧀' },
{ name: 'Black beans', emoji: '🫘' },
{ name: 'Spinach', emoji: '🥬' },
{ name: 'Tofu', emoji: '🧈' },
{ name: 'Chickpeas', emoji: '🥫' }];


export const intentSuggestions: IntentSuggestion[] = [
{ name: 'Salad', kind: 'dish' },
{ name: 'Soup', kind: 'dish' },
{ name: 'Breakfast', kind: 'meal' },
{ name: 'Stir-fry', kind: 'dish' },
{ name: 'Tacos', kind: 'dish' },
{ name: 'Bowl', kind: 'dish' }];


/** Emoji for a chip, falling back to a generic food mark. */
export function ingredientEmoji(name: string): string {
  const match = ingredientSuggestions.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  return match?.emoji ?? '🥗';
}