import type { GroceryAisle } from '../types/shopping';

const aisleKeywords: Record<Exclude<GroceryAisle, 'Other'>, string[]> = {
  Produce: [
  'broccoli', 'spinach', 'tomato', 'pepper', 'onion', 'garlic', 'lemon', 'lime',
  'avocado', 'lettuce', 'cucumber', 'carrot', 'potato', 'herb', 'thyme', 'basil',
  'coriander', 'parsley', 'ginger', 'mushroom', 'courgette', 'kale', 'apple', 'berry'],

  Protein: [
  'chicken', 'beef', 'pork', 'salmon', 'tuna', 'fish', 'prawn', 'shrimp', 'turkey',
  'tofu', 'egg', 'lamb', 'mince', 'bacon'],

  Dairy: ['milk', 'yogurt', 'yoghurt', 'cheese', 'feta', 'butter', 'cream', 'halloumi'],
  Pantry: [
  'rice', 'pasta', 'noodle', 'oil', 'soy sauce', 'vinegar', 'flour', 'sugar', 'salt',
  'pepper corn', 'stock', 'bean', 'chickpea', 'lentil', 'tin', 'can', 'spice', 'paprika',
  'cumin', 'honey', 'miso', 'sesame', 'oat', 'bread', 'olive']

};

/** Best-effort aisle for a free-text ingredient name, so lists group sensibly. */
export function guessAisle(name: string): GroceryAisle {
  const value = name.toLowerCase();
  const match = (Object.keys(aisleKeywords) as Exclude<GroceryAisle, 'Other'>[]).find((aisle) =>
  aisleKeywords[aisle].some((keyword) => value.includes(keyword))
  );
  return match ?? 'Other';
}

export const aisleOrder: GroceryAisle[] = ['Produce', 'Protein', 'Dairy', 'Pantry', 'Other'];

export const aisleEmoji: Record<GroceryAisle, string> = {
  Produce: '🥦',
  Protein: '🍗',
  Dairy: '🧈',
  Pantry: '🫙',
  Other: '🛒'
};

/** Normalizes a name for duplicate detection ("2 Garlic Cloves" ~ "garlic cloves"). */
export function normalizeItemName(name: string): string {
  return name.trim().toLowerCase().replace(/^[\d\s./]+/, '');
}